using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace slim_commit.Models
{
    public class ActExpQuery
    {
        public string[] Districts { get; set; }

        public string CurrentDistrict { get; set; }

        public string Subject {get;set;}

        public string Grade {get;set;}

        public string Demo {get;set;}

        public string yColumn {get;set;}

        public string xColumn { get; set; }
    }
}