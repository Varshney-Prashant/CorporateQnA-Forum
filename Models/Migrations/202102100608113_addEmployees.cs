namespace Models.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addEmployees : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.AspNetUsers", "FullName");
            DropColumn("dbo.AspNetUsers", "Designation");
            DropColumn("dbo.AspNetUsers", "Company");
            DropColumn("dbo.AspNetUsers", "ImageUrl");
            DropColumn("dbo.AspNetUsers", "NoOfLikes");
            DropColumn("dbo.AspNetUsers", "NoOfDislikes");
        }
        
        public override void Down()
        {
            AddColumn("dbo.AspNetUsers", "NoOfDislikes", c => c.Int(nullable: false));
            AddColumn("dbo.AspNetUsers", "NoOfLikes", c => c.Int(nullable: false));
            AddColumn("dbo.AspNetUsers", "ImageUrl", c => c.String());
            AddColumn("dbo.AspNetUsers", "Company", c => c.String());
            AddColumn("dbo.AspNetUsers", "Designation", c => c.String());
            AddColumn("dbo.AspNetUsers", "FullName", c => c.String());
        }
    }
}
