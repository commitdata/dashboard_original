using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace slim_commit
{
    public static class ProjectConfiguration
    {
        public static string MandrillApiKey
        {
            get { return ConfigurationManager.AppSettings["MandrillApiKey"]; }
        }

        public static string FromEmail
        {
            get { return ConfigurationManager.AppSettings["FromEmail"]; }
        }

        public static string FromName
        {
            get { return ConfigurationManager.AppSettings["FromName"]; }
        }

        public static string InvitationEmailSubject
        {
            get { return ConfigurationManager.AppSettings["InvitationEmailSubject"]; }
        }
    }
}