angular.module('myApp').controller('aeis_currentController', function ($scope, aeisData, lookup) {

    var aeisGrid = null;

    $scope.tables = [{ name: null, value: "Select Table" }];
    $scope.typeSource = ["Select Type", "Campus", "District"];

    $scope.tableSelected = function (selectedTable) {
        if (selectedTable) {
            loadGrid(selectedTable);
        }
    };

    $scope.typeSelected = function (selectedType) {
        var tableEntry = _.findWhere(lookup.aeis, { name: selectedType });
        $scope.tables = [{ name: null, value: "Select Table" }];
        if (tableEntry) {
            _.each(tableEntry.value, function (item) { $scope.tables.push(item); });
        }
    };


    function loadGrid(tableName) {
        if (aeisGrid) {
            aeisGrid.destroy();
            $("#aeisGrid").empty();
        }
        kendo.ui.progress($("#aeisGrid"), true);
        aeisData.getTableData(tableName).then(function (results) {
            var theColumns = _.keys(results[0]);
            var columns = [];
            _.each(theColumns, function (i, x) {
                columns.push({ 'field': theColumns[x], 'width': 100 });
            });
            kendo.ui.progress($("#aeisGrid"), false);
            createGrid(columns, results);
        });

    };



    function createGrid(columns, data) {
        $("#aeisGrid").kendoGrid({
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