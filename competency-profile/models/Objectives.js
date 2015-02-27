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

// findAndModify has not been implemented in the driver so we write our own
ObjectiveSchema.statics.findAndModify = function (query, sort, doc, options, callback) {
	return this.collection.findAndModify(query, sort, doc, options, callback);
};

module.exports = mongoose.model('Objectives', ObjectiveSchema);