/* REST API */

var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var isAuthenticated = require('../config/auth');

var CompetencyLevels = mongoose.model('CompetencyLevels');

router.get('/', isAuthenticated, function (req, res) {

	CompetencyLevels.find({}, function (err, doc) {
		if (err) {
			res.status(500).send(err);
		}
		res.json({
			'data': doc
		});
	});
});

router.get('/lookup', isAuthenticated, function (req, res) {

	CompetencyLevels.find({}, {
		levelId: 1,
		gateLevelDescription: 1,
		description: 1
	}, function (err, doc) {
		if (err) {
			res.
status(500).send(err);
		}
		res.send({
			'data': doc
		});
	});
});

router.get('/:id', isAuthenticated, function (req, res) {

	CompetencyLevels.findOne(req.params.id, function (err, doc) {
		if (err) {
			res.status(500).send(err);
		}
		res.json({
			'data': doc
		});
	});
});

router.put('/:id', isAuthenticated, function (req, res) {
	CompetencyLevels.update({
			'_id': req.params.id
		},
		req.body.level, {
			upsert: true
		},
		function (err, doc) {
			if (err) {
				res.status(500).send(err);
			}
			res.json({
				'result': 'success',
				'objective': doc
			});
		});
});

module.exports = router;
