namespace RocketSimulator.Models.Nosecone
{
    public interface IRocketNoseconeModel
    {
        double length { get; set; }
        int material { get; set; }
        int style { get; set; }
    }
}