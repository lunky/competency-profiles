// config/passport.js
var LocalStrategy = require('passport-local').Strategy;
var extend = require('node.extend');
var ActiveDirectory = require('activedirectory');
var config = require("./passport.conf.js");

var authConfig = {
	url: 'ldap://ldap.obsglobal.com',
	baseDN: 'dc=obsglobal,dc=com',
	attributes: {
		user: ['sAMAccountName', 'directreports', 'userPrincipalName', 'thumbnailPhoto']
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

	// used to deserialize the user
	passport.deserializeUser(function (username, done) {
		qad.findUser(username, function (err, user) {
			if (!user) {
				err = 'User: ' + username + ' not found.';
			}
			user.directReports = user.directReports || [];
			return done(err, user);
		});
	});

	passport.use('obslocal', new LocalStrategy(function (username, password, done) {
		ad.authenticate(username, password, function (err, isAuthenticated) {
			if (err) return done(err, null);
			if (isAuthenticated) {
				// strip off domain or @obsglobal.com
				var sAMAccountName = username.replace(/^obs\\/i, "");
				sAMAccountName = 'alevine';
				qad.findUser(sAMAccountName, function (err, user) {
					if (!user) {
						err = 'User: ' + username + ' not found.';
					}
					user.directReports = user.directReports || [];
					return done(null, user);
				});
			} else {
				return done(null, false);
			}
		});
	}));

};
