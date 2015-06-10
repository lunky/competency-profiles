using System.Data.Entity;
using System.Diagnostics;
using cpa.Model;

namespace cpa.EntityFramework
{
	public class CpaContext : DbContext, ICpaContext, IUnitOfWork
	{
		public CpaContext():base("Name=CpaContext")
		{
//			Database.Log = s => Debug.WriteLine(s);

		}
		public IDbSet<Objective> Objectives { get; set; }
		public IDbSet<Profile> Profiles { get; set; }
		public IDbSet<CompetencyLevel> CompetencyLevels { get; set; }

		private new int SaveChanges()
		{
			return base.SaveChanges();
		}

		public int SaveChanges(string user)
		{
			ChangeTracker.DetectChanges();
			//AuditChanges(user);


			return SaveChanges();
		}
	}
}
