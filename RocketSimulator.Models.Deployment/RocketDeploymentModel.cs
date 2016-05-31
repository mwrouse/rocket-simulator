using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RocketSimulator.Models.Deployment
{
    public class RocketDeploymentMethod : IRocketDeploymentMethod
    {
        public int method { get; set; }
        public float size { get; set; } // Diameter/length of recovery method
        public float width { get; set; } // Width of streamer if a streamer
    }

    public class RocketDeploymentModel : IRocketDeploymentModel
    {
        public int type { get; set; }   // Single or dual-deployment

        public IRocketDeploymentMethod main { get; set; }   // Main recovery method
        public IRocketDeploymentMethod drogue { get; set; } // Drogue recovery

        public RocketDeploymentModel()
        {
            this.main = new RocketDeploymentMethod();
            this.drogue = new RocketDeploymentMethod();
        }

    }


    
}
