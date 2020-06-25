using MenuApp.Models.Entity_Framework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Web;

namespace MenuApp.Models
{
    public class DBC : DbContext
    {
        public DBC():base("name = DBC")
        {

        }

        //setting EF convention
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            // use singular table name
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            base.OnModelCreating(modelBuilder);
        }
        
        public DbSet<Order> Orders { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<Discount> Discount { get; set; }
        // public DbSet<itemFromJson> itemFromJson { get; set; }
    }
}