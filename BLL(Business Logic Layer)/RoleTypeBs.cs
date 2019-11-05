using BOL_Business_Objects_Layer_;
using BOL_Business_Objects_Layer_.Models;
using DAL_Data_Access_Layer_;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL_Business_Logic_Layer_
{
    public class RoleTypeBs
    {
        private RoleTypeDb objDb;

        public RoleTypeBs()
        {
            objDb = new RoleTypeDb();
        }

        public IEnumerable<RoleType> GetAll()
        {
            return objDb.GetAll();
        }
        public IEnumerable<RoleDTO> GetAllRoleDTO()
        {
            return objDb.GetAllRoleDTO();
        }

        public RoleType GetById(int id)
        {
            return objDb.GetById(id);
        }
    }
}
