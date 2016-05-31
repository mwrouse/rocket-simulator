namespace RocketSimulator.Models.Motor
{
    public interface IRocketMotorModel
    {
        double impulse { get; set; }
        double thrust { get; set; }
    }
}