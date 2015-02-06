var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
	res.render('objectives');
});

router.post('/save', function (req, res) {
	console.log(req.body.objectives);	
	res.send({ "score": "half wit consultant" });
});

router.get('/list', function (req, res) {
	var collection = req.db.get('objective');
	collection.find({}, {}, function (e, docs) {
		return res.json({ "data": docs });
	});
});

module.exports = router;