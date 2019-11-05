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
    public class UserBs
    {
        private UserDb objDb;

        public UserBs()
        {
            objDb = new UserDb();
        }

        public IEnumerable<User> GetAll()
        {
            return objDb.GetAll();
        }
            public IEnumerable<UserDTO> GetAllUsersDTO()
        {
            return objDb.GetAllUsersDTO();
        }
        public User GetById(int? id)
        {
            return objDb.GetById(id);
        }
        public UserDTO GetUserDTOById(int? id)
        {
            return objDb.GetUserDTOById(id);
        }
        public int GetRoleId(string email)
        {
            return objDb.GetRoleId(email);
        }
        public string GetRole(string email)
        {
            return objDb.GetRole(email);
        }
        public void Insert(User user)
        {
            objDb.Insert(user);
        }
        public void Update(User user)
        {
            objDb.Update(user);
        }
        public void Delete(int id)
        {
            objDb.Delete(id);
        }

        public bool ConfirmUserCredentials(User user)
        {
            var count = objDb.ConfirmUserCredentials(user);
            
            if (count != 0)
            {
                
                return true;
            }
            else
            {
                return false;
            }
            
        }
        public bool IsUserAlreadyPresent(string email)
        {
            bool userExists = false;
            if(objDb.IsUserAlreadyPresent(email)>0)
            {
                userExists = true;

            }
            return userExists;
        }
        public string Uname(int id)
        {
            return objDb.Uname(id);
        }
        public int GetUid(string email)
        {

            return objDb.GetUid(email);
        }
    }
}
