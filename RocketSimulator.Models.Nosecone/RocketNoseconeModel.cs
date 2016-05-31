/**
 * Model for representing a rocket nosecone 
 */
namespace RocketSimulator.Models.Nosecone
{
    public class RocketNoseconeModel : IRocketNoseconeModel
    {
        public double length { get; set; }  // Length of the nosecone
        public int style { get; set; }      // Style of nosecone
        public int material { get; set; }   // Material of nosecone
    }
}
