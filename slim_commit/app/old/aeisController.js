angular.module('myApp').controller('aeisController', function ($scope, $timeout, allData, districtData, aeisData, mapper, lookup, JSONToCSV) {

    var aeisGrid = null;

    $scope.tables = [{ name: null, value: "Select Table" }];
    $scope.typeSource = ["Select Type", "Campus", "District"];
    $scope.enabled = true;

    var setControls = function (isEnabled) {
        $scope.typeList.enable(isEnabled);
        $scope.campList.enable(isEnabled);
        $scope.distList.enable(isEnabled);
        $scope.enabled = isEnabled;
    };

    $scope.campusOptions = {
        placeholder: "Select Campus...",
        dataTextField: "CAMPNAME",
        dataValueField: "CAMPUS",
        filter: "contains",
        dataSource: {
            data: []
        }
    };

    $scope.districtOptions = {
        placeholder: "Select District...",
        dataTextField: "DISTNAME",
        dataValueField: "DISTRICT",
        filter: "contains",
        dataSource: {
            data: []
        }
    };

    $scope.fieldOptions = {
        placeholder: "Select Field...",
        dataTextField: "value",
        dataValueField: "name",
        filter: "contains",
        dataSource: {
            data: []
        }
    };

    function ResetGridAndBuildQuery() {
        if (aeisGrid) {
            aeisGrid.destroy();
            $("#aeisGrid").empty();
            aeisGrid = null;
        }

        var aeisItems = _.map($scope.selectedType == 'Campus' ? $scope.selectedCampuses : $scope.selectedDistricts, function (item) { return "'" + item; });
        return { aeisItems: aeisItems, tableName: $scope.selectedTable.name, fields: $scope.selectedFields };
    };

    $scope.search = function () {
        if (!$scope.selectedTable.name) {
            return false;
        }
        setControls(false);
        var queryData = ResetGridAndBuildQuery();
        kendo.ui.progress($("#aeisGrid"), true);
        var delegate = $scope.enabled ? aeisData.getAeisTableData : aeisData.addAeisTableData;
        delegate(queryData.aeisItems, queryData.tableName, queryData.fields).then(function (results) {
            kendo.ui.progress($("#aeisGrid"), false);
            createGrid(results);
        });
    };

    $scope.reset = function () {
        setControls(true);
        aeisData.reset();
    };

    $scope.downloadExcel = function () {
        JSONToCSV($("#aeisGrid").data("kendoGrid").dataSource.data().toJSON(), "Aeis Data", true, mapper.aeisFields);
    };

    $scope.typeSelected = function (selectedType) {
        var tableEntry = _.findWhere(lookup.aeis, { name: selectedType });
        $scope.tables = [{ name: null, value: "Select Table" }];
        $scope.selectedTable = $scope.tables[0];
        if (tableEntry) {
            _.each(tableEntry.value, function (item) { $scope.tables.push(item); });
        }
    };

    $scope.tableSelected = function (selectedTable) {
        if (selectedTable.fields) {
            $timeout(function () { $scope.fieldOptions.dataSource.data = selectedTable.fields; $scope.selectedFields = []; }, 100);
        }
    };

    $scope.$on("$viewContentLoaded", function () {
        init();
    });

    function init() {
        allData.getData().success(function (data) {
            $timeout(function () { $scope.campusOptions.dataSource.data = data }, 100);
        });


        districtData.getData().success(function (data) {
            $timeout(function () { $scope.districtOptions.dataSource.data = data }, 100);
        });
    };


    function createGrid(data) {

        var theColumns = _.keys(data[0]);
        var columns = [];
        _.each(theColumns, function (i, x) {
            if (i != "Identity") {
                columns.push({ field: theColumns[x], width: "130px", title: mapper.aeisFields[theColumns[x]], headerAttributes: { style: "white-space: normal" } });
            }
        });

        $("#aeisGrid").kendoGrid({
            toolbar: [{
                template: '<a ng-click="downloadExcel()" ng-href="" class="k-button k-button-icontext k-grid-Download"><span class=" "></span>Download as Excel</a>'
            }],
            dataSource: new kendo.data.DataSource({ pageSize: 20, data: data }),
            height: 550,
            scrollable: true,
            sortable: true,
            filterable: true,
            pageable: {
                input: true,
                numeric: false
            },
            columns: columns
        });
        aeisGrid = $("#aeisGrid").data("kendoGrid");
    };

});