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
    public class districtLongController : ApiController
    {
        public string connectionString = ConfigurationManager.ConnectionStrings["commit_data"].ConnectionString;

        public static List<Dictionary<string, string>> cache;

        public List<Dictionary<string, string>> Get()
        {
            if(cache != null)
            {
                return cache;
            }

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

                SqlCommand command = new SqlCommand("SELECT * FROM dbo.district_long_aeis", connection);// where [COUNTY]='''057'

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
            cache = all_models;
            return all_models;



        }
    }
}
