using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Autofac;

using RocketSimulator.Models.Deployment;


namespace RocketSimulator.Models.Deployment.Tests
{
    [TestClass]
    public class RocketDeploymentTests
    {
        [TestMethod]
        public void RocketDeploymentTest()
        {
            
            // Arrange 
            var builder = new ContainerBuilder();
            builder.RegisterModule(new RocketDeploymentModule());
            var container = builder.Build();

            var actual = container.Resolve<IRocketDeploymentModel>();

            // Expected result 
            var expected = new RocketDeploymentModel()
            {
                type = 1,
                main = new RocketDeploymentMethod()
                {
                    method = 0,
                    size = 22,
                    width = 5
                },
                drogue =new RocketDeploymentMethod()
                {
                    method = 1,
                    size = 57,
                    width = 3
                }
            };


            // Act
            actual.type = 1;
            actual.main = container.Resolve<IRocketDeploymentMethod>();
            actual.main.method = 0;
            actual.main.size = 22;
            actual.main.width = 5;

            actual.drogue = container.Resolve<IRocketDeploymentMethod>();
            actual.drogue.method = 1;
            actual.drogue.size = 57;
            actual.drogue.width = 3;

  
            // Assert
            if (actual.type == expected.type && actual.main.method == expected.main.method &&
                actual.main.size == expected.main.size && actual.main.width == expected.main.width &&
                actual.drogue.method == expected.drogue.method && actual.drogue.size == expected.drogue.size &&
                actual.drogue.width == expected.drogue.width)
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
