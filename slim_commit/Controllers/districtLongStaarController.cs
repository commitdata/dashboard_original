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
    public class districtLongStaarController : ApiController
    {

        public string connectionString = ConfigurationManager.ConnectionStrings["commit_data"].ConnectionString;

        public List<Dictionary<string, string>> Get(string district)
        {
            List<Dictionary<string, string>> all_models = new List<Dictionary<string, string>>();

            List<string> fields = new List<string>();

            using (SqlConnection connection = new SqlConnection(connectionString))
            {

                connection.Open();
                SqlCommand command = new SqlCommand("SELECT * FROM dbo.district_long_staar where DISTRICT like @district", connection);
                command.Parameters.AddWithValue("district", district);

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
