var mongoose = require('mongoose');

var CompetencyLevelSchema = new mongoose.Schema({
	levelId: Number,
	gateLevelDescription: String,
	description: String,
	minimumScore: Number,
	minimumGateScore: Number,
});

mongoose.model('CompetencyLevels', CompetencyLevelSchema);

