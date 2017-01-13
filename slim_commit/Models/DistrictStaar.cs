using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace slim_commit.Models
{
    public class DistrictStaar
    {
        public int Id { get; set; }
        public string District { get; set; }
        public int Year { get; set; }
        public string Subject { get; set; }
        public string Grade { get; set; }
        public string Language { get; set; }
        public string Category { get; set; }
        public string demo { get; set; }
        public string all_tested { get; set; }
        public string satis_rec_nm { get; set; }
        public string satis_ph1_nm { get; set; }


        public DistrictStaar(IDataRecord dataRecord)
        {
            this.Id = int.Parse(dataRecord["Id"].ToString());
            this.Year = int.Parse(dataRecord["Year"].ToString());
            this.District = dataRecord["District"].ToString().Replace("'", string.Empty);
            this.Grade = dataRecord["Grade"].ToString();
            this.Language = dataRecord["Language"].ToString();
            this.Category = dataRecord["Category"].ToString();
            this.Subject = dataRecord["Subject"].ToString();
            this.demo = dataRecord["demo"].ToString();
            this.all_tested = dataRecord["all_tested"].ToString();
            this.satis_rec_nm = dataRecord["satis_rec_nm"].ToString();
            this.satis_ph1_nm = dataRecord["satis_ph1_nm"].ToString();
        }
    }

    public class KeyValueItem
    {
        public string Key { get; set; }
        public string Value { get; set; }
         
        public KeyValueItem()
        {

        }
    }
}