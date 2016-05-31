using RocketSimulator.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Net.Http;
using System.Web.Http;

namespace RocketSimulator.Web.Repository
{
    /*
     * Class to represent the rocket repository, this is used to store rocket models
     */
    public static class RocketRepository
    {
        public static int nextID = 0;

        static Dictionary<int, RocketModel> rockets = new Dictionary<int, RocketModel>(); // Dictionary to store saved rockets in

            
        /*
         * Returns all rockets in the repository
         */
        public static IEnumerable<RocketModel> All()
        {
            return rockets.Values;
        }

 
        /*
         * Finds a model, returns null if no model is found 
         */
        public static RocketModel Find(int id)
        {
            if (rockets.ContainsKey(id))
                return rockets[id];
            else
                // Model not found
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound)
                        {
                            Content = new StringContent(string.Format("No rocket found with an ID of {0}.", id)),
                            ReasonPhrase = "Invalid rocket ID"
                        });
        }


        /*
         * Updates a rocket 
         */
        public static void Update(int id, RocketModel newRocket)
        {
            // Update rocket if it exists
            if (rockets.ContainsKey(id))
                rockets[id] = newRocket;
            else
                // Model not found
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    Content = new StringContent(string.Format("No rocket found with an ID of {0}.", id)),
                    ReasonPhrase = "Invalid rocket ID"
                });
        }



        /*
         * Store a rocket 
         */
        public static RocketModel Add(RocketModel rocket)
        {
            rocket.id = nextID++; // Give the rocket an ID, and increment the next ID in the repository
            rockets.Add(rocket.id, rocket); // Add to the dictionary

            return rocket; // Return the rocket model with updated id
        }


        /*
         * Removes a rocket 
         */
        public static void Delete(int id)
        {
            if (rockets.ContainsKey(id))
                rockets.Remove(id);
            else
                // Model not found
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    Content = new StringContent(string.Format("No rocket found with an ID of {0}.", id)),
                    ReasonPhrase = "Invalid rocket ID"
                });
        }



    }
}
