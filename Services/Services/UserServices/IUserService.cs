using CorporateQnAModels.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CorporateQnAServices.Services.UserServices
{
    public interface IUserService
    {
        IEnumerable<UserInfoViewModel> GetUsers();
        UserInfoViewModel GetUser(string id);
        void Like(string id);
        void Dislike(string id);

    }
}
