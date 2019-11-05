using BLL_Business_Logic_Layer_;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using System.IO;
using UserInterface.Models;

namespace UserInterface.Controllers
{
    public class ConsumerController : Controller
    {
        private ProductBs dbObj;
        private UserBs udbObj;
        public ConsumerController()
        {
            dbObj = new ProductBs();
            udbObj = new UserBs();
        }

        // GET: Consumer
       
        public ActionResult Index()
        {            
            return View(dbObj.GetAll());
        }
        public ActionResult Stores()
        {
            return View(dbObj.GetAll());
        }

        //[Authorize(Roles = "Consumer")]
        [HttpPost]
        public ActionResult AddToCart(int id)
        {
            try
            {
                Session["products"] = id;
                return RedirectToAction("AddToCart", "Cart");
            }
            catch
            {
                throw;
            }
            
        }
        [HttpPost]
        //[Authorize(Roles = "Consumer")]
        public JsonResult RAddToCart(int id)
        {
            
            if (Session["cart"] == null)
            {
                List<Cart> cart = new List<Cart>();

                cart.Add(new Cart { product = dbObj.GetProductsDTOById(id), Quantity = 1 });

                Session["cart"] = cart;
            }
            else
            {
                List<Cart> cart = (List<Cart>)Session["cart"];
                int index = IsExist(id);
                if (index != -1)
                {
                    cart[index].Quantity++;
                }
                else
                {
                    cart.Add(new Cart { product = dbObj.GetProductsDTOById(id), Quantity = 1 });
                }
                Session["cart"] = cart;
            }
            return new JsonResult { Data = Session["cart"], JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        //[Authorize(Roles = "Consumer")]
        public JsonResult RProductsInCart()
        {
            return new JsonResult { Data = Session["cart"], JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        
        [HttpPost]
        //[Authorize(Roles = "Consumer")]
        public void Remove(int id)
        {
            List<Cart> cart = (List<Cart>)Session["cart"];
            int index = IsExist(id);
            cart.RemoveAt(index);
            Session["cart"] = cart;
           
        }

        private int IsExist(int? id)
        {
            List<Cart> cart = (List<Cart>)Session["cart"];
            for (int i = 0; i < cart.Count; i++)
                if (cart[i].product.PRODUCT_ID.Equals(id))
                    return i;
            return -1;
        }

        [HttpPost]
        public void Charge(string stripeToken)
        {

        }
        public JsonResult Getpro()
        {
            var data = dbObj.GetProductsDTO();
            
            return new JsonResult { Data = data, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        public JsonResult GetUrole()
        {
            var role = udbObj.GetRoleId(HttpContext.User.Identity.Name);

            return new JsonResult { Data = role, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }


    }
}