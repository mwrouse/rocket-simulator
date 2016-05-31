using Autofac;

using RocketSimulator.Models.Body;
using RocketSimulator.Models.Nosecone;
using RocketSimulator.Models.Fins;
using RocketSimulator.Models.MotorMount;
using RocketSimulator.Models.Deployment;
using RocketSimulator.Models.Motor;

namespace RocketSimulator.Models
{
    public class RocketModelModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            // Register the rocket modules
            builder.RegisterModule(new RocketBodyModule()); // Body
            builder.RegisterModule(new RocketNoseconeModule()); // Nosecone
            builder.RegisterModule(new RocketFinsModule()); // Fins
            builder.RegisterModule(new RocketMotorMountModule()); // Motor mount
            builder.RegisterModule(new RocketDeploymentModule());
            builder.RegisterModule(new RocketMotorModule());

            builder.RegisterType<RocketModel>();

            base.Load(builder);
        }
    }
}
