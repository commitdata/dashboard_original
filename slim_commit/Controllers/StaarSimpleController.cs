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
    public class StaarSimpleController : ApiController
    {
        private string connectionString = ConfigurationManager.ConnectionStrings["commit_data"].ConnectionString;

        public object GetCampusData([FromUri]string[] campus)
        {
            List<Dictionary<string, object>> all_models = new List<Dictionary<string, object>>();
            string[] fixedFields = new string[] { "CAMPUS", "CNAME", "CampusId", "Category", "DISTRICT", "DNAME", "Grade", "Language", "REGION", "Subject", "YEAR", "id" };
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

                SqlCommand command = new SqlCommand(string.Format("select * FROM campus_data where CAMPUS like @campcode AND CAMPUS IN (@campus)"), connection);
                command.Parameters.AddWithValue("@campcode", "'057%");
                command.AddArrayParameters(campus, "campus");
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
                            Dictionary<string, object> models = new Dictionary<string, object>();
                            Dictionary<string, string> innerModel = new Dictionary<string, string>();
                            for (int f = 0; f < fields.Count; f++)
                            {
                                if (fixedFields.Contains(fields[f]))
                                {
                                    models.Add(fields[f], reader[fields[f]]);
                                }
                                else
                                {
                                    innerModel.Add(fields[f], reader[fields[f]].ToString());

                                }
                            }

                            models.Add("demographic", innerModel);
                            all_models.Add(models);
                        }
                        catch { }
                    }
                reader.Close();
            }
            return all_models;
        }

        public List<object> GetCampusList()
        {
            List<object> campusList = new List<object>();

            using (SqlConnection connection = new SqlConnection(connectionString))
            {

                connection.Open();

                SqlCommand command = new SqlCommand("select CAMPUS,CAMPNAME FROM campus_reference where CAMPUS like @campus", connection);
                command.Parameters.AddWithValue("@campus", "'057%");
                var reader = command.ExecuteReader();
                if (reader.HasRows)
                    while (reader.Read())
                    {
                        try
                        {
                            object item = new { campus = reader["CAMPUS"], campname = reader["CAMPNAME"] };
                            campusList.Add(item);
                        }
                        catch { }
                    }
                reader.Close();
                connection.Close();
            }
            return campusList;
        }
    }




    public static class SqlCommandExt
    {
        /// <summary>
        /// This will add an array of parameters to a SqlCommand. This is used for an IN statement.
        /// Use the returned value for the IN part of your SQL call. (i.e. SELECT * FROM table WHERE field IN ({paramNameRoot}))
        /// </summary>
        /// <param name="cmd">The SqlCommand object to add parameters to.</param>
        /// <param name="values">The array of strings that need to be added as parameters.</param>
        /// <param name="paramNameRoot">What the parameter should be named followed by a unique value for each value. This value surrounded by {} in the CommandText will be replaced.</param>
        /// <param name="start">The beginning number to append to the end of paramNameRoot for each value.</param>
        /// <param name="separator">The string that separates the parameter names in the sql command.</param>
        public static SqlParameter[] AddArrayParameters<T>(this SqlCommand cmd, IEnumerable<T> values, string paramNameRoot, int start = 1, string separator = ", ")
        {
            /* An array cannot be simply added as a parameter to a SqlCommand so we need to loop through things and add it manually. 
             * Each item in the array will end up being it's own SqlParameter so the return value for this must be used as part of the
             * IN statement in the CommandText.
             */
            var parameters = new List<SqlParameter>();
            var parameterNames = new List<string>();
            var paramNbr = start;

            if (values.Count() == 0)
            {
                cmd.CommandText = cmd.CommandText.Replace("IN (@" + paramNameRoot + ")", "like '%'");
                return parameters.ToArray();
            }

            foreach (var value in values)
            {
                var paramName = string.Format("@{0}{1}", paramNameRoot, paramNbr++);
                parameterNames.Add(paramName);
                parameters.Add(cmd.Parameters.AddWithValue(paramName, value));
            }

            cmd.CommandText = cmd.CommandText.Replace("@" + paramNameRoot, string.Join(separator, parameterNames));

            return parameters.ToArray();
        }
    }
}
