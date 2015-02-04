using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;

namespace DNA.WebSite.ViewEngine
{
    public class AngularMVCViewEngine : RazorViewEngine
    {
        protected override IView CreateView(ControllerContext controllerContext, string viewPath, string masterPath)
        {
            var a = base.CreateView(controllerContext, viewPath, masterPath);
            return new AngularMVCView(controllerContext, viewPath, masterPath);
        }
    }


    public class AngularMVCView : IView
    {
        RazorView originalView;

        public AngularMVCView(ControllerContext controllerContext, string viewPath, string masterPath)
        {
            originalView = new RazorView(controllerContext, viewPath, "~/Views/Shared/_Layout.cshtml", true, null);
        }

        public void Render(ViewContext viewContext, System.IO.TextWriter writer)
        {
            var sw = new StringWriter();
            var w = new HtmlTextWriter(sw);
            originalView.Render(viewContext,w);
            string html = sw.ToString();
            html = html.Replace("Contact", "Sta minchia");	
            writer.Write(html);            
        }
    }
}