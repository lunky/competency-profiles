// config/passport.js
'use strict()';
var LocalStrategy = require('passport-local').Strategy;
var extend = require('node.extend');
var ActiveDirectory = require('activedirectory');
var config = require('./passport.conf.js');

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

// expose this function to our app using module.exports
module.exports = function (passport) {
		passport.serializeUser(function (user, done) {
			done(null, user.sAMAccountName);
		});
		//	passport.deserializeUser(function (user, done) {
		//		done(null, user);
		//	});
		//
		//	// used to deserialize the user
		passport.deserializeUser(function (username, done) {
			qad.findUser(username, function (err, user) {
				if (!user) {
					err = 'User: ' + username + ' not found.';
				} else {
					user.username = user.sAMAccountName;
					if (!user.directReports) {
						return done(null, user);
						user.directReports = [];
					} else {
						var query = '(&!(userAccountControl:1.2.840.113556.1.4.803:=2)(manager=' + user.dn.replace(/\\/g, '\\\\').replace(/\*/, '\\*') + '))';
						dr = {
							filter: query,
							scope: 'sub',
							attributes: ['sAMAccountName'],
						};

						qad.findUsers(
							dr,
							function (err2, users) {
								if (err2) {
									return done(err2, null);
								}
								var reports = users.map(function (el) {
									return el.sAMAccountName;
								});
								user.directReports = reports;
								return done(null, user);
							});
					}
				}
			});
		});
	/*
	passport.serializeUser(function (user, done) {
		var sessionUser = {
			sAMAccountName: user.sAMAccountName,
			directreports: user.directreports,
			userPrincipalName: user.userPrincipalName,
			directreports: user.directreports,
			displayName: user.displayName,
			directReportsUsers: user.directReportsUsers
		};
		done(null, sessionUser)
	})

	passport.deserializeUser(function (sessionUser, done) {
		// The sessionUser object is different from the AD
		// it's actually req.session.passport.user and comes from the session collection
		done(null, sessionUser)
	})
*/
	passport.use('obslocal', new LocalStrategy(function (username, password, done) {
		ad.authenticate(username, password, function (err, isAuthenticated) {
			if (err) {
				return done(err, false);
			}
			if (isAuthenticated) {
				// strip off domain or @obsglobal.com
				var sAMAccountName = username.replace(/^obs\\/i, '');
				sAMAccountName = 'alevine';
				qad.findUser(sAMAccountName, function (err, user) {
					if (!user) {
						err = 'User: ' + username + ' not found.';
						return done(err, false);
					} else {
						user.username = user.sAMAccountName;
						if (!user.directReports) {
							user.directReports = [];
							return done(null, user);
						} else {
							var query = '(&!(userAccountControl:1.2.840.113556.1.4.803:=2)(manager=' + user.dn.replace(/\\/g, '\\\\').replace(/\*/, '\\*') + '))';
							dr = {
								filter: query,
								scope: 'sub',
								attributes: ['sAMAccountName', 'thumbnailPhoto'],
							};

							qad.findUsers(
								dr,
								function (err2, users) {
									if (err2) {
										return done(err2, null);
									}

									var reports = users.map(function (el) {
										return el.sAMAccountName;
									});
									user.directReports = reports;
									user.directReportsUsers = users
									return done(null, user);
								});
						}
					}
				});
			} else {
				return done(null, false);
			}
		});
	}));

};
