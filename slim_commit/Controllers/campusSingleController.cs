using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.Sql;
using System.Data.SqlClient;
using slim_commit.Models;
using System.Data.Common;
using System.Data;
using slim_commit.cache;
using System.Configuration;

namespace slim_commit.Controllers
{
    public class campusSingleController : ApiController
    {

        public static string connectionString = ConfigurationManager.ConnectionStrings["commit_data"].ConnectionString;
        //private string staarConnectionString = ConfigurationManager.ConnectionStrings["commit_pages_two"].ConnectionString;
        public const string cacheKey = "CAMPUS_SINGLE";

        public List<Campus> Get()
        {
            List<Campus> campuses = CommitCache.Get<List<Campus>>(cacheKey, CampusFromDB);
            return campuses;
        }


        public Campus GetCampus(string campusID)
        {
            List<Campus> campuses = CommitCache.Get<List<Campus>>(cacheKey, CampusFromDB);
            Campus camous = campuses.FirstOrDefault(c => c.CAMPUS == campusID);
            return camous;
        }

        public List<Campus> GetCampuses(string district)
        {
            List<Campus> campuses = CommitCache.Get<List<Campus>>(cacheKey, CampusFromDB);
            if (district == null)
            {
                return campuses;
            }
            else
            {
                district = district.Replace("'", string.Empty);
                List<Campus> filtered = campuses.Where(c => c.DISTRICT == district).ToList();
                return filtered;
            }
        }


        public List<Campus> GetCampusesBySearchText(string searchText)
        {
            List<Campus> campuses = CommitCache.Get<List<Campus>>(cacheKey, CampusFromDB);
            if (searchText == null)
            {
                return campuses;
            }
            else
            {
                searchText = searchText.Replace("'", string.Empty);
                return campuses.Where(c => c.CAMPUS.Contains(searchText)).ToList();
            }
        }

        public List<Dictionary<string, object>> GetCounties()
        {
            List<Dictionary<string, object>> returnData = new List<Dictionary<string, object>>();
            List<Campus> campuses = CommitCache.Get<List<Campus>>(cacheKey, CampusFromDB);

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("select distinct COUNTY,CNTYNAME from campus", connection);
                SqlDataReader reader = command.ExecuteReader();
                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        Dictionary<string, object> obj = new Dictionary<string, object>();
                        obj.Add("COUNTY", reader["COUNTY"]);
                        obj.Add("CNTYNAME", reader["CNTYNAME"]);
                        returnData.Add(obj);
                    }
                }
                connection.Close();
            }
            return returnData;
        }

        public List<Dictionary<string, object>> GetDistricts(string county)
        {
            List<Dictionary<string, object>> returnData = new List<Dictionary<string, object>>();
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("select distinct DISTRICT,DISTNAME from campus where COUNTY like @county", connection);
                command.Parameters.AddWithValue("county", county);
                SqlDataReader reader = command.ExecuteReader();
                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        Dictionary<string, object> obj = new Dictionary<string, object>();
                        obj.Add("DISTRICT", reader["DISTRICT"]);
                        obj.Add("DISTNAME", reader["DISTNAME"]);
                        returnData.Add(obj);
                    }
                }
                connection.Close();
            }
            return returnData;
        }


        public Dictionary<string, object> GetCampStaar(string campusID)
        {
            Dictionary<string, object> returnData = new Dictionary<string, object>();
            List<CampStaar> staars = new List<CampStaar>();
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("SELECT * FROM dbo.campus_staar where CAMPUS like @campus", connection);
                command.Parameters.AddWithValue("campus", "'" + campusID.ToString());
                SqlDataReader reader = command.ExecuteReader();
                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        staars.Add(new CampStaar(reader));
                    }
                }
                staars.ForEach(s =>
                {
                    returnData.Add(s.Subject + s.Grade + "_rec", s.rec_all);
                    returnData.Add(s.Subject + s.Grade + "_ph1", s.ph1_all);
                });
                connection.Close();
            }
            return returnData;
        }


        public List<Dictionary<string, object>> GetCampStaarSub(string campusID, string table, string subject, string demo)
        {
            List<Dictionary<string, object>> returnData = new List<Dictionary<string, object>>();
            List<string> fields = new List<string>();
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("SELECT * FROM dbo.staar_subject_campus where [district] like @campus AND [table] like @table AND [subject] like @subject AND [demo] like @demo", connection);
                command.Parameters.AddWithValue("campus", "'" + campusID.ToString());
                command.Parameters.AddWithValue("table", table);
                command.Parameters.AddWithValue("subject", subject);
                command.Parameters.AddWithValue("demo", demo);
                using (SqlDataReader reader = command.ExecuteReader())
                {
                    for (var f = 0; f < reader.FieldCount; f++)
                    {
                        fields.Add(reader.GetName(f));
                    }
                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {
                            Dictionary<string, object> models = new Dictionary<string, object>();

                            for (int f = 0; f < fields.Count; f++)
                            {
                                models.Add(fields[f], reader[fields[f]]);
                            }
                            returnData.Add(models);
                        }
                    }
                    reader.Close();
                }

                command = new SqlCommand("SELECT * FROM dbo.staar_subject_district where [district] like @campus AND [table] like @table AND [subject] like @subject AND [demo] like @demo", connection);
                command.Parameters.AddWithValue("campus", "'" + campusID.Substring(0, 6));
                command.Parameters.AddWithValue("table", table);
                command.Parameters.AddWithValue("subject", subject);
                command.Parameters.AddWithValue("demo", demo);
                using (SqlDataReader reader = command.ExecuteReader())
                {
                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {
                            Dictionary<string, object> models = new Dictionary<string, object>();

                            for (int f = 0; f < fields.Count; f++)
                            {
                                models.Add(fields[f], reader[fields[f]]);
                            }
                            returnData.Add(models);
                        }
                    }
                    reader.Close();
                }
                command = new SqlCommand("SELECT * FROM dbo.staar_subject_state where [table] like @table AND [subject] like @subject AND [demo] like @demo", connection);
                command.Parameters.AddWithValue("table", table);
                command.Parameters.AddWithValue("subject", subject);
                command.Parameters.AddWithValue("demo", demo);
                using (SqlDataReader reader = command.ExecuteReader())
                {
                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {
                            Dictionary<string, object> models = new Dictionary<string, object>();

                            for (int f = 0; f < fields.Count; f++)
                            {
                                models.Add(fields[f], reader[fields[f]]);
                            }
                            returnData.Add(models);
                        }
                    }
                    reader.Close();
                }
                connection.Close();
            }
            return returnData;
        }

        public List<Dictionary<string, object>> GetCampStaarSubAll(string campusID)
        {
            List<Dictionary<string, object>> returnData = new List<Dictionary<string, object>>();
            List<string> fields = new List<string>();
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("SELECT * FROM dbo.staar_subject_campus where [district] like @campus", connection);
                command.Parameters.AddWithValue("campus", "'" + campusID.ToString());
                using (SqlDataReader reader = command.ExecuteReader())
                {
                    for (var f = 0; f < reader.FieldCount; f++)
                    {
                        fields.Add(reader.GetName(f));
                    }
                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {
                            Dictionary<string, object> models = new Dictionary<string, object>();

                            for (int f = 0; f < fields.Count; f++)
                            {
                                models.Add(fields[f], reader[fields[f]]);
                            }
                            returnData.Add(models);
                        }
                    }
                    reader.Close();
                }

                command = new SqlCommand("SELECT * FROM dbo.staar_subject_district where [district] like @campus", connection);
                command.Parameters.AddWithValue("campus", "'" + campusID.Substring(0, 6));
                using (SqlDataReader reader = command.ExecuteReader())
                {
                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {
                            Dictionary<string, object> models = new Dictionary<string, object>();

                            for (int f = 0; f < fields.Count; f++)
                            {
                                models.Add(fields[f], reader[fields[f]]);
                            }
                            returnData.Add(models);
                        }
                    }
                    reader.Close();
                }
                command = new SqlCommand("SELECT * FROM dbo.staar_subject_state", connection);
                using (SqlDataReader reader = command.ExecuteReader())
                {
                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {
                            Dictionary<string, object> models = new Dictionary<string, object>();

                            for (int f = 0; f < fields.Count; f++)
                            {
                                models.Add(fields[f], reader[fields[f]]);
                            }
                            returnData.Add(models);
                        }
                    }
                    reader.Close();
                }
                connection.Close();
            }
            return returnData;
        }



        internal static List<Campus> CampusFromDB()
        {
            List<Campus> campuses = new List<Campus>();

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("SELECT * FROM dbo.campus", connection);
                SqlDataReader reader = command.ExecuteReader();
                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        campuses.Add(new Campus(reader));
                    }
                }
                connection.Close();
            }
            return campuses;
        }
    }
}
