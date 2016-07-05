using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.Sql;
using System.Data.SqlClient;
using slim_commit.Models;
using slim_commit.cache;
using System.Configuration;

namespace slim_commit.Controllers
{
    public class districtSingleController : ApiController
    {
        public static string connectionString = ConfigurationManager.ConnectionStrings["commit_data"].ConnectionString;
        public const string cacheKey = "DISTRICT_SINGLE";


        public List<District> Get()
        {
            List<District> districts = CommitCache.Get<List<District>>(cacheKey, DistrictFromDB);
            return districts;
        }

        internal static List<District> DistrictFromDB()
        {
            List<District> districts = new List<District>();

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("SELECT * FROM dbo.district", connection);

                var reader = command.ExecuteReader();

                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        districts.Add(new District(reader));
                    }
                }
                connection.Close();
            }
            return districts;
        }

    }
}
