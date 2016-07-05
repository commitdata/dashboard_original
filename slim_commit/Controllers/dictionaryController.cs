using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.Sql;
using System.Data.SqlClient;
using Microsoft.SqlServer.Server;
using System.Configuration;

namespace slim_commit.Controllers
{
    public class dictionaryController : ApiController
    {
        public string connectionString = ConfigurationManager.ConnectionStrings["commit_data"].ConnectionString;

        public List<Dictionary<string, string>> Get(string selectedTable,string selectedYear)
        {
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

                SqlCommand command = new SqlCommand("SELECT * FROM dbo.AEIS_Dictionary WHERE [Table]= '" + selectedTable + "' And [Year]="+selectedYear, connection);

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

        [HttpGet]
        public HttpResponseMessage ListYears()
        {
            List<string> all_models = new List<string>();

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

                SqlCommand command = new SqlCommand("SELECT distinct YEAR FROM dbo.AEIS_Dictionary order by YEAR desc", connection);

                var reader = command.ExecuteReader();

              

                if (reader.HasRows)
                    while (reader.Read())
                    {
                        try
                        {

                            string year = reader[0].ToString();

                            all_models.Add(year);

                        }
                        catch { }
                    }

                connection.Close();
            }

           return Request.CreateResponse(HttpStatusCode.OK, all_models);
        }

        [HttpGet]
        public HttpResponseMessage ListTables(string year)
        {
            if(string.IsNullOrWhiteSpace(year))
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "year is required");
            }
            List<string> all_models = new List<string>();

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

                SqlCommand command = new SqlCommand("SELECT distinct [TABLE] FROM dbo.AEIS_Dictionary where YEAR=" + year + " order by [table] asc", connection);
                var reader = command.ExecuteReader();
                
                if (reader.HasRows)
                    while (reader.Read())
                    {
                        try
                        {

                            string table = reader[0].ToString();

                            all_models.Add(table);

                        }
                        catch { }
                    }

                connection.Close();
            }
            return Request.CreateResponse(HttpStatusCode.OK, all_models);
        }

        [HttpGet]
        public HttpResponseMessage ListTables2(string year)
        { 
            List<string> all_models = new List<string> { "ASFD", "Asdf", "DFGHdfgh" };

            
            return Request.CreateResponse(HttpStatusCode.OK, all_models);
        }



        [HttpGet]
        public List<Dictionary<string, string>> GetAll()
        {
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

                SqlCommand command = new SqlCommand("SELECT * FROM dbo.AEIS_Dictionary", connection);

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
