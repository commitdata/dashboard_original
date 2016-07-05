angular.module('myApp').factory('allData', ['$http', function ($http) {
    var cachePromise = null;
    return {
        getData: function () {
            if (!cachePromise) {
                cachePromise = $http.get("/api/campusSingle/get");
            }
            return cachePromise;
        },
        getCounties: function () {
            return $http.get("/api/campusSingle/GetCounties");
        },
        getDistricts: function (county) {
            return $http.get("/api/campusSingle/GetDistricts?county=" + county);
        },
        getCampuses: function (district) {
            return $http.get("/api/campusSingle/GetCampuses?district=" + (district || ""));
        },
        getCampusBySearchText: function (campusSearchText) {
            return $http.get("/api/campusSingle/GetCampusesBySearchText?searchText=" + (campusSearchText || ""));
        },
        getCampus: function (campusID) {
            return $http.get("/api/campusSingle/GetCampus?campusID=" + campusID);
        },
        getCampStaar: function (campusID) {
            return $http.get("/api/campusSingle/GetCampStaar?campusID=" + campusID);
        },
        getCampLong: function (campusID) {
            return $http.get("/api/campusLong/GetCampLong?campusID=" + campusID);
        },
        getCampLongStaar: function (campusID) {
            return $http.get("/api/campusLongStaar/Get?campusID=" + campusID);
        },
        getCampStaarSub: function (campusID, recType, subType, demoType) {
            return $http.get("/api/campusSingle/GetCampStaarSub?campusID=" + campusID + "&table=" + recType + "&subject=" + subType + "&demo=" + demoType);
        },
        getCampStaarSubAll: function (campusID) {
            return $http.get("/api/campusSingle/GetCampStaarSubAll?campusID=" + campusID);
        }
    };

}]);