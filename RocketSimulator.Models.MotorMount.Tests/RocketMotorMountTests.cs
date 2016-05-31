using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;

using Autofac;
using RocketSimulator.Models.MotorMount;

namespace RocketSimulator.Models.MotorMount.Tests
{
    [TestClass]
    public class RocketMotorMountTests
    {
        [TestMethod]
        public void RocketMotorMountTest()
        {
            // Arrange 
            var builder = new ContainerBuilder();
            builder.RegisterModule(new RocketMotorMountModule());
            var container = builder.Build();

            var actual = container.Resolve<IRocketMotorMountModel>();

            // Setup expected result 
            var expected = new RocketMotorMountModel() { diameter = 28, length = 33 };
          
            // Act 
            actual.diameter = 28;
            actual.length = 33;

            // Assert
            if (actual.diameter == expected.diameter && actual.length == expected.length)
                Assert.IsTrue(true);
            else
                Assert.Fail();
        }

    }
}
