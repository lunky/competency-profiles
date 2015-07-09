using System.DirectoryServices;
using System.Web.Mvc;
using System.Web.Security;
using cpa.Model;
using cpa.Service;

namespace cpa.Ui
{
	[AllowAnonymous]
	public class AccountController : Controller
	{
		public ActionResult Login()
		{
			return View();
		}

		[HttpPost]
		public ActionResult Login(LoginModel model, string returnUrl)
		{
			if (!ModelState.IsValid)
			{
				return View(model);
			}

			if (Membership.ValidateUser(model.UserName, model.Password))
			{
				FormsAuthentication.SetAuthCookie(model.UserName, false);
				if (Url.IsLocalUrl(returnUrl) && returnUrl.Length > 1 && returnUrl.StartsWith("/")
				    && !returnUrl.StartsWith("//") && !returnUrl.StartsWith("/\\"))
				{
					return Redirect(returnUrl);
				}
				return RedirectToAction("Index", "Home");
			}

            ModelState.AddModelError("FailedLogin", "The username or password provided is incorrect.");

			return View(model);
		}

		public ActionResult LogOff()
		{
			FormsAuthentication.SignOut();
			return RedirectToAction("Index", "Home");
		}
	}
}