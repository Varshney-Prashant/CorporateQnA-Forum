using CorporateQnA.Services.AuthenticationService;
using CorporateQnAModels.Models.ViewModels;
using System;
using System.Threading.Tasks;
using System.Web.Http;

namespace CorporateQnA.Controllers
{
    [RoutePrefix("api/authentication")]
    public class AuthenticationController : ApiController
    {
        private readonly IAuthenticationService AuthenticationService;
        public AuthenticationController(IAuthenticationService authenticationService)
        {
            AuthenticationService = authenticationService;
        }

        [HttpPost]
        [Route("register")]
        public async Task<String> Register(RegisterViewModel registerCreds)
        {
            return await AuthenticationService.Register(registerCreds);
        }

        [HttpPost]
        [Route("login")]
        public async Task<Object> Login(LoginViewModel loginCreds)
        {
            var x= await AuthenticationService.Login(loginCreds);
            return x;
        }
    }
}
