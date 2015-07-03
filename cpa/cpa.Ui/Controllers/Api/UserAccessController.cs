using System.Linq;
using System.Web.Http;
using AutoMapper;
using cpa.Service;
using cpa.Shared.dtos;
using cpa.Ui.Models;

namespace cpa.Ui.Controllers.Api
{
    public class UserAccessController : ApiController
    {
        [HttpGet]
        public UserAccessModel Get()
        {
            var searchParams = new[]
            {
                "directreports",
                "memberOf"
            };

            var activeDirectoryUserService = new ActiveDirectoryUserService();
            var properties = activeDirectoryUserService.GetProperties("alevine", searchParams);
            
            var userAccessDto = new UserAccessDto
            {
                IsCareerMentor = properties[searchParams[0]].Count > 0,
                IsCpAdmin = properties[searchParams[1]].Cast<string>().Any(x => x.Contains("CPAdmin"))
            };

            return Mapper.Map<UserAccessModel>(userAccessDto);
        }
    }
}