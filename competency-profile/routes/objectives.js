var express = require('express');
var router = express.Router();
var Q = require('q');
var isAuthenticated = require('../config/auth');

/* GET home page. */
router.get('/', isAuthenticated, function (req, res) {
	res.render('objectives');
});

router.get('/list', isAuthenticated, function(req, res) {
	var collection = req.db.get('objective');
	
	collection.find({}, function (err, doc) {
		if (err) {
			res.send(err);
		}
		res.send({ 'data': doc });
	});
});

router.post('/save', isAuthenticated, function (req, res) {
	/*
	 * populate with objective admin save logic
	 */
});

module.exports = router;
