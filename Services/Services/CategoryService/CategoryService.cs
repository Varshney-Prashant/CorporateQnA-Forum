using System;
using System.Collections.Generic;
using System.Configuration;
using MappingExtensions;
using CoreModels = CorporateQnAModels.Models.CoreModels;
using DataModels = CorporateQnAModels.Models.DataModels;
using ViewModels = CorporateQnAModels.Models.ViewModels;

namespace CorporateQnA.Services.CategoryService
{
    public class CategoryService:ICategoryService
    {
        private readonly PetaPoco.Database db;
        public CategoryService()
        {
            db = new PetaPoco.Database(ConfigurationManager.ConnectionStrings["CorporateQNA"].ConnectionString,"System.Data.SqlClient");
        }

        public IEnumerable<CoreModels.Category> GetCategories()
        {
            List<DataModels.Category> categories = db.Fetch<DataModels.Category>("SELECT * FROM Categories WHERE IsDeleted=0");
            return categories.MapCollectionTo<DataModels.Category,CoreModels.Category>();
        }

        public IEnumerable<ViewModels.CategoryViewModel> GetCategoryActivities()
        {
            List<DataModels.CategoryViewModel> categories = 
                db.Fetch<DataModels.CategoryViewModel>
                ("SELECT * FROM CategoryView");
            return categories.MapCollectionTo<DataModels.CategoryViewModel, ViewModels.CategoryViewModel>();
        }

        public CoreModels.Category GetCategory(int id)
        {
            DataModels.Category category = db.SingleOrDefault<DataModels.Category>(
                                                                        @"SELECT * FROM Categories WHERE IsDeleted=0 AND Id=@id",
                                                                        new { id });
            return category.MapTo<CoreModels.Category>();
        }

        public int PostCategory(CoreModels.Category category)
        {
            return Convert.ToInt32(db.Insert(
                category.MapTo<DataModels.Category>())
                );
        }

        public void PutCategory(int id, CoreModels.Category category)
        {
            var currentCategory = db.SingleOrDefault<DataModels.Category>(id)
                                    .MapTo<CoreModels.Category>();
            if (currentCategory != null)
            {
                db.Update(category.MapTo<DataModels.Category>());
            }
        }

        public void DeleteCategory(int id)
        {
            var category = db.SingleOrDefault<DataModels.Category>(id)
                             .MapTo<CoreModels.Category>();
            if (category != null)
            {
                db.Execute(@"UPDATE Categories SET IsDeleted=1, DateDeleted=@CurrentDate WHERE Id=@Id", new { Id = id, CurrentDate = DateTime.Now });
            }
        }
    }
}