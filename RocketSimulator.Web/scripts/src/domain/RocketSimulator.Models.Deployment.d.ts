
/*RocketSimulator.Models.Deployment.RocketDeploymentModule*/
interface IRocketDeploymentModule{


}


/*RocketSimulator.Models.Deployment.IRocketDeploymentMethod*/
interface IRocketDeploymentMethod{
  /*properties*/
	method: number; /*System.Int32*/
	size: number; /*System.Single*/
	width: number; /*System.Single*/

}


/*RocketSimulator.Models.Deployment.IRocketDeploymentModel*/
interface IRocketDeploymentModel{
  /*properties*/
	drogue: IRocketDeploymentMethod; /*RocketSimulator.Models.Deployment.IRocketDeploymentMethod*/
	main: IRocketDeploymentMethod; /*RocketSimulator.Models.Deployment.IRocketDeploymentMethod*/
	type: number; /*System.Int32*/

}

