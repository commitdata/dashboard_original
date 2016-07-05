using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace slim_commit.Models
{
    public class CampusStaar
    {
        public int Id { get; set; }
        public string Campus { get; set; }
        public int Year { get; set; }
        public string Subject { get; set; }
        public string Grade { get; set; }
        public string Language { get; set; }
        public string Category { get; set; }
        public string Demo { get; set; }
        public string all_tested { get; set; }
        public string satis_rec_nm { get; set; }
        public string satis_ph1_nm { get; set; }
        public string percent_rec { get; set; }
        public string percent_ph1 { get; set; }

        public CampusStaar(IDataRecord dataRecord)
        {
            this.Id = int.Parse(dataRecord["Id"].ToString());
            this.Year = int.Parse(dataRecord["Year"].ToString());
            this.Campus = dataRecord["Campus"].ToString().Replace("'", string.Empty);
            this.Grade = dataRecord["Grade"].ToString();
            this.Language = dataRecord["Language"].ToString();
            this.Category = dataRecord["Category"].ToString();
            this.Subject = dataRecord["Subject"].ToString();
            this.Demo = dataRecord["Demo"].ToString();
            this.all_tested = dataRecord["all_tested"].ToString();
            this.satis_rec_nm = dataRecord["satis_rec_nm"].ToString();
            this.satis_ph1_nm = dataRecord["satis_ph1_nm"].ToString();
            this.percent_rec = dataRecord["percent_rec"].ToString();
            this.percent_ph1 = dataRecord["percent_ph1"].ToString();
        }
    }
}