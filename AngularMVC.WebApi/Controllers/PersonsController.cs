using DNA.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace DNA.WebApi.Controllers
{
    /// <summary>
    /// Example of rest webapi with cache data (static)
    /// </summary>
    public class PersonsController : ApiController
    {
        static List<Person> persons = new List<Person>() {
            new Person(){
                ID = 1 ,
                FirstName = "Manuele",
                LastName = "Pagliarani",
                FiscalCode = "DDDDDDDDDDDD",
                Addresses = new List<Address>()
                            {
                                new Address()
                                {
                                    City = "Montiano",
                                    Number = "4",
                                    StreetName = "V.Veneto"
                                },
                                new Address()
                                {
                                    City = "Montiano",
                                    Number = "5",
                                    StreetName = "V.Roma"
                                }
                            }
            },
            new Person(){
                ID = 2 ,
                FirstName = "Valentina",
                LastName = "Rocchi",
                FiscalCode = "DDDDDDDDDDDD",
                Addresses = new List<Address>()
            },
            new Person(){
                ID = 3 ,
                FirstName = "Manuele",
                LastName = "Pagliarani",
                FiscalCode = "DDDDDDDDDDDD",
                Addresses = new List<Address>()
            },
            new Person(){
                ID = 4 ,
                FirstName = "Valentina",
                LastName = "Rocchi",
                FiscalCode = "DDDDDDDDDDDD",
                Addresses = new List<Address>()
            }

        };

        // GET api/anagrafica
        public IEnumerable<Person> Get(string firstName=null,string lastName=null)
        {
            IEnumerable<Person> filtredPersons = persons;
            if (!string.IsNullOrEmpty(firstName))
            {
                filtredPersons = filtredPersons.Where(p => p.FirstName == firstName);
            }
            if (!string.IsNullOrEmpty(lastName))
            {
                filtredPersons = filtredPersons.Where(p => p.LastName == lastName);
            }

            return filtredPersons;
        }        

        // GET api/anagrafica/5
        public Person Get(int id)
        {
            return persons.FirstOrDefault();
        }

        // POST api/anagrafica
        public Person Post([FromBody]Person value)
        {
            value.ID = persons.Max(p => p.ID) + 1;
            persons.Add(value);
            return value;
        }

        // PUT api/anagrafica/5
        public void Put(int id, [FromBody]Person value)
        {
            var pers = persons.FirstOrDefault(p => p.ID == id);
            if (pers != null)
            {
                persons.Remove(pers);
                persons.Add(value);
            }
        }

        // DELETE api/anagrafica/5
        public void Delete(int id)
        {
            var pers = persons.FirstOrDefault(p => p.ID == id);
            if (pers != null)
            {
                persons.Remove(pers);                
            }
        }
    }
}
