using System.Data.Entity;
using cpa.Model;

namespace cpa.EntityFramework
{
	public class CpaContext : DbContext, ICpaContext, IUnitOfWork
	{
		public CpaContext()
			: base("Name=CpaContext")
		{
		}

		public IDbSet<Objective> Objectives { get; set; }
		public IDbSet<Profile> Profiles { get; set; }
		public IDbSet<CompetencyLevel> CompetencyLevels { get; set; }
		public IDbSet<ProfileObjective> ProfileObjectives { get; set; }

		protected override void OnModelCreating(DbModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

			modelBuilder.Entity<Profile>()
				.HasMany(x => x.Objectives)
				.WithRequired()
				.HasForeignKey(x => x.ProfileId)
				.WillCascadeOnDelete();
		}

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
