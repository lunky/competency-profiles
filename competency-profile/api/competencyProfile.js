var express = require('express');
var router = express.Router();
var Q = require('q');
var isAuthenticated = require('../config/auth');

var mongoose = require('mongoose');
var Profiles = mongoose.model('Profiles');
var CompetencyLevels = mongoose.model('CompetencyLevels');
var Objectives = mongoose.model('Objectives');
var Users = mongoose.model('Users');

function getStats(objectives, levels) {

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


	var doc = {};
	var stats = {
		base: 0,
		intermediate: 0,
		senior: 0,
		baseTotal: 0,
		intermediateTotal: 0,
		seniorTotal: 0,
		score: 0,
		'communication': 0,
		'leadership': 0,
		'interpersonal': 0,
		'conflict': 0,
		'citizenship': 0,
		'communicationTotal': 0,
		'leadershipTotal': 0,
		'interpersonalTotal': 0,
		'conflictTotal': 0,
		'citizenshipTotal': 0,
		'answeredTotal': 0
	};
	doc = objectives.reduce(function (prev, curr, idx, arr) {
		if (curr.isMet) {
			prev.answeredTotal += curr.competencyWeighting;
		}
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

	var currentLevelIndex = getLevel(doc, levels);
	//TODO: Logic to handle not finding the Level
	var nextLevelIndex = getNextLevel(currentLevelIndex);

	var nextLevel = "Principle";
	var nextLevelScore = 1;
	if (nextLevelIndex != "principle") {
		nextLevel = levels[nextLevelIndex].description;
		nextLevelScore = levels[nextLevelIndex].minimumScore;
	}


	var summary = {
		base: Math.round(doc.base / doc.baseTotal * 100),
		intermediate: Math.round(doc.intermediate / doc.intermediateTotal * 100),
		senior: Math.round(doc.senior / doc.seniorTotal * 100),
		score: Math.round(doc.base + doc.intermediate + doc.senior),

		communication: Math.round(doc.communication / doc.communicationTotal * 100),
		communicationAnswered: Math.round(doc.communication / doc.answeredTotal * 100),
		leadership: Math.round(doc.leadership / doc.leadershipTotal * 100),
		leadershipAnswered: Math.round(doc.leadership / doc.answeredTotal * 100),
		interpersonal: Math.round(doc.interpersonal / doc.interpersonalTotal * 100),
		interpersonalAnswered: Math.round(doc.interpersonal / doc.answeredTotal * 100),
		conflict: Math.round(doc.conflict / doc.conflictTotal * 100),
		conflictAnswered: Math.round(doc.conflict / doc.answeredTotal * 100),
		citizenship: Math.round(doc.citizenship / doc.citizenshipTotal * 100),
		citizenshipAnswered: Math.round(doc.citizenship / doc.answeredTotal * 100),
		level: levels[currentLevelIndex].description,
		levelScore: levels[currentLevelIndex].minimumScore,
		nextLevel: nextLevel,
		nextLevelScore: nextLevelScore
	};
	return summary;
}

function getLevel(stats, levels) {
	var level = 'base';
	var totalScore = ['base', 'intermediate', 'senior'].reduce(function (total, l) {
		return total + stats[l];
	}, 0);
 ['intermediate', 'senior'].every(function (l) {
		if (totalScore < levels[l].minimumScore) {
			return false; // Didn't make it, no use checking the next level
		}
		if (stats[l] < levels[l].minimumGateScore) {
			return false;
		}
		level = l;
		return true;
	});
	return level;
}

function getNextLevel(level) {
	if (level === 'base') {
		return 'intermediate'
	} else if (level === 'intermediate') {
		return 'senior'
	} else {
		return 'principle'
	}
}

function getCompetencyLevels() {
	var deferred = Q.defer();

	CompetencyLevels.find({}, '-_id', function (err, doc) {
		if (err) {
			return deferred.reject(new Error(err));
		}
		var result = doc.reduce(function (obj, i) {
			if (i.levelId == 1) {
				obj['base'] = i
			} else if (i.levelId == 2) {
				obj['intermediate'] = i;
			} else if (i.levelId == 3) {
				obj['senior'] = i;
			}
			return obj;
		}, {});
		deferred.resolve(result);
	});
	return deferred.promise;
}

function objectivesAndProfile(username, req, res) {
	var username = username;

	// there are two documents, the objectives master and the profile which is a per user document
	// we have to merge them but the methods are async so we use promises to collect them when we're done
	return Q.all([
   findProfileDoc(username, res),
   findObjectivesDoc(res)
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

function findProfileDoc(username, res) {
	var deferred = Q.defer();
	Profiles.findOne({
		userid: username
	}, function (err, doc) {
		if (err) {
			res.send(err);
		}
		deferred.resolve(doc);
	});
	return deferred.promise;
}

function findObjectivesDoc(res) {
	var deferred = Q.defer();
	Objectives.find({}, function (err, doc) {
		if (err) {
			res.send(err);
		}
		deferred.resolve(doc);
	});
	return deferred.promise;
}

function findAndModify(model, userid, entity, fn) {
	model.update({
			'userid': userid.username
		},
		entity, {
			upsert: true
		},
		fn);
}

function userIsDirectReport(directReports, username) {

	for (var i = 0; i < directReports.length; i++) {
		var found = directReports[i].username == username
		if (found)
			return true;
	}

	return false;
}

router.post('/', isAuthenticated, function (req, res) {
	var userid = req.user;
	var username = userid.username;
	var db = req.db;
	var profile = {
		'userid': userid.username,
		'displayName': userid.displayName,
		'level': req.body.level,
		'metObjectives': req.body.objectives
	};

	findAndModify(Profiles, userid, profile, function (err, docs) {
		if (err) {
			res.send(err);
		}
		getCompetencyLevels().then(function (levels) {
			objectivesAndProfile(username, req, res)
				.then(function (fullObjectivesList) {
					var profileResponse = {
						'data': fullObjectivesList,
						'summary': getStats(fullObjectivesList, levels)
					};
					profile.level = profileResponse.summary.level;

					findAndModify(Profiles, userid, profile, function (err, docs) {
						if (err) {
							res.send(err);
						}
						res.send(profileResponse);
					});
				});
		});
	});
});

router.get('/', isAuthenticated, function (req, res) {
	var db = req.db;
	var username = req.user.username;

	getCompetencyLevels().then(function (levels) {
		objectivesAndProfile(username, req, res)
			.then(function (profile) {
				res.send({
					'data': profile,
					'summary': getStats(profile, levels)
				});
			});
	});
});

router.get('/rankings', isAuthenticated, function (req, res) {
	//if !user.groups.contains("peoplecare");
	Profiles.find({}, {
		userid: 1,
		displayName: 1,
		level: 1
	}, function (err, profileList) {
		if (err) {
			res.send(err);
		}

		var filteredProfiles = getFilteredProfiles(profileList, req.user)

		res.send({
			'result': 'success',
			'profileList': filteredProfiles
		});
	});
});

function getFilteredProfiles(profileList, user) {
	if (user.isAdmin) {
		return profileList;
	}

	//Filter the profile list to only users who are direct reports
	var filteredProfiles = profileList.filter(function (el) {
		return userIsDirectReport(user.directReports, el.userid)
	});

	//Add all the users who haven't completed a profile
	for (var i = 0; i < user.directReports.length; i++) {
		//for direct report check if it exists in  filteredProfiles 
		var addReport = filteredProfiles.some(function (el) {
			return el.userid == user.directReports[i].username
		});

		//if no profile was found, add a 'No Profile Data' entry 
		if (!addReport)
			filteredProfiles.push({
				userid: user.directReports[i].username,
				displayName: user.directReports[i].displayName,
				level: 'No Profile Data'
			});
	}

	return filteredProfiles;
}



router.get('/:username', isAuthenticated, function (req, res) {
	var username = req.params.username;


	if (!((userIsDirectReport(req.user.directReports, username)) || req.user.isAdmin ||
			req.user.username == username)) {
		//TODO: Define proper error
		res.status(403).send(new Error("This consultant is not a direct report"));
	}

	getCompetencyLevels().then(function (levels) {
		objectivesAndProfile(username, req, res)
			.then(function (profile) {
				res.send({
					'data': profile,
					'summary': getStats(profile, levels)
				});
			});
	});
});

module.exports = router;
