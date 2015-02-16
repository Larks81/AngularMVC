using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DNA.Model.business
{
    public class Category : ILookupable
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public static List<Category> FakeCategories
        {
            get
            {
                return new List<Category>()
                       {
                           new Category()
                           {
                               ID = 1,
                               Name = "Cat A",
                               Description = "Category A"
                           },
                           new Category()
                           {
                               ID = 2,
                               Name = "Cat B",
                               Description = "Category B"
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
            get { return Name; }
        }

        public string LookupTextRead
        {
            get { return Name; }
        }
    }
}
