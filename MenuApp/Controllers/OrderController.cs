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
        private DBC db = null;
        private Validations validationsController = new Validations();
        private Response OrderControllerResponder = new Response();
        private DateTime timeNow = DateTime.Now;
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

        [HttpPost]
        public JsonResult Create(Order order)
        {
            if (validationsController.validateWholeOrderAndRespond(order))
            {
                order.setDateTime(timeNow);
                db.Orders.Add(order);
                db.SaveChanges();
                return Json(OrderControllerResponder.postStatusResponseSuccess());
            }
            else
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