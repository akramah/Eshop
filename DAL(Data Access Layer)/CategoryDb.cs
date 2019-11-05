using BOL_Business_Objects_Layer_;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BOL_Business_Objects_Layer_.Models;

namespace DAL_Data_Access_Layer_
{
    public class CategoryDb
    {
        private EstoreDbContext db;

        public CategoryDb()
        {
            var ensureDLLIsCopied = System.Data.Entity.SqlServer.SqlProviderServices.Instance;
            db = new EstoreDbContext();
        }

        public IEnumerable<Category> GetAll()
        {
            return db.Categories.ToList();
        }

        public IEnumerable<CategoryDTO> GetCategoryDTO()
        {
            var categories = from b in db.Categories
                           select new CategoryDTO()
                           {
                               value = b.CATEGORY_ID,
                               label =b.NAME
                           };

            return categories.ToList();
        }

        public Category GetById(int id)
        {
            return db.Categories.Find(id);
        }
        public void Insert(Category category)
        {
            db.Categories.Add(category);
            Save();
        }
        public void Update(Category category)
        {
            db.Entry(category).State = System.Data.Entity.EntityState.Modified;
            Save();
        }
        public void Delete(int id)
        {
            Category category = db.Categories.Find(id);
            db.Categories.Remove(category);
            Save();
        }
        public void Save()
        {
            db.SaveChanges();
        }
    }
}
