

namespace RocketSimulator.Models.Fins
{
    public class RocketFinsModel : IRocketFinsModel
    {
        public int count { get; set; }
        public int style { get; set; }      // Style of fins 
        public int material { get; set; }   // Fin material
        public double offset { get; set; }  // X-axis offset
    }
}
