angular.module('myApp').controller('actExpController', function ($scope, $timeout, sqlData) {
    $scope.spinner = true;
    $scope.viewType = "campus";
    $scope.noFeeder = true;

    var largeDistricts = ["RICHARDSON ISD", "MESQUITE ISD", "DALLAS ISD", "GARLAND ISD", "CARROLLTON-FARM"];

    $scope.subjects = [
        { Name: "3rd Grade Math", code: "m3", tableName: "actexp_es" },
        { Name: "3rd Grade Reading", code: "r3", tableName: "actexp_es" },
        { Name: "4th Grade Math", code: "m4", tableName: "actexp_es" },
        { Name: "4th Grade Reading", code: "r4", tableName: "actexp_es" },
        { Name: "4th Grade Writing", code: "w4", tableName: "actexp_es" },
        { Name: "5th Grade Math", code: "m5", tableName: "actexp_es" },
        { Name: "5th Grade Reading", code: "r5", tableName: "actexp_es" },
        { Name: "5th Grade Science", code: "s5", tableName: "actexp_es" },
        { Name: "6th Grade Math", code: "m6", tableName: "actexp_ms" },
        { Name: "6th Grade Reading", code: "r6", tableName: "actexp_ms" },
        { Name: "7th Grade Math", code: "m7", tableName: "actexp_ms" },
        { Name: "7th Grade Reading", code: "r7", tableName: "actexp_ms" },
        { Name: "7th Grade writing", code: "w7", tableName: "actexp_ms" },
        { Name: "8th Grade Math", code: "m8", tableName: "actexp_ms" },
        { Name: "8th Grade Reading", code: "r8", tableName: "actexp_ms" },
        { Name: "8th Grade Science", code: "s8", tableName: "actexp_ms" },
        { Name: "8th Grade History", code: "h8", tableName: "actexp_ms" },
        { Name: "Unknown", code: "xx", tableName: "actexp_ms" },
        { Name: "Algebra 1", code: "a1", tableName: "actexp_hs" },
        { Name: "Bilogy", code: "bi", tableName: "actexp_hs" },
        { Name: "English 1", code: "e1", tableName: "actexp_hs" },
        { Name: "English 2", code: "e2", tableName: "actexp_hs" },
        { Name: "US History", code: "us", tableName: "actexp_hs" },
    ];
    $scope.selectedSubject = $scope.subjects[1];

    function createSubjectChart(data, column, subType, selectedDistrict) {
        $("#subjectChart").empty();
        $("#subjectChartView").show();
        var series = [];
        _.each(data, function (item) {
            series.push({ data: [item[column]], name: item.CNAME /* , color: colors[indexer] */ });
        });


        $("#subjectChart").kendoChart({
            legend: {
                position: "bottom"
            },
            seriesDefaults: {
                type: "column",
                labels: {
                    visible: data.length < 11,
                    template: "#= series.name #: #= (value*100).toFixed(0) #%",
                }
            },
            tooltip: {
                visible: true,
                template: "#= series.name #: #= (value*100).toFixed(0) #%",
                color: 'white'
            },
            series: series,
            valueAxis: {
                majorGridLines: {
                    visible: true
                },
                visible: true,
                labels: {
                    template: "#: (value*100).toFixed(0) # %"
                },
                /*min: 0,
                max: 100 */
            },
            categoryAxis: {
                majorGridLines: {
                    visible: false
                },
                line: {
                    visible: false
                }
            }
        });
    };

    $scope.districtChange = function () {
        $scope.selectedFeeder = null;
        if ($scope.selectedDistrict && $scope.viewType == "subject") {
            $scope.subjectChange($scope.selectedSubject);
            return;
        }
        if ($scope.selectedDistrict) {
            sqlData.getActExpFeeders($scope.selectedDistrict).then(function (feeders) {
                $scope.feeders = _.filter(feeders, function (item) { return item });
                $scope.feeders.unshift("Not Applicable");
                if (largeDistricts.indexOf($scope.selectedDistrict) < 0) {
                    $scope.feeders.unshift("All");
                    $scope.selectedFeeder = "All";
                    $scope.noFeeder = true;
                    $scope.feederChange();
                }
                else {
                    $scope.noFeeder = false;
                }
            });
        }
    };

    $scope.feederChange = function () {
        $scope.selectedSubject = null;
        if (!$scope.selectedDistrict || !$scope.selectedFeeder || $scope.viewType == "subject") {
            return;
        }
        $("#subjectChartView").hide();
        $scope.spinner = true;
        sqlData.getActExpSchools($scope.selectedDistrict, $scope.selectedFeeder).then(function (schoolGroup) {
            $scope.eSchools = schoolGroup.es;
            if ($scope.eSchools.length > 0) { $timeout(function () { $scope.schoolSelected($scope.eSchools[0], 'es') }, 10);};
            $scope.mSchools = schoolGroup.ms;
            if ($scope.mSchools.length > 0) { $timeout(function () { $scope.schoolSelected($scope.mSchools[0], 'ms') }, 10);};
            $scope.hSchools = schoolGroup.hs;
            if ($scope.hSchools.length > 0) { $timeout(function () { $scope.schoolSelected($scope.hSchools[0], 'hs') }, 10); };
            $scope.spinner = false;
        });
    };


    $scope.subjectChange = function (subject) {
        $scope.selectedSubject = subject;
        if (!$scope.selectedDistrict || !$scope.selectedSubject) {
            return;
        }
        console.log($scope.selectedSubject);
        $scope.spinner = true;
        sqlData.getActExpSchoolsBySubject($scope.selectedDistrict, $scope.selectedSubject.code, $scope.selectedSubject.tableName).then(function (schools) {
            if (schools.length > 0) {
                createSubjectChart(schools, $scope.selectedSubject.code, $scope.selectedDistrict);
            }
            else {
                $("#subjectChart").html("<h3>Data not available</h3>");
                $("#subjectChartView").show();
            }
            console.log(schools);
            $scope.spinner = false;
        });
    };

    $scope.schoolSelected = function (school, type) {
        $scope[type + "Arr"] = [school];
        $scope["selected" + type + "School"] = school;
    };

    $scope.$on("$viewContentLoaded", function () {
        sqlData.getActExpDistricts().then(function (districts) {
            $scope.districts = districts;
            $scope.spinner = false;
        });

    });


});