angular.module('myApp').controller('district_selectController', function ($scope, $timeout, $filter, sqlData, districtData, mapper, JSONToCSV) {

    $scope.districts = [];
    $scope.longDistricts = [];
    $scope.fields = mapper.fields;
    $scope.districtOptions = {
        placeholder: "Select district...",
        dataTextField: "DISTNAME",
        valuePrimitive: true,
        filter: "contains",
        autoBind: false,
        dataSource: {
            data: []
        }
    };

    $scope.longDistrictOptions = {
        placeholder: "Select district...",
        dataTextField: "DISTNAME",
        valuePrimitive: true,
        filter: "contains",
        autoBind: false,
        dataSource: {
            data: []
        }
    };


    

    function districtColumns() {
        var distFields = ["DISTNAME", "CNTYNAME", "DPST00FP", "DPST01FP", "DPST06FP", "DPST11FP", "DPST20FP", "DB0CT13R", "DA0CT13R", "DH0CT13R", "DW0CT13R", "DB0CC13R", "DA0CC13R", "DH0CC13R", "DW0CC13R", "DB0CSA13R ", "DA0CSA13R ", "DH0CSA13R ", "DW0CSA13R ", "DB0CAA13R ", "DA0CAA13R ", "DH0CAA13R ", "DW0CAA13R ", "a1_EOC_ph1", "bi_EOC_ph1", "e1_EOC_ph1", "e2_EOC_ph1", "h8_ph1", "m3_ph1", "m4_ph1", "m5_ph1", "m6_ph1", "m7_ph1", "m8_ph1", "r3_ph1", "r4_ph1", "r5_ph1", "r6_ph1", "r7_ph1", "r8_ph1", "s5_ph1", "s8_ph1", "us_EOC_ph1", "w4_ph1", "w7_ph1", "a1_EOC_rec", "bi_EOC_rec", "e1_EOC_rec", "e2_EOC_rec", "h8_rec", "m3_rec", "m4_rec", "m5_rec", "m6_rec", "m7_rec", "m8_rec", "r3_rec", "r4_rec", "r5_rec", "r6_rec", "r7_rec", "r8_rec", "s5_rec", "s8_rec", "us_EOC_rec", "w4_rec", "w7_rec", "DB00A001S14R", "DA00A001S14R", "DL00A001S14R", "DE00A001S14R", "DH00A001S14R", "DW00A001S14R", "DB00AR01S14R", "DA00AR01S14R", "DL00AR01S14R", "DE00AR01S14R", "DH00AR01S14R", "DW00AR01S14R", "DB00AM01S14R", "DA00AM01S14R", "DL00AM01S14R", "DE00AM01S14R", "DH00AM01S14R", "DW00AM01S14R", "DB00AC01S14R", "DA00AC01S14R", "DL00AC01S14R", "DE00AC01S14R", "DH00AC01S14R", "DW00AC01S14R", "DB00A004214R", "DA00A004214R", "DL00A004214R", "DE00A004214R", "DH00A004214R", "DW00A004214R", "DB00AR04214R", "DA00AR04214R", "DL00AR04214R", "DE00AR04214R", "DH00AR04214R", "DW00AR04214R", "DB00AM04214R", "DA00AM04214R", "DL00AM04214R", "DE00AM04214R", "DH00AM04214R", "DW00AM04214R", "DB00AC04214R", "DA00AC04214R", "DL00AC04214R", "DE00AC04214R", "DH00AC04214R", "DW00AC04214R", "DPSTKIDR", "DPSTEXPA", "DPSTTOSA", "DB0GR13N", "DB0GR13R", "DA0GR13N", "DA0GR13R", "DH0GR13N", "DH0GR13R", "DW0GR13N", "DW0GR13R", "DA0GM13R", "DPETALLC", "DPETHISP", "DPETWHIP", "DPETBLAP", "DPETECOP", "DPETLEPP", "DPEMALLP"];
        return _.map(distFields, function (item) { return { field: item, width: "130px", title: $scope.fields[item] || item, headerAttributes: { style: "white-space: normal" } }; });
    }

    $scope.kGridOptions = {
        toolbar: [{
            template: '<a ng-click="downloadDistrictExcel()" ng-href="" class="k-button k-button-icontext k-grid-Download"><span class=" "></span>Download as Excel</a>'
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
        columns: districtColumns()
    };


    function longColumns() {
        var longFields = ["DISTNAME", "CNTYNAME", "YEAR", "DPST00FP", "DPST01FP", "DPST06FP", "DPST11FP", "DPST20FP", "DBGC4_R", "DAGC4_R", "DHGC4_R", "DEGC4_R", "DLGC4_R", "DWGC4_R", "DA0CA_R", "DA0CS_R", "DA0CC_R", "DA0CT_R", "DPETALLC", "DPETECOP", "DPETLEPP", "DPETHISP", "DPETWHIP", "DPETBLAP", "DPSTTOSA", "DPSTEXPA", "DPSTKIDR"];
        return _.map(longFields, function (item) { return { field: item, width: "130px", title: $scope.fields[item] || item, headerAttributes: { style: "white-space: normal" } }; });
    }

    $scope.kLongGridOptions = {
        toolbar: [{
            template: '<a ng-click="downloadLongExcel()" ng-href="" class="k-button k-button-icontext k-grid-Download"><span class=" "></span>Download as Excel</a>'
        }],
        height: 550,
        scrollable: true,
        sortable: true,
        filterable: true,
        pageable: {
            input: true,
            numeric: false
        },
        columns: longColumns()
    };


    $scope.downloadDistrictExcel = function () {
        JSONToCSV($scope.selectedDistricts, "District Data", true, $scope.fields);
    };



    $scope.downloadLongExcel = function () {
        JSONToCSV($scope.selectedData, "District Longitudinal Data", true, $scope.fields);
    };





    $scope.average = function (field, source) {
        var list = source || [];
        var sum = 0; for (var i = 0; i < list.length; i++) {
            sum += list[i][field]; //don't forget to add the base 
        }
        var avg = sum / list.length || 0;
        return avg.toFixed(2);
    };

    $scope.sum = function (field, source) {
        var list = source || [];
        var sum = 0; for (var i = 0; i < list.length; i++) {
            sum += parseFloat(list[i][field], 10); //don't forget to add the base 
        }
        return sum;
    };

    function init() {
        districtData.getData().success(function (data) {
            $scope.districts = data;
            $scope.longDistricts = $filter("filter")(data, { CNTYNAME: "DALLAS" });
            $timeout(function () { $scope.districtOptions.dataSource.data = $scope.districts }, 100);
        });

        sqlData.getDistrictLong().then(function (results) {
            $scope.longData = results;
            $timeout(function () { $scope.longDistrictOptions.dataSource.data = $scope.longDistricts }, 100);
        });

    };



    $scope.onSelectionChange = function () {
        $scope.selectedData = _.filter($scope.longData, function (item) {
            var districtValue = item.DISTRICT.substr(1);
            return $filter("filter")($scope.selectedLongDistricts, { DISTRICT: districtValue }).length > 0;
        });
        $scope.kLongGridOptions.dataSource = new kendo.data.DataSource({ pageSize: 20, data: $scope.selectedData });
    };


    $scope.$on("$viewContentLoaded", function () {
        init();
    });

});