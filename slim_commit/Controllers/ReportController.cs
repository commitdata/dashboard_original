using slim_commit.Extensions;
using slim_commit.Helpers;
using slim_commit.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;

namespace slim_commit.Controllers
{
    public class ReportController : ApiController
    {
        private string GetConnection(int year)
        {
            return ConfigurationManager.ConnectionStrings["tapr_" + year].ConnectionString;
        }

        public string GetExcelSheet(int year)
        {
            DataTable dt = new DataTable();
            using (SqlConnection connection = new SqlConnection(GetConnection(year)))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("select distinct CNTYNAME, CAMPNAME, GRDSPAN from CREF$ order by CNTYNAME", connection);
                SqlDataReader reader = command.ExecuteReader();
                dt.Load(reader);
                connection.Close();
            }
            dt.TableName = "Table1Name";
            var fileName = getFileName();
            ExcelExportHelper.GenerteExcel(dt, getHeaderMapping(), Path.GetTempPath() + fileName);
            return fileName;

        }


        public string ExportFilterData(CampusFilter campusFilter)
        {
            DataTable dt = new DataTable();
            string currentConnection = ConfigurationManager.ConnectionStrings["staar"].ConnectionString;
            using (SqlConnection connection = new SqlConnection(currentConnection))
            {
                string query = getFilterQuery(campusFilter);
                connection.Open();
                SqlCommand command = new SqlCommand(query, connection);
                command.AddArrayParameters(campusFilter.District, "district");
                command.AddArrayParameters(campusFilter.Demographic, "demo");
                command.AddArrayParameters(campusFilter.Campus, "campus");
                command.AddArrayParameters(campusFilter.Year, "year");

                SqlDataReader reader = command.ExecuteReader();
                dt.Load(reader);
                connection.Close();
            }

            dt.TableName = "Table1Name";
            var fileName = getFileName();
            ExcelExportHelper.GenerteExcel(dt, getHeaderMapping(), Path.GetTempPath() + fileName);
            return fileName;

        }


        [System.Web.Http.HttpGet]
        public List<Dictionary<string, object>> GetDistricts()
        {
            List<Dictionary<string, object>> districts;
            string currentConnection = ConfigurationManager.ConnectionStrings["staar"].ConnectionString;
            using (SqlConnection connection = new SqlConnection(currentConnection))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("select DISTINCT DISTRICT,DNAME from [dbo].[campusShortDetail] WHERE DISTRICT <> '' ORDER BY DNAME ", connection);
                SqlDataReader reader = command.ExecuteReader();
                districts = reader.GetAllRecords();
                connection.Close();
            }

            return districts;
        }

        public List<Dictionary<string, object>> GetCampus(string district)
        {
            List<Dictionary<string, object>> campus;
            string query = string.Empty;
            string currentConnection = ConfigurationManager.ConnectionStrings["staar"].ConnectionString;
            using (SqlConnection connection = new SqlConnection(currentConnection))
            {
                connection.Open();
                if (district == "All")
                {
                    query = "select DISTINCT CAMPUS,CNAME,DNAME from [dbo].[campusShortDetail] WHERE CAMPUS <> '' ORDER BY CAMPUS,CNAME";
                }
                else
                {
                    query = "select DISTINCT CAMPUS,CNAME,DNAME from [dbo].[campusShortDetail] WHERE DISTRICT = @district  AND CAMPUS <> '' ORDER BY CAMPUS,CNAME";
                }
                SqlCommand command = new SqlCommand(query, connection);
                if (district != "All")
                    command.Parameters.AddWithValue("district", district);
                SqlDataReader reader = command.ExecuteReader();
                campus = reader.GetAllRecords();
                connection.Close();
            }

            return campus;
        }
        [HttpPost]
        public List<Dictionary<string, object>> GetCampusReport(CampusFilter campusFilter)
        {
            List<Dictionary<string, object>> campusResult;
            string currentConnection = ConfigurationManager.ConnectionStrings["staar"].ConnectionString;
            using (SqlConnection connection = new SqlConnection(currentConnection))
            {
                string query = getFilterQuery(campusFilter);
                connection.Open();
                SqlCommand command = new SqlCommand(query, connection);
                command.AddArrayParameters(campusFilter.District, "district");
                command.AddArrayParameters(campusFilter.Demographic, "demo");
                command.AddArrayParameters(campusFilter.Campus, "campus");
                command.AddArrayParameters(campusFilter.Year, "year");

                SqlDataReader reader = command.ExecuteReader();
                campusResult = reader.GetAllRecords();
                connection.Close();
            }

            return campusResult;
        }


        private string getFilterQuery(CampusFilter campusFilter)
        {
            bool first = true;
            string separator = ",";
            string subjectGrades = string.Empty;
            string level = string.Empty;
            if (campusFilter.District.Contains("All"))
            {
                campusFilter.District = new string[] { };
            }
            if (campusFilter.Level.Length > 0)
            {
                level = string.Join(",", campusFilter.Level);
                level = separator + level;
            }

            if (campusFilter.Grades.Length > 0)
            {
                subjectGrades = " AND (";

                foreach (var item in campusFilter.Grades)
                {
                    if (!first)
                    {
                        subjectGrades = subjectGrades + " OR ";
                    }
                    subjectGrades = subjectGrades + " ( " + " SUBJECT = " + "'" + item.Subject + "'" + " AND GRADE = " + "'" + item.Grade + "'" + " ) ";
                    first = false;
                }
                subjectGrades = subjectGrades + " ) ";
            }

            string query = "SELECT DNAME,CNAME,YEAR, DEMO, SUBJECT, GRADE, LANGUAGE " + level + " FROM [dbo].[staar_campus]  WHERE DISTRICT IN (@district) AND CAMPUS IN (@campus) AND YEAR IN (@year) AND DEMO IN (@demo) " + subjectGrades;

            return query;
        }


        public bool addAnalyticsData(AnalyticsData analyticsData)
        {
            string currentConnection = ConfigurationManager.ConnectionStrings["commit"].ConnectionString;
            using (SqlConnection connection = new SqlConnection(currentConnection))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("INSERT INTO ReportMasterAnalytics([Date]) VALUES(@currentDate);SELECT SCOPE_IDENTITY();", connection);
                command.Parameters.AddWithValue("currentDate", DateTime.Now);
                var rowId = command.ExecuteScalar();

                var query = string.Empty;
                if (analyticsData.District.Length > 0)
                {
                    foreach (var item in analyticsData.District)
                    {
                        query = query + "INSERT INTO ReportDistrictAnalytics([MasterId],DISTRICT,DNAME) VALUES(" + rowId + ",'" + item.District + "','" + item.DName + "');";
                    }
                }
                if (analyticsData.Campus.Length > 0)
                {
                    foreach (var item in analyticsData.Campus)
                    {
                        query = query + "INSERT INTO ReportCampusAnalytics([MasterId],CAMPUS,CNAME) VALUES(" + rowId + ",''" + item.Campus + "','" + item.CName + "');";
                    }
                }
                if (analyticsData.Demographic.Length > 0)
                {
                    foreach (var item in analyticsData.Campus)
                    {
                        query = query + "INSERT INTO ReportDemoAnalytics([MasterId],DEMO) VALUES(" + rowId + ",'" + item + "');";
                    }
                }
                if (analyticsData.Grades.Length > 0)
                {
                    foreach (var item in analyticsData.Grades)
                    {
                        query = query + "INSERT INTO ReportSubjectGradeAnalytics([MasterId],SUBJECT,GRADE) VALUES(" + rowId + ",'" + item.Subject + "','" + item.Grade + "');";
                    }
                }
                if (analyticsData.Year.Length > 0)
                {
                    foreach (var item in analyticsData.Year)
                    {
                        query = query + "INSERT INTO ReportYearAnalytics([MasterId],YEAR) VALUES(" + rowId + ",'" + item + "');";
                    }
                }
                if (analyticsData.Level.Length > 0)
                {
                    foreach (var item in analyticsData.Level)
                    {
                        query = query + "INSERT INTO ReportLevelAnalytics([MasterId],Level) VALUES(" + rowId + ",'" + item + "');";
                    }
                }
                command = new SqlCommand(query, connection);
                command.ExecuteNonQuery();

                connection.Close();
            }

            return true;
        }


        [System.Web.Http.HttpGet]
        public HttpResponseMessage DownloadShapeFile(string fileName)
        {
            string filepath = Path.GetTempPath() + (fileName);
            HttpResponseMessage result = new HttpResponseMessage(HttpStatusCode.OK);
            var stream = new FileStream(@filepath, FileMode.Open);
            result.Content = new StreamContent(stream);
            result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
            result.Content.Headers.ContentDisposition.FileName = Path.GetFileName(@filepath);
            result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
            result.Content.Headers.ContentLength = stream.Length;

            return result;
        }

        private Dictionary<string, string> getHeaderMapping()
        {

            var headerDictionary = new Dictionary<string, string>();
            headerDictionary.Add("CAMPUS", "Campus ID");
            headerDictionary.Add("CAMPNAME", "Campus Name");
            headerDictionary.Add("DISTNAME", "District Name ");
            headerDictionary.Add("GRDSPAN", "Grade Span");
            headerDictionary.Add("CNTYNAME", "Country Name");
            headerDictionary.Add("COUNTY", "County ID");

            headerDictionary.Add("DNAME", "District");
            headerDictionary.Add("CNAME", "Campus");
            headerDictionary.Add("YEAR", "Year");
            headerDictionary.Add("DEMO", "Demo");
            headerDictionary.Add("SUBJECT", "Subject");
            headerDictionary.Add("GRADE", "Grade");
            headerDictionary.Add("LANGUAGE", "Language");
            headerDictionary.Add("satis_ph1_nm", "Phase-In 1");
            headerDictionary.Add("satis_rec_nm", "Postsecondary Readiness Standard");

            return headerDictionary;
        }


        private string getFileName()
        {
            string filename = "data_export_" + Guid.NewGuid() + ".xlsx";
            return filename;
        }

    }
}


