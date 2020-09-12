using MenuApp.Models;
using Microsoft.Ajax.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MenuApp.Service
{
    public static class Validations
    {

        public static bool validateWholeOrderAndRespond(Order order)
        {

            if (validateCustomerNameLength(order.customerName) == true &&
                validateOrderItems(order.orderItems) == true &&
                validateOrderPrice(order.orderPrice) == true)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
  
        private static bool validateCustomerNameLength(string customerName)
        {
            if(customerName == null)
            {

            } else if (customerName.Length > 20) {

            } else
            {
                return true;
            }
            return false;
        }

        private static bool validateOrderItems(string orderItems)
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

        private static bool validateOrderPrice(double orderPrice)
        {
            if (orderPrice < 0)
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