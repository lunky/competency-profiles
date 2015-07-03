'use strict';
(function () {
    var myApp = angular.module('CompetencyProfilesServices');

    myApp.service('profileSummaryService', profileSummaryService);

    function profileSummaryService() {
        var svc = {};

        svc.getScore = function(objectives, levels) {
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
                    if (curr[competency] === true) {
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
            var pointsNeededForNextLevel = Math.max((nextLevelScore - currentScore), 0);
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
                return 'intermediate';
            } else if (level === 'intermediate') {
                return 'senior';
            } else {
                return 'principle';
            }
        }

        return svc;
    }

})();