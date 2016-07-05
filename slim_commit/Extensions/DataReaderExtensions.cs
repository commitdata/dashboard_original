using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Web;

namespace slim_commit.Extensions
{
    public static class DataReaderExtensions
    {
        public static IEnumerable<T> GetEnumerator<T>(this IDataReader reader,
                                                Func<IDataRecord, T> generator)
        {
            while (reader.Read())
                yield return generator(reader);
        }


        public static List<Dictionary<string, object>> GetAllRecords(this DbDataReader reader)
        {
            List<Dictionary<string, object>> all_models = new List<Dictionary<string, object>>();
            List<string> fields = new List<string>();

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
                    all_models.Add(models);
                }
            }
            return all_models;
        }
    }
}