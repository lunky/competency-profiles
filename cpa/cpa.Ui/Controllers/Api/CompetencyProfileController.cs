using System.Diagnostics;
using System.Web;
using System.Web.Http;
using AutoMapper;
using cpa.Service;
using cpa.Shared;
using cpa.Shared.dtos;
using cpa.Ui.Models;

namespace cpa.Ui.Controllers.Api
{
    [Authorize]
    public class CompetencyProfileController : ApiController
    {
        private readonly IActiveDirectoryUserService _activeDirectoryUserService;
        private readonly IProfileService _profileService;

        public CompetencyProfileController(IProfileService profileService,
            IActiveDirectoryUserService activeDirectoryUserService)
        {
            _profileService = profileService;
            _activeDirectoryUserService = activeDirectoryUserService;
        }

        private static string UserId
        {
            get { return HttpContext.Current.User.Identity.Name; }
        }

        // GET api/<controller>
        [HttpGet]
        public CompetencyProfileModel Get()
        {
            var profileDto = _profileService.GetProfile(UserId);
            var profile = Mapper.Map<ProfileModel>(profileDto);

            var displayName = _activeDirectoryUserService.GetTeamMemberByUsername(UserId).DisplayName;

            return new CompetencyProfileModel
            {
                data = profile.MetObjectives,
                DisplayName = displayName
            };
        }

        [HttpPost]
        public CompetencyProfileModel Post([FromBody] ProfileObjectiveModel profileObjective)
        {
            var profileDto = Mapper.Map<ProfileObjectiveDto>(profileObjective);
            profileDto.UserId = UserId;

            _profileService.SaveProfileObjective(profileDto);
            return Get();
        }
    }
}