using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace slim_commit.Models
{
    public class CampStaar
    {

        public int id { get; set; }
        public string Subject { get; set; }
        public string CAMPUS { get; set; }
        public string Grade { get; set; }
        public double rec_all { get; set; }
        public double ph1_all { get; set; }
        //public double rec_aa { get; set; }
        //public double ph1_aa { get; set; }
        //public double rec_hisp { get; set; }
        //public double ph1_hisp { get; set; }
        //public double rec_white { get; set; }
        //public double ph1_white { get; set; }

        public CampStaar(IDataRecord dataRecord)
        {

            this.id = int.Parse(dataRecord["id"].ToString());

            this.Subject = dataRecord["Subject"].ToString();
            this.CAMPUS = dataRecord["CAMPUS"].ToString().Replace("'", string.Empty);
            this.Grade = dataRecord["Grade"].ToString();

            this.rec_all = Convert.ToDouble(dataRecord["rec-all"]);
            this.ph1_all = Convert.ToDouble(dataRecord["ph1-all"]);
            //this.rec_aa = Convert.ToDouble(dataRecord["rec-aa"]);
            //this.ph1_aa = Convert.ToDouble(dataRecord["ph1-aa"]);
            //this.rec_hisp = Convert.ToDouble(dataRecord["rec-hisp"]);
            //this.ph1_hisp = Convert.ToDouble(dataRecord["ph1-hisp"]);
            //this.rec_white = Convert.ToDouble(dataRecord["rec-white"]);
            //this.ph1_white = Convert.ToDouble(dataRecord["ph1-white"]);
         }
       
    }
}