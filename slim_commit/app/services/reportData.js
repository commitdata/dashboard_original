angular.module('myApp').factory('reportData', ['$http', function ($http) {

    return {
        GetDistricts: function () {
            return $http.get("/api/Report/GetDistricts", { cache :true});
        },
        GetCampus: function (district) {

            return $http({ url: "/api/Report/GetCampus?district=" + district, method: "GET", cache :true }).then(function (response) {

                if (district == 'All') {
                    _.each(response.data, function (camp) {
                        //campusData.push({ CAMPUS: camp.CAMPUS, CNAME: camp.CNAME });
                        camp.CNAME = camp.CNAME + " (" + camp.DNAME + ")"
                    });
                }

                return response;
            });
        },
        GenerateReport: function (filter) {

            return $http({ url: "/api/Report/GetCampusReport", method: "POST", data: filter }).then(function (response) { return response; });
        },
        setReportAnalytics: function (analyticData) {
            return $http({ url: "/api/Report/addAnalyticsData", method: "POST", data: analyticData }).then(function (response) { return response; });
        },
        ExportData: function (filter) {

            return $http({ url: "/api/Report/ExportFilterData", method: "POST", data: filter }).then(function (response) { return response; });
        }
    }
}]);