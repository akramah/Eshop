using BOL_Business_Objects_Layer_;
using BOL_Business_Objects_Layer_.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL_Data_Access_Layer_
{
    public class VendorDb
    {
        private EstoreDbContext db;

        public VendorDb()
        {
            var ensureDLLIsCopied = System.Data.Entity.SqlServer.SqlProviderServices.Instance;
            db = new EstoreDbContext();
        }

        public IEnumerable<Vendor> GetAll()
        {
            return db.Vendors.ToList();
        }
        
            public IEnumerable<VendorDTO> GetAllVendorsDTO()
        {
            var vendor = (from b in db.Vendors
                          select new VendorDTO()
                          {
                              OWNER_ID = b.OWNER_ID,
                              NAME = b.NAME,
                              STORE_NAME = b.STORE_NAME,
                              PHONE = b.PHONE,
                              EMAIL = b.EMAIL,
                              USER_ID = b.USER_ID
                          });

            return vendor;
        }
        public Vendor GetById(int? id)
        {
            return db.Vendors.Find(id);
        }
        
            public VendorDTO GetVendorsDTOById(int? id)
        {
            var vendor = (from b in db.Vendors
                          select new VendorDTO()
                          {
                              OWNER_ID = b.OWNER_ID,
                              NAME = b.NAME,
                              STORE_NAME = b.STORE_NAME,
                              PHONE = b.PHONE,
                              EMAIL = b.EMAIL,
                              USER_ID = b.USER_ID
                          }).FirstOrDefault(p => p.OWNER_ID == id);
            return vendor;
        }
        public IEnumerable<Vendor> GetByUserId(int uid)
        {
            return db.Vendors.Where((p) => p.USER_ID == uid).ToList();
        }
        public void Create(Vendor vendor, string email)
        {
            var userid = from s in db.Users where s.EMAIL == email select s.USER_ID;
            var uid = 0;
            foreach (var str in userid)
            { uid = str; }

            vendor.USER_ID = uid;

            db.Vendors.Add(vendor);
            db.SaveChanges();
        }
        public void Update(Vendor vendor, string email)
        {
            //vendor.USER_ID = GetCurrentVendor(email).USER_ID;
            db.Entry(vendor).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();
        }
        public void Delete(int id)
        {
            Vendor vendor = db.Vendors.Find(id);

            db.Vendors.Remove(vendor);
            Save();
        }
        public void Delete(Vendor vendor)
        {
            db.Vendors.Remove(vendor);
            Save();
        }
        public void Save()
        {
            db.SaveChanges();
        }
        public int GetVendorIdByUserId(int uid)
        {
            var vids = from s in db.Vendors where s.USER_ID == uid select s.OWNER_ID;
            var vid = 0;
            foreach (var str in vids)
            { vid = str; }
            return vid;
        }
        public int GetUidByVid(int vid)
        {
            var uids = from s in db.Vendors where s.OWNER_ID == vid select s.USER_ID;
            var uid = 0;
            foreach (var str in uids)
            { uid = str; }
            return uid;
        }
        public bool IsProfileAlreadyExists(string email)
        {
            var e = from s in db.Users where s.EMAIL == email select s.USER_ID;
            var uid = 0;
            foreach (var str in e)
            { uid = str; }
            var a = from s in db.Vendors where s.USER_ID == uid select s.OWNER_ID;
            var exists = a.Any();

            return exists;

        }
        public int GetCurrentVendorId(string email)
        {
            var e = from s in db.Users where s.EMAIL == email select s.USER_ID;
            var uid = 0;
            foreach (var str in e)
            { uid = str; }
            var a = from s in db.Vendors where s.USER_ID == uid select s.OWNER_ID;
            int vid = 0;
            foreach (var str in a)
            { vid = str; }

            return vid;
        }
        public Vendor GetCurrentVendor(string email)
        {
            int vid = GetCurrentVendorId(email);
            
            return db.Vendors.Find(vid);
        }
        public VendorDTO GetCurrentVendorDTO(string email)
        {
            int vid = GetCurrentVendorId(email);
            var vendor = (from b in db.Vendors
                           select new VendorDTO()
                           {
                               OWNER_ID = b.OWNER_ID,
                               NAME = b.NAME,
                               STORE_NAME = b.STORE_NAME,
                               PHONE = b.PHONE,
                               EMAIL = b.EMAIL,
                               USER_ID =b.USER_ID
                           }).FirstOrDefault(p => p.OWNER_ID == vid);

            return vendor;
        }

    }
}
