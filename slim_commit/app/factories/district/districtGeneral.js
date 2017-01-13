angular.module('myApp').factory('districtGeneral', ['district2015Data', '$timeout', 'fieldMapper', '$q', function (district2015Data, $timeout, fieldMapper, $q) {
    var chartMapper, $scope;

    return new function () {
        var self = this;

        var extendChartMapper = function (chartMapper) {
            chartMapper.ACTSATAverage = {
                kChart: function () {
                    return $("#ACTSATAverage").data("kendoChart");
                },
                data: function () {
                    return [_.pick($scope.district.collegeAdmissions, "DISTRICT", "DA0CTYRYR", "DB0CTYRYR", "DH0CTYRYR", "DW0CTYRYR")];
                }
            };
            chartMapper.ACTSATAboveCriterion = {
                kChart: function () {
                    return $("#ACTSATAboveCriterion").data("kendoChart");
                },
                data: function () {
                    return [_.pick($scope.district.collegeAdmissions, "DISTRICT", "DA0CCYRYR", "DB0CCYRYR", "DH0CCYRYR", "DW0CCYRYR")];
                }
            };
            chartMapper.ACTAverage = {
                kChart: function () {
                    return $("#ACTAverage").data("kendoChart");
                },
                data: function () {
                    return [_.pick($scope.district.collegeAdmissions, "DISTRICT", "DA0CSAYRYR", "DB0CSAYRYR", "DH0CSAYRYR", "DW0CSAYRYR")];
                }
            };
            chartMapper.SATAverage = {
                kChart: function () {
                    return $("#SATAverage").data("kendoChart");
                },
                data: function () {
                    return [_.pick($scope.district.collegeAdmissions, "DISTRICT", "DA0CAAYRYR", "DB0CAAYRYR", "DH0CAAYRYR", "DW0CAAYRYR")];
                }
            };
            chartMapper.staarAllGrades = {
                kChart: function () {
                    return $("#staarAllGrades").data("kendoChart");
                },
                data: function () {
                    return [$scope.district.staarAllGrades];
                }
            };
            chartMapper.staarAllSubjectGrades = {
                kChart: function () {
                    return $("#staarAllSubjectGrades").data("kendoChart");
                },
                data: function () {
                    return $scope.districtStaarAllSubjectGrades;
                }
            };
            chartMapper.graduationRates = {
                kChart: function () {
                    return $("#graduationRates").data("kendoChart");
                },
                data: function () {
                    return [$scope.district.graduationRates];
                }
            };
            chartMapper.staarSubject = {
                kChart: function () {
                    return $("#staarSubject").data("kendoChart");
                },
                data: function () {
                    return $scope.staarSubject;
                }
            };
        };

        var initScope = function () {
            $scope.staarAllGradesRecType = "1SYRYR";
            $scope.staarAllGradesSubTypeGen = "A00";
            $scope.staarAllSubjectGradesRecType = "ph1";
            $scope.staarAllSubjectGradesSortType = "subject";

            $scope.$watch('actSatChartState', function (newValue, oldValue) {
                if (newValue == undefined) return;
                createACTSATAverage();
            });

            $scope.$watch('actSatAboveChartState', function (newValue, oldValue) {
                if (newValue == undefined) return;
                createACTSATAboveCriterion();
            });

            $scope.$watch('satChartState', function (newValue, oldValue) {
                if (newValue == undefined) return;
                createSATAverage();
            });

            $scope.$watch('actChartState', function (newValue, oldValue) {
                if (newValue == undefined) return;
                createACTAverage();
            });

            $scope.$watch('staarAllGradesState', function (newValue, oldValue) {
                if (newValue == undefined) return;
                createStaarAllGrades();;
            });

            $scope.$watchGroup(['staarAllGradesRecType', 'staarAllGradesSubTypeGen'], function (newValues, oldValues, scope) {
                if (!newValues || !newValues[0] || !newValues[1]) return;
                createStaarAllGrades();
            });

            $scope.$watch('staarAllSubjectGradesState', function (newValue, oldValue) {
                if (newValue == undefined) return;
                createStaarAllSubjectGrades();;
            });

            $scope.$watch('staarAllSubjectGradesRecType', function (newValue, oldValue) {
                if (!newValue) return;
                createStaarAllSubjectGrades();
            });


            $scope.$watch('staarAllSubjectGradesSortType', function (newValue, oldValue) {
                if (!newValue) return;
                createStaarAllSubjectGrades();
            });

            $scope.$watch('graduationRatesState', function (newValue) {
                if (newValue == undefined) return;
                createGraduationRates();
            });

        };

        this.Init = function (scope, chartMapper) {
            $scope = scope;
            initScope();
            extendChartMapper(chartMapper);
        };



        this.CreateStudentInfo = function (districtID) {
            return district2015Data.getStudentInfo(districtID).then(function (response) {
                $scope.district.studentInfo = response.data[0];
            });
        };

        this.CreateCollegeAdmissions = function (districtID) {
            return district2015Data.getCollegeAdmissions(districtID).then(function (data) {
                $scope.district.collegeAdmissions = data[0];
                $scope.state.collegeAdmissions = data[1];
                createACTSATAverage();
                createACTSATAboveCriterion();
                createACTAverage();
                createSATAverage();
            });
        };

        this.CreateStaarAllGrades = function (districtID) {
            return district2015Data.getStaarAllGrades(districtID).then(function (data) {
                $scope.district.staarAllGrades = data[0];
                $scope.state.staarAllGrades = data[1];
                createStaarAllGrades();
            });
        };

        this.CreateStaarAllSubjectGrades = function (districtID) {
            return district2015Data.getStaarAllSubjectGrades(districtID).then(function (data) {
             
                _.each(data, function (i) {
                    if (i[0].District == "'1") {
                        $scope.stateStaarAllSubjectGrades = i;
                    }
                    else {
                        $scope.districtStaarAllSubjectGrades = i;
                    }
                });
                createStaarAllSubjectGrades();
            });
        };

        this.CreateGraduationRates = function (district) {

            return district2015Data.getGraduationRates(district).then(function (data) {
                _.each(data, function (i) {
                    if (i.DISTRICT == "'1") {
                        $scope.state.graduationRates = i;
                    }
                    else {
                        $scope.district.graduationRates = i;
                    }
                });
                createGraduationRates();
            });

        };

        this.CreateStaarSubject = function (district) {
            return district2015Data.getStaarSubject(district).then(function (data) {
                $scope.staarSubject = data;
                createStaarSubject();
            });
        };

        /* Chart Functions */

        function createACTSATAverage() {
            
            var sum = $scope.district.collegeAdmissions['DA0CTYRYR'] + $scope.district.collegeAdmissions['DB0CTYRYR'] +
                $scope.district.collegeAdmissions['DH0CTYRYR'] + $scope.district.collegeAdmissions['DW0CTYRYR'];

            /*if (sum < 4) {
                $("#admissionContainer").hide();
                return;
            }
            else {
                $("#admissionContainer").show();
            }*/

            var source = [$scope.district.collegeAdmissions];
            if ($scope.actSatChartState) {
                source[0]["DISTNAME"] = $scope.selectedDistrict.DISTNAME;
                source.push($scope.state.collegeAdmissions);
            }

            $("#ACTSATAverage").kendoChart({
                dataSource: { data: source },
                legend: { position: 'bottom', visible: true },
                seriesDefaults: {
                    type: 'column',
                    labels: { visible: true, template: '#=  !value || value < 0 ? \'N/A\' : value.toFixed(0) + \'%\' #' }
                },
                plotArea: {
                    margin: { top: 20 }
                },
                series: [
                    { field: 'DA0CTYRYR', name: fieldMapper.district['DA0CTYRYR'].split('SAT/ACT: ')[1].split(', % Test-Taking')[0], color: '#91c63d', text: 'all students' },
                    { field: 'DB0CTYRYR', name: fieldMapper.district['DB0CTYRYR'].split('SAT/ACT: ')[1].split(', % Test-Taking')[0], color: '#003662', text: 'African American' },
                    { field: 'DH0CTYRYR', name: fieldMapper.district['DH0CTYRYR'].split('SAT/ACT: ')[1].split(', % Test-Taking')[0], color: '#c3151c', text: 'Hispanic' },
                    { field: 'DW0CTYRYR', name: fieldMapper.district['DW0CTYRYR'].split('SAT/ACT: ')[1].split(', % Test-Taking')[0], color: '#fbb613', text: 'White' }
                ],
                valueAxis: {
                    labels: { template: '#=value # %' },
                    min: 0,
                    max: 100
                },
                categoryAxis: {
                    field: 'DISTNAME', labels: { visible: $scope.actSatChartState }
                },
                tooltip: { visible: true, template: '#= series.name #: #= !value || value < 0 ? \'N/A\' : value.toFixed(0) + \'%\' #', color: 'white' }
            });
        };

        function createACTSATAboveCriterion() {
            var source = [$scope.district.collegeAdmissions];
            if ($scope.actSatAboveChartState) {
                source[0]["DISTNAME"] = $scope.selectedDistrict.DISTNAME;
                source.push($scope.state.collegeAdmissions);
            }
            $("#ACTSATAboveCriterion").kendoChart({
                dataSource: { data: source },
                legend: { position: 'bottom', visible: true },
                seriesDefaults: {
                    type: 'column',
                    labels: { visible: true, template: ' #= !value ||value < 0 ? \'N/A\' : value.toFixed(0) + \'%\' #' }
                },
                plotArea: {
                    margin: { top: 20 }
                },
                series: [
                    { field: 'DA0CCYRYR', name: fieldMapper.district['DA0CCYRYR'].split('SAT/ACT: ')[1].split(', % Above Criterion')[0], color: '#91c63d' },
                    { field: 'DB0CCYRYR', name: fieldMapper.district['DB0CCYRYR'].split('SAT/ACT: ')[1].split(', % Above Criterion')[0], color: '#003662' },
                    { field: 'DH0CCYRYR', name: fieldMapper.district['DH0CCYRYR'].split('SAT/ACT: ')[1].split(', % Above Criterion')[0], color: '#c3151c' },
                    { field: 'DW0CCYRYR', name: fieldMapper.district['DW0CCYRYR'].split('SAT/ACT: ')[1].split(', % Above Criterion')[0], color: '#fbb613' },
                ],
                valueAxis: {
                    labels: { template: '#=value # %' },
                    min: 0,
                    max: 100
                },
                categoryAxis: {
                    field: 'DISTNAME', labels: { visible: $scope.actSatAboveChartState }
                },
                tooltip: { visible: true, template: '#= series.name #: #= !value || value < 0 ? \'N/A\' : value.toFixed(0) + \'%\' #', color: 'white' }
            });
        };

        function createSATAverage() {
            var source = [$scope.district.collegeAdmissions];
            if ($scope.satChartState) {
                source[0]["DISTNAME"] = $scope.selectedDistrict.DISTNAME;
                source.push($scope.state.collegeAdmissions);
            }
            $("#SATAverage").kendoChart({
                dataSource: { data: source },
                legend: { position: 'bottom', visible: true },
                seriesDefaults: {
                    type: "column",
                    labels: { visible: true, template: " #= !value || value < 0 ? \"NA\" : kendo.toString(value,\"n0\") #" }
                },
                plotArea: {
                    margin: { top: 20 }
                },
                series: [
                    { field: 'DA0CSAYRYR', name: fieldMapper.district['DA0CSAYRYR'].split(',')[0], color: '#91c63d', text: 'all students' },
                    { field: 'DB0CSAYRYR', name: fieldMapper.district['DB0CSAYRYR'].split(',')[0], color: '#003662', text: 'African American' },
                    { field: 'DH0CSAYRYR', name: fieldMapper.district['DH0CSAYRYR'].split(',')[0], color: '#c3151c', text: 'Hispanic' },
                    { field: 'DW0CSAYRYR', name: fieldMapper.district['DW0CSAYRYR'].split(',')[0], color: '#fbb613', text: 'White' }
                ],
                valueAxis: {
                    labels: { template: "#=kendo.toString(value,\"n0\") #" },
                    min: 0
                },
                categoryAxis: {
                    field: 'DISTNAME', labels: { visible: $scope.satChartState }
                },
                tooltip: { visible: true, template: "#= series.name #: #= !value || value < 0 ? \"NA\" : kendo.toString(value,\"n0\") #", color: "white" }
            });
        };

        function createACTAverage() {
            var source = [$scope.district.collegeAdmissions];
            if ($scope.actChartState) {
                source[0]["DISTNAME"] = $scope.selectedDistrict.DISTNAME;
                source.push($scope.state.collegeAdmissions);
            }
            $("#ACTAverage").kendoChart({
                dataSource: { data: source },
                legend: { position: 'bottom', visible: true },
                seriesDefaults: {
                    type: "column",
                    labels: { visible: true, template: '#= !value || value < 0 ?  \'N/A\' : value.toFixed(0) #' }
                },
                plotArea: {
                    margin: { top: 20 }
                },
                series: [
                    { field: 'DA0CAAYRYR', name: fieldMapper.district['DA0CAAYRYR'].split(',')[0], color: '#91c63d' },
                    { field: 'DB0CAAYRYR', name: fieldMapper.district['DB0CAAYRYR'].split(',')[0], color: '#003662' },
                    { field: 'DH0CAAYRYR', name: fieldMapper.district['DH0CAAYRYR'].split(',')[0], color: '#c3151c' },
                    { field: 'DW0CAAYRYR', name: fieldMapper.district['DW0CAAYRYR'].split(',')[0], color: '#fbb613' }
                ],
                valueAxis: {
                    labels: { template: '#=value #' },
                    min: 0
                },
                categoryAxis: {
                    field: 'DISTNAME',
                    labels: { visible: $scope.actChartState }
                },
                tooltip: { visible: true, template: '#= series.name #: #= !value || value < 0 ?  \'N/A\' : value.toFixed(0) #', color: 'white' }
            });
        };



        function createStaarAllGrades() {
            if (!$scope.district.staarAllGrades) return;
            var source = [$scope.district.staarAllGrades];
            if ($scope.staarAllGradesState) {
                source[0]["DISTNAME"] = $scope.selectedDistrict.DISTNAME;
                source.push($scope.state.staarAllGrades);
            }
            var categories = [
                { code: "DA00", name: "All", color: '#91c63d' },
                { code: "DE00", name: "Low Income", color: '#ef5727' },
                { code: "DB00", name: "African American", color: '#003662' },
                { code: "DH00", name: "Hispanic", color: '#c3151c' },
                { code: "DW00", name: "White", color: '#fbb613' },
                { code: "DL00", name: "LEP", color: '#0086a1' }];
            var series = [];
            _.each(categories, function (item, index) {
                series.push({ field: item.code + $scope.staarAllGradesSubTypeGen + $scope.staarAllGradesRecType, name: item.name, color: item.color });
            });
            $("#staarAllGrades").kendoChart({
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
                    labels: { visible: $scope.staarAllGradesState },
                    majorGridLines: {
                        visible: false
                    },
                    line: {
                        visible: false
                    }
                }
            });
        };

        function createStaarAllSubjectGrades() {

            if (!$scope.districtStaarAllSubjectGrades) return;
            var source = [$scope.districtStaarAllSubjectGrades];
            if ($scope.staarAllSubjectGradesState) {
                source.push($scope.stateStaarAllSubjectGrades);
            }
            var allGrades = ["3", "4", "5", "6", "7", "8", "EOC"];
            var Subjects = [
                    { Code: "r", Name: "Reading", Color: "#c3151c", Grades: ["3", "4", "5", "6", "7", "8"] },
                    { Code: "m", Name: "Math", Color: "#003662", Grades: ["3", "4", "5", "6", "7", "8"] },
                    { Code: "w", Name: "Writing", Color: "#ef5727", Grades: ["4", "7"] },
                    { Code: "s", Name: "Science", Color: "#0086a1", Grades: ["5", "8"] },
                    { Code: "h", Name: "History", Color: "#fbb613", Grades: ["8"] },
                    { Code: "e1", Name: "English 1", Color: "#c3151c", Grades: ["EOC"] },
                    { Code: "bi", Name: "Biology", Color: "#0086a1", Grades: ["EOC"] },
                    { Code: "e2", Name: "English 2", Color: "#c3151c", Grades: ["EOC"] },
                    { Code: "us", Name: "US History", Color: "#fbb613", Grades: ["EOC"] },
                    { Code: "a1", Name: "Algebra 1", Color: "#003662", Grades: ["EOC"] }
            ];

            var finalData = [];
            _.each(source, function (item, index) {
                var obj = {};
                _.each(item, function (i) {
                    obj[i.Subject + "_" + i.Grade] = i[$scope.staarAllSubjectGradesRecType];
                });
                if (index == 1) {
                    obj["DISTNAME"] = "State";
                }
                else if ($scope.staarAllSubjectGradesState) {
                    obj["DISTNAME"] = $scope.selectedDistrict.DISTNAME;
                }
                finalData.push(obj);
            });
            var series = [];

            if ($scope.staarAllSubjectGradesSortType == "subject") {
                _.each(Subjects, function (subject) {
                    _.each(subject.Grades, function (grade) {
                        series.push({ field: subject.Code + "_" + grade, name: grade + (grade != "EOC" ? grade == "3" ? "rd Grade " : "th Grade " : " ") + subject.Name, color: subject.Color });
                    });
                });
            }
            else {
                _.each(allGrades, function (grade) {
                    _.each(Subjects, function (subject) {
                        if (subject.Grades.indexOf(grade) > -1) {
                            series.push({ field: subject.Code + "_" + grade, name: grade + (grade != "EOC" ? grade == "3" ? "rd Grade " : "th Grade " : " ") + subject.Name, color: subject.Color });
                        }
                    });
                });
            }

            $("#staarAllSubjectGrades").kendoChart({
                legend: {
                    visible: true,
                    position: 'bottom'
                },
                seriesDefaults: {
                    type: "column",
                    labels: {
                        visible: true,
                        template: "#= (!value || value < 0) ? 'N/A' : (value).toFixed(0) + '%' #",
                    }
                },
                tooltip: {
                    visible: true,
                    template: "#= series.name #: #= (!value || value < 0) ? 'N/A' : (value).toFixed(0) + '%' #",
                    color: 'white'
                },
                dataSource: {
                    data: finalData
                },
                series: series,
                valueAxis: {
                    majorGridLines: {
                        visible: true
                    },
                    labels: {
                        template: "#= (value).toFixed(0) # %"
                    },
                    visible: true,
                    min: 0
                },
                categoryAxis: {
                    field: "DISTNAME",
                    labels: { visible: $scope.staarAllSubjectGradesState },
                    majorGridLines: {
                        visible: false
                    },
                    line: {
                        visible: false
                    }
                }
            });

        };

        function createGraduationRates() {
            var data = [$scope.district.graduationRates];
            if ($scope.graduationRatesState) {
                data[0]["DISTNAME"] = $scope.selectedDistrict.DISTNAME;
                data.push($scope.state.graduationRates);
            }

            $("#graduationRates").kendoChart({
                dataSource: {
                    data: data
                },
                legend: { position: 'bottom' },
                seriesDefaults: {
                    type: 'bar',
                    labels: { visible: true, template: '#= (!value || value < 0) ? \'N/A\' : value.toFixed(0) + \'%\' #' },
                    legend: { visible: true }
                },
                plotArea: { margin: { left: 20, right: 20 } },
                series: [
                                 { field: 'DAGC4XYRYR', name: 'All', color: '#91c63d' },
                                 { field: 'DBGC4XYRYR', name: 'African American', color: '#003662' },
                                 { field: 'DHGC4XYRYR', name: 'Hispanic', color: '#c3151c' },
                                 { field: 'DWGC4XYRYR', name: 'White', color: '#fbb613' },
                                 { field: 'DEGC4XYRYR', name: 'Low Income', color: '#ef5727' },
                                 { field: 'DLGC4XYRYR', name: 'LEP', color: '#0086a1' }
                ],
                valueAxis: { labels: { template: '#=value # %' }, min: 0 },
                categoryAxis: { field: 'DISTNAME', labels: { visible: $scope.graduationRatesState } },
                tooltip: {
                    visible: true,
                    template: '#= series.name #: #= (!value || value < 0) ? \'N/A\' : value.toFixed(0) + \'%\' #',
                    color: 'white'
                }
            });

        };

        function createStaarSubject() {
            
            var Subjects = [
                    { Code: "r", Name: "Reading", Color: "#c3151c", Grades: ["3", "4", "5", "6", "7", "8"] },
                    { Code: "m", Name: "Math", Color: "#003662", Grades: ["3", "4", "5", "6", "7", "8"] },
                    { Code: "w", Name: "Writing", Color: "#ef5727", Grades: ["4", "7"] },
                    { Code: "s", Name: "Science", Color: "#0086a1", Grades: ["5", "8"] },
                    { Code: "h", Name: "History", Color: "#fbb613", Grades: ["8"] },
                    { Code: "e1", Name: "English 1", Color: "#c3151c", Grades: ["EOC"] },
                    { Code: "e2", Name: "English 2", Color: "#c3151c", Grades: ["EOC"] },
                    { Code: "bi", Name: "Biology", Color: "#0086a1", Grades: ["EOC"] },
                    { Code: "us", Name: "US History", Color: "#fbb613", Grades: ["EOC"] },
                    { Code: "a1", Name: "Algebra 1", Color: "#003662", Grades: ["EOC"] }
            ];

            var year1 = _.where($scope.staarSubject, { 'Year': '13' });
            var year2 = _.where($scope.staarSubject, { 'Year': '14' });
            var year3 = _.where($scope.staarSubject, { 'Year': '15' });
            var year4 = _.where($scope.staarSubject, { 'Year': '16' });

            var categories = [];
            var data1 = [];
            var data2 = [];
            var data3 = [];
            var data4 = [];

            _.each(Subjects, function (subject) { 
                _.each(subject.Grades, function (grade) { 
                    var item1 = _.find(year1, function (i) { return i.Subject == subject.Code && i.Grade == grade; });
                    var item2 = _.find(year2, function (i) { return i.Subject == subject.Code && i.Grade == grade; });
                    var item3 = _.find(year3, function (i) { return i.Subject == subject.Code && i.Grade == grade; });
                    var item4 = _.find(year4, function (i) { return i.Subject == subject.Code && i.Grade == grade; });

                    if ((item1 && item1.rec) || (item2 && item2.rec) || (item3 && item3.rec) || (item4 && item4.rec)) {
                        data1.push(item1 ? item1.rec : null);
                        data2.push(item2 ? item2.rec : null);
                        data3.push(item3 ? item3.rec : null);
                        data4.push(item4 ? item4.rec : null);
                        categories.push(subject.Name + " - " + grade);
                    }
                });
            });

            $("#staarSubject").kendoChart({
                seriesDefaults: {
                    type: "column",
                    labels: {
                        visible: true,
                        template: "#= (!value || value < 0) ? 'N/A' : value.toFixed(0) + '%' #",
                        rotation: -45
                    }
                },
                series: [
                    {
                        name: "2012",
                        data: data1,
                        color: '#003662'
                    }, {
                        name: "2013",
                        data: data2,
                        color: '#c3151c'
                    }, {
                        name: "2014",
                        data: data3,
                        color: 'green'
                    },
                    {
                        name: "2015",
                        data: data4,
                        color: '#0086a1'
                    }
                ],
                valueAxis: {
                    majorGridLines: {
                        visible: false
                    },
                    labels: {
                        format: "{0}%"
                    }
                },
                categoryAxis: {
                    categories: categories,
                    labels: {
                        padding: 10,
                        rotation: -45,
                    }
                },
                tooltip: {
                    visible: true,
                    template: "#= series.name #: #= (!value || value < 0) ? 'N/A' : value.toFixed(0) + '%' #",
                    color: 'white'
                }
            });

        }

    };
}]);