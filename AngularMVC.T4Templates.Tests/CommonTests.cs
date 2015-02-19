using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using AngularMVC.T4Templates.Helpers;
using System.Linq;

namespace AngularMVC.T4Templates.Tests
{
    [TestClass]
    public class CommonTests
    {
        [TestMethod]
        public void TestConvertStringCaseToCamelCase()
        {
            Assert.AreEqual("personsController", Common.CamelCaseString("PersonsController"));
            Assert.AreEqual("testString", Common.CamelCaseString("Test String"));
            Assert.AreEqual("testS", Common.CamelCaseString("Test s"));

            Assert.AreEqual("person", Common.CamelCaseString("Person"));
            Assert.AreEqual("person", Common.CamelCaseString("person"));

            Assert.AreEqual("", Common.CamelCaseString(""));
            Assert.AreEqual("  ", Common.CamelCaseString("  "));
            Assert.AreEqual(null, Common.CamelCaseString(null));
        }

        [TestMethod]
        public void TestSplitPascalString()
        {
            CollectionAssert.AreEqual(new[] { "Persons", "Controller" }, Common.SplitPascalCaseString("PersonsController").ToList());
        }
    }
}
