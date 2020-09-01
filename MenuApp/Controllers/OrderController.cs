using MenuApp.Models;
using MenuApp.Service;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MenuApp.Controllers
{
    public class OrderController : Controller
    {
        private Validations validationsController = new Validations();
        private Response OrderControllerResponder = new Response();
        private DateTime timeNow = DateTime.Now;
        private DBC db = null;
        public OrderController()
        {
            db = new DBC();
        }
        public JsonResult Index()
        {
            var orders = db.Orders.ToList();
            return Json(orders, JsonRequestBehavior.AllowGet);
            
        }

        public JsonResult GetItems()
        {
            var items = db.Items.ToList();
            return Json(items, JsonRequestBehavior.AllowGet);

        }

        public JsonResult GetDiscounts()
        {
            var Discount = db.Discount.ToList();
            return Json(Discount, JsonRequestBehavior.AllowGet);

        }

        public JsonResult GetUser(int userId)
        {
            var loggedInUser = db.User.Find(userId);
            return Json(loggedInUser, JsonRequestBehavior.AllowGet);

        }
        [HttpPost]
        public JsonResult Create(Order order)
        {
            if (validationsController.validateCustomerNameLength(order.customerName) == true &&
                validationsController.validateOrderItems(order.orderItems) == true &&
                validationsController.validateOrderPrice(order.orderPrice) == true)
            {
                order.setDateTime(timeNow);
                db.Orders.Add(order);
                db.SaveChanges();
                return Json(OrderControllerResponder.postStatusResponseSuccess());
            } else
            {
                return Json(OrderControllerResponder.postStatusResponseFailed());
            }
        }
        /*
        [HttpPut]
       public JsonResult Edit(Order order)
        {
            db.Entry(order).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();
            return Json(null);
        }
        [HttpDelete]
        public JsonResult Delete(int id)
        {
            var order = db.Orders.Find(id);
            db.Orders.Remove(order);
            db.SaveChanges();
            return Json(null);
        }
        */
    }  
}