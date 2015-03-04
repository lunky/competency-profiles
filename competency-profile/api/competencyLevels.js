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
		res.send({
			'data': doc
		});
	});
});

router.get('/:id', isAuthenticated, function (req, res) {

	CompetencyLevels.findOne(req.params.id, function (err, doc) {
		if (err) {
			res.send(err);
		}
		res.send({
			'data': doc
		});
	});
});

router.put('/:id', isAuthenticated, function (req, res) {

	CompetencyLevels.update(req.params.id, req.body.level, {
		upsert: true
	}, function (err, doc) {
		if (err) {
			res.send(err);
		}
		res.send({
			'result': 'success',
			'level': doc
		});
	});
});

module.exports = router;
