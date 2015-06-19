using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using cpa.EntityFramework;
using cpa.Model;
using cpa.Shared;
using cpa.Shared.dtos;

namespace cpa.Service
{
	public class ProfileService : IProfileService
	{
		private readonly ICpaContext _context;

		public ProfileService(ICpaContext context)
		{
			_context = context;
		}

		public ProfileDto GetProfile(string userId)
		{
			var profile = _context.Profiles.FirstOrDefault(p => p.UserId == userId) ?? new Model.Profile {UserId = userId};
			var metObjectives = profile.Objectives;
			var objectives =  Mapper.Map<List<ObjectiveDto>>(_context.Objectives);
			foreach (var met in metObjectives)
			{
				var metObjective = objectives.Single(o => o.Id == met.Objective.Id);
				metObjective.IsMet = true;
				metObjective.Example = met.Example;
			}

			var profileDto = Mapper.Map<ProfileDto>(profile);
			
			profileDto.MetObjectives = objectives;
			return profileDto;
		}

		public ProfileDto Save(ProfileDto updatedProfile)
		{
			var userid = updatedProfile.UserId;
			var profile = _context.Profiles.FirstOrDefault(p => p.UserId == userid) ?? new Model.Profile { UserId = userid };
			if (profile.Id == 0)
			{
				_context.Profiles.Add(profile);
			}
			
			profile.Objectives.Clear();
			var met = 
				from metObj in updatedProfile.MetObjectives
				join obj in _context.Objectives
					on metObj.Id equals obj.Id
				select new ProfileObjective
				{
					Example = metObj.Example,
					IsMet = metObj.IsMet,
					Objective = obj
				};
			
			foreach (var o in met)
			{
				profile.Objectives.Add(o); 
			}

			_context.SaveChanges(userid);
			return GetProfile(userid);
		}
	}
}
