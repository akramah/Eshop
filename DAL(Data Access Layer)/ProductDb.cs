using BOL_Business_Objects_Layer_;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using BOL_Business_Objects_Layer_.Models;

namespace DAL_Data_Access_Layer_
{
    public class ProductDb
    {
        
        private EstoreDbContext db;

        public ProductDb()
        {
            var ensureDLLIsCopied = System.Data.Entity.SqlServer.SqlProviderServices.Instance;
            db = new EstoreDbContext();
        }

        public IEnumerable<Product> GetAll()
        {

            return db.Products.ToList();
        }

        public IEnumerable<ProductDTO> GetProductsDTO()
        {
            var products = from b in db.Products
                        select new ProductDTO()
                        {
                            PRODUCT_ID = b.PRODUCT_ID,
                            Owner_Id = b.OWNER_ID,
                            NAME = b.NAME,
                            DESCRIPTION = b.DESCRIPTION,
                            PRICE = b.PRICE,
                            IMAGE_URL = b.IMAGE_URL,
                            CATEGORY = b.Category.NAME,
                            STORE_NAME = b.Vendor.STORE_NAME,
                            IMG = b.IMG
                        };

            return products.ToList();
        }

        public IEnumerable<ProductDTO> GetProductDTOByVendorId(int vid)
        {
            var products = from b in db.Products.Where((p) => p.OWNER_ID == vid)
                           select new ProductDTO()
                           {
                               PRODUCT_ID = b.PRODUCT_ID,
                               NAME = b.NAME,
                               DESCRIPTION = b.DESCRIPTION,
                               PRICE = b.PRICE,
                               IMAGE_URL = b.IMAGE_URL,
                               CATEGORY = b.Category.NAME,
                               STORE_NAME = b.Vendor.STORE_NAME,
                               IMG = b.IMG
                           };

            return products.ToList();
        }

        public Product GetById(int? id)
        {
            return db.Products.Find(id);
        }
        public ProductDTO GetProductsDTOById(int? id)
        {
            var product = (from b in db.Products
                           select new ProductDTO()
                           {
                               PRODUCT_ID = b.PRODUCT_ID,
                               Owner_Id = b.OWNER_ID,
                               NAME = b.NAME,
                               DESCRIPTION = b.DESCRIPTION,
                               PRICE = b.PRICE,
                               IMAGE_URL = b.IMAGE_URL,
                               CATEGORY = b.Category.NAME,
                               STORE_NAME = b.Vendor.STORE_NAME
                           }).FirstOrDefault(p => p.PRODUCT_ID == id);

            return product;
        }
        public IEnumerable<Product> GetByVendorId(int vid)
        {
            
            return db.Products.Where((p) => p.OWNER_ID == vid).ToList(); 
        }
        public void Insert(Product product, int vid)
        {
            product.OWNER_ID = vid;
            db.Products.Add(product);
            Save();
        }
        public void Update(Product product)
        {
            db.Entry(product).State = System.Data.Entity.EntityState.Modified;
            Save();
        }
        public void Delete(int id)
        {
            Product product = db.Products.Find(id);
            db.Products.Remove(product);
            Save();
        }
        public void Delete(Product product)
        {
            db.Products.Remove(product);
            Save();
        }
        public void Save()
        {
            db.SaveChanges();
        }
    }
}
