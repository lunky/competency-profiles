using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using cpa.EntityFramework;
using cpa.Model;
using cpa.Shared;
using cpa.Shared.dtos;

namespace cpa.Service
{
	public class ProfileService : IProfileService
	{
		private ICpaContext _context;

		public ProfileService(ICpaContext context)
		{
			_context = context;
		}

		public ProfileDto GetProfile(string userId)
		{
			var profile = _context.Profiles.FirstOrDefault(p => p.UserId == userId) ?? new Model.Profile {UserId = userId};
			var metObjectives = profile.MetObjectives;
			var objectives =  Mapper.Map<List<ObjectiveDto>>(_context.Objectives);
			foreach (var met in metObjectives)
			{
				objectives.Single(o => o.Id == met.Id).IsMet = true;

			}
//			var stats = GetStats(objectives, metObjectives);
			var profileDto = Mapper.Map<ProfileDto>(profile);
			profileDto.MetObjectives = objectives;
			return profileDto;
		}

		public static Dictionary<string, int> GetStats(List<ObjectiveDto> objectives, ICollection<Objective> metObjectives)
		{
			var stats = new Dictionary<string, int>
			{
				{"base", 0},
				{"intermediate", 0},
				{"senior", 0},
				{"baseTotal", 0},
				{"intermediateTotal", 0},
				{"seniorTotal", 0},
				{"score", 0},
				{"communication", 0},
				{"leadership", 0},
				{"interpersonal", 0},
				{"conflict", 0},
				{"citizenship", 0},
				{"communicationTotal", 0},
				{"leadershipTotal", 0},
				{"interpersonalTotal", 0},
				{"conflictTotal", 0},
				{"citizenshipTotal", 0},
				{"answeredTotal", 0}
			};


			//// merge answered with unanswered
			//foreach (var objective in objectives)
			//{
			//	var gateName = Enum.GetName(typeof (GateLevel), objective.GateLevel);
			//	stats[gateName + "Total"] += objective.Score;
			//	if (metObjectives.Any(o => o.Id == objective.Id))
			//	{
			//		objective.IsMet = true;
			//		stats["answeredTotal"] += objective.CompetencyWeighting;
			//		stats[gateName] += objective.Score;
			//	}
			//	var props = new[] {"Communication", "Leadership", "Interpersonal", "Conflict", "Citizenship"};
			//	foreach (var propName in props)
			//	{
			//		var prop = typeof (ObjectiveDto).GetProperty(propName);
			//		var competency = (bool) prop.GetValue(objective, new object[0]);
			//		if (competency)
			//		{
			//			stats[propName + "Total"] += objective.CompetencyWeighting;
			//		}
			//		if (objective.IsMet)
			//		{
			//			stats[propName] += objective.CompetencyWeighting;
			//		}
			//	}
			//}
			return stats;
		}

		//public CompetencyLevel GetLevel()
		//{
		//	var levels = _context.CompetencyLevels.ToLookup(l => l.Description);
		//	var level = GateLevel.@base;
		//	foreach (var currentLevel in new GateLevel[] {GateLevel.intermediate, GateLevel.senior})
		//	{
		//		var levelName = Enum.GetName(typeof(GateLevel), currentLevel);
		//		var minScore = 
		//	}
		//	return level;
		//}
//		private ProfileSummary GetStats(List<ObjectiveDto> objectives) {

//	//Competency Level Percentage Calculation
//	// 1) get the sum of all objectives scores grouped by level
//	// 2) get the sum of all selected objectives scores grouped by level
//	// 3) divide
//	//
//	//Competency Group Percentage Calculation
//	// 1) get the count of all objectives grouped by competency
//	// 2) get the count of all selected objectives grouped by competency
//	// 3) divide
//	//
//	//Consultant Competency Level Calculation
//	// 1) If
//	//                      the sum of all selected non-gate objectives is greater than intermediate score
//	//                      &
//	//                      the sum of all selected gated objectives is greater than intermediate gate score
//	//                      then consultant is intermediate
//	// 2) If
//	//                      consultant meets intermediate requirements
//	//                      &
//	//                      the sum of all selected non-gate objectives is greater than senior score
//	//                      &
//	//                      the sum of all selected gated objectives is greater than senior gate score
//	//                      then consultant is senior

//	var stats = new {
//		@base = 0,
//		intermediate= 0,
//		senior= 0,
//		baseTotal= 0,
//		intermediateTotal= 0,
//		seniorTotal= 0,
//		score= 0,
//		communication= 0,
//		leadership= 0,
//		interpersonal= 0,
//		conflict= 0,
//		citizenship= 0,
//		communicationTotal= 0,
//		leadershipTotal= 0,
//		interpersonalTotal= 0,
//		conflictTotal= 0,
//		citizenshipTotal= 0,
//		answeredTotal= 0
//	};
	
//	var doc = objectives.reduce(function (prev, curr, idx, arr) {
//		if (curr.isMet) {
//			prev.answeredTotal += curr.competencyWeighting;
//		}
//		['base', 'intermediate', 'senior'].forEach(function (level) {
//			if (curr.gateLevel === level) {
//				prev[level + 'Total'] += curr.score;
//				if (curr.isMet) {
//					prev[level] += curr.score;
//				}
//			}
//		});
//		['communication', 'leadership', 'interpersonal', 'conflict', 'citizenship'].forEach(function (competency) {
//			if (curr[competency] === 'Y') {
//				prev[competency + 'Total'] += curr.competencyWeighting;
//				if (curr.isMet) {
//					prev[competency] += curr.competencyWeighting;
//				}
//			}
//		});
//		return prev;
//	}, stats);

//	var currentLevelIndex = getLevel(doc, levels);
//	//TODO: Logic to handle not finding the Level
//	var nextLevelIndex = getNextLevel(currentLevelIndex);

//	var nextLevel = "Principle";
//	var nextLevelScore = 0;
//	var nextLevelGateScore = 0;

//	//next level metadata
//	if (nextLevelIndex != "principle") {
//		nextLevel = levels[nextLevelIndex].description;
//		nextLevelScore = levels[nextLevelIndex].minimumScore;
//		nextLevelGateScore = levels[nextLevelIndex].minimumGateScore;
//	}
//	//current metadata
//	var currentScore = Math.round(doc.base + doc.intermediate + doc.senior);
//	var currentGateScore = nextLevel == "Senior" ? doc.senior : doc.intermediate;

//	//calculate score and gate percentage contribution
//	var totalPointsRequired = nextLevelScore + nextLevelGateScore;
//	var scorePercentageContribution = (nextLevelScore / totalPointsRequired) * 100;
//	var gatePercentageContribution = (nextLevelGateScore / totalPointsRequired) * 100;

//	//progress attributed to met score %age
//	var pointsNeededForNextLevel = Math.max((nextLevelScore - (currentScore - currentGateScore)), 0);
//	var calculatedPointsContribution = (1 - (pointsNeededForNextLevel / nextLevelScore)) * scorePercentageContribution;

//	//progress is attributed to met gate %age
//	var gatePointsNeededForNextLevel = Math.max((nextLevelGateScore - currentGateScore), 0);
//	var calculatedGateContribution = (1 - (gatePointsNeededForNextLevel / nextLevelGateScore)) * gatePercentageContribution;

//	var levelProgressValue = Math.round(calculatedPointsContribution + calculatedGateContribution);
//	var scoreThresholdPassed = (pointsNeededForNextLevel == 0) && (nextLevel != "Principle");
//	var gateThresholdPassed = gatePointsNeededForNextLevel == 0 && (nextLevel != "Principle");

//	var summary = {

//		//competency metadata
//		communication: Math.round(doc.communication / doc.communicationTotal * 100),
//		communicationAnswered: doc.answeredTotal === 0 ? 0 : Math.round(doc.communication / doc.answeredTotal * 100),
//		leadership: Math.round(doc.leadership / doc.leadershipTotal * 100),
//		leadershipAnswered: doc.answeredTotal === 0 ? 0 : Math.round(doc.leadership / doc.answeredTotal * 100),
//		interpersonal: Math.round(doc.interpersonal / doc.interpersonalTotal * 100),
//		interpersonalAnswered: doc.answeredTotal === 0 ? 0 : Math.round(doc.interpersonal / doc.answeredTotal * 100),
//		conflict: Math.round(doc.conflict / doc.conflictTotal * 100),
//		conflictAnswered: doc.answeredTotal === 0 ? 0 : Math.round(doc.conflict / doc.answeredTotal * 100),
//		citizenship: Math.round(doc.citizenship / doc.citizenshipTotal * 100),
//		citizenshipAnswered: doc.answeredTotal === 0 ? 0 : Math.round(doc.citizenship / doc.answeredTotal * 100),

//		//levels metadata
//		level: levels[currentLevelIndex].description,
//		nextLevel: nextLevel,

//		//score metadata
//		score: Math.round(doc.base + doc.intermediate + doc.senior),
//		gateScore: nextLevel == "Senior" ? doc.senior : doc.intermediate,
//		nextLevelScore: nextLevelScore,

//		//level progress metadata
//		levelProgressValue: levelProgressValue,
//		scoreThresholdPassed: scoreThresholdPassed,
//		gateThresholdPassed: gateThresholdPassed
//	};
//	return summary;
//}

		public ProfileDto Save(ProfileDto updatedProfile)
		{
			var userid = updatedProfile.UserId;
			var profile = _context.Profiles.FirstOrDefault(p => p.UserId == userid) ?? new Model.Profile { UserId = userid };
			if (profile.Id == 0)
			{
				_context.Profiles.Add(profile);
			}
			var metIds = updatedProfile.MetObjectives.Select(s => s.Id);
			profile.MetObjectives.Clear();
			var met = _context.Objectives.Where(i => metIds.Contains(i.Id));
			foreach (var o in met)
			{
				profile.MetObjectives.Add(o); 
			}
			_context.SaveChanges(userid);
			return GetProfile(userid);
		}
	}

	public class ProfileSummary
	{
	}
}
