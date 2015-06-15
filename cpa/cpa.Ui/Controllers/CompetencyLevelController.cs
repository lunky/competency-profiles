using System.Collections.Generic;
using System.Web.Http;
using AutoMapper;
using cpa.Shared;

namespace cpa.Ui
{
	[Authorize]
	public class CompetencyLevelController : ApiController
	{
		private readonly IProfileService _profileService;

		public CompetencyLevelController(IProfileService profileService)
		{
			_profileService = profileService;
		}

		// GET api/<controller>
		[HttpGet]
		public List<CompetencyLevelModel> Get()
		{
			var competencyLevelDtos = _profileService.GetLevels();
			var competencyLevels = Mapper.Map<List<CompetencyLevelModel>>(competencyLevelDtos);
			return competencyLevels;
		}
	}
}