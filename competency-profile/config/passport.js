// config/passport.js

var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;

// expose this function to our app using module.exports
module.exports = function (passport) {
	
	// =========================================================================
	// passport session setup ==================================================
	// =========================================================================
	// required for persistent login sessions
	// passport needs ability to serialize and unserialize users out of session

	var UserData = mongoose.model('UserData');
	
	// used to serialize the user for the session
	passport.serializeUser(function (user, done) {
		done(null, user._id);
	});

	// used to deserialize the user
	passport.deserializeUser(function (id, done) {
		UserData.findById(id , function (err, user) {
			done(err, user);
		});
	});

	passport.use('obslocal', new LocalStrategy(function (username, password, done) {
		process.nextTick(function () {
			UserData.findOne({ 'username': username, 'password': password }, function (err, user) {
				if (err) {
					return done(err);
				}
				if (!user) {
					return done(null, false);
				}
				return done(null, user);
			});
		});
	}));
	
};