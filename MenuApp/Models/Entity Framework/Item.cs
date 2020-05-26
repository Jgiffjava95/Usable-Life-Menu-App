using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MenuApp.Models
{
    public class Item

    {
        [Key]
        public string itemName { get; set; }
        public double itemPrice { get; set; }

    }

}