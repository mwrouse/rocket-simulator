using System.Web.Http;
using Autofac.Integration.WebApi;
using Autofac;

using RocketSimulator.Models;



namespace RocketSimulator.Web
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            /* 
             * Setup AutoFac
             */
            var builder = new ContainerBuilder();
            var config = GlobalConfiguration.Configuration;

            // Reguster API Controllers
            builder.RegisterApiControllers(System.Reflection.Assembly.GetExecutingAssembly());

            builder.RegisterModule(new RocketModelModule());

            var container = builder.Build();

            config.DependencyResolver = new AutofacWebApiDependencyResolver(container);
            // End AutoFac Config



            GlobalConfiguration.Configure(WebApiConfig.Register);
        }
    }
}
