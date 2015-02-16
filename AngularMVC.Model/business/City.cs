using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DNA.Model
{
    public class City : ILookupable
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string ITFCCode { get; set; }

        public static List<City> FakeCities
        {
            get
            {
                return new List<City>()
                       {
                           new City()
                           {
                               ID = 1,
                               Name = "Cesena",
                               ITFCCode = "C573"
                           },
                           new City()
                           {
                               ID = 2,
                               Name = "Montiano",
                               ITFCCode = "C574"
                           },
                           new City()
                           {
                               ID = 3,
                               Name = "Gambettola",
                               ITFCCode = "C571"
                           },
                           new City()
                           {
                               ID = 4,
                               Name = "Savignano",
                               ITFCCode = "C572"
                           }
                       };
            }
            
        }        

        public string LookupID
        {
            get { return ID.ToString(); }
        }

        public string LookupTextSearch
        {
            get { return "ID:" + ID + " - " + Name; }
        }

        public string LookupTextRead
        {
            get { return Name; }
        }
    }
}
