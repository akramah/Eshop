using BOL_Business_Objects_Layer_;
using BOL_Business_Objects_Layer_.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL_Data_Access_Layer_
{
    public class RoleTypeDb
    {
        private EstoreDbContext db;

        public RoleTypeDb()
        {
            var ensureDLLIsCopied = System.Data.Entity.SqlServer.SqlProviderServices.Instance;
            db = new EstoreDbContext();
        }

        public IEnumerable<RoleType> GetAll()
        {
            db.RoleTypes.Where(x=> x.RoleId != 1).ToList();
            return db.RoleTypes.Where(x => x.RoleId != 1).ToList();
        }

        public IEnumerable<RoleDTO> GetAllRoleDTO()
        {
            var roles = from b in db.RoleTypes.Where(x => x.RoleId != 1)
                        select new RoleDTO()
                             {
                                 value = b.RoleId,
                                 label = b.RoleName
                             };
            return roles.ToList();
        }

        public RoleType GetById(int id)
        {
            return db.RoleTypes.Find(id);
        }
    }
}
