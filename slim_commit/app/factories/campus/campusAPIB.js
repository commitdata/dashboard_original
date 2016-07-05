angular.module('myApp').factory('campusAPIB', ['campusData', '$timeout', 'fieldMapper', 'd2bURI', 'JSONToCSV', '$q', function (campusData, $timeout, fieldMapper, d2bURI, JSONToCSV, $q) {
    var chartMapper, $scope;

    return new function () {
        var self = this;

        var colors = ["#c3151c", "#003662", "#fbb613", "#0086a1", "#ef5727", "#91c63d"];

        var extendChartMapper = function (chartMapper) {
            chartMapper.apibTested = {
                kChart: function () {
                    return $("#apibTested").data("kendoChart");
                },
                data: function () {
                    return [_.pick($scope.campus.apibAll, _.filter(_.keys($scope.campus.apibAll), function (key) { return key.indexOf("BT") > -1 || key == "CAMPUS"; }))];
                }
            };
            chartMapper.apibAbove = {
                kChart: function () {
                    return $("#apibAbove").data("kendoChart");
                },
                data: function () {
                    return [_.pick($scope.campus.apibAll, _.filter(_.keys($scope.campus.apibAll), function (key) { return key.indexOf("BK") > -1 || key == "CAMPUS"; }))];
                }
            };
        };

        var initScope = function () {

            $scope.apibTestedAllState = false;
            $scope.apibTestedELAState = true;
            $scope.apibTestedMathState = true;
            $scope.apibTestedSciState = true;

            $scope.apibAboveAllState = false;
            $scope.apibAboveELAState = true;
            $scope.apibAboveMathState = true;
            $scope.apibAboveSciState = true;

            $scope.$watchGroup(['apibTestedAllState', 'apibTestedELAState', 'apibTestedMathState', 'apibTestedSciState'], function (newValues, oldValues, scope) {
                createAPIBTested();
            });

            $scope.$watchGroup(['apibAboveAllState', 'apibAboveELAState', 'apibAboveMathState', 'apibAboveSciState'], function (newValues, oldValues, scope) {
                createAPIBAbove();
            });

        };

        this.Init = function (scope, chartMapper) {
            $scope = scope;
            initScope();
            extendChartMapper(chartMapper);
        };


        this.CreateAPIBAll = function (campusID) {
            return campusData.getAPIBAll(campusID).then(function (data) {
                $scope.campus.apibAll = data[0];
                createAPIBTested();
                createAPIBAbove();
            });
        };

        /* Chart functions */
        function createAPIBTested() {
            if (!$scope.campus.apibAll) return;

            var categories = [];
            if ($scope.apibTestedAllState) {
                categories.push({ code: "BTA", name: "All Subjects" });
            }
            if ($scope.apibTestedELAState) {
                categories.push({ code: "BTE", name: "ELA" });
            }
            if ($scope.apibTestedMathState) {
                categories.push({ code: "BTM", name: "Mathematics" });
            }
            if ($scope.apibTestedSciState) {
                categories.push({ code: "BTC", name: "Science" });
            }

            var series = [
                { dataField: "CA0", name: fieldMapper.campus["CA0" + "BTAYRYR"].replace("AP/IB: ", "").replace(" (All Subjects) % Taking", ""), color: "#91c63d", data: [] },
                { dataField: "CB0", name: fieldMapper.campus["CB0" + "BTAYRYR"].replace("AP/IB: ", "").replace(" (All Subjects) % Taking", ""), color: "#003662", data: [] },
                { dataField: "CI0", name: fieldMapper.campus["CI0" + "BTAYRYR"].replace("AP/IB: ", "").replace(" (All Subjects) % Taking", ""), color: "#fbb613", data: [] },
                { dataField: "CH0", name: fieldMapper.campus["CH0" + "BTAYRYR"].replace("AP/IB: ", "").replace(" (All Subjects) % Taking", ""), color: "#c3151c", data: [] },
                { dataField: "CW0", name: fieldMapper.campus["CW0" + "BTAYRYR"].replace("AP/IB: ", "").replace(" (All Subjects) % Taking", ""), color: "#fbb613", data: [] },
                { dataField: "C30", name: fieldMapper.campus["C30" + "BTAYRYR"].replace("AP/IB: ", "").replace(" (All Subjects) % Taking", ""), color: "#0086a1", data: [] },
                { dataField: "C40", name: fieldMapper.campus["C40" + "BTAYRYR"].replace("AP/IB: ", "").replace(" (All Subjects) % Taking", ""), color: "#c3151c", data: [] },
                { dataField: "C20", name: fieldMapper.campus["C20" + "BTAYRYR"].replace("AP/IB: ", "").replace(" (All Subjects) % Taking", ""), color: "#003662", data: [] },
                { dataField: "CE0", name: fieldMapper.campus["CE0" + "BTAYRYR"].replace("AP/IB: ", "").replace(" (All Subjects) % Taking", ""), color: "#ef5727", data: [] },
                { dataField: "CM0", name: fieldMapper.campus["CM0" + "BTAYRYR"].replace("AP/IB: ", "").replace(" (All Subjects) % Taking", ""), color: "#0086a1", data: [] },
                { dataField: "CF0", name: fieldMapper.campus["CF0" + "BTAYRYR"].replace("AP/IB: ", "").replace(" (All Subjects) % Taking", ""), color: "#ef5727", data: [] },
            ];

            _.each(series, function (item, index) {
                _.each(categories, function (cat, i) {
                    var field = item.dataField + cat.code + "YRYR";
                    item.data.push($scope.campus.apibAll[field] || 0);
                });
            });

            series = _.filter(series, function (i) { return i.data.length > 0 });

            $("#apibTested").kendoChart({
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


        function createAPIBAbove() {
            if (!$scope.campus.apibAll) return;

            var categories = [];
            if ($scope.apibAboveAllState) {
                categories.push({ code: "BKA", name: "All Subjects" });
            }
            if ($scope.apibAboveELAState) {
                categories.push({ code: "BKE", name: "ELA" });
            }
            if ($scope.apibAboveMathState) {
                categories.push({ code: "BKM", name: "Mathematics" });
            }
            if ($scope.apibAboveSciState) {
                categories.push({ code: "BKC", name: "Science" });
            }

            var series = [
                { dataField: "CA0", name: fieldMapper.campus["CA0" + "BTAYRYR"].replace("AP/IB: ", "").replace(" (All Subjects) % Taking", ""), color: "#91c63d", data: [] },
                { dataField: "CB0", name: fieldMapper.campus["CB0" + "BTAYRYR"].replace("AP/IB: ", "").replace(" (All Subjects) % Taking", ""), color: "#003662", data: [] },
                { dataField: "CI0", name: fieldMapper.campus["CI0" + "BTAYRYR"].replace("AP/IB: ", "").replace(" (All Subjects) % Taking", ""), color: "#fbb613", data: [] },
                { dataField: "CH0", name: fieldMapper.campus["CH0" + "BTAYRYR"].replace("AP/IB: ", "").replace(" (All Subjects) % Taking", ""), color: "#c3151c", data: [] },
                { dataField: "CW0", name: fieldMapper.campus["CW0" + "BTAYRYR"].replace("AP/IB: ", "").replace(" (All Subjects) % Taking", ""), color: "#fbb613", data: [] },
                { dataField: "C30", name: fieldMapper.campus["C30" + "BTAYRYR"].replace("AP/IB: ", "").replace(" (All Subjects) % Taking", ""), color: "#0086a1", data: [] },
                { dataField: "C40", name: fieldMapper.campus["C40" + "BTAYRYR"].replace("AP/IB: ", "").replace(" (All Subjects) % Taking", ""), color: "#c3151c", data: [] },
                { dataField: "C20", name: fieldMapper.campus["C20" + "BTAYRYR"].replace("AP/IB: ", "").replace(" (All Subjects) % Taking", ""), color: "#003662", data: [] },
                { dataField: "CE0", name: fieldMapper.campus["CE0" + "BTAYRYR"].replace("AP/IB: ", "").replace(" (All Subjects) % Taking", ""), color: "#ef5727", data: [] },
                { dataField: "CM0", name: fieldMapper.campus["CM0" + "BTAYRYR"].replace("AP/IB: ", "").replace(" (All Subjects) % Taking", ""), color: "#0086a1", data: [] },
                { dataField: "CF0", name: fieldMapper.campus["CF0" + "BTAYRYR"].replace("AP/IB: ", "").replace(" (All Subjects) % Taking", ""), color: "#ef5727", data: [] },
            ];

            _.each(series, function (item, index) {
                _.each(categories, function (cat, i) {
                    var field = item.dataField + cat.code + "YRYR";
                    item.data.push($scope.campus.apibAll[field] || 0);
                });
            });

            series = _.filter(series, function (i) { return i.data.length > 0 });

            $("#apibAbove").kendoChart({
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