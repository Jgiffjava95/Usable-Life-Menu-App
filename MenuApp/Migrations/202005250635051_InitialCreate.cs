namespace MenuApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Item",
                c => new
                    {
                        itemName = c.String(nullable: false, maxLength: 128),
                        itemPrice = c.Double(nullable: false),
                    })
                .PrimaryKey(t => t.itemName);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Item");
        }
    }
}
