var mongoose = require('mongoose');

var MetObjectivesSchema = new mongoose.Schema({
	objectiveId: Number
});

var ProfilesSchema = new mongoose.Schema({
	userid: String,
	level: String,
	metObjectives: [MetObjectivesSchema]
});

module.exports = mongoose.model('Profiles', ProfilesSchema);
