using BLL_Business_Logic_Layer_;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BOL_Business_Objects_Layer_;
using System.Web.Security;

namespace UserInterface.Controllers
{
    public class AccountController : Controller
    {
        private UserBs userObj;
        private RoleTypeBs roleObj;
        public AccountController()
        {
            userObj = new UserBs();
            roleObj = new RoleTypeBs();
        }
        // GET: Account
        public ActionResult Login()
        {
            
            return View();
        }

        [HttpPost]
        public ActionResult RLogin(User user)
        {
            if (userObj.ConfirmUserCredentials(user))
            {

                FormsAuthentication.SetAuthCookie(user.EMAIL, false);
                return RedirectToAction("AfterLogin");

            }
            else
            {
                return RedirectToAction("AfterLogin");
            }
        }

        [HttpPost]
        public ActionResult Login(User user)
        {
            if (userObj.ConfirmUserCredentials(user))
            {
                
                FormsAuthentication.SetAuthCookie(user.EMAIL, false);
                return RedirectToAction("AfterLogin");
                
            }
            else
            {
                TempData["Msg"] = "Email or Password is incorrect.";
                return View();
            }
        }
        public ActionResult AfterLogin()
        {
            if (User.IsInRole("Admin"))
            {

                return RedirectToAction("AllProducts", "Admin");
            }
            if (User.IsInRole("Vendor"))
            {
                return RedirectToAction("CreateProfile", "Vendor");
            }
            else
            {
                return RedirectToAction("Index", "Consumer");
            }
        }
        public ActionResult RAfterLogin()
        {
            if (User.IsInRole("Admin"))
            {
                return new JsonResult { Data = 1, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
              
            }
            if (User.IsInRole("Vendor"))
            {
                return new JsonResult { Data = 2, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
                
            }
            if (User.IsInRole("Consumer"))
            {
                return new JsonResult { Data = 3, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
    
            }
            else
            {
                return new JsonResult { Data = 4, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
        }
        public ActionResult Logout()
        {
            FormsAuthentication.SignOut();
            return RedirectToAction("Login", "Account");
        }

        // GET: Account
        public ActionResult Register()
        {
            var roleList = roleObj.GetAll();
            ViewBag.RoleList = new SelectList(roleList,"RoleId","RoleName");
            
            return View();
        }
        public JsonResult RGetRoles()
        {
            var roleList = roleObj.GetAllRoleDTO();


            return new JsonResult { Data = roleList, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        [HttpPost]
        public ActionResult Register(User user)
        {
            if(!userObj.IsUserAlreadyPresent(user.EMAIL))
            {
                userObj.Insert(user);
                if (userObj.ConfirmUserCredentials(user))
                {
                    FormsAuthentication.SetAuthCookie(user.EMAIL, false);
                    if (user.RoleId == 2)
                    {
                        return new JsonResult { Data = 2, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
                       
                    }
                    return new JsonResult { Data = 3, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
                }
                else
                {
                    return View();
                }
            }
                
            else
            {
                return new JsonResult { Data = "exists", JsonRequestBehavior = JsonRequestBehavior.AllowGet };

            }
            
            
        }
       
    }
}