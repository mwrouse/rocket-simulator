using Autofac;

namespace RocketSimulator.Models.Fins
{
    public class RocketFinsModule:Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            // Load the component 
            builder.RegisterType<RocketFinsModel>().AsImplementedInterfaces();

            base.Load(builder);
        }
    }
}
