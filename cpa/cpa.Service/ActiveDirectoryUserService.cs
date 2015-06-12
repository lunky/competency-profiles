using System.DirectoryServices;
using System.Web.Configuration;
using cpa.Shared;

namespace cpa.Service
{
	public class ActiveDirectoryUserService : IActiveDirectoryUserService
	{
		public ResultPropertyCollection GetProperties(string username, params string[] propertyNames)
		{
			var adConnection = WebConfigurationManager.ConnectionStrings["ADConnectionString"].ConnectionString;
			var adReference = new DirectoryEntry(adConnection);
			var search = new DirectorySearcher(adReference) { Filter = string.Format("(sAMAccountName={0})", username) };
			search.PropertiesToLoad.Add("thumbnailPhoto");
			var result = search.FindOne();

			return result == null
				? null
				: result.Properties;
		}
	}
}