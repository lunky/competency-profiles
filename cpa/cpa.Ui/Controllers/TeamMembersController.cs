using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using cpa.EntityFramework;
using cpa.Service;
using cpa.Shared.dtos;
using cpa.Ui.Models;

namespace cpa.Ui.Controllers
{
    public class TeamMembersController : ApiController
    {
        private readonly CpaContext _cpaContext;

        public TeamMembersController(CpaContext context)
        {
            _cpaContext = context;
        }

        // GET api/<controller>
        public IEnumerable<TeamMemberModel> Get()
        {
            var activeDirectoryUserService = new ActiveDirectoryUserService();
            var team = activeDirectoryUserService.GetTeamMembers("alevine");

            var teamMemberDtos = team as IList<TeamMemberDto> ?? team.ToList();
            var teamMembersProfile =
                (from t in teamMemberDtos.Select(t => t.UserId)
                    join p in _cpaContext.Profiles
                        on t equals p.UserId
                    select new TeamMemberModel
                    {
                        UserId = t,
                        Level = p.Level ?? "No profile Data",
                        DisplayName = teamMemberDtos.First(m => m.UserId == p.UserId).DisplayName
                    }).ToList();

            var teamMembersAd =
                (from t in teamMemberDtos
                    select new TeamMemberModel
                    {
                        UserId = t.UserId,
                        Level = "No Profile Data",
                        DisplayName = t.DisplayName
                    }).ToList();

            teamMembersAd.Union(teamMembersProfile);

            return teamMembersAd;
        }
    }
}