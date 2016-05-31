using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;

using Autofac;


namespace RocketSimulator.Models.Body.Tests
{
    [TestClass]
    public class RocketBodyTests
    {
        [TestMethod]
        public void RocketBodyTest()
        {
            // Arrange 
            var builder = new ContainerBuilder();
            builder.RegisterModule(new RocketBodyModule());
            var container = builder.Build();

            var testBody = container.Resolve<RocketBodyModel>();

            // Setup the expected result
           var expected = new RocketBodyModel() { diameter = 23, length = 42, material = 3 };


            // Act 
            testBody.diameter = 23;
            testBody.length = 42;
            testBody.material = 3;


            // Assert
            Assert.IsTrue(expected.diameter == testBody.diameter && expected.length == testBody.length && expected.material == testBody.material);

        }


      
    }
}
