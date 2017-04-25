using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace slim_commit.Models
{
    public class Reporter2TaprRequestModel
    {
        public string[] TaprList { get; set; }
    }

    public class Reporter2TaprModel
    {
        public int Id { get; set; }
        public string Campus { get; set; }
        public string Attr { get; set; }
        public string Year { get; set; }
        public string Val { get; set; }

        /// <summary>
        /// Constructor implementation
        /// </summary>
        /// <param name="dataRecord"></param>
        public Reporter2TaprModel(IDataRecord dataRecord)
        {
            this.Id = Convert.ToInt32(dataRecord["Id"]);
            this.Campus = dataRecord["Campus"].ToString();
            this.Attr = dataRecord["Attr"].ToString();
            this.Year = dataRecord["Year"].ToString();
            this.Val = dataRecord["Val"].ToString();
        }
    }
}