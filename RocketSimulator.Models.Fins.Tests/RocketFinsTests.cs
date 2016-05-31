using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Autofac;
using RocketSimulator.Models.Fins;

namespace RocketSimulator.Models.Fins.Tests
{
    [TestClass]
    public class RocketFinsTests
    {
        [TestMethod]
        public void RocketFinsTest()
        {
            // Arrange
            var builder = new ContainerBuilder();
            builder.RegisterModule(new RocketFinsModule());
            var container = builder.Build();

            var actual = container.Resolve<IRocketFinsModel>();

            // Generate expected result
            var expected = new RocketFinsModel() { count = 4, style = 1, material = 2 };


            // Act 
            actual.count = 4;
            actual.style = 1;
            actual.material = 2;


            // Assert
            if (actual.count == expected.count && actual.style == expected.style && actual.material == expected.material)
                Assert.IsTrue(true);
            else
                Assert.Fail();
        }

    }
}
