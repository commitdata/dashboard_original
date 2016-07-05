angular.module('myApp').factory('campusAdmissions', ['campusData', '$timeout', 'fieldMapper', 'd2bURI', 'JSONToCSV', '$q', function (campusData, $timeout, fieldMapper, d2bURI, JSONToCSV, $q) {
    var chartMapper, $scope;

    return new function () {
        var self = this;

        var colors = ["#c3151c", "#003662", "#fbb613", "#0086a1", "#ef5727", "#91c63d"];

        var extendChartMapper = function (chartMapper) {
            chartMapper.admActSat = {
                kChart: function () {
                    return $("#admActSat").data("kendoChart");
                },
                data: function () {
                    return [_.pick($scope.campus.admissionAll, _.filter(_.keys($scope.campus.admissionAll), function (key) { return key.indexOf("CTYRYR") > -1 || key.indexOf("CCYRYR") > -1 || key == "CAMPUS"; }))];
                }
            };
            chartMapper.admActAverage = {
                kChart: function () {
                    return $("#admActAverage").data("kendoChart");
                },
                data: function () {
                    return [_.pick($scope.campus.admissionAll, _.filter(_.keys($scope.campus.admissionAll), function (key) { return key.indexOf("CA") > -1 || key == "CAMPUS"; }))];
                }
            };
            chartMapper.admSatAverage = {
                kChart: function () {
                    return $("#admSatAverage").data("kendoChart");
                },
                data: function () {
                    return [_.pick($scope.campus.admissionAll, _.filter(_.keys($scope.campus.admissionAll), function (key) { return key.indexOf("CS") > -1 || key == "CAMPUS"; }))];
                }
            };
        };

        var initScope = function () {
            $scope.admActSatTestedState = true;
            $scope.admActSatCriterianState = true;
            $scope.admSatAverageAllState = true;
            $scope.admSatAverageELAState = true;
            $scope.admSatAverageMathState = true;
            $scope.admActAverageAllState = true;
            $scope.admActAverageELAState = true;
            $scope.admActAverageMathState = true;
            $scope.admActAverageSciState = true;

            $scope.$watchGroup(['admActSatTestedState', 'admActSatCriterianState'], function (newValues, oldValues, scope) {
                createActSatPercentage();
            });

            $scope.$watchGroup(['admSatAverageAllState', 'admSatAverageELAState', 'admSatAverageMathState'], function (newValues, oldValues, scope) {
                createSatAverage();
            });

            $scope.$watchGroup(['admActAverageAllState', 'admActAverageELAState', 'admActAverageMathState', 'admActAverageSciState'], function (newValues, oldValues, scope) {
                createActAverage();
            });

        };

        this.Init = function (scope, chartMapper) {
            $scope = scope;
            initScope();
            extendChartMapper(chartMapper);
        };


        this.CreateAdmissionsAll = function (campusID) {
            return campusData.getAdmissionAll(campusID).then(function (data) {
                $scope.campus.admissionAll = data[0];
                createActSatPercentage();
                createActAverage();
                createSatAverage();
            });
        };

        /* Chart functions */

        function createActSatPercentage() {
            if (!$scope.campus.admissionAll) return;

            var categories = [];
            if ($scope.admActSatTestedState) {
                categories.push({ code: "CT", name: "Test-Taking" });
            }
            if ($scope.admActSatCriterianState) {
                categories.push({ code: "CC", name: "Above Criterion" });
            }


            var series = [
                { dataField: "CA0", name: fieldMapper.campus["CA0" + "CTYRYR"].replace("SAT/ACT: ", "").replace(", % Test-Taking", "").replace(" Students", ""), color: "#91c63d", data: [] },
                { dataField: "CB0", name: fieldMapper.campus["CB0" + "CTYRYR"].replace("SAT/ACT: ", "").replace(", % Test-Taking", "").replace(" Students", ""), color: "#003662", data: [] },
                { dataField: "CI0", name: fieldMapper.campus["CI0" + "CTYRYR"].replace("SAT/ACT: ", "").replace(", % Test-Taking", "").replace(" Students", ""), color: "#fbb613", data: [] },
                { dataField: "CH0", name: fieldMapper.campus["CH0" + "CTYRYR"].replace("SAT/ACT: ", "").replace(", % Test-Taking", "").replace(" Students", ""), color: "#c3151c", data: [] },
                { dataField: "CW0", name: fieldMapper.campus["CW0" + "CTYRYR"].replace("SAT/ACT: ", "").replace(", % Test-Taking", "").replace(" Students", ""), color: "#fbb613", data: [] },
                { dataField: "C30", name: fieldMapper.campus["C30" + "CTYRYR"].replace("SAT/ACT: ", "").replace(", % Test-Taking", "").replace(" Students", ""), color: "#0086a1", data: [] },
                { dataField: "C40", name: fieldMapper.campus["C40" + "CTYRYR"].replace("SAT/ACT: ", "").replace(", % Test-Taking", "").replace(" Students", ""), color: "#c3151c", data: [] },
                { dataField: "C20", name: fieldMapper.campus["C20" + "CTYRYR"].replace("SAT/ACT: ", "").replace(", % Test-Taking", "").replace(" Students", ""), color: "#003662", data: [] },
                { dataField: "CE0", name: fieldMapper.campus["CE0" + "CTYRYR"].replace("SAT/ACT: ", "").replace(", % Test-Taking", "").replace(" Students", ""), color: "#ef5727", data: [] },
                { dataField: "CM0", name: fieldMapper.campus["CM0" + "CTYRYR"].replace("SAT/ACT: ", "").replace(", % Test-Taking", "").replace(" Students", ""), color: "#0086a1", data: [] },
                { dataField: "CF0", name: fieldMapper.campus["CF0" + "CTYRYR"].replace("SAT/ACT: ", "").replace(", % Test-Taking", "").replace(" Students", ""), color: "#003662", data: [] },
            ];

            _.each(series, function (item, index) {
                _.each(categories, function (cat, i) {
                    var field = item.dataField + cat.code + "YRYR";
                    item.data.push($scope.campus.admissionAll[field] || 0);
                });
            });

            series = _.filter(series, function (i) { return i.data.length > 0 });

            $("#admActSat").kendoChart({
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

        function createActAverage() {
            if (!$scope.campus.admissionAll) return;

            var categories = [];
            if ($scope.admActAverageAllState) {
                categories.push({ code: "CAA", name: "All Subjects" });
            }
            if ($scope.admActAverageELAState) {
                categories.push({ code: "CAE", name: "ELA" });
            }
            if ($scope.admActAverageMathState) {
                categories.push({ code: "CAM", name: "Mathematics" });
            }
            if ($scope.admActAverageSciState) {
                categories.push({ code: "CAC", name: "Science" });
            }

            var series = [
                { dataField: "CA0", name: fieldMapper.campus["CA0" + "CTYRYR"].replace("SAT/ACT: ", "").replace(", % Test-Taking", "").replace(" Students", ""), color: "#91c63d", data: [] },
                { dataField: "CB0", name: fieldMapper.campus["CB0" + "CTYRYR"].replace("SAT/ACT: ", "").replace(", % Test-Taking", "").replace(" Students", ""), color: "#003662", data: [] },
                { dataField: "CI0", name: fieldMapper.campus["CI0" + "CTYRYR"].replace("SAT/ACT: ", "").replace(", % Test-Taking", "").replace(" Students", ""), color: "#fbb613", data: [] },
                { dataField: "CH0", name: fieldMapper.campus["CH0" + "CTYRYR"].replace("SAT/ACT: ", "").replace(", % Test-Taking", "").replace(" Students", ""), color: "#c3151c", data: [] },
                { dataField: "CW0", name: fieldMapper.campus["CW0" + "CTYRYR"].replace("SAT/ACT: ", "").replace(", % Test-Taking", "").replace(" Students", ""), color: "#fbb613", data: [] },
                { dataField: "C30", name: fieldMapper.campus["C30" + "CTYRYR"].replace("SAT/ACT: ", "").replace(", % Test-Taking", "").replace(" Students", ""), color: "#0086a1", data: [] },
                { dataField: "C40", name: fieldMapper.campus["C40" + "CTYRYR"].replace("SAT/ACT: ", "").replace(", % Test-Taking", "").replace(" Students", ""), color: "#c3151c", data: [] },
                { dataField: "C20", name: fieldMapper.campus["C20" + "CTYRYR"].replace("SAT/ACT: ", "").replace(", % Test-Taking", "").replace(" Students", ""), color: "#003662", data: [] },
                { dataField: "CE0", name: fieldMapper.campus["CE0" + "CTYRYR"].replace("SAT/ACT: ", "").replace(", % Test-Taking", "").replace(" Students", ""), color: "#ef5727", data: [] },
                { dataField: "CM0", name: fieldMapper.campus["CM0" + "CTYRYR"].replace("SAT/ACT: ", "").replace(", % Test-Taking", "").replace(" Students", ""), color: "#0086a1", data: [] },
                { dataField: "CF0", name: fieldMapper.campus["CF0" + "CTYRYR"].replace("SAT/ACT: ", "").replace(", % Test-Taking", "").replace(" Students", ""), color: "#003662", data: [] },
            ];

            _.each(series, function (item, index) {
                _.each(categories, function (cat, i) {
                    var field = item.dataField + cat.code + "YRYR";
                    item.data.push($scope.campus.admissionAll[field] || 0);
                });
            });

            series = _.filter(series, function (i) { return i.data.length > 0 });

            $("#admActAverage").kendoChart({
                legend: { position: 'bottom', visible: true },
                seriesDefaults: {
                    type: "column",
                    labels: { visible: true, template: '#= !value || value < 0 ?  \'N/A\' : value.toFixed(0)  #' }
                },
                plotArea: {
                    margin: { top: 20 }
                },
                series: series,
                valueAxis: {
                    labels: { template: '#=value #' },
                    min: 0,
                    max: 36
                },
                categoryAxis: {
                    categories: _.pluck(categories, "name"),
                    labels: { visible: true }
                },
                tooltip: { visible: true, template: '#= series.name #: #= !value || value < 0 ?  \'N/A\' : value.toFixed(0)  #', color: 'white' }
            });

        };

        function createSatAverage() {
            if (!$scope.campus.admissionAll) return;

            var categories = [];
            if ($scope.admSatAverageAllState) {
                categories.push({ code: "CSA", name: "All Subjects" });
            }
            if ($scope.admSatAverageELAState) {
                categories.push({ code: "CSE", name: "ELA" });
            }
            if ($scope.admSatAverageMathState) {
                categories.push({ code: "CSM", name: "Mathematics" });
            }


            var series = [
                { dataField: "CA0", name: fieldMapper.campus["CA0" + "CTYRYR"].replace("SAT/ACT: ", "").replace(", % Test-Taking", "").replace(" Students", ""), color: "#91c63d", data: [] },
                { dataField: "CB0", name: fieldMapper.campus["CB0" + "CTYRYR"].replace("SAT/ACT: ", "").replace(", % Test-Taking", "").replace(" Students", ""), color: "#003662", data: [] },
                { dataField: "CI0", name: fieldMapper.campus["CI0" + "CTYRYR"].replace("SAT/ACT: ", "").replace(", % Test-Taking", "").replace(" Students", ""), color: "#fbb613", data: [] },
                { dataField: "CH0", name: fieldMapper.campus["CH0" + "CTYRYR"].replace("SAT/ACT: ", "").replace(", % Test-Taking", "").replace(" Students", ""), color: "#c3151c", data: [] },
                { dataField: "CW0", name: fieldMapper.campus["CW0" + "CTYRYR"].replace("SAT/ACT: ", "").replace(", % Test-Taking", "").replace(" Students", ""), color: "#fbb613", data: [] },
                { dataField: "C30", name: fieldMapper.campus["C30" + "CTYRYR"].replace("SAT/ACT: ", "").replace(", % Test-Taking", "").replace(" Students", ""), color: "#0086a1", data: [] },
                { dataField: "C40", name: fieldMapper.campus["C40" + "CTYRYR"].replace("SAT/ACT: ", "").replace(", % Test-Taking", "").replace(" Students", ""), color: "#c3151c", data: [] },
                { dataField: "C20", name: fieldMapper.campus["C20" + "CTYRYR"].replace("SAT/ACT: ", "").replace(", % Test-Taking", "").replace(" Students", ""), color: "#003662", data: [] },
                { dataField: "CE0", name: fieldMapper.campus["CE0" + "CTYRYR"].replace("SAT/ACT: ", "").replace(", % Test-Taking", "").replace(" Students", ""), color: "#ef5727", data: [] },
                { dataField: "CM0", name: fieldMapper.campus["CM0" + "CTYRYR"].replace("SAT/ACT: ", "").replace(", % Test-Taking", "").replace(" Students", ""), color: "#0086a1", data: [] },
                { dataField: "CF0", name: fieldMapper.campus["CF0" + "CTYRYR"].replace("SAT/ACT: ", "").replace(", % Test-Taking", "").replace(" Students", ""), color: "#003662", data: [] },
            ];

            _.each(series, function (item, index) {
                _.each(categories, function (cat, i) {
                    var field = item.dataField + cat.code + "YRYR";
                    item.data.push($scope.campus.admissionAll[field] || 0);
                });
            });

            series = _.filter(series, function (i) { return i.data.length > 0 });

            $("#admSatAverage").kendoChart({
                legend: { position: 'bottom', visible: true },
                seriesDefaults: {
                    type: "column",
                    labels: { visible: true, template: '#= !value || value < 0 ?  \'N/A\' : value.toFixed(0)  #' }
                },
                plotArea: {
                    margin: { top: 20 }
                },
                series: series,
                valueAxis: {
                    labels: { template: '#=value #' },
                    min: 0,
                    max: 2400
                },
                categoryAxis: {
                    categories: _.pluck(categories, "name"),
                    labels: { visible: true }
                },
                tooltip: { visible: true, template: '#= series.name #: #= !value || value < 0 ?  \'N/A\' : value.toFixed(0) #', color: 'white' }
            });

        };

    };
}]);