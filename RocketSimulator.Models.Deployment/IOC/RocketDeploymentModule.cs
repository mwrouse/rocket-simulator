using Autofac;

namespace RocketSimulator.Models.Deployment
{
    public class RocketDeploymentModule: Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            // Load components 
            builder.RegisterType<RocketDeploymentMethod>().AsImplementedInterfaces();
            builder.RegisterType<RocketDeploymentModel>().AsImplementedInterfaces();

            base.Load(builder);
        }
    }
}
