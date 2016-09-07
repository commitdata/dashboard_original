using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using System.Web.Http;
using slim_commit.Models;

namespace slim_commit.Controllers
{
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
        public List<C2C> FilterC2C(ReporterModel reporterModel)
        {
            var records = new List<C2C>();

            if (reporterModel == null) return records;

            var sql = new StringBuilder("SELECT * FROM C2C");

            var whereClause = new StringBuilder(" WHERE ");
             
            var appendAnd = false;

            var query = PrepareSubInClause(reporterModel.Counties, "COUNTY", false, true);

            if (!string.IsNullOrEmpty(query))
            {
                whereClause.Append(query);
                appendAnd = true;
            }

            query = PrepareSubInClause(reporterModel.Districts, "DISTRICT", appendAnd, true);

            if (!string.IsNullOrEmpty(query))
            {
                whereClause.Append(query);
                appendAnd = true;
            }

            query = PrepareSubInClause(reporterModel.Campuses, "CAMPUS", appendAnd, true);

            if (!string.IsNullOrEmpty(query))
            {
                whereClause.Append(query);
                appendAnd = true;
            }

            query = PrepareSubInClause(reporterModel.Levels, "GRDTYPE", appendAnd, false);

            if (!string.IsNullOrEmpty(query))
            {
                whereClause.Append(query);
                appendAnd = true;
            }

            query = PrepareSubInClause(reporterModel.Charters, "CFLCHART", appendAnd, false);

            if (!string.IsNullOrEmpty(query))
            {
                whereClause.Append(query); 
            }

            if (whereClause.Length > 10) sql.Append(whereClause);

            using (var connection = new SqlConnection(_connectionString))
            {
                if (connection.State == ConnectionState.Closed) connection.Open();

                var command = new SqlCommand(sql.ToString(), connection);

                //"SELECT * FROM C2C WHERE COUNTY IN (@county) AND DISTRICT IN (@district) AND CAMPUS IN (@campus) AND GRDTYPE IN (@level) AND CFLCHART IN (@charter)"
                //command.AddArrayParameters(reporterModel.Counties, "county");
                //command.AddArrayParameters(reporterModel.Districts, "district");
                //command.AddArrayParameters(reporterModel.Campuses, "campus");
                //command.AddArrayParameters(reporterModel.Levels, "level");
                //command.AddArrayParameters(reporterModel.Charters, "charter");

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
        public List<ReporterCountyModel> GetCounties()
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
        public List<ReporterDistrictModel> GetDistricts() //ReporterDistrictFilterModel filter
        {
            var records = new List<ReporterDistrictModel>();

            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                var command = new SqlCommand("select distinct DISTNAME, DISTRICT,COUNTY from C2C order by DISTNAME", connection);
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
        public List<ReporterCampusModel> GetCampuses() //ReporterCampusFilterModel filter
        {
            var records = new List<ReporterCampusModel>();

            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                var command = new SqlCommand("select distinct CAMPNAME, CAMPUS, DISTRICT,COUNTY from C2C order by CAMPNAME", connection);
                //command.AddArrayParameters(filter.Districts, "district");
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
                var command = new SqlCommand("select  DISTINCT GRDTYPE from C2C", connection);
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


        private string PrepareSubInClause(string[] values, string identifier, bool appendAnd, bool containSingleQuoteAtStart)
        { 
            if (values == null || values.Length == 0) return string.Empty; 

            var inClause = new StringBuilder(string.Format(" {0} {1} IN (", appendAnd ? "AND" : String.Empty, identifier));
            var count = 1;
             
            foreach (var value in values)
            {
                if (count >= 0 && count != values.Length)
                {
                    inClause.Append(containSingleQuoteAtStart ? string.Format("''{0}',", value) : string.Format("'{0}',", value)); // actual value in IN clause
                }
                else if(count == values.Length)
                {
                    inClause.Append(containSingleQuoteAtStart ? string.Format("''{0}')", value) : string.Format("'{0}')", value)); // bracket close of IN clause  
                }

                count++;
            }

            return inClause.ToString();
        }
    }
}
