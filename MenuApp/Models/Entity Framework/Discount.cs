using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MenuApp.Models.Entity_Framework
{
    public class Discount {
        [Key]
        public string discountName { get; set; }
        public int discountAmount { get; set; }
    }
}