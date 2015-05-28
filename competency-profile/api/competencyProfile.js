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
	//                      the sum of all selected gated objectives is greater than intermediate gate score
	//                      then consultant is intermediate
	// 2) If
	//                      consultant meets intermediate requirements
	//                      &
	//                      the sum of all selected non-gate objectives is greater than senior score
	//                      &
	//                      the sum of all selected gated objectives is greater than senior gate score
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
	var nextLevelScore = 0;
	var nextLevelGateScore = 0;

	//next level metadata
	if (nextLevelIndex != "principle") {
		nextLevel = levels[nextLevelIndex].description;
		nextLevelScore = levels[nextLevelIndex].minimumScore;
		nextLevelGateScore = levels[nextLevelIndex].minimumGateScore;
	}
	//current metadata
	var currentScore = Math.round(doc.base + doc.intermediate + doc.senior);
	var currentGateScore = nextLevel == "Senior" ? doc.senior : doc.intermediate;

	//calculate score and gate percentage contribution
	var totalPointsRequired = nextLevelScore + nextLevelGateScore;
	var scorePercentageContribution = (nextLevelScore / totalPointsRequired) * 100;
	var gatePercentageContribution = (nextLevelGateScore / totalPointsRequired) * 100;

	//progress attributed to met score %age
	var pointsNeededForNextLevel = Math.max((nextLevelScore - (currentScore - currentGateScore)), 0);
	var calculatedPointsContribution = (1 - (pointsNeededForNextLevel / nextLevelScore)) * scorePercentageContribution;

	//progress is attributed to met gate %age
	var gatePointsNeededForNextLevel = Math.max((nextLevelGateScore - currentGateScore), 0);
	var calculatedGateContribution = (1 - (gatePointsNeededForNextLevel / nextLevelGateScore)) * gatePercentageContribution;

	var levelProgressValue = Math.round(calculatedPointsContribution + calculatedGateContribution);
	var scoreThresholdPassed = (pointsNeededForNextLevel == 0) && (nextLevel != "Principle");
	var gateThresholdPassed = gatePointsNeededForNextLevel == 0 && (nextLevel != "Principle");

	var summary = {

		//competency metadata
		communication: Math.round(doc.communication / doc.communicationTotal * 100),
		communicationAnswered: doc.answeredTotal === 0 ? 0 : Math.round(doc.communication / doc.answeredTotal * 100),
		leadership: Math.round(doc.leadership / doc.leadershipTotal * 100),
		leadershipAnswered: doc.answeredTotal === 0 ? 0 : Math.round(doc.leadership / doc.answeredTotal * 100),
		interpersonal: Math.round(doc.interpersonal / doc.interpersonalTotal * 100),
		interpersonalAnswered: doc.answeredTotal === 0 ? 0 : Math.round(doc.interpersonal / doc.answeredTotal * 100),
		conflict: Math.round(doc.conflict / doc.conflictTotal * 100),
		conflictAnswered: doc.answeredTotal === 0 ? 0 : Math.round(doc.conflict / doc.answeredTotal * 100),
		citizenship: Math.round(doc.citizenship / doc.citizenshipTotal * 100),
		citizenshipAnswered: doc.answeredTotal === 0 ? 0 : Math.round(doc.citizenship / doc.answeredTotal * 100),

		//levels metadata
		level: levels[currentLevelIndex].description,
		nextLevel: nextLevel,

		//score metadata
		score: Math.round(doc.base + doc.intermediate + doc.senior),
		gateScore: nextLevel == "Senior" ? doc.senior : doc.intermediate,
		nextLevelScore: nextLevelScore,

		//level progress metadata
		levelProgressValue: levelProgressValue,
		scoreThresholdPassed: scoreThresholdPassed,
		gateThresholdPassed: gateThresholdPassed
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
			res.status(500).send(err);
		}
		deferred.resolve(doc);
	});
	return deferred.promise;
}

function findObjectivesDoc(res) {
	var deferred = Q.defer();
	Objectives.find({}, function (err, doc) {
		if (err) {
			res.status(500).send(err);
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
			res.status(500).send(err);
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
							res.status(500).send(err);
						}
						res.json(profileResponse);
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
				res.setHeader('Cache-Control', 'no-cache');
				res.json({
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
		level: 1,
		thumbnailPhoto: 1
	}, function (err, profileList) {
		if (err) {
			res.status(500).send(err);
		}

		var filteredProfiles = getFilteredProfiles(profileList, req.user)

		res.setHeader('Cache-Control', 'no-cache');
		res.json({
			'result': 'success',
			'profileList': filteredProfiles
		});
	});
});

function getFilteredProfiles(profileList, user) {
	var profiles = {};
	// make a hashtable
	profileList.map(function (profile) {
		profiles[profile.userid] = {
			username: profile.userid,
			displayName: profile.displayName,
			thumbnailPhoto: profile.thumbnailPhoto,
			userid: profile.userid,
			level: profile.level
		};
	});

	// merge in direct reports
	var directReports = user.directReports.map(function (report) {
		var profile = profiles[report.username]
		if (!profiles[report.username]) {
			profiles[report.username] = {
				displayName: report.displayName,
				level: 'No Profile Data'
			};
		}
		profiles[report.username].userid = report.username;
		profiles[report.username].thumbnailPhoto = report.thumbnailPhoto;
		return profiles[report.username];
	});

	if (user.isAdmin) {
		// return array from object properties
		return Object.keys(profiles).map(function (key) {
			return profiles[key]
		});
	}

	var reports = user.directReports.map(function (report) {
		return profiles[report.username];
	});

	return directReports;
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
				var directReport = req.user.directReports.filter(function (el) {
					return el.username == username;
				})
				var fullProfile = {
					'data': profile,
					'summary': getStats(profile, levels),
					'personal': directReport[0]
				};
				res.setHeader('Cache-Control', 'no-cache');
				res.json(fullProfile);
			});
	});
});

module.exports = router;
