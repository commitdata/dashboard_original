angular.module('myApp').controller('district_longController', function ($scope, $routeParams, $timeout, $location, sqlData, $filter, JSONToCSV, mapper) {

    $scope.subjects = [];
    $scope.disd = [];
    $scope.justData = [];
    $scope.satData = [];
    $scope.actData = [];
    $scope.takingData = [];
    $scope.selectedDistrict = '';
    $scope.staarData = [];
    $scope.gradData = [];
    $scope.demoData = [];

    function init() {
        //PAGE LOADER.
        $scope.spinner = true;

        sqlData.getDistrictLong().then(function (results) {
            var data;
            if ($routeParams.districtID) {
                data = _.findWhere(results, { "DISTRICT": "'" + $routeParams.districtID });
            }
            else {
                data = results[84];
                $location.path("district_longitudinal/" + data["DISTRICT"].substr(1));
            }

            $scope.selectedDistrict = data["DISTNAME"];

            //find state
            $scope.filterResultSet = results;
            $scope.autoCompleteResultSet = $filter('unique')(results, 'DISTNAME');

            $scope.disd = _.where(results, { "DISTRICT": data["DISTRICT"] });
            console.log("disd");
            console.log($scope.disd);

            //go through it and get them

            _.each($scope.disd, function (i, x) {
                //var newObject = {"YEAR": disd[x]["YEAR"] : disd[x]["DPETLLAC"].toString()};
                //var ojb={"hello":"world"};

                console.log($scope.disd[x]["YEAR"]);


                if ($scope.disd[x]["YEAR"] != "1997" && $scope.disd[x]["YEAR"] != "1998" && $scope.disd[x]["YEAR"] != "1999" && $scope.disd[x]["YEAR"] != "2000"
                     && $scope.disd[x]["YEAR"] != "2001" && $scope.disd[x]["YEAR"] != "2002" && $scope.disd[x]["YEAR"] != "2014") {

                    $scope.actData.push({ "act_avg": parseFloat($scope.disd[x]["DA0CA_R"]), "YEAR": $scope.disd[x]["YEAR"] });
                    $scope.satData.push({ "sat_avg": parseFloat($scope.disd[x]["DA0CS_R"]), "YEAR": $scope.disd[x]["YEAR"] });
                    $scope.takingData.push({ "taking": parseFloat($scope.disd[x]["DA0CC_R"]), "above": parseFloat($scope.disd[x]["DA0CT_R"]), "YEAR": $scope.disd[x]["YEAR"] });

                    if ($scope.disd[x]["YEAR"] != "2004" && $scope.disd[x]["YEAR"] != "2005") {
                        $scope.gradData.push({
                            "aa": parseFloat($scope.disd[x]["DBGC4_R"]), "all": parseFloat($scope.disd[x]["DBGC4_R"]), "YEAR": $scope.disd[x]["YEAR"],
                            "hispanic": parseFloat($scope.disd[x]["DHGC4_R"]), "econ": parseFloat($scope.disd[x]["DEGC4_R"]), "lep": parseFloat($scope.disd[x]["DLGC4_R"]), "white": parseFloat($scope.disd[x]["DWGC4_R"])
                        });
                    }

                    if ($scope.disd[x]["YEAR"] != "2004") {
                        $scope.justData.push({ "DPETALLC": parseFloat($scope.disd[x]["DPETALLC"]), "YEAR": $scope.disd[x]["YEAR"], "DPETECOP": parseFloat($scope.disd[x]["DPETECOP"]), });
                        $scope.demoData.push({ "DPETWHIP": parseFloat($scope.disd[x]["DPETWHIP"]), "DPETHISP": $scope.disd[x]["DPETHISP"], "DPETBLAP": parseFloat($scope.disd[x]["DPETBLAP"]), "YEAR": $scope.disd[x]["YEAR"] });
                    }
                }
            });

            console.log($scope.justData);
            //$scope.$apply();



            var dpethisp = _.pluck($scope.disd, 'DPETHISP');
            var x = _.map(_.pluck($scope.disd, 'DPETHISP'), function (y) { return parseFloat(y); });
            console.log(dpethisp);
            console.log(x);

            createEnrollment();
            createDemographics();
            createSAT();
            createACT();
            createTaking();
            createExperience();
            createEco();
            createGrads();

            $scope.spinner = false;
            //$scope.$apply();

            $.ajax({
                url: '/api/districtLongStaar/get?district=' + data["DISTRICT"],
                success: function (results) {
                    console.log("district staar");
                    console.log(results);
                    $scope.staarData = results;
                    $scope.selectedStaar = results;
                    console.log($scope.selectedStaar);
                    createStaar();
                    //spinner false
                }

            });
        });
    };

    $scope.$on("$viewContentLoaded", function () {
        console.log("initiated");
        $timeout(init, 100);
    });

    $scope.download = function () {
        JSONToCSV($scope.filterResultSet, "District Long Data", true);
    };


    function createEnrollment() {
        $("#enrollmentChart").kendoChart({
            dataSource: {
                data: $scope.justData
            },
            //title: {
            //    text: "Enrollment"
            //},
            legend: {
                visible: false
            },
            seriesDefaults: {
                type: "line",
                labels: {
                    visible: true,
                    format: "{0}",
                    background: "transparent"
                }
            },
            series: [{
                field: "DPETALLC",
                name: "United States",
                color: '#c3151c'
            }],
            valueAxis: {
                labels: {
                    format: "{0}"
                },
                line: {
                    visible: false
                }
            },
            categoryAxis: {
                field: "YEAR",
                majorGridLines: {
                    visible: false
                }
            }
        });

    }

    function createEco() {
        $("#EcoChart").kendoChart({
            dataSource: {
                data: $scope.justData
            },
            //title: {
            //    text: "Enrollment"
            //},
            legend: {
                visible: false
            },
            seriesDefaults: {
                type: "line",
                labels: {
                    visible: true,
                    format: "{0}",
                    background: "transparent"
                }
            },
            series: [{
                field: "DPETECOP",
                name: "United States"
            }],
            valueAxis: {
                labels: {
                    format: "{0}"
                },
                line: {
                    visible: false
                }
            },
            categoryAxis: {
                field: "YEAR",
                majorGridLines: {
                    visible: false
                }
            }
        });


    }

    function createDemographics() {

        var without_2004 = [];

        _.each($scope.disd, function (i, x) {
            if ($scope.disd[x]['YEAR'] != "2004") {
                without_2004.push($scope.disd[x]);
            }
        });

        console.log("without 2004");
        console.log($scope.disd);
        console.log(without_2004);

        $("#demoChart").kendoChart({
            //title: {
            //    text: "Demographics"
            //},
            legend: {
                position: "bottom"
            },
            seriesDefaults: {
                type: "area",
                stack: {
                    type: "100%"
                }
            },
            series: [{
                color: '#fbb613',
                name: mapper.fields['DPETWHIP'],
                data: _.map(_.pluck(without_2004, 'DPETWHIP'), function (y) { return parseFloat(y); })
            }, {
                color: '#003662',
                name: mapper.fields['DPETBLAP'],
                data: _.map(_.pluck(without_2004, 'DPETBLAP'), function (y) { return parseFloat(y); })
            }, {
                color: '#ef5727',
                name: mapper.fields['DPETHISP'],
                data: _.map(_.pluck(without_2004, 'DPETHISP'), function (y) { return parseFloat(y); })
            }],
            valueAxis: {
                line: {
                    visible: false
                }
            },
            categoryAxis: {
                field: 'YEAR',
                //categories: [2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012,2013, 2014],
                majorGridLines: {
                    visible: false
                }
            },
            tooltip: {
                visible: true,
                format: "{0}%",
                template: "#= series.name #: #= value #%"
            }
        });
    }

    function createACT() {

        $("#actChart").kendoChart({
            dataSource: {
                data: $scope.actData
            },
            //title: {
            //    align: "left",
            //    text: "Comments per day"
            //},
            legend: {
                visible: false
            },
            seriesDefaults: {
                color: '#003662',
                type: "column",
                labels: {
                    visible: true,
                    background: "transparent"
                }
            },
            series: [{
                field: "act_avg",
                colorField: "userColor"
            }],
            valueAxis: {
                //max: 28,
                majorGridLines: {
                    visible: false
                },
                visible: false
            },
            categoryAxis: {
                field: "YEAR",
                majorGridLines: {
                    visible: false
                },
                line: {
                    visible: false
                }
            }
        });



    }

    function createSAT() {

        $("#satChart").kendoChart({
            dataSource: {
                data: $scope.satData
            },
            //title: {
            //    align: "left",
            //    text: "Comments per day"
            //},
            legend: {
                visible: false
            },
            seriesDefaults: {
                color: '#c3151c',
                type: "column",
                labels: {
                    visible: true,
                    background: "transparent"
                }
            },
            series: [{
                field: "sat_avg",
                colorField: "userColor"
            }],
            valueAxis: {
                //max: 28,
                majorGridLines: {
                    visible: false
                },
                visible: false
            },
            categoryAxis: {
                categories: [2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013],
                majorGridLines: {
                    visible: true
                }
            },
            //categoryAxis: {
            //    field: "YEAR",
            //    majorGridLines: {
            //        visible: false
            //    },
            //    line: {
            //        visible: false
            //    }
            //}
        });



    }

    function createTaking() {

        $("#takingChart").kendoChart({
            dataSource: {
                data: $scope.takingData
            },
            //title: {
            //    text: "Enrollment"
            //},
            legend: {
                visible: false
            },
            seriesDefaults: {
                type: "line",
                labels: {
                    visible: true,
                    format: "{0}",
                    background: "transparent"
                }
            },
            series: [{
                field: "taking",
                name: "United States"
            },
            {
                field: "above",
                name: "United States"
            }
            ],
            valueAxis: {
                labels: {
                    format: "{0}"
                },
                line: {
                    visible: false
                }
            },
            categoryAxis: {
                field: "YEAR",
                majorGridLines: {
                    visible: false
                }
            }
        });

    }

    function createExperience() {

        var without_2004 = [];

        _.each($scope.disd, function (i, x) {
            if ($scope.disd[x]['YEAR'] != "2004") {
                without_2004.push($scope.disd[x]);
            }
        });

        $("#longExperienceChart").kendoChart({
            title: {
                text: "Teacher Experience Average"
            },
            legend: {
                visible: false
            },
            seriesDefaults: {
                type: "column",
                stack: true
            },
            series: [{
                name: "Gold Medals",
                data: _.map(_.pluck(without_2004, 'DPST00FP'), function (y) { return parseFloat(y); }),
                color: "blue"
            }, {
                name: "Silver Medals",
                data: _.map(_.pluck(without_2004, 'DPST01FP'), function (y) { return parseFloat(y); }),
                color: "red"
            }, {
                name: "Bronze Medals",
                data: _.map(_.pluck(without_2004, 'DPST06FP'), function (y) { return parseFloat(y); }),
                color: "green"
            }, {
                name: "Bronze Medals",
                data: _.map(_.pluck(without_2004, 'DPST11FP'), function (y) { return parseFloat(y); }),
                color: "#bb6e36"
            }, {
                name: "Bronze Medals",
                data: _.map(_.pluck(without_2004, 'DPST20FP'), function (y) { return parseFloat(y); }),
                color: "gray"
            }],
            valueAxis: {
                max: 100,
                line: {
                    visible: false
                },
                minorGridLines: {
                    visible: true
                }
            },
            categoryAxis: {
                categories: _.map(_.pluck(without_2004, 'YEAR'), function (y) { return parseFloat(y); }),
                majorGridLines: {
                    visible: false
                }
            },
            tooltip: {
                visible: true,
                template: "#= series.name #: #= value #"
            }
        });
    }

    function createStaar() {

        //districtLongStaar
        $scope.selectedStaarCleaned = [];
        var twelve;
        var thirteen;
        var fourteen;

        _.each($scope.selectedStaar, function (i, x) {
            var fieldName = $scope.selectedStaar[x]['SUBJECT'] + $scope.selectedStaar[x]['GRADE'] + "-" + $scope.selectedStaar[x]['YEAR'];
            console.log(fieldName);
            var thisValue = parseFloat($scope.selectedStaar[x]['rec']).toFixed(2);
            //reset
            $scope.selectedStaarCleaned.push({ myField: thisValue, name: mapper.subjects[$scope.selectedStaar[x]['SUBJECT']] + $scope.selectedStaar[x]['GRADE'], YEAR: $scope.selectedStaar[x]['YEAR'] });

            //var test123 = {};
            //test123[fieldName] = thisValue;

            //$scope.selectedData.push(test123);

            //$.extend(myObj, test123);
        });

        twelve = _.where($scope.selectedStaarCleaned, { 'YEAR': '12' });
        thirteen = _.where($scope.selectedStaarCleaned, { 'YEAR': '13' });
        fourteen = _.where($scope.selectedStaarCleaned, { 'YEAR': '14' });
        console.log('twelve');
        console.log(_.pluck(twelve, 'myField'));


        $("#districtLongStaar").html("");

        $("#districtLongStaar").kendoChart({
            //dataSource: {
            //    data: $scope.selectedStaarCleaned
            //},
            //title: {
            //    align: "left",
            //    text: "STAAR % Final Recommended By Subject"
            //},
            seriesDefaults: {
                type: "column",
                labels: {
                    visible: true,
                    //background: "transparent"
                }
            },
            series: [
                {
                    name: "2012",
                    data: _.pluck(twelve, 'myField'),
                    color: '#003662'
                }, {
                    name: "2013",
                    data: _.pluck(thirteen, 'myField'),
                    color: '#c3151c'
                }, {
                    name: "2014",
                    data: _.pluck(fourteen, 'myField'),
                    color: 'green'
                }
                //{
                //    field: "myField",
                //    name: "name"
                //}
            ],
            valueAxis: {
                //max: 1,
                majorGridLines: {
                    visible: false
                }
            },
            categoryAxis: {
                categories: _.pluck(fourteen, 'name'),
            },
            tooltip: {
                visible: true,
                template: "#= series.name #: #= value #",
                color: 'white'
            }
        });

    }

    function createGrads() {

        //_.pluck($scope.disd, 'DBGC4_R')

        $("#gradChart").kendoChart({
            dataSource: {
                data: $scope.gradData
            },
            //title: {
            //    text: "Enrollment"
            //},
            legend: {
                visible: false
            },
            seriesDefaults: {
                type: "line",
                labels: {
                    visible: true,
                    format: "{0}",
                    background: "transparent"
                }
            },
            series: [{
                field: "all",
                name: "All"
            }, {
                field: "aa",
                name: "African American"
            },
            {
                field: "white",
                name: "White"
            },
            {
                field: "hispanic",
                name: "Hispanic"
            },
            {
                field: "Econ",
                name: "Economically Disadvantaged"
            },
        {
            field: "lep",
            name: "lep"
        },
            ],
            valueAxis: {
                max: 100,
                labels: {
                    format: "{0}"
                },
                line: {
                    visible: false
                }
            },
            categoryAxis: {
                field: 'YEAR',
                majorGridLines: {
                    visible: false
                }
            }
        });

    }

    $scope.changeDistrict = function () {
        var district = _.findWhere($scope.filterResultSet, { "DISTNAME": $scope.selectedDistrict });
        $location.path("district_longitudinal/" + district["DISTRICT"].substr(1));
    };
});