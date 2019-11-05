using BOL_Business_Objects_Layer_;
using BOL_Business_Objects_Layer_.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL_Data_Access_Layer_
{
    public class UserDb
    {
        private EstoreDbContext db;

        public UserDb()
        {
            var ensureDLLIsCopied = System.Data.Entity.SqlServer.SqlProviderServices.Instance;
            db = new EstoreDbContext();
        }

        public IEnumerable<User> GetAll()
        {
            return db.Users.ToList();
        }
        public IEnumerable<UserDTO> GetAllUsersDTO()
        {
            var user = (from b in db.Users where b.RoleId != 1
                        join role in db.RoleTypes on b.RoleId equals role.RoleId
                        select new UserDTO()
                           {
                               USER_ID = b.USER_ID,
                               NAME = b.NAME,
                               EMAIL = b.EMAIL,
                               PASSWORD = b.PASSWORD,
                               RoleName = role.RoleName
                           });

            return user;
        }

        public User GetById(int? id)
        {
            return db.Users.Find(id);
        }
        public UserDTO GetUserDTOById(int? id)
        {
            var user = (from b in db.Users where b.RoleId != 1
                        join role in db.RoleTypes on b.RoleId equals role.RoleId
                        select new UserDTO()
                           {
                               USER_ID = b.USER_ID,
                               NAME = b.NAME,
                               EMAIL = b.EMAIL,
                               PASSWORD = b.PASSWORD,
                               RoleName = role.RoleName
                          }).FirstOrDefault(p => p.USER_ID == id);
            return user;
        }
        public string GetRole(string email)
        {
            if(email == null) { }
            return db.Users.Where(x => x.EMAIL == email).FirstOrDefault().RoleType.RoleName;
        }
        public int GetUid(string email)
        {
            if (email == null) { }
            return db.Users.Where(x => x.EMAIL == email).FirstOrDefault().USER_ID;
        }
        public int GetRoleId(string email)
        {
            if (email == "") {
                return 4;
                    }
            else
            {
                return db.Users.Where(x => x.EMAIL == email).FirstOrDefault().RoleType.RoleId;
            }

        }
        public void Insert(User user)
        {
            db.Users.Add(user);
            Save();
        }
        public void Update(User user)
        {
            db.Entry(user).State = System.Data.Entity.EntityState.Modified;
            Save();
        }
        public void Delete(int id)
        {
            User user = db.Users.Find(id);
            db.Users.Remove(user);
            Save();
        }
        public void Save()
        {
            db.SaveChanges();
        }
        public int ConfirmUserCredentials(User user)
        {
            var isUser = db.Users.Where(x => x.EMAIL == user.EMAIL && x.PASSWORD == user.PASSWORD).Count();
            return isUser;
        }
        public int IsUserAlreadyPresent(string email)
        {
            var isUser = db.Users.Where(x => x.EMAIL == email).Count();
            return isUser;
        }
        public string Uname(int id)
        {
            string email = db.Users.Where(x => x.USER_ID == id).FirstOrDefault().EMAIL;
            return email;
        }
    }
}
