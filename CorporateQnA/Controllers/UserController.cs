using CorporateQnAModels.Models.ViewModels;
using Services.Services.UserServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CorporateQnA.Controllers
{
    [RoutePrefix("api/user")]
    public class UserController : ApiController
    {
        private readonly IUserService UserService;
        public UserController(IUserService userService)
        {
            UserService = userService;
        }

        public IEnumerable<UserInfoViewModel> GetUsers()
        {
            return UserService.GetUsers();
        }
    }
}
