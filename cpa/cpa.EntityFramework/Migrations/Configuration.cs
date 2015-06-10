using System.Data.Entity.Migrations;

namespace cpa.EntityFramework.Migrations
{

    internal sealed class Configuration : DbMigrationsConfiguration<cpa.EntityFramework.CpaContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(CpaContext context)
        {
	        SeedData.Seed(context);

	        //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
	        //  to avoid creating duplicate seed data. E.g.
	        //
	        //    context.People.AddOrUpdate(
	        //      p => p.FullName,
	        //      new Person { FullName = "Andrew Peters" },
	        //      new Person { FullName = "Brice Lambson" },
	        //      new Person { FullName = "Rowan Miller" }
	        //    );
	        //
        }
    }
}
