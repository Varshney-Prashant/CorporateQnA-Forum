using CorporateQnAModels.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Services.UserServices
{
    public interface IUserService
    {
        IEnumerable<UserInfoViewModel> GetUsers();
    }
}
