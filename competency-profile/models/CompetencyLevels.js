// [{"levelId":1, "description":"Consultant", "minimumScore":0, "minimumGateScore":0 }

var mongoose = require('mongoose');

var CompetencyLevelSchema = new mongoose.Schema({
	levelId: { type: Number, default: 1 },
	description: String,
	minimumScore: { type: Number, default: 0 },
	minimumGateScore: { type: Number, default: 0 }
});

mongoose.model('CompetencyLevel', CompetencyLevelSchema);