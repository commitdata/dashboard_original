using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace slim_commit.Models
{
    public class District
    {
        public int Id { get; set; }
        public string DISTRICT { get; set; }
        public string DISTNAME { get; set; }
        public string CNTYNAME { get; set; }
        public double DPST00FP { get; set; }
        public double DPST01FP { get; set; }
        public double DPST06FP { get; set; }
        public double DPST11FP { get; set; }
        public double DPST20FP { get; set; }
        public double DB0CT13R { get; set; }
        public double DA0CT13R { get; set; }
        public double DH0CT13R { get; set; }
        public double DW0CT13R { get; set; }
        public double DB0CC13R { get; set; }
        public double DA0CC13R { get; set; }
        public double DH0CC13R { get; set; }
        public double DW0CC13R { get; set; }
        public double DB0CSA13R { get; set; }
        public double DA0CSA13R { get; set; }
        public double DH0CSA13R { get; set; }
        public double DW0CSA13R { get; set; }
        public double DB0CAA13R { get; set; }
        public double DA0CAA13R { get; set; }
        public double DH0CAA13R { get; set; }
        public double DW0CAA13R { get; set; }
        public double a1_EOC_ph1 { get; set; }
        public double bi_EOC_ph1 { get; set; }
        public double e1_EOC_ph1 { get; set; }
        public double e2_EOC_ph1 { get; set; }
        public double h8_ph1 { get; set; }
        public double m3_ph1 { get; set; }
        public double m4_ph1 { get; set; }
        public double m5_ph1 { get; set; }
        public double m6_ph1 { get; set; }
        public double m7_ph1 { get; set; }
        public double m8_ph1 { get; set; }
        public double r3_ph1 { get; set; }
        public double r4_ph1 { get; set; }
        public double r5_ph1 { get; set; }
        public double r6_ph1 { get; set; }
        public double r7_ph1 { get; set; }
        public double r8_ph1 { get; set; }
        public double s5_ph1 { get; set; }
        public double s8_ph1 { get; set; }
        public double us_EOC_ph1 { get; set; }
        public double w4_ph1 { get; set; }
        public double w7_ph1 { get; set; }
        public double a1_EOC_rec { get; set; }
        public double bi_EOC_rec { get; set; }
        public double e1_EOC_rec { get; set; }
        public double e2_EOC_rec { get; set; }
        public double h8_rec { get; set; }
        public double m3_rec { get; set; }
        public double m4_rec { get; set; }
        public double m5_rec { get; set; }
        public double m6_rec { get; set; }
        public double m7_rec { get; set; }
        public double m8_rec { get; set; }
        public double r3_rec { get; set; }
        public double r4_rec { get; set; }
        public double r5_rec { get; set; }
        public double r6_rec { get; set; }
        public double r7_rec { get; set; }
        public double r8_rec { get; set; }
        public double s5_rec { get; set; }
        public double s8_rec { get; set; }
        public double us_EOC_rec { get; set; }
        public double w4_rec { get; set; }
        public double w7_rec { get; set; }
        public double DB00A001S14R { get; set; }
        public double DA00A001S14R { get; set; }
        public double DL00A001S14R { get; set; }
        public double DE00A001S14R { get; set; }
        public double DH00A001S14R { get; set; }
        public double DW00A001S14R { get; set; }
        public double DB00AR01S14R { get; set; }
        public double DA00AR01S14R { get; set; }
        public double DL00AR01S14R { get; set; }
        public double DE00AR01S14R { get; set; }
        public double DH00AR01S14R { get; set; }
        public double DW00AR01S14R { get; set; }
        public double DB00AM01S14R { get; set; }
        public double DA00AM01S14R { get; set; }
        public double DL00AM01S14R { get; set; }
        public double DE00AM01S14R { get; set; }
        public double DH00AM01S14R { get; set; }
        public double DW00AM01S14R { get; set; }
        public double DB00AC01S14R { get; set; }
        public double DA00AC01S14R { get; set; }
        public double DL00AC01S14R { get; set; }
        public double DE00AC01S14R { get; set; }
        public double DH00AC01S14R { get; set; }
        public double DW00AC01S14R { get; set; }
        public double DB00A004214R { get; set; }
        public double DA00A004214R { get; set; }
        public double DL00A004214R { get; set; }
        public double DE00A004214R { get; set; }
        public double DH00A004214R { get; set; }
        public double DW00A004214R { get; set; }
        public double DB00AR04214R { get; set; }
        public double DA00AR04214R { get; set; }
        public double DL00AR04214R { get; set; }
        public double DE00AR04214R { get; set; }
        public double DH00AR04214R { get; set; }
        public double DW00AR04214R { get; set; }
        public double DB00AM04214R { get; set; }
        public double DA00AM04214R { get; set; }
        public double DL00AM04214R { get; set; }
        public double DE00AM04214R { get; set; }
        public double DH00AM04214R { get; set; }
        public double DW00AM04214R { get; set; }
        public double DB00AC04214R { get; set; }
        public double DA00AC04214R { get; set; }
        public double DL00AC04214R { get; set; }
        public double DE00AC04214R { get; set; }
        public double DH00AC04214R { get; set; }
        public double DW00AC04214R { get; set; }
        public double DPSTKIDR { get; set; }
        public double DPSTEXPA { get; set; }
        public double DPSTTOSA { get; set; }
        public double DB0GR13N { get; set; }
        public double DB0GR13R { get; set; }
        public double DA0GR13N { get; set; }
        public double DA0GR13R { get; set; }
        public double DH0GR13N { get; set; }
        public double DH0GR13R { get; set; }
        public double DW0GR13N { get; set; }
        public double DW0GR13R { get; set; }
        public double DA0GM13R { get; set; }
        public double DPETALLC { get; set; }
        public double DPETHISP { get; set; }
        public double DPETWHIP { get; set; }
        public double DPETBLAP { get; set; }
        public double DPETECOP { get; set; }
        public double DPETLEPP { get; set; }
        public double DPEMALLP { get; set; }

        public double grad_aa { get; set; }
        public double grad_all { get; set; }
        public double grad_hispanic { get; set; }
        public double grad_white { get; set; }
        public double grad_lep { get; set; }
        public double grad_econ { get; set; }	
					

        public District(IDataRecord dataRecord)
        {
            this.Id = int.Parse(dataRecord["Id"].ToString());
            this.DISTRICT = dataRecord["DISTRICT"].ToString().Replace("'", string.Empty);
            this.DISTNAME = dataRecord["DISTNAME"].ToString();
            this.CNTYNAME = dataRecord["CNTYNAME"].ToString();
            this.DPST00FP = Convert.ToDouble(dataRecord["DPST00FP"]);
            this.DPST01FP = Convert.ToDouble(dataRecord["DPST01FP"]);
            this.DPST06FP = Convert.ToDouble(dataRecord["DPST06FP"]);
            this.DPST11FP = Convert.ToDouble(dataRecord["DPST11FP"]);
            this.DPST20FP = Convert.ToDouble(dataRecord["DPST20FP"]);
            this.DB0CT13R = Convert.ToDouble(dataRecord["DB0CT13R"]);
            this.DA0CT13R = Convert.ToDouble(dataRecord["DA0CT13R"]);
            this.DH0CT13R = Convert.ToDouble(dataRecord["DH0CT13R"]);
            this.DW0CT13R = Convert.ToDouble(dataRecord["DW0CT13R"]);
            this.DB0CC13R = Convert.ToDouble(dataRecord["DB0CC13R"]);
            this.DA0CC13R = Convert.ToDouble(dataRecord["DA0CC13R"]);
            this.DH0CC13R = Convert.ToDouble(dataRecord["DH0CC13R"]);
            this.DW0CC13R = Convert.ToDouble(dataRecord["DW0CC13R"]);
            this.DB0CSA13R = Convert.ToDouble(dataRecord["DB0CSA13R"]);
            this.DA0CSA13R = Convert.ToDouble(dataRecord["DA0CSA13R"]);
            this.DH0CSA13R = Convert.ToDouble(dataRecord["DH0CSA13R"]);
            this.DW0CSA13R = Convert.ToDouble(dataRecord["DW0CSA13R"]);
            this.DB0CAA13R = Convert.ToDouble(dataRecord["DB0CAA13R"]);
            this.DA0CAA13R = Convert.ToDouble(dataRecord["DA0CAA13R"]);
            this.DH0CAA13R = Convert.ToDouble(dataRecord["DH0CAA13R"]);
            this.DW0CAA13R = Convert.ToDouble(dataRecord["DW0CAA13R"]);
            this.a1_EOC_ph1 = Convert.ToDouble(dataRecord["a1_EOC_ph1"]);
            this.bi_EOC_ph1 = Convert.ToDouble(dataRecord["bi_EOC_ph1"]);
            this.e1_EOC_ph1 = Convert.ToDouble(dataRecord["e1_EOC_ph1"]);
            this.e2_EOC_ph1 = Convert.ToDouble(dataRecord["e2_EOC_ph1"]);
            this.h8_ph1 = Convert.ToDouble(dataRecord["h8_ph1"]);
            this.m3_ph1 = Convert.ToDouble(dataRecord["m3_ph1"]);
            this.m4_ph1 = Convert.ToDouble(dataRecord["m4_ph1"]);
            this.m5_ph1 = Convert.ToDouble(dataRecord["m5_ph1"]);
            this.m6_ph1 = Convert.ToDouble(dataRecord["m6_ph1"]);
            this.m7_ph1 = Convert.ToDouble(dataRecord["m7_ph1"]);
            this.m8_ph1 = Convert.ToDouble(dataRecord["m8_ph1"]);
            this.r3_ph1 = Convert.ToDouble(dataRecord["r3_ph1"]);
            this.r4_ph1 = Convert.ToDouble(dataRecord["r4_ph1"]);
            this.r5_ph1 = Convert.ToDouble(dataRecord["r5_ph1"]);
            this.r6_ph1 = Convert.ToDouble(dataRecord["r6_ph1"]);
            this.r7_ph1 = Convert.ToDouble(dataRecord["r7_ph1"]);
            this.r8_ph1 = Convert.ToDouble(dataRecord["r8_ph1"]);
            this.s5_ph1 = Convert.ToDouble(dataRecord["s5_ph1"]);
            this.s8_ph1 = Convert.ToDouble(dataRecord["s8_ph1"]);
            this.us_EOC_ph1 = Convert.ToDouble(dataRecord["us_EOC_ph1"]);
            this.w4_ph1 = Convert.ToDouble(dataRecord["w4_ph1"]);
            this.w7_ph1 = Convert.ToDouble(dataRecord["w7_ph1"]);
            this.a1_EOC_rec = Convert.ToDouble(dataRecord["a1_EOC_rec"]);
            this.bi_EOC_rec = Convert.ToDouble(dataRecord["bi_EOC_rec"]);
            this.e1_EOC_rec = Convert.ToDouble(dataRecord["e1_EOC_rec"]);
            this.e2_EOC_rec = Convert.ToDouble(dataRecord["e2_EOC_rec"]);
            this.h8_rec = Convert.ToDouble(dataRecord["h8_rec"]);
            this.m3_rec = Convert.ToDouble(dataRecord["m3_rec"]);
            this.m4_rec = Convert.ToDouble(dataRecord["m4_rec"]);
            this.m5_rec = Convert.ToDouble(dataRecord["m5_rec"]);
            this.m6_rec = Convert.ToDouble(dataRecord["m6_rec"]);
            this.m7_rec = Convert.ToDouble(dataRecord["m7_rec"]);
            this.m8_rec = Convert.ToDouble(dataRecord["m8_rec"]);
            this.r3_rec = Convert.ToDouble(dataRecord["r3_rec"]);
            this.r4_rec = Convert.ToDouble(dataRecord["r4_rec"]);
            this.r5_rec = Convert.ToDouble(dataRecord["r5_rec"]);
            this.r6_rec = Convert.ToDouble(dataRecord["r6_rec"]);
            this.r7_rec = Convert.ToDouble(dataRecord["r7_rec"]);
            this.r8_rec = Convert.ToDouble(dataRecord["r8_rec"]);
            this.s5_rec = Convert.ToDouble(dataRecord["s5_rec"]);
            this.s8_rec = Convert.ToDouble(dataRecord["s8_rec"]);
            this.us_EOC_rec = Convert.ToDouble(dataRecord["us_EOC_rec"]);
            this.w4_rec = Convert.ToDouble(dataRecord["w4_rec"]);
            this.w7_rec = Convert.ToDouble(dataRecord["w7_rec"]);
            this.DB00A001S14R = Convert.ToDouble(dataRecord["DB00A001S14R"]);
            this.DA00A001S14R = Convert.ToDouble(dataRecord["DA00A001S14R"]);
            this.DL00A001S14R = Convert.ToDouble(dataRecord["DL00A001S14R"]);
            this.DE00A001S14R = Convert.ToDouble(dataRecord["DE00A001S14R"]);
            this.DH00A001S14R = Convert.ToDouble(dataRecord["DH00A001S14R"]);
            this.DW00A001S14R = Convert.ToDouble(dataRecord["DW00A001S14R"]);
            this.DB00AR01S14R = Convert.ToDouble(dataRecord["DB00AR01S14R"]);
            this.DA00AR01S14R = Convert.ToDouble(dataRecord["DA00AR01S14R"]);
            this.DL00AR01S14R = Convert.ToDouble(dataRecord["DL00AR01S14R"]);
            this.DE00AR01S14R = Convert.ToDouble(dataRecord["DE00AR01S14R"]);
            this.DH00AR01S14R = Convert.ToDouble(dataRecord["DH00AR01S14R"]);
            this.DW00AR01S14R = Convert.ToDouble(dataRecord["DW00AR01S14R"]);
            this.DB00AM01S14R = Convert.ToDouble(dataRecord["DB00AM01S14R"]);
            this.DA00AM01S14R = Convert.ToDouble(dataRecord["DA00AM01S14R"]);
            this.DL00AM01S14R = Convert.ToDouble(dataRecord["DL00AM01S14R"]);
            this.DE00AM01S14R = Convert.ToDouble(dataRecord["DE00AM01S14R"]);
            this.DH00AM01S14R = Convert.ToDouble(dataRecord["DH00AM01S14R"]);
            this.DW00AM01S14R = Convert.ToDouble(dataRecord["DW00AM01S14R"]);
            this.DB00AC01S14R = Convert.ToDouble(dataRecord["DB00AC01S14R"]);
            this.DA00AC01S14R = Convert.ToDouble(dataRecord["DA00AC01S14R"]);
            this.DL00AC01S14R = Convert.ToDouble(dataRecord["DL00AC01S14R"]);
            this.DE00AC01S14R = Convert.ToDouble(dataRecord["DE00AC01S14R"]);
            this.DH00AC01S14R = Convert.ToDouble(dataRecord["DH00AC01S14R"]);
            this.DW00AC01S14R = Convert.ToDouble(dataRecord["DW00AC01S14R"]);
            this.DB00A004214R = Convert.ToDouble(dataRecord["DB00A004214R"]);
            this.DA00A004214R = Convert.ToDouble(dataRecord["DA00A004214R"]);
            this.DL00A004214R = Convert.ToDouble(dataRecord["DL00A004214R"]);
            this.DE00A004214R = Convert.ToDouble(dataRecord["DE00A004214R"]);
            this.DH00A004214R = Convert.ToDouble(dataRecord["DH00A004214R"]);
            this.DW00A004214R = Convert.ToDouble(dataRecord["DW00A004214R"]);
            this.DB00AR04214R = Convert.ToDouble(dataRecord["DB00AR04214R"]);
            this.DA00AR04214R = Convert.ToDouble(dataRecord["DA00AR04214R"]);
            this.DL00AR04214R = Convert.ToDouble(dataRecord["DL00AR04214R"]);
            this.DE00AR04214R = Convert.ToDouble(dataRecord["DE00AR04214R"]);
            this.DH00AR04214R = Convert.ToDouble(dataRecord["DH00AR04214R"]);
            this.DW00AR04214R = Convert.ToDouble(dataRecord["DW00AR04214R"]);
            this.DB00AM04214R = Convert.ToDouble(dataRecord["DB00AM04214R"]);
            this.DA00AM04214R = Convert.ToDouble(dataRecord["DA00AM04214R"]);
            this.DL00AM04214R = Convert.ToDouble(dataRecord["DL00AM04214R"]);
            this.DE00AM04214R = Convert.ToDouble(dataRecord["DE00AM04214R"]);
            this.DH00AM04214R = Convert.ToDouble(dataRecord["DH00AM04214R"]);
            this.DW00AM04214R = Convert.ToDouble(dataRecord["DW00AM04214R"]);
            this.DB00AC04214R = Convert.ToDouble(dataRecord["DB00AC04214R"]);
            this.DA00AC04214R = Convert.ToDouble(dataRecord["DA00AC04214R"]);
            this.DL00AC04214R = Convert.ToDouble(dataRecord["DL00AC04214R"]);
            this.DE00AC04214R = Convert.ToDouble(dataRecord["DE00AC04214R"]);
            this.DH00AC04214R = Convert.ToDouble(dataRecord["DH00AC04214R"]);
            this.DW00AC04214R = Convert.ToDouble(dataRecord["DW00AC04214R"]);
            this.DPSTKIDR = Convert.ToDouble(dataRecord["DPSTKIDR"]);
            this.DPSTEXPA = Convert.ToDouble(dataRecord["DPSTEXPA"]);
            this.DPSTTOSA = Convert.ToDouble(dataRecord["DPSTTOSA"]);
            this.DB0GR13N = Convert.ToDouble(dataRecord["DB0GR13N"]);
            this.DB0GR13R = Convert.ToDouble(dataRecord["DB0GR13R"]);
            this.DA0GR13N = Convert.ToDouble(dataRecord["DA0GR13N"]);
            this.DA0GR13R = Convert.ToDouble(dataRecord["DA0GR13R"]);
            this.DH0GR13N = Convert.ToDouble(dataRecord["DH0GR13N"]);
            this.DH0GR13R = Convert.ToDouble(dataRecord["DH0GR13R"]);
            this.DW0GR13N = Convert.ToDouble(dataRecord["DW0GR13N"]);
            this.DW0GR13R = Convert.ToDouble(dataRecord["DW0GR13R"]);
            this.DA0GM13R = Convert.ToDouble(dataRecord["DA0GM13R"]);
            this.DPETALLC = Convert.ToDouble(dataRecord["DPETALLC"]);
            this.DPETHISP = Convert.ToDouble(dataRecord["DPETHISP"]);
            this.DPETWHIP = Convert.ToDouble(dataRecord["DPETWHIP"]);
            this.DPETBLAP = Convert.ToDouble(dataRecord["DPETBLAP"]);
            this.DPETECOP = Convert.ToDouble(dataRecord["DPETECOP"]);
            this.DPETLEPP = Convert.ToDouble(dataRecord["DPETLEPP"]);
            this.DPEMALLP = Convert.ToDouble(dataRecord["DPEMALLP"]);

            this.grad_aa = Convert.ToDouble(dataRecord["grad_aa"]);
            this.grad_all = Convert.ToDouble(dataRecord["grad_all"]);
            this.grad_white = Convert.ToDouble(dataRecord["grad_white"]);
            this.grad_hispanic = Convert.ToDouble(dataRecord["grad_hispanic"]);
            this.grad_econ = Convert.ToDouble(dataRecord["grad_econ"]);
            this.grad_lep = Convert.ToDouble(dataRecord["grad_lep"]);
        }
    }
}