var express = require('express');
var router = express.Router();
var isAuthenticated = require('../config/auth');

/* GET objectiveLevels listing. */
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

module.exports = router;
