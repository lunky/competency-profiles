namespace cpa.EntityFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ForeignKey : DbMigration
    {
        public override void Up()
        {
            RenameColumn(table: "dbo.ProfileObjectives", name: "Profile_Id", newName: "ProfileId");
            RenameIndex(table: "dbo.ProfileObjectives", name: "IX_Profile_Id", newName: "IX_ProfileId");
        }
        
        public override void Down()
        {
            RenameIndex(table: "dbo.ProfileObjectives", name: "IX_ProfileId", newName: "IX_Profile_Id");
            RenameColumn(table: "dbo.ProfileObjectives", name: "ProfileId", newName: "Profile_Id");
        }
    }
}
