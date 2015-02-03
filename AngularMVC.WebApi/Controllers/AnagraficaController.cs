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
    
    public class AnagraficaController : ApiController
    {
        static List<Persona> persone = new List<Persona>() {
            new Persona(){
                ID = 1 ,
                Nome = "Manuele",
                Cognome = "Pagliarani",
                CodiceFiscale = "DDDDDDDDDDDD"
            },
            new Persona(){
                ID = 2 ,
                Nome = "Valentina",
                Cognome = "Rocchi",
                CodiceFiscale = "DDDDDDDDDDDD"
            }

        };

        // GET api/anagrafica
        public IEnumerable<Persona> Get()
        {
            return persone;
        }

        // GET api/anagrafica/5
        public Persona Get(int id)
        {
            return persone.FirstOrDefault();
        }

        // POST api/anagrafica
        public void Post([FromBody]Persona value)
        {
            persone.Add(value);
        }

        // PUT api/anagrafica/5
        public void Put(int id, [FromBody]Persona value)
        {
            var pers = persone.FirstOrDefault(p => p.ID == id);
            if (pers != null)
            {
                persone.Remove(pers);
                persone.Add(value);
            }
        }

        // DELETE api/anagrafica/5
        public void Delete(int id)
        {
            var pers = persone.FirstOrDefault(p => p.ID == id);
            if (pers != null)
            {
                persone.Remove(pers);                
            }
        }
    }
}
