angular.module('myApp').factory('campusLong', ['campusData', '$timeout', '$http', 'fieldMapper', 'd2bURI', 'JSONToCSV', '$q', function (campusData, $timeout, $http, fieldMapper, d2bURI, JSONToCSV, $q) {
    var chartMapper, $scope;

    return new function () {
        var self = this;

        var colors = ["#c3151c", "#003662", "#fbb613", "#0086a1", "#ef5727", "#91c63d"];

        var extendChartMapper = function (chartMapper) {
            chartMapper.demographicsTime = {
                kChart: function () { return $("#demographicsTime").data("kendoChart"); },
                data: function () {
                    return _.map($scope.demographicsTime, function (item) { return _.pick(item, 'CAMPUS', 'CAMPNAME', 'YEAR', 'CPETWHIP', 'CPETBLAP', 'CPETHISP') });
                }
            };
            chartMapper.enrollmentTime = {
                kChart: function () { return $("#enrollmentTime").data("kendoChart"); },
                data: function () {
                    return _.map($scope.demographicsTime, function (item) { return _.pick(item, 'CAMPUS', 'CAMPNAME', 'YEAR', 'CPETALLC') });
                }
            };
            chartMapper.lowIncomeTime = {
                kChart: function () { return $("#lowIncomeTime").data("kendoChart"); },
                data: function () {
                    return _.map($scope.demographicsTime, function (item) { return _.pick(item, 'CAMPUS', 'CAMPNAME', 'YEAR', 'CPETECOP') });
                }
            };
            chartMapper.mobilityTime = {
                kChart: function () { return $("#mobilityTime").data("kendoChart"); },
                data: function () {
                    return _.map($scope.mobilityTime, function (item) { return _.pick(item, 'CAMPUS', 'CAMPNAME', 'YEAR', 'CPEMALLP') });
                }
            };
            chartMapper.attendanceTime = {
                kChart: function () { return $("#attendanceTime").data("kendoChart"); },
                data: function () {
                    return _.map($scope.attendanceTime, function (item) { return _.pick(item, 'CAMPUS', 'CAMPNAME', 'YEAR', 'CA0ATSTR') });
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

        this.CreateCharts = function (campusID) {
            return campusData.getDemograhicsTime(campusID).then(function (response) {
                $scope.demographicsTime = response.data;
                createDemographicsTime();
                createEnrollmentTime();
                createLowIncomeTime();
            });
        };

        this.CreateMobility = function (campusID) {
            return campusData.getMobilityTime(campusID).then(function (response) {
                $scope.mobilityTime = response.data;
                createMobilityTime();
            });
        };


        this.CreateAttendance = function (campusID) {
            return campusData.getAttendanceTime(campusID).then(function (response) {
                $scope.attendanceTime = response.data;
                createAttendanceTime();
            });
        };
        /* Chart Functions */
        function createDemographicsTime() {
            _.each($scope.demographicsTime, function (item) {
                var other = 100 - (item["CPETWHIP"] + item["CPETBLAP"] + item["CPETHISP"]);
                item["Other"] = other;
            })
            $("#demographicsTime").kendoChart({
                legend: {
                    position: "bottom"
                },
                dataSource: { data: $scope.demographicsTime },
                seriesDefaults: {
                    type: "area",
                    stack: {
                        type: "100%"
                    }
                },
                plotArea: { margin: { top: 20 } },
                series: [
                     {
                         color: '#003662',
                         name: "African American",
                         field: 'CPETBLAP'
                     }, {
                         color: '#fbb613',
                         name: "White",
                         field: 'CPETWHIP'
                     }, {
                         color: '#ef5727',
                         name: "Hispanic",
                         field: 'CPETHISP'
                     },
                    {
                        color: '#91c63d',
                        name: "Other",
                        field: 'Other'
                    }
                ],
                valueAxis: {
                    line: {
                        visible: false
                    }
                },
                categoryAxis: {
                    field: 'YEAR',
                    majorGridLines: {
                        visible: false
                    },
                    labels: {
                        rotation: -70,
                        padding: { right: 10 }
                    }
                },
                tooltip: {
                    visible: true,
                    color: 'white',
                    template: "#= series.name # : #= value.toFixed(0) #%"
                }
            });
        };

        function createEnrollmentTime() {

            $("#enrollmentTime").kendoChart({
                dataSource: {
                    data: $scope.demographicsTime
                },
                legend: {
                    position: 'bottom'
                },
                seriesDefaults: {
                    type: "line",
                    labels: {
                        visible: true,
                        format: "{0}",
                        background: "transparent"
                    }
                },
                series: [{
                    field: "CPETALLC",
                    name: "Enrollment",
                    color: '#003662'
                }],
                plotArea: { margin: { top: 20 } },
                valueAxis: {
                    labels: {
                        format: "{0}"
                    },
                    line: {
                        visible: true
                    }
                },
                categoryAxis: {
                    field: "YEAR",
                    majorGridLines: {
                        visible: false
                    },
                    labels: {
                        rotation: -70,
                        padding: { right: 10 }
                    }
                },
                tooltip: {
                    visible: true,
                    color: 'white',
                    template: "#= dataItem.YEAR  #: #= value #"
                }
            });
        };

        function createLowIncomeTime() {

            $("#lowIncomeTime").kendoChart({
                dataSource: {
                    data: $scope.demographicsTime
                },
                legend: { position: 'bottom' },
                seriesDefaults: {
                    type: 'line',
                    labels: { visible: true, template: '#= value.toFixed(0) # %' }
                },
                series: [{ field: 'CPETECOP', name: '% Economically Disadvantaged', color: '#003662' }],
                plotArea: { margin: { top: 20 } },
                valueAxis: {
                    labels: { template: '#: value # %' },
                    min: 0,
                    max: 100
                },
                categoryAxis: {
                    field: 'YEAR',
                    labels: {
                        rotation: -70,
                        padding: { right: 10 }
                    }
                },
                tooltip: { visible: true, template: '#= dataItem.YEAR # : #= value.toFixed(0) # %', color: 'white' }
            });
        };

        function createMobilityTime() {

            $("#mobilityTime").kendoChart({
                dataSource: {
                    data: $scope.mobilityTime
                },
                legend: { position: 'bottom' },
                seriesDefaults: {
                    type: 'line',
                    labels: { visible: true, template: '#= value.toFixed(0) # %' }
                },
                series: [{ field: 'CPEMALLP', name: 'Mobility', color: '#003662' }],
                plotArea: { margin: { top: 20 } },
                valueAxis: {
                    labels: { template: '#: value # %' },
                    min: 0,
                    max: 100
                },
                categoryAxis: {
                    field: 'YEAR',
                    labels: {
                        rotation: -70,
                        padding: { right: 10 }
                    }
                },
                tooltip: { visible: true, template: '#= dataItem.YEAR # : #= value.toFixed(0) # %', color: 'white' }
            });
        };

        function createAttendanceTime() {

            $("#attendanceTime").kendoChart({
                dataSource: {
                    data: $scope.attendanceTime
                },
                legend: { position: 'bottom' },
                seriesDefaults: {
                    type: 'line',
                    labels: { visible: true, template: '#= value.toFixed(0) # %' }
                },
                series: [{ field: 'CA0ATSTR', name: 'Attendance', color: '#003662' }],
                plotArea: { margin: { top: 20 } },
                valueAxis: {
                    labels: { template: '#: value # %' },
                    min: 0,
                    max: 100
                },
                categoryAxis: {
                    field: 'YEAR',
                    labels: {
                        rotation: -70,
                        padding: { right: 10 }
                    }
                },
                tooltip: { visible: true, template: '#= dataItem.YEAR # : #= value.toFixed(0) # %', color: 'white' }
            });
        };

    };
}]);