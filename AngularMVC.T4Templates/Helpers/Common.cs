﻿using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularMVC.T4Templates.Helpers
{
    public static class Common
    {
        public static IEnumerable<String> SplitPascalCaseString(string s)
        {
            var strings = new List<String>();

            if (String.IsNullOrWhiteSpace(s))
                return strings;

            var sb = new StringBuilder();
            foreach (var c in s)
            {
                if (sb.Length > 0 && Char.IsUpper(c))
                {
                    strings.Add(sb.ToString());
                    sb.Clear();
                }
                sb.Append(c);
            }
            if (sb.Length > 0)
            {
                strings.Add(sb.ToString());
            }

            return strings;
        }

        public static string CamelCaseString(string s)
        {
            if (String.IsNullOrWhiteSpace(s))
                return s;

            return s.Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries)
                .Aggregate("", (src, word) =>
                {
                    var newString = src; 
                    if (String.IsNullOrEmpty(newString))
                        newString += Char.ToLowerInvariant(word[0]);
                    else
                        newString += Char.ToUpperInvariant(word[0]);

                    if (word.Length > 1)
                        newString += word.Substring(1);

                    return newString;
                });
        }
    }
}
