using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Web.Http;
using slim_commit.Models;

namespace slim_commit.Controllers
{
    /// <summary>
    /// Reporter Controller
    /// </summary>
    public class Reporter2Controller : BaseApiController
    {
        /// <summary>
        /// Connection string
        /// </summary>
        private readonly string _connectionString = ConfigurationManager.ConnectionStrings["tapr"].ConnectionString;

         
        /// <summary>
        /// Get Campuses
        /// </summary> 
        /// <returns></returns>
        [HttpPost]
        public List<Reporter2TaprModel> GetTaprData(Reporter2TaprRequestModel filter)
        {
            var records = new List<Reporter2TaprModel>();

            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                var command = new SqlCommand("select * from [dbo].[cstud] where [year] IN (@years) and Campus IN (@campuses) and Attr IN (@attrs)", connection);
                command.AddArrayParameters(filter.Years, "years");
                command.AddArrayParameters(filter.Campuses, "campuses");
                command.AddArrayParameters(filter.TaprList, "attrs");

                var reader = command.ExecuteReader();
                while (reader.Read())
                {
                    try
                    {
                        records.Add(new Reporter2TaprModel(reader));
                    }
                    catch { }
                }
                connection.Close();
            }
            return records;
        }

        /// <summary>
        /// Get GradeTypes
        /// </summary>
        /// <returns></returns>
        public List<string> GetGradeTypes()
        {
            var records = new List<string>();

            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                var command = new SqlCommand("select  DISTINCT GRDTYPE from reporterC2C", connection);
                var reader = command.ExecuteReader();
                while (reader.Read())
                {
                    try
                    {
                        records.Add(reader["GRDTYPE"].ToString());
                    }
                    catch { }
                }
                connection.Close();
            }
            return records;
        }
    }
}
     