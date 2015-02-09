var express = require('express');
var router = express.Router();
var Q = require('Q');

/* GET home page. */
router.get('/', function (req, res) {
	res.render('objectives');
});

router.post('/save', function(req, res) {
	var userid = req.user;
	var db = req.db;
	var selfEval = {'userid': userid.login, 'objectivesMet': req.body.objectives};
	var collection = db.get('objectivesMet');

	collection.findAndModify(
		{
			query: {
				'userid': userid.login
			},
			update: selfEval
		},
		{
			'upsert': true
		},
		function(err, docs) {
			if (err) {
				res.send(err);
			}
			console.log('docs: ' + docs);
			res.send({'score': 'half wit consultant'});
		}
	);
});

router.get('/list', function(req, res) {

	var deferred = Q.defer();
	var collection = req.db.get('objective');
	var met = req.db.get('objectivesMet');
	var metdoc;
	var objectivesdoc;
	// there are two documents, the objectives master and the list of objectivesMet which is a per user document
	// we have to merge them but the methods are async so we use promises to collect them when we're done
	met.findOne({'userid': req.user.login}, function(err, doc) {
		if (err) {
			res.send(err);
		}
		metdoc = doc;
		deferred.resolve(doc);
	});

	var deferred2 = Q.defer();
	collection.find({}, function(err, doc) {
		if (err) {
			res.send(err);
		}
		objectivesdoc = doc;
		deferred2.resolve(doc);
	});

	Q.all([deferred.promise, deferred2.promise])
		.then(function() {
			// merge
			if (metdoc) {
				objectivesdoc.forEach(function(el) {
						if (metdoc[0].objectivesMet.some(function(metObjective) {
							return metObjective.objectiveId === el.objectiveId;
						})) {
							el.isMet = true;
						}
					}
				);
			}
			res.send({'data': objectivesdoc});
		}
	);
});

module.exports = router;
