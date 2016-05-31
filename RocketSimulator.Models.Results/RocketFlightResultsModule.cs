using Autofac;

namespace RocketSimulator.Models.Results
{
    class RocketFlightResultsModule:Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            // Load the component 
            builder.RegisterType<RocketFlightResults>();

            base.Load(builder);
        }
    }
}
