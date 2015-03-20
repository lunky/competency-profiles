// config/passport.js
'use strict()';
var LocalStrategy = require('passport-local').Strategy;
var extend = require('node.extend');
var ActiveDirectory = require('activedirectory');
var config = require('./passport.conf.js');
var Q = require('q');

/*
***************************************************************************************************
passport.conf.js above to be supplied by YOU should look like :
	module.exports = {
		url: 'ldap://ldap.obsglobal.com',
	baseDN: 'dc=obsglobal,dc=com'
		username: '<runtimeuser>@obsglobal.com',
		password: '<runtimepassword>'
	};
	Where runtimeuser and runtimepassword are domain users for authenticating the lookup
***************************************************************************************************
*/

var authConfig = {
	url: 'ldap://ldap.obsglobal.com',
	baseDN: 'dc=obsglobal,dc=com',
	attributes: {
		user: ['sAMAccountName', 'directreports', 'userPrincipalName', 'thumbnailPhoto', 'displayName']
	}
};

authConfig = extend(config, authConfig);
var qad = new ActiveDirectory(authConfig);
var ad = new ActiveDirectory({
	url: 'ldap://ldap.obsglobal.com',
	baseDN: 'dc=obsglobal,dc=com'
});

module.exports = function (passport) {

	function addDirectReports(user, qad) {
		var deferred = Q.defer();
		if (!user.directReports) {
			user.directReports = [];
			deferred.resolve();
		} else {
			var query = '(&!(userAccountControl:1.2.840.113556.1.4.803:=2)(manager=' + user.dn.replace(/\\/g, '\\\\').replace(/\*/, '\\*') + '))';
			dr = {
				filter: query,
				scope: 'sub',
				attributes: ['sAMAccountName', 'displayName'],
			};

			qad.findUsers(
				dr,
				function (err2, users) {
					if (err2) {
						return done(err2, null);
					}
					var reports = users.map(function (el) {
						return {
							username: el.sAMAccountName,
							displayName: el.displayName
						};
					});
					user.directReports = reports;
					deferred.resolve();
				});
		}
		return deferred.promise;
	}


	function addIsAdmin(groupName, user, qad) {
		var deferred = Q.defer();
		var username = user.dn.replace(/\\/g, '\\\\').replace(/\*/, '\\*');
		qad.isUserMemberOf(username, groupName, function (err, isMember) {
			if (err) {
				return done(err, false);
			}
			user.isAdmin = isMember;
			deferred.resolve();
		});
		return deferred.promise;
	}

	passport.serializeUser(function (user, done) {
		var sessionUser = {
			sAMAccountName: user.sAMAccountName,
			userPrincipalName: user.userPrincipalName,
			displayName: user.displayName,
			directReports: JSON.stringify(user.directReports),
			isAdmin: user.isAdmin,
			username: user.sAMAccountName
		};
		done(null, sessionUser)
	})

	passport.deserializeUser(function (sessionUser, done) {
		// The sessionUser object is different from the AD
		// it's actually req.session.passport.user and comes from the session collection
		if (typeof sessionUser.directReports === 'string') {
			sessionUser.directReports = JSON.parse(sessionUser.directReports)
		}
		sessionUser.directReports = sessionUser.directReports || [];
		done(null, sessionUser)
	})

	passport.use('obslocal', new LocalStrategy(function (username, password, done) {
		ad.authenticate(username, password, function (err, isAuthenticated) {
			if (err) {
				return done(err, false);
			}
			if (isAuthenticated) {
				// strip off domain or @obsglobal.com
				var sAMAccountName = username.replace(/^obs\\/i, '');
				//				sAMAccountName = 'bkatchnoski';
				qad.findUser(sAMAccountName, function (err, user) {
					if (!user) {
						err = 'User: ' + username + ' not found.';
						return done(err, false);
					} else {
						user.username = user.sAMAccountName;
						var groupName = 'CPAdmin';
						Q.all([
					addIsAdmin(groupName, user, qad),
					addDirectReports(user, qad)
				]).then(function (results) {
							return done(null, user);
						}, function (err) {
							return done(err, false);
						});
					}
				});
			} else {
				return done(null, false);
			}
		});
	}));

};
