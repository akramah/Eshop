using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BOL_Business_Objects_Layer_.Models
{
    public class UserDTO
    {
        public int USER_ID { get; set; }
        public string NAME { get; set; }
        public string EMAIL { get; set; }
        public string PASSWORD { get; set; }
        public string RoleName { get; set; }
    }
}
