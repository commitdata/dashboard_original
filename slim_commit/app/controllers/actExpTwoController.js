angular.module('myApp').controller('actExpTwoController', function ($scope, $routeParams, $location, $timeout, sqlData) {

    $scope.viewType = 'campus';
    $scope.spinner = true;
    var districtData = null;
    var selectedDist;
    var colorDict = {
        "Re": "#003662",
        "Al": "#91c63d",
        "Wr": "#ef5727",
        "So": "#ef5727",
        "Sc": "#fbb613"
    };

    $scope.subjectGrades = [
        { Name: "Reading 3", Subject: "Reading", Grade: "3" },
        { Name: "Reading 4", Subject: "Reading", Grade: "4" },
        { Name: "Reading 5", Subject: "Reading", Grade: "5" },
        { Name: "Reading 6", Subject: "Reading", Grade: "6" },
        { Name: "Reading 7", Subject: "Reading", Grade: "7" },
        { Name: "Reading 8", Subject: "Reading", Grade: "8" },
        { Name: "Science 5", Subject: "Science", Grade: "5" },
        { Name: "Science 8", Subject: "Science", Grade: "8" },
        { Name: "Writing 4", Subject: "Writing", Grade: "4" },
        { Name: "Writing 7", Subject: "Writing", Grade: "7" },
        { Name: "Social Studies 8", Subject: "Social Studies", Grade: "8" },
        { Name: "Total All Grades", Subject: "Total", Grade: "All Grades" }
    ];


    $scope.subjectChange = function () {
        sqlData.getActExpAll($scope.selectedSubject.Subject, $scope.selectedSubject.Grade).then(function (allData) {
            createHopeChart(allData);
        });
    };


    function createHopeChart(allData) {
        var series = [];
        _.each(allData, function (i, index) {
            
            series.push({ name: i.Campus, data: [[i.EcoDis * 100, i.Final_Rec_Rate_Per * 100]], color: i.District == selectedDist ? "#ef5727" : "#003662" });
        });
        $("#hopeChart").kendoChart({
            legend: {
                position: "bottom",
                visible: false
            },
            seriesDefaults: {
                type: "scatter"
            },
            series: series,
            tooltip: {
                visible: true,
                template: "#= series.name #",
                color: 'white'
            },
            xAxis: {
                max : 101,
                title: {
                    text: "Economically Disadvantaged (%)"
                },
                crosshair: {
                    visible: true,
                    tooltip: {
                        visible: true,
                        format: "n1",
                        color: '#ffffff',
                        template: "#= value.toFixed(0) + '%' #",
                    }
                }
            },
            yAxis: {
                max: 101,
                title: {
                    text: "Postsecondary Readiness Standard Rate (%)"
                },
                axisCrossingValue: -5,
                crosshair: {
                    visible: true,
                    tooltip: {
                        visible: true,
                        format: "n1",
                        color: '#ffffff',
                        template: "#= value.toFixed(0) + '%' #",
                    }
                }
            }
        });
    }


    function showCampusView() {
        $scope.spinner = true;
        var campusGroups = _.groupBy(districtData, function (item) { return item.Campus; })
        var campuses = [];
        _.each(campusGroups, function (value, key) {
            campuses.push({ Name: key, Data: value });
        });
        _.each(campuses, function (campus) {
            var fields = [];
            var chartData = {};
            _.each(campus.Data, function (data) {
                var key = data["Subject"].substr(0, 2) + data["Grade"].substr(0, 1);
                var field = { field: key, name: data["Subject"] + " " + data["Grade"], color: colorDict[data["Subject"].substr(0, 2)] }
                chartData[key] = data["Exp_vs_Act_Per"] * 100;
                chartData[key + "tip"] = "<br />" + "Students Tested : " + data["Students_Tested"] + "<br />";
                chartData[key + "tip"] += "Final Recognizaton Rate : " + (data["Final_Rec_Rate_Per"] * 100).toFixed(0) + " %<br />";
                chartData[key + "tip"] += "Economically Disadvantaged : " + (data["EcoDis"] * 100).toFixed(0) + " %";
                fields.push(field);
            });
            campus.fields = fields;
            campus.chartData = [chartData];
        });
        $scope.campuses = campuses;

    };

    function showSubjectView() {
        $scope.spinner = true;
        var subjectGroups = _.groupBy(districtData, function (item) { return item.Subject + " " + item.Grade; })
        var subjects = [];
        _.each(subjectGroups, function (value, key) {
            var data = _.sortBy(value, function (i) { return i.Campus });
            subjects.push({ Name: key, Data: data });
        });
        _.each(subjects, function (subject) {

            subject.charts = [];
            var fields = [];
            var chartData = {};
            var index = 0;
            var spacing = 7 / subject.Data.length;
            var gap = 70 / (subject.Data.length * subject.Data.length);
            _.each(subject.Data, function (data) {
                var key = "c" + data["Campus_Number"];
                var field = { field: key, name: data["Campus"], spacing: spacing, gap: gap, color: colorDict[data["Subject"].substr(0, 2)] }
                chartData[key] = data["Exp_vs_Act_Per"] * 100;
                chartData[key + "tip"] = "<br />" + "Students Tested : " + data["Students_Tested"] + "<br />";
                chartData[key + "tip"] += "Final Recognizaton Rate : " + (data["Final_Rec_Rate_Per"] * 100).toFixed(0) + " %<br />";
                chartData[key + "tip"] += "Economically Disadvantaged : " + (data["EcoDis"] * 100).toFixed(0) + " %";
                fields.push(field);
                index++;
                if (index % 50 == 0) {
                    subject.charts.push({ fields: fields, chartData: [chartData] });
                    fields = [];
                    chartData = {};
                }
            });
            subject.charts.push({ fields: fields, chartData: [chartData] });
        });
        console.log(subjects);
        $scope.subjects = subjects;

    };


    function loadDistrict(selectedDistrict) {
        $scope.spinner = true;
        selectedDist = selectedDistrict;
        $scope.subjectChange();
        sqlData.getActExpData(selectedDistrict).then(function (data) {
            districtData = data;
            if ($scope.viewType == 'campus') {
                showCampusView();
            }
            else {
                showSubjectView();
            }

        });
    };

    function encodeDistrict(distname) {
        var encoded = "";
        for (var i = 0; i < distname.length; i++) {
            encoded += String.fromCharCode(distname.charCodeAt(i) + 1);
        }
        return encoded;
    };

    function decodeDistrict(encoded) {
        var decoded = "";
        for (var i = 0; i < encoded.length; i++) {
            decoded += String.fromCharCode(encoded.charCodeAt(i) - 1);
        }
        return decoded;
    };

    $scope.districtChange = function () {
        if ($scope.selectedDistrict) {
            $location.path("actexptwo/" + encodeDistrict($scope.selectedDistrict));
        }
    };

    $scope.onRender = function (index) {
        if ($scope.campuses.length - 1 == index) {
            $scope.spinner = false;
        }
    };

    $scope.onSubjectRender = function (index) {
        if ($scope.subjects.length - 1 == index) {
            $scope.spinner = false;
        }
    };

    $scope.$watch('selectedDistrict', function (value) {
        $scope.districtMessage = 'Showing data for ' + value + ' district';
    });

    $scope.$watch('viewType', function (value) {
        console.log(value);
        if (value && districtData) {
            if (value == 'campus') {
                showCampusView();
            }
            else {
                showSubjectView();
            }
        }
    });

    $scope.$on("$viewContentLoaded", function () {
        $scope.selectedSubject = $scope.subjectGrades[0];
        sqlData.getActExpDistrictsTwo().then(function (districts) {
            $scope.districts = districts;
            if ($routeParams.districtID) {
                $scope.selectedDistrict = decodeDistrict($routeParams.districtID);
                loadDistrict($scope.selectedDistrict);
            }
            else {
                $scope.spinner = false;
            }
        });

    });


});