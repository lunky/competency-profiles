var express = require('express');
var router = express.Router();
var Q = require('q');
var isAuthenticated = require('../config/auth');

function getStats(objectives) {
	var doc = {};
	var stats = {
		base: 0, intermediate: 0, senior: 0, baseTotal: 0, intermediateTotal: 0, seniorTotal: 0,
		'Communication': 0, 'Leadership': 0, 'Interpersonal': 0, 'Conflict': 0, 'Citizenship': 0,
		'CommunicationTotal': 0, 'LeadershipTotal': 0, 'InterpersonalTotal': 0, 'ConflictTotal': 0, 'CitizenshipTotal': 0
	};
	doc = objectives.reduce(function (prev, curr, idx, arr) {
		['base', 'intermediate', 'senior'].forEach(function (level) {
			if (curr.gateLevel === level) {
				prev[level + 'Total'] += curr.score;
				if (curr.isMet) {
					prev[level] += curr.score;
				}
			}
		});
		['Communication', 'Leadership', 'Interpersonal', 'Conflict', 'Citizenship'].forEach(function (competency) {
			if (curr[competency] === 'Y') {
				prev[competency + 'Total'] += curr.competencyWeighting;
				if (curr.isMet) {
					prev[competency] += curr.competencyWeighting;
				}
			}
		});
		return prev;
	}, stats);
	var summary = {
		base: Math.round(doc.base / doc.baseTotal * 100),
		intermediate: Math.round(doc.intermediate / doc.intermediateTotal * 100),
		senior: Math.round(doc.senior / doc.seniorTotal * 100),
		communication: Math.round(doc.Communication / doc.CommunicationTotal * 100),
		leadership: Math.round(doc.Leadership / doc.LeadershipTotal * 100),
		interpersonal: Math.round(doc.Interpersonal / doc.InterpersonalTotal * 100),
		conflict: Math.round(doc.Conflict / doc.ConflictTotal * 100),
		citizenship: Math.round(doc.Citizenship / doc.CitizenshipTotal * 100)
	};
	return summary;
}

function objectivesAndObjectivesMet(req, res, done) {
	var deferred = Q.defer();
	var collection = req.db.get('objective');
	var met = req.db.get('objectivesMet');
	var metdoc;
	var objectivesdoc;
	// there are two documents, the objectives master and the list of objectivesMet which is a per user document
	// we have to merge them but the methods are async so we use promises to collect them when we're done
	met.findOne({ 'userid': req.user.username }, function (err, doc) {
		if (err) {
			res.send(err);
		}
		metdoc = doc;
		deferred.resolve(doc);
	});
	
	var deferred2 = Q.defer();
	collection.find({}, function (err, doc) {
		if (err) {
			res.send(err);
		}
		objectivesdoc = doc;
		deferred2.resolve(doc);
	});
	
	Q.all([deferred.promise, deferred2.promise])
		.then(function () {
		// merge
		if (metdoc) {
			objectivesdoc.forEach(function (el) {
				if (metdoc.objectivesMet.some(function (metObjective) {
					return metObjective.objectiveId === el.objectiveId;
				})) {
					el.isMet = true;
				} else {
					el.isMet = false;
				}
			}
			);
		}
		done(objectivesdoc);
	}
	);
}

router.post('/', isAuthenticated, function(req, res) {
	var userid = req.user;
	var db = req.db;
	var selfEval = {'userid': userid.username, 'objectivesMet': req.body.objectives};
	var collection = db.get('objectivesMet');

	collection.findAndModify(
		{
			query: {
				'userid': userid.username
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
			objectivesAndObjectivesMet(req, res, function(metDocument) {
				res.send({'data': metDocument, 'summary' : getStats(metDocument)});
			});
		}
	);
});

router.get('/', isAuthenticated, function(req, res) {
	objectivesAndObjectivesMet(req, res, function(metDocument) {
				res.send({'data': metDocument, 'summary' : getStats(metDocument)});
	});
});

module.exports = router;

//Competency Level Percentage Calculation
// 1) get the sum of all objectives scores grouped by level
// 2) get the sum of all selected objectives scores grouped by level
// 3) divide
//
//Competency Group Percentage Calculation
// 1) get the count of all objectives grouped by competency
// 2) get the count of all selected objectives grouped by competency
// 3) divide
//
//Consultant Competency Level Calculation
// 1) If
//                      the sum of all selected non-gate objectives is greater than intermediate score
//                      &
//                      the sum of all selected gated objectives is greater than base intermediate score
//                      then consultant is intermediate
// 2) If
//                      consultant meets intermediate requirements
//                      &
//                      the sum of all selected non-gate objectives is greater than senior score
//                      &
//                      the sum of all selected gated objectives is greater than base senior score
//                      then consultant is senior