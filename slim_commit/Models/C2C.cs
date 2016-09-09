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


    /// <summary>
    /// C2C
    /// </summary>
    public class ReporterC2C
    {
        public int Id { get; set; }
        public string CNTYNAME { get; set; }
        public string DISTNAME { get; set; }
        public string CAMPUS { get; set; }
        public string CAMPNAME { get; set; }
        public string CFLALTED { get; set; }
        public string CFLCHART { get; set; }
        public string GRDSPAN { get; set; }
        public string GRDTYPE { get; set; }
        public string CPETALLC { get; set; }
        public string CPETBLAC { get; set; }
        public string CPETHISC { get; set; }
        public string CPETWHIC { get; set; }
        public string CPETECOC { get; set; }
        public string CPETLEPC { get; set; }
        public string CPETRSKC { get; set; }
        public string CPETBLAP { get; set; }
        public string CPETHISP { get; set; }
        public string CPETWHIP { get; set; }
        public string CPETECOP { get; set; }
        public string CPETLEPP { get; set; }
        public string CPETRSKP { get; set; }
        public string CPEMALLP { get; set; }
        public string CPETSPEP { get; set; }
        public string CPETGPKC { get; set; }
        public string Estimated_Eligible_1st_Graders { get; set; }
        public string CPETGPKP { get; set; }
        public string Num_Not_Enrolled { get; set; }
        public string attendance_rate { get; set; }
        public string Graduates { get; set; }
        public string percent_test_taking { get; set; }
        public string percent_above_criterion { get; set; }
        public string percent_college_ready { get; set; }
        public string number_not_college_ready { get; set; }
        public string percent_graduating_4_years { get; set; }
        public string three_r_d { get; set; }
        public string three_r_rec { get; set; }
        public string three_r_not_rec { get; set; }
        public string three_r_rec_rate { get; set; }
        public string four_m_d { get; set; }
        public string four_m_rec { get; set; }
        public string four_m_not_rec { get; set; }
        public string four_m_rec_rate { get; set; }
        public string eight_s_d { get; set; }
        public string eight_s_rec { get; set; }
        public string eight_s_not_rec { get; set; }
        public string eight_s_rec_rate { get; set; }
        public string a1_EOC_d { get; set; }
        public string a1_EOC_rec { get; set; }
        public string a1_EOC_not_rec { get; set; }
        public string a1_EOC_rec_rate { get; set; }
        /// <summary>
        /// constructor
        /// </summary>
        /// <param name="dataRecord"></param>
        public ReporterC2C(IDataRecord dataRecord)
        {
            this.Id = int.Parse(dataRecord["Id"].ToString());
            this.CNTYNAME = dataRecord["CNTYNAME"].ToString().Replace("'", string.Empty);
            this.DISTNAME = dataRecord["DISTNAME"].ToString();
            this.CAMPUS = dataRecord["CAMPUS"].ToString();
            this.CAMPNAME = dataRecord["CAMPNAME"].ToString();
            this.CFLALTED = dataRecord["CFLALTED"].ToString();
            this.CFLCHART = dataRecord["CFLCHART"].ToString();
            this.GRDSPAN = dataRecord["GRDSPAN"].ToString();
            this.GRDTYPE = dataRecord["GRDTYPE"].ToString();
            this.CPETALLC = dataRecord["CPETALLC"].ToString();
            this.CPETBLAC = dataRecord["CPETBLAC"].ToString();
            this.CPETHISC = dataRecord["CPETHISC"].ToString();
            this.CPETWHIC = dataRecord["CPETWHIC"].ToString();
            this.CPETECOC = dataRecord["CPETECOC"].ToString();
            this.CPETLEPC = dataRecord["CPETLEPC"].ToString();
            this.CPETRSKC = dataRecord["CPETRSKC"].ToString();
            this.CPETBLAP = dataRecord["CPETBLAP"].ToString();
            this.CPETHISP = dataRecord["CPETHISP"].ToString();
            this.CPETWHIP = dataRecord["CPETWHIP"].ToString();
            this.CPETECOP = dataRecord["CPETECOP"].ToString();
            this.CPETLEPP = dataRecord["CPETLEPP"].ToString();
            this.CPETRSKP = dataRecord["CPETRSKP"].ToString();
            this.CPEMALLP = dataRecord["CPEMALLP"].ToString();
            this.CPETSPEP = dataRecord["CPETSPEP"].ToString();
            this.CPETGPKC = dataRecord["CPETGPKC"].ToString();
            this.Estimated_Eligible_1st_Graders = dataRecord["Estimated_Eligible_1st_Graders"].ToString();
            this.CPETGPKP = dataRecord["CPETGPKP"].ToString();
            this.Num_Not_Enrolled = dataRecord["Num_Not_Enrolled"].ToString();
            this.attendance_rate = dataRecord["attendance_rate"].ToString();
            this.Graduates = dataRecord["Graduates"].ToString();
            this.percent_test_taking = dataRecord["percent_test_taking"].ToString();
            this.percent_above_criterion = dataRecord["percent_above_criterion"].ToString();
            this.percent_college_ready = dataRecord["percent_college_ready"].ToString();
            this.number_not_college_ready = dataRecord["number_not_college_ready"].ToString();
            this.percent_graduating_4_years = dataRecord["percent_graduating_4_years"].ToString();
            this.three_r_d = dataRecord["3_r_d"].ToString();
            this.three_r_rec = dataRecord["3_r_rec"].ToString();
            this.three_r_not_rec = dataRecord["3_r_not_rec"].ToString();
            this.three_r_rec_rate = dataRecord["3_r_rec_rate"].ToString();
            this.four_m_d = dataRecord["4_m_d"].ToString();
            this.four_m_rec = dataRecord["4_m_rec"].ToString();
            this.four_m_not_rec = dataRecord["4_m_not_rec"].ToString();
            this.four_m_rec_rate = dataRecord["4_m_rec_rate"].ToString();
            this.eight_s_d = dataRecord["8_s_d"].ToString();
            this.eight_s_rec = dataRecord["8_s_rec"].ToString();
            this.eight_s_not_rec = dataRecord["8_s_not_rec"].ToString();
            this.eight_s_rec_rate = dataRecord["8_s_rec_rate"].ToString();
            this.a1_EOC_d = dataRecord["a1_EOC_d"].ToString();
            this.a1_EOC_rec = dataRecord["a1_EOC_rec"].ToString();
            this.a1_EOC_not_rec = dataRecord["a1_EOC_not_rec"].ToString();
            this.a1_EOC_rec_rate = dataRecord["a1_EOC_rec_rate"].ToString();
        }
    }
}