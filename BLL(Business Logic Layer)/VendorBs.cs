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
    public class VendorBs
    {
        private VendorDb objDb;


        public VendorBs()
        {
            objDb = new VendorDb();
        }

        public IEnumerable<Vendor> GetAll()
        {
            return objDb.GetAll();
        }
             public IEnumerable<VendorDTO> GetAllVendorsDTO()
        {
            return objDb.GetAllVendorsDTO();
        }

        public Vendor GetById(int? id)
        {
            return objDb.GetById(id);
        }
             public VendorDTO GetVendorsDTOById(int? id)
        {
            return objDb.GetVendorsDTOById(id);
        }
        public IEnumerable<Vendor> GetByUserId(int uid)
        {
            return objDb.GetByUserId(uid);
        }
        public void Create(Vendor vendor, string email)
        {
            objDb.Create(vendor, email);
        }
        public void Update(Vendor vendor, string email)
        {
            objDb.Update(vendor, email);
        }
        public void Delete(int id)
        {
            objDb.Delete(id);
        }
        public bool IsProfileAlreadyExists(string email)
        {
            return objDb.IsProfileAlreadyExists(email);

        }
        public int GetCurrentVendorId(string email)
        {
            return objDb.GetCurrentVendorId(email);
        }
        public Vendor GetCurrentVendor(string email)
        {
            return objDb.GetCurrentVendor(email);
        }
        public VendorDTO GetCurrentVendorDTO(string email)
        {
            return objDb.GetCurrentVendorDTO(email);
        }
        public void DeleteVendorByUserId(int id)
        {
            var userToDelete = objDb.GetByUserId(id);
            foreach (Vendor vendor in userToDelete)
            {
                objDb.Delete(vendor);
            }

        }
        public int GetVendorIdByUserId(int uid)
        {
            return objDb.GetVendorIdByUserId(uid);
        }
        public int GetUidByVid(int vid)
        {
            return objDb.GetUidByVid(vid);
        }
    }
}
