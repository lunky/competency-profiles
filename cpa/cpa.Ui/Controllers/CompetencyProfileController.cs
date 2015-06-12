using System.Collections.Generic;
using System.Diagnostics;
using System.Web;
using System.Web.Http;
using AutoMapper;
using cpa.Shared;
using cpa.Shared.dtos;

namespace cpa.Ui
{
	[Authorize]
	public class CompetencyProfileController : ApiController
	{
		private static string UserId
		{
			get { return HttpContext.Current.User.Identity.Name; }
		}

		private readonly IProfileService _profileService;

		public CompetencyProfileController(IProfileService profileService)
		{
			_profileService = profileService;
		}

		// GET api/<controller>
		[HttpGet]
		public CompetencyProfileModel Get()
		{
			var profileDto = _profileService.GetProfile(UserId);
			var profile = Mapper.Map<ProfileModel>(profileDto);
			return new CompetencyProfileModel
			{
				data = profile.MetObjectives,
				summary = BuildSummary(profile.MetObjectives)
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
				data = profile.MetObjectives,
				summary = BuildSummary(profile.MetObjectives)
			};
		}

		private ProfileSummaryModel BuildSummary(IEnumerable<ObjectiveModel> objectives)
		{
			return new ProfileSummaryModel();
		}
	}
}