/* REST API */

var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var isAuthenticated = require('../config/auth');

var CompetencyLevels = mongoose.model('CompetencyLevels');

router.get('/', isAuthenticated, function (req, res) {

	CompetencyLevels.find({}, function (err, doc) {
		if (err) {
			res.send(err);
		}
		res.send({ 'data': doc });
	});
});

router.get('/:id', isAuthenticated, function (req, res) {
	
	CompetencyLevels.findOne(req.params.id, function (err, doc) {
		if (err) {
			res.send(err);
		}
		res.send({ 'data': doc });
	});
});

//TODO: consider change save to root to more closly align with REST API best practices
//TODO: additionally, this route should make it clear that it's for a SINGLE competencylevel
router.put('/:id', isAuthenticated, function (req, res) {

	var level = req.body.level;
	CompetencyLevels.update(req.params.id, level, { upsert: true }, function (err, doc) {
		if (err) {
			res.send(err);
		}
		res.send({ 'result': 'success', 'level': doc });
	});
});

module.exports = router;
