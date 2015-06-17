using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using cpa.EntityFramework;
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
			var metObjectives = profile.MetObjectives;
			var objectives =  Mapper.Map<List<ObjectiveDto>>(_context.Objectives);
			foreach (var met in metObjectives)
			{
				objectives.Single(o => o.Id == met.Id).IsMet = true;

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
			var metIds = updatedProfile.MetObjectives.Select(s => s.Id);
			profile.MetObjectives.Clear();
			var met = _context.Objectives.Where(i => metIds.Contains(i.Id));
			foreach (var o in met)
			{
				profile.MetObjectives.Add(o); 
			}
			_context.SaveChanges(userid);
			return GetProfile(userid);
		}
	}
}
