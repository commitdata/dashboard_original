using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.Sql;
using System.Data.SqlClient;
using System.Configuration;

namespace slim_commit.Controllers
{
    public class teksController : ApiController
    {

        public string connectionString = ConfigurationManager.ConnectionStrings["commit_data"].ConnectionString;

        public List<Dictionary<string, string>> GetGrades(int subjectID, string categoryCode)
        {
            List<Dictionary<string, string>> all_models = new List<Dictionary<string, string>>();
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("SELECT * FROM dbo.grades  WHERE [Subject]=@subjectID AND [Category]=@categoryCode", connection);
                command.Parameters.AddWithValue("subjectID", subjectID);
                command.Parameters.AddWithValue("categoryCode", categoryCode);
                var reader = command.ExecuteReader();

                List<string> fields = new List<string>();
                for (var f = 0; f < reader.FieldCount; f++)
                {
                    fields.Add(reader.GetName(f));
                }

                if (reader.HasRows)
                    while (reader.Read())
                    {
                        Dictionary<string, string> models = new Dictionary<string, string>();
                        for (int f = 0; f < fields.Count; f++)
                        {
                            models.Add(fields[f], reader[fields[f]].ToString());
                        }
                        all_models.Add(models);
                    }
                connection.Close();
            }
            return all_models;
        }




        public IEnumerable<IGrouping<object, Dictionary<string, string>>> GetSubs(int subjectID, string categoryCode, int gradeID)
        {
            List<Dictionary<string, string>> all_models = new List<Dictionary<string, string>>();
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("select s.ItemId,s.SubId, i.Name as ItemName, s.Name as SubjectName  from subs as s join items as i on s.ItemId = i.ItemId AND s.Subject = i.Subject AND s.Category = i.Category AND s.GradeID = i.GradeID AND s.HeaderId = i.HeaderId where  s.Subject=@subjectID  AND s.Category=@categoryCode AND s.GradeID =@gradeID AND s.HeaderId = 2", connection);
                command.Parameters.AddWithValue("subjectID", subjectID);
                command.Parameters.AddWithValue("categoryCode", categoryCode);
                command.Parameters.AddWithValue("gradeID", gradeID);
                var reader = command.ExecuteReader();
                List<string> fields = new List<string>();
                for (var f = 0; f < reader.FieldCount; f++)
                {
                    fields.Add(reader.GetName(f));
                }
                if (reader.HasRows)
                    while (reader.Read())
                    {
                        Dictionary<string, string> models = new Dictionary<string, string>();
                        for (int f = 0; f < fields.Count; f++)
                        {
                            models.Add(fields[f], reader[fields[f]].ToString());
                        }
                        all_models.Add(models);
                    }
                connection.Close();
            }
            return all_models.GroupBy(m => m["ItemId"]);
        }

    }
}
