using System.Collections.Generic;
using System.Web.Http;
using AutoMapper;
using cpa.Shared;

namespace cpa.Ui
{
	[Authorize]
	public class ObjectivesController : ApiController
	{
		private readonly IObjectiveService _objectiveService;

		public ObjectivesController(IObjectiveService objectiveService)
		{
			_objectiveService = objectiveService;
		}

		[HttpGet]
		public List<ObjectiveModel> Get()
		{
			var objectiveModelDtos = _objectiveService.GetObjectives();
			var objectiveModels = Mapper.Map<List<ObjectiveModel>>(objectiveModelDtos);
			return objectiveModels;
		}
	}
}