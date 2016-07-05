using slim_commit.Models;
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
    public class actExpController : ApiController
    {
        public string connectionString = ConfigurationManager.ConnectionStrings["benchmarking"].ConnectionString;


        #region actExpTwo

        public List<Dictionary<string, object>> GetDistrictsTwo()
        {
            List<Dictionary<string, object>> all_districts = new List<Dictionary<string, object>>();
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("select Distinct DNAME, DISTRICT from campus_staar_2015 order by DNAME", connection);
                var reader = command.ExecuteReader();
                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        all_districts.Add(new Dictionary<string, object>() { { "DNAME", reader["DNAME"] }, { "DISTRICT", reader["DISTRICT"] } });
                    }
                }
                connection.Close();
            }
            return all_districts;
        }

        public List<Dictionary<string, object>> ActExpData(ActExpQuery model)
        {
            List<Dictionary<string, object>> all_models = new List<Dictionary<string, object>>();
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("select cs.DNAME,cs.Subject, cs.Grade, cs.CAMPUS, cs.CNAME, cs." + model.yColumn + ", cd." + model.xColumn + ", cs.d from  campus_staar_2015 as cs"
                    + " join CSTUD_2015 as cd on cs.CAMPUS = cd.CAMPUS"
                    + " where cs.DNAME like @district AND cs.demo like @demo AND cs.d > 19", connection);
                command.Parameters.AddWithValue("district", model.CurrentDistrict);
                command.Parameters.AddWithValue("demo", model.Demo);
                SqlDataReader reader = command.ExecuteReader();
                all_models = reader.GetAllRecords();
                connection.Close();
            }

            return all_models;
        }

        public List<Dictionary<string, object>> ActExpAllData(ActExpQuery model)
        {
            List<Dictionary<string, object>> all_models = new List<Dictionary<string, object>>();
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                string query = "select cs.DNAME, cs.CAMPUS, cs.CNAME, cs." + model.yColumn + ", cd." + model.xColumn + " from  campus_staar_2015 as cs join CSTUD_2015 as cd on cs.CAMPUS = cd.CAMPUS"
                    + " where cs.Subject like @subject AND cs.Grade like @grade AND cs.demo like @demo AND cs.DNAME IN (@districts) AND cs.d > 19";

                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("subject", model.Subject);
                command.Parameters.AddWithValue("grade", model.Grade);
                command.Parameters.AddWithValue("demo", model.Demo);
                command.AddArrayParameters(model.Districts, "districts");
                SqlDataReader reader = command.ExecuteReader();
                all_models = reader.GetAllRecords();
                connection.Close();
            }

            return all_models;
        }

        private Tuple<double, double> SlopeIntersect(IEnumerable<Tuple<double, double, string, string>> source)
        {
            int numPoints = 0;
            double sumX = 0;
            double sumY = 0;
            double sumXX = 0;
            double sumXY = 0;

            foreach (Tuple<double, double, string, string> tuple in source)
            {
                numPoints++;
                sumX += tuple.Item1;
                sumY += tuple.Item2;
                sumXX += tuple.Item1 * tuple.Item1;
                sumXY += tuple.Item1 * tuple.Item2;
            }
            double b, m;
            if (numPoints < 2)
            {
                b = 0;
                m = sumY / sumX;
            }
            else
            {
                b = (-sumX * sumXY + sumXX * sumY) / (numPoints * sumXX - sumX * sumX);
                m = (-sumX * sumY + numPoints * sumXY) / (numPoints * sumXX - sumX * sumX);
            }
            return new Tuple<double, double>(m, b);
        }

        [HttpPost]
        public Dictionary<string, object> ActExpSlopeIntersect(ActExpQuery actExpQuery)
        {
            Dictionary<string, object> returnData = new Dictionary<string, object>();
            List<Tuple<double, double, string, string>> allData = new List<Tuple<double, double, string, string>>();
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("select cs." + actExpQuery.yColumn + ", cs.Subject, cs.Grade, cd." + actExpQuery.xColumn + " from  campus_staar_2015 as cs"
                + " join CSTUD_2015 as cd on cs.CAMPUS = cd.CAMPUS"
                + " where cs.demo like @demo AND cs.DNAME IN (@districts) AND cs.d > 19", connection);
                command.Parameters.AddWithValue("demo", actExpQuery.Demo);
                command.AddArrayParameters(actExpQuery.Districts, "districts");
                var reader = command.ExecuteReader();
                if (reader.HasRows)
                    while (reader.Read())
                    {
                        if(reader[actExpQuery.xColumn] != DBNull.Value)
                        {
                            Tuple<double, double, string, string> data = new Tuple<double, double, string, string>(((double)reader[actExpQuery.xColumn]) / 100, (double)reader[actExpQuery.yColumn], reader["Subject"].ToString(), reader["Grade"].ToString());
                            allData.Add(data);
                        }
                    }
                connection.Close();
            }

            IEnumerable<IGrouping<string, Tuple<double, double, string, string>>> dataGroups = allData.GroupBy(d => d.Item3 + "__" + d.Item4);
            foreach (IGrouping<string, Tuple<double, double, string, string>> group in dataGroups)
            {

                Tuple<double, double> slopeIntersect = SlopeIntersect(group);
                returnData.Add(group.Key, new { Slope = slopeIntersect.Item1, Intersect = slopeIntersect.Item2 });
            }
            return returnData;
        }

        #endregion

        //public string connectionString = ConfigurationManager.ConnectionStrings["commit_data"].ConnectionString;

        //public List<string> GetDistricts()
        //{
        //    List<string> all_districts = new List<string>();
        //    using (SqlConnection connection = new SqlConnection(connectionString))
        //    {
        //        connection.Open();
        //        SqlCommand command = new SqlCommand("SELECT district FROM dbo.actexp_es UNION SELECT district FROM dbo.actexp_ms UNION SELECT district FROM dbo.actexp_hs", connection);
        //        var reader = command.ExecuteReader();
        //        if (reader.HasRows)
        //        {
        //            while (reader.Read())
        //            {
        //                all_districts.Add(reader["district"].ToString());
        //            }
        //        }
        //        connection.Close();
        //    }
        //    return all_districts;
        //}

        //public List<string> GetFeeders(string district)
        //{
        //    List<string> all_feeders = new List<string>();
        //    using (SqlConnection connection = new SqlConnection(connectionString))
        //    {
        //        connection.Open();
        //        SqlCommand command = new SqlCommand("SELECT Feeder_Pattern FROM dbo.actexp_es WHERE district like @district UNION SELECT district FROM dbo.actexp_ms WHERE district like @district", connection);
        //        command.Parameters.AddWithValue("district", district);
        //        var reader = command.ExecuteReader();
        //        if (reader.HasRows)
        //        {
        //            while (reader.Read())
        //            {
        //                all_feeders.Add(reader["Feeder_Pattern"].ToString());
        //            }
        //        }
        //        connection.Close();
        //    }
        //    return all_feeders;
        //}


        //private List<Dictionary<string, object>> GetSchoolsFromTable(string tableName, string district, string feeder = null)
        //{
        //    List<Dictionary<string, object>> all_models = new List<Dictionary<string, object>>();
        //    using (SqlConnection connection = new SqlConnection(connectionString))
        //    {
        //        connection.Open();
        //        SqlCommand command;
        //        if (feeder != null)
        //        {
        //            command = new SqlCommand("SELECT * FROM " + tableName + " WHERE [district] like @district AND [Feeder_Pattern] like @feeder", connection);
        //            command.Parameters.AddWithValue("district", district);
        //            if (feeder == "Not Applicable")
        //            {
        //                command.Parameters.AddWithValue("feeder", DBNull.Value);
        //            }
        //            else
        //            {
        //                command.Parameters.AddWithValue("feeder", feeder);
        //            }
        //        }
        //        else
        //        {
        //            command = new SqlCommand("SELECT * FROM " + tableName + " WHERE [district] like @district", connection);
        //            command.Parameters.AddWithValue("district", district);
        //        }
        //        var reader = command.ExecuteReader();

        //        List<string> fields = new List<string>();
        //        for (var f = 0; f < reader.FieldCount; f++)
        //        {
        //            fields.Add(reader.GetName(f));
        //        }

        //        if (reader.HasRows)
        //            while (reader.Read())
        //            {
        //                Dictionary<string, object> models = new Dictionary<string, object>();
        //                for (int f = 0; f < fields.Count; f++)
        //                {
        //                    models.Add(fields[f], reader[fields[f]]);
        //                }
        //                all_models.Add(models);
        //            }
        //        connection.Close();
        //    }
        //    return all_models;
        //}


        //public Dictionary<string, object> GetSchools(string district, string feeder)
        //{
        //    feeder = feeder == "All" ? null : feeder;
        //    Dictionary<string, object> all_models = new Dictionary<string, object>();
        //    all_models.Add("es", GetSchoolsFromTable("actexp_es", district, feeder));
        //    all_models.Add("ms", GetSchoolsFromTable("actexp_ms", district, feeder));
        //    all_models.Add("hs", GetSchoolsFromTable("actexp_hs", district));
        //    return all_models;
        //}


        //public List<Dictionary<string, object>> GetSchoolsBySubject(string district, string column, string table)
        //{
        //    List<Dictionary<string, object>> all_models = new List<Dictionary<string, object>>();
        //    using (SqlConnection connection = new SqlConnection(connectionString))
        //    {
        //        connection.Open();
        //        SqlCommand command;

        //        command = new SqlCommand("SELECT CAMPUS, CNAME, " + column + " FROM " + table + " WHERE [district] like @district", connection);
        //        command.Parameters.AddWithValue("district", district);

        //        var reader = command.ExecuteReader();

        //        List<string> fields = new List<string>();
        //        for (var f = 0; f < reader.FieldCount; f++)
        //        {
        //            fields.Add(reader.GetName(f));
        //        }

        //        if (reader.HasRows)
        //            while (reader.Read())
        //            {
        //                Dictionary<string, object> models = new Dictionary<string, object>();
        //                for (int f = 0; f < fields.Count; f++)
        //                {
        //                    models.Add(fields[f], reader[fields[f]]);
        //                }
        //                all_models.Add(models);
        //            }
        //        connection.Close();
        //    }
        //    return all_models;
        //}

        

    }
}
