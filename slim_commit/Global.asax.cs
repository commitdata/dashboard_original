using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using slim_commit.App_Start;
using System.Configuration;
using System.Web.Http;
using System.Web.Optimization;

namespace slim_commit
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            WarmUp.CacheData();
        }

        protected void Application_End()
        {
            WarmUp.ResetCacheData();
        }
    }
}
