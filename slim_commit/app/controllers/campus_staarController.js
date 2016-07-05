angular.module('myApp').controller('campus_staarController', function ($scope, $timeout, sqlData, allData, districtData, lookup, mapper, JSONToCSV) {

    $scope.districtOptions = {
        placeholder: "Select District...",
        dataTextField: "DISTNAME",
        dataValueField: "DISTRICT",
        filter: "contains",
        dataSource: {
            data: []
        }
    };

    $scope.campusOptions = {
        placeholder: "Select Campus...",
        dataTextField: "CAMPNAME",
        dataValueField: "CAMPUS",
        filter: "contains",
        dataSource: {}
    };

    $timeout(function () { $scope.campusOptions.dataSource.data = [{ CAMPNAME: "Choose District First", CAMPUS: "Choose District First" }] }, 100);

    $scope.subjectOptions = {
        placeholder: "Select Subject...",
        dataTextField: "value",
        dataValueField: "name",
        filter: "contains",
        dataSource: {
            data: lookup.subjects
        }
    };

    $scope.gradeOptions = {
        placeholder: "Select Grade...",
        dataTextField: "value",
        dataValueField: "name",
        filter: "contains",
        dataSource: {
            data: lookup.grades
        }
    };

    $scope.demographyOptions = {
        placeholder: "Select Demography...",
        dataTextField: "value",
        dataValueField: "name",
        filter: "contains",
        dataSource: {
            data: lookup.demographies
        }
    };

    $scope.yearOptions = {
        placeholder: "Select Year...",
        dataTextField: "value",
        dataValueField: "name",
        filter: "contains",
        dataSource: {
            data: lookup.years
        }
    };

    districtData.getData().success(function (data) {
        $timeout(function () { $scope.districtOptions.dataSource.data = data }, 100);
    });


    allData.getData().success(function (data) {
        $scope.campusData = data;
        $timeout(function () { $scope.campusOptions.dataSource.data = data }, 100);
    });

    $scope.filters = {
        Campuses: [],
        Subjects: [],
        Grades: [],
        Demographies: [],
        Years: []
    };



    $scope.search = function () {
        var filters = {};
        filters.Campuses = [];
        _.each($scope.filters.Campuses, function (item) { filters.Campuses.push("'" + item.CAMPUS) });
        filters.Subjects = [];
        _.each($scope.filters.Subjects, function (item) { filters.Subjects.push(item.name) });
        filters.Grades = [];
        _.each($scope.filters.Grades, function (item) { filters.Grades.push(item.name) });
        filters.Demographies = [];
        _.each($scope.filters.Demographies, function (item) { filters.Demographies.push(item.name) });
        filters.Years = [];
        _.each($scope.filters.Years, function (item) { filters.Years.push(item.name) });
        kendo.ui.progress($(".k-grid-content", "#staarCampusGrid"), true);
        sqlData.getCampusStaarData(filters).then(function (response) {
            angular.forEach(response.data, function (value, index) {
                var filtered = _.findWhere($scope.campusData, { CAMPUS: value.Campus });
                value.Campus = filtered ? filtered.CAMPNAME : value.Campus;
                value.Category = mapper.categories[value.Category] || value.Category;
                value.Demo = mapper.demographies[value.Demo] || value.Demo;
                value.Subject = mapper.subjects[value.Subject] || value.Subject;
                filtered = _.findWhere(lookup.years, { name: value.Year });
                value.Year = filtered ? filtered.value : value.Year;
            });


            $scope.kGridOptions.dataSource = new kendo.data.DataSource({ pageSize: 20, data: response.data });
            kendo.ui.progress($(".k-grid-content", "#staarCampusGrid"), false);
        });

    };

    $scope.districtChanged = function () {
        var campuses = _.filter($scope.campusData, function (item) { return _.find($scope.filters.Districts, function (district) { return item.CAMPUS.substr(0, 6) == district.DISTRICT; }); });
        $scope.filters.Campuses = campuses;
    };


    $scope.kGridOptions = {
        toolbar: [{
            template: '<a ng-click="downloadExcel()" ng-href="" class="k-button k-button-icontext k-grid-Download"><span class=" "></span>Download as Excel</a>'
        }],
        height: 550,
        scrollable: true,
        sortable: true,
        filterable: true,
        pageable: {
            input: true,
            numeric: false
        },
        columns: [
            { field: "Campus", width: "200px" },
            { field: "Year", width: "130px" },
            { field: "Grade", width: "130px" },
            { field: "Language", width: "100px" },
            { field: "Category", width: "230px" },
            { field: "Subject", width: "130px" },
            { field: "Demo", width: "130px", title: "Demography" },
            { field: "all_tested", width: "130px" },
            { field: "satis_rec_nm", width: "130px" },
            { field: "satis_ph1_nm", width: "130px" },
            { field: "percent_ph1", width: "130px" },
            { field: "percent_rec", width: "130px" }
        ]
    };

    $scope.downloadExcel = function () {
        JSONToCSV($scope.kGridOptions.dataSource.data().toJSON(), "Staar Data", true);
    };


    $scope.$on('$viewContentLoaded', function () {
        //
    });

});