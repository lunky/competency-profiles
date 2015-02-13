var express = require('express');
var router = express.Router();

/* GET objectiveLevels listing. */
router.get('/', function (req, res) {
	res.render('objectiveLevels');
});

router.get('/list', function (req, res) {
	
	var collection = req.db.get('objectivelevel');
	
	collection.find({}, function (err, doc) {
		if (err) {
			res.send(err);
		}
		
		res.send({ 'data': doc });
	});
	
});

module.exports = router;
