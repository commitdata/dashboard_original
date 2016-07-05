angular.module('myApp').factory('districtStaar', ['district2015Data', '$timeout', 'fieldMapper', '$q', function (district2015Data, $timeout, fieldMapper, $q) {
    var chartMapper, $scope;

    return new function () {
        var self = this;
        var extendChartMapper = function (chartMapper) {
            chartMapper.staarGrades = {
                kChart: function () {
                    return $("#staarGrades").data("kendoChart");
                },
                data: function () {
                    if ($scope.staarGradesRecType == "42YRYR") {
                        if ($scope.staarGradesState) {
                            return [$scope.state.staarAllGrades, $scope.state.stateOne];
                        }
                        else {
                            return [$scope.state.staarAllGrades];
                        }

                    }
                    else {
                        if ($scope.staarGradesState) {
                            return [$scope.district.staarAllGrades, $scope.district.state];
                        }
                        return [$scope.district.staarAllGrades];


                    }


                }
            };
            chartMapper.staarSubjectGrades = {
                kChart: function () {
                    return $("#staarSubjectGrades").data("kendoChart");
                },
                data: function () {
                    return $scope.districtStaarSubjectGrades;
                }
            };
        };

        var initScope = function () {
            $scope.staarGradesRecType = "";
            $scope.filteredSubjects = {};
            $scope.staarAllGradesSubType = "";
            $scope.staarAllSubjectGradesRecType = "ph1";
            $scope.staarAllSubjectGradesSortType = "subject";

            $scope.$watch('staarGradesState', function (newValue, oldValue, scope) {
                if (!newValue && !oldValue) return;

                if ($scope.staarGradesState) {
                    $scope.spinner = true;
                    createStaarGradesByState(scope.selectedDistrict.DISTRICT, scope.selectStaarGrades, scope.staarAllGradesSubType);
                }
                else if (!$scope.spinner) {
                    $scope.spinner = true;
                    getStaarGradesWithChange(scope.selectedDistrict.DISTRICT, scope.selectStaarGrades, scope.staarAllGradesSubType);
                }
            });

            $scope.$watchGroup(['staarGradesRecType'], function (newValues, oldValues, scope) {
                if (!newValues) return;
                createStaarGrades();
            });

            $scope.$watch('selectStaarGrades', function (newValue, oldValue) {
                if (newValue == undefined) return;
                createSelectStaarGrades();
            });

            $scope.$watch('staarAllGradesSubType', function (newValue, oldValue, scope) {
                if (!newValue) return;
                $scope.spinner = true;
                $scope.staarGradesState = false;
                getStaarGradesWithChange(scope.selectedDistrict.DISTRICT, scope.selectStaarGrades, scope.staarAllGradesSubType);
            });
        };

        this.Init = function (scope, chartMapper) {
            $scope = scope;
            initScope();
            extendChartMapper(chartMapper);
        };

        this.CreateStaarGrades = function (districtID) {
            var state = $scope.staarGradesState;
            return district2015Data.getStaarGrades(districtID, state).then(function (data) {
                $scope.district.staarAllGrades = data[0];
                $scope.state.staarAllGrades = data[1];
                createStaarGrades();
            });
        };

        //Grades subject fetch code
        this.CreateSelectStaarGrades = function (districtID) {
            var sub = {};
            var grade = $scope.selectStaarGrades;
            return district2015Data.getSelectStaarGrades(grade).then(function (data) {
                $scope.subject = data;
                $scope.selectStaarGrades = "3";
                $scope.gradeChange();
            });
        };

        function getStaarGradesWithChange(districtID, grade, subject) {
            var state = $scope.staarGradesState;
            return district2015Data.getStaarGrades(districtID, grade, subject, state).then(function (data) {
                $scope.spinner = false;
                $scope.district.staarAllGrades = data[0];
                $scope.state.staarAllGrades = data[1];
                createStaarGrades();
            });
        };

        // for add state
        function createStaarGradesByState(districtID, grade, subject) {
            var state = $scope.staarGradesState;

            return district2015Data.getStaarGrades(districtID, grade, subject, state).then(function (data) {
                $scope.spinner = false;
                $scope.district.state = data[0];
                $scope.state.stateOne = data[1];
                createStaarGrades();
            });
        }
        function createStaarGrades() {
            if (!$scope.district.staarAllGrades) return;
            var source = [];

            if ($scope.staarGradesRecType == '42YRYR') {
                $scope.state.staarAllGrades.DISTNAME = $scope.selectedDistrict.DISTNAME;

                if (!$scope.state.staarAllGrades.econ || $scope.state.staarAllGrades.econ == "NaN") $scope.state.staarAllGrades.econ = "-1";
                if (!$scope.state.staarAllGrades.ecoy || $scope.state.staarAllGrades.ecoy == "NaN") $scope.state.staarAllGrades.ecoy = "-1";
                if (!$scope.state.staarAllGrades.ethb || $scope.state.staarAllGrades.ethb == "NaN") $scope.state.staarAllGrades.ethb = "-1";
                if (!$scope.state.staarAllGrades.ethh || $scope.state.staarAllGrades.ethh == "NaN") $scope.state.staarAllGrades.ethh = "-1";
                if (!$scope.state.staarAllGrades.ethw || $scope.state.staarAllGrades.ethw == "NaN") $scope.state.staarAllGrades.ethw = "-1";
                if (!$scope.state.staarAllGrades.lepc || $scope.state.staarAllGrades.lepc == "NaN") $scope.state.staarAllGrades.lepc = "-1";

                source.push($scope.state.staarAllGrades);
                if ($scope.staarGradesState) {
                    $scope.state.stateOne.DISTNAME = "State";
                    if (!$scope.state.stateOne.econ || $scope.state.stateOne.econ == "NaN") $scope.state.stateOne.econ = "-1";
                    if (!$scope.state.stateOne.ecoy || $scope.state.stateOne.ecoy == "NaN") $scope.state.stateOne.ecoy = "-1";
                    if (!$scope.state.stateOne.ethb || $scope.state.stateOne.ethb == "NaN") $scope.state.stateOne.ethb = "-1";
                    if (!$scope.state.stateOne.ethh || $scope.state.stateOne.ethh == "NaN") $scope.state.stateOne.ethh = "-1";
                    if (!$scope.state.stateOne.ethw || $scope.state.stateOne.ethw == "NaN") $scope.state.stateOne.ethw = "-1";
                    if (!$scope.state.stateOne.lepc || $scope.state.stateOne.lepc == "NaN") $scope.state.stateOne.lepc = "-1";

                    source.push($scope.state.stateOne);
                }
            }
            else {
                $scope.district.staarAllGrades.DISTNAME = $scope.selectedDistrict.DISTNAME;

                if (!$scope.district.staarAllGrades.econ || $scope.district.staarAllGrades.econ == "NaN") $scope.district.staarAllGrades.econ = "-1";
                if (!$scope.district.staarAllGrades.ecoy || $scope.district.staarAllGrades.ecoy == "NaN") $scope.district.staarAllGrades.ecoy = "-1";
                if (!$scope.district.staarAllGrades.ethb || $scope.district.staarAllGrades.ethb == "NaN") $scope.district.staarAllGrades.ethb = "-1";
                if (!$scope.district.staarAllGrades.ethh || $scope.district.staarAllGrades.ethh == "NaN") $scope.district.staarAllGrades.ethh = "-1";
                if (!$scope.district.staarAllGrades.ethw || $scope.district.staarAllGrades.ethw == "NaN") $scope.district.staarAllGrades.ethw = "-1";
                if (!$scope.district.staarAllGrades.lepc || $scope.district.staarAllGrades.lepc == "NaN") $scope.district.staarAllGrades.lepc = "-1";

                source = [$scope.district.staarAllGrades];
                if ($scope.staarGradesState) {
                    $scope.district.state.DISTNAME = "State";
                    if (!$scope.district.state.econ || $scope.district.state.econ == "NaN") $scope.district.state.econ = "-1";
                    if (!$scope.district.state.ecoy || $scope.district.state.ecoy == "NaN") $scope.district.state.ecoy = "-1";
                    if (!$scope.district.state.ethb || $scope.district.state.ethb == "NaN") $scope.district.state.ethb = "-1";
                    if (!$scope.district.state.ethh || $scope.district.state.ethh == "NaN") $scope.district.state.ethh = "-1";
                    if (!$scope.district.state.ethw || $scope.district.state.ethw == "NaN") $scope.district.state.ethw = "-1";
                    if (!$scope.district.state.lepc || $scope.district.state.lepc == "NaN") $scope.district.state.lepc = "-1";

                    source.push($scope.district.state);
                }
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
                    template: "#= series.name #: #= value < 0 ? 'N/A' : value + '%' #",
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