//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace BOL_Business_Objects_Layer_
{
    using System;
    using System.Collections.Generic;
    using System.Web;
    
    public partial class Product
    {
        public int PRODUCT_ID { get; set; }
        public string NAME { get; set; }
        public string DESCRIPTION { get; set; }
        public Nullable<int> PRICE { get; set; }
        public string IMAGE_URL { get; set; }
        public int OWNER_ID { get; set; }
        public Nullable<int> CATEGORY_ID { get; set; }
        public string IMG { get; set; }
    
        public virtual Category Category { get; set; }
        public virtual Vendor Vendor { get; set; }

        public HttpPostedFileBase ImageFile;
    }
}