// Create a controller.
angular.module('myApp').controller("literacyController", ['$scope', 'geoService', 'valueService', function ($scope, geoService, valueService) {//, countyGeoService){

    var totalStudents = 36378;

    // Slider value.
    $scope.literacyRate = 36;
    // When the literacy rate slider value changes...
    $scope.$watch("literacyRate", function (rate) {

        // Update all the global variables.
        $scope.notProf = ((100 - rate) / 100) * totalStudents;
        $scope.notProfNotGrad = .16 * $scope.notProf;
        $scope.profNotGrad = .04 * (rate / 100) * totalStudents;
        $scope.moneyLost = ($scope.notProfNotGrad + $scope.profNotGrad) * 260000;

        // Update all the labels.
        $scope.notProfLabel = formatLabel($scope.notProf);
        $scope.notProfNotGradLabel = formatLabel($scope.notProfNotGrad);
        $scope.profNotGradLabel = formatLabel($scope.profNotGrad);
        $scope.moneyLostLabel = formatLabel($scope.moneyLost);

    });

    var geoPromise = geoService.getGeoData()
    geoPromise.then(function (data) { $scope.geoData = data; })

    var valuePromise = valueService.getValueData()
    valuePromise.then(function (data) { $scope.valueData = data; })

    function formatLabel(a) { return d3.format(",")(d3.round(a)) };
    schoolMap();
    createChart();

    function createChart() {
        $("#gradeLevelBar").kendoChart({
            //title: {
            //    text: "Gross domestic product growth /GDP annual %/"
            //},
            legend: {
                position: "top"
            },
            seriesDefaults: {
                type: "column",
                labels: {
                    visible: true,
                    background: "transparent",
                    template: " #= value # %",
                }
            },
            series: [{
                name: "Dallas County",
                data: [36, 32, 37, 34, 32, 40],
                color: '#003662'
            }, {
                name: "State",
                data: [41, 35, 42, 40, 39, 47],
                color: '#c3151c'
            }],
            valueAxis: {
                labels: {
                    format: "{0}%"
                },
                line: {
                    visible: false
                },
                axisCrossingValue: 0
            },
            categoryAxis: {
                categories: ['3rd Grade', '4th Grade', '5th Grade', '6th Grade', '7th Grade', '8th Grade'],
                line: {
                    visible: false
                }//,
                //labels: {
                //    padding: { top: 135 }
                //}
            },
            tooltip: {
                visible: true,
                format: "{0}%",
                template: "#= series.name #: #= value # %",
                color: 'white'
            }
        });
    }


}]);

angular.module('myApp').service("geoService", ['$http', '$q', function ($http, $q) {

    var deferred = $q.defer();
    $http.get("assets/literacy/counties.json").then(function (data) { deferred.resolve(data) })
    this.getGeoData = function () { return deferred.promise }

}]);

angular.module('myApp').service("valueService", ['$http', '$q', function ($http, $q) {

    var deferred = $q.defer();
    $http.get("assets/literacy/countyRates.json").then(function (data) { deferred.resolve(data) })
    this.getValueData = function () { return deferred.promise }

}]);