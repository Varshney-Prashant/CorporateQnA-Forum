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
            container.Register<UserManager<ApplicationUser>>(
                () => new UserManager<ApplicationUser>(new UserStore<ApplicationUser>()),
                    Lifestyle.Scoped);
            container.Register(
                () => new UserStore<ApplicationUser>(),
                Lifestyle.Scoped);
            container.Register(
                () => new AuthenticationContext(),
                Lifestyle.Scoped);
            
            /*IServiceProvider provider = app.ApplicationServices;
            container.Register(provider.GetRequiredService<UserManager<ApplicationUser>>);
*//*            container.Register(provider.GetRequiredService<SignInManager<ApplicationUser>>);*//*
            container.Register(provider.GetRequiredService<AuthenticationContext>);*/
            container.Register<IAuthenticationService, AuthenticationService>(Lifestyle.Scoped);

            // For instance:
            // container.Register<IUserRepository, SqlUserRepository>(Lifestyle.Scoped);
        }
    }
}