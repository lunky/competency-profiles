using System.Collections.Generic;
using cpa.Shared.dtos;

namespace cpa.Shared
{
	public interface IProfileService
	{
		ProfileDto GetProfile(string userid);
		ProfileDto Save(ProfileDto updatedProfile);
		List<CompetencyLevelDto> GetLevels();
	}
}