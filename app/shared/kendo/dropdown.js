/**
 * @module
 * @description
 * Kendo Dropdown Component
 */
System.register(['angular2/core'], function(exports_1, context_1) {
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
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1;
    var Dropdown;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            Dropdown = (function () {
                function Dropdown(elm) {
                    this.elm = elm;
                }
                Dropdown.prototype.ngOnInit = function () {
                    // Access on DOM; ONLY works with DOM rendering !!!!
                    $(this.elm.nativeElement).children().first().kendoDropDownList(this.dropdownOptions);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], Dropdown.prototype, "dropdownOptions", void 0);
                Dropdown = __decorate([
                    core_1.Component({
                        selector: 'k-dropdown',
                        template: '<div></div>'
                    }),
                    __param(0, core_1.Host()), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], Dropdown);
                return Dropdown;
            }());
            exports_1("Dropdown", Dropdown);
        }
    }
});
//# sourceMappingURL=dropdown.js.map