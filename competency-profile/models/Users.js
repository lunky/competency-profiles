var mongoose = require('mongoose');
var passportLocal = require('passport-local');

var UserSchema = new mongoose.Schema({
	username: String,
	password: String,
	displayName: String,
	isAdmin: Boolean,
	directReports: [{
		username: String,
		displayName: String
	}]
});

module.exports = mongoose.model('Users', UserSchema);
