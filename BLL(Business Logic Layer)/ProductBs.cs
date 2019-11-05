using BOL_Business_Objects_Layer_;
using DAL_Data_Access_Layer_;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BOL_Business_Objects_Layer_.Models;

namespace BLL_Business_Logic_Layer_
{
    public class ProductBs
    {
        private ProductDb objDb;

        public ProductBs()
        {
            objDb = new ProductDb();
        }

        public IEnumerable<Product> GetAll()
        {
            return objDb.GetAll();
        }

        public IEnumerable<ProductDTO> GetProductsDTO()
        {
            return objDb.GetProductsDTO();
        }
        public IEnumerable<ProductDTO> GetProductDTOByVendorId(int vid)
        {
            return objDb.GetProductDTOByVendorId(vid);
        }
        public Product GetById(int? id)
        {
            return objDb.GetById(id);
        }
        public ProductDTO GetProductsDTOById(int? id)
        {
            return objDb.GetProductsDTOById(id);
        }
            public IEnumerable<Product> GetByVendorId(int vid)
        {
            return objDb.GetByVendorId(vid);
        }
        public void Insert(Product product, int id)
        {
            objDb.Insert(product,id);
        }
        public void Update(Product product)
        {
            objDb.Update(product);
        }
        public void Delete(int id)
        {
            objDb.Delete(id);
        }
        public void DeleteVendorProducts(int id )
        {
            var productsToDelete = objDb.GetByVendorId(id);
            foreach (Product product in productsToDelete)
            {
                objDb.Delete(product);
            }

        }
    }
}
