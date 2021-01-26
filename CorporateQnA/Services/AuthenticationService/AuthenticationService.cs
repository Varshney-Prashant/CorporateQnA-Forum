using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.IdentityModel.Tokens;
using Models.Models.AuthenticationModels;
using Models.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
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
                /*var signInResult = await SignInManager.PasswordSignInAsync(user, loginCreds.Password, false, false);*/
                string key = "my_secret_key_12345";
                var issuer = "http://mysite.com";
                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

                var permClaims = new List<Claim>
                {
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim("UserId",user.Id.ToString()),
                    /*new Claim(options.ClaimsIdentity.RoleClaimType,role.FirstOrDefault())*/
                    new Claim("valid", "1"),
                    new Claim("userid", "1"),
                    new Claim("name", "bilal")
                };

                var token = new JwtSecurityToken(issuer,
                                issuer,
                                permClaims,
                                expires: DateTime.Now.AddHours(1),
                                signingCredentials: credentials);
                Token.AccessToken = new JwtSecurityTokenHandler().WriteToken(token);

               /* var TokenHandler = new JwtSecurityTokenHandler();
                var SecurityToken = TokenHandler.CreateToken(TokenDescriptor);
                Token.AccessToken = TokenHandler.WriteToken(SecurityToken);*/
                return Ok(new { Token });
            }
            else
            {
                return BadRequest();
            }
        }
    }
}