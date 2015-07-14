using System;
using System.Collections.Generic;
using System.DirectoryServices;
using System.DirectoryServices.AccountManagement;
using System.Linq;
using System.Web.Configuration;
using cpa.Shared;
using cpa.Shared.dtos;

namespace cpa.Service
{
    public class ActiveDirectoryUserService : IActiveDirectoryUserService
    {
        private const string DomainPath = "LDAP://DC=obsglobal,DC=com";

        public ResultPropertyCollection GetProperties(string username, params string[] propertyNames)
        {
            var adConnection = WebConfigurationManager.ConnectionStrings["ADConnectionString"].ConnectionString;
            var adReference = new DirectoryEntry(adConnection);
            var search = new DirectorySearcher(adReference) {Filter = string.Format("(sAMAccountName={0})", username)};

            foreach (var property in propertyNames)
            {
                search.PropertiesToLoad.Add(property);
            }

            var result = search.FindOne();

            return result == null
                ? null
                : result.Properties;
        }

        private static DirectorySearcher DirectorySearcher(string username)
        {
            var adConnection = WebConfigurationManager.ConnectionStrings["ADConnectionString"].ConnectionString;
            var adReference = new DirectoryEntry(adConnection);
            var search = new DirectorySearcher(adReference) {Filter = string.Format("(sAMAccountName={0})", username)};
            return search;
        }

        //AP: because database doesn't have display names data
        public TeamMemberDto GetTeamMemberByUsername(string username)
        {
            using (var context = new PrincipalContext(ContextType.Domain))
            {
                using (var user = UserPrincipal.FindByIdentity(context, username))
                {
                    return new TeamMemberDto
                    {
                        UserId = username,
                        DisplayName = string.Format("{0} {1}", user.GivenName, user.Surname)
                    };
                }
            }

            //var search = DirectorySearcher(username);
            //AP: add new search properties if needed
            //search.PropertiesToLoad.Add("displayName");
            //var result = search.FindOne();
            //return new TeamMemberDto
            //{
            //    DisplayName = result.Properties["displayName"][0].ToString(),
            //    UserId = username
            //};
        }

        public IEnumerable<TeamMemberDto> GetTeamMembers(string username)
        {
            var search = DirectorySearcher(username);

            search.PropertiesToLoad.Add("*");
            var result = search.FindOne();
            var team = new List<TeamMemberDto>();

            if (result.Properties["directreports"].Count > 0)
            {
                var dn = Escape(result.Properties["distinguishedname"][0].ToString());
                team = GetDirectReportsInternal(dn).ToList();
            }

            team.Add(GetTeamMemberByUsername(username));

            return team;
        }

        private static string Escape(string distinguishedName)
        {
            var escaped = distinguishedName;
            escaped = escaped.Replace("*", @"\2a");
            escaped = escaped.Replace("(", @"\28");
            escaped = escaped.Replace(")", @"\29");
            escaped = escaped.Replace(@"\", @"\5c");
            escaped = escaped.Replace("NUL", @"\00");
            escaped = escaped.Replace("/", @"\2f");
            return escaped;
        }

        private static IEnumerable<TeamMemberDto> GetDirectReportsInternal(string userDn)
        {
            var result = new List<TeamMemberDto>();
            using (var directoryEntry = new DirectoryEntry(DomainPath))
            {
                using (var ds = new DirectorySearcher(directoryEntry))
                {
                    ds.SearchScope = SearchScope.Subtree;
                    ds.PropertiesToLoad.Clear();
                    ds.PropertiesToLoad.Add("givenName");
                    ds.PropertiesToLoad.Add("sn");
                    ds.PropertiesToLoad.Add("samaccountname");
                    ds.PageSize = 10;
                    ds.ServerPageTimeLimit = TimeSpan.FromSeconds(2);
                    ds.Filter = string.Format("(&(objectCategory=user)(manager={0}))", userDn);
                    using (var src = ds.FindAll())
                    {
                        foreach (SearchResult sr in src)
                        {
                            if (!sr.Path.Contains(@"CN=Disabled Users"))
                            {
                                result.Add(new TeamMemberDto
                                {
                                    UserId = sr.Properties["samaccountname"][0].ToString(),
                                    DisplayName = string.Format("{0} {1}", sr.Properties["givenName"][0], sr.Properties["sn"][0])
                                });
                            }
                        }
                    }
                }
            }

            return result;
        }
    }
}