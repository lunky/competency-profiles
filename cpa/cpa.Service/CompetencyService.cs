using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using cpa.EntityFramework;
using cpa.Model;
using cpa.Shared;
using cpa.Shared.dtos;

namespace cpa.Service
{
	public class CompetencyService : ICompetencyService
	{
		private readonly ICpaContext _context;

		public CompetencyService(ICpaContext context)
		{
			_context = context;
		}

		public List<CompetencyLevelDto> GetLevels()
		{
			var competencyLevels = _context.CompetencyLevels.ToList();
			var competencyLevelsDto = Mapper.Map<List<CompetencyLevelDto>>(competencyLevels);
			return competencyLevelsDto;
		}

		public CompetencyLevelDto SaveLevel(CompetencyLevelDto competencyLevel, string changedBy)
		{
			var level = _context.CompetencyLevels.FirstOrDefault(l => l.Id == competencyLevel.Id)
			            ?? new CompetencyLevel { Id = competencyLevel.Id };
			if (level.Id == 0)
			{
				_context.CompetencyLevels.Add(level);
			}

			level.MinimumScore = competencyLevel.MinimumScore;
			level.MinimumGateScore = competencyLevel.MinimumGateScore;
			_context.SaveChanges(changedBy);

			return GetLevels().FirstOrDefault(x => x.Id == competencyLevel.Id);
		}
	}
}