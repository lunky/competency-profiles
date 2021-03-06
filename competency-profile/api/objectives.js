var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var isAuthenticated = require('../config/auth');

var Objectives = mongoose.model('Objectives');

router.get('/', isAuthenticated, function (req, res) {
	Objectives.find({}, function (err, doc) {
		if (err) {
			res.status(500).send(err);
		}
		res.json({
			'data': doc
		});
	});
});

router.get('/:id', isAuthenticated, function (req, res) {
	Objectives.findOne(req.params.id, function (err, doc) {
		if (err) {
			res.status(500).send(err);
		}
		res.json({
			'data': doc
		});
	});
});

router.put('/:id', isAuthenticated, function (req, res) {
	Objectives.update({
			'_id': req.params.id
		},
		req.body.objective, {
			upsert: true
		},
		function (err, doc) {
			if (err) {
				res.status(500).send(err);
			}
			res.
json({
				'result': 'success',
				'objective': doc
			});
		});
});

module.exports = router;
