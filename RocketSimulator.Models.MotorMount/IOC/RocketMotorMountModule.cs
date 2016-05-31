using Autofac;

namespace RocketSimulator.Models.MotorMount
{
    public class RocketMotorMountModule: Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            // Load the component 
            builder.RegisterType<RocketMotorMountModel>().AsImplementedInterfaces();

            base.Load(builder);
        }
    }
}
