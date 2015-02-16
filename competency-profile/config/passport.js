// config/passport.js

var LocalStrategy = require('passport-local').Strategy;

// expose this function to our app using module.exports
module.exports = function (passport, db) {
	
	// =========================================================================
	// passport session setup ==================================================
	// =========================================================================
	// required for persistent login sessions
	// passport needs ability to serialize and unserialize users out of session
	
	// used to serialize the user for the session
	passport.serializeUser(function (user, done) {
		done(null, user._id);
	});
	
	// used to deserialize the user
	passport.deserializeUser(function (id, done) {
		var users = db.get('UserData');
		var oid = users.id(id);
		users.findOne({_id:oid}, function (err, user) {
			done(err, user);
		});
	});
	
	passport.use('obslocal', new LocalStrategy(function (username, password, done) {
			process.nextTick(function () {
				var users = db.get('UserData');
				users.findOne({ 'username': username, 'password':password}, function (err, user) {
				
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