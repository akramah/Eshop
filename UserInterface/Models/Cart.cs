using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BOL_Business_Objects_Layer_;
using BOL_Business_Objects_Layer_.Models;

namespace UserInterface.Models
{
    public class Cart
    {
        public ProductDTO product { get; set; }

        public int Quantity { get; set; }
    }
}