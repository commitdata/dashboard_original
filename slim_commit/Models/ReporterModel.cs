using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace slim_commit.Models
{
    /// <summary>
    /// Report Filter model
    /// </summary>
    public class ReporterModel
    {
        /// <summary>
        /// List of selected counties
        /// </summary>
        public string[] Counties { get; set; }

        /// <summary>
        /// List of selected districts
        /// </summary>
        public string[] Districts { get; set; }

        /// <summary>
        /// List of campuses
        /// </summary>
        public string[] Campuses { get; set; }

        /// <summary>
        /// List of levels like high, middle, elementary (schools)
        /// </summary>
        public string[] Levels { get; set; }

        /// <summary>
        /// charter? or no-charter or both
        /// </summary>
        public string[] Charters { get; set; }
    }

    /// <summary>
    /// County Model
    /// </summary>
    public class ReporterCountyModel
    {
        /// <summary>
        /// County Name
        /// </summary>
        public string CountyName { get; set; }
        /// <summary>
        /// County code
        /// </summary>
        public string County { get; set; }

        /// <summary>
        /// Constructor implementation
        /// </summary>
        /// <param name="dataRecord"></param>
        public ReporterCountyModel(IDataRecord dataRecord)
        {
            this.CountyName = dataRecord["CNTYNAME"].ToString();
            this.County = dataRecord["COUNTY"].ToString();
        }
    }


    /// <summary>
    /// District Model
    /// </summary>
    public class ReporterDistrictModel
    {
        /// <summary>
        /// District Name
        /// </summary>
        public string DistrictName { get; set; }
        /// <summary>
        /// District code
        /// </summary>
        public string District { get; set; }

        /// <summary>
        /// County code
        /// </summary>
        public string County { get; set; }

        /// <summary>
        /// Constructor implementation
        /// </summary>
        /// <param name="dataRecord"></param>
        public ReporterDistrictModel(IDataRecord dataRecord)
        {
            this.DistrictName = dataRecord["DISTNAME"].ToString();
            this.District = dataRecord["DISTRICT"].ToString();
            //this.County = dataRecord["COUNTY"].ToString();
        }
    }

    /// <summary>
    /// District Model
    /// </summary>
    public class ReporterCampusModel
    {
        /// <summary>
        /// Campus Name
        /// </summary>
        public string CampusName { get; set; }
        /// <summary>
        /// Campus code
        /// </summary>
        public string Campus { get; set; }

        /// <summary>
        /// County code
        /// </summary>
        public string County { get; set; }

        /// <summary>
        /// District code 
        /// </summary>
        public string District { get; set; }

        /// <summary>
        /// Constructor implementation
        /// </summary>
        /// <param name="dataRecord"></param>
        public ReporterCampusModel(IDataRecord dataRecord)
        {
            this.CampusName = dataRecord["CAMPNAME"].ToString();
            this.Campus = dataRecord["CAMPUS"].ToString();
            //this.District = dataRecord["DISTRICT"].ToString();
            //this.County = dataRecord["COUNTY"].ToString();
        }
    }

    /// <summary>
    /// District Filter Model
    /// </summary>
    public class ReporterDistrictFilterModel
    {
        /// <summary>
        /// Selected Counties
        /// </summary>
        public string[] Counties { get; set; }
    }

    /// <summary>
    /// Campus Filter Model
    /// </summary>
    public class ReporterCampusFilterModel
    {
        /// <summary>
        /// Selected Districts
        /// </summary>
        public string[] Districts { get; set; }
    }
}