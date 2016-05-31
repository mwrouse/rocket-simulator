using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RocketSimulator.Models.MotorMount
{
    public class RocketMotorMountModel : IRocketMotorMountModel
    {
        public int diameter { get; set; }   // Diameter of motor mount 
        public double length { get; set; }  // Length of motor mount 
        
    }
}
