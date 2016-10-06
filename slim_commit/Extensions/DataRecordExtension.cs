using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace slim_commit.Extensions
{
    /// <summary>
    /// Data Record Extension
    /// </summary>
    public static class DataRecordExtension
    {
        /// <summary>
        /// Get Default value of IDataRecord by fieldName
        /// </summary>
        /// <typeparam name="T">Generic Type</typeparam>
        /// <param name="row">IDataRecord object</param>
        /// <param name="fieldName">string field name</param>
        /// <returns>Generic type value</returns>
        public static T GetValueOrDefault<T>(this IDataRecord row, string fieldName)
        {
            int ordinal = row.GetOrdinal(fieldName);
            return row.GetValueOrDefault<T>(ordinal);
        }

        /// <summary>
        /// Get Default value of IDataRecord by ordinal
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="row"></param>
        /// <param name="ordinal"></param>
        /// <returns></returns>
        private static T GetValueOrDefault<T>(this IDataRecord row, int ordinal)
        {
            return (T)(row.IsDBNull(ordinal) ? default(T) : row.GetValue(ordinal));
        } 
    }
}