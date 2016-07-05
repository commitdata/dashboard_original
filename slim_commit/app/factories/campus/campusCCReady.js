angular.module('myApp').factory('campusCCReady', ['campusData', '$timeout', 'fieldMapper', 'd2bURI', 'JSONToCSV', '$q', function (campusData, $timeout, fieldMapper, d2bURI, JSONToCSV, $q) {
    var chartMapper, $scope;

    return new function () {
        var self = this;

        var colors = ["#c3151c", "#003662", "#fbb613", "#0086a1", "#ef5727", "#91c63d"];

        var extendChartMapper = function (chartMapper) {
            chartMapper.ccReady = {
                kChart: function () {
                    return $("#ccReady").data("kendoChart");
                },
                data: function () {
                    return [$scope.campus.ccReadyAll];
                }
            };
        };

        var initScope = function () {
            $scope.ccReadyArtsState = true;
            $scope.ccReadyMathState = true;
            $scope.ccReadyBothState = false;
            $scope.ccReadyCareerState = false;
            $scope.ccReadyCTEState = true;

            $scope.$watchGroup(['ccReadyArtsState', 'ccReadyMathState', 'ccReadyBothState', 'ccReadyCareerState', 'ccReadyCTEState'], function (newValues, oldValues, scope) {
                createCCReady();
            });

        };

        this.Init = function (scope, chartMapper) {
            $scope = scope;
            initScope();
            extendChartMapper(chartMapper);
        };


        this.CreateCCReadyAll = function (campusID) {
            return campusData.getCCReadyAll(campusID).then(function (data) {
                $scope.campus.ccReadyAll = data[0];
                createCCReady();
            });
        };

        /* Chart functions */

        function createCCReady() {
            if (!$scope.campus.ccReadyAll) return;

            var categories = [];
            if ($scope.ccReadyArtsState) {
                categories.push({ code: "CRR", name: "English Language Arts" });
            }
            if ($scope.ccReadyMathState) {
                categories.push({ code: "CRM", name: "Mathematics" });
            }
            if ($scope.ccReadyBothState) {
                categories.push({ code: "CRB", name: "Both Subjects" });
            }
            if ($scope.ccReadyCareerState) {
                categories.push({ code: "0GP", name: "College & Career Ready Graduates" });
            }
            if ($scope.ccReadyCTEState) {
                categories.push({ code: "0GV", name: "CTE-Coherent Sequence Graduates" });
            }


            var series = [
                { dataField: "CA", name: fieldMapper.campus["CA" + "CRRYRYR"].replace("College Ready: ", "").replace(" Reading % Ready", ""), color: "#91c63d", data: [] },
                { dataField: "CB", name: fieldMapper.campus["CB" + "CRRYRYR"].replace("College Ready: ", "").replace(" Reading % Ready", ""), color: "#003662", data: [] },
                { dataField: "CI", name: fieldMapper.campus["CI" + "CRRYRYR"].replace("College Ready: ", "").replace(" Reading % Ready", ""), color: "#fbb613", data: [] },
                { dataField: "CH", name: fieldMapper.campus["CH" + "CRRYRYR"].replace("College Ready: ", "").replace(" Reading % Ready", ""), color: "#c3151c", data: [] },
                { dataField: "CW", name: fieldMapper.campus["CW" + "CRRYRYR"].replace("College Ready: ", "").replace(" Reading % Ready", ""), color: "#fbb613", data: [] },
                { dataField: "C3", name: fieldMapper.campus["C3" + "CRRYRYR"].replace("College Ready: ", "").replace(" Reading % Ready", ""), color: "#0086a1", data: [] },
                { dataField: "C4", name: fieldMapper.campus["C4" + "CRRYRYR"].replace("College Ready: ", "").replace(" Reading % Ready", ""), color: "#c3151c", data: [] },
                { dataField: "C2", name: fieldMapper.campus["C2" + "CRRYRYR"].replace("College Ready: ", "").replace(" Reading % Ready", ""), color: "#003662", data: [] },
                { dataField: "CE", name: fieldMapper.campus["CE" + "CRRYRYR"].replace("College Ready: ", "").replace(" Reading % Ready", ""), color: "#ef5727", data: [] },
                { dataField: "CM", name: fieldMapper.campus["CM" + "CRRYRYR"].replace("College Ready: ", "").replace(" Reading % Ready", ""), color: "#0086a1", data: [] },
                { dataField: "CF", name: fieldMapper.campus["CF" + "CRRYRYR"].replace("College Ready: ", "").replace(" Reading % Ready", ""), color: "#ef5727", data: [] },
                { dataField: "CR", name: fieldMapper.campus["CR" + "CRRYRYR"].replace("College Ready: ", "").replace(" Reading % Ready", ""), color: "#fbb613", data: [] },
                { dataField: "CL", name: fieldMapper.campus["CL" + "CRRYRYR"].replace("College Ready: ", "").replace(" Reading % Ready", ""), color: "#91c63d", data: [] },
                { dataField: "CS", name: fieldMapper.campus["CS" + "CRRYRYR"].replace("College Ready: ", "").replace(" Reading % Ready", ""), color: "#c3151c", data: [] },
            ];

            _.each(series, function (item, index) {
                _.each(categories, function (cat, i) {
                    var field = item.dataField + cat.code + "YRYR";
                    item.data.push($scope.campus.ccReadyAll[field] || 0);
                });
            });

            series = _.filter(series, function (i) { return i.data.length > 0 });

            $("#ccReady").kendoChart({
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