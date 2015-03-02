var express = require('express');
var router = express.Router();
var Q = require('q');
var isAuthenticated = require('../config/auth');

function getStats(objectives, levels) {
	var doc = {};
	var stats = {
		base: 0, intermediate: 0, senior: 0, baseTotal: 0, intermediateTotal: 0, seniorTotal: 0,
		'communication': 0, 'leadership': 0, 'interpersonal': 0, 'conflict': 0, 'citizenship': 0,
		'communicationTotal': 0, 'leadershipTotal': 0, 'interpersonalTotal': 0, 'conflictTotal': 0, 'citizenshipTotal': 0
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
		['communication', 'leadership', 'interpersonal', 'conflict', 'citizenship'].forEach(function (competency) {
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
		communication: Math.round(doc.communication / doc.communicationTotal * 100),
		leadership: Math.round(doc.leadership / doc.leadershipTotal * 100),
		interpersonal: Math.round(doc.interpersonal / doc.interpersonalTotal * 100),
		conflict: Math.round(doc.conflict / doc.conflictTotal * 100),
		citizenship: Math.round(doc.citizenship / doc.citizenshipTotal * 100),
        level: getLevel(doc, levels)
	};
	return summary;
}

function getLevel(stats, levels) {
    var level = 'base';
    var totalScore = ['base', 'intermediate', 'senior'].reduce(function(total, l) {
        return total + stats[l];
    }, 0);
	['intermediate', 'senior'].every(function (l) {
        if (totalScore < levels[l].minimumScore){
            return false; // Didn't make it, no use checking the next level
        }
		if (stats[l] < levels[l].minimumGateScore) {
			return false;
		}
        level = l;
        return true;
	});
    return levels[level].description;
}

function getCompetencyLevels(db) {
    var deferred = Q.defer();
    var levels = db.get('competencylevel');

	levels.find({}, '-_id', function (err, doc) {
		if (err) {            
            return deferred.reject(new Error(err));
		}
        var result = doc.reduce(function(obj, i) {                        
            if (i.levelId == 1) { obj['base'] = i }
            else if (i.levelId == 2) { obj['intermediate'] = i; }
            else if (i.levelId == 3) { obj['senior'] = i; }
            return obj;
        }, {});
        deferred.resolve(result);
	});
    return deferred.promise;
}

function objectivesAndProfile(req, res) {
	var profile = req.db.get('profile');
	var objective = req.db.get('objective');
	
	// there are two documents, the objectives master and the profile which is a per user document
	// we have to merge them but the methods are async so we use promises to collect them when we're done
	return Q.all([ 
			findProfileDoc(profile, req, res), 
			findObjectivesDoc(objective, req, res)
	  	]).then(function (results) {
			var profiledoc = results[0];
			var objectivesdoc = results[1];
		
			var deferred = Q.defer();

			if (profiledoc) {
				objectivesdoc.forEach(function (el) {
					el.isMet = profiledoc.metObjectives.some(function (metObjective) {
						return metObjective.objectiveId === el.objectiveId;
					});
				});
			}
		
			deferred.resolve(objectivesdoc);

			return deferred.promise;
		});
}

function findProfileDoc(profile, req, res) {
	var deferred = Q.defer();
	profile.findOne({ 'userid': req.user.username }, function (err, doc) {
		if (err) {
			res.send(err);
		}		
		deferred.resolve(doc);
	});
	return deferred.promise;
}

function findObjectivesDoc(objective, req, res) {
	var deferred = Q.defer();
	objective.find({}, function (err, doc) {
		if (err) {
			res.send(err);
		}
		deferred.resolve(doc);
	});
	return deferred.promise;
}

function findAndModify(collection, userid, entity, fn) {
    collection.findAndModify(
    { 
        query: { 
            'userid': userid.username 
        },
        update: entity
    },
    {
        'upsert': true
    },
    fn);
}

//usage
//findAndModify(collection, userid, levelProfile, function(err, docs){
//    if(err){
//        res.send(err);
//    }
//    res.send(profileResponse);
//});

router.post('/', isAuthenticated, function(req, res) {
	var userid = req.user;
	var db = req.db;
	var profile = {'userid': userid.username, 'level': req.body.level, 'metObjectives': req.body.objectives};
	var collection = db.get('profile');    

	findAndModify(collection, userid, profile, function(err, docs){
	    if(err){
	        res.send(err);
	    }
	    getCompetencyLevels(db).then(function (levels) {
                objectivesAndProfile(req, res)
					.then(function(fullObjectivesList) {  
						var profileResponse = {'data': fullObjectivesList, 'summary' : getStats(fullObjectivesList, levels)};						
						profile.level = profileResponse.summary.level;
					
						findAndModify(collection, userid, profile, function(err, docs){
							if(err){
								res.send(err);
							}
							res.send(profileResponse);
						});
				});
		});
	});
});

router.get('/', isAuthenticated, function(req, res) {
	var db = req.db;
	
	getCompetencyLevels(db).then(function (levels) {
		objectivesAndProfile(req, res)
			.then(function(profile) {
				res.send({'data': profile, 'summary' : getStats(profile, levels)});
			});
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