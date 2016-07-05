angular.module('myApp').factory('campusStaar', ['campusData', '$timeout', 'fieldMapper', '$q', function (campusData, $timeout, fieldMapper, $q) {
    var chartMapper, $scope;

    return new function () {
        var self = this;
        var colors = ["#c3151c", "#003662", "#fbb613", "#0086a1", "#ef5727", "#91c63d"];

        var extendChartMapper = function (chartMapper) {

            chartMapper.staarGrades = {

                kChart: function () {
                    return $("#staarGrades").data("kendoChart");
                },
                data: function () {
                    if ($scope.staarAllGradesRecType == 'rec') {
                        return [$scope.campus.phase2];
                    }
                    else {
                        return [$scope.campus.staarGrades];
                    }

                }
            };
        };

        var initScope = function () {
            $scope.starrAllRecType = "1S"; /* 1S - Phase1 Level2, 42 - Postsecondary Readiness*/
            $scope.staarSubjectRecType = "rec";
            $scope.filteredSubjects = {};
            $scope.staarAllGradesSubType = "";
            $scope.$watchGroup(['starrAllRecType', 'starrAllSubType', 'starrAllDemoType', 'starrAllChartType'], function (newValues, oldValues, scope) {
                //createStaarAll();
            });

            $scope.$watchGroup(['staarAllGradesRecType'], function (newValues, oldValues, scope) {
                if (!newValues) return;
                createStaarGrades();
            });

            $scope.$watch('staarAllGradesSubType', function (newValue, oldValue, scope) {
                if (!newValue) return;
                $scope.spinner = true;
                getStaarGradesWithChange($scope.selectedCampus.CAMPUS, scope.selectStaarGrades, scope.staarAllGradesSubType);
            });

        };

        this.Init = function (scope, chartMapper) {
            $scope = scope;
            initScope();
            extendChartMapper(chartMapper);
        };

        this.CreateStaarGrades = function (campusID) {
            return campusData.getStaarGrades(campusID).then(function (data) {
                $scope.campus.staarGrades = data[0];
                $scope.campus.phase2 = data[1];
                createStaarGrades();
            });
        };

        this.CreateSelectStaarGrades = function (campusID) {
            var sub = {};
            var grade = $scope.selectStaarGrades;
            return campusData.getSelectStaarGrades(grade).then(function (data) {
                $scope.subject = data;
                $scope.selectStaarGrades = ($scope.selectedCampus.GRDTYPE == 'S' ? "EOC" : "3");
                $scope.gradeChange();
            });
        };

        this.CreateStaarSubject = function (campusID) {
            return campusData.getNewStaarSubject(campusID).then(function (data) {
                $scope.campus.staarSubject = data;
                createStaarSubject();
            });
        };
        function getStaarGradesWithChange(campusID, grade, subject) {
            return campusData.getStaarGrades(campusID, grade, subject).then(function (data) {
                $scope.spinner = false;
                $scope.campus.staarGrades = data[0];
                $scope.campus.phase2 = data[1];
                createStaarGrades();
            });
        };
        /* Chart Functions */

        function createStaarGrades() {
            if (!$scope.campus.staarGrades && !$scope.campus.phase2) return;

            var source = [];
            if ($scope.staarAllGradesRecType == 'rec') {
                $scope.campus.phase2.DISTNAME = $scope.selectedCampus.CAMPNAME;
                if (!$scope.campus.phase2.econ) $scope.campus.phase2.econ = "-1";
                if (!$scope.campus.phase2.ecoy) $scope.campus.phase2.ecoy = "-1";
                if (!$scope.campus.phase2.ethb) $scope.campus.phase2.ethb = "-1";
                if (!$scope.campus.phase2.ethh) $scope.campus.phase2.ethh = "-1";
                if (!$scope.campus.phase2.ethw) $scope.campus.phase2.ethw = "-1";
                if (!$scope.campus.phase2.lepc) $scope.campus.phase2.lepc = "-1";

                source.push($scope.campus.phase2);
            }
            else {
                if (!$scope.campus.staarGrades.econ) $scope.campus.staarGrades.econ = "-1";
                if (!$scope.campus.staarGrades.ecoy) $scope.campus.staarGrades.ecoy = "-1";
                if (!$scope.campus.staarGrades.ethb) $scope.campus.staarGrades.ethb = "-1";
                if (!$scope.campus.staarGrades.ethh) $scope.campus.staarGrades.ethh = "-1";
                if (!$scope.campus.staarGrades.ethw) $scope.campus.staarGrades.ethw = "-1";
                if (!$scope.campus.staarGrades.lepc) $scope.campus.staarGrades.lepc = "-1";

                $scope.campus.staarGrades.DISTNAME = $scope.selectedCampus.CAMPNAME;
                source = [$scope.campus.staarGrades];
            }

            var categories = [
                { code: "econ", name: "Non-Eco dis", color: '#ef5727' },
                { code: "ecoy", name: "Eco Dis", color: '#91c63d' },
                { code: "ethb", name: "African American", color: '#c3151c' },
                { code: "ethh", name: "Hispanic", color: '#fbb613' },
                { code: "ethw", name: "White", color: '#003662' },
                { code: "lepc", name: "LEP", color: '#0086a1' }];
            var series = [];
            _.each(categories, function (item, index) {
                series.push({ field: item.code, name: item.name, color: item.color });
            });

            $("#staarGrades").kendoChart({
                legend: {
                    visible: true
                },
                seriesDefaults: {
                    type: "column",
                    labels: {
                        visible: true,
                        template: "#= value < 0 ? 'N/A' : value + '%' #",
                    }
                },
                tooltip: {
                    visible: true,
                    template: "#= series.name #: #=  (!value || value < 0) ? 'N/A' : value + '%' #",
                    color: 'white'
                },
                dataSource: {
                    data: source
                },
                series: series,
                valueAxis: {
                    majorGridLines: {
                        visible: true
                    },
                    visible: true,
                    labels: {
                        template: "#: value # %"
                    },
                    min: 0
                },
                categoryAxis: {
                    field: "DISTNAME",
                    majorGridLines: {
                        visible: false
                    },
                    line: {
                        visible: false
                    }
                }
            });
        };
        function createSelectStaarGrades() {
            if (!$scope.subject) return;
        };
    };
}]);