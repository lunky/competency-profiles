using System.Collections.Generic;
using System.Web.Http;
using AutoMapper;
using cpa.Shared;

namespace cpa.Ui
{
	[Authorize]
	public class ObjectivesController : ApiController
	{
		private readonly IProfileService _profileService;

		public ObjectivesController(IProfileService profileService)
		{
			_profileService = profileService;
		}

		[HttpGet]
		public List<ObjectiveModel> Get()
		{
			var objectiveModelDtos = _profileService.GetObjectives();
			var objectiveModels = Mapper.Map<List<ObjectiveModel>>(objectiveModelDtos);
			return objectiveModels;
		}
	}
}