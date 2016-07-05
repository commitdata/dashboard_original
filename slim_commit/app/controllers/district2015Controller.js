angular.module('myApp').controller('district2015Controller', ['$scope', '$routeParams', '$location', 'district2015Data', 'printDiv', 'districtStaar', 'districtGeneral', 'districtStudent', 'districtLong', 'districtStaff', '$q', '$timeout', '$filter', 'd2bURI', 'JSONToCSV', 'fieldMapper', function ($scope, $routeParams, $location, district2015Data, printDiv, districtStaar, districtGeneral, districtStudent, districtLong, districtStaff, $q, $timeout, $filter, d2bURI, JSONToCSV, fieldMapper) {
    var allCounty = { COUNTY: null, CNTYNAME: "All" };

    $scope.tabOptions = {
        /*http://demos.telerik.com/kendo-ui/tabstrip/events */
        contentLoad: function (e) {
            var selectedItem = $(e.item).attr("data-item");
            switch (selectedItem) {
                case 'general':
                    $timeout(loadGeneral, 100);
                    break;
                case 'student':
                    $timeout(loadStudent, 100);
                    break;
                case 'longitudinal':
                    $timeout(loadLong, 100);
                    break;
                case 'staff':
                    $timeout(loadStaff, 100);
                    break;
                case 'staar':
                    $timeout(loadStaar, 100);
                    break
                default:
                    break;
            }

            bindExportControls(e.contentElement);
        }
    };

    $scope.district = {};
    $scope.state = {};
    $scope.selectedDistrict = null;

    $scope.print = function () {
        $scope.spinner = true;
        $timeout(function () {
            printDiv("district-container", $scope.selectedDistrict.DISTNAME).then(function () { $timeout(function () { $scope.spinner = false; }); });
        }, 100);

    };


    $scope.tooltipOptions = {
        content: function (event) { var selector = "#" + event.target.attr('data-chart') + "Doc"; return $(selector).html(); },
        position: "left"
    };

    $scope.boxTooltipOptions = {
        content: function (event) { var selector = "#" + event.target.attr('data-div'); return $(selector).html(); },
        position: "left"
    };

    var chartMapper = {};

    $scope.download = function () {
        var extendo = {};
        _.each($scope.district, function (value, key) {
            angular.extend(extendo, value);
        });
        extendo["DISTRICT"] = $scope.selectedDistrict.DISTNAME;
        JSONToCSV([extendo], $scope.selectedDistrict.DISTNAME, true, fieldMapper.district);
    };

    $scope.$on("$viewContentLoaded", function () {
        $scope.selectedYear = $routeParams.year || '2015';
        district2015Data.setCurrentYear($scope.selectedYear);
        districtGeneral.Init($scope, chartMapper);
        districtStudent.Init($scope, chartMapper);
        districtStaff.Init($scope, chartMapper);
        districtLong.Init($scope, chartMapper);
        districtStaar.Init($scope, chartMapper);
    });

    $scope.countyChange = function () {
        if (!$scope.selectedCounty) return;
        $scope.districts = null;
        $scope.selectedDistrict = null;
        district2015Data.getDistricts($scope.selectedCounty.COUNTY).success(function (data) {
            $scope.districts = data;
        })
    };

    $scope.districtChange = function () {
        if (!$scope.selectedDistrict) return;
        $location.path("district/" + $scope.selectedYear + "/" + $scope.selectedDistrict["DISTRICT"]);

    };

    $scope.yearChange = function () {
        if ($scope.selectedYear) {
            $location.path("district/" + $scope.selectedYear + "/" + $scope.selectedDistrict.DISTRICT);
        }
    };

    $scope.gradeChange = function () {
        console.log($scope.selectStaarGrades);
        if (!$scope.selectStaarGrades) return;
        if ($scope.selectStaarGrades != "none") {
            $scope.filteredSubjects = _.where($scope.subject, { "Grade": $scope.selectStaarGrades });
            $scope.staarAllGradesSubType = $scope.filteredSubjects[0].Subject;
        }
        else {
            $scope.filteredSubjects = {};
            $scope.staarAllGradesSubType = null;
        }
    };



    function loadGeneral() {
        var districtID = $routeParams.districtID || "'057905";
        $scope.spinner = true;
        var promises = [];

        promises.push(district2015Data.getCounties().then(function (response) {
            response.data.unshift(allCounty);
            $scope.counties = response.data;
            $scope.selectedCounty = _.findWhere($scope.counties, { COUNTY: districtID.substr(0, 4) });
        }));

        promises.push(district2015Data.getDistricts(districtID.substr(0, 4)).success(function (data) {
            $scope.districts = data;
            $scope.selectedDistrict = _.findWhere($scope.districts, { DISTRICT: districtID });
        }));

        promises.push(districtGeneral.CreateStudentInfo(districtID));
        promises.push(districtGeneral.CreateCollegeAdmissions(districtID));
        promises.push(districtGeneral.CreateStaarAllGrades(districtID));
        promises.push(districtGeneral.CreateStaarAllSubjectGrades(districtID));
        promises.push(districtGeneral.CreateGraduationRates(districtID));
        promises.push(districtGeneral.CreateStaarSubject(districtID));
        $q.all(promises).then(function () {
            //set Analytics
            var analyticsData = {
                Country: $scope.selectedCounty.CNTYNAME,
                CountryCode: $scope.selectedCounty.COUNTY,
                District: $scope.selectedDistrict.DISTRICT,
                DName: $scope.selectedDistrict.DISTNAME
            };
            district2015Data.addDistrictAnalytics(analyticsData).then(function (response) {
            });
            //Hide spinner when all promises are resolved
            $scope.spinner = false;
            console.log($scope.district);
        });

    };

    function loadStudent() {
        $scope.spinner = true;
        var districtID = $scope.selectedDistrict.DISTRICT;
        var promises = [];
        promises.push(districtStudent.CreateStudentAll(districtID));
        $q.all(promises).then(function (results) {
            $scope.spinner = false;
            console.log($scope.district);
        });

    };

    function loadStaff() {
        $scope.spinner = true;
        var districtID = $scope.selectedDistrict.DISTRICT;
        var promises = [];
        promises.push(districtStaff.CreateStaffInformation(districtID));
        promises.push(districtStaff.CreateStaffExperience(districtID));
        $q.all(promises).then(function (results) {
            $scope.spinner = false;
            console.log($scope.district);
        });

    };

    function loadLong() {
        $scope.spinner = true;
        var districtID = $scope.selectedDistrict.DISTRICT;
        var promises = [];
        promises.push(districtLong.CreateDemographicsTime(districtID));
        promises.push(districtLong.CreateSatActTime(districtID));
        $q.all(promises).then(function (results) {
            $scope.spinner = false;
            console.log($scope.district);
        });
    };
    function loadStaar() {
        var districtID = $routeParams.districtID || "'057905";
        $scope.spinner = true;
        var promises = [];

        promises.push(district2015Data.getCounties().then(function (response) {
            response.data.unshift(allCounty);
            $scope.counties = response.data;
            $scope.selectedCounty = _.findWhere($scope.counties, { COUNTY: districtID.substr(0, 4) });
        }));

        promises.push(district2015Data.getDistricts(districtID.substr(0, 4)).success(function (data) {
            $scope.districts = data;
            $scope.selectedDistrict = _.findWhere($scope.districts, { DISTRICT: districtID });
        }));

        //promises.push(districtStaar.CreateStaarGrades(districtID));
        promises.push(districtStaar.CreateSelectStaarGrades(districtID));

        $q.all(promises).then(function () {
            //Hide spinner when all promises are resolved
            //$scope.spinner = false;
            console.log($scope.district);
        });

    };
    function bindExportControls(targetWrapper) {
        $(".csvExport", targetWrapper).on("click", function () {
            var chartType = $(this).attr("data-chart");
            var chartData = chartMapper[chartType].data();
            JSONToCSV(chartData, chartType, true, fieldMapper.district);
        });

        $(".imageExport", targetWrapper).on("click", function () {
            var chartType = $(this).attr("data-chart");
            var chart = chartMapper[chartType].kChart();
            var imageDataURL = chart.imageDataURL();
            this.href = d2bURI(imageDataURL);
        });
    };

}]);