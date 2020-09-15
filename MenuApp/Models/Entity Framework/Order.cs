using MenuApp.Models.Entity_Framework;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace MenuApp.Models
{
    public class Order
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int orderId { get; set; }

        [Required]
        public string customerName { get; set; }

        [Required]

        public string orderItems { get; set; }
        public double orderPrice { get; set; }
        public Discount discountId { get; set; }
        public DateTime timeOfOrder { get; set; }

        public void setDateTime(DateTime timeNow)
        {
            this.timeOfOrder = timeNow;
        }

    }

}