using System.DirectoryServices;

namespace cpa.Shared
{
	public interface IActiveDirectoryUserService
	{
		ResultPropertyCollection GetProperties(string username, string[] propertyNames);
	}
}