using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BOL_Business_Objects_Layer_;
using DAL_Data_Access_Layer_;
using BOL_Business_Objects_Layer_.Models;



namespace BLL_Business_Logic_Layer_
{
    public class CategoryBs
    {
        private CategoryDb objDb;

        public CategoryBs()
        {
            objDb = new CategoryDb();
        }

        public IEnumerable<Category> GetAll()
        {
            return objDb.GetAll();
        }

        public IEnumerable<CategoryDTO> GetCategoryDTO()
        {
            return objDb.GetCategoryDTO();
        }

        public Category GetById(int id)
        {
            return objDb.GetById(id);
        }
        public void Insert(Category category)
        {
            objDb.Insert(category);
        }
        public void Update(Category category)
        {
            objDb.Update(category);
        }
        public void Delete(int id)
        {
            objDb.Delete(id);
        }
    }
}
