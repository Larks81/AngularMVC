using System;
using System.Collections;
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
        private MethodInfo _mi;

        public string MethodName { get; set; }

        public string HttpMethod { get; set; }

        public bool IsArray { get; set; }

        public Dictionary<string, string> Parameters { get; set; }

        public WebApiControllerMethodsInfos(MethodInfo mi)
        {
            this._mi = mi;
            this.Parameters = new Dictionary<string, string>();
            this.HttpMethod = HttpMethodFromMethodName(mi.Name);
            this.IsArray = typeof(IEnumerable).IsAssignableFrom(mi.ReturnType);
            this.MethodName = Common.CamelCaseString(mi.Name);
            if (this.IsArray && !mi.GetParameters().Any())
            {
                this.MethodName += "All";
            }
            this.LoadParameters();
        }

        private static string HttpMethodFromMethodName(string name)
        {
            return name.ToUpperInvariant();
        }

        private void LoadParameters()
        {
            var validParameters = this._mi.GetParameters().Where(pi =>
                pi.GetCustomAttribute<FromBodyAttribute>() == null);
            foreach (var p in validParameters)
            {
                var name = Common.CamelCaseString(p.Name);
                this.Parameters.Add(name, "@" + name);
            }            
        }
    }
}
