using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Web.Script.Serialization;
using System.IO;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Runtime.Serialization;

namespace slim_commit.Controllers
{
    public class downloadController : Controller
    {
        [HttpPost]
        public ActionResult downloader(string reportData, string theHeaders)//, string[] selectedVariables
        {
            var json = new JavaScriptSerializer() { MaxJsonLength = int.MaxValue };

            List<string> myCSV = new List<string>();

            JavaScriptSerializer jss = new JavaScriptSerializer();
            var d = jss.Deserialize<dynamic>(reportData);

            var heads = jss.Deserialize<dynamic>(theHeaders);

            //add headers
            string headers = "";
            foreach (var item in heads)
            {
                headers += item + ",";
            }
            myCSV.Add(headers);

            //add data
            foreach (var item in d)
            {
                string inter = "";
                foreach (var sub in item)
                {
                    inter += sub.Value + ",";
                }

                myCSV.Add(inter);
            }

            System.IO.StreamWriter file = System.IO.File.CreateText(Server.MapPath("~/DownloadFile/commitReport.csv"));



            for (int f = 0; f < myCSV.Count; f++)
            {
                file.WriteLine(myCSV[f]);
            }

            file.Close();

            return Json(new { url = "/DownloadFile/commitreport.csv" });
        }


        public static T DeserializeJSon<T>(string jsonString)
        {
            DataContractJsonSerializer ser = new DataContractJsonSerializer(typeof(T));
            MemoryStream stream = new MemoryStream(Encoding.UTF8.GetBytes(jsonString));
            T obj = (T)ser.ReadObject(stream);
            return obj;
        }

        public FileResult downloadExcel(string id)
        { 
            var path = Server.MapPath("~/App_Data/Temp");
            var fileName = string.Format("{0}.xlsx", id);
            var filePath = Path.Combine(path, fileName);
            return File(filePath, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", string.Format("{0}.xlsx", id));
        }
    }
}