using CorporateQnAModels.Models.ViewModels;
using CorporateQnAServices.Services.UserServices;
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

        [Route("{id}")]
        public UserInfoViewModel GetUser(string id)
        {
            return UserService.GetUser(id);
        }

        [Route("like/{id}")]
        [HttpGet]
        public void Like(string id)
        {
            UserService.Like(id);
        }

        [Route("dislike/{id}")]
        [HttpGet]
        public void Dislike(string id)
        {
            UserService.Dislike(id);
        }
    }
}
