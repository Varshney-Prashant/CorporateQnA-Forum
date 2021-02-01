using System;
using System.Collections.Generic;
using System.Configuration;
using MappingExtensions;

namespace CorporateQnA.Services.CategoryService
{
    public class CategoryService:ICategoryService
    {
        private readonly PetaPoco.Database db;
        public CategoryService()
        {
            db = new PetaPoco.Database(ConfigurationManager.ConnectionStrings["CorporateQNA"].ConnectionString,"System.Data.SqlClient");
        }

        public IEnumerable<CorporateQnAModels.Models.CoreModels.Category> GetCategories()
        {
            List<CorporateQnAModels.Models.DataModels.Category> categories = db.Fetch<CorporateQnAModels.Models.DataModels.Category>("SELECT * FROM Categories WHERE IsDeleted=0");
            return categories.MapCollectionTo<CorporateQnAModels.Models.DataModels.Category,CorporateQnAModels.Models.CoreModels.Category>();
        }

        public IEnumerable<CorporateQnAModels.Models.ViewModels.CategoryViewModel> GetCategoryActivities()
        {
            List<CorporateQnAModels.Models.DataModels.CategoryViewModel> categories = 
                db.Fetch<CorporateQnAModels.Models.DataModels.CategoryViewModel>
                ("SELECT * FROM CategoryView");
            return categories.MapCollectionTo<CorporateQnAModels.Models.DataModels.CategoryViewModel, CorporateQnAModels.Models.ViewModels.CategoryViewModel>();
        }

        public CorporateQnAModels.Models.CoreModels.Category GetCategory(int id)
        {
            CorporateQnAModels.Models.DataModels.Category category = db.SingleOrDefault<CorporateQnAModels.Models.DataModels.Category>(
                                                                        @"SELECT * FROM Categories WHERE IsDeleted=0 AND Id=@id",
                                                                        new { id });
            return category.MapTo<CorporateQnAModels.Models.CoreModels.Category>();
        }

        public int PostCategory(CorporateQnAModels.Models.CoreModels.Category category)
        {
            return Convert.ToInt32(db.Insert(
                category.MapTo<CorporateQnAModels.Models.DataModels.Category>())
                );
        }

        public void PutCategory(int id, CorporateQnAModels.Models.CoreModels.Category category)
        {
            var currentCategory = db.SingleOrDefault<CorporateQnAModels.Models.DataModels.Category>(id)
                                    .MapTo<CorporateQnAModels.Models.CoreModels.Category>();
            if (currentCategory != null)
            {
                db.Update(category.MapTo<CorporateQnAModels.Models.DataModels.Category>());
            }
        }

        public void DeleteCategory(int id)
        {
            var category = db.SingleOrDefault<CorporateQnAModels.Models.DataModels.Category>(id)
                             .MapTo<CorporateQnAModels.Models.CoreModels.Category>();
            if (category != null)
            {
                db.Execute(@"UPDATE Categories SET IsDeleted=1, DateDeleted=@CurrentDate WHERE Id=@Id", new { Id = id, CurrentDate = DateTime.Now });
            }
        }
    }
}