using System;
using System.Collections.Generic;
using System.Configuration;
using System.Text;
using System.Xml;

namespace CafeManagement.Data.DataAccess
{
    public static class SqlQueryStringReader
    {
        public static string GetQueryStringById(string id, string xmlfilename)
        {
            return ReadQueryStringFromFile(id, xmlfilename);
        }

        private static string ReadQueryStringFromFile(string id, string xmlfilename)
        {
            var filePath = ConfigurationManager.AppSettings["XmlQueryPath"] + xmlfilename + ".xml";

            using (var reader = new XmlTextReader(filePath))
            {
                reader.WhitespaceHandling = WhitespaceHandling.None;
                while (reader.Read())
                {
                    if (reader.NodeType == XmlNodeType.Element && reader.Name == "SqlQueryString")
                    {
                        string currentId = reader.GetAttribute("Id");
                        if (currentId == id)
                        {
                            reader.Read();
                            return reader.Value;
                        }
                    }
                }
            }
            return null;
        }
    }
}
