namespace cpa.EntityFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ProfileObjectiveRelationship : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.ProfileObjectives", "Profile_Id", "dbo.Profiles");
            DropIndex("dbo.ProfileObjectives", new[] { "Profile_Id" });
            AlterColumn("dbo.ProfileObjectives", "Profile_Id", c => c.Int(nullable: false));
            CreateIndex("dbo.ProfileObjectives", "Profile_Id");
            AddForeignKey("dbo.ProfileObjectives", "Profile_Id", "dbo.Profiles", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ProfileObjectives", "Profile_Id", "dbo.Profiles");
            DropIndex("dbo.ProfileObjectives", new[] { "Profile_Id" });
            AlterColumn("dbo.ProfileObjectives", "Profile_Id", c => c.Int());
            CreateIndex("dbo.ProfileObjectives", "Profile_Id");
            AddForeignKey("dbo.ProfileObjectives", "Profile_Id", "dbo.Profiles", "Id");
        }
    }
}
