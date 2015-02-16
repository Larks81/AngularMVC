using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DNA.Model;

namespace DNA.WebApi
{
    public class NgLookup<T> where T : ILookupable
    {
        public string Name { get; set; }
        public List<T> Items { get; set; }
    }
}