using System.Diagnostics;
using System.Web;
using System.Web.Http;
using AutoMapper;
using cpa.Service;
using cpa.Shared;
using cpa.Shared.dtos;

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
        public CompetencyProfileModel Post([FromBody] ProfileModel profileModel)
        {
            Debug.WriteLine(profileModel);
            foreach (var o in profileModel.MetObjectives)
            {
                o.IsMet = true;
            }
            profileModel.UserId = UserId;
            var profileDto = Mapper.Map<ProfileDto>(profileModel);
            var newProfileDto = _profileService.Save(profileDto);
            var profile = Mapper.Map<ProfileModel>(newProfileDto);
            return new CompetencyProfileModel
            {
                data = profile.MetObjectives
            };
        }
    }
}