using Autofac;

/**
 * Loads and Registers the Rocket Body Components with Autofac 
 */
namespace RocketSimulator.Models.Body
{
    public class RocketBodyModule: Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            // Register component
            builder.RegisterType<RocketBodyModel>();


            base.Load(builder);
        }
    }
}
