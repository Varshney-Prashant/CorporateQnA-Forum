using CorporateQnA.Services.CategoryService;
using CorporateQnAModels.Models.CoreModels;
using CorporateQnAModels.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CorporateQnA.Controllers
{
    [RoutePrefix("api/category")]
    public class CategoryController : ApiController
    {
        private readonly ICategoryService CategoryService;
        public CategoryController(ICategoryService categoryService)
        {
            CategoryService = categoryService;
        }
        // GET: api/Category
        [Route("all")]
        public IEnumerable<Category> Get()
        {
            return CategoryService.GetCategories();
        }

        [Route("activities")]
        public IEnumerable<CategoryViewModel> GetCategoryActivities()
        {
            return CategoryService.GetCategoryActivities();
        }

        // GET: api/Category/5
        [Route("{id}")]
        public Category Get(int id)
        {
            Category category= CategoryService.GetCategory(id);
            return category;
        }

        // POST: api/Category
        [Route("add")]
        public int Post(Category category)
        {
            return CategoryService.PostCategory(category);
        }

        // PUT: api/Category/5
        [Route("update/{id}")]
        public void Put(int id, Category category)
        {
            CategoryService.PutCategory(id, category);
        }

        // DELETE: api/Category/5
        [Route("delete/{id}")]
        public void Delete(int id)
        {
            CategoryService.DeleteCategory(id);
        }
    }
}
