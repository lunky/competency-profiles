namespace cpa.EntityFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class init : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.CompetencyLevels",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        GateLevelDescription = c.String(),
                        Description = c.String(),
                        MinimumScore = c.Int(nullable: false),
                        MinimumGateScore = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Objectives",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Communication = c.Boolean(nullable: false),
                        Leadership = c.Boolean(nullable: false),
                        Interpersonal = c.Boolean(nullable: false),
                        Conflict = c.Boolean(nullable: false),
                        Citizenship = c.Boolean(nullable: false),
                        Score = c.Int(nullable: false),
                        GateLevel = c.Int(nullable: false),
                        CompetencyWeighting = c.Int(nullable: false),
                        Description = c.String(),
                        SupportingExample = c.String(),
                        CounterExample = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Profiles",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserId = c.String(),
                        DisplayName = c.String(),
                        Level = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.ProfileObjectives",
                c => new
                    {
                        Profile_Id = c.Int(nullable: false),
                        Objective_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Profile_Id, t.Objective_Id })
                .ForeignKey("dbo.Profiles", t => t.Profile_Id, cascadeDelete: true)
                .ForeignKey("dbo.Objectives", t => t.Objective_Id, cascadeDelete: true)
                .Index(t => t.Profile_Id)
                .Index(t => t.Objective_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ProfileObjectives", "Objective_Id", "dbo.Objectives");
            DropForeignKey("dbo.ProfileObjectives", "Profile_Id", "dbo.Profiles");
            DropIndex("dbo.ProfileObjectives", new[] { "Objective_Id" });
            DropIndex("dbo.ProfileObjectives", new[] { "Profile_Id" });
            DropTable("dbo.ProfileObjectives");
            DropTable("dbo.Profiles");
            DropTable("dbo.Objectives");
            DropTable("dbo.CompetencyLevels");
        }
    }
}
