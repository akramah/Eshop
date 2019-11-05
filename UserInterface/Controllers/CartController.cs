using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using UserInterface.Models;
using BLL_Business_Logic_Layer_;
using BOL_Business_Objects_Layer_;

namespace UserInterface.Controllers
{
    public class CartController : Controller
    {
        private ProductBs productDbobj;

        public CartController()
        {
            productDbobj = new ProductBs();
        }

        public ActionResult Index()
        {
            return View("Index1");
        }
        // GET: Cart
        public ActionResult AddToCart()
        {

            int id = (int)Session["products"];
          //  Product productModel = new Product();
            if (Session["cart"] == null)
            {
                List<Cart> cart = new List<Cart>();
                
                cart.Add(new Cart { product = productDbobj.GetProductsDTOById(id), Quantity = 1 });
               
                Session["cart"] = cart;
            }
            else
            {
                List<Cart> cart = (List<Cart>)Session["cart"];
                int index = isExist(id);
                if (index != -1)
                {
                    cart[index].Quantity++;
                }
                else
                {
                    cart.Add(new Cart { product = productDbobj.GetProductsDTOById(id), Quantity = 1 });
                }
                Session["cart"] = cart;
            }
            //return View("Index");
            return RedirectToAction("index");
        }

        public ActionResult Remove(int id)
        {
            List<Cart> cart = (List<Cart>)Session["cart"];
            int index = isExist(id);
            cart.RemoveAt(index);
            Session["cart"] = cart;
            return RedirectToAction("Index");
        }

        private int isExist(int? id)
        {
            List<Cart> cart = (List<Cart>)Session["cart"];
            for (int i = 0; i < cart.Count; i++)
                if (cart[i].product.PRODUCT_ID.Equals(id))
                    return i;
            return -1;
        }

    }
}