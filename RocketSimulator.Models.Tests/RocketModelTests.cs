using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;


using Autofac;
using RocketSimulator.Models;
using RocketSimulator.Models.Body;
using RocketSimulator.Models.Nosecone;
using RocketSimulator.Models.Fins;
using RocketSimulator.Models.Deployment;
using RocketSimulator.Models.MotorMount;
using System.Diagnostics;

namespace RocketSimulator.Models.Tests
{
    [TestClass]
    public class RocketModelTests
    {
        [TestMethod]
        public void RocketModelTest()
        {
            // Arrange 
            var builder = new ContainerBuilder();
            builder.RegisterModule(new RocketModelModule());
            var container = builder.Build();
            //container.BeginLifetimeScope();

            var actual = container.Resolve<RocketModel>();

            // Expectation 
            var expected = new RocketModel()
            {
                body = new RocketBodyModel() { diameter = 23, length = 42, material = 3 },
                nosecone = new RocketNoseconeModel() { length = 33, style = 3, material = 0 },
                fins = new RocketFinsModel() { count = 4, style = 1, material = 2 },
                deployment = new RocketDeploymentModel()
                {
                    type = 1,
                    main = new RocketDeploymentMethod()
                    {
                        method = 0,
                        size = 22,
                        width = 5
                    },
                    drogue = new RocketDeploymentMethod()
                    {
                        method = 1,
                        size = 57,
                        width = 3
                    }
                },
                motorMount = new RocketMotorMountModel() { diameter = 28, length = 33 }
            };

            // Act 
            actual.body = container.Resolve<RocketBodyModel>();
            actual.nosecone = container.Resolve<IRocketNoseconeModel>();
            actual.fins = container.Resolve<IRocketFinsModel>();
            actual.deployment = container.Resolve<IRocketDeploymentModel>();
            actual.deployment.main = container.Resolve<IRocketDeploymentMethod>();
            actual.deployment.drogue = container.Resolve<IRocketDeploymentMethod>();
            actual.motorMount = container.Resolve<IRocketMotorMountModel>();

            actual.body.diameter = 23;
            actual.body.length = 42;
            actual.body.material = 3;

            actual.nosecone.length = 33;
            actual.nosecone.style = 3;
            actual.nosecone.material = 0;

            actual.fins.count = 4;
            actual.fins.style = 1;
            actual.fins.material = 2;

            actual.deployment.type = 1;
            actual.deployment.main.method = 0;
            actual.deployment.main.size = 22;
            actual.deployment.main.width = 5;
            actual.deployment.drogue.method = 1;
            actual.deployment.drogue.size = 57;
            actual.deployment.drogue.width = 3;

            actual.motorMount.diameter = 28;
            actual.motorMount.length = 33;

            //Trace.WriteLine(actual.body.GetType() == expected.body.GetType());
            // Assert
            if (actual.body.diameter == expected.body.diameter && actual.body.length == expected.body.length && actual.body.material == expected.body.material &&
                actual.nosecone.length == expected.nosecone.length && actual.nosecone.style == expected.nosecone.style && actual.nosecone.material == expected.nosecone.material &&
                actual.fins.count == expected.fins.count && actual.fins.style == expected.fins.style && actual.fins.material == expected.fins.material &&
                actual.deployment.type == expected.deployment.type && actual.deployment.main.method == expected.deployment.main.method && actual.deployment.main.size == expected.deployment.main.size &&
                actual.deployment.main.width == expected.deployment.main.width &&
                actual.deployment.drogue.method == expected.deployment.drogue.method && actual.deployment.drogue.size == expected.deployment.drogue.size && actual.deployment.drogue.width == actual.deployment.drogue.width)
            {
                Assert.IsTrue(true);
            }
            else
            {
                Assert.Fail();
            }


        }
    }
}
