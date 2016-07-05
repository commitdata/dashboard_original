angular.module('myApp').factory('campusReportData', ['$http', '$q', function ($http, $q) {
    function parseData(obj) {
        _.each(obj, function (value, key) {
            if (["CAMPUS"].indexOf(key) < 0) {
                var flt = parseFloat(value) || 0;
                obj[key] = flt < 0 ? 0 : flt;
            }
        });
    };
    return {
        getCounties: function (year) {
            return $http.get("/api/campusReport/GetCounties?year=" + year);
        },
        getDistricts: function (year, county) {
            return $http.get("/api/campusReport/GetDistricts?year=" + year + "&county=" + county);
        },
        getCampuses: function (year, district, county) {
            return $http.get("/api/campusReport/GetCampuses?year=" + year + "&district=" + (district || "") + "&county=" + county);
        },

    };

}]);