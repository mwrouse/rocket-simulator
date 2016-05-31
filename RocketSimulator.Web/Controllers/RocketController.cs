using System.Collections.Generic;
using System.Web.Http;

using RocketSimulator.Models;
using RocketSimulator.Models.Results;

using RocketSimulator.Web.Repository;
using System.Diagnostics;
using System;

namespace RocketSimulator.Web.Controllers
{
    /*
     * API Controller
     */
    public class RocketController : ApiController
    {

        // GET api/rocket
        public RocketModel Get()
        {
            var rocket = new RocketModel();
            rocket.body.diameter = 5;
            rocket.body.length = 75;
            rocket.body.material = 0;
            rocket.deployment.type = 0;
            rocket.deployment.main.method = rocket.deployment.drogue.method = 0;
            rocket.deployment.main.size = rocket.deployment.drogue.size = 25;
            rocket.deployment.main.width = rocket.deployment.drogue.width = 2;
            rocket.fins.count = 4;
            rocket.fins.style = 1;
            rocket.fins.material = 0;
            rocket.fins.offset = 2;
            rocket.motorMount.diameter = 28;
            rocket.motorMount.length = 35;
            rocket.motor.impulse = 338;
            rocket.motor.thrust = 400;

            return rocket;
        }

        // GET api/rocket/simulate
        public RocketFlightResults Simulate([FromBody]RocketModel rocket)
        {
            var thrust = rocket.motor.thrust;
            var impulse = rocket.motor.impulse;

            var mass = (0.2 * (rocket.body.length + rocket.nosecone.length)) / 7.2727; // Mass of the rocket (kilograms), 2.5 is an arbitrarily picked approximation (made up)
            var area = Math.PI * Math.Pow(0.5 * (rocket.body.diameter / 12) * 0.3048, 2);

            var windResistance = 0.5 * (1.2) * 0.85 * area; // Wind resistance force 
            var gravityForce = mass * 9.8;

            var burnTime = impulse / thrust; // Motor burn time 

            var q = Math.Sqrt((thrust - gravityForce) / windResistance); // ?
            var x = (2 * windResistance * q) / mass;

            var Vm = q * (1 - Math.Pow(Math.E, -x * burnTime)) / (1 + Math.Pow(Math.E, -x * burnTime)); // Max velocity 

            var Ab1 = (burnTime - gravityForce - (windResistance * Math.Pow(Vm, 2)));
            if (Ab1 < 0)
            {
                Ab1 = Ab1 * -1;
            }
            var Ab2 = (burnTime - gravityForce);
            if (Ab2 < 0)
            {
                Ab2 = Ab2 * -1;
            }

            var Ab = (mass / (2 * windResistance)) * Math.Log(Ab1 / Ab2); // Altitude at motor burn out 

            var Ac = (mass / (2 * windResistance)) * Math.Log((gravityForce + (windResistance * Math.Pow(Vm, 2))) / gravityForce); // Altitude gained during coast

            var maxAlt = Ab + Ac; // Maximum altitude acheived 

            // Return the flight results
            return new RocketFlightResults() { altitude = maxAlt, speed = Vm };
        }
        

    }
}