using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using cpa.EntityFramework;
using cpa.Shared;
using cpa.Shared.dtos;

namespace cpa.Service
{
	public class ObjectiveService : IObjectiveService
	{
		private readonly ICpaContext _context;

		public ObjectiveService(ICpaContext context)
		{
			_context = context;
		}

		public List<ObjectiveDto> GetObjectives()
		{
			var objectives = _context.Objectives.ToList();
			var objectiveDtos = Mapper.Map<List<ObjectiveDto>>(objectives);
			return objectiveDtos;
		}
	}
}