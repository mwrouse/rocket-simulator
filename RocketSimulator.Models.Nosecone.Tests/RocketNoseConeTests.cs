using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;

using Autofac;
using RocketSimulator.Models.Nosecone;


namespace RocketSimulator.Models.Nosecone.Tests
{
    [TestClass]
    public class RocketNoseConeTests
    {
        [TestMethod]
        public void RocketNoseConeTest()
        {
            // Arrange 
            var builder = new ContainerBuilder();
            builder.RegisterModule(new RocketNoseconeModule());
            var container = builder.Build();

            var actual = container.Resolve<IRocketNoseconeModel>();

            // Expectation 
            var expected = new RocketNoseconeModel() { length = 33, style = 3, material = 0 };


            // Act 
            actual.length = 33;
            actual.style = 3;
            actual.material = 0;


            // Assert
            if (actual.length == expected.length && actual.style == expected.style && actual.material == expected.material)
                Assert.IsTrue(true);
            else
                Assert.Fail();

        }

    }
}
