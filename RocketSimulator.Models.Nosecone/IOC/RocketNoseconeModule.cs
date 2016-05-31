using Autofac;


namespace RocketSimulator.Models.Nosecone
{
    public class RocketNoseconeModule: Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            // Load the component 
            builder.RegisterType<RocketNoseconeModel>().AsImplementedInterfaces();

            base.Load(builder);
        }
    }
}
