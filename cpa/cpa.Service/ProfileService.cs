using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using cpa.EntityFramework;
using cpa.Model;
using cpa.Shared;
using cpa.Shared.dtos;
using Profile = cpa.Model.Profile;

namespace cpa.Service
{
    public class ProfileService : IProfileService
    {
        private readonly IActiveDirectoryUserService _activeDirectoryUserService;
        private readonly ICpaContext _context;

        public ProfileService(ICpaContext context, IActiveDirectoryUserService activeDirectoryUserService)
        {
            _context = context;
            _activeDirectoryUserService = activeDirectoryUserService;
        }

        public ProfileDto GetProfile(string userId)
        {
            var profile = _context.Profiles.FirstOrDefault(p => p.UserId == userId) ?? new Profile {UserId = userId};
            var metObjectives = profile.Objectives;
            var objectives = Mapper.Map<List<ObjectiveDto>>(_context.Objectives);

            foreach (var met in metObjectives)
            {
                var metObjective = objectives.Single(o => o.Id == met.Objective.Id);
                metObjective.IsMet = true;
                metObjective.Evidence = met.Evidence;
            }

            var profileDto = Mapper.Map<ProfileDto>(profile);

            var displayName = _activeDirectoryUserService.GetTeamMemberByUsername(userId).DisplayName;

            profileDto.MetObjectives = objectives;
            profileDto.DisplayName = displayName;
            return profileDto;
        }

        public ProfileDto Save(ProfileDto updatedProfile)
        {
            var userid = updatedProfile.UserId;
            var profile = _context.Profiles.FirstOrDefault(p => p.UserId == userid) ?? new Profile {UserId = userid};
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

        public bool SaveProfileObjective(ProfileObjectiveDto objective)
        {
            var userid = objective.UserId;

            var profile = _context.Profiles.FirstOrDefault(p => p.UserId == userid) ?? new Profile {UserId = userid};
            if (profile.Id == 0)
            {
                var user = _activeDirectoryUserService.GetTeamMemberByUsername(userid);

                profile.DisplayName = user.DisplayName;
                profile.Level = user.Level ?? _context.CompetencyLevels.Single(c => c.MinimumScore == 0).Description;

                _context.Profiles.Add(profile);
            }

            var objectiveToUpdate =
                _context.ProfileObjectives.FirstOrDefault(
                    o => o.Objective.Id == objective.ObjectiveId && o.ProfileId == profile.Id);

            if (objectiveToUpdate != null)
            {
                if (!objective.IsObjectiveMet)
                {
                    profile.Objectives.Remove(objectiveToUpdate);
                    _context.ProfileObjectives.Remove(objectiveToUpdate);
                }
                else
                {
                    objectiveToUpdate.Evidence = objective.Evidence;
                    objectiveToUpdate.IsMet = true;
                }
                
            }
            else
            {
                var newObjective = _context.Objectives.FirstOrDefault(o => o.Id == objective.ObjectiveId);
                profile.Objectives.Add(new ProfileObjective
                {
                    Evidence = objective.Evidence,
                    IsMet = objective.IsObjectiveMet,
                    ProfileId = profile.Id,
                    Objective = newObjective
                });
            }

            try
            {
                _context.SaveChanges(userid);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}