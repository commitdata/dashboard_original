angular.module('myApp').factory('districtStudent', ['district2015Data', '$timeout', 'fieldMapper', 'd2bURI', 'JSONToCSV', '$q', function (district2015Data, $timeout, fieldMapper, d2bURI, JSONToCSV, $q) {
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
                    return [_.pick($scope.district.studentAll, "DISTRICT", "DH0GRYRYR", "DB0GRYRYR", "DW0GRYRYR", "D30GRYRYR")];
                }
            };
            chartMapper.studentByDemo = {
                kChart: function () {
                    return $("#studentByDemo").data("kendoChart");
                },
                data: function () {
                    return [_.pick($scope.district.studentAll, "DISTRICT", "DPETHISP", "DPETBLAP", "DPETWHIP", "DPETASIP")];
                }
            };
            chartMapper.retentionRates = {
                kChart: function () {
                    return $("#retentionRates").data("kendoChart");
                },
                data: function () {
                    return [_.pick($scope.district.studentAll, _.filter(_.keys($scope.district.studentAll), function (key) { return key.indexOf("DPER") > -1 || key == "DISTRICT"; }))];
                }
            };
            chartMapper.studentByGrade = {
                kChart: function () {
                    return $("#studentByGrade").data("kendoChart");
                },
                data: function () {
                    return [_.pick($scope.district.studentAll, _.filter(_.keys($scope.district.studentAll), function (key) { return (key.indexOf("DPETG") > -1 && key[key.length - 1] == "P" && key.indexOf("DPETGIF") < 0) || key == "DISTRICT"; }))];
                }
            };
            chartMapper.enrollmentByProgram = {
                kChart: function () {
                    return $("#enrollmentByProgram").data("kendoChart");
                },
                data: function () {
                    return [_.pick($scope.district.studentAll, 'DISTRICT', 'DPETBILP', 'DPETVOCP', 'DPETGIFP', 'DPETSPEP')];
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


        this.CreateStudentAll = function (districtID) {
            return district2015Data.getStudentAll(districtID).then(function (data) {
                $scope.district.studentAll = data[0];
                createStudentByDemo();
                createAnnualGraduates();
                createRetentionRates();
                createStudentByGrade();
                createEnrollmentByProgram();
            });
        };

        /* Chart functions */

        function createAnnualGraduates() {

            var other = 100 - $scope.district.studentAll["DH0GRYRYR"] - $scope.district.studentAll["DW0GRYRYR"] - $scope.district.studentAll["DB0GRYRYR"] - $scope.district.studentAll["D30GRYRYR"];

            if (other == 100) {
                $("#annualGraduatesContainer").hide();
                return;
            }
            else {
                $("#annualGraduatesContainer").show();
            }

            var pieData = [
                { category: '% ' + fieldMapper.district["DH0GRYRYR"].replace("Graduates: ", "").replace("Student Group %", "Students"), value: $scope.district.studentAll["DH0GRYRYR"].toFixed(1), color: '#c3151c' },
                { category: '% ' + fieldMapper.district["DB0GRYRYR"].replace("Graduates: ", "").replace("Student Group %", "Students"), value: $scope.district.studentAll["DB0GRYRYR"].toFixed(1), color: '#003662' },
                { category: '% ' + fieldMapper.district["DW0GRYRYR"].replace("Graduates: ", "").replace("Student Group %", "Students"), value: $scope.district.studentAll["DW0GRYRYR"].toFixed(1), color: '#fbb613' },
                { category: '% ' + fieldMapper.district["D30GRYRYR"].replace("Graduates: ", "").replace("Student Group %", "Students"), value: $scope.district.studentAll["D30GRYRYR"].toFixed(1), color: '#0086a1' },
                { category: '% Others', value: other.toFixed(1), color: '#91c63d' },
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

            var other = 100 - $scope.district.studentAll["DPETWHIP"] - $scope.district.studentAll["DPETBLAP"] - $scope.district.studentAll["DPETHISP"] - $scope.district.studentAll["DPETASIP"];

            if (other == 100) {
                $("#studentByDemoContainer").hide();
                return;
            }
            else {
                $("#studentByDemoContainer").show();
            }

            var pieData = [
                { category: '% ' + fieldMapper.district["DPETHISP"].replace("Student: ", "").replace(" Percent", ""), value: $scope.district.studentAll["DPETHISP"].toFixed(1), color: '#c3151c' },
                { category: '% ' + fieldMapper.district["DPETBLAP"].replace("Student: ", "").replace(" Percent", ""), value: $scope.district.studentAll["DPETBLAP"].toFixed(1), color: '#003662' },
                { category: '% ' + fieldMapper.district["DPETWHIP"].replace("Student: ", "").replace(" Percent", ""), value: $scope.district.studentAll["DPETWHIP"].toFixed(1), color: '#fbb613' },
                { category: '% ' + fieldMapper.district["DPETASIP"].replace("Student: ", "").replace(" Percent", ""), value: $scope.district.studentAll["DPETASIP"].toFixed(1), color: '#0086a1' },
                { category: '% Others', value: other.toFixed(1), color: '#91c63d' },
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
            var keys = _.filter(_.keys($scope.district.studentAll), function (key) { return key.indexOf("DPER") > -1; });

            keys = _.sortBy(keys);
            var rkgIndex = keys.indexOf("DPERRAKR");
            keys.splice(rkgIndex, 1);
            keys.splice(keys.length - 1);
            keys.unshift("DPERRAKR");
            keys.splice(rkgIndex, 1, "DPERSAKR");
            console.log(keys);

            var sum = 0;
            var series = [];

            _.each(keys, function (key) {
                sum += $scope.district.studentAll[key];
                if ($scope.district.studentAll[key]) {
                    series.push({
                        field: key,
                        name: fieldMapper.district[key].replace('Retention: ', "").replace("Ed 0", "Ed-Grade ").replace("Ed KG", "Ed-KG").replace(" Rate", ""),
                        color: colors[series.length % (colors.length - 1)]
                    });
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
                dataSource: { data: [$scope.district.studentAll] },
                legend: { position: 'bottom', visible: true },
                seriesDefaults: {
                    type: 'column',
                    labels: { visible: true, template: ' #=  (!value || value < 0) ? \'N/A\' : value.toFixed(1) + \'%\' #' }
                },
                plotArea: {
                    margin: { top: 20 }
                },
                series: series,
                valueAxis: {
                    min: 0,
                    line: { visible: false },
                    minorGridLines: { visible: true },
                    labels: { template: '#:  value # %' }
                },
                categoryAxis: {
                    majorGridLines: { visible: false }
                },
                tooltip: { visible: true, template: '#= series.name #: #=  (!value || value < 0) ? \'N/A\' : value.toFixed(1) + \'%\' #', color: 'white' }
            });
        };

        function createStudentByGrade() {
            var keys = _.filter(_.keys($scope.district.studentAll), function (key) { return key.indexOf("DPETG") > -1 && key[key.length - 1] == "P" && key.indexOf("DPETGIF") < 0; });

            /* Keys manipulation */

            keys = _.sortBy(keys);
            var index = keys.indexOf("DPETGKNP");
            keys.splice(index, 1);
            index = keys.indexOf("DPETGPKP");
            keys.splice(index, 1);
            index = keys.indexOf("DPETGEEP");
            keys.splice(index, 1);
            keys.unshift("DPETGKNP");
            keys.unshift("DPETGPKP");
            keys.unshift("DPETGEEP");
            console.log(keys);


            var sum = 0;
            var series = [];

            _.each(keys, function (key) {
                sum += $scope.district.studentAll[key];
                if ($scope.district.studentAll[key]) {
                    series.push({ field: key, name: "% " + fieldMapper.district[key].replace('Student: ', "Grade-").replace(" Percent", ""), color: colors[series.length % (colors.length - 1)] });
                    if (key == "DPETGEEP") {
                        series[series.length - 1].name = "% Early Education";
                    }
                    if (key == "DPETGKNP") {
                        series[series.length - 1].name = "% Kindergarten";
                    }
                    if (key == "DPETGPKP") {
                        series[series.length - 1].name = "% Pre-K";
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
                dataSource: { data: [$scope.district.studentAll] },
                legend: { position: 'bottom', visible: true },
                seriesDefaults: {
                    type: 'column',
                    stack: true,
                    labels: {
                        visible: true,
                        color: "#fff",
                        position: "inside",
                        opacity: 0,
                        template: ' #=  (!value || value < 0) ? \'N/A\' : value.toFixed(1) + \'%\' #'
                    }
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
                tooltip: { visible: true, template: '#= series.name #: #=  (!value || value < 0) ? \'N/A\' : value.toFixed(1) + \'%\' #', color: 'white' }
            });
        };

        function createEnrollmentByProgram() {

            var sum = $scope.district.studentAll["DPETBILP"] + $scope.district.studentAll["DPETVOCP"] + $scope.district.studentAll["DPETGIFP"] + $scope.district.studentAll["DPETSPEP"];

            if (sum < 1) {
                $("#enrollmentByProgramContainer").hide();
                return;
            }
            else {
                $("#enrollmentByProgramContainer").show();
            }

            $("#enrollmentByProgram").kendoChart({
                dataSource: { data: [$scope.district.studentAll] },
                legend: { position: 'bottom', visible: true },
                seriesDefaults: {
                    type: 'column',
                    labels: { visible: true, template: ' #=  (!value || value < 0) ? \'N/A\' : value.toFixed(0) + \'%\' #' }
                },
                plotArea: {
                    margin: { top: 20 }
                },
                series: [
                    { field: 'DPETBILP', name: fieldMapper.district['DPETBILP'].replace('Student: ', '').replace(' Percent',''), color: colors[0] },
                    { field: 'DPETVOCP', name: fieldMapper.district['DPETVOCP'].replace('Student: ', '').replace(' Percent', ''), color: colors[1] },
                    { field: 'DPETGIFP', name: fieldMapper.district['DPETGIFP'].replace('Student: ', '').replace(' Percent', ''), color: colors[2] },
                    { field: 'DPETSPEP', name: fieldMapper.district['DPETSPEP'].replace('Student: ', '').replace(' Percent', ''), color: colors[3] },
                ],
                valueAxis: {
                    min: 0,
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