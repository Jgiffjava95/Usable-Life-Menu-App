using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MenuApp.Service
{
    public class Response
    {
       private string PostResponseSuccess = "Order was successfully added.";
       private string PostResponseFailed = "Error, order was not successfully added. Have you correctly filled out all sections of the order?";

        public string postStatusResponseFailed()
        {
            return PostResponseFailed;
        }

        public string postStatusResponseSuccess()
        {
            return PostResponseSuccess;
        }

    }
}