using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using cpa.Service;

namespace cpa.Ui.Controllers
{
    public class UserAccessController : ApiController
    {
        [HttpGet]
        public bool IsCareerMentor()
        {
            const string searchParam = "directreports";
            var activeDirectoryUserService = new ActiveDirectoryUserService();
            var properties = activeDirectoryUserService.GetProperties(User.Identity.Name, searchParam);

            return properties[searchParam].Count > 0;
        }

        [HttpGet]
        public bool IsCpAdmin()
        {
            const string searchParam = "memberOf";
            var activeDirectoryUserService = new ActiveDirectoryUserService();
            var properties = activeDirectoryUserService.GetProperties(User.Identity.Name, searchParam);

            return properties[searchParam].Cast<string>().Any(x => x.Contains("CPAdmin"));
        }
    }
}