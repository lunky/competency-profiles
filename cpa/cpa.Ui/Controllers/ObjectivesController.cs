using System.Collections.Generic;
using System.Diagnostics;
using System.Web.Http;
using AutoMapper;
using cpa.Shared;
using cpa.Shared.dtos;

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

		[HttpPost]
		public ObjectiveModel Post([FromBody] ObjectiveModel objectiveModel)
		{
			Debug.WriteLine(objectiveModel);

			var objectiveDto = Mapper.Map<ObjectiveDto>(objectiveModel);
			var newObjectiveDto = _objectiveService.Save(objectiveDto);
			var newObjectiveModel = Mapper.Map<ObjectiveModel>(newObjectiveDto);
			return newObjectiveModel;
		}
	}
}