using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace slim_commit.Models
{

    public class DistrictAnalytics
    {
        public string Country { get; set; }
        public string CountryCode { get; set; }
        public string DName { get; set; }
        public string District { get; set; }


    }


    public class CampusAnalytics : DistrictAnalytics
    {
        public string CName { get; set; }
        public string Campus { get; set; }
    }

}