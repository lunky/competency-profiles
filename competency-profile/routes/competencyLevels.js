var express = require('express');
var router = express.Router();
var isAuthenticated = require('../config/auth');

/* GET competencyLevels listing. */
router.get('/', isAuthenticated, function (req, res) {
	res.render('competencyLevels');
});

router.get('/list', isAuthenticated, function (req, res) {

	var collection = req.db.get('competencylevel');

	collection.find({}, function (err, doc) {
		if (err) {
			res.send(err);
		}
		res.send({'data': doc});
	});
});

router.post('/save', isAuthenticated, function (req, res) {
	var userid = req.user;
	var db = req.db;
	var level = req.body.level;
	var collection = db.get('competencylevel');
	collection.findAndModify(
		{
			query: {
				'levelId': level.levelId
			},
			update: level
		},
		{
			'upsert': true
		},
		function (err, docs) {
			if (err) {
				res.send(err);
			}
			res.send({ 'result': 'success', 'level': docs});
			});
		}
	);

module.exports = router;
