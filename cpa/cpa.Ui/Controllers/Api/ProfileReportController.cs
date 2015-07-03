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
    }
}