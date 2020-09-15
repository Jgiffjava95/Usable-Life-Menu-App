using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MenuApp.Models.Entity_Framework
{
    public class Discount {
        [Key]
        public int discountId { get; set; }
        public string discountName { get; set; }
        public int discountAmount { get; set; }
    }
}