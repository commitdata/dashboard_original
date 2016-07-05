using slim_commit.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace slim_commit.Controllers
{
    public class StaarController : ApiController
    {
        private string connectionString = ConfigurationManager.ConnectionStrings["commit_data"].ConnectionString;
        //private string campusConnectionString = ConfigurationManager.ConnectionStrings["commit_pages"].ConnectionString;


        public List<DistrictStaar> FilterDistrictStaarData(StaarQuery staarQuery)
        {
            List<DistrictStaar> staars = new List<DistrictStaar>();
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                SqlCommand command = new SqlCommand(string.Format("select * FROM district_staar where District IN (@district) AND demo IN (@demo) AND Year IN (@year) AND Subject IN (@subject) AND Grade IN (@grade)"), connection);
                command.AddArrayParameters(staarQuery.Districts, "district");
                command.AddArrayParameters(staarQuery.Demographies, "demo");
                command.AddArrayParameters(staarQuery.Grades, "grade");
                command.AddArrayParameters(staarQuery.Subjects, "subject");
                command.AddArrayParameters(staarQuery.Years, "year");
                var reader = command.ExecuteReader();
                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        try
                        {
                            staars.Add(new DistrictStaar(reader));
                        }
                        catch { }
                    }
                }
            }
            return staars;
        }

        public List<CampusStaar> FilterCampusStaarData(StaarQuery staarQuery)
        {
            List<CampusStaar> staars = new List<CampusStaar>();
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                SqlCommand command = new SqlCommand(string.Format("select * FROM campus_staar_clean where Campus IN (@campus) AND demo IN (@demo) AND Year IN (@year) AND Subject IN (@subject) AND Grade IN (@grade)"), connection);
                command.AddArrayParameters(staarQuery.Campuses, "campus");
                command.AddArrayParameters(staarQuery.Demographies, "demo");
                command.AddArrayParameters(staarQuery.Grades, "grade");
                command.AddArrayParameters(staarQuery.Subjects, "subject");
                command.AddArrayParameters(staarQuery.Years, "year");
                var reader = command.ExecuteReader();
                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        try
                        {
                            staars.Add(new CampusStaar(reader));
                        }
                        catch { }
                    }
                }
            }
            return staars;
        }

    }
}