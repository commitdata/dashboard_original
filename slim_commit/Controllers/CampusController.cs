using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using slim_commit.Extensions;
using slim_commit.Models;
using System.Threading.Tasks;

namespace slim_commit.Controllers
{
    public class CampusController : ApiController
    {

        private string GetConnection(int year)
        {            
            return ConfigurationManager.ConnectionStrings["tapr_" + year].ConnectionString;
        }
        public List<Dictionary<string, object>> GetCounties(int year)
        {
            List<Dictionary<string, object>> counties;

            using (SqlConnection connection = new SqlConnection(GetConnection(year)))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("select distinct CNTYNAME, COUNTY from CREF$ order by CNTYNAME", connection);
                SqlDataReader reader = command.ExecuteReader();
                counties = reader.GetAllRecords();
                connection.Close();
            }
            return counties;
        }

        public List<Dictionary<string, object>> GetDistricts(int year, string county)
        {
            List<Dictionary<string, object>> counties;

            using (SqlConnection connection = new SqlConnection(GetConnection(year)))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("select distinct DISTNAME, DISTRICT from CREF$  where COUNTY = @county order by DISTNAME", connection);
                command.Parameters.AddWithValue("county", county);
                SqlDataReader reader = command.ExecuteReader();
                counties = reader.GetAllRecords();
                connection.Close();
            }
            return counties;
        }

        public List<Dictionary<string, object>> GetCampuses(int year, string district, string county)
        {
            List<Dictionary<string, object>> counties;

            using (SqlConnection connection = new SqlConnection(GetConnection(year)))
            {
                connection.Open();
                SqlCommand command;
                if (!string.IsNullOrEmpty(district))
                {
                    command = new SqlCommand("select distinct CAMPNAME, CAMPUS, GRDTYPE from CREF$ where DISTRICT = @district order by CAMPNAME", connection);
                    command.Parameters.AddWithValue("district", district);
                }
                else
                {
                    command = new SqlCommand("select distinct CAMPNAME, CAMPUS, GRDTYPE from CREF$ where COUNTY = @county order by CAMPNAME", connection);
                    command.Parameters.AddWithValue("county", county);
                }
                SqlDataReader reader = command.ExecuteReader();
                counties = reader.GetAllRecords();
                connection.Close();
            }
            return counties;
        }

        public List<Dictionary<string, object>> GetCampus(string campus)
        {
            List<Dictionary<string, object>> campusRecord;
            using (SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["commit"].ConnectionString))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("select CAMPUS, CAMPNAME, Latitude, Longitude from Campus$ where CAMPUS = @campus", connection);
                command.Parameters.AddWithValue("campus", campus);
                SqlDataReader reader = command.ExecuteReader();
                campusRecord = reader.GetAllRecords();
                connection.Close();
            }
            return campusRecord;
        }

        public List<Dictionary<string, object>> GetStudentInfo(int year, string campus)
        {
            List<Dictionary<string, object>> campusRecord;
            using (SqlConnection connection = new SqlConnection(GetConnection(year)))
            {
                connection.Open();
                /* Box fileds : CPEMALLP, CPETALLC, CPETECOP, CPETLEPP */
                SqlCommand command = new SqlCommand("select CAMPUS, CPEMALLP, CPETALLC, CPETECOP, CPETLEPP, CPETHISP, CPETWHIP, CPETBLAP, CPETASIP from CSTUD$ where campus = @campus", connection);
                command.Parameters.AddWithValue("campus", campus);
                SqlDataReader reader = command.ExecuteReader();
                campusRecord = reader.GetAllRecords();
                connection.Close();
            }
            return campusRecord;
        }

        public List<Dictionary<string, object>> GetStaffExperience(int year, string campus)
        {
            List<Dictionary<string, object>> campusRecord;
            using (SqlConnection connection = new SqlConnection(GetConnection(year)))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("select CAMPUS, CPST00FP, CPST01FP, CPST06FP, CPST11FP, CPST20FP from CSTAF$ where campus = @campus", connection);
                command.Parameters.AddWithValue("campus", campus);
                SqlDataReader reader = command.ExecuteReader();
                campusRecord = reader.GetAllRecords();
                connection.Close();
            }
            return campusRecord;
        }

        public List<Dictionary<string, object>> GetGraduationRates(int year, string campus)
        {
            List<Dictionary<string, object>> campusRecord;
            string yearCode = (year - 1).ToString().Substring(2);
            using (SqlConnection connection = new SqlConnection(GetConnection(year)))
            {
                connection.Open();
                string query = "CAGC4X14R as CAGC4XYRYR, CBGC4X14R as CBGC4XYRYR, CHGC4X14R as CHGC4XYRYR, CWGC4X14R as CWGC4XYRYR, CLGC4X14R as CLGC4XYRYR, CEGC4X14R as CEGC4XYRYR";
                query = query.Replace("14R as", yearCode + "R as");
                SqlCommand command = new SqlCommand(string.Format("select CAMPUS, {0} from CCOMP4$ where campus = @campus", query), connection);
                command.Parameters.AddWithValue("campus", campus);
                SqlDataReader reader = command.ExecuteReader();
                campusRecord = reader.GetAllRecords();
                connection.Close();
            }
            return campusRecord;
        }

        public List<Dictionary<string, object>> GetCollegeAdmissions(int year, string campus)
        {
            List<Dictionary<string, object>> campusRecord;
            string yearCode = (year - 1).ToString().Substring(2);
            using (SqlConnection connection = new SqlConnection(GetConnection(year)))
            {
                connection.Open();
                string query = "CA0CT14R as CA0CTYRYR, CB0CT14R as CB0CTYRYR, CH0CT14R as CH0CTYRYR, CW0CT14R as CW0CTYRYR, CA0CC14R as CA0CCYRYR, CB0CC14R as CB0CCYRYR, CH0CC14R as CH0CCYRYR, CW0CC14R as CW0CCYRYR, CA0CSA14R as CA0CSAYRYR, CB0CSA14R as CB0CSAYRYR, CH0CSA14R as CH0CSAYRYR, CW0CSA14R as CW0CSAYRYR, CA0CAA14R as CA0CAAYRYR, CB0CAA14R as CB0CAAYRYR, CH0CAA14R as CH0CAAYRYR, CW0CAA14R as CW0CAAYRYR";
                query = query.Replace("14R as", yearCode + "R as");
                SqlCommand command = new SqlCommand(string.Format("select CAMPUS, {0} from CCAD$ where campus = @campus", query), connection);
                command.Parameters.AddWithValue("campus", campus);
                SqlDataReader reader = command.ExecuteReader();
                campusRecord = reader.GetAllRecords();
                connection.Close();
            }
            return campusRecord;
        }

        public List<Dictionary<string, object>> GetStaarAllCampus(string campus)
        {
            var cstaar4 = "c4.CA00A001S15R as CA00A001SYRYR, c4.CB00A001S15R as CB00A001SYRYR, c4.CW00A001S15R as CW00A001SYRYR, c4.CH00A001S15R as CH00A001SYRYR, c4.CE00A001S15R as CE00A001SYRYR, c4.CL00A001S15R as CL00A001SYRYR, c4.CA00AS01S15R as CA00AS01SYRYR, c4.CB00AS01S15R as CB00AS01SYRYR, c4.CW00AS01S15R as CW00AS01SYRYR, c4.CH00AS01S15R as CH00AS01SYRYR, c4.CE00AS01S15R as CE00AS01SYRYR, c4.CL00AS01S15R as CL00AS01SYRYR, c4.CA00AR01S15R as CA00AR01SYRYR, c4.CB00AR01S15R as CB00AR01SYRYR, c4.CW00AR01S15R as CW00AR01SYRYR, c4.CH00AR01S15R as CH00AR01SYRYR, c4.CE00AR01S15R as CE00AR01SYRYR, c4.CL00AR01S15R as CL00AR01SYRYR, c4.CA00AM01S15R as CA00AM01SYRYR, c4.CB00AM01S15R as CB00AM01SYRYR, c4.CW00AM01S15R as CW00AM01SYRYR, c4.CH00AM01S15R as CH00AM01SYRYR, c4.CE00AM01S15R as CE00AM01SYRYR, c4.CL00AM01S15R as CL00AM01SYRYR, c4.CA00AW01S15R as CA00AW01SYRYR, c4.CB00AW01S15R as CB00AW01SYRYR, c4.CW00AW01S15R as CW00AW01SYRYR, c4.CH00AW01S15R as CH00AW01SYRYR, c4.CE00AW01S15R as CE00AW01SYRYR, c4.CL00AW01S15R as CL00AW01SYRYR, c4.CA00AC01S15R as CA00AC01SYRYR, c4.CB00AC01S15R as CB00AC01SYRYR, c4.CW00AC01S15R as CW00AC01SYRYR, c4.CH00AC01S15R as CH00AC01SYRYR, c4.CE00AC01S15R as CE00AC01SYRYR, c4.CL00AC01S15R as CL00AC01SYRYR";
            var cstaar5 = "c5.CA00A004215R as CA00A0042YRYR, c5.CB00A004215R as CB00A0042YRYR, c5.CW00A004215R as CW00A0042YRYR, c5.CH00A004215R as CH00A0042YRYR, c5.CE00A004215R as CE00A0042YRYR, c5.CL00A004215R as CL00A0042YRYR, c5.CA00AS04215R as CA00AS042YRYR, c5.CB00AS04215R as CB00AS042YRYR, c5.CW00AS04215R as CW00AS042YRYR, c5.CH00AS04215R as CH00AS042YRYR, c5.CE00AS04215R as CE00AS042YRYR, c5.CL00AS04215R as CL00AS042YRYR, c5.CA00AR04215R as CA00AR042YRYR, c5.CB00AR04215R as CB00AR042YRYR, c5.CW00AR04215R as CW00AR042YRYR, c5.CH00AR04215R as CH00AR042YRYR, c5.CE00AR04215R as CE00AR042YRYR, c5.CL00AR04215R as CL00AR042YRYR, c5.CA00AM04215R as CA00AM042YRYR, c5.CB00AM04215R as CB00AM042YRYR, c5.CW00AM04215R as CW00AM042YRYR, c5.CH00AM04215R as CH00AM042YRYR, c5.CE00AM04215R as CE00AM042YRYR, c5.CL00AM04215R as CL00AM042YRYR, c5.CA00AW04215R as CA00AW042YRYR, c5.CB00AW04215R as CB00AW042YRYR, c5.CW00AW04215R as CW00AW042YRYR, c5.CH00AW04215R as CH00AW042YRYR, c5.CE00AW04215R as CE00AW042YRYR, c5.CL00AW04215R as CL00AW042YRYR, c5.CA00AC04215R as CA00AC042YRYR, c5.CB00AC04215R as CB00AC042YRYR, c5.CW00AC04215R as CW00AC042YRYR, c5.CH00AC04215R as CH00AC042YRYR, c5.CE00AC04215R as CE00AC042YRYR, c5.CL00AC04215R as CL00AC042YRYR";
            var campusRecords = new List<Dictionary<string, object>>();
            Parallel.ForEach(new int[4] { 2013, 2014, 2015, 2016 }, (i) =>
                {
                //for (var i = 2013; i <= 2015; i++)
                {
                        var currentStaar4 = cstaar4.Replace("15R as", i.ToString().Substring(2) + "R as");
                        var currentStaar5 = cstaar5.Replace("15R as", i.ToString().Substring(2) + "R as");
                        if (i == 2013)
                        {
                            currentStaar5 = currentStaar5.Replace("4213R as", "1213R as");
                            currentStaar4 = currentStaar4.Replace("1S13R as", "1513R as");
                        }

                        using (var connection = new SqlConnection(GetConnection(i)))
                        {
                            connection.Open();
                            var query = string.Format("select {0}, {1} from CSTAAR4$ as c4 join CSTAAR5$ as c5 on c4.CAMPUS = c5.CAMPUS where c4.CAMPUS = @campus", currentStaar4, currentStaar5);
                            var command = new SqlCommand(query, connection);
                            command.Parameters.AddWithValue("campus", campus);
                            var reader = command.ExecuteReader();
                            var currentRecords = reader.GetAllRecords();
                            if (currentRecords.Any())
                            {
                                currentRecords[0].Add("YEAR", i);
                                campusRecords.Add(currentRecords[0]);
                            }
                            connection.Close();
                        }
                    }
                });
            return campusRecords;
        }

        public List<Dictionary<string, object>> GetStaarAllDistrict(string campus)
        {
            var district = string.IsNullOrEmpty(campus) ? "'1" : campus.Substring(0, 7);
            var dstaar4 = "d4.DA00A001S15R as DA00A001SYRYR, d4.DB00A001S15R as DB00A001SYRYR, d4.DW00A001S15R as DW00A001SYRYR, d4.DH00A001S15R as DH00A001SYRYR, d4.DE00A001S15R as DE00A001SYRYR, d4.DL00A001S15R as DL00A001SYRYR, d4.DA00AS01S15R as DA00AS01SYRYR, d4.DB00AS01S15R as DB00AS01SYRYR, d4.DW00AS01S15R as DW00AS01SYRYR, d4.DH00AS01S15R as DH00AS01SYRYR, d4.DE00AS01S15R as DE00AS01SYRYR, d4.DL00AS01S15R as DL00AS01SYRYR, d4.DA00AR01S15R as DA00AR01SYRYR, d4.DB00AR01S15R as DB00AR01SYRYR, d4.DW00AR01S15R as DW00AR01SYRYR, d4.DH00AR01S15R as DH00AR01SYRYR, d4.DE00AR01S15R as DE00AR01SYRYR, d4.DL00AR01S15R as DL00AR01SYRYR, d4.DA00AM01S15R as DA00AM01SYRYR, d4.DB00AM01S15R as DB00AM01SYRYR, d4.DW00AM01S15R as DW00AM01SYRYR, d4.DH00AM01S15R as DH00AM01SYRYR, d4.DE00AM01S15R as DE00AM01SYRYR, d4.DL00AM01S15R as DL00AM01SYRYR, d4.DA00AW01S15R as DA00AW01SYRYR, d4.DB00AW01S15R as DB00AW01SYRYR, d4.DW00AW01S15R as DW00AW01SYRYR, d4.DH00AW01S15R as DH00AW01SYRYR, d4.DE00AW01S15R as DE00AW01SYRYR, d4.DL00AW01S15R as DL00AW01SYRYR, d4.DA00AC01S15R as DA00AC01SYRYR, d4.DB00AC01S15R as DB00AC01SYRYR, d4.DW00AC01S15R as DW00AC01SYRYR, d4.DH00AC01S15R as DH00AC01SYRYR, d4.DE00AC01S15R as DE00AC01SYRYR, d4.DL00AC01S15R as DL00AC01SYRYR";
            var dstaar5 = "d5.DA00A004215R as DA00A0042YRYR, d5.DB00A004215R as DB00A0042YRYR, d5.DW00A004215R as DW00A0042YRYR, d5.DH00A004215R as DH00A0042YRYR, d5.DE00A004215R as DE00A0042YRYR, d5.DL00A004215R as DL00A0042YRYR, d5.DA00AS04215R as DA00AS042YRYR, d5.DB00AS04215R as DB00AS042YRYR, d5.DW00AS04215R as DW00AS042YRYR, d5.DH00AS04215R as DH00AS042YRYR, d5.DE00AS04215R as DE00AS042YRYR, d5.DL00AS04215R as DL00AS042YRYR, d5.DA00AR04215R as DA00AR042YRYR, d5.DB00AR04215R as DB00AR042YRYR, d5.DW00AR04215R as DW00AR042YRYR, d5.DH00AR04215R as DH00AR042YRYR, d5.DE00AR04215R as DE00AR042YRYR, d5.DL00AR04215R as DL00AR042YRYR, d5.DA00AM04215R as DA00AM042YRYR, d5.DB00AM04215R as DB00AM042YRYR, d5.DW00AM04215R as DW00AM042YRYR, d5.DH00AM04215R as DH00AM042YRYR, d5.DE00AM04215R as DE00AM042YRYR, d5.DL00AM04215R as DL00AM042YRYR, d5.DA00AW04215R as DA00AW042YRYR, d5.DB00AW04215R as DB00AW042YRYR, d5.DW00AW04215R as DW00AW042YRYR, d5.DH00AW04215R as DH00AW042YRYR, d5.DE00AW04215R as DE00AW042YRYR, d5.DL00AW04215R as DL00AW042YRYR, d5.DA00AC04215R as DA00AC042YRYR, d5.DB00AC04215R as DB00AC042YRYR, d5.DW00AC04215R as DW00AC042YRYR, d5.DH00AC04215R as DH00AC042YRYR, d5.DE00AC04215R as DE00AC042YRYR, d5.DL00AC04215R as DL00AC042YRYR";
            var districtRecords = new List<Dictionary<string, object>>();
            Parallel.ForEach(new int[4] { 2013, 2014, 2015,2016 }, (i) =>
            {
                //for (var i = 2013; i <= 2015; i++)
            {
                var currentStaar4 = dstaar4.Replace("15R as", i.ToString().Substring(2) + "R as");
                var currentStaar5 = dstaar5.Replace("15R as", i.ToString().Substring(2) + "R as");
                if (i == 2013)
                {
                    currentStaar5 = currentStaar5.Replace("4213R as", "1213R as");
                    currentStaar4 = currentStaar4.Replace("1S13R as", "1513R as");
                }
                using (var connection = new SqlConnection(GetConnection(i)))
                {
                    connection.Open();
                    var query = string.Format("select {0}, {1} from DSTAAR4$ as d4 join DSTAAR5$ as d5 on d4.DISTRICT = d5.DISTRICT where d4.DISTRICT = @district", currentStaar4, currentStaar5);
                    var command = new SqlCommand(query, connection);
                    command.Parameters.AddWithValue("district", district);
                    var reader = command.ExecuteReader();
                    var currentRecords = reader.GetAllRecords();
                    if (currentRecords.Any())
                    {
                        currentRecords[0].Add("YEAR", i);
                        districtRecords.Add(currentRecords[0]);
                    }                    
                    connection.Close();
                }
                }
            });
            return districtRecords;
        }

        public List<Dictionary<string, object>> GetStudentAll(int year, string campus)
        {
            List<Dictionary<string, object>> campusRecord;
            string yearCode = (year - 1).ToString().Substring(2);
            using (SqlConnection connection = new SqlConnection(GetConnection(year)))
            {
                connection.Open();
                string query = "CB0GR14N as CB0GRYRYN, CB0GR14R as CB0GRYRYR, CA0GR14N as CA0GRYRYN, CA0GR14R as CA0GRYRYR, C30GR14N as C30GRYRYN, C30GR14R as C30GRYRYR, CH0GR14N as CH0GRYRYN, CH0GR14R as CH0GRYRYR, CI0GR14N as CI0GRYRYN, CI0GR14R as CI0GRYRYR, C40GR14N as C40GRYRYN, C40GR14R as C40GRYRYR, CS0GR14N as CS0GRYRYN, CS0GR14R as CS0GRYRYR, C20GR14N as C20GRYRYN, C20GR14R as C20GRYRYR, CW0GR14N as CW0GRYRYN, CW0GR14R as CW0GRYRYR";
                query += ", CPERRA1R, CPERRA2R, CPERRA3R, CPERRA4R, CPERRA5R, CPERRA6R, CPERRA7R, CPERRA8R, CPERRAKR, CPERSA1R, CPERSA2R, CPERSA3R, CPERSA4R, CPERSA5R, CPERSA6R, CPERSA7R, CPERSA8R, CPERSAKR, CPETDISC, CPETDISP, CPETBLAC, CPETBLAP, CPETALLC, CPETASIC, CPETASIP, CPETRSKC, CPETRSKP, CPETECOC, CPETECOP, CPETHISC, CPETHISP, CPETLEPC, CPETLEPP, CPETINDC, CPETINDP, CPETNEDC, CPETNEDP, CPETPCIC, CPETPCIP, CPETTWOC, CPETTWOP, CPETWHIC, CPETWHIP, CPETG01C, CPETG01P, CPETG02C, CPETG02P, CPETG03C, CPETG03P, CPETG04C, CPETG04P";
                query += ", CPETG05C, CPETG05P, CPETG06C, CPETG06P, CPETG07C, CPETG07P, CPETG08C, CPETG08P, CPETG09C, CPETG09P, CPETG10C, CPETG10P, CPETG11C, CPETG11P, CPETG12C, CPETG12P, CPETGEEC, CPETGEEP, CPETGKNC, CPETGKNP, CPETGPKC, CPETGPKP, CPETBILC, CPETBILP, CPETVOCC, CPETVOCP, CPETGIFC, CPETGIFP, CPETSPEC, CPETSPEP, CPEMALLC, CPEMALLP";
                query = query.Replace("14N as", yearCode + "N as");
                query = query.Replace("14R as", yearCode + "R as");
                SqlCommand command = new SqlCommand(string.Format("select CAMPUS, {0} from CSTUD$ where campus = @campus", query), connection);
                command.Parameters.AddWithValue("campus", campus);
                SqlDataReader reader = command.ExecuteReader();
                campusRecord = reader.GetAllRecords();
                connection.Close();
            }
            return campusRecord;
        }


        public List<Dictionary<string, object>> GetStaffAll(int year, string campus)
        {
            List<Dictionary<string, object>> campusRecord;
            using (SqlConnection connection = new SqlConnection(GetConnection(year)))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("select * from CSTAF$ where campus = @campus", connection);
                command.Parameters.AddWithValue("campus", campus);
                SqlDataReader reader = command.ExecuteReader();
                campusRecord = reader.GetAllRecords();
                connection.Close();
            }
            return campusRecord;
        }

        public List<Dictionary<string, object>> GetAdmissionAll(int year, string campus)
        {
            List<Dictionary<string, object>> campusRecord;
            string yearCode = (year - 1).ToString().Substring(2);
            using (SqlConnection connection = new SqlConnection(GetConnection(year)))
            {
                connection.Open();
                string percentageQuery = "CB0CT14R as CB0CTYRYR, CA0CT14R as CA0CTYRYR, CI0CT14R as CI0CTYRYR, C30CT14R as C30CTYRYR, CE0CT14R as CE0CTYRYR, CF0CT14R as CF0CTYRYR, CH0CT14R as CH0CTYRYR, CM0CT14R as CM0CTYRYR, C40CT14R as C40CTYRYR, C20CT14R as C20CTYRYR, CW0CT14R as CW0CTYRYR, CB0CC14R as CB0CCYRYR, CA0CC14R as CA0CCYRYR, CI0CC14R as CI0CCYRYR, C30CC14R as C30CCYRYR, CE0CC14R as CE0CCYRYR, CF0CC14R as CF0CCYRYR, CH0CC14R as CH0CCYRYR, CM0CC14R as CM0CCYRYR, C40CC14R as C40CCYRYR, C20CC14R as C20CCYRYR, CW0CC14R as CW0CCYRYR";
                string satQuery = "CB0CSA14R as CB0CSAYRYR, CA0CSA14R as CA0CSAYRYR, CI0CSA14R as CI0CSAYRYR, C30CSA14R as C30CSAYRYR, CE0CSA14R as CE0CSAYRYR, CF0CSA14R as CF0CSAYRYR, CH0CSA14R as CH0CSAYRYR, CM0CSA14R as CM0CSAYRYR, C40CSA14R as C40CSAYRYR, C20CSA14R as C20CSAYRYR, CW0CSA14R as CW0CSAYRYR, CB0CSE14R as CB0CSEYRYR, CA0CSE14R as CA0CSEYRYR, CI0CSE14R as CI0CSEYRYR, C30CSE14R as C30CSEYRYR, CE0CSE14R as CE0CSEYRYR, CF0CSE14R as CF0CSEYRYR, CH0CSE14R as CH0CSEYRYR, CM0CSE14R as CM0CSEYRYR, C40CSE14R as C40CSEYRYR, C20CSE14R as C20CSEYRYR, CW0CSE14R as CW0CSEYRYR, CB0CSM14R as CB0CSMYRYR, CA0CSM14R as CA0CSMYRYR, CI0CSM14R as CI0CSMYRYR, C30CSM14R as C30CSMYRYR, CE0CSM14R as CE0CSMYRYR, CF0CSM14R as CF0CSMYRYR, CH0CSM14R as CH0CSMYRYR, CM0CSM14R as CM0CSMYRYR, C40CSM14R as C40CSMYRYR, C20CSM14R as C20CSMYRYR, CW0CSM14R as CW0CSMYRYR";
                string actQuery = "CB0CAA14R as CB0CAAYRYR, CA0CAA14R as CA0CAAYRYR, CI0CAA14R as CI0CAAYRYR, C30CAA14R as C30CAAYRYR, CE0CAA14R as CE0CAAYRYR, CF0CAA14R as CF0CAAYRYR, CH0CAA14R as CH0CAAYRYR, CM0CAA14R as CM0CAAYRYR, C40CAA14R as C40CAAYRYR, C20CAA14R as C20CAAYRYR, CW0CAA14R as CW0CAAYRYR, CB0CAE14R as CB0CAEYRYR, CA0CAE14R as CA0CAEYRYR, CI0CAE14R as CI0CAEYRYR, C30CAE14R as C30CAEYRYR, CE0CAE14R as CE0CAEYRYR, CF0CAE14R as CF0CAEYRYR, CH0CAE14R as CH0CAEYRYR, CM0CAE14R as CM0CAEYRYR, C40CAE14R as C40CAEYRYR, C20CAE14R as C20CAEYRYR, CW0CAE14R as CW0CAEYRYR, CB0CAM14R as CB0CAMYRYR, CA0CAM14R as CA0CAMYRYR, CI0CAM14R as CI0CAMYRYR, C30CAM14R as C30CAMYRYR, CE0CAM14R as CE0CAMYRYR, CF0CAM14R as CF0CAMYRYR, CH0CAM14R as CH0CAMYRYR, CM0CAM14R as CM0CAMYRYR, C40CAM14R as C40CAMYRYR, C20CAM14R as C20CAMYRYR, CW0CAM14R as CW0CAMYRYR, CB0CAC14R as CB0CACYRYR, CA0CAC14R as CA0CACYRYR, CI0CAC14R as CI0CACYRYR, C30CAC14R as C30CACYRYR, CE0CAC14R as CE0CACYRYR, CF0CAC14R as CF0CACYRYR, CH0CAC14R as CH0CACYRYR, CM0CAC14R as CM0CACYRYR, C40CAC14R as C40CACYRYR, C20CAC14R as C20CACYRYR, CW0CAC14R as CW0CACYRYR";
                string query = percentageQuery + ", " + satQuery + ", " + actQuery;
                query = query.Replace("14R as", yearCode + "R as");
                SqlCommand command = new SqlCommand(string.Format("select CAMPUS, {0} from CCAD$ where campus = @campus", query), connection);
                command.Parameters.AddWithValue("campus", campus);
                SqlDataReader reader = command.ExecuteReader();
                campusRecord = reader.GetAllRecords();
                connection.Close();
            }
            return campusRecord;

        }


        public List<Dictionary<string, object>> GetC4LongAll(int year, string campus)
        {
            List<Dictionary<string, object>> campusRecord;
            string yearCode = (year - 1).ToString().Substring(2);
            using (SqlConnection connection = new SqlConnection(GetConnection(year)))
            {
                connection.Open();
                string query = "CBGC4X14R as CBGC4XYRYR, CAGC4X14R as CAGC4XYRYR, C3GC4X14R as C3GC4XYRYR, CRGC4X14R as CRGC4XYRYR, CEGC4X14R as CEGC4XYRYR, CFGC4X14R as CFGC4XYRYR, CHGC4X14R as CHGC4XYRYR, CLGC4X14R as CLGC4XYRYR, CMGC4X14R as CMGC4XYRYR, CIGC4X14R as CIGC4XYRYR, C4GC4X14R as C4GC4XYRYR, CSGC4X14R as CSGC4XYRYR, C2GC4X14R as C2GC4XYRYR, CWGC4X14R as CWGC4XYRYR, CBEC4X14R as CBEC4XYRYR, CAEC4X14R as CAEC4XYRYR, C3EC4X14R as C3EC4XYRYR, CREC4X14R as CREC4XYRYR, CEEC4X14R as CEEC4XYRYR, CFEC4X14R as CFEC4XYRYR, CHEC4X14R as CHEC4XYRYR, CLEC4X14R as CLEC4XYRYR, CMEC4X14R as CMEC4XYRYR, CIEC4X14R as CIEC4XYRYR, C4EC4X14R as C4EC4XYRYR, CSEC4X14R as CSEC4XYRYR, C2EC4X14R as C2EC4XYRYR, CWEC4X14R as CWEC4XYRYR, CBNC4X14R as CBNC4XYRYR, CANC4X14R as CANC4XYRYR, C3NC4X14R as C3NC4XYRYR, CRNC4X14R as CRNC4XYRYR, CENC4X14R as CENC4XYRYR, CFNC4X14R as CFNC4XYRYR, CHNC4X14R as CHNC4XYRYR, CLNC4X14R as CLNC4XYRYR, CMNC4X14R as CMNC4XYRYR, CINC4X14R as CINC4XYRYR, C4NC4X14R as C4NC4XYRYR, CSNC4X14R as CSNC4XYRYR, C2NC4X14R as C2NC4XYRYR, CWNC4X14R as CWNC4XYRYR, CBDC4X14R as CBDC4XYRYR, CADC4X14R as CADC4XYRYR, C3DC4X14R as C3DC4XYRYR, CRDC4X14R as CRDC4XYRYR, CEDC4X14R as CEDC4XYRYR, CFDC4X14R as CFDC4XYRYR, CHDC4X14R as CHDC4XYRYR, CLDC4X14R as CLDC4XYRYR, CMDC4X14R as CMDC4XYRYR, CIDC4X14R as CIDC4XYRYR, C4DC4X14R as C4DC4XYRYR, CSDC4X14R as CSDC4XYRYR, C2DC4X14R as C2DC4XYRYR, CWDC4X14R as CWDC4XYRYR, CB3C4X14R as CB3C4XYRYR, CA3C4X14R as CA3C4XYRYR, C33C4X14R as C33C4XYRYR, CR3C4X14R as CR3C4XYRYR, CE3C4X14R as CE3C4XYRYR, CF3C4X14R as CF3C4XYRYR, CH3C4X14R as CH3C4XYRYR, CL3C4X14R as CL3C4XYRYR, CM3C4X14R as CM3C4XYRYR, CI3C4X14R as CI3C4XYRYR, C43C4X14R as C43C4XYRYR, CS3C4X14R as CS3C4XYRYR, C23C4X14R as C23C4XYRYR, CW3C4X14R as CW3C4XYRYR, CB2C4X14R as CB2C4XYRYR, CA2C4X14R as CA2C4XYRYR, C32C4X14R as C32C4XYRYR, CR2C4X14R as CR2C4XYRYR, CE2C4X14R as CE2C4XYRYR, CF2C4X14R as CF2C4XYRYR, CH2C4X14R as CH2C4XYRYR, CL2C4X14R as CL2C4XYRYR, CM2C4X14R as CM2C4XYRYR, CI2C4X14R as CI2C4XYRYR, C42C4X14R as C42C4XYRYR, CS2C4X14R as CS2C4XYRYR, C22C4X14R as C22C4XYRYR, CW2C4X14R as CW2C4XYRYR, CBGC414R as CBGC4YRYR, CAGC414R as CAGC4YRYR, C3GC414R as C3GC4YRYR, CRGC414R as CRGC4YRYR, CEGC414R as CEGC4YRYR, CFGC414R as CFGC4YRYR, CHGC414R as CHGC4YRYR, CLGC414R as CLGC4YRYR, CMGC414R as CMGC4YRYR, CIGC414R as CIGC4YRYR, C4GC414R as C4GC4YRYR, CSGC414R as CSGC4YRYR, C2GC414R as C2GC4YRYR, CWGC414R as CWGC4YRYR";
                query = query.Replace("14R as", yearCode + "R as");
                SqlCommand command = new SqlCommand(string.Format("select CAMPUS, {0} from CCOMP4$ where campus = @campus", query), connection);
                command.Parameters.AddWithValue("campus", campus);
                SqlDataReader reader = command.ExecuteReader();
                campusRecord = reader.GetAllRecords();
                connection.Close();
            }
            return campusRecord;

        }


        public List<Dictionary<string, object>> GetStaarSubject(int year, string campus)
        {
            string yearCode = (year).ToString().Substring(2);
            List<Dictionary<string, object>> campusRecords = new List<Dictionary<string, object>>();

            string currentConnection = ConfigurationManager.ConnectionStrings["staar"].ConnectionString;
            using (SqlConnection connection = new SqlConnection(currentConnection))
            {
                connection.Open();
                string query = string.Format("SELECT Subject,Grade, sum(cast(d as float)) as d, sum(cast(satis_ph1_nm as float)) as satis_ph1_nm, sum(cast(satis_rec_nm as float)) as satis_rec_nm FROM staar_campus where CAMPUS = @campus AND year = @year group by Subject,Grade");
                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("campus", campus);
                command.Parameters.AddWithValue("year", yearCode);
                SqlDataReader reader = command.ExecuteReader();
                campusRecords = reader.GetAllRecords();

                connection.Close();
            }
            return campusRecords;
        }

        public List<Dictionary<string, object>> GetDemograhicsTime(int year, string campus)
        {
            List<Dictionary<string, object>> campusRecord;
            string currentConnection = ConfigurationManager.ConnectionStrings["tapr_longitudinal"].ConnectionString;
            using (SqlConnection connection = new SqlConnection(currentConnection))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("select * from Demographics_campus$ where CAMPUS = @campus AND YEAR IS NOT NULL", connection);
                command.Parameters.AddWithValue("campus", campus);
                SqlDataReader reader = command.ExecuteReader();
                campusRecord = reader.GetAllRecords();
                connection.Close();
            }
            return campusRecord;
        }

        public List<Dictionary<string, object>> GetMobilityTime(int year, string campus)
        {
            List<Dictionary<string, object>> campusRecord;
            string currentConnection = ConfigurationManager.ConnectionStrings["tapr_longitudinal"].ConnectionString;
            using (SqlConnection connection = new SqlConnection(currentConnection))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("select * from Mobility_campus$ where CAMPUS = @campus AND YEAR IS NOT NULL", connection);
                command.Parameters.AddWithValue("campus", campus);
                SqlDataReader reader = command.ExecuteReader();
                campusRecord = reader.GetAllRecords();
                connection.Close();
            }
            return campusRecord;
        }

        public List<Dictionary<string, object>> GetAttendanceTime(int year, string campus)
        {
            List<Dictionary<string, object>> campusRecord;
            string currentConnection = ConfigurationManager.ConnectionStrings["tapr_longitudinal"].ConnectionString;
            using (SqlConnection connection = new SqlConnection(currentConnection))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("select CAMPUS, YEAR, [CA0AT*R] AS CA0ATSTR from Attendance_campus$ where CAMPUS = @campus AND YEAR IS NOT NULL", connection);
                command.Parameters.AddWithValue("campus", campus);
                SqlDataReader reader = command.ExecuteReader();
                campusRecord = reader.GetAllRecords();
                connection.Close();
            }
            return campusRecord;
        }


        public List<Dictionary<string, object>> GetDropoutAll(int year, string campus)
        {
            List<Dictionary<string, object>> campusRecord;
            string yearCode = (year - 1).ToString().Substring(2);
            using (SqlConnection connection = new SqlConnection(GetConnection(year)))
            {
                connection.Open();
                string attendanceQuery = "CB0AT14R as CB0ATYRYR, CA0AT14R as CA0ATYRYR, C30AT14R as C30ATYRYR, CR0AT14R as CR0ATYRYR, CE0AT14R as CE0ATYRYR, CF0AT14R as CF0ATYRYR, CH0AT14R as CH0ATYRYR, CL0AT14R as CL0ATYRYR, CM0AT14R as CM0ATYRYR, CI0AT14R as CI0ATYRYR, C40AT14R as C40ATYRYR, CS0AT14R as CS0ATYRYR, C20AT14R as C20ATYRYR, CW0AT14R as CW0ATYRYR";
                string dropout7Query = "CB0708DR14R as CB0708DRYRYR, CA0708DR14R as CA0708DRYRYR, C30708DR14R as C30708DRYRYR, CR0708DR14R as CR0708DRYRYR, CE0708DR14R as CE0708DRYRYR, CF0708DR14R as CF0708DRYRYR, CH0708DR14R as CH0708DRYRYR, CL0708DR14R as CL0708DRYRYR, CM0708DR14R as CM0708DRYRYR, CI0708DR14R as CI0708DRYRYR, C40708DR14R as C40708DRYRYR, CS0708DR14R as CS0708DRYRYR, C20708DR14R as C20708DRYRYR, CW0708DR14R as CW0708DRYRYR";
                string dropout9Query = "CB0912DR14R as CB0912DRYRYR, CA0912DR14R as CA0912DRYRYR, C30912DR14R as C30912DRYRYR, CR0912DR14R as CR0912DRYRYR, CE0912DR14R as CE0912DRYRYR, CF0912DR14R as CF0912DRYRYR, CH0912DR14R as CH0912DRYRYR, CL0912DR14R as CL0912DRYRYR, CM0912DR14R as CM0912DRYRYR, CI0912DR14R as CI0912DRYRYR, C40912DR14R as C40912DRYRYR, CS0912DR14R as CS0912DRYRYR, C20912DR14R as C20912DRYRYR, CW0912DR14R as CW0912DRYRYR";
                string miscQuery = "CAHEE14R as CAHEEYRYR, CAHEC14R as CAHECYRYR";
                string query = attendanceQuery + ", " + dropout7Query + ", " + dropout9Query + ", " + miscQuery;
                query = query.Replace("14R as", yearCode + "R as");
                SqlCommand command = new SqlCommand(string.Format("select CAMPUS, {0} from COTHR$ where campus = @campus", query), connection);
                command.Parameters.AddWithValue("campus", campus);
                SqlDataReader reader = command.ExecuteReader();
                campusRecord = reader.GetAllRecords();
                connection.Close();
            }
            return campusRecord;

        }

        public List<Dictionary<string, object>> GetAPIBAll(int year, string campus)
        {
            List<Dictionary<string, object>> campusRecord;
            string yearCode = (year - 1).ToString().Substring(2);
            using (SqlConnection connection = new SqlConnection(GetConnection(year)))
            {
                connection.Open();
                string allSubQuery = "CB0BTA14R as CB0BTAYRYR, CA0BTA14R as CA0BTAYRYR, C30BTA14R as C30BTAYRYR, CE0BTA14R as CE0BTAYRYR, CF0BTA14R as CF0BTAYRYR, CH0BTA14R as CH0BTAYRYR, CM0BTA14R as CM0BTAYRYR, CI0BTA14R as CI0BTAYRYR, C40BTA14R as C40BTAYRYR, C20BTA14R as C20BTAYRYR, CW0BTA14R as CW0BTAYRYR, CB0BKA14R as CB0BKAYRYR, CA0BKA14R as CA0BKAYRYR, C30BKA14R as C30BKAYRYR, CE0BKA14R as CE0BKAYRYR, CF0BKA14R as CF0BKAYRYR, CH0BKA14R as CH0BKAYRYR, CM0BKA14R as CM0BKAYRYR, CI0BKA14R as CI0BKAYRYR, C40BKA14R as C40BKAYRYR, C20BKA14R as C20BKAYRYR, CW0BKA14R as CW0BKAYRYR";
                string elaQuery = "CB0BTE14R as CB0BTEYRYR, CA0BTE14R as CA0BTEYRYR, C30BTE14R as C30BTEYRYR, CE0BTE14R as CE0BTEYRYR, CF0BTE14R as CF0BTEYRYR, CH0BTE14R as CH0BTEYRYR, CM0BTE14R as CM0BTEYRYR, CI0BTE14R as CI0BTEYRYR, C40BTE14R as C40BTEYRYR, C20BTE14R as C20BTEYRYR, CW0BTE14R as CW0BTEYRYR, CB0BKE14R as CB0BKEYRYR, CA0BKE14R as CA0BKEYRYR, C30BKE14R as C30BKEYRYR, CE0BKE14R as CE0BKEYRYR, CF0BKE14R as CF0BKEYRYR, CH0BKE14R as CH0BKEYRYR, CM0BKE14R as CM0BKEYRYR, CI0BKE14R as CI0BKEYRYR, C40BKE14R as C40BKEYRYR, C20BKE14R as C20BKEYRYR, CW0BKE14R as CW0BKEYRYR";
                string mathQuery = "CB0BTM14R as CB0BTMYRYR, CA0BTM14R as CA0BTMYRYR, C30BTM14R as C30BTMYRYR, CE0BTM14R as CE0BTMYRYR, CF0BTM14R as CF0BTMYRYR, CH0BTM14R as CH0BTMYRYR, CM0BTM14R as CM0BTMYRYR, CI0BTM14R as CI0BTMYRYR, C40BTM14R as C40BTMYRYR, C20BTM14R as C20BTMYRYR, CW0BTM14R as CW0BTMYRYR, CB0BKM14R as CB0BKMYRYR, CA0BKM14R as CA0BKMYRYR, C30BKM14R as C30BKMYRYR, CE0BKM14R as CE0BKMYRYR, CF0BKM14R as CF0BKMYRYR, CH0BKM14R as CH0BKMYRYR, CM0BKM14R as CM0BKMYRYR, CI0BKM14R as CI0BKMYRYR, C40BKM14R as C40BKMYRYR, C20BKM14R as C20BKMYRYR, CW0BKM14R as CW0BKMYRYR";
                string scienceQuery = "CB0BTC14R as CB0BTCYRYR, CA0BTC14R as CA0BTCYRYR, C30BTC14R as C30BTCYRYR, CE0BTC14R as CE0BTCYRYR, CF0BTC14R as CF0BTCYRYR, CH0BTC14R as CH0BTCYRYR, CM0BTC14R as CM0BTCYRYR, CI0BTC14R as CI0BTCYRYR, C40BTC14R as C40BTCYRYR, C20BTC14R as C20BTCYRYR, CW0BTC14R as CW0BTCYRYR, CB0BKC14R as CB0BKCYRYR, CA0BKC14R as CA0BKCYRYR, C30BKC14R as C30BKCYRYR, CE0BKC14R as CE0BKCYRYR, CF0BKC14R as CF0BKCYRYR, CH0BKC14R as CH0BKCYRYR, CM0BKC14R as CM0BKCYRYR, CI0BKC14R as CI0BKCYRYR, C40BKC14R as C40BKCYRYR, C20BKC14R as C20BKCYRYR, CW0BKC14R as CW0BKCYRYR";
                string socialQuery = "CB0BTS14R as CB0BTSYRYR, CA0BTS14R as CA0BTSYRYR, C30BTS14R as C30BTSYRYR, CE0BTS14R as CE0BTSYRYR, CF0BTS14R as CF0BTSYRYR, CH0BTS14R as CH0BTSYRYR, CM0BTS14R as CM0BTSYRYR, CI0BTS14R as CI0BTSYRYR, C40BTS14R as C40BTSYRYR, C20BTS14R as C20BTSYRYR, CW0BTS14R as CW0BTSYRYR, CB0BKS14R as CB0BKSYRYR, CA0BKS14R as CA0BKSYRYR, C30BKS14R as C30BKSYRYR, CE0BKS14R as CE0BKSYRYR, CF0BKS14R as CF0BKSYRYR, CH0BKS14R as CH0BKSYRYR, CM0BKS14R as CM0BKSYRYR, CI0BKS14R as CI0BKSYRYR, C40BKS14R as C40BKSYRYR, C20BKS14R as C20BKSYRYR, CW0BKS14R as CW0BKSYRYR";
                string query = allSubQuery + ", " + elaQuery + ", " + mathQuery + ", " + scienceQuery + ", " + socialQuery;
                query = query.Replace("14R as", yearCode + "R as");
                SqlCommand command = new SqlCommand(string.Format("select CAMPUS, {0} from CAPIB$ where campus = @campus", query), connection);
                command.Parameters.AddWithValue("campus", campus);
                SqlDataReader reader = command.ExecuteReader();
                campusRecord = reader.GetAllRecords();
                connection.Close();
            }
            return campusRecord;

        }

        public List<Dictionary<string, object>> GetCCReadyAll(int year, string campus)
        {
            List<Dictionary<string, object>> campusRecord;
            string yearCode = (year - 1).ToString().Substring(2);
            using (SqlConnection connection = new SqlConnection(GetConnection(year)))
            {
                connection.Open();
                string subQuery = "CBCRR14R as CBCRRYRYR, CACRR14R as CACRRYRYR, C3CRR14R as C3CRRYRYR, CRCRR14R as CRCRRYRYR, CECRR14R as CECRRYRYR, CFCRR14R as CFCRRYRYR, CHCRR14R as CHCRRYRYR, CLCRR14R as CLCRRYRYR, CMCRR14R as CMCRRYRYR, CICRR14R as CICRRYRYR, C4CRR14R as C4CRRYRYR, CSCRR14R as CSCRRYRYR, C2CRR14R as C2CRRYRYR, CWCRR14R as CWCRRYRYR, CBCRM14R as CBCRMYRYR, CACRM14R as CACRMYRYR, C3CRM14R as C3CRMYRYR, CRCRM14R as CRCRMYRYR, CECRM14R as CECRMYRYR, CFCRM14R as CFCRMYRYR, CHCRM14R as CHCRMYRYR, CLCRM14R as CLCRMYRYR, CMCRM14R as CMCRMYRYR, CICRM14R as CICRMYRYR, C4CRM14R as C4CRMYRYR, CSCRM14R as CSCRMYRYR, C2CRM14R as C2CRMYRYR, CWCRM14R as CWCRMYRYR";
                string bothQuery = "CBCRB14R as CBCRBYRYR, CACRB14R as CACRBYRYR, C3CRB14R as C3CRBYRYR, CRCRB14R as CRCRBYRYR, CECRB14R as CECRBYRYR, CFCRB14R as CFCRBYRYR, CHCRB14R as CHCRBYRYR, CLCRB14R as CLCRBYRYR, CMCRB14R as CMCRBYRYR, CICRB14R as CICRBYRYR, C4CRB14R as C4CRBYRYR, CSCRB14R as CSCRBYRYR, C2CRB14R as C2CRBYRYR, CWCRB14R as CWCRBYRYR";
                string careerQuery = "CB0GP14R as CB0GPYRYR, CA0GP14R as CA0GPYRYR, C30GP14R as C30GPYRYR, CR0GP14R as CR0GPYRYR, CE0GP14R as CE0GPYRYR, CF0GP14R as CF0GPYRYR, CH0GP14R as CH0GPYRYR, CL0GP14R as CL0GPYRYR, CM0GP14R as CM0GPYRYR, CI0GP14R as CI0GPYRYR, C40GP14R as C40GPYRYR, CS0GP14R as CS0GPYRYR, C20GP14R as C20GPYRYR, CW0GP14R as CW0GPYRYR";
                string cteQuery = "CB0GV14R as CB0GVYRYR, CA0GV14R as CA0GVYRYR, C30GV14R as C30GVYRYR, CR0GV14R as CR0GVYRYR, CE0GV14R as CE0GVYRYR, CF0GV14R as CF0GVYRYR, CH0GV14R as CH0GVYRYR, CL0GV14R as CL0GVYRYR, CM0GV14R as CM0GVYRYR, CI0GV14R as CI0GVYRYR, C40GV14R as C40GVYRYR, CS0GV14R as CS0GVYRYR, C20GV14R as C20GVYRYR, CW0GV14R as CW0GVYRYR";
                string query = subQuery + ", " + bothQuery + ", " + careerQuery + ", " + cteQuery;
                query = query.Replace("14R as", yearCode + "R as");
                SqlCommand command = new SqlCommand(string.Format("select CAMPUS, {0} from CCOLL$ where campus = @campus", query), connection);
                command.Parameters.AddWithValue("campus", campus);
                SqlDataReader reader = command.ExecuteReader();
                campusRecord = reader.GetAllRecords();
                connection.Close();
            }
            return campusRecord;

        }

        public List<Dictionary<string, object>> GetNewStaarSubject(int year, string campus)
        {
            int camp = int.Parse(campus.Replace("'", ""));
            List<Dictionary<string, object>> campusRecords = new List<Dictionary<string, object>>();

            string currentConnection = ConfigurationManager.ConnectionStrings["staar"].ConnectionString;
            using (SqlConnection connection = new SqlConnection(currentConnection))
            {
                connection.Open();
                string query = string.Format("select CAMPUS, Subject, Grade, d, satis_ph1_nm, satis_rec_nm from staar_campus where REPLACE(CAMPUS, '''', '') = @campus", year);
                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("campus", camp);
                SqlDataReader reader = command.ExecuteReader();
                campusRecords = reader.GetAllRecords();
                connection.Close();
            }
            return campusRecords;
        }

        public List<Dictionary<string, object>> GetStaarGrades(int year, string campus, string grade = "", string subject = "")
        {
            string state = "'1";
            string yearCode = (year).ToString().Substring(2);
            List<Dictionary<string, object>> districtRecords = new List<Dictionary<string, object>>();
            string currentConnection = ConfigurationManager.ConnectionStrings["staar"].ConnectionString;
            using (SqlConnection connection = new SqlConnection(currentConnection))
            {
                connection.Open();
                string query = string.Format(@"SELECT demo, sum(cast(d as float)) as d, sum(cast(rs as float))  as rs, sum(cast(satis_ph1_nm as float)) as satis_ph1_nm, sum(cast(satis_rec_nm as float)) as satis_rec_nm 
                                            FROM staar_campus where CAMPUS = @campus 
                                            AND demo in ('ecoy','econ','ethw','ethb','ethh','lepc') AND year = @year AND (@grade = '' OR grade = @grade) AND (@subject = '' OR subject = @subject) AND Language = 'English' group by demo");
                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.Add("campus", System.Data.SqlDbType.VarChar);
                command.Parameters["campus"].Value = campus;
                //command.Parameters.AddWithValue("campus", camp);
                command.Parameters.AddWithValue("state", state);
                command.Parameters.AddWithValue("year", yearCode);
                command.Parameters.AddWithValue("grade", grade);
                command.Parameters.AddWithValue("subject", subject);
                SqlDataReader reader = command.ExecuteReader();
                districtRecords = reader.GetAllRecords();
                connection.Close();
            }
            return districtRecords;
        }
        public List<Dictionary<string, object>> GetGradesSubject(int year, string grade)
        {
            string yearCode = (year).ToString().Substring(2);
            List<Dictionary<string, object>> districtRecords = new List<Dictionary<string, object>>();
            string currentConnection = ConfigurationManager.ConnectionStrings["staar"].ConnectionString;
            using (SqlConnection connection = new SqlConnection(currentConnection))
            {
                connection.Open();
                string query = string.Format("SELECT Subject, Grade, SubjectTitle FROM campus_subject WHERE Year = @year");
                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("grade", grade);
                command.Parameters.AddWithValue("year", yearCode);
                SqlDataReader reader = command.ExecuteReader();
                districtRecords = reader.GetAllRecords();
                connection.Close();
            }
            return districtRecords;
        }

        [HttpPost]
        public bool AddCampusAnalytics(CampusAnalytics campusAnalytics)
        {
            string currentConnection = ConfigurationManager.ConnectionStrings["commit"].ConnectionString;
            using (SqlConnection connection = new SqlConnection(currentConnection))
            {
                connection.Open();
                string query = string.Format("INSERT INTO CampusAnalytics(COUNTRY,COUNTRYCODE,DISTRICT,DNAME,CAMPUS,CNAME) VALUES (@country,@countryCode,@district,@dName,@campus,@cName)");
                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("country", campusAnalytics.Country);
                command.Parameters.AddWithValue("countryCode", campusAnalytics.CountryCode);
                command.Parameters.AddWithValue("district", campusAnalytics.District);
                command.Parameters.AddWithValue("dName", campusAnalytics.DName);
                command.Parameters.AddWithValue("campus", campusAnalytics.Campus);
                command.Parameters.AddWithValue("cName", campusAnalytics.CName);
                command.ExecuteNonQuery();
                connection.Close();
            }
            return true;
        }
    }
}



