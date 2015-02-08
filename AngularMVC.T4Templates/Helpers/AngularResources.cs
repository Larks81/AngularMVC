using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace AngularMVC.T4Templates.Helpers
{
    public static class AngularResourcesHelpers
    {
        private static string[] ValidActionsMethodNames = { "Get", "Post", "Put", "Delete" };

        public static IEnumerable<MethodInfo> GetValidActionsFromController(Type controllerType) 
        {
            var methods = controllerType.GetMethods(BindingFlags.Instance | BindingFlags.Public);
            return methods.Where(mi => IsValidActionName(mi.Name) || IsMethodAdornedWithValidAttribute(mi.GetCustomAttributes()));
        }

        private static bool IsValidActionName(string name)
        {
            return ValidActionsMethodNames.Contains(name);
        }

        private static bool IsMethodAdornedWithValidAttribute(IEnumerable<Attribute> attributes)
        {
            if (attributes == null || !attributes.Any())
                return false;

            return attributes.Any(attr => {
                var attrType = attr.GetType();
                return attrType == typeof(HttpGetAttribute) ||
                    attrType == typeof(HttpPostAttribute) ||
                    attrType == typeof(HttpPutAttribute) ||
                    attrType == typeof(HttpDeleteAttribute);
            });
        }
    }

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
