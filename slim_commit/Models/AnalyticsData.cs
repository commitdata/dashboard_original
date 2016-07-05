using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace slim_commit.Models
{
    public class AnalyticsData
    {
        public DistrictDetail[] District { get; set; }
        public CampusDetail[] Campus { get; set; }
        public string[] Year { get; set; }
        public Grades[] Grades { get; set; }
        public string[] Demographic { get; set; }
        public string[] Level { get; set; }

    }

    public class CampusDetail
    {
        public string Campus { get; set; }
        public string CName { get; set; }
    }

    public class DistrictDetail
    {
        public string District { get; set; }
        public string DName { get; set; }
    }

}