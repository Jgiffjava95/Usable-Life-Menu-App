using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MenuApp.Models.Entity_Framework
{
    public class ItemTypes
    {
        [Key]
        public string typeName { get; set; }
    }
}