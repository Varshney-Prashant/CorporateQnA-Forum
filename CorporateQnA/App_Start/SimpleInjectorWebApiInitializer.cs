[assembly: WebActivator.PostApplicationStartMethod(typeof(CorporateQnA.App_Start.SimpleInjectorWebApiInitializer), "Initialize")]

namespace CorporateQnA.App_Start
{
    using System;
    using System.Web.Http;
    using CorporateQnA.Services.AuthenticationService;
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using CorporateQnAModels.Models.AuthenticationModels;
    using SimpleInjector;
    using SimpleInjector.Integration.WebApi;
    using SimpleInjector.Lifestyles;
    using CorporateQnA.Services.CategoryService;
    using AutoMapper;
    using CorporateQnAModels.Models;
    using AutoMapper.Configuration;
    using CorporateQnA.Services.QuestionService;
    using CorporateQnA.Services.AnswerService;
    using CorporateQnAServices.Services.UserServices;

    public static class SimpleInjectorWebApiInitializer
    {
        /// <summary>Initialize the container and register it as Web API Dependency Resolver.</summary>
        public static void Initialize()
        {
            var container = new Container();
            container.Options.DefaultScopedLifestyle = new AsyncScopedLifestyle();

            InitializeContainer(container);

            container.RegisterWebApiControllers(GlobalConfiguration.Configuration);
       
            container.Verify();
            
            GlobalConfiguration.Configuration.DependencyResolver =
                new SimpleInjectorWebApiDependencyResolver(container);
        }
     
        private static void InitializeContainer(Container container)
        {
            container.Register(
                () => new UserManager<ApplicationUser>(new UserStore<ApplicationUser>()),
                    Lifestyle.Scoped);
            container.Register(
                () => new UserStore<ApplicationUser>(),
                Lifestyle.Scoped);
            container.Register(
                () => new AuthenticationContext(),
                Lifestyle.Scoped);
            container.Register<IAuthenticationService, AuthenticationService>(Lifestyle.Scoped);
            container.Register<ICategoryService, CategoryService>(Lifestyle.Scoped);
            container.Register<IQuestionService, QuestionService>(Lifestyle.Scoped);
            container.Register<IAnswerService, AnswerService>(Lifestyle.Scoped);
            container.Register<IUserService, UserService>(Lifestyle.Scoped);
        }

    }

}