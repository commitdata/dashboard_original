System.register(['angular2/core', '../../shared/kendo/kchart'], function(exports_1, context_1) {
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
    var core_1, kchart_1;
    var StaarComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (kchart_1_1) {
                kchart_1 = kchart_1_1;
            }],
        execute: function() {
            StaarComponent = (function () {
                function StaarComponent() {
                    this.info = "Staar";
                    this.demoGraphicGroups = [
                        {
                            "variable": "all",
                            "description": "All Students"
                        },
                        {
                            "variable": "sexm",
                            "description": "Male Students"
                        },
                        {
                            "variable": "sexf",
                            "description": "Female Students"
                        },
                        {
                            "variable": "sexv",
                            "description": "No Sex Info"
                        },
                        {
                            "variable": "ethh",
                            "description": "Hispanic/Latino"
                        },
                        {
                            "variable": "ethi",
                            "description": "American Indian/Alaskan Native"
                        },
                        {
                            "variable": "etha",
                            "description": "Asian"
                        },
                        {
                            "variable": "ethb",
                            "description": "Black/African American"
                        },
                        {
                            "variable": "ethp",
                            "description": "Native Hawaiian/ Pacific Islander"
                        },
                        {
                            "variable": "ethw",
                            "description": "White"
                        },
                        {
                            "variable": "eth2",
                            "description": "Two or More Races"
                        },
                        {
                            "variable": "ethv",
                            "description": "No Ethnicity Info"
                        },
                        {
                            "variable": "ecoy",
                            "description": "Economically Disadvantaged"
                        },
                        {
                            "variable": "econ",
                            "description": "Not Economically Disadvantaged"
                        },
                        {
                            "variable": "eco1",
                            "description": "Free Meals"
                        },
                        {
                            "variable": "eco2",
                            "description": "Reduced-Price Meals"
                        },
                        {
                            "variable": "eco9",
                            "description": "Other Economically Disadvantaged"
                        },
                        {
                            "variable": "ecov",
                            "description": "No Info Economically"
                        },
                        {
                            "variable": "ti1y",
                            "description": "Title-1 Participant"
                        },
                        {
                            "variable": "ti1n",
                            "description": "Not Title-1 Participant"
                        },
                        {
                            "variable": "ti10",
                            "description": "Nonparticipant"
                        },
                        {
                            "variable": "ti16",
                            "description": "Schoolwide Program Participant"
                        },
                        {
                            "variable": "ti17",
                            "description": "Targeted Assistance Participant"
                        },
                        {
                            "variable": "ti18",
                            "description": "Nonparticipant"
                        },
                        {
                            "variable": "ti19",
                            "description": "Homeless Participant at Non-Title-1 Schools"
                        },
                        {
                            "variable": "ti1v",
                            "description": "No Title"
                        },
                        {
                            "variable": "migy",
                            "description": "Migrant Student"
                        },
                        {
                            "variable": "mign",
                            "description": "Not Migrant Student"
                        },
                        {
                            "variable": "migv",
                            "description": "No Migrant Info"
                        },
                        {
                            "variable": "lepc",
                            "description": "Current LEP"
                        },
                        {
                            "variable": "lepf",
                            "description": "First Year Monitored"
                        },
                        {
                            "variable": "leps",
                            "description": "Second Year Monitored"
                        },
                        {
                            "variable": "lep0",
                            "description": "Other Non-LEP"
                        },
                        {
                            "variable": "lepv",
                            "description": "No LEP"
                        },
                        {
                            "variable": "bily",
                            "description": "Bilingual"
                        },
                        {
                            "variable": "biln",
                            "description": "Not Bilingual"
                        },
                        {
                            "variable": "bil2",
                            "description": "Transitional Bilingual/ Early Exit"
                        },
                        {
                            "variable": "bil3",
                            "description": "Transitional Bilingual/ Late Exit"
                        },
                        {
                            "variable": "bil4",
                            "description": "Dual Language Immersion/ Two Way"
                        },
                        {
                            "variable": "bil5",
                            "description": "Dual Language Immersion/ One Way"
                        },
                        {
                            "variable": "bilv",
                            "description": "No Info Bilingual"
                        },
                        {
                            "variable": "esly",
                            "description": "ESL"
                        },
                        {
                            "variable": "esln",
                            "description": "Not ESL"
                        },
                        {
                            "variable": "esl2",
                            "description": "ESL/ Content based"
                        },
                        {
                            "variable": "esl3",
                            "description": "ESL/ Pull-out"
                        },
                        {
                            "variable": "eslv",
                            "description": "No Info ESL"
                        },
                        {
                            "variable": "esbiy",
                            "description": "Either Bilingual or ESL"
                        },
                        {
                            "variable": "esbin",
                            "description": "Neither Bilingual nor ESL"
                        },
                        {
                            "variable": "esbiv",
                            "description": "No Info for both and/or Either Bilingual/ESL"
                        },
                        {
                            "variable": "spey",
                            "description": "Special Ed "
                        },
                        {
                            "variable": "spen",
                            "description": "Not Special Ed"
                        },
                        {
                            "variable": "spev",
                            "description": "No Info on Special Ed"
                        },
                        {
                            "variable": "gify",
                            "description": "Gifted/Talented"
                        },
                        {
                            "variable": "gifn",
                            "description": "Not Gifted/Talented"
                        },
                        {
                            "variable": "gifv",
                            "description": "No Info on Gifted/ Talented"
                        },
                        {
                            "variable": "atry",
                            "description": "At-Risk"
                        },
                        {
                            "variable": "atrn",
                            "description": "Not At-Risk"
                        },
                        {
                            "variable": "atrv",
                            "description": "No Info At-Risk"
                        },
                        {
                            "variable": "vocy",
                            "description": "Career/Tech "
                        },
                        {
                            "variable": "vocn",
                            "description": "Not Career/ Tech"
                        },
                        {
                            "variable": "voc1",
                            "description": "Career/Tech Elective"
                        },
                        {
                            "variable": "voc2",
                            "description": "Career/Tech Coherent Sequence"
                        },
                        {
                            "variable": "voc3",
                            "description": "Career/ Tech Tech Prep"
                        },
                        {
                            "variable": "vocv",
                            "description": "No Info Career/Tech"
                        }
                    ];
                    this.categories = [
                        {
                            "variable": "d",
                            "description": "# Tested"
                        },
                        {
                            "variable": "satis_ph1_nm",
                            "description": "# Achieved Level II Satisfactory--Phase-in 1"
                        },
                        {
                            "variable": "satis_ph2_nm",
                            "description": "# Achieved Level II Satisfactory--Phase-in 2 "
                        },
                        {
                            "variable": "satis_rec_nm",
                            "description": "# Achieved Level II Satisfactory--Final Recommended "
                        },
                        {
                            "variable": "adv_rec_nm",
                            "description": "# Achieved Level III Advanced--Final Recommended"
                        },
                        {
                            "variable": "unsat_ph1_nm",
                            "description": "# Achieved Level I Unsatisfactory--Phase-in 1"
                        },
                        {
                            "variable": "unsat_ph2_nm",
                            "description": "# Achieved Level I Unsatisfactory--Phase-in 2"
                        },
                        {
                            "variable": "unsat_rec_nm",
                            "description": "# Achieved Level I Unsatisfactory--Final Recommended "
                        },
                        {
                            "variable": "min_ph1_nm",
                            "description": "# Achieved Level I Unsatisfactory Minimum--Phase-in 1"
                        },
                        {
                            "variable": "min_ph2_nm",
                            "description": "# Achieved Level I Unsatisfactory Minimum--Phase-in 2"
                        },
                        {
                            "variable": "min_rec_nm",
                            "description": "# Achieved Level I Unsatisfactory Minimum--Final Recommended "
                        },
                        {
                            "variable": "satis_ph1_rm",
                            "description": "% Achieved Level II Satisfactory--Phase-in 1 "
                        },
                        {
                            "variable": "satis_ph2_rm",
                            "description": "% Achieved Level II Satisfactory--Phase-in 2"
                        },
                        {
                            "variable": "satis_rec_rm",
                            "description": "% Achieved Level II Satisfactory--Final Recommended "
                        },
                        {
                            "variable": "adv_rec_rm",
                            "description": "% Achieved Level III Advanced--Final Recommended "
                        },
                        {
                            "variable": "unsat_ph1_rm",
                            "description": "% Achieved Level I Unsatisfactory--Phase-in 1 "
                        },
                        {
                            "variable": "unsat_ph2_rm",
                            "description": "% Achieved Level I Unsatisfactory--Phase-in 2"
                        },
                        {
                            "variable": "unsat_rec_rm",
                            "description": "% Achieved Level I Unsatisfactory--Final Recommended "
                        },
                        {
                            "variable": "min_ph1_rm",
                            "description": "% Achieved Level I Unsatisfactory Minimum--Phase-in 1 "
                        },
                        {
                            "variable": "min_ph2_rm",
                            "description": "% Achieved Level I Unsatisfactory Minimum--Phase-in 2 "
                        },
                        {
                            "variable": "min_rec_rm",
                            "description": "% Achieved Level I Unsatisfactory Minimum--Final Recommended "
                        },
                        {
                            "variable": "rs",
                            "description": "Average Scale Score"
                        },
                        {
                            "variable": "avg_cat1",
                            "description": "# Avg Items Correct--Reporting Category 1 "
                        },
                        {
                            "variable": "pct_cat1",
                            "description": "% Avg Items Correct--Reporting Category 1"
                        },
                        {
                            "variable": "pct_cat2",
                            "description": "% Avg Items Correct--Reporting Category 2"
                        },
                        {
                            "variable": "avg_cat2",
                            "description": "# Avg Items Correct--Reporting Category 2 --"
                        },
                        {
                            "variable": "avg_cat3",
                            "description": "# Avg Items Correct--Reporting Category 3"
                        },
                        {
                            "variable": "pct_cat3",
                            "description": "% Avg Items Correct--Reporting Category 3"
                        },
                        {
                            "variable": "pct_cat4",
                            "description": "% Avg Items Correct--Reporting Category 4"
                        },
                        {
                            "variable": "avg_cat4",
                            "description": "# Avg Items Correct--Reporting Category 4"
                        },
                        {
                            "variable": "avg_cat5",
                            "description": "# Avg Items Correct--Reporting Category 5 "
                        },
                        {
                            "variable": "pct_cat5",
                            "description": "% Avg Items Correct--Reporting Category 5 "
                        }
                    ];
                    this.setUpChartOptions();
                }
                StaarComponent.prototype.setUpChartOptions = function () {
                    this.barChartOptions = {
                        seriesDefaults: {
                            type: "column"
                        },
                        series: [{
                                name: "3rd Grade Reading",
                                data: [30],
                                color: '#c3151c'
                            },
                            {
                                name: "3rd Grade Math",
                                data: [30],
                                color: '#003662'
                            },
                            {
                                name: "4th Grade Reading",
                                data: [40],
                                color: '#c3151c'
                            },
                            {
                                name: "4th Grade Math",
                                data: [40],
                                color: '#003662'
                            },
                            {
                                name: "4th Grade Writing",
                                data: [40],
                                color: '#fbb613'
                            },
                            {
                                name: "5th Grade Reading",
                                data: [50],
                                color: '#c3151c'
                            },
                            {
                                name: "5th Grade Math",
                                data: [50],
                                color: '#003662'
                            },
                            {
                                name: "5th Grade Science",
                                data: [50],
                                color: '#0086a1'
                            },
                            {
                                name: "6th Grade Reading",
                                data: [60],
                                color: '#c3151c'
                            },
                            {
                                name: "6th Grade Math",
                                data: [60],
                                color: '#003662'
                            },
                            {
                                name: "7th Grade Reading",
                                data: [70],
                                color: '#c3151c'
                            },
                            {
                                name: "7th Grade Math",
                                data: [70],
                                color: '#003662'
                            },
                            {
                                name: "7th Grade Writing",
                                data: [70],
                                color: '#fbb613'
                            },
                            {
                                name: "8th Grade Reading",
                                data: [80],
                                color: '#c3151c'
                            },
                            {
                                name: "8th Grade Math",
                                data: [80],
                                color: '#003662'
                            },
                            {
                                name: "8th Grade Science",
                                data: [80],
                                color: '#0086a1'
                            },
                            {
                                name: "8th Grade History",
                                data: [80],
                                color: '#ef5727'
                            },
                            {
                                name: "Biology",
                                data: [90],
                                color: '#0086a1'
                            },
                            {
                                name: "Algebra 1",
                                data: [90],
                                color: '#003662'
                            },
                            {
                                name: "US History",
                                data: [90],
                                color: '#ef5727'
                            },
                            {
                                name: "English 1",
                                data: [90],
                                color: '#c3151c'
                            },
                            {
                                name: "English 2",
                                data: [90],
                                color: '#c3151c'
                            }
                        ],
                        valueAxis: {
                            max: 100,
                            line: {
                                visible: false
                            },
                            minorGridLines: {
                                visible: false
                            },
                            labels: {
                                visible: false
                            }
                        },
                        categoryAxis: {
                            majorGridLines: {
                                visible: false
                            }
                        },
                        legend: {
                            visible: true
                        },
                        tooltip: {
                            visible: true,
                            color: 'white',
                            template: "#= series.name #"
                        }
                    };
                };
                StaarComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'app/pages/staar/staar.component.html',
                        directives: [kchart_1.Kchart]
                    }), 
                    __metadata('design:paramtypes', [])
                ], StaarComponent);
                return StaarComponent;
            }());
            exports_1("StaarComponent", StaarComponent);
        }
    }
});
//# sourceMappingURL=staar.component.js.map