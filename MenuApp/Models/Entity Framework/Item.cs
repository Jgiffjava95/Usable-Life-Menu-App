using MenuApp.Models.Entity_Framework;
using System.ComponentModel.DataAnnotations;


namespace MenuApp.Models
{
    public class Item

    {
        [Key]
        public int itemId { get; set; }
        public string itemName { get; set; }
        public double itemPrice { get; set; }
        public ItemTypes typeId { get; set; }


    }
}