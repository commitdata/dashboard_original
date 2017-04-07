using slim_commit.Models;
using System; 
using System.Configuration;
using System.Data.SqlClient; 
using System.Web.Http;

namespace slim_commit.Controllers
{
    /// <summary>
    /// Analysis Form Api
    /// </summary>
    public class AnalysisFormController : ApiController
    { 
        /// <summary>
        /// Save Analysis Form Api
        /// </summary>
        /// <param name="model">AnalysisFormModel object</param>
        /// <returns>BaseResponse object</returns>
        [HttpPost]
        public BaseResponse SaveAnalysis(AnalysisFormModel model)
        {
            var response = new BaseResponse();
            try
            {
                using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["commit"].ConnectionString))
                { 
                    // open sql connection
                    connection.Open();

                    // insert query with parameters 
                    var command = new SqlCommand(@"INSERT INTO [dbo].[AnalysisRequestForm] ([FirstName], [LastName] ,[AnalysisTitle] ,[Audiences],
                                [DateAnalysisGiven] ,[AnalysisDescription] ,[GeographicArea] ,[AnalysisReportFormat] ,
                                [EndProductEnvision]) VALUES  (@FirstName, @LastName, @AnalysisTitle, @Audiences, 
                                @DateAnalysisGiven, @AnalysisDescription, @GeographicArea, @AnalysisReportFormat, @EndProductEnvision)", connection);

                    // add parameters  
                    command.Parameters.Add(new SqlParameter("@FirstName", model.FirstName));
                    command.Parameters.Add(new SqlParameter("@LastName", model.LastName));
                    command.Parameters.Add(new SqlParameter("@AnalysisTitle", model.AnalysisTitle));
                    command.Parameters.Add(new SqlParameter("@Audiences", model.Audiences));
                    command.Parameters.Add(new SqlParameter("@DateAnalysisGiven", model.DateAnalysisGiven));
                    command.Parameters.Add(new SqlParameter("@AnalysisDescription", model.AnalysisDescription));
                    command.Parameters.Add(new SqlParameter("@GeographicArea", model.GeographicArea));
                    command.Parameters.Add(new SqlParameter("@AnalysisReportFormat", model.AnalysisReportFormat));
                    command.Parameters.Add(new SqlParameter("@EndProductEnvision", model.EndProductEnvision));
    
                    // execute query
                    var result = command.ExecuteNonQuery();

                    // got so far, successful 
                    response.Success = true;

                    // close sql connection
                    connection.Close();
                }
            }
            catch (Exception exception)
            {
                response.Message = exception.ToString();
            } 
            return response;
        } 
    }
}
