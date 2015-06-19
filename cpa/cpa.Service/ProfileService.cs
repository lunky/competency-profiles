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
				metObjective.Evidence = met.Evidence;
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

			//remove objectives that are no longer met
			foreach (var o in profile.Objectives.Reverse()
				.Where(o => updatedProfile.MetObjectives.All(mo => mo.Id != o.Id)))
			{
				//Remove it from the profile (which sets the ProfileObjective.ProfileId = null)
				profile.Objectives.Remove(o);
				//And remove the ProfileObjective from the database because you can't have a null ProfileId
				_context.ProfileObjectives.Remove(o);
				//I admit, it's a bad solution, but it goes away when the UI is changed to act (add/modify/delete) profile objectives, instead
				//	of how it currently passes the entire profile for saving
			}

			var met =
				from metObj in updatedProfile.MetObjectives
				join obj in _context.Objectives
					on metObj.Id equals obj.Id
				select new ProfileObjective
				{
					Evidence = metObj.Evidence,
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
