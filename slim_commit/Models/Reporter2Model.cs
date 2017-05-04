using System;
using System.Data;

namespace slim_commit.Models
{
    /// <summary>
    /// ReporterTool Tapr Request model
    /// </summary>
    public class Reporter2TaprRequestModel
    {
        /// <summary>
        /// array of tapr variables
        /// </summary>
        public string[] TaprList { get; set; }

        /// <summary>
        /// array of campuses
        /// </summary>
        public string[] Campuses { get; set; }

        /// <summary>
        /// array of years
        /// </summary>
        public string[] Years { get; set; }

        /// <summary>
        /// grade subjects
        /// </summary>
        public string[] GradeSubjects { get; set; }

        /// <summary>
        /// categories
        /// </summary>
        public string[] Categories { get; set; }

        /// <summary>
        /// demos
        /// </summary>
        public string[] Demos { get; set; }
    }

    /// <summary>
    /// Reporter2 tapr response model
    /// </summary>
    public class Reporter2TaprModel
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// campus code
        /// </summary>
        public string Campus { get; set; }

        /// <summary>
        /// variable
        /// </summary>
        public string Attr { get; set; }

        /// <summary>
        /// Year
        /// </summary>
        public string Year { get; set; }

        /// <summary>
        /// Val
        /// </summary>
        public string Val { get; set; }

        /// <summary>
        /// Constructor implementation
        /// </summary>
        /// <param name="dataRecord"></param>
        public Reporter2TaprModel(IDataRecord dataRecord)
        {
            this.Id = Convert.ToInt32(dataRecord["Id"]);
            this.Campus = dataRecord["Campus"].ToString();
            this.Attr = dataRecord["Attr"].ToString();
            this.Year = dataRecord["Year"].ToString();
            this.Val = dataRecord["Val"].ToString();
        }
    }

    /// <summary>
    /// Staar Response Model
    /// </summary>
    public class StaarCampusWideMerged
    {
        /// <summary>
        /// Id
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Campus
        /// </summary>
        public string Campus { get; set; }

        /// <summary>
        /// Year
        /// </summary>
        public int Year { get; set; }

        /// <summary>
        /// Region
        /// </summary>
        public string Region { get; set; }

        /// <summary>
        /// District
        /// </summary>
        public string District { get; set; }

        /// <summary>
        /// Dname
        /// </summary>
        public string Dname { get; set; }

        /// <summary>
        /// Cname
        /// </summary>
        public string Cname { get; set; }
          
        /// <summary>
        /// Subject
        /// </summary>
        public string Subject { get; set; }

        /// <summary>
        /// Grade
        /// </summary>
        public string Grade { get; set; }

        /// <summary>
        /// Language
        /// </summary>
        public string Language { get; set; }

        /// <summary>
        /// Category
        /// </summary>
        public string Category { get; set; }

        /// <summary>
        /// All
        /// </summary>
        public string All { get; set; }

        /// <summary>
        /// Sexm
        /// </summary>
        public string Sexm { get; set; }

        /// <summary>
        /// Sexf
        /// </summary>
        public string Sexf { get; set; }

        /// <summary>
        /// Hispanic
        /// </summary>
        public string Ethh { get; set; }

        /// <summary>
        /// African American
        /// </summary>
        public string Ethb { get; set; }

        /// <summary>
        /// Non  Economically Disadvanaged
        /// </summary>
        public string Ecoy { get; set; }

        /// <summary>
        /// Economically Disadvanaged
        /// </summary>
        public string Econ { get; set; }

        /// <summary>
        /// Limited English Proficiency
        /// </summary>
        public string Lepc { get; set; }

        /// <summary>
        /// Atry
        /// </summary>
        public string Atry { get; set; }

        /// <summary>
        /// Constructor implementation
        /// </summary>
        /// <param name="dataRecord"></param>
        public StaarCampusWideMerged(IDataRecord dataRecord)
        {
            this.Id = Convert.ToInt32(dataRecord["Id"]);
            this.Campus = dataRecord["Campus"].ToString(); 
            this.Year = Convert.ToInt32(dataRecord["Year"]);
            this.Region = dataRecord["Region"].ToString();
            this.District = dataRecord["District"].ToString();
            this.Dname = dataRecord["Dname"].ToString();
            this.Cname = dataRecord["Cname"].ToString();
            this.Subject = dataRecord["Subject"].ToString();
            this.Grade = dataRecord["Grade"].ToString();
            this.Language = dataRecord["Language"].ToString();
            this.Category = dataRecord["Category"].ToString();
            this.All = dataRecord["All"].ToString();
            this.Econ = dataRecord["Econ"].ToString();
            this.Ecoy = dataRecord["Ecoy"].ToString();
            this.Sexm = dataRecord["Sexm"].ToString();
            this.Sexf = dataRecord["Sexf"].ToString();
            this.Ethh = dataRecord["Ethh"].ToString();
            this.Ethb = dataRecord["Ethb"].ToString();
            this.Lepc = dataRecord["Lepc"].ToString();
            this.Atry = dataRecord["Atry"].ToString(); 
        }
    }


    /// <summary>
    /// Reporter2 Response Model
    /// </summary>
    public class Reporter2ResponseModel
    {
        /// <summary>
        /// Is Success
        /// </summary>
        public bool Success { get; set; }

        /// <summary>
        /// Error Message
        /// </summary>
        public string Message { get; set; }

        /// <summary>
        /// File name
        /// </summary>
        public string FileName { get; set; }
    }
}