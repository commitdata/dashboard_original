using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using slim_commit.Extensions;

namespace slim_commit.Controllers
{
    public class campusReportController : ApiController
    {

        private string GetConnection(int year)
        {
            return ConfigurationManager.ConnectionStrings["tapr_" + year].ConnectionString;
        }

        public List<Dictionary<string, object>> GetCounties(int year)
        {
            List<Dictionary<string, object>> counties;

            using (SqlConnection connection = new SqlConnection(GetConnection(year)))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("select distinct CNTYNAME, COUNTY from CREF$ order by CNTYNAME", connection);
                SqlDataReader reader = command.ExecuteReader();
                counties = reader.GetAllRecords();
                connection.Close();
            }
            return counties;
        }

        public List<Dictionary<string, object>> GetDistricts(int year, string county)
        {
            List<Dictionary<string, object>> counties;

            using (SqlConnection connection = new SqlConnection(GetConnection(year)))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("select distinct DISTNAME, DISTRICT from CREF$  where COUNTY = @county order by DISTNAME", connection);
                command.Parameters.AddWithValue("county", county);
                SqlDataReader reader = command.ExecuteReader();
                counties = reader.GetAllRecords();
                connection.Close();
            }
            return counties;
        }

        public List<Dictionary<string, object>> GetCampuses(int year, string district, string county)
        {
            List<Dictionary<string, object>> counties;

            using (SqlConnection connection = new SqlConnection(GetConnection(year)))
            {
                connection.Open();
                SqlCommand command;
                if (!string.IsNullOrEmpty(district))
                {
                    command = new SqlCommand("select distinct CAMPNAME, CAMPUS from CREF$ where DISTRICT = @district order by CAMPNAME", connection);
                    command.Parameters.AddWithValue("district", district);
                }
                else
                {
                    command = new SqlCommand("select distinct CAMPNAME, CAMPUS from CREF$ where COUNTY = @county order by CAMPNAME", connection);
                    command.Parameters.AddWithValue("county", county);
                }
                SqlDataReader reader = command.ExecuteReader();
                counties = reader.GetAllRecords();
                connection.Close();
            }
            return counties;
        }
    }
}
