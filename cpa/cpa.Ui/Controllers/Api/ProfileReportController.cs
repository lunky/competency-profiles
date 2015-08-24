using System;
using System.Linq;
using System.Web.Http;
using AutoMapper;
using cpa.Shared;

namespace cpa.Ui
{
    [Authorize]
    public class ProfileReportController : ApiController
    {
        private readonly IProfileService _profileService;
        private readonly IActiveDirectoryUserService _activeDirectoryUserService;

        public ProfileReportController(IProfileService profileService, IActiveDirectoryUserService activeDirectoryUserService)
        {
            _profileService = profileService;
            _activeDirectoryUserService = activeDirectoryUserService;
        }

        // GET api/<controller>
        [HttpGet]
        public CompetencyProfileModel Get(string id)
        {
            if (!IsAuthorized(id)) throw new UnauthorizedAccessException();

            var displayName = _activeDirectoryUserService.GetTeamMemberByUsername(id).DisplayName;            
            var profileDto = _profileService.GetProfile(id);
            var profile = Mapper.Map<ProfileModel>(profileDto);
                        
            return new CompetencyProfileModel
            {
                data = profile.MetObjectives,
                DisplayName = displayName,
                UserId = profile.UserId
            };
        }

        private bool IsAuthorized(string user)
        {
            // Restrict to:
            // a) Self
            // b) Team members, if CM
            // c) Anyone, if admin

            var searchParams = new[]
            {
                "directreports",
                "memberOf"
            };

            var self = User.Identity.Name;

            var properties = _activeDirectoryUserService.GetProperties(self, searchParams);
            var isCareerMentor = properties[searchParams[0]].Count > 0;
            var isCpAdmin = properties[searchParams[1]].Cast<string>().Any(x => x.Contains("CPAdmin"));

            if (isCpAdmin) return true;

            if (isCareerMentor)
            {
                var team = _activeDirectoryUserService.GetTeamMembers(self);
                return team.Any(t => t.UserId == user);
            }
            
            return false;
        }
    }
}