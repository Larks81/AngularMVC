using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DNA.Model
{
    public interface ILookupable
    {
        string LookupID
        {
            get;
        }

        string LookupTextSearch
        {
            get;            
        }

        string LookupTextRead
        {
            get;
        }
    }
}
