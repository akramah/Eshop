using BLL_Business_Logic_Layer_;
using BOL_Business_Objects_Layer_;
using BOL_Business_Objects_Layer_.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace UserInterface.Controllers
{
    [Authorize(Roles ="Vendor")]
    public class VendorController : Controller
    {
        private VendorBs vendorobj;
        private ProductBs productobj;
        private CategoryBs categoryobj;

        public VendorController()
        {
            
            vendorobj = new VendorBs();
            productobj = new ProductBs();
            categoryobj = new CategoryBs();
        }
        // GET: Vendor
        public ActionResult Index()
        {
            int vid = vendorobj.GetCurrentVendorId(HttpContext.User.Identity.Name);
            var VendorProducts = productobj.GetByVendorId(vid);
            return View(VendorProducts);
        }
        public JsonResult RIndex()
        {
            int vid = vendorobj.GetCurrentVendorId(HttpContext.User.Identity.Name);
            var VendorProducts = productobj.GetProductDTOByVendorId(vid);
            return new JsonResult { Data = VendorProducts, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        public ActionResult CreateProfile()
        {
            if(vendorobj.IsProfileAlreadyExists(HttpContext.User.Identity.Name))
            {
                return RedirectToAction("Index");
            }

            return View(); 
        }
        [HttpPost]
        public void RCreateProfile(string name, string Storename, string Phone, string Email)
        {
            string emails = HttpContext.User.Identity.Name;
            Vendor vendor = new Vendor();
            vendor.NAME = name;
            vendor.STORE_NAME = Storename;
            vendor.PHONE = Phone;
            vendor.EMAIL = Email;
            if (vendorobj.IsProfileAlreadyExists(emails) == false && (HttpContext.User.Identity.IsAuthenticated))
            {
                vendorobj.Create(vendor, emails);
            }
           
        }

        [HttpPost]
        public ActionResult CreateProfile(Vendor vendor)
        {
            string email = HttpContext.User.Identity.Name;
            if (vendorobj.IsProfileAlreadyExists(email) == false && (HttpContext.User.Identity.IsAuthenticated))
            {
                    vendorobj.Create(vendor, email);
                    return RedirectToAction("Index");
            }
            else
            {
                return RedirectToAction("Index");
            }
            
        }
        public JsonResult GetCategories()
        {
            var data = categoryobj.GetCategoryDTO();

            return new JsonResult { Data = data, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        public ActionResult AddProduct()
        {
            var Categories = categoryobj.GetAll();
            ViewBag.CategoryList = new SelectList(Categories, "CATEGORY_ID", "NAME");

            return View();
        }

        
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult AddProduct( Product product)
        {
            string email = HttpContext.User.Identity.Name;
            if (ModelState.IsValid)
            {

                int vid = vendorobj.GetCurrentVendorId(email);
                productobj.Insert(product, vid);
                
                return RedirectToAction("Index");
            }
            return View();
        }

        [HttpPost]
        //[ValidateAntiForgeryToken]
        public void RAddProduct(string name, string description, int price, string image, int category)
        {
            
                Product product = new Product();

            

            product.NAME = name;
                product.DESCRIPTION = description;
                product.PRICE = price;
                product.IMAGE_URL = image;
                product.CATEGORY_ID = category;
                string email = HttpContext.User.Identity.Name;
                int vid = vendorobj.GetCurrentVendorId(email);
                //productobj.Insert(product, vid);
            

        }

        [HttpPost]
    public void RAddProductImage()
        {
            Product product = new Product();
            if (Request.Files.Count > 0)
            {
                
                var file = Request.Files[0];
                var value1 = Request.Form[1];
                var value2 = Request.Form[2];
                var value3 = Request.Form[3];
                var value4 = Request.Form[4];

                if (file != null && file.ContentLength > 0)
                {
                    var fileName = Path.GetFileName(file.FileName);
                    var extension = Path.GetFileName(file.FileName);
                    var path = Path.Combine(Server.MapPath("~/Image/"), fileName);
                    product.IMG = path;
                    file.SaveAs(path);
                    
                }            
                product.NAME = Request.Form[0];
                product.DESCRIPTION = Request.Form[1];
                product.PRICE = System.Convert.ToInt32(Request.Form[2]);
                product.IMAGE_URL = Request.Form[3];
                product.CATEGORY_ID = System.Convert.ToInt32(Request.Form[4]);
                
                string email = HttpContext.User.Identity.Name;
                int vid = vendorobj.GetCurrentVendorId(email);
                productobj.Insert(product, vid);
            }
        }

        public ActionResult EditProduct(int? id)
        {
            int vid = vendorobj.GetCurrentVendorId(HttpContext.User.Identity.Name);

            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Product product = productobj.GetById(id);
            if (product == null)
            {
                return HttpNotFound();
            }
            if (product.OWNER_ID != vid)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            var Categories = categoryobj.GetAll();
            ViewBag.CategoryList = new SelectList(Categories, "CATEGORY_ID", "NAME");

            return View(product);
        }
        
        [HttpPost]
        public void REditProduct(string name, string description, int price, string image, int category, int id)
        {
            int vid = vendorobj.GetCurrentVendorId(HttpContext.User.Identity.Name);

            Product product = productobj.GetById(id);
            product.NAME = name;
            product.DESCRIPTION = description;
            product.PRICE = price;
            product.IMAGE_URL = image;
            product.CATEGORY_ID = category;

            if (product.OWNER_ID == vid)
            {
                productobj.Update(product);
            }
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult EditProduct([Bind(Include = "PRODUCT_ID,NAME,DESCRIPTION,PRICE,IMAGE_URL,OWNER_ID,CATEGORY_ID")] Product product)
        {

            if (ModelState.IsValid)
            {
                if (HttpContext.User.Identity.IsAuthenticated)
                {
                    productobj.Update(product);
                }

                return RedirectToAction("Index");
            }
            return View(product);
        }

        public ActionResult ProductDelete(int? id)
        {
            int vid = vendorobj.GetCurrentVendorId(HttpContext.User.Identity.Name);

            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Product product = productobj.GetById(id);
            if (product.OWNER_ID != vid)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            if (product == null)
            {
                return HttpNotFound();
            }
            return View(product);
        }
        public JsonResult RGetProduct(int? id)
        {
            int vid = vendorobj.GetCurrentVendorId(HttpContext.User.Identity.Name);

            
            ProductDTO product = productobj.GetProductsDTOById(id);
            return new JsonResult { Data = product, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        
        [HttpPost, ActionName("ProductDelete")]
        //[ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            int vid = vendorobj.GetCurrentVendorId(HttpContext.User.Identity.Name);
            Product product = productobj.GetById(id);
            if (product.OWNER_ID != vid)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            if (product == null)
            {
                return HttpNotFound();
            }
            if (product.OWNER_ID == vid)
            {
                productobj.Delete(id);
            }
            
            return RedirectToAction("Index");
        }



        public ActionResult Edit()
        {
            string email = HttpContext.User.Identity.Name;
            if (!vendorobj.IsProfileAlreadyExists(email))
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
           
            Vendor vendor =vendorobj.GetCurrentVendor(email);
            if (vendor == null)
            {
                return HttpNotFound();
            }
            return View(vendor);
        }

        public JsonResult RGetProfile()
        {
            string email = HttpContext.User.Identity.Name;

            if (!vendorobj.IsProfileAlreadyExists(email))
            {
                return new JsonResult { Data = "Bad request", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }

            VendorDTO vendor = vendorobj.GetCurrentVendorDTO(email);
            if (vendor == null)
            {
                return new JsonResult { Data = "not found", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            return new JsonResult { Data = vendor, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        [HttpPost]
        public void REditProfile(int OID, string name, string storename, string phone, string email, int UID)
        {
            int vid = vendorobj.GetCurrentVendorId(HttpContext.User.Identity.Name);
            string emails = HttpContext.User.Identity.Name;

            Vendor vendor = vendorobj.GetById(vid);

            vendor.NAME = name;
            vendor.STORE_NAME = storename;
            vendor.PHONE = phone;
            vendor.EMAIL = email;

            
                vendorobj.Update(vendor, emails);
            
        }

        [HttpPost]
        public ActionResult Edit([Bind(Include = "OWNER_ID,NAME,STORE_NAME,PHONE, EMAIL,USER_ID")]Vendor vendor)
        {
            string email = HttpContext.User.Identity.Name;
            if (ModelState.IsValid)
            {
                if (HttpContext.User.Identity.IsAuthenticated)
                {
                    vendorobj.Update(vendor, email);
                }
                
                return RedirectToAction("Index");
            }
            return View(vendor);
        }

    }
}