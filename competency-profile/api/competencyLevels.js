/* REST API */

var express = require('express');
var router = express.Router();
var isAuthenticated = require('../config/auth');

router.get('/', isAuthenticated, function (req, res) {

	var collection = req.db.get('competencylevel');

	collection.find({}, function (err, doc) {
		if (err) {
			res.send(err);
		}
		res.send({'data': doc});
	});
});

router.get('/:id', isAuthenticated, function (req, res) {
	
	var collection = req.db.get('competencylevel');
	collection.findOne(
		{
			'_id' : req.params.id
		}, 
		function (err, doc) {
		if (err) {
			res.send(err);
			}
		res.send({ 'data': doc });
	});
});

//TODO: consider change save to root to more closly align with REST API best practices
//TODO: additionally, this route should make it clear that it's for a SINGLE competencylevel
router.put('/:id', isAuthenticated, function (req, res) {
	var db = req.db;
	var level = req.body.level;
	var collection = db.get('competencylevel');
	collection.findAndModify(
		{
			query: { '_id': req.params.id },
			update: level
		},
		{
			'upsert': true
		},
		function (err, docs) {
			if (err) {
				res.send(err);
			}
			res.send({ 'result': 'success', 'level': docs });
		});
}
);

module.exports = router;
