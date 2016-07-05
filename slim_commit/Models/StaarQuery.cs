using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace slim_commit.Models
{
    public class StaarQuery
    {
        public string[] Campuses { get; set; }
        public string[] Districts { get; set; }
        public string[] Subjects { get; set; }
        public string[] Grades { get; set; }
        public string[] Demographies { get; set; }
        public string[] Years { get; set; }

    }
}