var mongoose = require('mongoose');

var ObjectiveSchema = new mongoose.Schema({
	objectiveId: Number,
	communication: String,
	leadership: String,
	interpersonal: String,
	conflict: String,
	citizenship: String,
	score: Number,
	gateLevel: String,
	competencyWeighting: Number,
	description: String,
	supportingExample: String,
	counterExample: String
});

module.exports = mongoose.model('Objectives', ObjectiveSchema);