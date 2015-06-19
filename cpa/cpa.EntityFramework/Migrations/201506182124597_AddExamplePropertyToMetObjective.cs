namespace cpa.EntityFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddExamplePropertyToMetObjective : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.ProfileObjectives", "Profile_Id", "dbo.Profiles");
            DropForeignKey("dbo.ProfileObjectives", "Objective_Id", "dbo.Objectives");
            DropIndex("dbo.ProfileObjectives", new[] { "Profile_Id" });
            DropIndex("dbo.ProfileObjectives", new[] { "Objective_Id" });
            CreateTable(
                "dbo.MetObjectives",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Example = c.String(),
                        Objective_Id = c.Int(),
                        Profile_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Objectives", t => t.Objective_Id)
                .ForeignKey("dbo.Profiles", t => t.Profile_Id)
                .Index(t => t.Objective_Id)
                .Index(t => t.Profile_Id);
            
            DropTable("dbo.ProfileObjectives");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.ProfileObjectives",
                c => new
                    {
                        Profile_Id = c.Int(nullable: false),
                        Objective_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Profile_Id, t.Objective_Id });
            
            DropForeignKey("dbo.MetObjectives", "Profile_Id", "dbo.Profiles");
            DropForeignKey("dbo.MetObjectives", "Objective_Id", "dbo.Objectives");
            DropIndex("dbo.MetObjectives", new[] { "Profile_Id" });
            DropIndex("dbo.MetObjectives", new[] { "Objective_Id" });
            DropTable("dbo.MetObjectives");
            CreateIndex("dbo.ProfileObjectives", "Objective_Id");
            CreateIndex("dbo.ProfileObjectives", "Profile_Id");
            AddForeignKey("dbo.ProfileObjectives", "Objective_Id", "dbo.Objectives", "Id", cascadeDelete: true);
            AddForeignKey("dbo.ProfileObjectives", "Profile_Id", "dbo.Profiles", "Id", cascadeDelete: true);
        }
    }
}
