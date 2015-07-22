using System.Web;
using System.Web.Hosting;
using cpa.Service;

namespace cpa.Ui.HttpHandlers
{
	public class ActiveDirectoryThumbnailImage : IHttpHandler
	{
		public void ProcessRequest(HttpContext context)
		{
			var username = 
				context.Request.Params["u"] ??
				context.User.Identity.Name;

			var activeDirectoryUserService = new ActiveDirectoryUserService();
			var result = activeDirectoryUserService.GetProperties(username, "thumbnailPhoto");
			var resultCollection = result["thumbnailPhoto"];

            context.Response.Clear();
            context.Response.ContentType = "image/png";

            if (resultCollection.Count <= 0)
            {
                var file = HostingEnvironment.MapPath("~/Content/images/person.png");
                context.Response.WriteFile(file);
            }
            else
            {
                var thumbnailPhoto = resultCollection[0] as byte[] ?? new byte[] { };    
                context.Response.BinaryWrite(thumbnailPhoto);
            }
			
			context.Response.End();
		}

		public bool IsReusable { get; private set; }
	}
}