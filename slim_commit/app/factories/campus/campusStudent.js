angular.module('myApp').factory('campusStudent', ['campusData', '$timeout', 'fieldMapper', 'd2bURI', 'JSONToCSV', '$q', function (campusData, $timeout, fieldMapper, d2bURI, JSONToCSV, $q) {
    var chartMapper, $scope;

    return new function () {
        var self = this;

        var colors = ["#c3151c", "#003662", "#fbb613", "#0086a1", "#ef5727", "#91c63d"];

        var extendChartMapper = function (chartMapper) {
            chartMapper.annualGraduates = {
                kChart: function () {
                    return $("#annualGraduates").data("kendoChart");
                },
                data: function () {
                    return [_.pick($scope.campus.studentAll, "CAMPUS", "CH0GRYRYR", "CB0GRYRYR", "CW0GRYRYR", "C30GRYRYR")];
                }
            };
            chartMapper.studentByDemo = {
                kChart: function () {
                    return $("#studentByDemo").data("kendoChart");
                },
                data: function () {
                    return [_.pick($scope.campus.studentAll, "CAMPUS", "CPETHISP", "CPETBLAP", "CPETWHIP", "CPETASIP")];
                }
            };
            chartMapper.retentionRates = {
                kChart: function () {
                    return $("#retentionRates").data("kendoChart");
                },
                data: function () {
                    return [_.pick($scope.campus.studentAll, _.filter(_.keys($scope.campus.studentAll), function (key) { return key.indexOf("CPER") > -1 || key == "CAMPUS"; }))];
                }
            };
            chartMapper.studentByGrade = {
                kChart: function () {
                    return $("#studentByGrade").data("kendoChart");
                },
                data: function () {
                    return [_.pick($scope.campus.studentAll, _.filter(_.keys($scope.campus.studentAll), function (key) { return (key.indexOf("CPETG") > -1 && key[key.length - 1] == "P" && key.indexOf("CPETGIF") == -1) || key == "CAMPUS"; }))];
                }
            };
            chartMapper.enrollmentByProgram = {
                kChart: function () {
                    return $("#enrollmentByProgram").data("kendoChart");
                },
                data: function () {
                    return [_.pick($scope.campus.studentAll, 'CAMPUS', 'CPETBILP', 'CPETVOCP', 'CPETGIFP', 'CPETSPEP')];
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


        this.CreateStudentAll = function (campusID) {
            return campusData.getStudentAll(campusID).then(function (data) {
                $scope.campus.studentAll = data[0];
                createStudentByDemo();
                createAnnualGraduates();
                createRetentionRates();
                createStudentByGrade();
                createEnrollmentByProgram();
            });
        };

        /* Chart functions */

        function createAnnualGraduates() {

            var other = 100 - $scope.campus.studentAll["CH0GRYRYR"] - $scope.campus.studentAll["CW0GRYRYR"] - $scope.campus.studentAll["CB0GRYRYR"] - $scope.campus.studentAll["C30GRYRYR"];

            if (other == 100) {
                $("#annualGraduatesContainer").hide();
                return;
            }
            else {
                $("#annualGraduatesContainer").show();
            }

            var pieData = [
                { category: '% ' + fieldMapper.campus["CH0GRYRYR"].replace("Graduates: ", "").replace("Student Group %", "Students"), value: $scope.campus.studentAll["CH0GRYRYR"].toFixed(1), color: '#c3151c' },
                { category: '% ' + fieldMapper.campus["CB0GRYRYR"].replace("Graduates: ", "").replace("Student Group %", "Students"), value: $scope.campus.studentAll["CB0GRYRYR"].toFixed(1), color: '#003662' },
                { category: '% ' + fieldMapper.campus["CW0GRYRYR"].replace("Graduates: ", "").replace("Student Group %", "Students"), value: $scope.campus.studentAll["CW0GRYRYR"].toFixed(1), color: '#fbb613' },
                { category: '% ' + fieldMapper.campus["C30GRYRYR"].replace("Graduates: ", "").replace("Student Group %", "Students"), value: $scope.campus.studentAll["C30GRYRYR"].toFixed(1), color: '#0086a1' },
                { category: '% Other', value: other.toFixed(1), color: '#91c63d' },
            ];

            $("#annualGraduates").kendoChart({
                legend: {
                    position: 'bottom'
                },
                seriesDefaults: {
                    labels: {
                        visible: true,
                        position: function (e) {
                            if (e.percentage < 0.1)
                                return "outsideEnd";
                            else
                                return "insideEnd";
                        },
                        template: "#= value < 0 ? 'N/A' : value + '%' #"
                    }
                },
                series: [{
                    type: "pie",
                    data: pieData
                }],
                tooltip: {
                    visible: true,
                    format: "{0}%",
                    color: "#ffffff"
                }
            });
        };

        function createStudentByDemo() {

            var other = 100 - $scope.campus.studentAll["CPETWHIP"] - $scope.campus.studentAll["CPETBLAP"] - $scope.campus.studentAll["CPETHISP"] - $scope.campus.studentAll["CPETASIP"];

            if (other == 100) {
                $("#studentByDemoContainer").hide();
                return;
            }
            else {
                $("#studentByDemoContainer").show();
            }

            var pieData = [
                { category: '% ' + fieldMapper.campus["CPETHISP"].replace("Student: ", ""), value: $scope.campus.studentAll["CPETHISP"].toFixed(1), color: '#c3151c' },
                { category: '% ' + fieldMapper.campus["CPETBLAP"].replace("Student: ", ""), value: $scope.campus.studentAll["CPETBLAP"].toFixed(1), color: '#003662' },
                { category: '% ' + fieldMapper.campus["CPETWHIP"].replace("Student: ", ""), value: $scope.campus.studentAll["CPETWHIP"].toFixed(1), color: '#fbb613' },
                { category: '% ' + fieldMapper.campus["CPETASIP"].replace("Student: ", ""), value: $scope.campus.studentAll["CPETASIP"].toFixed(1), color: '#0086a1' },
                { category: '% Other', value: other.toFixed(1), color: '#91c63d' },
            ];

            $("#studentByDemo").kendoChart({
                legend: {
                    position: 'bottom'
                },
                seriesDefaults: {
                    labels: {
                        visible: true,
                        position: function (e) {
                            if (e.percentage < 0.1)
                                return "outsideEnd";
                            else
                                return "insideEnd";
                        },
                        template: "#= value < 0 ? 'N/A' : value + '%' #"
                    }
                },
                series: [{
                    type: "pie",
                    data: pieData
                }],
                tooltip: {
                    visible: true,
                    format: "{0}%",
                    color: "#ffffff"
                }
            });
        };

        function createRetentionRates() {
            var keys = _.filter(_.keys($scope.campus.studentAll), function (key) { return key.indexOf("CPER") > -1; });
            var sum = 0;
            var series = [];
            keys = _.sortBy(keys);
            var rkgIndex = keys.indexOf("CPERRAKR");
            keys.splice(rkgIndex,1);
            keys.splice(keys.length - 1);
            keys.unshift("CPERRAKR");
            keys.splice(rkgIndex, 1, "CPERSAKR");
            console.log(keys);
            _.each(keys, function (key) {
                sum += $scope.campus.studentAll[key];
                if ($scope.campus.studentAll[key]) {
                    series.push({ field: key, name: fieldMapper.campus[key].replace('Retention: ', ""), color: colors[series.length % (colors.length)] });
                }
            });

            if (sum < 1) {
                $("#retentionRatesContainer").hide();
                return;
            }
            else {
                $("#retentionRatesContainer").show();
            }

            $("#retentionRates").kendoChart({
                dataSource: { data: [$scope.campus.studentAll] },
                legend: { position: 'bottom', visible: true },
                seriesDefaults: {
                    type: 'column',
                    labels: { visible: true, template: ' #=  (!value || value < 0) ? \'N/A\' : value.toFixed(0) + \'%\' #' }
                },
                plotArea: {
                    margin: { top: 20 }
                },
                series: series,
                valueAxis: {
                    min: 0,
                    max: 100,
                    line: { visible: false },
                    minorGridLines: { visible: true },
                    labels: { template: '#:  value # %' }
                },
                categoryAxis: {
                    majorGridLines: { visible: false }
                },
                tooltip: { visible: true, template: '#= series.name #: #=  (!value || value < 0) ? \'N/A\' : value.toFixed(0) + \'%\' #', color: 'white' }
            });
        };

        function createStudentByGrade() {
            var keys = _.filter(_.keys($scope.campus.studentAll), function (key) { return key.indexOf("CPETG") > -1 && key[key.length - 1] == "P" && key.indexOf("CPETGIF") == -1; });

            var sum = 0;
            var series = [];

            _.each(keys, function (key) {
                sum += $scope.campus.studentAll[key];
                if ($scope.campus.studentAll[key]) {
                    series.push({ field: key, name: "% " + fieldMapper.campus[key].replace('Student: ', "").replace(' Percent', "th Grade"), color: colors[series.length % (colors.length)] });
                    if(series[series.length-1].name.indexOf("KG") > -1 || series[series.length-1].name.indexOf("PK  ")>-1)
                    {
                        series[series.length - 1].name = series[series.length - 1].name.replace("th Grade"," Grade");
                    }
                }
            });

            if (sum < 1) {
                $("#studentByGradeContainer").hide();
                return;
            }
            else {
                $("#studentByGradeContainer").show();
            }

            $("#studentByGrade").kendoChart({
                dataSource: { data: [$scope.campus.studentAll] },
                legend: { position: 'bottom', visible: true },
                seriesDefaults: {
                    type: 'column',
                    stack: true,
                    labels: { visible: true, template: ' #=  (!value || value < 0) ? \'N/A\' : value.toFixed(0) + \'%\' #' }
                },
                plotArea: {
                    margin: { top: 20 }
                },
                series: series,
                valueAxis: {
                    min: 0,
                    max: 100,
                    line: { visible: false },
                    minorGridLines: { visible: true },
                    labels: { template: '#:  value # %' }
                },
                categoryAxis: {
                    majorGridLines: { visible: false }
                },
                tooltip: { visible: true, template: '#= series.name #: #=  (!value || value < 0) ? \'N/A\' : value.toFixed(0) + \'%\' #', color: 'white' }
            });
        };

        function createEnrollmentByProgram() {

            var sum = $scope.campus.studentAll["CPETBILP"] + $scope.campus.studentAll["CPETVOCP"] + $scope.campus.studentAll["CPETGIFP"] + $scope.campus.studentAll["CPETSPEP"];

            if (sum < 1) {
                $("#enrollmentByProgramContainer").hide();
                return;
            }
            else {
                $("#enrollmentByProgramContainer").show();
            }

            $("#enrollmentByProgram").kendoChart({
                dataSource: { data: [$scope.campus.studentAll] },
                legend: { position: 'bottom', visible: true },
                seriesDefaults: {
                    type: 'column',
                    labels: { visible: true, template: ' #=  (!value || value < 0) ? \'N/A\' : value.toFixed(0) + \'%\' #' }
                },
                plotArea: {
                    margin: { top: 20 }
                },
                series: [
                    { field: 'CPETBILP', name: fieldMapper.campus['CPETBILP'].replace('Student: ', '').replace(" Percent",""), color: colors[0] },
                    { field: 'CPETVOCP', name: fieldMapper.campus['CPETVOCP'].replace('Student: ', '').replace(" Percent", ""), color: colors[1] },
                    { field: 'CPETGIFP', name: fieldMapper.campus['CPETGIFP'].replace('Student: ', '').replace(" Percent", ""), color: colors[2] },
                    { field: 'CPETSPEP', name: fieldMapper.campus['CPETSPEP'].replace('Student: ', '').replace(" Percent", ""), color: colors[3] },
                ],
                valueAxis: {
                    min: 0,
                    max: 100,
                    line: { visible: false },
                    minorGridLines: { visible: true },
                    labels: { template: '#:  value # %' }
                },
                categoryAxis: {
                    majorGridLines: { visible: false }
                },
                tooltip: { visible: true, template: '#= series.name #: #=  (!value || value < 0) ? \'N/A\' : value.toFixed(0) + \'%\' #', color: 'white' }
            });
        };

    };
}]);