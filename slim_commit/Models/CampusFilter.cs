using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace slim_commit.Models
{
    public class CampusFilter
    {
        public string[] Campus { get; set; }
        public string[] Year { get; set; }
        public Grades[] Grades { get; set; }
        public string[] Demographic { get; set; }
        public string[] Level { get; set; }

    }

    public class Grades
    {
        public string Subject { get; set; }
        public string Grade { get; set; }
    }
}