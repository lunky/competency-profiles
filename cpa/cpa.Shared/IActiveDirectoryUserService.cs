using System.Collections.Generic;
using System.DirectoryServices;
using cpa.Shared.dtos;

namespace cpa.Shared
{
	public interface IActiveDirectoryUserService
	{
		ResultPropertyCollection GetProperties(string username, string[] propertyNames);
	    TeamMemberDto GetTeamMemberByUsername(string username);
	    IEnumerable<TeamMemberDto> GetTeamMembers(string username);
	}
}