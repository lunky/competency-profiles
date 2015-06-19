using System.Web.Optimization;

namespace cpa.Ui
{
	public class BundleConfig
	{
		// For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
		public static void RegisterBundles(BundleCollection bundles)
		{
			bundles.Add(new ScriptBundle("~/bundles/scripts").Include(
				"~/Scripts/angular.js",
				"~/Scripts/angular-route.js",
				"~/Scripts/angular-animate.js",
				"~/Scripts/angular-ui/ui-bootstrap-tpls.js",
				"~/Scripts/toaster.js",
				"~/Scripts/angular-google-chart/ng-google-chart.js",


				"~/app/app.js",
				"~/app/common.js",
				"~/app/services/*.js",
				
                "~/app/directives/*.js",
				
                "~/app/controllers/*.js"

				));

			bundles.Add(new StyleBundle("~/Content/styles").Include(
	
				"~/Content/toaster.css",
				"~/Content/font-awesome.min.css",
					  "~/Content/bootstrap.css",
					  "~/Content/toaster.css",
					  "~/Content/styles.css"));
		}
	}
}
