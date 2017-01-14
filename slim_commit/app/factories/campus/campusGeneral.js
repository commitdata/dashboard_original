angular.module('myApp').factory('campusGeneral', ['campusData', '$timeout', 'fieldMapper', '$q', function (campusData, $timeout, fieldMapper, $q) {
    var chartMapper, $scope;

    return new function () {
        var self = this;
        var colors = ["#c3151c", "#003662", "#fbb613", "#0086a1", "#ef5727", "#91c63d"];

        var extendChartMapper = function (chartMapper) {

            chartMapper.graduationRates = {
                kChart: function () {
                    return $("#graduationRates").data("kendoChart");
                },
                data: function () {
                    return [$scope.campus.graduationRates];
                }
            };
            chartMapper.teacherExperience = {
                kChart: function () {
                    return $("#teacherExperience").data("kendoChart");
                },
                data: function () {
                    return [$scope.campus.teacherExperience];
                }
            };
            chartMapper.studentDemo = {
                kChart: function () {
                    return $("#studentDemo").data("kendoChart");
                },
                data: function () {
                    return [$scope.campus.studentInfo];
                }
            };
            chartMapper.ACTSATAverage = {
                kChart: function () {
                    return $("#ACTSATAverage").data("kendoChart");
                },
                data: function () {
                    return [_.pick($scope.campus.collegeAdmissions, "CAMPUS", "CA0CTYRYR", "CB0CTYRYR", "CH0CTYRYR", "CW0CTYRYR")];
                }
            };
            chartMapper.ACTSATAboveCriterion = {
                kChart: function () {
                    return $("#ACTSATAboveCriterion").data("kendoChart");
                },
                data: function () {
                    return [_.pick($scope.campus.collegeAdmissions, "CAMPUS", "CA0CCYRYR", "CB0CCYRYR", "CH0CCYRYR", "CW0CCYRYR")];
                }
            };
            chartMapper.ACTAverage = {
                kChart: function () {
                    return $("#ACTAverage").data("kendoChart");
                },
                data: function () {
                    return [_.pick($scope.campus.collegeAdmissions, "CAMPUS", "CA0CAAYRYR", "CB0CAAYRYR", "CH0CAAYRYR", "CW0CAAYRYR")];
                }
            };
            chartMapper.SATAverage = {
                kChart: function () {
                    return $("#SATAverage").data("kendoChart");
                },
                data: function () {
                    return [_.pick($scope.campus.collegeAdmissions, "CAMPUS", "CA0CSAYRYR", "CB0CSAYRYR", "CH0CSAYRYR", "CW0CSAYRYR")];
                }
            };
            chartMapper.staarAll = {
                kChart: function () {
                    return $("#staarAll").data("kendoChart");
                },
                data: function () {
                    var processedData = [];
                    _.each($scope.staarAll, function (value, key) { processedData = processedData.concat(value) });
                    return processedData;
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
            $scope.starrAllRecType = "1S"; /* 1S - Phase1 Level2, 42 - Postsecondary Readiness*/
            $scope.starrAllSubType = "A00";
            $scope.starrAllDemoType = "A00";
            $scope.starrAllChartType = "year";
            $scope.staarSubjectRecType = "rec";

            $scope.$watchGroup(['starrAllRecType', 'starrAllSubType', 'starrAllDemoType', 'starrAllChartType'], function (newValues, oldValues, scope) {
                createStaarAll();
            });

            $scope.$watch('staarSubjectRecType', function (newValue) {
                if (newValue) {
                    createStaarSubject();
                }

            });
        };

        this.Init = function (scope, chartMapper) {
            $scope = scope;
            initScope();
            extendChartMapper(chartMapper);
        };


        this.ExportMap = function () {
            var targetElem = $("#map");
            html2canvas(targetElem, {
                useCORS: true,
                logging: true
            }).then(function (canvas) {
                var a = document.createElement('a');
                var dataUrl = canvas.toDataURL('image/png');
                a.setAttribute("href", dataUrl);
                a.setAttribute("download", $scope.selectedCampus.CAMPNAME);
                document.body.appendChild(a);
                a.click();
            });
        };

        this.CreateCampusMap = function (campusID) {
            return campusData.getCampusInfo(campusID).then(function (data) {
                $("#map").height($("#neighbour").height() + 50);
                var map = L.map('map').setView([data[0]["Latitude"], data[0]["Longitude"]], 17);
                L.tileLayer('http://{s}.{base}.maps.cit.api.here.com/maptile/2.1/maptile/{mapID}/normal.day.grey/{z}/{x}/{y}/256/png8?app_id={app_id}&app_code={app_code}', {
                    attribution: 'Map &copy; 1987-2014 <a href="http://developer.here.com">HERE</a>',
                    subdomains: '1234',
                    mapID: 'newest',
                    //app_id: 'Y8m9dK2brESDPGJPdrvs',
                    //app_code: 'dq2MYIvjAotR8tHvY8Q_Dg',
                    app_id: 'lZjh1sncXfyS5qTsuaPW',
                    app_code: 'oV-bfHNn2rjbHt64jJ0TtA',
                    base: 'base',
                    minZoom: 0,
                    maxZoom: 20
                }).addTo(map);
                var icon = L.icon({
                    iconUrl: '/images/marker-icon.png',
                    shadowUrl: '/images/marker-shadow.png',
                });
                $scope.marker = L.marker([data[0]["Latitude"], data[0]["Longitude"]], { icon: icon }).addTo(map);
            });
        };

        this.CreateStudentInfo = function (campusID) {
            return campusData.getStudentInfo(campusID).then(function (data) {
                $scope.campus.studentInfo = data[0];
                createStudentDemo();
            });
        };

        this.CreateStaffExperience = function (campusID) {
            return campusData.getStaffExperience(campusID).then(function (data) { 
                $scope.campus.teacherExperience = data[0];
                createTeacherExperience();
            });
        };

        this.CreateGraduationRates = function (campusID) {
            return campusData.getGraduationRates(campusID).then(function (data) {
                $scope.campus.graduationRates = data[0];
                createGraduationRates();
            });
        };

        this.CreateCollegeAdmissions = function (campusID) {
            return campusData.getCollegeAdmissions(campusID).then(function (data) {
                $scope.campus.collegeAdmissions = data[0];
                createACTSATAverage();
                createACTSATAboveCriterion();
                createACTAverage();
                createSATAverage();
            });
        };

        this.CreateStaarAll = function (campusID) {
            return campusData.getStaarAll(campusID).then(function (data) {
                $scope.staarAll = data;
                createStaarAll();
            });
        };

        this.CreateStaarSubject = function (campusID) {
            return campusData.getStaarSubject(campusID).then(function (data) { 
                $scope.staarSubject = data;
                createStaarSubject();
            });
        };

        /* Chart Functions */

        function createStaarAll() {
            if (!$scope.staarAll) {
                return;
            }
            var campusSeries = [], districtSeries = [], stateSeries = [];
            var cKey = "C" + $scope.starrAllDemoType + $scope.starrAllSubType + $scope.starrAllRecType + "YRYR";
            var dKey = "D" + $scope.starrAllDemoType + $scope.starrAllSubType + $scope.starrAllRecType + "YRYR";
            for (i = 2013; i <= 2016; i++) {  
                var campusItem = _.findWhere($scope.staarAll.campus, { YEAR: i });
                var districtItem = _.findWhere($scope.staarAll.district, { YEAR: i });
                var stateItem = _.findWhere($scope.staarAll.state, { YEAR: i });
                campusSeries.push(campusItem && campusItem[cKey] ? campusItem[cKey] : -1);
                districtSeries.push(districtItem && districtItem[dKey] ? districtItem[dKey] : -1);
                stateSeries.push(stateItem && stateItem[dKey] ? stateItem[dKey] : -1);
            }
            var series, categories;

            if ($scope.starrAllChartType == 'year') {
                series = [{
                    name: "Campus",
                    data: campusSeries,
                    color: '#91c63d'
                }, {
                    name: "District",
                    data: districtSeries,
                    color: '#003662'
                }, {
                    name: "State",
                    data: stateSeries,
                    color: '#c3151c'
                }];
                categories = [2013, 2014, 2015, 2016];
            }
            else {
                categories = ['Campus', 'District', 'State'];
                mapped = [];
                for (var i = 0; i <= 3; i++) {
                    mapped.push([campusSeries[i], districtSeries[i], stateSeries[i]]);
                }
                series = [{
                    name: "2013",
                    data: mapped[0],
                    color: '#91c63d'
                }, {
                    name: "2014",
                    data: mapped[1],
                    color: '#003662'
                }, {
                    name: "2015",
                    data: mapped[2],
                    color: '#c3151c'
                }, {
                    name: "2016",
                    data: mapped[3],
                    color: '#fbb613'
                }];
            }

            $("#staarAll").kendoChart({
                legend: {
                    position: "bottom"
                },
                seriesDefaults: {
                    type: "column",
                    labels: {
                        visible: true,
                        template: "#= (!value || value < 0) ? 'N/A' : value.toFixed(0) + '%' #",
                    }
                },
                series: series,
                valueAxis: {
                    majorGridLines: {
                        visible: true
                    },
                    visible: true,
                    labels: {
                        template: "#: value.toFixed(0) # %"
                    },
                    min: 0,
                    max: 100
                },
                categoryAxis: {
                    categories: categories
                },
                tooltip: {
                    visible: true,
                    template: "#= series.name #: #=  (!value || value < 0) ? 'N/A' : value.toFixed(0) + '%' #",
                    color: 'white'
                }
            });
        };

        function createTeacherExperience() {

            $("#teacherExperience").kendoChart({
                dataSource: { data: [$scope.campus.teacherExperience] },
                legend: { position: 'bottom', visible: true },
                seriesDefaults: { type: 'column' },
                plotArea: {
                    margin: { top: 20 }
                },
                series: [
                            { field: 'CPST00FP', name: '% Beginning', color: '#c3151c' },
                            { field: 'CPST01FP', name: '% 1-5 Years Experience', color: '#003662' },
                            { field: 'CPST06FP', name: '% 6-10 Years Experience', color: '#91c63d' },
                            { field: 'CPST11FP', name: '% 11-20 Years Experience', color: '#ef5727' },
                            { field: 'CPST20FP', name: '% 20+ Years Experience', color: '#fbb613' },
                ],
                valueAxis: {
                    min: 0,
                    max: 100,
                    line: { visible: false },
                    minorGridLines: { visible: true },
                    labels: { template: "#= value  # %" }
                },
                categoryAxis: {
                    majorGridLines: { visible: false }
                },
                tooltip: { visible: true, template: '#= series.name #: #=  (!value) ? \'N/A\' : value  + \'%\' #', color: 'white' }
            });
        };

        function createGraduationRates() {

            var sum = $scope.campus.graduationRates['CAGC4XYRYR'] + $scope.campus.graduationRates['CBGC4XYRYR'] +
                $scope.campus.graduationRates['CHGC4XYRYR'] + $scope.campus.graduationRates['CWGC4XYRYR'] +
                $scope.campus.graduationRates['CLGC4XYRYR'] + $scope.campus.graduationRates['CEGC4XYRYR'];

            if (sum < 5) {
                $("#graduationRatesContainer").hide();
                return;
            }
            else {
                $("#graduationRatesContainer").show();
            }

            $("#graduationRates").kendoChart({
                dataSource: { data: [$scope.campus.graduationRates] },
                legend: { position: 'bottom', visible: true },
                seriesDefaults: {
                    type: 'bar',
                    labels: { visible: true, template: '#= value < 0 ? \'N/A\' : value + \'%\' #' },
                    legend: { visible: true }
                },
                plotArea: {
                    margin: { top: 20 }
                },
                series: [
                    { field: 'CAGC4XYRYR', name: 'All', color: '#91c63d' },
                    { field: 'CBGC4XYRYR', name: 'African American', color: '#003662' },
                    { field: 'CHGC4XYRYR', name: 'Hispanic', color: '#c3151c' },
                    { field: 'CWGC4XYRYR', name: 'White', color: '#fbb613' },
                    { field: 'CLGC4XYRYR', name: 'LEP', color: '#0086a1' },
                    { field: 'CEGC4XYRYR', name: 'Eco Dis', color: '#ef5727' }
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
                tooltip: { visible: true, template: '#= series.name #: #= value < 0 ? \'N/A\' : value + \'%\' #', color: 'white' }
            });
        };

        function createStudentDemo() {

            var other = 100 - $scope.campus.studentInfo["CPETWHIP"] - $scope.campus.studentInfo["CPETBLAP"] - $scope.campus.studentInfo["CPETHISP"] - $scope.campus.studentInfo["CPETASIP"];

            var pieData = [
                { category: "% " + fieldMapper.campus["CPETHISP"].replace("Student: ", ""), value: $scope.campus.studentInfo["CPETHISP"], color: '#c3151c' },
                { category: "% " + fieldMapper.campus["CPETBLAP"].replace("Student: ", ""), value: $scope.campus.studentInfo["CPETBLAP"], color: '#003662' },
                { category: "% " + fieldMapper.campus["CPETWHIP"].replace("Student: ", ""), value: $scope.campus.studentInfo["CPETWHIP"], color: '#fbb613' },
                { category: "% " + fieldMapper.campus["CPETASIP"].replace("Student: ", ""), value: $scope.campus.studentInfo["CPETASIP"], color: '#0086a1' },
                { category: '% Other', value: other.toFixed(1), color: '#91c63d' },
            ];

            $("#studentDemo").kendoChart({
                legend: {
                    position: 'bottom'
                },
                seriesDefaults: {
                    labels: {
                        visible: true,
                        position: function (e) {
                            if (e.category == "African American  ") {
                                return "insideEnd";
                            }

                            if (e.percentage < 0.1)
                                return "outsideEnd";
                            else
                                return "insideEnd";
                        },
                        template: "#= value < 0 ? 'N/A' : value + '%' #"
                        //template: "#= category.replace('%','') #: \n #= value < 0 ? 'N/A' : value + '%' #"
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

        function createACTSATAverage() {

            var sum = $scope.campus.collegeAdmissions['CA0CTYRYR'] + $scope.campus.collegeAdmissions['CB0CTYRYR'] +
                $scope.campus.collegeAdmissions['CH0CTYRYR'] + $scope.campus.collegeAdmissions['CW0CTYRYR'];

            if (sum < 4) {
                $("#admissionContainer").hide();
                return;
            }
            else {
                $("#admissionContainer").show();
            }

            $("#ACTSATAverage").kendoChart({
                dataSource: { data: [$scope.campus.collegeAdmissions] },
                legend: { position: 'bottom', visible: true },
                seriesDefaults: {
                    type: 'column',
                    labels: { visible: true, template: ' #=  (!value || value < 0) ? \'N/A\' : value.toFixed(0) + \'%\' #' }
                },
                plotArea: {
                    margin: { top: 20 }
                },
                series: [
                    { field: 'CA0CTYRYR', name: fieldMapper.campus['CA0CTYRYR'].split('SAT/ACT: ')[1].split(', % Test')[0], color: '#91c63d' },
                    { field: 'CB0CTYRYR', name: fieldMapper.campus['CB0CTYRYR'].split('SAT/ACT: ')[1].split(', % Test')[0], color: '#003662' },
                    { field: 'CH0CTYRYR', name: fieldMapper.campus['CH0CTYRYR'].split('SAT/ACT: ')[1].split(', % Test')[0], color: '#ef5727' },
                    { field: 'CW0CTYRYR', name: fieldMapper.campus['CW0CTYRYR'].split('SAT/ACT: ')[1].split(', % Test')[0], color: '#fbb613' },
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

        function createACTSATAboveCriterion() {

            $("#ACTSATAboveCriterion").kendoChart({
                dataSource: { data: [$scope.campus.collegeAdmissions] },
                legend: { position: 'bottom', visible: true },
                seriesDefaults: {
                    type: 'column',
                    labels: { visible: true, template: ' #=  (!value || value < 0) ? \'N/A\' : value.toFixed(0) + \'%\'#' }
                },
                plotArea: {
                    margin: { top: 20 }
                },
                series: [
                    { field: 'CA0CCYRYR', name: fieldMapper.campus['CA0CCYRYR'].split('SAT/ACT: ')[1].split(', % Above')[0], color: '#91c63d' },
                    { field: 'CB0CCYRYR', name: fieldMapper.campus['CB0CCYRYR'].split('SAT/ACT: ')[1].split(', % Above')[0], color: '#003662' },
                    { field: 'CH0CCYRYR', name: fieldMapper.campus['CH0CCYRYR'].split('SAT/ACT: ')[1].split(', % Above')[0], color: '#ef5727' },
                    { field: 'CW0CCYRYR', name: fieldMapper.campus['CW0CCYRYR'].split('SAT/ACT: ')[1].split(', % Above')[0], color: '#fbb613' },
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

        function createSATAverage() {
            $("#SATAverage").kendoChart({
                dataSource: { data: [$scope.campus.collegeAdmissions] },
                legend: { position: 'bottom', visible: true },
                seriesDefaults: {
                    type: "column",
                    labels: { visible: true, template: " #=  (!value || value < 0) ? \"N/A\" : kendo.toString(value,\"n0\") #" }
                },
                plotArea: {
                    margin: { top: 20 }
                },
                series: [
                    { field: 'CA0CSAYRYR', name: fieldMapper.campus['CA0CSAYRYR'].split(', SAT')[0], color: '#91c63d', text: 'all students' },
                    { field: 'CB0CSAYRYR', name: fieldMapper.campus['CB0CSAYRYR'].split(', SAT')[0], color: '#003662', text: 'African American' },
                    { field: 'CH0CSAYRYR', name: fieldMapper.campus['CH0CSAYRYR'].split(', SAT')[0], color: '#c3151c', text: 'Hispanic' },
                    { field: 'CW0CSAYRYR', name: fieldMapper.campus['CW0CSAYRYR'].split(', SAT')[0], color: '#fbb613', text: 'White' }
                ],
                valueAxis: {
                    min: 0,
                    max: 2400,
                    line: { visible: false },
                    minorGridLines: { visible: true },
                    labels: { template: "#=kendo.toString(value,\"n0\") #" }
                },
                categoryAxis: {
                    majorGridLines: { visible: false }
                },
                tooltip: { visible: true, template: "#= series.name #: #=  (!value || value < 0) ? \"N/A\" : kendo.toString(value,\"n0\") #", color: "white" }
            });
        };

        function createACTAverage() {
            $("#ACTAverage").kendoChart({
                dataSource: { data: [$scope.campus.collegeAdmissions] },
                legend: { position: 'bottom', visible: true },
                seriesDefaults: {
                    type: "column",
                    labels: { visible: true, template: " #= value < 0 ? \"N/A\" : kendo.toString(value,\"n0\") #" }
                },
                plotArea: {
                    margin: { top: 20 }
                },
                series: [
                    { field: 'CA0CAAYRYR', name: fieldMapper.campus['CA0CAAYRYR'].split(', ACT')[0], color: '#91c63d' },
                    { field: 'CB0CAAYRYR', name: fieldMapper.campus['CB0CAAYRYR'].split(', ACT')[0], color: '#003662' },
                    { field: 'CH0CAAYRYR', name: fieldMapper.campus['CH0CAAYRYR'].split(', ACT')[0], color: '#c3151c' },
                    { field: 'CW0CAAYRYR', name: fieldMapper.campus['CW0CAAYRYR'].split(', ACT')[0], color: '#fbb613' }

                ],
                valueAxis: {
                    min: 0,
                    max: 36,
                    line: { visible: false },
                    minorGridLines: { visible: true },
                    labels: { template: '#: value # ' }
                },
                categoryAxis: {
                    majorGridLines: { visible: false }
                },
                tooltip: { visible: true, template: '#= series.name #: #=  (!value || value < 0) ? \'N/A\' : value.toFixed(0) # ', color: 'white' }
            });
        };

        function createStaarSubject() {

            var allGrades = ["3", "4", "5", "6", "7", "8", "EOC"];
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

            var obj = {};
            _.each($scope.staarSubject, function (i) {
                obj[i.Subject + "_" + i.Grade] = i[$scope.staarSubjectRecType];
            });
            var finalData = [obj];

            var series = [];
            _.each(Subjects, function (subject) {
                _.each(subject.Grades, function (grade) {
                    if (obj[subject.Code + "_" + grade]) {
                        series.push({ field: subject.Code + "_" + grade, name: grade + (grade != "EOC" ? grade == "3" ? "rd " : "th " : "") + " Grade " + subject.Name, color: subject.Color });
                    }
                });
            });

            $("#staarSubject").kendoChart({
                legend: {
                    visible: true,
                    position: 'bottom'
                },
                seriesDefaults: {
                    type: "column",
                    labels: {
                        visible: true,
                        template: "#=  value < 0 ? 'N/A' : (value).toFixed(0) + '%' #",
                    }
                },
                tooltip: {
                    visible: true,
                    template: "#= series.name #: #= value < 0 ? 'N/A' :(value).toFixed(0) + '%' #",
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
                    min: 0,
                    max: 100,
                },
                categoryAxis: {
                    field: "day",
                    majorGridLines: {
                        visible: false
                    },
                    line: {
                        visible: false
                    }
                }
            });
        };

    };
}]);