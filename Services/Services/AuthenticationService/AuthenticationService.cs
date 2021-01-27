using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.IdentityModel.Tokens;
using CorporateQnAModels.Models.AuthenticationModels;
using CorporateQnAModels.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace CorporateQnA.Services.AuthenticationService
{
    public class AuthenticationService : ApiController, IAuthenticationService
    {
        private UserStore<ApplicationUser> Store { get; }
        private UserManager<ApplicationUser> UserManager { get; }
        private readonly AuthenticationContext Context;
        /*private SignInManager<ApplicationUser> SignInManager { get; }*/
        public AuthenticationService(AuthenticationContext context)
        {
            Context = context;
            Store = new UserStore<ApplicationUser>(Context);
            UserManager = new UserManager<ApplicationUser>(Store);
        }


        public async Task<String> Register(RegisterViewModel registerCreds)
        {
            var user = new ApplicationUser
            {
                UserName = "TestUser3",
                Email = "TestUser@test.com",
                FullName = "Test",
                Designation = "TestHead",
                Company = "Test",
                NoOfLikes = 0,
                NoOfDislikes = 0
            };
            registerCreds.Password = "Prashant@29ap";
            /*            registerCreds.Role = "Customer";*/
            var Result = await UserManager.CreateAsync(user, registerCreds.Password);


            /*await UserManager.AddToRoleAsync(user, registerCreds.Role);*/

            if (Result.Succeeded)
            {
                /* var result = await SignInManager.PasswordSignInAsync(user, registerCreds.Password, false, false);
                 if (result.Succeeded)
                 {
                     return Ok(result);
                 }*/
                return "user Added";
            }
            return Result.Errors.First();
        }

        public async Task<Object> Login(LoginViewModel loginCreds)
        {
            loginCreds.EmailId = "TestUser@test.com";
            loginCreds.Password = "Prashant@29ap";
            var user = await UserManager.FindByEmailAsync(loginCreds.EmailId);

            TokenViewModel Token = new TokenViewModel { Name = user.FullName, UserId = user.Id };

            if (user != null && await UserManager.CheckPasswordAsync(user, loginCreds.Password))
            {
                var key = Encoding.UTF8.GetBytes(System.Configuration.ConfigurationManager.AppSettings["SecretKey"].ToString());
                var securityKey = new SymmetricSecurityKey(key);
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

                var permClaims = new List<Claim>
                {
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim("UserId",user.Id.ToString()),
                };

                var token = new JwtSecurityToken(
                                claims: permClaims,
                                expires: DateTime.Now.AddHours(1),
                                signingCredentials: credentials);
                Token.AccessToken = new JwtSecurityTokenHandler().WriteToken(token);
                return new { Token };
            }
            else
            {
                /*return HttpStatusCode.BadRequest;*/
                Request = new HttpRequestMessage();
                HttpResponseMessage response =
                this.Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Invalid Credentials");
                throw new HttpResponseException(response);
            }
        }
    }
}