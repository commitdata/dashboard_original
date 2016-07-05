using ClosedXML.Excel;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;

namespace slim_commit.Helpers
{
    public class ExcelExportHelper
    {
        public static void GenerteExcel(DataTable dataTable, Dictionary<string,string> headerMappers, string filePath)
        {
            for (int i = 0; i < dataTable.Columns.Count; i++)
            {
                if (headerMappers.ContainsKey(dataTable.Columns[i].ColumnName))
                {
                    dataTable.Columns[i].ColumnName = headerMappers[dataTable.Columns[i].ColumnName];
                }
            }

            using (XLWorkbook wb = new XLWorkbook())
            {

                wb.Worksheets.Add(dataTable);
                wb.Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;
                wb.Style.Font.Bold = true;
                wb.SaveAs(filePath);
            }
        }
    }
}