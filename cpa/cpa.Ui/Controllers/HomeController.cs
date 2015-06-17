using System.Web.Mvc;

namespace cpa.Controllers
{
	[Authorize]
	public class HomeController : Controller
	{
		public ActionResult Index()
		{
			ViewBag.Title = "Home Page";

			return View();
		}

		[Route("CompetencyProfile")]
		public ActionResult CompetencyProfile()
		{
			return View();
		}

		[Route("CompetencyLevels")]
		public ActionResult CompetencyLevels()
		{
			return View();
		}

		[Route("ObjectiveAdmin")]
		public ActionResult ObjectiveAdmin()
		{
			return View();
		}
	}
}
