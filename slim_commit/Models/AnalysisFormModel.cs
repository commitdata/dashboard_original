using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace slim_commit.Models
{
    /// <summary>
    /// Analysis form model
    /// </summary>

    public class AnalysisFormModel
    {
        /// <summary>
        /// Requester First Name
        /// </summary>
        public string FirstName { get; set; }

        /// <summary>
        /// Requester Last Name
        /// </summary>
        public string LastName { get; set; }
         
        /// <summary>
        /// Analysis Title
        /// </summary>
        public string AnalysisTitle { get; set; }

        /// <summary>
        /// Audiences
        /// </summary>
        public string Audiences { get; set; }

        /// <summary>
        /// Date analysis to be given
        /// </summary>
        public string DateAnalysisGiven { get; set; }

        /// <summary>
        /// Analysis description
        /// </summary>
        public string AnalysisDescription { get; set; }

        /// <summary>
        /// Geographic area this analysis to include
        /// </summary>
        public string GeographicArea { get; set; }

        /// <summary>
        /// Analysis report format 
        /// </summary>
        public string AnalysisReportFormat { get; set; }

        /// <summary>
        /// End product envision
        /// </summary>
        public string EndProductEnvision { get; set; }

        /// <summary>
        /// Uploaded files
        /// </summary>
        public string UploadFiles { get; set; } 
    }
}