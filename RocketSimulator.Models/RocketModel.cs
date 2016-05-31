using Autofac;

using RocketSimulator.Models.Body;
using RocketSimulator.Models.Nosecone;
using RocketSimulator.Models.Fins;
using RocketSimulator.Models.MotorMount;
using RocketSimulator.Models.Deployment;
using RocketSimulator.Models.Motor;
using RocketSimulator.Models.Results;

namespace RocketSimulator.Models
{
    public class RocketModel : IRocketModel
    {
        public int id { get; set; }
        public IRocketBodyModel body { get; set; }
        public IRocketNoseconeModel nosecone { get; set; }
        public IRocketFinsModel fins { get; set; }
        public IRocketMotorMountModel motorMount { get; set; }
        public IRocketDeploymentModel deployment { get; set; }
        public IRocketMotorModel motor { get; set; }

        

        public RocketModel()
        {
            this.body = new RocketBodyModel();
            this.nosecone = new RocketNoseconeModel();
            this.fins = new RocketFinsModel();
            this.motorMount = new RocketMotorMountModel();
            this.deployment = new RocketDeploymentModel();
            this.motor = new RocketMotorModel();

        }
    }
    
   
}
