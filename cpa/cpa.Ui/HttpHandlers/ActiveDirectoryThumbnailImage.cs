using System.DirectoryServices;
using System.Web;
using System.Web.Configuration;

namespace cpa.Ui.HttpHandlers
{
	public class ActiveDirectoryThumbnailImage : IHttpHandler
	{
		public void ProcessRequest(HttpContext context)
		{
			var username = 
				context.Request.Params["u"] ??
				context.User.Identity.Name;

			var adConnection = WebConfigurationManager.ConnectionStrings["ADConnectionString"].ConnectionString;
			var adReference = new DirectoryEntry(adConnection);
			var search = new DirectorySearcher(adReference) { Filter = string.Format("(sAMAccountName={0})", username) };
			search.PropertiesToLoad.Add("thumbnailPhoto");
			var result = search.FindOne();

			if (result == null) 
				return;

			var resultCollection = result.Properties["thumbnailPhoto"];
			if (resultCollection.Count > 0)
			{
				var thumbnailPhoto = resultCollection[0] as byte[]
				                     ?? new byte[] {};

				context.Response.Clear();
				context.Response.ContentType = "image/png";
				context.Response.BinaryWrite(thumbnailPhoto);
				context.Response.End();
			}
		}

		public bool IsReusable { get; private set; }
	}
}