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
	var db = req.db;
	var level = req.body.level;
	var collection = db.get('competencylevel');
	console.log("id: " + level._id);
	console.log("minimumScore: " + level.minimumScore);
	collection.findAndModify(
		{
			query: { '_id': level._id },
			update: level
		},
		{
			'upsert': true
		},
		function (err, docs) {
			if (err) {
				res.send(err);
				console.log("errored out fool!");
			}
			console.log("success");
			res.send({ 'result': 'success', 'level': docs });
		});
}
);

module.exports = router;
