namespace cpa.EntityFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RenameMetObjectives : DbMigration
    {
        public override void Up()
        {
            RenameTable(name: "dbo.MetObjectives", newName: "ProfileObjectives");
            AddColumn("dbo.ProfileObjectives", "IsMet", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.ProfileObjectives", "IsMet");
            RenameTable(name: "dbo.ProfileObjectives", newName: "MetObjectives");
        }
    }
}
