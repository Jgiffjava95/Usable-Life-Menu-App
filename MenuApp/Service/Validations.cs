using MenuApp.Models;
using Microsoft.Ajax.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MenuApp.Service
{
    public class Validations
    {
  
        public bool validateCustomerNameLength(string customerName)
        {
            if(customerName == null)
            {

            } else if (customerName.Length > 32) {

            } else
            {
                return true;
            }
            return false;
        }

        public bool validateOrderItems(string orderItems)
        {
            if (orderItems == "[]")
            {

            }
            else
            {
                return true;
            }
            return false;
        }

        public bool validateOrderPrice(double orderPrice)
        {
            if (orderPrice <= 0)
            {

            }
            else
            {
                return true;
            }
            return false;
        }
    }
}