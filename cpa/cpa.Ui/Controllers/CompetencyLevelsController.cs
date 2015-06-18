using System.Collections.Generic;
using System.Diagnostics;
using System.Web.Http;
using AutoMapper;
using cpa.Shared;
using cpa.Shared.dtos;

namespace cpa.Ui
{
	[Authorize]
	public class CompetencyLevelsController : ApiController
	{
		private readonly ICompetencyService _competencyService;

		public CompetencyLevelsController(ICompetencyService competencyService)
		{
			_competencyService = competencyService;
		}

		// GET api/<controller>
		[HttpGet]
		public List<CompetencyLevelModel> Get()
		{
			var competencyLevelDtos = _competencyService.GetLevels();
			var competencyLevels = Mapper.Map<List<CompetencyLevelModel>>(competencyLevelDtos);
			return competencyLevels;
		}

		[HttpPost]
		public CompetencyLevelModel Post([FromBody] CompetencyLevelModel competencyLevelModel)
		{
			Debug.WriteLine(competencyLevelModel);
			var competencyLevelDto = Mapper.Map<CompetencyLevelDto>(competencyLevelModel);
			var newCompetencyLevelDto = _competencyService.SaveLevel(competencyLevelDto);
			var competencyLevel = Mapper.Map<CompetencyLevelModel>(newCompetencyLevelDto);
			return competencyLevel;
		}
	}
}