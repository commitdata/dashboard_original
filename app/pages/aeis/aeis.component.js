System.register(['angular2/core', '../../shared/kendo/kchart', '../../shared/kendo/grid', './aeis.service', '../../shared/select.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, kchart_1, grid_1, aeis_service_1, select_component_1;
    var AeisComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (kchart_1_1) {
                kchart_1 = kchart_1_1;
            },
            function (grid_1_1) {
                grid_1 = grid_1_1;
            },
            function (aeis_service_1_1) {
                aeis_service_1 = aeis_service_1_1;
            },
            function (select_component_1_1) {
                select_component_1 = select_component_1_1;
            }],
        execute: function() {
            AeisComponent = (function () {
                function AeisComponent(_aeisService) {
                    this._aeisService = _aeisService;
                    this.info = "Commit";
                    this.baseApiUrl = "http://commitstaging.azurewebsites.net/";
                    this.years = [
                        new select_component_1.SelectListItem(null, "Select Year"),
                        new select_component_1.SelectListItem("1999", "1999"),
                        new select_component_1.SelectListItem("2000", "2000"),
                        new select_component_1.SelectListItem("2001", "2001"),
                        new select_component_1.SelectListItem("2002", "2002"),
                        new select_component_1.SelectListItem("2003", "2003"),
                        new select_component_1.SelectListItem("2004", "2004"),
                        new select_component_1.SelectListItem("2005", "2005"),
                        new select_component_1.SelectListItem("2006", "2006"),
                        new select_component_1.SelectListItem("2007", "2007"),
                        new select_component_1.SelectListItem("2008", "2008"),
                        new select_component_1.SelectListItem("2009", "2009"),
                        new select_component_1.SelectListItem("2010", "2010"),
                        new select_component_1.SelectListItem("2011", "2011"),
                        new select_component_1.SelectListItem("2012", "2012"),
                        new select_component_1.SelectListItem("2013", "2013"),
                        new select_component_1.SelectListItem("2014", "2014")];
                    this.tableMap = {
                        cothr: "Campus AP/IB, Annual Dropout, Attendance, Advanced Courses, Higher Education (IHE)",
                        dothr: "District AP/IB, Annual Dropout, Attendance, Advanced Courses, Higher Education (IHE)"
                    };
                    this.selectedTable = null;
                    this.selectedYear = null;
                    this.setUpChartOptions();
                    this.listTableUrl = this.baseApiUrl + "api/dictionary/ListTables?year={year}";
                    this.selectedTableUrl = this.baseApiUrl + "api/dictionary/Get?selectedTable={selectedTable}&selectedYear={selectedYear}";
                }
                AeisComponent.prototype.changeYear = function (selectedValue) {
                    var _this = this;
                    debugger;
                    this.selectedYear = selectedValue;
                    if (!this.selectedYear || this.selectedYear == "")
                        return;
                    var url;
                    url = this.listTableUrl.replace("{year}", this.selectedYear);
                    console.log(url);
                    this._aeisService.getTablesByYear(url)
                        .subscribe(function (item) { return _this.onArrayAdded(item); });
                    this.selectedTable = null;
                };
                ;
                AeisComponent.prototype.onArrayAdded = function (items) {
                    this.tables = [];
                    this.tables.push(new select_component_1.SelectListItem("", "Select Table"));
                    for (var n = 1; n <= items.length; n++) {
                        this.tables.push(new select_component_1.SelectListItem(items[n], items[n]));
                    }
                };
                AeisComponent.prototype.changeTable = function (selectedTable) {
                    var _this = this;
                    if (!selectedTable || !selectedTable)
                        return;
                    var url;
                    url = this.selectedTableUrl.replace("{selectedTable}", selectedTable).replace("{selectedYear}", this.selectedYear);
                    console.log(url);
                    this._aeisService.getDictionaryByTable(url)
                        .subscribe(function (item) { return _this.onDictionaryAdded(item); });
                };
                ;
                AeisComponent.prototype.onDictionaryAdded = function (items) {
                    debugger;
                    this.dic = items;
                    this.createGrid();
                };
                AeisComponent.prototype.setUpChartOptions = function () {
                    this.chartOptions = {
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
                    };
                };
                AeisComponent.prototype.createGrid = function () {
                    var grid = document.getElementById("dictionaryGrid");
                    console.log(grid);
                    $(grid).kendoGrid({
                        dataSource: {
                            data: this.dic,
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
                };
                AeisComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'app/pages/aeis/aeis.component.html',
                        directives: [grid_1.Grid, kchart_1.Kchart],
                        providers: [aeis_service_1.AeisService]
                    }), 
                    __metadata('design:paramtypes', [aeis_service_1.AeisService])
                ], AeisComponent);
                return AeisComponent;
            }());
            exports_1("AeisComponent", AeisComponent);
        }
    }
});
//# sourceMappingURL=aeis.component.js.map