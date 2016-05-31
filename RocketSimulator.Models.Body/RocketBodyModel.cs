using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RocketSimulator.Models.Body
{
    public class RocketBodyModel : IRocketBodyModel
    {
        public double diameter { get; set; }    // Diameter of rocket body 
        public double length { get; set; }      // Length of rocket body 
        public int material { get; set; }       // Rocket body material
    }
}
