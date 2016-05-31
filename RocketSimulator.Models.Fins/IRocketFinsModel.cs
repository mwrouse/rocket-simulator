namespace RocketSimulator.Models.Fins
{
    public interface IRocketFinsModel
    {
        int count { get; set; }
        int material { get; set; }
        double offset { get; set; }
        int style { get; set; }
    }
}