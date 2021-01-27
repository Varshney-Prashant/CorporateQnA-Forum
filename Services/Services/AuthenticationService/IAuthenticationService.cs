using CorporateQnAModels.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CorporateQnA.Services.AuthenticationService
{
    public interface IAuthenticationService
    {
        Task<String> Register(RegisterViewModel user);
        Task<Object> Login(LoginViewModel loginCreds);
    }
}
