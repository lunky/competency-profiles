using System.Web;
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

			if (resultCollection.Count <= 0) 
				return; //TODO: Default thumbnail

			var thumbnailPhoto = resultCollection[0] as byte[]
			                     ?? new byte[] {};

			context.Response.Clear();
			context.Response.ContentType = "image/png";
			context.Response.BinaryWrite(thumbnailPhoto);
			context.Response.End();
		}

		public bool IsReusable { get; private set; }
	}
}