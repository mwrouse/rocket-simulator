using RocketSimulator.Models.Body;
using RocketSimulator.Models.Deployment;
using RocketSimulator.Models.Fins;
using RocketSimulator.Models.MotorMount;
using RocketSimulator.Models.Nosecone;
using RocketSimulator.Models.Motor;

namespace RocketSimulator.Models
{
    public interface IRocketModel
    {
        IRocketBodyModel body { get; set; }
        IRocketDeploymentModel deployment { get; set; }
        IRocketFinsModel fins { get; set; }

        IRocketMotorMountModel motorMount { get; set; }
        IRocketNoseconeModel nosecone { get; set; }
        IRocketMotorModel motor { get; set; }

    }
}