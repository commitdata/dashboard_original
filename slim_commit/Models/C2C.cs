using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace slim_commit.Models
{
    /// <summary>
    /// C2C
    /// </summary>
    public class C2C
    {
        /// <summary>
        /// Primary Key
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// CAMPUS
        /// </summary>
        public string Campus { get; set; }

        /// <summary>
        /// CAD_GAP
        /// </summary>
        public string CadGap { get; set; }

        /// <summary>
        /// CAD_MATH
        /// </summary>
        public string CadMath { get; set; }

        /// <summary>
        /// CAD_POST
        /// </summary>
        public string CadPost { get; set; }

        /// <summary>
        /// CAD_PROGRESS
        /// </summary>
        public string CadProgress { get; set; }

        /// <summary>
        /// CAD_READ
        /// </summary>
        public string CadRead { get; set; }

        /// <summary>
        /// CAD_SCIE 
        /// </summary>
        public string CadScie { get; set; }

        /// <summary>
        /// CAD_SOCI
        /// </summary>
        public string CadSoci { get; set; }

        /// <summary>
        /// CAMPNAME
        /// </summary>
        public string CampusName { get; set; }

        /// <summary>
        /// CFLALTED
        /// </summary>
        public string Cflalted { get; set; }

        /// <summary>
        /// CFLCHART
        /// </summary>
        public string Cflchart { get; set; }

        /// <summary>
        /// CNTYNAME
        /// </summary>
        public string CountyName { get; set; }

        /// <summary>
        /// COUNTY
        /// </summary>
        public string County { get; set; }

        /// <summary>
        /// C_RATING
        /// </summary>
        public string CRating { get; set; }

        /// <summary>
        /// DISTNAME
        /// </summary>
        public string DistrictName { get; set; }

        /// <summary>
        /// DISTRICT
        /// </summary>
        public string District { get; set; }

        /// <summary>
        /// GRDSPAN
        /// </summary>
        public string Grdspan { get; set; }

        /// <summary>
        /// GRDTYPE
        /// </summary>
        public string Grdtype { get; set; }

        /// <summary>
        /// PAIRCAMP
        /// </summary>
        public string Paircamp { get; set; }

        /// <summary>
        /// PAIRNAME
        /// </summary>
        public string Pairname { get; set; }

        /// <summary>
        /// REGION
        /// </summary>
        public string Region { get; set; }

        /// <summary>
        /// constructor
        /// </summary>
        /// <param name="dataRecord"></param>
        public C2C(IDataRecord dataRecord)
        {
            this.Id = int.Parse(dataRecord["Id"].ToString());
            this.Campus = dataRecord["CAMPUS"].ToString().Replace("'", string.Empty);
            this.CadGap = dataRecord["CAD_GAP"].ToString();
            this.CadMath = dataRecord["CAD_MATH"].ToString();
            this.CadPost = dataRecord["CAD_POST"].ToString();
            this.CadProgress = dataRecord["CAD_PROGRESS"].ToString();
            this.CadRead = dataRecord["CAD_READ"].ToString();
            this.CadScie = dataRecord["CAD_SCIE"].ToString();
            this.CadSoci = dataRecord["CAD_SOCI"].ToString();
            this.CampusName = dataRecord["CAMPNAME"].ToString();
            this.Cflalted = dataRecord["CFLALTED"].ToString();
            this.Cflchart = dataRecord["CFLCHART"].ToString();
            this.CountyName = dataRecord["CNTYNAME"].ToString();
            this.County = dataRecord["COUNTY"].ToString();
            this.CRating = dataRecord["C_RATING"].ToString();
            this.DistrictName = dataRecord["DISTNAME"].ToString();
            this.District = dataRecord["DISTRICT"].ToString();
            this.Grdspan = dataRecord["GRDSPAN"].ToString();
            this.Grdtype = dataRecord["GRDTYPE"].ToString();
            this.Paircamp = dataRecord["PAIRCAMP"].ToString();
            this.Pairname = dataRecord["PAIRNAME"].ToString();
            this.Region = dataRecord["REGION"].ToString();
        }
    }
}