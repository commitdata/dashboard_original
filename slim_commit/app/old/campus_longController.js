angular.module('myApp').controller('campus_longController', function ($scope, allData) {

    $scope.camper = "great";
    $scope.staarData = [];
    $scope.aeisData = [];

    $scope.selectedCampusStaar = [];
    $scope.selectedCampusAEIS = [];

    $scope.selectedData = [];
    $scope.selectedStaar = [];

    $scope.filterResultSet = [];
    $scope.selectedCampus = '';

    $.ajax({
        url: '/api/campusLong/get',
        success: function (results) {
            $scope.filterResultSet = [];
            console.log("campus long aeis");
            console.log(results);
            $scope.aeisData = results;
            $scope.filterResultSet = results;
            $scope.getStaar();
        }

    });

    $scope.getStaar = function () {
        $.ajax({
            url: '/api/campusLongStaar/get',
            success: function (results) {

                console.log("campus long staar");
                console.log(results);
                $scope.staarData = results;
                $scope.start();
            }
        });
    };

    $scope.start = function () {
        //'057905162
        $scope.selectedCampusStaar = _.where($scope.staarData, { 'CAMPUS': "'057905175" });
        $scope.selectedCampusAEIS = _.where($scope.aeisData, { 'CAMPUS': "'057905175" }); //162//246//013


        console.log("one campus' staar");
        console.log($scope.selectedCampusStaar);
        console.log($scope.selectedCampusAEIS);

        $scope.staarTwo();
        $scope.createExperience();
        $scope.createDemographics();
        $scope.createEnrollment();
        //$scope.createEconDisd();
        $scope.$apply();
    };


    $scope.staarBar = function () {
        console.log("staar bar");

        var myObj = {};


        _.each($scope.selectedCampusStaar, function (i, x) {
            var fieldName = $scope.selectedCampusStaar[x]['SUBJECT-GRADE'] + "-" + $scope.selectedCampusStaar[x]['YEAR'];
            console.log(fieldName);
            var thisValue = parseFloat($scope.selectedCampusStaar[x]['rec']);
            $scope.selectedData.push({ myField: thisValue });

            var test123 = {};
            test123[fieldName] = thisValue;

            //$scope.selectedData.push(test123);

            $.extend(myObj, test123);
        });

        console.log($scope.selectedData);

        $scope.selectedStaar.push(myObj);
        console.log($scope.selectedStaar[0]);
        $scope.$apply();
    };

    $scope.staarTwo = function () {


        _.each($scope.selectedCampusStaar, function (i, x) {
            var fieldName = $scope.selectedCampusStaar[x]['SUBJECT-GRADE'] + "-" + $scope.selectedCampusStaar[x]['YEAR'];
            console.log(fieldName);
            var thisValue = parseFloat($scope.selectedCampusStaar[x]['rec']);
            $scope.selectedData.push({ myField: thisValue });

            //var test123 = {};
            //test123[fieldName] = thisValue;

            //$scope.selectedData.push(test123);

            //$.extend(myObj, test123);
        });


        $("#charter2").kendoChart({
            dataSource: {
                data: $scope.selectedData
            },
            title: {
                align: "left",
                text: "Comments per day"
            },
            legend: {
                visible: false
            },
            seriesDefaults: {
                type: "column",
                labels: {
                    visible: true,
                    background: "transparent"
                }
            },
            series: [
                {
                    field: "myField"
                }
            ],
            valueAxis: {
                max: 1,
                majorGridLines: {
                    visible: false
                },
                visible: false
            },
            categoryAxis: {
                field: "day",
                majorGridLines: {
                    visible: false
                },
                line: {
                    visible: false
                }
            }
        });


    };

    $scope.createEnrollment=function(){

        $("#campusLongEnrollmentChart").kendoChart({
                dataSource: {
                    data: $scope.selectedCampusAEIS
                },
                title: {
                    text: "Internet Users in United States"
                },
                legend: {
                    visible: false
                },
                seriesDefaults: {
                    type: "line",
                    labels: {
                        visible: true,
                        format: "{0}%",
                        background: "transparent"
                    }
                },
                series: [{
                    field: "CPETALLC",
                    name: "United States"
                }],
                valueAxis: {
                    labels: {
                        format: "{0}%"
                    },
                    line: {
                        visible: false
                    }
                },
                categoryAxis: {
                    field: "year",
                    majorGridLines: {
                        visible: false
                    }
                }
            });



    }

    $scope.createEconDisd = function () {

        $("#campusLongEconDis").kendoChart({
            dataSource: {
                data: $scope.selectedCampusAEIS
            },
            title: {
                text: "Internet Users in United States"
            },
            legend: {
                visible: false
            },
            seriesDefaults: {
                type: "line",
                labels: {
                    visible: true,
                    format: "{0}%",
                    background: "transparent"
                }
            },
            series: [{
                field: "CPETECOP",
                name: "United States"
            }],
            valueAxis: {
                labels: {
                    format: "{0}%"
                },
                line: {
                    visible: false
                }
            },
            categoryAxis: {
                field: "year",
                majorGridLines: {
                    visible: false
                }
            }
        });



    }


    $scope.createExperience = function () {

        $("#campusLongExperienceChart").kendoChart({
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
            series: [
                {
                    name: "Gold Medals",
                    data: _.map(_.pluck($scope.selectedCampusAEIS, 'CPST00FP'), function (y) { return parseFloat(y); }),
                    color: "blue"
                }, {
                    name: "Silver Medals",
                    data: _.map(_.pluck($scope.selectedCampusAEIS, 'CPST01FP'), function (y) { return parseFloat(y); }),
                    color: "red"
                }, {
                    name: "Bronze Medals",
                    data: _.map(_.pluck($scope.selectedCampusAEIS, 'CPST06FP'), function (y) { return parseFloat(y); }),
                    color: "green"
                }, {
                    name: "Bronze Medals",
                    data: _.map(_.pluck($scope.selectedCampusAEIS, 'CPST11FP'), function (y) { return parseFloat(y); }),
                    color: "#bb6e36"
                }, {
                    name: "Bronze Medals",
                    data: _.map(_.pluck($scope.selectedCampusAEIS, 'CPST20FP'), function (y) { return parseFloat(y); }),
                    color: "gray"
                }
            ],
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
                categories: [1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014],
                //categories: _.map(_.pluck($scope.selectedCampusAEIS, 'YEAR'), function (y) { return parseFloat(y); }),
                majorGridLines: {
                    visible: false
                }
            },
            tooltip: {
                visible: true,
                template: "#= series.name #: #= value #"
            }
        });
    };


    $scope.createDemographics = function () {

        $("#campusDemoChart").kendoChart({
            title: {
                text: "Demographics"
            },
            legend: {
                position: "bottom"
            },
            seriesDefaults: {
                type: "area",
                stack: {
                    type: "100%"
                }
            },
            series: [
                {
                    color: '#fbb613',
                    name: "white",
                    data: _.map(_.pluck($scope.selectedCampusAEIS, 'CPETWHIP'), function (y) { return parseFloat(y); })
                }, {
                    color: '#003662',
                    name: "african american",
                    data: _.map(_.pluck($scope.selectedCampusAEIS, 'CPETBLAP'), function (y) { return parseFloat(y); })
                }, {
                    color: '#ef5727',
                    name: "hispanic",
                    data: _.map(_.pluck($scope.selectedCampusAEIS, 'CPETHISP'), function (y) { return parseFloat(y); })
                }
            ],
            valueAxis: {
                line: {
                    visible: false
                }
            },
            categoryAxis: {
                field: 'YEAR',
                categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
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
    };

    $scope.campusChange = function () {
        console.log('selected: ', $scope.selectedCampus);
        $scope.selectedData = [];
        $scope.selectedStaar = [];

        $scope.selectedCampusStaar = [];
        $scope.selectedCampusAEIS = [];
        $scope.selectedCampusStaar = _.where($scope.staarData, { 'CAMPUS': $scope.selectedCampus });
        $scope.selectedCampusAEIS = _.where($scope.aeisData, { 'CAMPUS': $scope.selectedCampus }); //162//246//013

        $scope.staarTwo();
        $scope.createExperience();
        $scope.createDemographics();

    };
});