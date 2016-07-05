angular.module('myApp').controller('aeis_explanationController', ['$scope', '$http', '$timeout', 'districtData', 'aeisData', 'mapper', 'lookup', 'JSONToCSV', function ($scope, $http, $timeout, districtData, aeisData, mapper, lookup, JSONToCSV) {

    $scope.dic = [];
    $scope.tables = [{ value: null, name: "Select Table" }];
    $scope.years = [{ name: "Select Year", year: null }, { name: "1999", year: "1999" }, { name: "2000", year: "2000" }, { name: "2001", year: "2001" },
                    { name: "2002", year: "2002" }, { name: "2003", year: "2003" }, { name: "2004", year: "2004" },
                    { name: "2005", year: "2005" }, { name: "2006", year: "2006" }, { name: "2007", year: "2007" },
                    { name: "2008", year: "2008" }, { name: "2009", year: "2009" }, { name: "2010", year: "2010" },
                    { name: "2011", year: "2011" }, { name: "2012", year: "2012" }, { name: "2013", year: "2013" },
                    { name: "2014", year: "2014" }];

    var tableMap = {
        cothr: "Campus AP/IB, Annual Dropout, Attendance, Advanced Courses, Higher Education (IHE)",
        dothr: "District AP/IB, Annual Dropout, Attendance, Advanced Courses, Higher Education (IHE)"
    };

    $scope.selectedTable = null;
    $scope.selectedYear = null;
    createPie();


    $scope.changeyear = function (selectedYear) {
        console.log(selectedYear);
        console.log(null);
        if (!selectedYear || !selectedYear.year) return;
        $("#dictionaryGrid").html("");

        $http({ url: '/api/dictionary/ListTables', method: 'GET', params: { year: selectedYear.year } }).then(function (response) {
            $scope.tables = [{ value: null, name: "Select Table" }];
            _.each(response.data, function (i) {
                $scope.tables.push({ value: i, name: tableMap[i] || i });
            });
            $scope.selectedTable = null;
        });
    };

    $scope.changeTable = function () {
        kendo.ui.progress($("#dictionaryGrid"), true);
        console.log($scope.selectedTable);
        if (!$scope.selectedTable.value || !$scope.selectedYear.year) {
            return;
        }


        $.ajax({
            url: '/api/dictionary/get?selectedTable=' + $scope.selectedTable.value + "&selectedYear=" + $scope.selectedYear.year,
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
                            TABLE: { type: "string", parse: function (i) { return tableMap[i] || i; } },
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



    function createPie() {
        $("#pie").kendoChart({
            legend: {
                visible: true,
                position: 'bottom'
            },
            chartArea: {
                background: ""
            },
            seriesDefaults: {
                labels: {
                    visible: false,
                    background: "transparent",
                    template: "#= category #: \n #= value#%"
                }
            },
            series: [{
                type: "pie",
                startAngle: 150,
                data: [{
                    category: "African American",
                    value: 12.7,
                    color: "#003662"
                }, {
                    category: "Hispanic",
                    value: 51.8,
                    color: "#c3151c"
                }, {
                    category: "White",
                    value: 29.4,
                    color: "#fbb613"
                }, {
                    category: "Other",
                    value: 5.1,
                    color: "#91c63d"
                }]
            }],
            tooltip: {
                visible: true,
                color: 'white',
                template: "#= category #: \n #= value#%"
            }
        });
    }


}]);