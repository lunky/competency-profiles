using System.Collections.Generic;
using cpa.Shared.dtos;

namespace cpa.Shared
{
	public interface ICompetencyService
	{
		List<CompetencyLevelDto> GetLevels();
		CompetencyLevelDto SaveLevel(CompetencyLevelDto competencyLevel);
	}
}