angular.module('myApp').controller('dictionaryController', function ($scope) {

    $scope.hello = "world";
    $scope.dic = [];
    $scope.tables =[];
    $scope.years = ["1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014"];
    $scope.selectedTable;
    $scope.selectedYear;

    //init();

    //$.ajax({
    //    url: '/api/dictionary/GetAll',
    //    success: function (data) {
    //        console.log("data");
    //        console.log(data);

    //        $scope.dic = data;
    //        createGrid();
    //    }
    //});


    //function init() {

    //    /* Bind years from the table*/
    //    $.ajax({
    //        url: '/api/dictionary/listyears',
    //        success: function (data) {
    //            $scope.years = data;
    //        }
    //    });
    //    /*  End Year Binding*/
        
    //};


    //$.ajax({
    //    url: '/api/dictionary/get?selectedTable=Student',
    //    success: function (data) {
    //        console.log("data");
    //        console.log(data);

    //        $scope.dic = data;
    //        createGrid();
    //    }
    //});

    $scope.changeyear = function () {
        $scope.tables = [];
        $("#dictionaryGrid").html("");

        $.ajax({
            url: '/api/dictionary/ListTables?year=' + $scope.selectedYear,
            success: function (data) {
                
                console.log(data);
                $scope.tables = data;
                //$scope.changeTable();
                $scope.$apply();
                
            }
        });
    };

    $scope.changeTable = function () {
        kendo.ui.progress($("#dictionaryGrid"), true);
        var selectedtable=null;
        var selectedyear=null;
        if ($scope.selectedTable != null) {
            selectedtable = $scope.selectedTable;
        }
        if ($scope.selectedYear!=null) {
            selectedyear = $scope.selectedYear;
        }
        

        $.ajax({
            url: '/api/dictionary/get?selectedTable=' + selectedtable + "&selectedYear=" + selectedyear,
            success: function (data) {
                kendo.ui.progress($("#dictionaryGrid"), false);
                $scope.dic = data;
                createGrid();
            }
        });

    };

    function createGrid() {

        $("#dictionaryGrid").kendoGrid({
            dataSource: {
                data: $scope.dic,
                schema: {
                    model: {
                        fields: {
                            YEAR: { type: "string" },
                            TABLE: { type: "string" },
                            VARIABLE: { type: "string" },
                            DESCRIPTION: { type: "string" }
                        }
                    }
                }
                //pageSize: 20
            },
            //height: 550,
            scrollable: true,
            sortable: true,
            filterable: true,
            pageable: {
                input: true,
                numeric: false
            },
            columns: [
                { field: "YEAR", title: "Year", width: "10%" },
                { field: "TABLE", title: "Table", format: "{0:c}", width: "15%" },
                { field: "VARIABLE", title: "Variable", width: "20" },
                { field: "DESCRIPTION", title: "Description", width: "55%" }
            ]
        });
    }

});