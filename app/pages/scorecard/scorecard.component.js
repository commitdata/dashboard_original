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
    var core_1;
    var ScorecardComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            ScorecardComponent = (function () {
                function ScorecardComponent() {
                    var _this = this;
                    this.info = 'Scorecard';
                    this.svgTemplateUrl = 'app/assets/images/page{imageId}.svg';
                    this.svgPath = this.svgTemplateUrl.replace("{imageId}", "2");
                    this.imageId = "2";
                    this.navOptions = [
                        { Id: 2, Name: "The Commit! Partnership" },
                        { Id: 3, Name: "Great Expectations…" },
                        { Id: 4, Name: "Dallas County" },
                        { Id: 5, Name: "Strong Foundation for Growth" },
                        { Id: 6, Name: "Why A Scorecard?", SubMenus: [{ Id: 6, Name: "Pipeline" }, { Id: 7, Name: "Pipeline, cont." }] },
                        { Id: 8, Name: "Community Scorecard" },
                        { Id: 9, Name: "Heading in a Positive Direction…" },
                        { Id: 10, Name: "Equity", SubMenus: [{ Id: 10, Name: "Race/Gender" }, { Id: 11, Name: "Income/Language" }] },
                        { Id: 12, Name: "Regional Alignment" },
                        { Id: 13, Name: "National Interest" },
                        { Id: 14, Name: "Partners using data" },
                        { Id: 15, Name: "Local Community Engagement" },
                        { Id: 16, Name: "School Readiness", SubMenus: [{ Id: 16, Name: "Data" }, { Id: 17, Name: "Highlighted Story" }] },
                        { Id: 18, Name: "Early Math and Literacy", SubMenus: [{ Id: 18, Name: "Data" }, { Id: 19, Name: "Highlighted Story" }] },
                        { Id: 20, Name: "College Access & Success", SubMenus: [{ Id: 20, Name: "Data" }, { Id: 21, Name: "Highlighted Story" }] },
                        { Id: 22, Name: "Higher Education-Workforce", SubMenus: [{ Id: 22, Name: "Data" }, { Id: 23, Name: "Highlighted Story" }] },
                        { Id: 24, Name: "Educator Pipelines", SubMenus: [{ Id: 24, Name: "Data" }, { Id: 25, Name: "Highlighted Story" }] },
                        { Id: 26, Name: "Our Partners", SubMenus: [{ Id: 26, Name: "Leadership Council Members" }, { Id: 27, Name: "Commit! Partners" }, { Id: 28, Name: "Philanthropic Investors" }] },
                        { Id: 29, Name: "Footnotes" },
                        { Id: 30, Name: "Thank you!" }
                    ];
                    this.spinner = false;
                    this.pageId = "2";
                    this.cardId = null;
                    this.currentNavOption = this.navOptions.find(function (x) { return x.Id == +_this.pageId; });
                    this.currentNavOption.active = true;
                    console.log(this.cardId);
                    if (this.cardId) {
                        this.currentSubMenuOption = this.currentNavOption.find(function (x) { return x.Id == +_this.cardId; });
                    }
                    /*this.onScorecardChange(this.pageId, this.cardId);*/
                }
                ScorecardComponent.prototype.onScorecardChange = function (navOptionId, subMenuId) {
                    this.imageId = (subMenuId == null || subMenuId == "") ? navOptionId : subMenuId;
                };
                ScorecardComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'app/pages/scorecard/scorecard.component.html'
                    }), 
                    __metadata('design:paramtypes', [])
                ], ScorecardComponent);
                return ScorecardComponent;
            }());
            exports_1("ScorecardComponent", ScorecardComponent);
        }
    }
});
//# sourceMappingURL=scorecard.component.js.map