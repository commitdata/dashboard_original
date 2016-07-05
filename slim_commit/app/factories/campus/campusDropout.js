angular.module('myApp').factory('campusDropout', ['campusData', '$timeout', 'fieldMapper', 'd2bURI', 'JSONToCSV', '$q', function (campusData, $timeout, fieldMapper, d2bURI, JSONToCSV, $q) {
    var chartMapper, $scope;

    return new function () {
        var self = this;

        var colors = ["#c3151c", "#003662", "#fbb613", "#0086a1", "#ef5727", "#91c63d"];

        var extendChartMapper = function (chartMapper) {
            chartMapper.drpAll = {
                kChart: function () {
                    return $("#drpAll").data("kendoChart");
                },
                data: function () {
                    return [$scope.campus.dropoutAll];
                }
            };
        };

        var initScope = function () {
            $scope.drpAllAttendanceState = true;
            $scope.drpAllGr7State = false;
            $scope.drpAllGr9State = true;

            $scope.$watchGroup(['drpAllAttendanceState', 'drpAllGr7State', 'drpAllGr9State'], function (newValues, oldValues, scope) {
                createDropoutChart();
            });

        };

        this.Init = function (scope, chartMapper) {
            $scope = scope;
            initScope();
            extendChartMapper(chartMapper);
        };


        this.CreateDropoutAll = function (campusID) {
            return campusData.getDropoutAll(campusID).then(function (data) {
                $scope.campus.dropoutAll = data[0];
                createDropoutChart();
            });
        };

        /* Chart functions */

        function createDropoutChart() {
            if (!$scope.campus.dropoutAll) return;

            var categories = [];
            if ($scope.drpAllAttendanceState) {
                categories.push({ code: "AT", name: "Attendance Rate" });
            }
            if ($scope.drpAllGr7State) {
                categories.push({ code: "708DR", name: "Annual Dropout Rate (Gr 7-8)" });
            }
            if ($scope.drpAllGr9State) {
                categories.push({ code: "912DR", name: "Annual Dropout Rate (Gr 9-12)" });
            }

            var series = [
                { dataField: "CA0", name: fieldMapper.campus["CA0" + "ATYRYR"].replace("Attendance: ", "").replace(" Rate", ""), color: "#91c63d", data: [] },
                { dataField: "CB0", name: fieldMapper.campus["CB0" + "ATYRYR"].replace("Attendance: ", "").replace(" Rate", ""), color: "#003662", data: [] },
                { dataField: "CI0", name: fieldMapper.campus["CI0" + "ATYRYR"].replace("Attendance: ", "").replace(" Rate", ""), color: "#fbb613", data: [] },
                { dataField: "CH0", name: fieldMapper.campus["CH0" + "ATYRYR"].replace("Attendance: ", "").replace(" Rate", ""), color: "#c3151c", data: [] },
                { dataField: "CW0", name: fieldMapper.campus["CW0" + "ATYRYR"].replace("Attendance: ", "").replace(" Rate", ""), color: "#fbb613", data: [] },
                { dataField: "C30", name: fieldMapper.campus["C30" + "ATYRYR"].replace("Attendance: ", "").replace(" Rate", ""), color: "#0086a1", data: [] },
                { dataField: "C40", name: fieldMapper.campus["C40" + "ATYRYR"].replace("Attendance: ", "").replace(" Rate", ""), color: "#c3151c", data: [] },
                { dataField: "C20", name: fieldMapper.campus["C20" + "ATYRYR"].replace("Attendance: ", "").replace(" Rate", ""), color: "#003662", data: [] },
                { dataField: "CE0", name: fieldMapper.campus["CE0" + "ATYRYR"].replace("Attendance: ", "").replace(" Rate", ""), color: "#ef5727", data: [] },
                { dataField: "CM0", name: fieldMapper.campus["CM0" + "ATYRYR"].replace("Attendance: ", "").replace(" Rate", ""), color: "#0086a1", data: [] },
                { dataField: "CF0", name: fieldMapper.campus["CF0" + "ATYRYR"].replace("Attendance: ", "").replace(" Rate", ""), color: "#ef5727", data: [] },
                { dataField: "CR0", name: fieldMapper.campus["CR0" + "ATYRYR"].replace("Attendance: ", "").replace(" Rate", ""), color: "#fbb613", data: [] },
                { dataField: "CL0", name: fieldMapper.campus["CL0" + "ATYRYR"].replace("Attendance: ", "").replace(" Rate", ""), color: "#91c63d", data: [] },
                { dataField: "CS0", name: fieldMapper.campus["CS0" + "ATYRYR"].replace("Attendance: ", "").replace(" Rate", ""), color: "#c3151c", data: [] },
            ];

            _.each(series, function (item, index) {
                _.each(categories, function (cat, i) {
                    var field = item.dataField + cat.code + "YRYR";
                    item.data.push($scope.campus.dropoutAll[field] || 0);
                });
            });

            series = _.filter(series, function (i) { return i.data.length > 0 });

            $("#drpAll").kendoChart({
                legend: { position: 'bottom', visible: true },
                seriesDefaults: {
                    type: "column",
                    labels: { visible: true, template: '#= !value || value < 0 ?  \'N/A\' : value.toFixed(0) + \'%\' #' }
                },
                plotArea: {
                    margin: { top: 20 }
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