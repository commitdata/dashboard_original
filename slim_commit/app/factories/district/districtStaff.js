angular.module('myApp').factory('districtStaff', ['district2015Data', '$timeout', '$http', 'fieldMapper', 'd2bURI', 'JSONToCSV', '$q', function (district2015Data, $timeout, fieldMapper, d2bURI, JSONToCSV, $q) {
    var chartMapper, $scope;

    return new function () {
        var self = this;

        var colors = ["#c3151c", "#003662", "#fbb613", "#0086a1", "#ef5727", "#91c63d"];

        var extendChartMapper = function (chartMapper) {
            chartMapper.staffExperienceChart = {
                kChart: function () {
                    return $("#staffExperienceChart").data("kendoChart");
                },
                data: function () {
                    return $scope.districtStaffExperience;
                }
            };
        };

        var initScope = function () {

        };
        this.Init = function (scope, chartMapper) {
            $scope = scope;
            initScope();
            extendChartMapper(chartMapper);
        };


        this.CreateStaffInformation = function (districtID) {
            return district2015Data.getStaffInformation(districtID).then(function (response) {
                $scope.district.staffInformation = response.data[0];
            });
        };

        this.CreateStaffExperience = function (districtID) {
            return district2015Data.getStaffExperience(districtID).then(function (response) {
                $scope.districtStaffExperience = response.data;
                createStaffExperience();
            });
        };
        /* Chart functions */

        function createStaffExperience() {

            var data = [];

            _.each($scope.districtStaffExperience, function (item, index) {
                if (!isNaN(Number(item['DPST01FP']))) {
                    data.push(item);
                }
            });

            $("#staffExperienceChart").kendoChart({
                legend: {
                    visible: true,
                    position: 'bottom'
                },
                seriesDefaults: {
                    type: "column",
                    stack: true
                },
                series: [{
                    name: "Beginning",
                    data: _.map(_.pluck(data, 'DPST00FP'), function (y) { return parseFloat(y); }),
                    color: "#91c63d"
                }, {
                    name: "1-5 Years Experience",
                    data: _.map(_.pluck(data, 'DPST01FP'), function (y) { return parseFloat(y); }),
                    color: "#fbb613"
                }, {
                    name: "6-10 Years Experience",
                    data: _.map(_.pluck(data, 'DPST06FP'), function (y) { return parseFloat(y); }),
                    color: "#c3151c"
                }, {
                    name: "11-20 Years Experience",
                    data: _.map(_.pluck(data, 'DPST11FP'), function (y) { return parseFloat(y); }),
                    color: "#0086a1"
                }, {
                    name: "20+ Years Experience",
                    data: _.map(_.pluck(data, 'DPST20FP'), function (y) { return parseFloat(y); }),
                    color: "#003662"
                }],
                valueAxis: {
                    max: 100,
                    line: {
                        visible: false
                    },
                    minorGridLines: {
                        visible: true
                    },
                    labels: {
                        format: "{0}%"
                    }
                },
                categoryAxis: {
                    categories: _.pluck(data, 'YEAR'),
                    majorGridLines: {
                        visible: false
                    }
                },
                tooltip: {
                    visible: true,
                    template: "#= series.name #: #= value.toFixed(1)# % ",
                    color: 'white'
                }
            });
        }


    };
}]);