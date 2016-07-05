using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace slim_commit.App_Start
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Clear();
            bundles.ResetAll();

            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                      "~/Scripts/jquery-1.10.2.js",
                      "~/Scripts/angular.js",
                      "~/Scripts/angular-route.js",
                       "~/Scripts/angular-animate.js",
                      "~/Scripts/angular-cache.js"));

            bundles.Add(new ScriptBundle("~/bundles/lib").Include(
                       "~/Scripts/d3.js",
                       "~/Scripts/lodash.js",
                       "~/Scripts/canvg/rgbcolor.js",
                        "~/Scripts/canvg/StackBlur.js",
                       "~/Scripts/canvg/canvg.js",
                        "~/Scripts/html2canvas.js",
                       "~/Scripts/jspdf.js",
                       "~/kendo/js/jszip.js",
                        "~/Scripts/cdnlibs/leaflet.js",
                       "~/Scripts/cdnlibs/queue.v1.js",
                       "~/Scripts/cdnlibs/d3-tip.js",
                       "~/Scripts/ui.js",
                       "~/app/app.js",
                        "~/app/directive/app_localization.js"));

            bundles.Add(new ScriptBundle("~/bundles/app").Include(
                     /* Directives */
                     "~/app/directive/directive.js",
                    "~/app/directive/barChart.js",
                    "~/app/directive/donutChart.js",
                    "~/app/directive/infoChart.js",
                    "~/app/directive/lineChart.js",
                    "~/app/directive/schoolMap.js",
                    "~/app/directive/countyMap.js",
                    /* Factories */
                    "~/app/factories/campus/campusGeneral.js",
                    "~/app/factories/campus/campusStudent.js",
                    "~/app/factories/campus/campusStaff.js",
                    "~/app/factories/campus/campusAdmissions.js",
                    "~/app/factories/campus/campusC4Long.js",
                    "~/app/factories/campus/campusLong.js",
                    "~/app/factories/campus/campusDropout.js",
                    "~/app/factories/campus/campusAPIB.js",
                    "~/app/factories/campus/campusCCReady.js",
                     "~/app/factories/campus/campusStaar.js",
                    "~/app/factories/district/districtGeneral.js",
                    "~/app/factories/district/districtStudent.js",
                    "~/app/factories/district/districtLong.js",
                    "~/app/factories/district/districtStaar.js",
                    "~/app/factories/district/districtStaff.js",
                    /* Services */
                    "~/app/services/campusData.js",
                    "~/app/services/districtData.js",
                    "~/app/services/district2015Data.js",
                    "~/app/services/allData.js",
                    "~/app/services/sqlData.js",
                    "~/app/services/aeisData.js",
                    "~/app/services/mapper.js",
                    "~/app/services/fieldMapper.js",
                     "~/app/services/campusReportData.js",
                     "~/app/services/reportData.js",
                     "~/app/services/gridView.js",
                    /* Controllers */
                    "~/app/controllers/campus2015Controller.js",
                    "~/app/controllers/district2015Controller.js",
                    "~/app/controllers/donorsController.js",
                    "~/app/controllers/scorecardController.js",
                    "~/app/controllers/teksController.js",
                    "~/app/controllers/actExpFinalController.js",
                    "~/app/controllers/explanation_aeisController.js",
                    "~/app/controllers/explanation_staarController.js",
                    "~/app/controllers/bulkController.js",
                    "~/app/controllers/literacy.js",
                    //"~/app/controllers/naepController.js",
                    "~/app/controllers/spreadsheetController.js",
                    "~/app/controllers/signinController.js",
                    "~/app/controllers/signupController.js",
                    "~/app/controllers/campusReportController.js",
                    "~/app/controllers/reportController.js",
                     /* Themes JS */
                     "~/kendo/js/kendo.all.min.js",
                     "~/Scripts/bootstrap.js"
                    ));

            bundles.Add(new StyleBundle("~/bundles/css")
                .Include("~/Content/literacy.css")
                .Include("~/Content/main.css"));

            //BundleTable.EnableOptimizations = true;
        }
    }
}