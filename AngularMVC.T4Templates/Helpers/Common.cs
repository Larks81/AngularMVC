using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularMVC.T4Templates.Helpers
{
    public static class Common
    {
        public static string CamelCaseString(string s) 
        {
            if (String.IsNullOrWhiteSpace(s))
                return s;

            var txtInfo = CultureInfo.InvariantCulture.TextInfo;
            var titleCase = txtInfo.ToTitleCase(s.Trim());
            return Char.ToLowerInvariant(titleCase[0]) + titleCase.Substring(1);
        }
    }
}
