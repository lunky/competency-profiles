using System.Collections.Generic;
using cpa.Shared.dtos;

namespace cpa.Shared
{
	public interface IObjectiveService
	{
		List<ObjectiveDto> GetObjectives();
	}
}