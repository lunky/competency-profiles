using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Diagnostics;
using System.DirectoryServices;
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
            var search = new DirectorySearcher(adReference) { Filter = string.Format("(sAMAccountName={0})", username) };

            foreach (var property in propertyNames)
            {
                search.PropertiesToLoad.Add(property);
            }

            var result = search.FindOne();

            return result == null
                ? null
                : result.Properties;
        }

        public IEnumerable<TeamMemberDto> GetTeamMembers(string username)
        {
            var adConnection = WebConfigurationManager.ConnectionStrings["ADConnectionString"].ConnectionString;
            var adReference = new DirectoryEntry(adConnection);
            var search = new DirectorySearcher(adReference) { Filter = string.Format("(sAMAccountName={0})", username) };

            search.PropertiesToLoad.Add("*");
            var result = search.FindOne();
            if (result.Properties["directreports"].Count > 0)
            {
                var dn = Escape(result.Properties["distinguishedname"][0].ToString());
                var team = GetDirectReportsInternal(dn).ToList();
                return team;

            }
            return null;
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
                    ds.PropertiesToLoad.Add("displayName");
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
                                    DisplayName = sr.Properties["displayName"][0].ToString()
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