using MenuApp.Models.Entity_Framework;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Dynamic;
using System.Linq;
using System.Web;

namespace MenuApp.Models
{
    public class Item

    {
        [Key]
        public int itemId { get; set; }
        public string itemName { get; set; }
        public double itemPrice { get; set; }
        public ItemTypes itemType { get; set; }


    }
}