using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Web.Http;
using slim_commit.Models;
using System.Web.Hosting;
using OfficeOpenXml;
using System.IO;

namespace slim_commit.Controllers
{
    /// <summary>
    /// Reporter Controller
    /// </summary>
    public class Reporter2Controller : BaseApiController
    {
        /// <summary>
        /// Connection string
        /// </summary>
        private readonly string _connectionString = ConfigurationManager.ConnectionStrings["tapr"].ConnectionString;

        /// <summary>
        /// Connection string Staar All
        /// </summary>
        private readonly string _connectionString2 = ConfigurationManager.ConnectionStrings["staar_all_years"].ConnectionString;


        /// <summary>
        /// Get Campuses
        /// </summary> 
        /// <returns></returns>
        [HttpPost]
        public Reporter2ResponseModel GetTaprData(Reporter2TaprRequestModel filter)
        {
            var response = new Reporter2ResponseModel();

            try
            {
                var records = new List<Reporter2TaprModel>();
                var staars = new List<StaarCampusWideMerged>();

                using (var connection = new SqlConnection(_connectionString))
                {
                    connection.Open();

                    var command = new SqlCommand("select * from [dbo].[cstud] where [year] IN (@years) and Campus IN (@campuses) and Attr IN (@attrs)", connection);
                    command.AddArrayParameters(filter.Years, "years");
                    command.AddArrayParameters(filter.Campuses, "campuses");
                    command.AddArrayParameters(filter.TaprList, "attrs");

                    var reader = command.ExecuteReader();
                    while (reader.Read())
                    {
                        try
                        {
                            records.Add(new Reporter2TaprModel(reader));
                        }
                        catch { }
                    }
                    connection.Close();
                }

                if (filter.GradeSubjects != null && filter.GradeSubjects.Length > 0 &&
                   filter.Demos != null && filter.Demos.Length > 0 &&
                   filter.Categories != null && filter.Categories.Length > 0)
                {
                    var grades = new List<string>();
                    var subjects = new List<string>();
                    var years = new List<string>();

                    foreach (var item in filter.GradeSubjects)
                    {
                        if (item.Length == 2)
                        {
                            grades.Add(item[0].ToString());
                            subjects.Add(item[1].ToString());
                        }
                    }

                    foreach (var year in filter.Years)
                    {
                        if (year.Length == 4)
                        {
                            years.Add(year.Substring(2).ToString());
                        }
                    }


                    using (var connection = new SqlConnection(_connectionString2))
                    {
                        connection.Open();

                        var command = new SqlCommand(@"select Id, Campus, [Year], Region, District, Dname, Cname, [Subject], 
                        Grade, [Language], Category, [All], Econ, Ecoy, Sexm, Sexf, Ethh, Ethb, Lepc, Atry from [dbo].[staar_campus_wide_merged] 
                        where [year] IN (@years) and Campus IN (@campuses) and Grade IN (@grades) 
                        and [Subject] IN (@subjects) and Category IN (@categories)", connection);

                        command.AddArrayParameters(years, "years");
                        command.AddArrayParameters(filter.Campuses, "campuses");
                        command.AddArrayParameters(filter.Categories, "categories");
                        command.AddArrayParameters(grades.ToArray(), "grades");
                        command.AddArrayParameters(subjects.ToArray(), "subjects");


                        //command.AddArrayParameters(filter.TaprList, "attrs");

                        var reader = command.ExecuteReader();
                        while (reader.Read())
                        {
                            try
                            {
                                staars.Add(new StaarCampusWideMerged(reader));
                            }
                            catch { }
                        }
                        connection.Close();
                    }
                }

                var templateFilePath = string.Format("{0}/Template.xlsx", HostingEnvironment.MapPath("~/App_Data"));

                response.FileName = System.Guid.NewGuid().ToString();
                var excelFile = string.Format("{0}.xlsx", response.FileName);

                var tempDir = HostingEnvironment.MapPath("~/App_Data/Temp");

                if (!Directory.Exists(tempDir))
                    Directory.CreateDirectory(tempDir); 

                var destinationFile = string.Format("{0}/{1}", HostingEnvironment.MapPath("~/App_Data/Temp"), excelFile);

                File.Copy(templateFilePath, destinationFile);

                var fileInfo = new FileInfo(destinationFile);
                var package = new ExcelPackage(fileInfo);

                var ws = package.Workbook.Worksheets["Sheet1"];

                int row = 1;

                // header row of sheet1
                ws.Cells[row, 1].Value = "Id";
                ws.Cells[row, 2].Value = "Campus";
                ws.Cells[row, 3].Value = "Attr";
                ws.Cells[row, 4].Value = "Year";
                ws.Cells[row, 5].Value = "Val";

                row++;

                foreach (var item in records)
                {
                    ws.Cells[row, 1].Value = item.Id;
                    ws.Cells[row, 2].Value = item.Campus;
                    ws.Cells[row, 3].Value = item.Attr;
                    ws.Cells[row, 4].Value = item.Year;
                    ws.Cells[row, 5].Value = item.Val;

                    row++;
                }

                //auto fit columns
                ws.Cells[ws.Dimension.Address].AutoFitColumns();

                var ws1 = package.Workbook.Worksheets.Add("Sheet2");

                row = 1;

                // header row of sheet2
                ws1.Cells[row, 1].Value = "Id";
                ws1.Cells[row, 2].Value = "Campus";
                ws1.Cells[row, 3].Value = "Year";
                ws1.Cells[row, 4].Value = "Region";
                ws1.Cells[row, 5].Value = "District";
                ws1.Cells[row, 6].Value = "Dname";
                ws1.Cells[row, 7].Value = "Cname";
                ws1.Cells[row, 8].Value = "Subject";
                ws1.Cells[row, 9].Value = "Grade";
                ws1.Cells[row, 10].Value = "Language";
                ws1.Cells[row, 11].Value = "Category";
                ws1.Cells[row, 12].Value = "All";
                ws1.Cells[row, 13].Value = "Econ";
                ws1.Cells[row, 14].Value = "Ecoy";
                ws1.Cells[row, 15].Value = "Sexm";
                ws1.Cells[row, 16].Value = "Sexf";
                ws1.Cells[row, 17].Value = "Ethh";
                ws1.Cells[row, 18].Value = "Ethb";
                ws1.Cells[row, 19].Value = "Lepc";
                ws1.Cells[row, 20].Value = "Atry";

                row++;

                foreach (var item in staars)
                {
                    ws1.Cells[row, 1].Value = item.Id;
                    ws1.Cells[row, 2].Value = item.Campus;
                    ws1.Cells[row, 3].Value = item.Year;
                    ws1.Cells[row, 4].Value = item.Region;
                    ws1.Cells[row, 5].Value = item.District;
                    ws1.Cells[row, 6].Value = item.Dname;
                    ws1.Cells[row, 7].Value = item.Cname;
                    ws1.Cells[row, 8].Value = item.Subject;
                    ws1.Cells[row, 9].Value = item.Grade;
                    ws1.Cells[row, 10].Value = item.Language;
                    ws1.Cells[row, 11].Value = item.Category;
                    ws1.Cells[row, 12].Value = item.All;
                    ws1.Cells[row, 13].Value = item.Econ;
                    ws1.Cells[row, 14].Value = item.Ecoy;
                    ws1.Cells[row, 15].Value = item.Sexm;
                    ws1.Cells[row, 16].Value = item.Sexf;
                    ws1.Cells[row, 17].Value = item.Ethh;
                    ws1.Cells[row, 18].Value = item.Ethb;
                    ws1.Cells[row, 19].Value = item.Lepc;
                    ws1.Cells[row, 20].Value = item.Atry;

                    row++;
                }

                //auto fit columns
                ws1.Cells[ws1.Dimension.Address].AutoFitColumns();

                package.Save();

                response.Success = true;
            }
            catch (System.Exception ex)
            {
                response.Message = ex.ToString();
            }
            

            return response;
        }

        /// <summary>
        /// Get GradeTypes
        /// </summary>
        /// <returns></returns>
        public List<string> GetGradeTypes()
        {
            var records = new List<string>();

            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                var command = new SqlCommand("select DISTINCT GRDTYPE from reporterC2C", connection);
                var reader = command.ExecuteReader();
                while (reader.Read())
                {
                    try
                    {
                        records.Add(reader["GRDTYPE"].ToString());
                    }
                    catch { }
                }
                connection.Close();
            }
            return records;
        }
    }
}
     