
/*RocketSimulator.Models.RocketModelModule*/
interface IRocketModelModule{


}


/*RocketSimulator.Models.IRocketModel*/
interface IRocketModel{
  /*properties*/
	body: any; /*RocketSimulator.Models.Body.IRocketBodyModel*/
	deployment: any; /*RocketSimulator.Models.Deployment.IRocketDeploymentModel*/
	fins: any; /*RocketSimulator.Models.Fins.IRocketFinsModel*/
	motorMount: any; /*RocketSimulator.Models.MotorMount.IRocketMotorMountModel*/
	nosecone: any; /*RocketSimulator.Models.Nosecone.IRocketNoseconeModel*/
	motor: any; /*RocketSimulator.Models.Motor.IRocketMotorModel*/

}

