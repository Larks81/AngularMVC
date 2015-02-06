using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace AngularMVC.T4Templates.Helpers
{
    public class WebApiControllerMethodsInfos
    {
        public string MethodName { get; set; }

        public string HttpMethod { get; set; }

        public bool IsList { get; set; }

        public WebApiControllerMethodsInfos()
        {

        }

        public WebApiControllerMethodsInfos(MethodInfo mi)
        {
            this.HttpMethod = HttpMethodFromMethodName(mi.Name);        
        }

        private static string HttpMethodFromMethodName(string name)
        {
            return name.ToUpperInvariant();
        }
    }
}
