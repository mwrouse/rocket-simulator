using Autofac;
namespace RocketSimulator.Models.Motor
{
    public class RocketMotorModule: Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            // Load the component 
            builder.RegisterType<RocketMotorModel>();

            base.Load(builder);
        }
    }
}
