using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RocketSimulator.Models.Results
{
    public class RocketFlightResults : IRocketFlightResults
    {
        public double altitude { get; set; }
        public double speed { get; set; }
    }
}
