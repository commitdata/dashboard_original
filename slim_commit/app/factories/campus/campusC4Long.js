angular.module('myApp').factory('campusC4Long', ['campusData', '$timeout', 'fieldMapper', 'd2bURI', 'JSONToCSV', '$q', function (campusData, $timeout, fieldMapper, d2bURI, JSONToCSV, $q) {
    var chartMapper, $scope;

    return new function () {
        var self = this;

        var colors = ["#c3151c", "#003662", "#fbb613", "#0086a1", "#ef5727", "#91c63d"];

        var extendChartMapper = function (chartMapper) {
            chartMapper.c4LongRate = {
                kChart: function () {
                    return $("#c4LongRate").data("kendoChart");
                },
                data: function () {
                    return [$scope.campus.c4LongAll];
                }
            };
        };

        var initScope = function () {
            $scope.c4LongRateGradState = true;
            $scope.c4LongRateGEDState = false;
            $scope.c4LongRateHSState = false;
            $scope.c4LongRateDropState = true;
            $scope.c4LongRateGGState = false;
            $scope.c4LongRateGGCState = false;
            $scope.c4LongRateFedState = true;

            $scope.$watchGroup(['c4LongRateGradState', 'c4LongRateGEDState', 'c4LongRateHSState', 'c4LongRateDropState', 'c4LongRateGGState', 'c4LongRateGGCState', 'c4LongRateFedState'], function (newValues, oldValues, scope) {
                createC4Long();
            });

        };

        this.Init = function (scope, chartMapper) {
            $scope = scope;
            initScope();
            extendChartMapper(chartMapper);
        };


        this.CreateC4LongAll = function (campusID) {
            return campusData.GetC4LongAll(campusID).then(function (data) {
                $scope.campus.c4LongAll = data[0];
                createC4Long();
            });
        };

        /* Chart functions */

        function createC4Long() {
            if (!$scope.campus.c4LongAll) return;

            var categories = [];
            if ($scope.c4LongRateGradState) {
                categories.push({ code: "GC4X", name: "Graduated" });
            }
            if ($scope.c4LongRateGEDState) {
                categories.push({ code: "EC4X", name: "Received GED" });
            }
            if ($scope.c4LongRateHSState) {
                categories.push({ code: "NC4X", name: "Continued HS" });
            }
            if ($scope.c4LongRateDropState) {
                categories.push({ code: "DC4X", name: "Dropped Out" });
            }
            if ($scope.c4LongRateGGState) {
                categories.push({ code: "3C4X", name: "Graduates & GED" });
            }
            if ($scope.c4LongRateGGCState) {
                categories.push({ code: "2C4X", name: "Graduates, GED & Continuers" });
            }
            if ($scope.c4LongRateFedState) {
                categories.push({ code: "GC4", name: "Federal Graduation Rate Without Exclusions" });
            }

            var series = [
                { dataField: "CA", name: fieldMapper.campus["CA" + "GC4XYRYR"].split(" for ")[1], color: "#91c63d", data: [] },
                { dataField: "CB", name: fieldMapper.campus["CB" + "GC4XYRYR"].split(" for ")[1], color: "#003662", data: [] },
                { dataField: "CI", name: fieldMapper.campus["CI" + "GC4XYRYR"].split(" for ")[1], color: "#fbb613", data: [] },
                { dataField: "CH", name: fieldMapper.campus["CH" + "GC4XYRYR"].split(" for ")[1], color: "#c3151c", data: [] },
                { dataField: "CW", name: fieldMapper.campus["CW" + "GC4XYRYR"].split(" for ")[1], color: "#fbb613", data: [] },
                { dataField: "C3", name: fieldMapper.campus["C3" + "GC4XYRYR"].split(" for ")[1], color: "#0086a1", data: [] },
                { dataField: "C4", name: fieldMapper.campus["C4" + "GC4XYRYR"].split(" for ")[1], color: "#c3151c", data: [] },
                { dataField: "C2", name: fieldMapper.campus["C2" + "GC4XYRYR"].split(" for ")[1], color: "#003662", data: [] },
                { dataField: "CE", name: fieldMapper.campus["CE" + "GC4XYRYR"].split(" for ")[1], color: "#ef5727", data: [] },
                { dataField: "CM", name: fieldMapper.campus["CM" + "GC4XYRYR"].split(" for ")[1], color: "#0086a1", data: [] },
                { dataField: "CF", name: fieldMapper.campus["CF" + "GC4XYRYR"].split(" for ")[1], color: "#ef5727", data: [] },
                { dataField: "CR", name: fieldMapper.campus["CR" + "GC4XYRYR"].split(" for ")[1], color: "#fbb613", data: [] },
                { dataField: "CL", name: fieldMapper.campus["CL" + "GC4XYRYR"].split(" for ")[1], color: "#c3151c", data: [] },
                { dataField: "CS", name: fieldMapper.campus["CS" + "GC4XYRYR"].split(" for ")[1], color: "#fbb613", data: [] },
            ];

            _.each(series, function (item, index) {
                _.each(categories, function (cat, i) {
                    var field = item.dataField + cat.code + "YRYR";
                    item.data.push($scope.campus.c4LongAll[field]);
                });
            });

            series = _.filter(series, function (i) { return _.find(i.data, function (sub) { return sub; }); });

            $("#c4LongRate").kendoChart({
                legend: { position: 'bottom', visible: true },
                seriesDefaults: {
                    type: "column",
                    labels: {
                        visible: true,
                        template: '#= !value || value < 0 ?  \'N/A\' : value.toFixed(0) + \'%\' #',
                        margin: { top: 20 }
                    }
                },
                plotArea: {
                    margin: { top: 20, right: 20 }
                },
                series: series,
                valueAxis: {
                    labels: { template: '#=value #' },
                    min: 0,
                    max: 100
                },
                categoryAxis: {
                    categories: _.pluck(categories, "name"),
                    labels: { visible: true }
                },
                tooltip: { visible: true, template: '#= series.name #: #= !value || value < 0 ?  \'N/A\' : value.toFixed(0) + \'%\' #', color: 'white' }
            });

        };
    };
}]);