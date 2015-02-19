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

        /// <summary>
        /// Removes the last part of a String formatted in Pascal Case.
        /// Ex:
        /// PeopleController -> People
        /// </summary>
        /// <param name="controllerType"></param>
        /// <returns></returns>
        public static string GetServiceName(Type controllerType)
        {
            var nameParts = Common.SplitPascalCaseString(controllerType.Name);
            if (nameParts.Count() == 1)
                return controllerType.Name;

            var name = nameParts.First();
            for (int i = 1; i < nameParts.Count()-1; i++)
            {
                name += nameParts.ElementAt(i);
            }
            return name;
        }
    }

    public class WebApiControllerMethodInfo
    {
        private MethodInfo _mi;

        public string MethodName { get; set; }

        public string HttpMethod { get; set; }

        public bool IsArray { get; set; }

        public Dictionary<string, string> Parameters { get; set; }

        public WebApiControllerMethodInfo(MethodInfo mi)
        {
            this._mi = mi;
            this.Parameters = new Dictionary<string, string>();
            this.DetermineHttpMethod();
            this.IsArray = typeof(IEnumerable).IsAssignableFrom(mi.ReturnType);
            this.DetermineMethodName();
            if (this.IsArray && !mi.GetParameters().Any())
            {
                this.MethodName += "All";
            }
            this.LoadParameters();
        }

        private void DetermineHttpMethod()
        {
            var attrs = this._mi.GetCustomAttributes(false);
            if (attrs.OfType<HttpGetAttribute>().Any()) 
            { 
                this.HttpMethod = "GET";
            }
            else if (attrs.OfType<HttpPostAttribute>().Any()) 
            {
                this.HttpMethod = "POST";
            }
            else if (attrs.OfType<HttpPutAttribute>().Any())
            {
                this.HttpMethod = "PUT";
            }
            else if (attrs.OfType<HttpDeleteAttribute>().Any())
            {
                this.HttpMethod = "DELETE";
            }
            else
            {
                this.HttpMethod = this._mi.Name.ToUpperInvariant();
            }
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

        private void DetermineMethodName()
        {
            switch (this.HttpMethod)
            {
                case "GET":
                    this.MethodName = (this.IsArray ? "query" : "get");
                    break;

                case "POST":
                    this.MethodName = "save";
                    break;

                case "DELETE":
                    this.MethodName = "delete";
                    break;

                case "PUT":
                    this.MethodName = "update";
                    break;

                default:
                    this.MethodName = Common.CamelCaseString(this._mi.Name);
                    break;
            }
        }
    }
}
