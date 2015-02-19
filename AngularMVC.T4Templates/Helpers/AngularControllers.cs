using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace AngularMVC.T4Templates.Helpers
{
    public static class AngularControllersHelpers
    {
        public static bool IsValidAngularController(Type controllerType)
        {
            return typeof(ApiController).IsAssignableFrom(controllerType);
        }
    }

    public class AngularControllerInfo
    {
        private Type _controllerType;
        private List<string> _dependencies;
        private IEnumerable<MethodInfo> _controllerMethods;

        public string ControllerName { get; set; }

        public AngularControllerInfo(Type controllerType)
        {
            this._controllerType = controllerType;
            this._controllerMethods = this._controllerType.GetMethods(BindingFlags.Public | BindingFlags.Instance);
            this.ControllerName = Common.CamelCaseString(controllerType.Name);
            this.EstablishDependencies();
        }

        private void EstablishDependencies()
        {
            this._dependencies = new List<string>();
            //One required dependencies will surely be the service..
            var serviceName = AngularResourcesHelpers.GetServiceName(_controllerType);
            this._dependencies.Add(serviceName);
        }

        public string GetDependencies(bool quoted)
        {
            if (this._dependencies == null || !this._dependencies.Any())
                return "";

            IEnumerable<string> deps;
            if (quoted)
            {
                deps = this._dependencies.Select(d =>
                    String.Format("'{0}'", d));
            }
            else
            {
                deps = this._dependencies;
            }
            return String.Join(", ", deps);
        }

        public bool SupportsHttpMethod(HttpMethod method)
        {
            Func<string, Type, bool> searchFunc = (name, attrType) =>
                this._controllerMethods.Any(mi => mi.Name == name || mi.GetCustomAttribute(attrType) != null);

            if (method == HttpMethod.Get)
            {
                return searchFunc("Get", typeof(HttpGetAttribute));
            }
            if (method == HttpMethod.Post)
            {
                return searchFunc("Post", typeof(HttpPostAttribute));
            }
            if (method == HttpMethod.Put)
            {
                return searchFunc("Put", typeof(HttpPutAttribute));
            }
            if (method == HttpMethod.Delete)
            {
                return searchFunc("Delete", typeof(HttpDeleteAttribute));
            }
            return false;
        }
    }
}
