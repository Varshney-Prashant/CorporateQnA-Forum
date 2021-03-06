﻿using AutoMapper;
using CorporateQnAModels.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace CorporateQnA
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            InitializeMapping();
            /*CorporateQnAMapping.Init();*/
            GlobalConfiguration.Configuration.Formatters.Remove(GlobalConfiguration.Configuration.Formatters.XmlFormatter);
        }

        private static void InitializeMapping()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new CorporateQnAMapping());
            });
            CorporateQnAMapping.Mapper = new Mapper(config);

        }
    }
}
