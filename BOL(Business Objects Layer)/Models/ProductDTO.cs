using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BOL_Business_Objects_Layer_.Models
{
    public class ProductDTO
    {
        public int PRODUCT_ID { get; set; }
        public int Owner_Id { get; set; }
        public string NAME { get; set; }
        public string DESCRIPTION { get; set; }
        public int? PRICE { get; set; } 
        public string IMAGE_URL { get; set; }
        public string CATEGORY { get; set; }
        public string STORE_NAME { get; set; }
        public string IMG { get; set; }


    }
}
