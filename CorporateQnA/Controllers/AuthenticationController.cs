﻿using CorporateQnA.Services.AuthenticationService;
using Models.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
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

        [HttpGet]
        [Route("register")]
        public async Task<String> Register()
        {
            return await AuthenticationService.Register(new RegisterViewModel());
        }

        [HttpGet]
        [Route("login")]
        public async Task<Object> Login()
        {
            return await AuthenticationService.Login(new LoginViewModel());
        }
    }
}