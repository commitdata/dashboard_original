angular.module('myApp').factory('districtData', ['$http', function ($http) {
    var cachePromise = null;
    return {
        getData: function () {
            if (!cachePromise) {
                cachePromise = $http.get("/api/districtSingle/get");
            }
            return cachePromise;
        }
    };

}]);