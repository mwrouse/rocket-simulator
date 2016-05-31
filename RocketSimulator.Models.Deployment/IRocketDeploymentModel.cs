namespace RocketSimulator.Models.Deployment
{
    public interface IRocketDeploymentMethod
    {
        int method { get; set; }
        float size { get; set; } // Diameter/length of recovery method
        float width { get; set; } // Width of streamer if a streamer
    }

    public interface IRocketDeploymentModel
    {
        IRocketDeploymentMethod drogue { get; set; }
        IRocketDeploymentMethod main { get; set; }
        int type { get; set; }
    }
}