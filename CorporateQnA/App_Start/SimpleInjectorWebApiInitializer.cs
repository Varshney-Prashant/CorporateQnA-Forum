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

    public static class SimpleInjectorWebApiInitializer
    {
        /// <summary>Initialize the container and register it as Web API Dependency Resolver.</summary>
        public static void Initialize()
        {
            var container = new Container();
            container.Options.DefaultScopedLifestyle = new AsyncScopedLifestyle();
           /* var config = new MapperConfiguration(cfg => {
                cfg.AddMaps(typeof(Mapping).Assembly);
            });
            var configuration = new MapperConfiguration(cfg => cfg.AddMaps(typeof(Mapping).Assembly));*/

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
            /*container.Register(
                () => new Mapping(),
                Lifestyle.Scoped);*/
            /*container.RegisterSingleton(() => GetMapper(container));*/

            /*IServiceProvider provider = app.ApplicationServices;
            container.Register(provider.GetRequiredService<UserManager<ApplicationUser>>);
*//*            container.Register(provider.GetRequiredService<SignInManager<ApplicationUser>>);*//*
            container.Register(provider.GetRequiredService<AuthenticationContext>);*/
            container.Register<IAuthenticationService, AuthenticationService>(Lifestyle.Scoped);
            container.Register<ICategoryService, CategoryService>(Lifestyle.Scoped);
            container.Register<IQuestionService, QuestionService>(Lifestyle.Scoped);
            container.Register<IAnswerService, AnswerService>(Lifestyle.Scoped);
            /*container.Register<MapperProvider>();*/
            // For instance:
            // container.Register<IUserRepository, SqlUserRepository>(Lifestyle.Scoped);
        }
        /*private static AutoMapper.IMapper GetMapper(Container container)
        {
            var mp = container.GetInstance<MapperProvider>();
            return mp.GetMapper();
        }*/

    }
    /*public class MapperProvider
    {
        private readonly Container _container;

        public MapperProvider(Container container)
        {
            _container = container;
        }

        public IMapper GetMapper()
        {
            var mce = new MapperConfigurationExpression();
            mce.ConstructServicesUsing(_container.GetInstance);

            mce.AddMaps(typeof(Mapping).Assembly);

            var mc = new MapperConfiguration(mce);
            mc.AssertConfigurationIsValid();

            IMapper m = new Mapper(mc, t => _container.GetInstance(t));

            return m;
        }
    }*/

}