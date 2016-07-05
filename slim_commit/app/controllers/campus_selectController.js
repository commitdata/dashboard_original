angular.module('myApp').controller('campus_selectController', function ($scope, $timeout, allData, JSONToCSV) {

    $scope.schools = [];
    $scope.schoolOptions = {
        placeholder: "Select school...",
        dataTextField: "CAMPNAME",
        valuePrimitive: true,
        autoBind: false,
        filter : "contains",
        dataSource: {
            data: []
        }
    };

    $scope.kGridOptions = {
        toolbar: [{
            template: '<a ng-click="downloadExcel()" ng-href="" class="k-button k-button-icontext k-grid-Download"><span class=" "></span>Download as Excel</a>'
        }],
        dataSource: {
            pageSize: 20
        },
        height: 550,
        scrollable: true,
        sortable: true,
        filterable: true,
        pageable: {
            input: true,
            numeric: false
        },
        columns: [
            { field: "CAMPUS", width: "130px" },
            { field: "COUNTY", width: "130px" },
            { field: "CAMPNAME", width: "130px", title: "Unit Price", format: "{0:c}" },
            { field: "GRDTYPE", width: "100px" },
            { field: "LATITUDE", width: "130px" },
            { field: "LONGITUDE", width: "130px" },
            { field: "m3", width: "130px" },
            { field: "m4", width: "130px" },
            { field: "m5", width: "130px" },
            { field: "r3", width: "130px" },
            { field: "r4", width: "130px" },
            { field: "r5", width: "130px" },
            { field: "s5", width: "130px" },
            { field: "w4", width: "130px" },
            { field: "CPST00FP", width: "130px" },
            { field: "CPST01FP", width: "130px" },
            { field: "CPST06FP", width: "130px" },
            { field: "CPST11FP", width: "130px" },
            { field: "CPST20FP", width: "130px" },
            { field: "CPCTGKGA", width: "130px" },
            { field: "CPCTG01A", width: "130px" },
            { field: "CPCTG02A", width: "130px" },
            { field: "CPCTG03A", width: "130px" },
            { field: "CPCTG04A", width: "130px" },
            { field: "CPCTG05A", width: "130px" },
            { field: "CPSTTOSA", width: "130px" },
            { field: "CPSTTOFC", width: "130px" },
            { field: "CPERRA1R", width: "130px" },
            { field: "CPERRA2R", width: "130px" },
            { field: "CPERRA3R", width: "130px" },
            { field: "CPERRA4R", width: "130px" },
            { field: "CPERRA5R", width: "130px" },
            { field: "CPETGPKC", width: "130px" },
            { field: "CPETGKNC", width: "130px" },
            { field: "CPETG01C", width: "130px" },
            { field: "CPETG02C", width: "130px" },
            { field: "CPETG03C", width: "130px" },
            { field: "CPETG04C", width: "130px" },
            { field: "CPETG05C", width: "130px" },
            { field: "CPETALLC", width: "130px" },
            { field: "CPEMALLP", width: "130px" },
            { field: "CPETHISP", width: "130px" },
            { field: "CPETBLAP", width: "130px" },
            { field: "CPETWHIP", width: "130px", title: "Units In Stock", width: "130px" },
            { field: "CPETECOP", width: "130px" },
            { field: "CPETLEPP", width: "130px" }


        ]
    };

    $scope.downloadExcel = function () {
        JSONToCSV($scope.selectedSchools, "Campus Data", true);
    };

    $scope.average = function (field) {
        var list = $scope.selectedSchools || [];
        var sum = 0; for (var i = 0; i < list.length; i++) {
            sum += list[i][field]; //don't forget to add the base 
        }
        var avg = sum / list.length || 0;
        return avg.toFixed(2);
    };

    $scope.sum = function (field) {
        var list = $scope.selectedSchools || [];
        var sum = 0; for (var i = 0; i < list.length; i++) {
            sum += parseFloat(list[i][field], 10); //don't forget to add the base 
        }
        return sum;
    };

    function init() {
        allData.getData().success(function (data) {
            $scope.schools = data;
            $timeout(function () { $scope.schoolOptions.dataSource.data = $scope.schools }, 100);
        });
    };

    $scope.$on("$viewContentLoaded", function () {
        init();
    });
});