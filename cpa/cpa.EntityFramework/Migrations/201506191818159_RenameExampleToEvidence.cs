namespace cpa.EntityFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RenameExampleToEvidence : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ProfileObjectives", "Evidence", c => c.String());
            DropColumn("dbo.ProfileObjectives", "Example");
        }
        
        public override void Down()
        {
            AddColumn("dbo.ProfileObjectives", "Example", c => c.String());
            DropColumn("dbo.ProfileObjectives", "Evidence");
        }
    }
}
