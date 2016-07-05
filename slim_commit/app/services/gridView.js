angular.module('myApp').factory('gridView', ['$rootScope', '$q', '$timeout', function ($rootScope, $q, $timeout) {


    return new function () {
        var self = this;

        this.getColumnName = function (name) {
            return name.replace(/[\s#()&/-]/g, '_');
        };

        this.createGrid = function (options) {

            /*
            options = {
                data : [], // Array of object
                selector : "#dataGrid", // grid div selector
                columnSelector : function(columnItem, kendoColumnItem, kendoColumns){}, 
                // Optional : selector function which returns kendo grid column config http://docs.telerik.com/kendo-ui/api/javascript/ui/grid#configuration-columns
                // Set kendoColumnItem.exclude = true to exclude that column from grid
                rowSelector : function (e) {
                    var row = this.select();
                    var gridData = $('#dataByZipCodeGrid').data("kendoGrid");
                    if (row && gridData) {
                        var selectedRowData = gridData.dataItem(row);
                        $scope.Lmap.panTo([selectedRowData.Latitude, selectedRowData.Longitude]);
                        $scope.Lmap.setZoom(14);
                    }
                }, // Optional row selector function
                exportFileName : "GridReportExport.xlsx", // Optional : Export file name
                dataSourceOptions : {}, // Kendo dataSource options
                columnOrder : [], // Order fo column fields
                modelFields : { 
                                ZipCode: { type: "number" },
                                Count: { type: "number" }
                              },  // Optional : Model schema fields http://docs.telerik.com/kendo-ui/api/javascript/data/model
            };
            */

            if (!options.data || !options.data.length) {
                return;
            }

            if ($(options.selector).data() && $(options.selector).data().kendoGrid) {
                $(options.selector).data().kendoGrid.destroy();
            }
            $(options.selector).empty();

            var dataColumns = _.keys(options.data[0]);

            var validColumns = _.map(dataColumns, function (i) {
                return self.getColumnName(i);
            });
            var validData = [];
            _.each(options.data, function (i) {
                var obj = {};
                _.each(dataColumns, function (key, index) {
                    if (i[key] == undefined) {
                        obj[validColumns[index]] = "";
                    } else {
                        obj[validColumns[index]] = i[key];
                    }
                });
                validData.push(obj);
            });

            var columns = [];

            _.each(dataColumns, function (item, index) {
                var columnItem = {
                    field: validColumns[index],
                    title: dataColumns[index],
                    headerAttributes: { style: "white-space: normal" }
                };
                if (options.columnSelector) {
                    options.columnSelector(item, columnItem, columns);
                }

                //if (item == "Value") {
                //    columnItem.format = "{0:n}";
                //    columnItem.attributes = { class: "align-right" };
                //}
                if (!columnItem.exclude) {
                    columns.push(columnItem);
                }

            });

            if (options.columnOrder) {
                _.each(options.columnOrder, function (item) {
                    var itemIndex = _.findIndex(columns, function (i) { return i.title == item; });
                    var removedItems = columns.splice(itemIndex, 1);
                    columns.push(removedItems[0]);
                });
            }

            $(options.selector).kendoGrid({
                toolbar: ["excel"],
                excel: {
                    allPages: true,
                    fileName: options.exportFileName || "GridExport.xlsx"

                },
                filterable: options.filterable,
                schema: {
                    model: {
                        fields: options.modelFields
                    }
                },
                dataSource: new kendo.data.DataSource(angular.extend({
                    data: validData,
                    //pageSize: 15,					
                    //pageSize: 10,
                }, options.dataSourceOptions)),
                dataBound: function (e) {
                    $("tr", options.selector).attr("tabindex", 0);
                },
                //pageable: {
                //    input: true,
                //    numeric: false
                //},
                resizable: true,
                scrollable: false,
                sortable: options.sortable,
                selectable: 'row',
                change: options.rowSelector,
                columns: columns
            });
        };
    };

}]);