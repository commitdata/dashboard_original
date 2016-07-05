using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace slim_commit.Models
{
    public class Campus
    {
        public int id { get; set; }
        public int YEAR { get; set; }
        public string CNTYNAME { get; set; }
        public string COUNTY { get; set; }
        public string C_RATING { get; set; }
        public string DISTNAME { get; set; }
        public string DISTRICT { get; set; }
        public string GRDSPAN { get; set; }
        public string GRDTYPE { get; set; }
        public string CAMPUS { get; set; }
        public string CAMPNAME { get; set; }
        public string CFLALTED { get; set; }
        public string CFLCHART { get; set; }
        public double LATITUDE { get; set; }
        public double LONGITUDE { get; set; }
        public double CAGC4STR { get; set; }
        public double CBGC4STR { get; set; }
        public double CEGC4STR { get; set; }
        public double CHGC4STR { get; set; }
        public double CLGC4STR { get; set; }
        public double CWGC4STR { get; set; }
        public double CA00A001SSTR { get; set; }
        public double CA00AC01SSTR { get; set; }
        public double CA00AM01SSTR { get; set; }
        public double CA00AR01SSTR { get; set; }
        public double CB00A001SSTR { get; set; }
        public double CB00AC01SSTR { get; set; }
        public double CB00AM01SSTR { get; set; }
        public double CB00AR01SSTR { get; set; }
        public double CE00A001SSTR { get; set; }
        public double CE00AC01SSTR { get; set; }
        public double CE00AM01SSTR { get; set; }
        public double CE00AR01SSTR { get; set; }
        public double CH00A001SSTR { get; set; }
        public double CH00AC01SSTR { get; set; }
        public double CH00AM01SSTR { get; set; }
        public double CH00AR01SSTR { get; set; }
        public double CL00A001SSTR { get; set; }
        public double CL00AC01SSTR { get; set; }
        public double CL00AM01SSTR { get; set; }
        public double CL00AR01SSTR { get; set; }
        public double CW00A001SSTR { get; set; }
        public double CW00AC01SSTR { get; set; }
        public double CW00AM01SSTR { get; set; }
        public double CW00AR01SSTR { get; set; }
        public double CA00A0042STR { get; set; }
        public double CA00AC042STR { get; set; }
        public double CA00AM042STR { get; set; }
        public double CA00AR042STR { get; set; }
        public double CB00A0042STR { get; set; }
        public double CB00AC042STR { get; set; }
        public double CB00AM042STR { get; set; }
        public double CB00AR042STR { get; set; }
        public double CE00A0042STR { get; set; }
        public double CE00AC042STR { get; set; }
        public double CE00AM042STR { get; set; }
        public double CE00AR042STR { get; set; }
        public double CH00A0042STR { get; set; }
        public double CH00AC042STR { get; set; }
        public double CH00AM042STR { get; set; }
        public double CH00AR042STR { get; set; }
        public double CL00A0042STR { get; set; }
        public double CL00AC042STR { get; set; }
        public double CL00AM042STR { get; set; }
        public double CL00AR042STR { get; set; }
        public double CW00A0042STR { get; set; }
        public double CW00AC042STR { get; set; }
        public double CW00AM042STR { get; set; }
        public double CW00AR042STR { get; set; }
        public double CPETALLC { get; set; }
        public double CPETBLAP { get; set; }
        public double CPETECOP { get; set; }
        public double CPETHISP { get; set; }
        public double CPETLEPP { get; set; }
        public double CPETWHIP { get; set; }
        public double CPEMALLC { get; set; }
        public double CPEMALLP { get; set; }
        public double CA0CAASTR { get; set; }
        public double CA0CSASTR { get; set; }
        public double CB0CAASTR { get; set; }
        public double CB0CSASTR { get; set; }
        public double CE0CAASTR { get; set; }
        public double CE0CSASTR { get; set; }
        public double CH0CAASTR { get; set; }
        public double CH0CSASTR { get; set; }
        public double CW0CAASTR { get; set; }
        public double CW0CSASTR { get; set; }
        public double CA0CCSTR { get; set; }
        public double CA0CTSTR { get; set; }
        public double CB0CCSTR { get; set; }
        public double CB0CTSTR { get; set; }
        public double CH0CCSTR { get; set; }
        public double CH0CTSTR { get; set; }
        public double CW0CCSTR { get; set; }
        public double CW0CTSTR { get; set; }
        public double CPST00FP { get; set; }
        public double CPST01FP { get; set; }
        public double CPST06FP { get; set; }
        public double CPST11FP { get; set; }
        public double CPST20FP { get; set; }



        public Campus(IDataRecord dataRecord)
        {

            this.id = int.Parse(dataRecord["id"].ToString());
            this.YEAR = int.Parse(dataRecord["YEAR"].ToString());

            this.CNTYNAME = dataRecord["CNTYNAME"].ToString();
            this.COUNTY = dataRecord["COUNTY"].ToString().Replace("'", string.Empty);
            this.C_RATING = dataRecord["C_RATING"].ToString();
            this.DISTNAME = dataRecord["DISTNAME"].ToString();
            this.DISTRICT = dataRecord["DISTRICT"].ToString().Replace("'", string.Empty);
            this.GRDSPAN = dataRecord["GRDSPAN"].ToString().Replace("'", string.Empty);
            this.GRDTYPE = dataRecord["GRDTYPE"].ToString();
            this.CAMPUS = dataRecord["CAMPUS"].ToString().Replace("'", string.Empty);
            this.CAMPNAME = dataRecord["CAMPNAME"].ToString();
            this.CFLALTED = dataRecord["CFLALTED"].ToString();
            this.CFLCHART = dataRecord["CFLCHART"].ToString();

            this.LATITUDE = Convert.ToDouble(dataRecord["LATITUDE"]);
            this.LONGITUDE = Convert.ToDouble(dataRecord["LONGITUDE"]);
            this.CAGC4STR = Convert.ToDouble(dataRecord["CAGC4*R"]);
            this.CBGC4STR = Convert.ToDouble(dataRecord["CBGC4*R"]);
            this.CEGC4STR = Convert.ToDouble(dataRecord["CEGC4*R"]);
            this.CHGC4STR = Convert.ToDouble(dataRecord["CHGC4*R"]);
            this.CLGC4STR = Convert.ToDouble(dataRecord["CLGC4*R"]);
            this.CWGC4STR = Convert.ToDouble(dataRecord["CWGC4*R"]);
            this.CA00A001SSTR = Convert.ToDouble(dataRecord["CA00A001S*R"]);
            this.CA00AC01SSTR = Convert.ToDouble(dataRecord["CA00AC01S*R"]);
            this.CA00AM01SSTR = Convert.ToDouble(dataRecord["CA00AM01S*R"]);
            this.CA00AR01SSTR = Convert.ToDouble(dataRecord["CA00AR01S*R"]);
            this.CB00A001SSTR = Convert.ToDouble(dataRecord["CB00A001S*R"]);
            this.CB00AC01SSTR = Convert.ToDouble(dataRecord["CB00AC01S*R"]);
            this.CB00AM01SSTR = Convert.ToDouble(dataRecord["CB00AM01S*R"]);
            this.CB00AR01SSTR = Convert.ToDouble(dataRecord["CB00AR01S*R"]);
            this.CE00A001SSTR = Convert.ToDouble(dataRecord["CE00A001S*R"]);
            this.CE00AC01SSTR = Convert.ToDouble(dataRecord["CE00AC01S*R"]);
            this.CE00AM01SSTR = Convert.ToDouble(dataRecord["CE00AM01S*R"]);
            this.CE00AR01SSTR = Convert.ToDouble(dataRecord["CE00AR01S*R"]);
            this.CH00A001SSTR = Convert.ToDouble(dataRecord["CH00A001S*R"]);
            this.CH00AC01SSTR = Convert.ToDouble(dataRecord["CH00AC01S*R"]);
            this.CH00AM01SSTR = Convert.ToDouble(dataRecord["CH00AM01S*R"]);
            this.CH00AR01SSTR = Convert.ToDouble(dataRecord["CH00AR01S*R"]);
            this.CL00A001SSTR = Convert.ToDouble(dataRecord["CL00A001S*R"]);
            this.CL00AC01SSTR = Convert.ToDouble(dataRecord["CL00AC01S*R"]);
            this.CL00AM01SSTR = Convert.ToDouble(dataRecord["CL00AM01S*R"]);
            this.CL00AR01SSTR = Convert.ToDouble(dataRecord["CL00AR01S*R"]);
            this.CW00A001SSTR = Convert.ToDouble(dataRecord["CW00A001S*R"]);
            this.CW00AC01SSTR = Convert.ToDouble(dataRecord["CW00AC01S*R"]);
            this.CW00AM01SSTR = Convert.ToDouble(dataRecord["CW00AM01S*R"]);
            this.CW00AR01SSTR = Convert.ToDouble(dataRecord["CW00AR01S*R"]);
            this.CA00A0042STR = Convert.ToDouble(dataRecord["CA00A0042*R"]);
            this.CA00AC042STR = Convert.ToDouble(dataRecord["CA00AC042*R"]);
            this.CA00AM042STR = Convert.ToDouble(dataRecord["CA00AM042*R"]);
            this.CA00AR042STR = Convert.ToDouble(dataRecord["CA00AR042*R"]);
            this.CB00A0042STR = Convert.ToDouble(dataRecord["CB00A0042*R"]);
            this.CB00AC042STR = Convert.ToDouble(dataRecord["CB00AC042*R"]);
            this.CB00AM042STR = Convert.ToDouble(dataRecord["CB00AM042*R"]);
            this.CB00AR042STR = Convert.ToDouble(dataRecord["CB00AR042*R"]);
            this.CE00A0042STR = Convert.ToDouble(dataRecord["CE00A0042*R"]);
            this.CE00AC042STR = Convert.ToDouble(dataRecord["CE00AC042*R"]);
            this.CE00AM042STR = Convert.ToDouble(dataRecord["CE00AM042*R"]);
            this.CE00AR042STR = Convert.ToDouble(dataRecord["CE00AR042*R"]);
            this.CH00A0042STR = Convert.ToDouble(dataRecord["CH00A0042*R"]);
            this.CH00AC042STR = Convert.ToDouble(dataRecord["CH00AC042*R"]);
            this.CH00AM042STR = Convert.ToDouble(dataRecord["CH00AM042*R"]);
            this.CH00AR042STR = Convert.ToDouble(dataRecord["CH00AR042*R"]);
            this.CL00A0042STR = Convert.ToDouble(dataRecord["CL00A0042*R"]);
            this.CL00AC042STR = Convert.ToDouble(dataRecord["CL00AC042*R"]);
            this.CL00AM042STR = Convert.ToDouble(dataRecord["CL00AM042*R"]);
            this.CL00AR042STR = Convert.ToDouble(dataRecord["CL00AR042*R"]);
            this.CW00A0042STR = Convert.ToDouble(dataRecord["CW00A0042*R"]);
            this.CW00AC042STR = Convert.ToDouble(dataRecord["CW00AC042*R"]);
            this.CW00AM042STR = Convert.ToDouble(dataRecord["CW00AM042*R"]);
            this.CW00AR042STR = Convert.ToDouble(dataRecord["CW00AR042*R"]);
            this.CPETALLC = Convert.ToDouble(dataRecord["CPETALLC"]);
            this.CPETBLAP = Convert.ToDouble(dataRecord["CPETBLAP"]);
            this.CPETECOP = Convert.ToDouble(dataRecord["CPETECOP"]);
            this.CPETHISP = Convert.ToDouble(dataRecord["CPETHISP"]);
            this.CPETLEPP = Convert.ToDouble(dataRecord["CPETLEPP"]);
            this.CPETWHIP = Convert.ToDouble(dataRecord["CPETWHIP"]);
            this.CPEMALLC = Convert.ToDouble(dataRecord["CPEMALLC"]);
            this.CPEMALLP = Convert.ToDouble(dataRecord["CPEMALLP"]);
            this.CA0CAASTR = Convert.ToDouble(dataRecord["CA0CAA*R"]);
            this.CA0CSASTR = Convert.ToDouble(dataRecord["CA0CSA*R"]);
            this.CB0CAASTR = Convert.ToDouble(dataRecord["CB0CAA*R"]);
            this.CB0CSASTR = Convert.ToDouble(dataRecord["CB0CSA*R"]);
            this.CE0CAASTR = Convert.ToDouble(dataRecord["CE0CAA*R"]);
            this.CE0CSASTR = Convert.ToDouble(dataRecord["CE0CSA*R"]);
            this.CH0CAASTR = Convert.ToDouble(dataRecord["CH0CAA*R"]);
            this.CH0CSASTR = Convert.ToDouble(dataRecord["CH0CSA*R"]);
            this.CW0CAASTR = Convert.ToDouble(dataRecord["CW0CAA*R"]);
            this.CW0CSASTR = Convert.ToDouble(dataRecord["CW0CSA*R"]);
            this.CA0CCSTR = Convert.ToDouble(dataRecord["CA0CC*R"]);
            this.CA0CTSTR = Convert.ToDouble(dataRecord["CA0CT*R"]);
            this.CB0CCSTR = Convert.ToDouble(dataRecord["CB0CC*R"]);
            this.CB0CTSTR = Convert.ToDouble(dataRecord["CB0CT*R"]);
            this.CH0CCSTR = Convert.ToDouble(dataRecord["CH0CC*R"]);
            this.CH0CTSTR = Convert.ToDouble(dataRecord["CH0CT*R"]);
            this.CW0CCSTR = Convert.ToDouble(dataRecord["CW0CC*R"]);
            this.CW0CTSTR = Convert.ToDouble(dataRecord["CW0CT*R"]);
            this.CPST00FP = Convert.ToDouble(dataRecord["CPST00FP"]);
            this.CPST01FP = Convert.ToDouble(dataRecord["CPST01FP"]);
            this.CPST06FP = Convert.ToDouble(dataRecord["CPST06FP"]);
            this.CPST11FP = Convert.ToDouble(dataRecord["CPST11FP"]);
            this.CPST20FP = Convert.ToDouble(dataRecord["CPST20FP"]);


        }

    }
}