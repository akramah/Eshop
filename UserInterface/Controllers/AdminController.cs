using BLL_Business_Logic_Layer_;
using BOL_Business_Objects_Layer_;
using BOL_Business_Objects_Layer_.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace UserInterface.Controllers
{
    [Authorize(Roles = "Admin")]
    public class AdminController : Controller
    {
        private VendorBs vendorobj;
        private ProductBs productobj;
        private CategoryBs categoryobj;
        private UserBs userobj;


        public AdminController()
        {

            vendorobj = new VendorBs();
            productobj = new ProductBs();
            categoryobj = new CategoryBs();
            userobj = new UserBs();
        }
        // GET: Admin
        public ActionResult AllProducts()
        {
            
            return View(productobj.GetAll());
        }
        public JsonResult AllProductsDTO()
        {

            var data = productobj.GetProductsDTO();

            return new JsonResult { Data = data, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        public ActionResult AllVendors()
        {

            return View(vendorobj.GetAll());
        }
        public JsonResult AllVendorsDTO()
        {

            var data = vendorobj.GetAllVendorsDTO();

            return new JsonResult { Data = data, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        public ActionResult AllUsers()
        {

            return View(userobj.GetAll());
        }
        public JsonResult AllUsersDTO()
        {

            var data = userobj.GetAllUsersDTO();

            return new JsonResult { Data = data, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        ////////////////DELETES////////////////
        public ActionResult DeleteProduct(int? id)
        {
            Product product = productobj.GetById(id);
            return View(product);
        }
        public JsonResult RDeleteProduct(int? id)
        {
            ProductDTO product = productobj.GetProductsDTOById(id);
            return new JsonResult { Data = product, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        [HttpPost, ActionName("DeleteProduct")]
        //[ValidateAntiForgeryToken]
        public ActionResult ProductDeleteConfirmed(int id)
        {
            productobj.Delete(id);
            return RedirectToAction("AllProducts");
        }
        /////////////////
        public ActionResult DeleteVendor(int? id)
        {
            Vendor vendor = vendorobj.GetById(id);
            return View(vendor);
        }
        public JsonResult RDeleteVendor(int? id)
        {
            VendorDTO product = vendorobj.GetVendorsDTOById(id);
            return new JsonResult { Data = product, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        [HttpPost, ActionName("DeleteVendor")]
        //[ValidateAntiForgeryToken]
        public ActionResult VendorDeleteConfirmed(int id)
        {
            productobj.DeleteVendorProducts(id);
            vendorobj.Delete(id);
            return RedirectToAction("AllVendors");
        }
        /////////////////
        public ActionResult DeleteUser(int? id)
        {
            User user = userobj.GetById(id);
            return View(user);
        }
        public JsonResult RDeleteUser(int? id)
        {
            UserDTO user = userobj.GetUserDTOById(id);
            return new JsonResult { Data = user, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        [HttpPost, ActionName("DeleteUser")]
        //[ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            int vid = vendorobj.GetVendorIdByUserId(id);

            productobj.DeleteVendorProducts(vid);
            vendorobj.DeleteVendorByUserId(id);
            userobj.Delete(id);
            return RedirectToAction("AllUsers");
        }


    }
}