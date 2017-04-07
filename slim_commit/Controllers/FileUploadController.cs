using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace slim_commit.Controllers
{
    /// <summary>
    /// File Upload Api Controller
    /// </summary>
    public class FileUploadController : ApiController
    {
        /// <summary>
        /// Post method to handle uploaded files
        /// </summary>
        /// <returns></returns>
        public HttpResponseMessage Post()
        {
            HttpResponseMessage result = null;

            // current http request
            var httpRequest = HttpContext.Current.Request;

            // has any file, process them
            if (httpRequest.Files.Count > 0)
            {
                var docfiles = new List<string>();
                foreach (string file in httpRequest.Files)
                {
                    // http posted file
                    var postedFile = httpRequest.Files[file];

                    // get extension
                    var ext = Path.GetExtension(postedFile.FileName); 

                    // create a new file with new guid
                    var fileName = string.Format("{0}.{1}", System.Guid.NewGuid().ToString(), ext); 

                    // create complete file path
                    var filePath = HttpContext.Current.Server.MapPath("~/App_Data/AnalysisFormFiles/" + fileName);   

                    // upload file
                    postedFile.SaveAs(filePath);
                     
                    docfiles.Add(filePath);
                }
                result = Request.CreateResponse(HttpStatusCode.Created, docfiles);
            }
            else
            {
                result = Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            return result;
        }
    }
}
