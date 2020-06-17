using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace MenuApp.Models
{
    public class Order
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int orderId { get; set; }

        [Required]
        [MaxLength(32)]
        public string customerName { get; set; }

        [Required]
       // public List<itemFromJson> orderItems { get; set; }

        public string orderItems { get; set; }
        public double orderPrice { get; set; }
        public DateTime timeOfOrder { get; set; }

        public string employeeThatTookOrder { get; set; }

    }

}