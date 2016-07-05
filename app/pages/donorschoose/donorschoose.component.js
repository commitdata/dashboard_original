System.register(['angular2/core', '../donorschoose/donorschoose.service', 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, donorschoose_service_1, router_1;
    var DonorsChooseComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (donorschoose_service_1_1) {
                donorschoose_service_1 = donorschoose_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            DonorsChooseComponent = (function () {
                function DonorsChooseComponent(_donorService, element, _params, _router) {
                    this._donorService = _donorService;
                    this.element = element;
                    this._params = _params;
                    this._router = _router;
                    this.info = "Donors Choose";
                    this.spinner = false;
                    this.numberOfProjects = 242;
                    this.amountNeeded = 2523.23;
                    this.NuDistricts = 352;
                    this.NuSchools = 23;
                    this.selectedCounty = new donorschoose_service_1.County();
                    this.selectedCounty.CountyID = "331";
                }
                DonorsChooseComponent.prototype.ngOnInit = function () {
                    this.spinner = false;
                    var countyId = this._params.get("id");
                    if (countyId) {
                        this.selectedCounty.CountyID = countyId;
                    }
                    this.fillGrid(this.selectedCounty.CountyID);
                    this.fillCountyOtpions();
                };
                DonorsChooseComponent.prototype.downloadExcel = function () {
                    var fields = ['School', 'Title', 'Cost to Complete', 'City', 'Link'];
                    this.json2Csv(this.projects, "County-Data", fields);
                };
                DonorsChooseComponent.prototype.json2Csv = function (data, title, fields) {
                    debugger;
                    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
                    var arrData = typeof data != 'object' ? JSON.parse(data) : data;
                    var CSV = '';
                    var row = "";
                    //create top fields row
                    for (var field in fields) {
                        row += field + ',';
                    }
                    row = row.slice(0, -1);
                    //append Label row with line break
                    CSV += row + '\r\n';
                    //1st loop is to extract each row
                    for (var i = 0; i < arrData.length; i++) {
                        var row = "";
                        //2nd loop will extract each column and convert it in string comma-seprated
                        for (var index in arrData[i]) {
                            row += '"' + arrData[i][index] + '",';
                        }
                        row.slice(0, row.length - 1);
                        //add a line break after each row
                        CSV += row + '\r\n';
                    }
                    if (CSV == '') {
                        alert("Invalid data");
                        return;
                    }
                    //Generate a file name
                    var fileName = "Report_";
                    //this will remove the blank-spaces from the title and replace it with an underscore
                    fileName += title.replace(/ /g, "_");
                    //Initialize file format you want csv or xls
                    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
                    // Now the little tricky part.
                    // you can use either>> window.open(uri);
                    // but this will not work in some browsers
                    // or you will not get the correct file extension    
                    //this trick will generate a temp <a /> tag
                    var link = document.createElement("a");
                    link.href = uri;
                    //set the visibility hidden so it will not effect on your web-layout
                    link.setAttribute("target", "_blank");
                    link.setAttribute("style", "visibility:hidden");
                    link.setAttribute("href", fileName + ".csv");
                    //this part will append the anchor tag and remove it after automatic click
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                };
                DonorsChooseComponent.prototype.createGrid = function () {
                    var grid = document.getElementById("grid");
                    //this.options =
                    $(grid).kendoGrid({
                        dataSource: {
                            data: this.projects,
                            schema: {
                                model: {
                                    fields: {
                                        schoolName: { type: "string" },
                                        title: { type: "string" },
                                        costToComplete: { type: "number" },
                                        city: { type: "string" }
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
                            { field: "schoolName", title: "School", width: "130px", encoded: false },
                            { field: "title", title: "Title", format: "{0:c}", width: "250px", encoded: false },
                            { field: "costToComplete", title: "Cost to Complete", width: "130px" },
                            { field: "city", title: "City", width: "130px" },
                            { field: "proposalURL", title: "Link", width: "130px", template: "<a href='#= proposalURL#' target='_blank'>link</a>" } //, 
                        ]
                    });
                };
                DonorsChooseComponent.prototype.loadMap = function () {
                    var container = document.getElementById("mapContainer");
                    container.innerHTML = "";
                    var mapDiv = $("<div></div>").attr("id", "map-canvas-dc").height(548).css('border', '2px solid orange');
                    mapDiv.appendTo("#mapContainer");
                    var map = L.map('map-canvas-dc').setView([32.795903, -96.795903], 10);
                    L.tileLayer('http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png', {
                        attribution: '&copy; <a href="http://www.opencyclemap.org">OpenCycleMap</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    }).addTo(map);
                };
                DonorsChooseComponent.prototype.fillGrid = function (county) {
                    var _this = this;
                    this._donorService.getDonorResult(county)
                        .subscribe(function (data) {
                        _this.donorChooseObj = data;
                        _this.projects = data.proposals;
                        var temp = 0;
                        var districts = [];
                        var schools = [];
                        for (var _i = 0, _a = _this.projects; _i < _a.length; _i++) {
                            var project = _a[_i];
                            temp += +project.costToComplete;
                            if (districts.indexOf(project.city) == -1) {
                                districts.push(project.city);
                            }
                            if (schools.indexOf(project.schoolName) == -1) {
                                schools.push(project.schoolName);
                            }
                        }
                        _this.numberOfProjects = _this.projects.length;
                        _this.NuDistricts = districts.length;
                        _this.NuSchools = schools.length;
                        _this.amountNeeded = temp;
                        _this.createGrid();
                        _this.loadMap();
                    }, function (err) { return console.error(err); }, function () { return console.log('done'); });
                };
                DonorsChooseComponent.prototype.changeCounty = function (county) {
                    debugger;
                    console.log(county);
                    this.selectedCounty.CountyID = county;
                    //TODO
                    if (this.selectedCounty.CountyID) {
                        this._router.navigate(['/DonorsChoose', { id: this.selectedCounty.CountyID }]);
                    }
                };
                DonorsChooseComponent.prototype.fillCountyOtpions = function () {
                    var _this = this;
                    this._donorService.getCountyOptions()
                        .subscribe(function (x) { return _this.counties = x; });
                };
                DonorsChooseComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'app/pages/donorschoose/donorschoose.component.html',
                        providers: [donorschoose_service_1.County, donorschoose_service_1.DonorChooseService],
                    }), 
                    __metadata('design:paramtypes', [donorschoose_service_1.DonorChooseService, core_1.ElementRef, router_1.RouteParams, router_1.Router])
                ], DonorsChooseComponent);
                return DonorsChooseComponent;
            }());
            exports_1("DonorsChooseComponent", DonorsChooseComponent);
        }
    }
});
//# sourceMappingURL=donorschoose.component.js.map