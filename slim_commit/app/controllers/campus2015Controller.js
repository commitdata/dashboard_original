angular.module('myApp').controller('campus2015Controller', ['$scope', '$routeParams', '$location', 'campusStaar', 'campusData', 'campusGeneral', 'campusStudent', 'campusStaff', 'campusAdmissions', 'campusC4Long', 'campusLong', '$timeout', 'fieldMapper', 'printDiv', 'd2bURI', 'JSONToCSV', '$filter', '$q', 'campusDropout', 'campusAPIB', 'campusCCReady', function ($scope, $routeParams, $location, campusStaar, campusData, campusGeneral, campusStudent, campusStaff, campusAdmissions, campusC4Long, campusLong, $timeout, fieldMapper, printDiv, d2bURI, JSONToCSV, $filter, $q, campusDropout, campusAPIB, campusCCReady) {
    var allDistrict = { DISTRICT: null, DISTNAME: "All" };

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
                case 'staff':
                    $timeout(loadStaff, 100);
                    break;
                case 'admissions':
                    $timeout(loadAdmissions, 100);
                    break;
                case 'longitudinal':
                    $timeout(loadLong, 100);
                    break;
                case 'c4Long':
                    $timeout(loadC4Long, 100);
                    break;
                case 'dropout':
                    $timeout(loadDropout, 100);
                    break;
                case 'apib':
                    $timeout(loadAPIB, 100);
                    break;
                case 'ccReady':
                    $timeout(loadCCReady, 100);
                    break;
                case 'staar':
                    $timeout(loadStaar, 100);
                    break;
                default:
                    break;
            }

            bindExportControls(e.contentElement);
        }
    };

    $scope.campus = {};

    var chartMapper = {};

    $scope.tooltipOptions = {
        content: function (event) { var selector = "#" + event.target.attr('data-chart') + "Doc"; return $(selector).html(); },
        position: "left"
    };

    $scope.boxTooltipOptions = {
        content: function (event) { var selector = "#" + event.target.attr('data-div'); return $(selector).html(); },
        position: "left"
    };

    $scope.exportMap = campusGeneral.ExportMap;

    $scope.print = function () {
        $scope.spinner = true;
        $timeout(function () {
            var width = $("#campus-container").outerWidth() + 100;
            var height = 842 * width / 595; /* A4 PDF page size at 73dpi : 595 X 842 pixels*/
            printDiv("campus-container", $scope.selectedCampus.CAMPNAME, [width, height]).then(function () { $timeout(function () { $scope.spinner = false; }); });
        }, 100);

    };


    $scope.download = function () {
        var extendo = {};
        _.each($scope.campus, function (value, key) {
            angular.extend(extendo, value);
        });
        JSONToCSV([extendo], $scope.selectedCampus.CAMPNAME, true, fieldMapper.campus);
    };

    $scope.countyChange = function () {
        if (!$scope.selectedCounty) return;
        $scope.districts = null;
        $scope.campuses = null;
        $scope.selectedDistrict = null;
        $scope.selectedCampus = null;
        campusData.getDistricts($scope.selectedCounty.COUNTY).success(function (data) {
            $scope.selectedDistrict = allDistrict;
            data.unshift($scope.selectedDistrict);
            $scope.districts = data;
            $scope.districtChange();
        });
    };

    $scope.districtChange = function () {
        if (!$scope.selectedDistrict) return;
        $scope.campuses = null;
        $scope.selectedCampus = null;
        campusData.getCampuses($scope.selectedDistrict.DISTRICT, $scope.selectedCounty.COUNTY).success(function (data) {
            $scope.campuses = _.sortBy(data, 'CAMPNAME');
        });
    };


    $scope.campusChange = function () {
        if ($scope.selectedCampus && $scope.selectedCampus.CAMPUS) {
            $location.path("campus/" + $scope.selectedYear + "/" + $scope.selectedCampus.CAMPUS);
        }
    };

    $scope.yearChange = function () {
        if ($scope.selectedYear) {
            $location.path("campus/" + $scope.selectedYear + "/" + $scope.selectedCampus.CAMPUS);
        }
    };
    $scope.gradeChange = function () {
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
        $scope.spinner = true;

        var campusID = $routeParams.campusID || "'057905022";
          var promises = [];

        promises.push(campusData.getCounties().success(function (data) {
            $scope.counties = data;
            $scope.selectedCounty = _.findWhere($scope.counties, { COUNTY: campusID.substr(0, 4) });
        }));

        promises.push(campusData.getDistricts(campusID.substr(0, 4)).success(function (data) {
            data.unshift(allDistrict);
            $scope.districts = data;
            $scope.selectedDistrict = _.findWhere($scope.districts, { DISTRICT: campusID.substr(0, 7) });
        }));

        promises.push(campusData.getCampuses(campusID.substr(0, 7)).success(function (data) {
            $scope.campuses = data;
            $scope.selectedCampus = _.findWhere($scope.campuses, { CAMPUS: campusID });
            if (!$scope.selectedCampus) {
                alert("No valid Campus found!");
                $location.path("campus");
            }
        }));

        promises.push(campusGeneral.CreateStudentInfo(campusID));
        promises.push(campusGeneral.CreateStaffExperience(campusID));
        promises.push(campusGeneral.CreateGraduationRates(campusID));
        promises.push(campusGeneral.CreateCollegeAdmissions(campusID));
        promises.push(campusGeneral.CreateStaarAll(campusID));
        promises.push(campusGeneral.CreateStaarSubject(campusID));

        $q.all(promises).then(function (results) {
            //set Analytics
            var analyticsData = {
                Country: $scope.selectedCounty.CNTYNAME,
                CountryCode: $scope.selectedCounty.COUNTY,
                District: $scope.selectedDistrict.DISTRICT,
                DName: $scope.selectedDistrict.DISTNAME,
                Campus: $scope.selectedCampus.CAMPUS,
                CName: $scope.selectedCampus.CAMPNAME
            };
            campusData.addCampusAnalytics(analyticsData).then(function (response) {
            });

            //Hide spinner when all promises are resolved
            $scope.spinner = false;
            campusGeneral.CreateCampusMap(campusID);
        });

    };

    function loadStudent() {
        $scope.spinner = true;
        var campusID = $scope.selectedCampus.CAMPUS;
        var promises = [];
        promises.push(campusStudent.CreateStudentAll(campusID));
        $q.all(promises).then(function (results) {
            $scope.spinner = false;
        });

    };

    function loadStaff() {
        $scope.spinner = true;
        var campusID = $scope.selectedCampus.CAMPUS;
        var promises = [];
        promises.push(campusStaff.CreateStaffAll(campusID));
        $q.all(promises).then(function (results) {
            $scope.spinner = false;
        });

    };


    function loadAdmissions() {
        $scope.spinner = true;
        var campusID = $scope.selectedCampus.CAMPUS;
        var promises = [];
        promises.push(campusAdmissions.CreateAdmissionsAll(campusID));
        $q.all(promises).then(function (results) {
            $scope.spinner = false;
        });

    };


    function loadC4Long() {
        $scope.spinner = true;
        var campusID = $scope.selectedCampus.CAMPUS;
        var promises = [];
        promises.push(campusC4Long.CreateC4LongAll(campusID));
        $q.all(promises).then(function (results) {
            $scope.spinner = false;
        });
    };

    function loadLong() {
        $scope.spinner = true;
        var campusID = $scope.selectedCampus.CAMPUS;
        var promises = [];
        promises.push(campusLong.CreateCharts(campusID));
        promises.push(campusLong.CreateMobility(campusID));
        promises.push(campusLong.CreateAttendance(campusID));
        $q.all(promises).then(function (results) {
            $scope.spinner = false;
        });

    };

    function loadDropout() {
        $scope.spinner = true;
        var campusID = $scope.selectedCampus.CAMPUS;
        var promises = [];
        promises.push(campusDropout.CreateDropoutAll(campusID));
        $q.all(promises).then(function (results) {
            $scope.spinner = false;
        });

    };

    function loadAPIB() {
        $scope.spinner = true;
        var campusID = $scope.selectedCampus.CAMPUS;
        var promises = [];
        promises.push(campusAPIB.CreateAPIBAll(campusID));
        $q.all(promises).then(function (results) {
            $scope.spinner = false;
        });

    };

    function loadCCReady() {
        $scope.spinner = true;
        var campusID = $scope.selectedCampus.CAMPUS;
        var promises = [];
        promises.push(campusCCReady.CreateCCReadyAll(campusID));
        $q.all(promises).then(function (results) {
            $scope.spinner = false;
        });

    };
    function loadStaar() {
        $scope.spinner = true;

        var campusID = $routeParams.campusID || "'057905022"
            var promises = [];

        promises.push(campusData.getCounties().success(function (data) {
            $scope.counties = data;
            $scope.selectedCounty = _.findWhere($scope.counties, { COUNTY: campusID.substr(0, 4) });
        }));

        promises.push(campusData.getDistricts(campusID.substr(0, 4)).success(function (data) {
            data.unshift(allDistrict);
            $scope.districts = data;
            $scope.selectedDistrict = _.findWhere($scope.districts, { DISTRICT: campusID.substr(0, 7) });
        }));

        promises.push(campusData.getCampuses(campusID.substr(0, 7)).success(function (data) {
            $scope.campuses = data;
            $scope.selectedCampus = _.findWhere($scope.campuses, { CAMPUS: campusID });
            if (!$scope.selectedCampus) {
                alert("No valid Campus found!");
                $location.path("campus");
            }
        }));


        promises.push(campusStaar.CreateSelectStaarGrades(campusID));

        $q.all(promises).then(function (results) {
            //Hide spinner when all promises are resolved
            $scope.spinner = false;
        });
    };


    $scope.$on("$viewContentLoaded", function () {
        $scope.selectedYear = $routeParams.year || '2015';
        campusData.setCurrentYear($scope.selectedYear);
        campusGeneral.Init($scope, chartMapper);
        campusStudent.Init($scope, chartMapper);
        campusStaff.Init($scope, chartMapper);
        campusLong.Init($scope, chartMapper);
        campusAdmissions.Init($scope, chartMapper);
        campusC4Long.Init($scope, chartMapper);
        campusDropout.Init($scope, chartMapper);
        campusAPIB.Init($scope, chartMapper);
        campusCCReady.Init($scope, chartMapper);
        campusStaar.Init($scope, chartMapper);
    });

    function bindExportControls(targetWrapper) {
        $(".csvExport", targetWrapper).on("click", function () {
            var chartType = $(this).attr("data-chart");
            var chartData = chartMapper[chartType].data();
            JSONToCSV(chartData, chartType, true, fieldMapper.campus);
        });

        $(".imageExport", targetWrapper).on("click", function () {
            var chartType = $(this).attr("data-chart");
            var chart = chartMapper[chartType].kChart();
            var imageDataURL = chart.imageDataURL();
            this.href = d2bURI(imageDataURL);
        });
    };

}]);