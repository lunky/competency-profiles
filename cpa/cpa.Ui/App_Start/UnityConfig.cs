using cpa.EntityFramework;
using cpa.Service;
using cpa.Shared;
using Microsoft.Practices.Unity;
using System.Web.Http;
using Unity.WebApi;

namespace cpa.Ui
{
	public static class UnityConfig
	{
		public static void RegisterComponents()
		{
			var container = new UnityContainer();
			
			// register all your components with the container here
			// it is NOT necessary to register your controllers
			
			// e.g. container.RegisterType<ITestService, TestService>();

			container.RegisterType<ICpaContext, CpaContext>(new HierarchicalLifetimeManager());
			container.RegisterType<IProfileService, ProfileService>();
			container.RegisterType<IActiveDirectoryUserService, ActiveDirectoryUserService>();
			GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
		}
	}
}