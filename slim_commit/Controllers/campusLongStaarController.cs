using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.Sql;
using System.Data.SqlClient;
using System.Configuration;

namespace slim_commit.Controllers
{
    public class campusLongStaarController : ApiController
    {

        string connectionString = ConfigurationManager.ConnectionStrings["commit_data"].ConnectionString;

        public List<Dictionary<string, object>> Get(string campusID)
        {
            List<Dictionary<string, object>> all_models = new List<Dictionary<string, object>>();

            List<string> fields = new List<string>();

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("SELECT * FROM dbo.campus_long_staar WHERE [CAMPUS] LIKE  @campus", connection);
                command.Parameters.AddWithValue("campus", campusID);

                var reader = command.ExecuteReader();

                for (var f = 0; f < reader.FieldCount; f++)
                {
                    fields.Add(reader.GetName(f));
                }

                if (reader.HasRows)
                    while (reader.Read())
                    {
                        Dictionary<string, object> models = new Dictionary<string, object>();

                        for (int f = 0; f < fields.Count; f++)
                        {
                            models.Add(fields[f], reader[fields[f]]);
                        }

                        all_models.Add(models);
                    }

                connection.Close();
            }
            return all_models;
        }

    }
}
