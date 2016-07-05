System.register(['angular2/core', 'angular2/http', 'rxjs/Observable'], function(exports_1, context_1) {
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
    var core_1, http_1, Observable_1;
    var County, Proposal, DonorChooseObject, DonorChooseService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }],
        execute: function() {
            County = (function () {
                function County() {
                }
                return County;
            }());
            exports_1("County", County);
            Proposal = (function () {
                function Proposal() {
                }
                return Proposal;
            }());
            exports_1("Proposal", Proposal);
            DonorChooseObject = (function () {
                function DonorChooseObject() {
                }
                return DonorChooseObject;
            }());
            exports_1("DonorChooseObject", DonorChooseObject);
            DonorChooseService = (function () {
                function DonorChooseService(_http, _jsonp) {
                    this._http = _http;
                    this._jsonp = _jsonp;
                    this._donorChooseUrl = "http://api.donorschoose.org/common/json_feed.html?state=TX&Community={0}:1&APIKey=vmspm5ygamje&concise=true&description=true";
                }
                DonorChooseService.prototype.getDonorResult = function (donor) {
                    var url = this._donorChooseUrl.replace("{0}", donor);
                    return this._http.get(url)
                        .map(function (response) { return response.json(); })
                        .do(function (data) { return console.log('All: ' + JSON.stringify(data)); })
                        .catch(this.handleError);
                };
                DonorChooseService.prototype.getCountyOptions = function () {
                    return this._http.get("app/assets/data/donorsCounties.json")
                        .map(function (response) { return response.json(); })
                        .do(function (data) { return console.log('All: ' + JSON.stringify(data)); })
                        .catch(this.handleError);
                };
                DonorChooseService.prototype.handleError = function (error) {
                    console.error(error);
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                };
                DonorChooseService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, http_1.Jsonp])
                ], DonorChooseService);
                return DonorChooseService;
            }());
            exports_1("DonorChooseService", DonorChooseService);
        }
    }
});
//# sourceMappingURL=donorschoose.service.js.map