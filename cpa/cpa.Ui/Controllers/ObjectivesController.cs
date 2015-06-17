using System.Collections.Generic;
using System.Web.Http;
using cpa.Shared;

namespace cpa.Ui
{
	[Authorize]
	public class ObjectivesController : ApiController
	{
		private readonly IProfileService _profileService;

		public ObjectivesController(IProfileService profileService)
		{
			_profileService = profileService;
		}

		[HttpGet]
		public List<ObjectiveModel> Get()
		{
			return new List<ObjectiveModel>();
		}
	}
}