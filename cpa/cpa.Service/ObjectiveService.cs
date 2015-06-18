using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using cpa.EntityFramework;
using cpa.Model;
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

		public ObjectiveDto Save(ObjectiveDto objective)
		{
			var obj = _context.Objectives.FirstOrDefault(l => l.Id == objective.Id)
						?? new Objective { Id = objective.Id };
			if (obj.Id == 0)
			{
				_context.Objectives.Add(obj);
			}

			obj.Citizenship = objective.Citizenship;
			obj.Communication = objective.Communication;
			obj.CompetencyWeighting = objective.CompetencyWeighting;
			obj.Conflict = objective.Conflict;
			obj.CounterExample = objective.CounterExample;
			obj.Description = objective.Description;
			obj.GateLevel = objective.GateLevel;
			obj.Interpersonal = objective.Interpersonal;
			obj.Leadership = objective.Leadership;
			obj.Score = objective.Score;
			obj.SupportingExample = objective.SupportingExample;

			_context.SaveChanges("TODO"); //TODO: There's no auditing yet anyway...

			return GetObjectives().FirstOrDefault(x => x.Id == objective.Id);
		}
	}
}