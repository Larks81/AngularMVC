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
                FiscalCode = "DDDDDDDDDDDD"
            },
            new Person(){
                ID = 2 ,
                FirstName = "Valentina",
                LastName = "Rocchi",
                FiscalCode = "DDDDDDDDDDDD"
            }

        };

        // GET api/anagrafica
        public IEnumerable<Person> Get()
        {
            return persons;
        }

        // GET api/anagrafica/5
        public Person Get(int id)
        {
            return persons.FirstOrDefault();
        }

        // POST api/anagrafica
        public int Post([FromBody]Person value)
        {
            value.ID = persons.Max(p => p.ID) + 1;
            persons.Add(value);
            return value.ID;
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
