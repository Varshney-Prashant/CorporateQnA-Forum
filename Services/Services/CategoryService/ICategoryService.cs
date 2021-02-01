using CorporateQnAModels.Models.CoreModels;
using CorporateQnAModels.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CorporateQnA.Services.CategoryService
{
    public interface ICategoryService
    {
        IEnumerable<Category> GetCategories();
        IEnumerable<CategoryViewModel> GetCategoryActivities();
        Category GetCategory(int id);
        int PostCategory(Category category);
        void PutCategory(int id, Category category);
        void DeleteCategory(int id);
    }
}
