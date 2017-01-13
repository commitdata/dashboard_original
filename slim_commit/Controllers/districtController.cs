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
using System.Text;

namespace slim_commit.Controllers
{
    public class districtController : ApiController
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
                SqlCommand command = new SqlCommand("select distinct CNTYNAME, COUNTY from DREF$ order by CNTYNAME", connection);
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
                SqlCommand command;
                if (!string.IsNullOrEmpty(county))
                {
                    command = new SqlCommand("select distinct DISTNAME, DISTRICT from DREF$  where COUNTY = @county order by DISTNAME", connection);
                    command.Parameters.AddWithValue("county", county);
                }
                else
                {
                    command = new SqlCommand("select distinct DISTNAME, DISTRICT from DREF$ order by DISTNAME", connection);
                }

                SqlDataReader reader = command.ExecuteReader();
                counties = reader.GetAllRecords();
                connection.Close();
            }
            return counties;
        }

        public List<Dictionary<string, object>> GetStudentInfo(int year, string district)
        {
            List<Dictionary<string, object>> campusRecord;
            using (SqlConnection connection = new SqlConnection(GetConnection(year)))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("select DISTRICT, DPEMALLP, DPETALLC, DPETECOP, DPETLEPP  from DSTUD$ where DISTRICT = @district", connection);
                command.Parameters.AddWithValue("district", district);
                SqlDataReader reader = command.ExecuteReader();
                campusRecord = reader.GetAllRecords();
                connection.Close();
            }
            return campusRecord;
        }


        public List<Dictionary<string, object>> GetCollegeAdmissions(int year, string district)
        {
            string state = "'1";
            string yearCode = (year - 1).ToString().Substring(2);
            List<Dictionary<string, object>> districtRecord;
            using (SqlConnection connection = new SqlConnection(GetConnection(year)))
            {
                connection.Open();
                string dcad = "DA0CT14R as DA0CTYRYR, DB0CT14R as DB0CTYRYR, DH0CT14R as DH0CTYRYR, DW0CT14R as DW0CTYRYR, DA0CC14R as DA0CCYRYR, DB0CC14R as DB0CCYRYR, DH0CC14R as DH0CCYRYR, DW0CC14R as DW0CCYRYR, DA0CSA14R as DA0CSAYRYR, DB0CSA14R as DB0CSAYRYR, DH0CSA14R as DH0CSAYRYR, DW0CSA14R as DW0CSAYRYR, DA0CAA14R as DA0CAAYRYR, DB0CAA14R as DB0CAAYRYR, DH0CAA14R as DH0CAAYRYR, DW0CAA14R as DW0CAAYRYR";
                string query = string.Format("select DISTRICT, {0} from DCAD$ where district = @district OR district = @state", dcad);
                query = query.Replace("14R as", yearCode + "R as");
                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("district", district);
                command.Parameters.AddWithValue("state", state);
                SqlDataReader reader = command.ExecuteReader();
                districtRecord = reader.GetAllRecords();
                connection.Close();
            }
            return districtRecord;
        }

        public List<Dictionary<string, object>> GetStaarAllGrades(int year, string district)
        {
            string state = "'1";
            string yearCode = (year).ToString().Substring(2);
            string dstaar4 = "d4.DA00A001S15R as DA00A001SYRYR, d4.DE00A001S15R as DE00A001SYRYR, d4.DB00A001S15R as DB00A001SYRYR, d4.DH00A001S15R as DH00A001SYRYR, d4.DW00A001S15R as DW00A001SYRYR, d4.DL00A001S15R as DL00A001SYRYR, d4.DA00AR01S15R as DA00AR01SYRYR, d4.DE00AR01S15R as DE00AR01SYRYR, d4.DB00AR01S15R as DB00AR01SYRYR, d4.DH00AR01S15R as DH00AR01SYRYR, d4.DW00AR01S15R as DW00AR01SYRYR, d4.DL00AR01S15R as DL00AR01SYRYR, d4.DA00AM01S15R as DA00AM01SYRYR, d4.DE00AM01S15R as DE00AM01SYRYR, d4.DB00AM01S15R as DB00AM01SYRYR, d4.DH00AM01S15R as DH00AM01SYRYR, d4.DW00AM01S15R as DW00AM01SYRYR, d4.DL00AM01S15R as DL00AM01SYRYR, d4.DA00AC01S15R as DA00AC01SYRYR, d4.DE00AC01S15R as DE00AC01SYRYR, d4.DB00AC01S15R as DB00AC01SYRYR, d4.DH00AC01S15R as DH00AC01SYRYR, d4.DW00AC01S15R as DW00AC01SYRYR, d4.DL00AC01S15R as DL00AC01SYRYR";
            string dstaar5 = "d5.DA00A004215R as DA00A0042YRYR, d5.DE00A004215R as DE00A0042YRYR, d5.DB00A004215R as DB00A0042YRYR, d5.DH00A004215R as DH00A0042YRYR, d5.DW00A004215R as DW00A0042YRYR, d5.DL00A004215R as DL00A0042YRYR, d5.DA00AR04215R as DA00AR042YRYR, d5.DE00AR04215R as DE00AR042YRYR, d5.DB00AR04215R as DB00AR042YRYR, d5.DH00AR04215R as DH00AR042YRYR, d5.DW00AR04215R as DW00AR042YRYR, d5.DL00AR04215R as DL00AR042YRYR, d5.DA00AM04215R as DA00AM042YRYR, d5.DE00AM04215R as DE00AM042YRYR, d5.DB00AM04215R as DB00AM042YRYR, d5.DH00AM04215R as DH00AM042YRYR, d5.DW00AM04215R as DW00AM042YRYR, d5.DL00AM04215R as DL00AM042YRYR, d5.DA00AC04215R as DA00AC042YRYR, d5.DE00AC04215R as DE00AC042YRYR, d5.DB00AC04215R as DB00AC042YRYR, d5.DH00AC04215R as DH00AC042YRYR, d5.DW00AC04215R as DW00AC042YRYR, d5.DL00AC04215R as DL00AC042YRYR";

            string currentStaar4 = dstaar4.Replace("15R as", yearCode + "R as");
            string currentStaar5 = dstaar5.Replace("15R as", yearCode + "R as");
            if (year == 2013)
            {
                currentStaar5 = currentStaar5.Replace("4213R as", "1213R as");
                currentStaar4 = currentStaar4.Replace("1S13R as", "1513R as");
            }

            List<Dictionary<string, object>> districtRecords = new List<Dictionary<string, object>>();
            using (SqlConnection connection = new SqlConnection(GetConnection(year)))
            {
                connection.Open();
                string query = string.Format("select d4.DISTRICT as DISTRICT, {0}, {1} from DSTAAR4$ as d4 join DSTAAR5$ as d5 on d4.DISTRICT = d5.DISTRICT where d4.DISTRICT = @district OR d4.DISTRICT = @state", currentStaar4, currentStaar5);
                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("district", district);
                command.Parameters.AddWithValue("state", state);
                SqlDataReader reader = command.ExecuteReader();
                districtRecords = reader.GetAllRecords();
                connection.Close();
            }
            return districtRecords;
        }

        public List<Dictionary<string, object>> GetStaarAllSubjectGrades(int year, string district)
        {
            List<Dictionary<string, object>> districtRecords = new List<Dictionary<string, object>>();

            string currentConnection = ConfigurationManager.ConnectionStrings["staar"].ConnectionString;
            using (SqlConnection connection = new SqlConnection(currentConnection))
            {
                connection.Open();
                string query = string.Format("SELECT District,Subject,Grade, sum(cast(d as float)) as d, sum(cast(satis_ph1_nm as float)) as satis_ph1_nm, sum(cast(satis_rec_nm as float)) as satis_rec_nm FROM staar_district where (DISTRICT = @district OR DISTRICT ='''1') AND year = @year group by Subject,Grade,District");
                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("district", district);
                command.Parameters.AddWithValue("year", year.ToString().Substring(2));
                using (SqlDataReader reader = command.ExecuteReader())
                {
                    districtRecords = reader.GetAllRecords();
                }
                connection.Close();
            }
            return districtRecords;
        }

        public List<Dictionary<string, object>> GetStaarAllSubjectGradesNew(int year, string district)
        {
            List<Dictionary<string, object>> districtRecords = new List<Dictionary<string, object>>();

            string currentConnection = ConfigurationManager.ConnectionStrings["staar_" + year].ConnectionString;
            using (SqlConnection connection = new SqlConnection(currentConnection))
            {
                connection.Open();

                var statis_ph1_nm = year == 2016 ? "satis_lvl2_nm" : "satis_ph1_nm";

                var alias = year == 2016 ? " as satis_ph1_nm" : "";

                string query = string.Format(@"SELECT [District],[Subject],[Grade],d,{0} {1}, satis_rec_nm FROM (select  [district],[grade],[subject], 
cast([all] as float) as [all],[category] from [dbo].[{2}_staar_district-state_wide_merged] 
where (DISTRICT = @district  OR DISTRICT = '''1') ) up 
PIVOT (sum([all]) FOR [category] IN (d,satis_rec_nm, {0})) AS Cat ORDER BY [district],[grade],[subject]", statis_ph1_nm, alias, year);

                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("district", district);
                using (SqlDataReader reader = command.ExecuteReader())
                {
                    districtRecords = reader.GetAllRecords();
                }
                connection.Close();
            }
            return districtRecords;
        }

        public List<Dictionary<string, object>> GetStudentAll(int year, string district)
        {
            List<Dictionary<string, object>> districtRecord;
            string yearCode = (year - 1).ToString().Substring(2);
            using (SqlConnection connection = new SqlConnection(GetConnection(year)))
            {
                connection.Open();
                string query = "DB0GR14N as DB0GRYRYN, DB0GR14R as DB0GRYRYR, DA0GR14N as DA0GRYRYN, DA0GR14R as DA0GRYRYR, D30GR14N as D30GRYRYN, D30GR14R as D30GRYRYR, DH0GR14N as DH0GRYRYN, DH0GR14R as DH0GRYRYR, DI0GR14N as DI0GRYRYN, DI0GR14R as DI0GRYRYR, D40GR14N as D40GRYRYN, D40GR14R as D40GRYRYR, DS0GR14N as DS0GRYRYN, DS0GR14R as DS0GRYRYR, D20GR14N as D20GRYRYN, D20GR14R as D20GRYRYR, DW0GR14N as DW0GRYRYN, DW0GR14R as DW0GRYRYR";
                query += ", DPERRA1R, DPERRA2R, DPERRA3R, DPERRA4R, DPERRA5R, DPERRA6R, DPERRA7R, DPERRA8R, DPERRAKR, DPERSA1R, DPERSA2R, DPERSA3R, DPERSA4R, DPERSA5R, DPERSA6R, DPERSA7R, DPERSA8R, DPERSAKR, DPETDISC, DPETDISP, DPETBLAC, DPETBLAP, DPETALLC, DPETASIC, DPETASIP, DPETRSKC, DPETRSKP, DPETECOC, DPETECOP, DPETHISC, DPETHISP, DPETLEPC, DPETLEPP, DPETINDC, DPETINDP, DPETNEDC, DPETNEDP, DPETPCIC, DPETPCIP, DPETTWOC, DPETTWOP, DPETWHIC, DPETWHIP, DPETG01C, DPETG01P, DPETG02C, DPETG02P, DPETG03C, DPETG03P, DPETG04C, DPETG04P";
                query += ", DPETG05C, DPETG05P, DPETG06C, DPETG06P, DPETG07C, DPETG07P, DPETG08C, DPETG08P, DPETG09C, DPETG09P, DPETG10C, DPETG10P, DPETG11C, DPETG11P, DPETG12C, DPETG12P, DPETGEEC, DPETGEEP, DPETGKNC, DPETGKNP, DPETGPKC, DPETGPKP, DPETBILC, DPETBILP, DPETVOCC, DPETVOCP, DPETGIFC, DPETGIFP, DPETSPEC, DPETSPEP, DPEMALLC, DPEMALLP";
                query = query.Replace("14N as", yearCode + "N as");
                query = query.Replace("14R as", yearCode + "R as");
                SqlCommand command = new SqlCommand(string.Format("select DISTRICT, {0} from DSTUD$ where district = @district", query), connection);
                command.Parameters.AddWithValue("district", district);
                SqlDataReader reader = command.ExecuteReader();
                districtRecord = reader.GetAllRecords();
                connection.Close();
            }
            return districtRecord;
        }

        public List<Dictionary<string, object>> GetStaffInfo(int year, string district)
        {
            List<Dictionary<string, object>> districtRecord;
            using (SqlConnection connection = new SqlConnection(GetConnection(year)))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("select DISTRICT, DPSTKIDR, DPSTTOSA, DPSTEXPA from DSTAF$ where DISTRICT = @district", connection);
                command.Parameters.AddWithValue("district", district);
                SqlDataReader reader = command.ExecuteReader();
                districtRecord = reader.GetAllRecords();
                connection.Close();
            }
            return districtRecord;
        }

        public List<Dictionary<string, object>> GetStaffExperience(int year, string district)
        {
            List<Dictionary<string, object>> districtRecord;
            string currentConnection = ConfigurationManager.ConnectionStrings["tapr_longitudinal"].ConnectionString;
            using (SqlConnection connection = new SqlConnection(currentConnection))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("select * from TeacherExperience_district$ where DISTRICT = @district", connection);
                command.Parameters.AddWithValue("district", district);
                SqlDataReader reader = command.ExecuteReader();
                districtRecord = reader.GetAllRecords();
                connection.Close();
            }
            return districtRecord;
        }

        public List<Dictionary<string, object>> GetDemograhicsTime(int year, string district)
        {
            List<Dictionary<string, object>> districtRecord;
            string currentConnection = ConfigurationManager.ConnectionStrings["tapr_longitudinal"].ConnectionString;
            using (SqlConnection connection = new SqlConnection(currentConnection))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("select * from Demographics_district$ where DISTRICT = @district", connection);
                command.Parameters.AddWithValue("district", district);
                SqlDataReader reader = command.ExecuteReader();
                districtRecord = reader.GetAllRecords();
                connection.Close();
            }
            return districtRecord;
        }

        public List<Dictionary<string, object>> GetGraduationRates(int year, string district)
        {
            List<Dictionary<string, object>> districtRecords = new List<Dictionary<string, object>>();

            var yr = year;
            //if (year >= 2016) yr = 2015;
            string yearCode = (yr - 1).ToString().Substring(2);

            string state = "'1";
            using (SqlConnection connection = new SqlConnection(GetConnection(year)))
            {
                connection.Open();
                string query = "DAGC4X14R as DAGC4XYRYR, DBGC4X14R as DBGC4XYRYR, DHGC4X14R as DHGC4XYRYR, DWGC4X14R as DWGC4XYRYR, DLGC4X14R as DLGC4XYRYR, DEGC4X14R as DEGC4XYRYR";
                query = query.Replace("14R as", yearCode + "R as");
                if (year == 2016) query = query.Replace("4X1", "41");
                SqlCommand command = new SqlCommand(string.Format("select DISTRICT, {0} from DCOMP4$ where district = @district OR district = @state", query), connection);
                command.Parameters.AddWithValue("district", district);
                command.Parameters.AddWithValue("state", state);
                SqlDataReader reader = command.ExecuteReader();
                districtRecords = reader.GetAllRecords();
                connection.Close();
            }
            return districtRecords;
        }

        public List<Dictionary<string, object>> GetStaarSubject(int year, string district)
        {
            List<Dictionary<string, object>> districtRecords = new List<Dictionary<string, object>>();

            string currentConnection = ConfigurationManager.ConnectionStrings["staar"].ConnectionString;
            using (SqlConnection connection = new SqlConnection(currentConnection))
            {
                connection.Open();
                for (int i = 2013; i <= 2016; i++)
                {
                    string query = string.Format("SELECT Year,District,Subject,Grade, sum(cast(d as float)) as d, sum(cast(satis_ph1_nm as float)) as satis_ph1_nm, sum(cast(satis_rec_nm as float)) as satis_rec_nm FROM staar_district where (DISTRICT = @district OR DISTRICT ='''1') AND year = @year group by Subject,Grade,District,Year");
                    SqlCommand command = new SqlCommand(query, connection);
                    command.Parameters.AddWithValue("district", district);
                    command.Parameters.AddWithValue("year", i.ToString().Substring(2));
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        List<Dictionary<string, object>> currentRecords = reader.GetAllRecords();
                        districtRecords.AddRange(currentRecords);
                    }
                }
                connection.Close();
            }
            return districtRecords;
        }

        public List<Dictionary<string, object>> GetStaarSubjectNew(int year, string district)
        {
            List<Dictionary<string, object>> districtRecords = new List<Dictionary<string, object>>();

            string currentConnection = ConfigurationManager.ConnectionStrings["staar_" + year].ConnectionString;
            using (SqlConnection connection = new SqlConnection(currentConnection))
            {
                connection.Open();
                var statis_ph1_nm = year == 2016 ? "satis_lvl2_nm" : "satis_ph1_nm";
                var alias = year == 2016 ? " as satis_ph1_nm" : "";
                var year2digit = "";

                for (int i = 2013; i <= 2016; i++)
                {
                    year2digit = i.ToString().Substring(2);
                    string query = string.Format(@"SELECT '{0}' as Year, District,Subject,Grade, d,satis_rec_nm, {1} {2} FROM 
(select  [district],[grade],[subject], cast([all] as float) as [all],[category] from [dbo].[{3}_staar_district-state_wide_merged] where (DISTRICT = @district  OR DISTRICT = '''1') ) up 
PIVOT (sum([all]) FOR [category] IN (d,satis_rec_nm, {1})) AS Cat ORDER BY [district],[grade],[subject]", year2digit, statis_ph1_nm, alias, year);
                    SqlCommand command = new SqlCommand(query, connection);
                    command.Parameters.AddWithValue("district", district);
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        List<Dictionary<string, object>> currentRecords = reader.GetAllRecords();
                        districtRecords.AddRange(currentRecords);
                    }
                }
                connection.Close();
            }
            return districtRecords;
        }

        public List<Dictionary<string, object>> GetSatActTime(int year, string district)
        {
            string state = "'1";
            List<Dictionary<string, object>> districtRecords;
            string currentConnection = ConfigurationManager.ConnectionStrings["tapr_longitudinal"].ConnectionString;
            using (SqlConnection connection = new SqlConnection(currentConnection))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("select DISTRICT, YEAR, [DA0CAA*R], [DA0CSA*R], [DA0CC*R], [DA0CT*R] from SatAct_district$ where DISTRICT = @district OR district = @state", connection);
                command.Parameters.AddWithValue("district", district);
                command.Parameters.AddWithValue("state", state);
                SqlDataReader reader = command.ExecuteReader();
                districtRecords = reader.GetAllRecords();
                connection.Close();
            }
            return districtRecords;
        }

        public List<Dictionary<string, object>> GetStaarGrades(int year, string district, string grade = "", string subject = "", bool state = false)
        {

            string yearCode = (year).ToString().Substring(2);
            List<Dictionary<string, object>> districtRecords = new List<Dictionary<string, object>>();
            string currentConnection = ConfigurationManager.ConnectionStrings["staar"].ConnectionString;
            using (SqlConnection connection = new SqlConnection(currentConnection))
            {
                connection.Open();
                string query = "";
                if (state != false)
                {
                    query = string.Format(@"SELECT demo, SUM(CAST(d as FLOAT)) as d, SUM(CAST(rs as FLOAT)) as rs, SUM(CAST(satis_ph1_nm as FLOAT)) as satis_ph1_nm, 
                                            SUM(CAST(satis_rec_nm as FLOAT)) as satis_rec_nm 
                                            FROM staar_district 
                                            WHERE district = '''1'
                                            AND demo IN ('ecoy','econ','ethw','ethb','ethh','lepc') 
                                            AND YEAR = @year AND (@grade = '' OR grade = @grade) AND (@subject = '' OR subject = @subject)
                                            AND Language = 'English'
                                            GROUP BY demo");
                }
                else
                {
                    query = string.Format(@"SELECT demo, SUM(CAST(d as FLOAT)) as d, SUM(CAST(rs as FLOAT)) as rs, SUM(CAST(satis_ph1_nm as FLOAT)) as satis_ph1_nm, 
                                            SUM(CAST(satis_rec_nm as FLOAT)) as satis_rec_nm 
                                            FROM staar_district 
                                            WHERE district = @district 
                                            AND demo IN ('ecoy','econ','ethw','ethb','ethh','lepc') 
                                            AND YEAR = @year AND (@grade = '' OR grade = @grade) AND (@subject = '' OR subject = @subject)
                                            AND Language = 'English'
                                            GROUP BY demo");
                }
                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.Add("district", System.Data.SqlDbType.VarChar);
                command.Parameters["district"].Value = district;
                //command.Parameters.AddWithValue("district", dist);
                command.Parameters.AddWithValue("year", yearCode);
                command.Parameters.AddWithValue("grade", grade);
                command.Parameters.AddWithValue("subject", subject);
                SqlDataReader reader = command.ExecuteReader();
                districtRecords = reader.GetAllRecords();
                connection.Close();
            }
            return districtRecords;
        }

        public List<Dictionary<string, object>> GetStaarGradesNew(int year, string district, string grade = "", string subject = "", bool state = false)
        {

            string yearCode = (year).ToString().Substring(2);
            List<Dictionary<string, object>> districtRecords = new List<Dictionary<string, object>>();
            string currentConnection = ConfigurationManager.ConnectionStrings["staar_" + year].ConnectionString;
            using (SqlConnection connection = new SqlConnection(currentConnection))
            {
                connection.Open();

                var demo = new string[] { "ecoy", "econ", "ethw", "ethb", "ethh", "lepc" };

                var query = new StringBuilder();

                var statis_ph1_nm = year == 2016 ? "satis_lvl2_nm" : "satis_ph1_nm"; 
                var alias = year == 2016 ? " as satis_ph1_nm" : "";

                for (int a = 0; a <= 5; a++)
                {
                    query.Append(string.Format(@"SELECT '{0}' as demo ,d,rs,satis_rec_nm, {1} {2} 
FROM(select  cast([{0}] as float) as [{0}],[category] from[dbo].[{3}_staar_district-state_wide_merged]
where(DISTRICT = {4}  OR DISTRICT = '''1') AND(@grade = '' OR grade = @grade) AND(@subject = '' OR subject = @subject)) up
PIVOT(sum([{0}]) FOR[category] IN(d, rs, satis_rec_nm, {1})) AS demo{5} ", demo[a], statis_ph1_nm, alias , year, state ? "'''1'" : "@district", a));

                    if (a != 5)
                    {
                        query.Append(@"
                                    Union
                                    ");
                    }
                }

                SqlCommand command = new SqlCommand(query.ToString(), connection);

                if (!state)
                {
                    command.Parameters.Add("district", System.Data.SqlDbType.VarChar);
                    command.Parameters["district"].Value = district;
                }

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
                string query = string.Format("SELECT Subject, Grade, SubjectTitle FROM district_subject WHERE Year = @year");
                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("grade", grade);
                command.Parameters.AddWithValue("year", yearCode);
                SqlDataReader reader = command.ExecuteReader();
                districtRecords = reader.GetAllRecords();
                connection.Close();
            }
            return districtRecords;
        }


        public List<Dictionary<string, object>> GetGradesSubjectNew(int year, string grade)
        {
            var yearCode = (year).ToString().Substring(2);
            var districtRecords = new List<Dictionary<string, object>>();
            string currentConnection = ConfigurationManager.ConnectionStrings["staar_" + year].ConnectionString;
            using (var connection = new SqlConnection(currentConnection))
            {
                connection.Open();

                string query = string.Format("SELECT DISTINCT Subject, Grade, '' AS SubjectTitle  FROM [{0}_staar_campus_wide_merged]", year);
                //if (!string.IsNullOrEmpty(grade)) query += " WHERE Grade = @grade";

                var command = new SqlCommand(query, connection);
                //if (!string.IsNullOrEmpty(grade)) command.Parameters.AddWithValue("grade", grade);
                var reader = command.ExecuteReader();
                districtRecords = reader.GetAllRecords();
                connection.Close();
            }

            var list = new List<KeyValueItem>()
            {
                new KeyValueItem { Key = "a1", Value = "Algebra 1" },
                new KeyValueItem { Key = "bi", Value ="Biology" },
                new KeyValueItem { Key = "e1", Value ="English 1" },
                new KeyValueItem { Key = "e2", Value ="English 2" },
                new KeyValueItem { Key = "h",  Value ="History" },
                new KeyValueItem { Key = "m",  Value ="Math" },
                new KeyValueItem { Key = "r",  Value ="Reading" },
                new KeyValueItem { Key = "r1", Value ="Reading 1" },
                new KeyValueItem { Key = "r2", Value ="Reading 2" },
                new KeyValueItem { Key = "s",  Value ="Science" },
                new KeyValueItem { Key = "us", Value ="US History" },
                new KeyValueItem { Key =  "w", Value ="Writing" },
                new KeyValueItem { Key = "w1", Value ="Writing 1" },
                new KeyValueItem { Key = "w2", Value ="Writing 2" }
            };

            foreach(var item in districtRecords)
            {
                var subject = item["Subject"];
                var title = list.FirstOrDefault(x => x.Key == subject.ToString());
                if(title != null) item["SubjectTitle"] = title.Value; 
            }

            return districtRecords;
        }

        public bool AddDistrictAnalytics(DistrictAnalytics districtAnalytics)
        {
            string currentConnection = ConfigurationManager.ConnectionStrings["commit"].ConnectionString;
            using (SqlConnection connection = new SqlConnection(currentConnection))
            {
                connection.Open();
                string query = string.Format("INSERT INTO DistrictAnalytics(COUNTRY,COUNTRYCODE,DISTRICT,DNAME) VALUES (@country,@countryCode,@district,@dName)");
                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("country", districtAnalytics.Country);
                command.Parameters.AddWithValue("countryCode", districtAnalytics.CountryCode);
                command.Parameters.AddWithValue("district", districtAnalytics.District);
                command.Parameters.AddWithValue("dName", districtAnalytics.DName);
                command.ExecuteNonQuery();
                connection.Close();
            }
            return true;
        }
    }
}
