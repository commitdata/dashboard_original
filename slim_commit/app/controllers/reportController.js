angular.module('myApp').controller('reportController', ['$scope', '$routeParams', '$location', '$http', 'reportData', 'gridView', function ($scope, $routeParams, $location, $http, reportData, gridView) {

    $scope.loadExcel = function () {
        $scope.spinner = true;
        $http({ method: "GET", url: "/api/Report/GetExcelSheet", params: { year: 2015 } }).then(function (response) {

            window.location.assign("/api/Report/DownloadShapeFile?fileName=" + response.data);
            $scope.spinner = false;
        });
    }

    $scope.ExportData = function () {

        var filter = getfilterData();

        $scope.spinner = true;
        reportData.ExportData(filter).then(function (response) {

            window.location.assign("/api/Report/DownloadShapeFile?fileName=" + response.data);
            $scope.spinner = false;

            //set Analytic data
            var analyticData = getAnalyticData(filter);
            reportData.setReportAnalytics(analyticData).then(function () {
            });

            $scope.spinner = false;
        });
    }

    function getAnalyticData(filter) {
        var districtData = [];
        _.each($scope.selectedDistricts, function (camp) {
            var data = _.find($scope.districts, function (dist) {
                return dist.DISTRICT == camp;
            });
            districtData.push(data);
        });
        return {
            District: districtData,
            Campus: selectedAllCampus,
            Year: filter.Year,
            Grades: filter.Grades,
            Demographic: filter.Demographic,
            Level: filter.Level
        };
    }

    $scope.yearData = [
        { Text: "2012", Value: "12" },
        { Text: "2013", Value: "13" },
        { Text: "2014", Value: "14" },
        { Text: "2015", Value: "15" }
    ];

    $scope.subjectGrades = [
       { Name: "Reading 3", Subject: "r", Grade: "3" },
       { Name: "Reading 4", Subject: "r", Grade: "4" },
       { Name: "Reading 5", Subject: "r", Grade: "5" },
       { Name: "Reading 6", Subject: "r", Grade: "6" },
       { Name: "Reading 7", Subject: "r", Grade: "7" },
       { Name: "Reading 8", Subject: "r", Grade: "8" },
       { Name: "Mathematics 3", Subject: "m", Grade: "3" },
       { Name: "Mathematics 4", Subject: "m", Grade: "4" },
       { Name: "Mathematics 5", Subject: "m", Grade: "5" },
       { Name: "Mathematics 6", Subject: "m", Grade: "6" },
       { Name: "Mathematics 7", Subject: "m", Grade: "7" },
       { Name: "Mathematics 8", Subject: "m", Grade: "8" },
       { Name: "Science 5", Subject: "s", Grade: "5" },
       { Name: "Science 8", Subject: "s", Grade: "8" },
       { Name: "Writing 4", Subject: "w", Grade: "4" },
       { Name: "Writing 7", Subject: "w", Grade: "7" },
       { Name: "Social Studies 8", Subject: "h", Grade: "8" },
       { Name: "U.S. History", Subject: "us", Grade: "EOC" },
       { Name: "Biology", Subject: "bi", Grade: "EOC" },
       { Name: "Algebra I", Subject: "a1", Grade: "EOC" },
       { Name: "English 1", Subject: "e1", Grade: "EOC" },
       { Name: "English 2", Subject: "e2", Grade: "EOC" }
    ];

    $scope.demoGraphics = [
        { Name: "All Students", demo: "all" },
        { Name: "At Risk", demo: "atry" },
        { Name: "Hispanic", demo: "ethh" },
        { Name: "Female", demo: "sexf" },
        { Name: "African American", demo: "ethb" },
        { Name: "Economically Disadvantaged", demo: "ecoy" },
        { Name: "Male", demo: "sexm" }
    ];

    $scope.level = [
        { Name: "Postsecondary Readiness Standard", Code: "satis_rec_nm" },
        { Name: "Phase-In 1", Code: "satis_ph1_nm" },
    ];

    $scope.state = { District: '' };


    var selectedAllCampusKey = [];
    var selectedAllCampus = [];
    $scope.selectedDistricts = [];

    var campusData = [];

    function loadCampusByText(searchCampusText) {
        $scope.spinner = true;
        reportData.getCampusBySearchText(searchCampusText).then(function (response) {
            campusData = [];

            _.each(response.data, function (camp) {
                campusData.push({ CAMPUS: camp.CAMPUS, CNAME: camp.CNAME });
            });

            var multiSelectItems = $('#campusAutoSelect').data('kendoMultiSelect');
            multiSelectItems.setDataSource(campusData);
            $scope.spinner = false;
        });
    }

    function loadCampus(selectedDistrictCode) {

        $scope.spinner = true;
        reportData.GetCampus(selectedDistrictCode).then(function (response) {
            campusData = [];

            _.each(response.data, function (camp) {
                campusData.push({ CAMPUS: camp.CAMPUS, CNAME: camp.CNAME });
            });

            var multiSelectItems = $('#campusAutoSelect').data('kendoMultiSelect');
            multiSelectItems.setDataSource(campusData);
            $scope.spinner = false;
        });
    }


    $scope.addCampusToCommonList = function () {

        var autoFillData = [];

        var selectedDistrict = $("#districtAutoSelect").data('kendoComboBox').value();
        var isDistrictInList = false;
        _.each($scope.selectedDistricts, function (district) {
            if (district == selectedDistrict)
                isDistrictInList = true;
        });

        if (!isDistrictInList)
            $scope.selectedDistricts.push(selectedDistrict);


        var multiSelectItems = $('#campusAutoSelect').data('kendoMultiSelect');
        var selectedValues = multiSelectItems.value();

        multiSelectItems.value([]);

        _.each(selectedValues, function (campusId) {

            var camp1 = _.find(campusData, function (d) { return d.CAMPUS == campusId; });
            selectedAllCampus.push(camp1);
        });

        var multiSelectItems = $('#commonCampusAutoSelected').data('kendoMultiSelect');
        multiSelectItems.setDataSource(selectedAllCampus);
        multiSelectItems.value(selectedAllCampus);
    };

    function getfilterData() {
        var grade = [];
        var campus = getMultiSelectedValues('#commonCampusAutoSelected');
        var year = getMultiSelectedValues('#yearAutoSelect');
        var gradeData = getMultiSelectedValues('#subjectGradeAutoSelect');

        _.each(gradeData, function (text) {
            var data = _.find($scope.subjectGrades, function (d) { return d.Name == text; });
            grade.push({ Subject: data.Subject, Grade: data.Grade });
        });

        var demographic = getMultiSelectedValues('#demoGraphicsAutoSelect');
        var level = getMultiSelectedValues('#levelAutoSelect');

        return {
            Campus: campus,
            Year: year,
            Grades: grade,
            Demographic: demographic,
            Level: level
        };

    }

    $scope.loadReport = function () {

        var filter = getfilterData();
        $scope.spinner = true;
        reportData.GenerateReport(filter).then(function (response) {
            //set Analytic data
            var analyticData = getAnalyticData(filter);
            reportData.setReportAnalytics(analyticData).then(function () {
            });

            createCapmusGrid(response.data);
            $scope.spinner = false;
        });
    }


    function createCapmusGrid(data) {

        gridView.createGrid({
            data: data,
            sortable: true,
            selector: "#campusReportGrid",
            columnSelector: function (item, kendoColumnItem) {
                switch (item) {
                    case 'DNAME':
                        kendoColumnItem.title = "District";
                        break;
                    case 'CNAME':
                        kendoColumnItem.title = "Campus";
                        break;
                    case 'YEAR':
                        kendoColumnItem.title = "Year";
                        break;
                    case 'DEMO':
                        kendoColumnItem.title = "Demo";
                        break;
                    case 'SUBJECT':
                        kendoColumnItem.title = "Subject";
                        break;
                    case 'GRADE':
                        kendoColumnItem.title = "Grade  ";
                        break;
                    case 'LANGUAGE':
                        kendoColumnItem.title = "Language";
                        break;
                    case 'satis_ph1_nm':
                        kendoColumnItem.title = "Phase-In 1";
                        break;
                    case 'satis_rec_nm':
                        kendoColumnItem.title = "Postsecondary Readiness Standard";
                        break;
                }
            }
        });
    }


    function getMultiSelectedValues(id) {
        var multiSelectItems = $(id).data('kendoMultiSelect');
        return multiSelectItems.value();
    }


    function InitMultiSelectComponents() {

        $("#yearAutoSelect").kendoMultiSelect({
            dataSource: $scope.yearData,
            dataTextField: "Text",
            dataValueField: "Value",
            filter: "contains",
            placeholder: "Select Year...",
        });

        $("#subjectGradeAutoSelect").kendoMultiSelect({
            dataSource: $scope.subjectGrades,
            dataTextField: "Name",
            dataValueField: "Name",
            filter: "contains",
            placeholder: "Select Subject Grade...",
        });

        $("#demoGraphicsAutoSelect").kendoMultiSelect({
            dataSource: $scope.demoGraphics,
            dataTextField: "Name",
            dataValueField: "demo",
            filter: "contains",
            placeholder: "Select DemoGraphics...",

        });

        $("#levelAutoSelect").kendoMultiSelect({
            dataSource: $scope.level,
            dataTextField: "Name",
            dataValueField: "Code",
            filter: "contains",
            placeholder: "Select Level...",

        });

        $("#commonCampusAutoSelected").kendoMultiSelect({
            minLength: 3,
            dataSource: selectedAllCampus,
            dataTextField: "CNAME",
            dataValueField: "CAMPUS",
            filter: "contains",
            placeholder: "Select campus...",
            value: selectedAllCampus

        });

        $("#campusAutoSelect").kendoMultiSelect({
            dataSource: campusData,
            dataTextField: "CNAME",
            dataValueField: "CAMPUS",
            filter: "contains",
            placeholder: "Select campus...",

        });

        $("#districtAutoSelect").kendoComboBox({
            dataSource: $scope.districts,
            dataTextField: "DNAME",
            dataValueField: "DISTRICT",
            filter: "contains",
            placeholder: "Select district...",
            change: function (event) {
                var selectedDistrictCode = this.value();
                if (selectedDistrictCode) {
                    loadCampus(selectedDistrictCode);
                }
                else {
                    campusData = [];
                }
            }
        });
    }

    function Init() {
        $scope.spinner = true;
        reportData.GetDistricts().then(function (response) {
            $scope.districts = response.data;
            $scope.districts.splice(0, 0, { DISTRICT: "All", DNAME: "All" });
            InitMultiSelectComponents();
            $scope.spinner = false;
        });
    }

    $scope.$on("$viewContentLoaded", function () {

        Init();

    });

}]);