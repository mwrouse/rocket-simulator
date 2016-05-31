namespace RocketSimulator.Models.Body
{
    public interface IRocketBodyModel
    {
        double diameter { get; set; }
        double length { get; set; }
        int material { get; set; }
    }
}