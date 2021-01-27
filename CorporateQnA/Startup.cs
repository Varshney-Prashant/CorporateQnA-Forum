using System;
using System.Threading.Tasks;
using Microsoft.Owin;
using Owin;
using Microsoft.Owin.Security.Jwt;
using Microsoft.Owin.Security;
using Microsoft.IdentityModel.Tokens;
using System.Text;

[assembly: OwinStartup(typeof(CorporateQnA.Startup))]

namespace CorporateQnA
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var key= Encoding.UTF8.GetBytes(System.Configuration.ConfigurationManager.AppSettings["SecretKey"].ToString());
            app.UseJwtBearerAuthentication(
                new JwtBearerAuthenticationOptions
                {
                    AuthenticationMode = AuthenticationMode.Active,
                    TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(key),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    }
                });
        }
    }
}