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
    public class ReporterController : BaseApiController
    {
        /// <summary>
        /// Connection string
        /// </summary>
        private readonly string _connectionString = ConfigurationManager.ConnectionStrings["reporters"].ConnectionString;

        /// <summary>
        /// Get C2C records
        /// </summary> 
        /// <returns>List of C2C records</returns>
        [HttpPost]
        public List<C2C> FilterC2C1(ReporterModel reporterModel)
        {
            var records = new List<C2C>();

            using (var connection = new SqlConnection(_connectionString))
            {
                if (connection.State == ConnectionState.Closed) connection.Open();

                var command = new SqlCommand("SELECT * FROM C2C WHERE COUNTY IN (@county) AND DISTRICT IN (@district) AND CAMPUS IN (@campus) AND GRDTYPE IN (@level) AND CFLCHART IN (@charter)", connection);

                command.AddArrayParameters(reporterModel.Counties, "county");
                command.AddArrayParameters(reporterModel.Districts, "district");
                command.AddArrayParameters(reporterModel.Campuses, "campus");
                command.AddArrayParameters(reporterModel.Levels, "level");
                command.AddArrayParameters(reporterModel.Charters, "charter");

                var reader = command.ExecuteReader();
                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        try
                        {
                            records.Add(new C2C(reader));
                        }
                        catch { }
                    }
                }
                if (connection.State == ConnectionState.Open) connection.Close();
            }
            return records;
        }

        /// <summary>
        /// Get Counties
        /// </summary>
        /// <returns></returns>
        public List<ReporterCountyModel> GetCounties1()
        {
            var counties = new List<ReporterCountyModel>();

            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                var command = new SqlCommand("select distinct CNTYNAME, COUNTY from C2C order by CNTYNAME", connection);
                var reader = command.ExecuteReader();
                while (reader.Read())
                {
                    try
                    {
                        counties.Add(new ReporterCountyModel(reader));
                    }
                    catch { }
                }
                connection.Close();
            }
            return counties;
        }

        /// <summary>
        /// Get Districts
        /// </summary> 
        /// <returns></returns>
        [HttpPost]
        public List<ReporterDistrictModel> GetDistricts1(ReporterDistrictFilterModel filter) 
        {
            var records = new List<ReporterDistrictModel>();

            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                var command = new SqlCommand("select distinct DISTNAME, DISTRICT,COUNTY from C2C WHERE COUNTY IN (@county) order by DISTNAME", connection);
                command.AddArrayParameters(filter.Counties, "county");
                var reader = command.ExecuteReader();
                while (reader.Read())
                {
                    try
                    {
                        records.Add(new ReporterDistrictModel(reader));
                    }
                    catch { }
                }
                connection.Close();
            }
            return records;
        }

        /// <summary>
        /// Get Campuses
        /// </summary> 
        /// <returns></returns>
        [HttpPost]
        public List<ReporterCampusModel> GetCampuses1(ReporterCampusFilterModel filter) 
        {
            var records = new List<ReporterCampusModel>();

            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                var command = new SqlCommand("select distinct CAMPNAME, CAMPUS, DISTRICT,COUNTY from C2C WHERE DISTRICT IN (@district) order by CAMPNAME", connection);
                command.AddArrayParameters(filter.Districts, "district");
                var reader = command.ExecuteReader();
                while (reader.Read())
                {
                    try
                    {
                        records.Add(new ReporterCampusModel(reader));
                    }
                    catch { }
                }
                connection.Close();
            }
            return records;
        }


        /// <summary>
        /// Get C2C records
        /// </summary> 
        /// <returns>List of C2C records</returns>
        [HttpPost]
        public List<ReporterC2C> FilterC2C(ReporterModel reporterModel)
        {
            var records = new List<ReporterC2C>();

            using (var connection = new SqlConnection(_connectionString))
            {
                if (connection.State == ConnectionState.Closed) connection.Open();

                var command = new SqlCommand("SELECT * FROM reporterC2C WHERE CNTYNAME IN (@county) AND DISTNAME IN (@district) AND CAMPUS IN (@campus) AND GRDTYPE IN (@level) AND CFLCHART IN (@charter)", connection);

                command.AddArrayParameters(reporterModel.Counties, "county");
                command.AddArrayParameters(reporterModel.Districts, "district");
                command.AddArrayParameters(reporterModel.Campuses, "campus");
                command.AddArrayParameters(reporterModel.Levels, "level");
                command.AddArrayParameters(reporterModel.Charters, "charter");

                var reader = command.ExecuteReader();
                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        try
                        {
                            records.Add(new ReporterC2C(reader));
                        }
                        catch { }
                    }
                }
                if (connection.State == ConnectionState.Open) connection.Close();
            }
            return records;
        }

        /// <summary>
        /// Get Counties
        /// </summary>
        /// <returns></returns>
        public List<ReporterCountyModel> GetCounties()
        {
            var counties = new List<ReporterCountyModel>();

            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                var command = new SqlCommand("select distinct CNTYNAME, CNTYNAME AS COUNTY from reporterC2C order by CNTYNAME", connection);
                var reader = command.ExecuteReader();
                while (reader.Read())
                {
                    try
                    {
                        counties.Add(new ReporterCountyModel(reader));
                    }
                    catch { }
                }
                connection.Close();
            }
            return counties;
        }

        /// <summary>
        /// Get Districts
        /// </summary> 
        /// <returns></returns>
        [HttpPost]
        public List<ReporterDistrictModel> GetDistricts(ReporterDistrictFilterModel filter)
        {
            var records = new List<ReporterDistrictModel>();

            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                var command = new SqlCommand("select distinct DISTNAME, DISTNAME AS DISTRICT from reporterC2C WHERE CNTYNAME IN (@county) order by DISTNAME", connection);
                command.AddArrayParameters(filter.Counties, "county");
                var reader = command.ExecuteReader();
                while (reader.Read())
                {
                    try
                    {
                        records.Add(new ReporterDistrictModel(reader));
                    }
                    catch { }
                }
                connection.Close();
            }
            return records;
        }

        /// <summary>
        /// Get Campuses
        /// </summary> 
        /// <returns></returns>
        [HttpPost]
        public List<ReporterCampusModel> GetCampuses(ReporterCampusFilterModel filter)
        {
            var records = new List<ReporterCampusModel>();

            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                var command = new SqlCommand("select distinct CAMPNAME, CAMPUS from reporterC2C WHERE DISTNAME IN (@district) order by CAMPNAME", connection);
                command.AddArrayParameters(filter.Districts, "district");
                var reader = command.ExecuteReader();
                while (reader.Read())
                {
                    try
                    {
                        records.Add(new ReporterCampusModel(reader));
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
     