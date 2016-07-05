using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.Sql;
using System.Data.SqlClient;
using System.Configuration;
using slim_commit.Extensions;
using System.Data;
using ClosedXML.Excel;
using System.Web.Mvc;
using System.IO;
using System.Web;
using System.Net.Http.Headers;
using slim_commit.Helpers;

namespace slim_commit.Controllers
{
    public class sqlController : ApiController
    {
        public const string connectionString = "Server=tcp:uld67t7jyl.database.windows.net,1433;Database=singleton;User ID=robert@uld67t7jyl;Password=Commit!1;Trusted_Connection=False;Encrypt=True;Connection Timeout=30;";


        public List<Dictionary<string, string>> Get()
        {
            List<Dictionary<string, string>> all_models = new List<Dictionary<string, string>>();

            List<string> fields = new List<string>();

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                try
                {
                    connection.Open();
                }
                catch (Exception)
                {
                    return null;
                }

                SqlCommand command = new SqlCommand("SELECT * FROM dbo.singleton WHERE [CAMPUS] LIKE '''057%'", connection);

                var reader = command.ExecuteReader();

                for (var f = 0; f < reader.FieldCount; f++)
                {
                    fields.Add(reader.GetName(f));
                }

                if (reader.HasRows)
                    while (reader.Read())
                    {
                        try
                        {
                            Dictionary<string, string> models = new Dictionary<string, string>();

                            for (int f = 0; f < fields.Count; f++)
                            {
                                models.Add(fields[f], reader[fields[f]].ToString());
                            }

                            all_models.Add(models);

                        }
                        catch { }
                    }

                connection.Close();
            }
            return all_models;



        }


     
    }
}

