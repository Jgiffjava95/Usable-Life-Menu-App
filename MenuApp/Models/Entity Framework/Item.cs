using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Dynamic;
using System.Linq;
using System.Web;

namespace MenuApp.Models
{
    public class Item

    {
        [Key]
        public string itemName { get; set; }
        public double itemPrice { get; set; }

        public string itemType { get; set; }


    }
}