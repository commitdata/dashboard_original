using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.Sql;
using System.Data.SqlClient;
using slim_commit.Models;
using System.Configuration;

namespace slim_commit.Controllers
{
    public class aeisCurrentController : ApiController
    {

        public string connectionString = ConfigurationManager.ConnectionStrings["commit_aeis"].ConnectionString;

        public List<Dictionary<string, string>> Get(string table)
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

                SqlCommand command = new SqlCommand("SELECT * FROM dbo." + table, connection);

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

        public Dictionary<string, List<Dictionary<string, string>>> AeisTable(AeisQuery model)
        {
            Dictionary<string, List<Dictionary<string, string>>> returnModel = new Dictionary<string, List<Dictionary<string, string>>>();

            List<Dictionary<string, string>> all_models = new List<Dictionary<string, string>>();
            string fieldName = model.Table.StartsWith("C") ? "CAMPUS" : "DISTRICT";
            List<string> fields = new List<string>();

            using (SqlConnection connection = new SqlConnection(connectionString))
            {

                connection.Open();
                SqlCommand command = new SqlCommand(string.Format("SELECT * FROM dbo.{0} where {1} IN (@aeisItem)", model.Table, fieldName), connection);
                command.AddArrayParameters(model.AeisItems, "aeisItem");
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

            IEnumerable<IGrouping<string, Dictionary<string, string>>> groups = all_models.GroupBy(m => m[fieldName]);
            foreach (IGrouping<string, Dictionary<string, string>> group in groups)
            {
                returnModel.Add(group.Key, group.ToList());
            }

            return returnModel;
        }
    }
}
