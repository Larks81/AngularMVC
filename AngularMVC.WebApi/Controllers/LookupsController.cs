using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using DNA.Model;
using DNA.Model.business;

namespace DNA.WebApi.Controllers
{
    public class LookupsController : ApiController
    {
        
        public object Get()
        {
            List<object> a = new List<object>();

            var cityLookup = new NgLookup<City>()
                             {
                                 Name = "Cities",
                                 Items = City.FakeCities
                             };
            a.Add(cityLookup);

            var catLookup = new NgLookup<Category>()
            {
                Name = "Categories",
                Items = Category.FakeCategories
            };
            a.Add(catLookup);

            return new { a };
                      
        }     
    }
}
