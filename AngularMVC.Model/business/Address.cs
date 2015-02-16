using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DNA.Model
{
    public class Address
    {
        public DateTime FromDate { get; set; }
        public string StreetName { get; set; }
        public string Number { get; set; }
        public City City { get; set; }
    }
}
