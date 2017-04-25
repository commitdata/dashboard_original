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
}