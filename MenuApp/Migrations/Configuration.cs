namespace MenuApp.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<MenuApp.Models.DBC>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            ContextKey = "MenuApp.Models.DBC";
        }

        protected override void Seed(MenuApp.Models.DBC context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method
            //  to avoid creating duplicate seed data.
        }
    }
}
