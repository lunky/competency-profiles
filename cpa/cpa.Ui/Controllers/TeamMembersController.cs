using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using cpa.EntityFramework;
using cpa.Service;
using cpa.Ui.Models;

namespace cpa.Ui.Controllers
{
    public class TeamMembersController : ApiController
    {
        private CpaContext _cpaContext;

        public TeamMembersController(CpaContext context)
        {
            _cpaContext = context;
        }

        // GET api/<controller>
        public IEnumerable<TeamMemberModel> Get()
        {
            var activeDirectoryUserService = new ActiveDirectoryUserService();
            var team = activeDirectoryUserService.GetTeamMembers("alevine");
            
            var teamMembers = (
                from t in team
                join p in _cpaContext.Profiles
                    on t equals p.UserId
                select new TeamMemberModel()
                {
                    UserId = p.UserId,
                    Level = p.Level,
                    DisplayName = p.DisplayName
                }).ToList();

            return teamMembers;
        }
    }
}