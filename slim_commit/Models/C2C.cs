using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using slim_commit.Extensions;

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
        public int CPETALLC { get; set; }
        public int CPETBLAC { get; set; }
        public int CPETHISC { get; set; }
        public int CPETWHIC { get; set; }
        public int CPETECOC { get; set; }
        public int CPETLEPC { get; set; }
        public decimal CPETRSKC { get; set; }
        public decimal CPETBLAP { get; set; }
        public decimal CPETHISP { get; set; }
        public decimal CPETWHIP { get; set; }
        public decimal CPETECOP { get; set; }
        public decimal CPETLEPP { get; set; }
        public decimal CPETRSKP { get; set; }
        public decimal CPEMALLP { get; set; }
        public decimal CPETSPEP { get; set; }
        public int CPETGPKC { get; set; }
        public decimal Estimated_Eligible_1st_Graders { get; set; }
        public decimal CPETGPKP { get; set; }
        public decimal Num_Not_Enrolled { get; set; }
        public decimal attendance_rate { get; set; }
        public decimal Graduates { get; set; }
        public decimal percent_test_taking { get; set; }
        public decimal percent_above_criterion { get; set; }
        public int percent_college_ready { get; set; }
        public int number_not_college_ready { get; set; }
        public decimal percent_graduating_4_years { get; set; }
        public int three_r_d { get; set; }
        public int three_r_rec { get; set; }
        public int three_r_not_rec { get; set; }
        public decimal three_r_rec_rate { get; set; }
        public int four_m_d { get; set; }
        public int four_m_rec { get; set; }
        public int four_m_not_rec { get; set; }
        public decimal four_m_rec_rate { get; set; }
        public int eight_s_d { get; set; }
        public int eight_s_rec { get; set; }
        public int eight_s_not_rec { get; set; }
        public decimal eight_s_rec_rate { get; set; }
        public int a1_EOC_d { get; set; }
        public int a1_EOC_rec { get; set; }
        public int a1_EOC_not_rec { get; set; }
        public decimal a1_EOC_rec_rate { get; set; }
        /// <summary>
        /// constructor
        /// </summary>
        /// <param name="dataRecord"></param>
        public ReporterC2C(IDataRecord dataRecord)
        {
            this.Id = dataRecord.GetValueOrDefault<int>("Id");

            this.CNTYNAME = dataRecord.GetValueOrDefault<string>("CNTYNAME").Replace("'", string.Empty);
            this.DISTNAME = dataRecord.GetValueOrDefault<string>("DISTNAME");
            this.CAMPUS = dataRecord.GetValueOrDefault<string>("CAMPUS");
            this.CAMPNAME = dataRecord.GetValueOrDefault<string>("CAMPNAME");
            this.CFLALTED = dataRecord.GetValueOrDefault<string>("CFLALTED");
            this.CFLCHART = dataRecord.GetValueOrDefault<string>("CFLCHART");
            this.GRDSPAN = dataRecord.GetValueOrDefault<string>("GRDSPAN");
            this.GRDTYPE = dataRecord.GetValueOrDefault<string>("GRDTYPE");

            this.CPETALLC = dataRecord.GetValueOrDefault<int>("CPETALLC");
            this.CPETBLAC = dataRecord.GetValueOrDefault<int>("CPETBLAC");
            this.CPETHISC = dataRecord.GetValueOrDefault<int>("CPETHISC");
            this.CPETWHIC = dataRecord.GetValueOrDefault<int>("CPETWHIC");
            this.CPETECOC = dataRecord.GetValueOrDefault<int>("CPETECOC");
            this.CPETLEPC = dataRecord.GetValueOrDefault<int>("CPETLEPC");

            this.CPETRSKC = dataRecord.GetValueOrDefault<decimal>("CPETRSKC");
            this.CPETBLAP = dataRecord.GetValueOrDefault<decimal>("CPETBLAP");
            this.CPETHISP = dataRecord.GetValueOrDefault<decimal>("CPETHISP");
            this.CPETWHIP = dataRecord.GetValueOrDefault<decimal>("CPETWHIP");
            this.CPETECOP = dataRecord.GetValueOrDefault<decimal>("CPETECOP");
            this.CPETLEPP = dataRecord.GetValueOrDefault<decimal>("CPETLEPP");
            this.CPETRSKP = dataRecord.GetValueOrDefault<decimal>("CPETRSKP");
            this.CPEMALLP = dataRecord.GetValueOrDefault<decimal>("CPEMALLP");
            this.CPETSPEP = dataRecord.GetValueOrDefault<decimal>("CPETSPEP");

            this.CPETGPKC = dataRecord.GetValueOrDefault<int>("CPETGPKC");

            this.Estimated_Eligible_1st_Graders = dataRecord.GetValueOrDefault<decimal>("Estimated_Eligible_1st_Graders");
            this.CPETGPKP = dataRecord.GetValueOrDefault<decimal>("CPETGPKP");
            this.Num_Not_Enrolled = dataRecord.GetValueOrDefault<decimal>("Num_Not_Enrolled");
            this.attendance_rate = dataRecord.GetValueOrDefault<decimal>("attendance_rate");
            this.Graduates = dataRecord.GetValueOrDefault<decimal>("Graduates");
            this.percent_test_taking = dataRecord.GetValueOrDefault<decimal>("percent_test_taking");
            this.percent_above_criterion = dataRecord.GetValueOrDefault<decimal>("percent_above_criterion");

            this.percent_college_ready = dataRecord.GetValueOrDefault<int>("percent_college_ready");
            this.number_not_college_ready = dataRecord.GetValueOrDefault<int>("number_not_college_ready");
            this.percent_graduating_4_years = dataRecord.GetValueOrDefault<decimal>("percent_graduating_4_years");

            this.three_r_d = dataRecord.GetValueOrDefault<int>("3_r_d");
            this.three_r_rec = dataRecord.GetValueOrDefault<int>("3_r_rec");
            this.three_r_not_rec = dataRecord.GetValueOrDefault<int>("3_r_not_rec");
            this.three_r_rec_rate = dataRecord.GetValueOrDefault<decimal>("3_r_rec_rate");

            this.four_m_d = dataRecord.GetValueOrDefault<int>("4_m_d");
            this.four_m_rec = dataRecord.GetValueOrDefault<int>("4_m_rec");
            this.four_m_not_rec = dataRecord.GetValueOrDefault<int>("4_m_not_rec");
            this.four_m_rec_rate = dataRecord.GetValueOrDefault<decimal>("4_m_rec_rate");

            this.eight_s_d = dataRecord.GetValueOrDefault<int>("8_s_d");
            this.eight_s_rec = dataRecord.GetValueOrDefault<int>("8_s_rec");
            this.eight_s_not_rec = dataRecord.GetValueOrDefault<int>("8_s_not_rec");
            this.eight_s_rec_rate = dataRecord.GetValueOrDefault<decimal>("8_s_rec_rate");

            this.a1_EOC_d = dataRecord.GetValueOrDefault<int>("a1_EOC_d");
            this.a1_EOC_rec = dataRecord.GetValueOrDefault<int>("a1_EOC_rec");
            this.a1_EOC_not_rec = dataRecord.GetValueOrDefault<int>("a1_EOC_not_rec");
            this.a1_EOC_rec_rate = dataRecord.GetValueOrDefault<decimal>("a1_EOC_rec_rate");
        }
    }
}