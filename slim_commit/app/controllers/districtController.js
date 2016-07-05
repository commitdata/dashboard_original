angular.module('myApp').controller('districtController', function ($scope, $q, $http, $timeout, $location, $routeParams, districtData, sqlData, JSONToCSV, $filter, mapper, d2bURI) {
    //grab all the data


    /* dist Long variables */
    $scope.disd = [];
    $scope.justData = [];
    $scope.satData = [];
    $scope.actData = [];
    $scope.takingData = [];
    $scope.gradData = [];
    $scope.demoData = [];
    var without_2004 = [];
    /* End of dist Long*/

    var teal = '#0086a1';
    var red = '#c3151c';
    var blue = '#003662';
    var orange = '#ef5727';
    var yellow = '#fbb613';
    var green = '#91c63d';

    $scope.tooltipOptions = {
        content: function (event) { var selector = "#" + event.target.attr('data-chart') + "Doc"; return $(selector).html(); },
        position: "left"
    };

    $scope.boxTooltipOptions = {
        content: function (event) { var selector = "#" + event.target.attr('data-div'); return $(selector).html(); },
        position: "left"
    };

    $scope.hello = "yo!";

    $scope.schools = [];

    $scope.districtData = [];
    $scope.finalDistrictData = [];

    $scope.pieData = []

    $scope.recordType = "rec";
    $scope.recType = "1S14R";
    $scope.subType = "A00";
    $scope.sortType = "subject";

    $scope.spinner = true;

    $scope.fields = mapper.fields;

    var chartMapper = {
        studentStaar: {
            kChart: function () { return $("#studentStaar").data("kendoChart"); },
            data: function () {
                return [_.pick($scope.districtData[0], "DISTNAME", "m3_rec", "r3_rec", "m4_rec", "r4_rec", "w4_rec", "m5_rec", "r5_rec", "s5_rec", "r6_rec", "m6_rec", "r7_rec", "m7_rec", "w7_rec", "r8_rec", "m8_rec", "h8_rec", "s8_rec", "a1_EOC_rec", "e1_EOC_rec", "e2_EOC_rec", "bi_EOC_rec", "us_EOC_rec",
                "m3_ph1", "r3_ph1", "m4_ph1", "r4_ph1", "w4_ph1", "m5_ph1", "r5_ph1", "s5_ph1", "r6_ph1", "m6_ph1", "r7_ph1", "m7_ph1", "w7_ph1", "r8_ph1", "m8_ph1", "h8_ph1", "s8_ph1", "a1_EOC_ph1", "e1_EOC_ph1", "e2_EOC_ph1", "bi_EOC_ph1", "us_EOC_ph1")];
            }
        },
        studentSubject: {
            kChart: function () {
                return $("#studentSubject").data("kendoChart");
            },
            data: function () {
                return [_.pick($scope.districtData[0], "DISTNAME", "DB00A001S14R", "DA00A001S14R", "DL00A001S14R", "DE00A001S14R", "DH00A001S14R", "DW00A001S14R", "DB00AR01S14R", "DA00AR01S14R", "DL00AR01S14R", "DE00AR01S14R", "DH00AR01S14R", "DW00AR01S14R", "DB00AM01S14R", "DA00AM01S14R", "DL00AM01S14R", "DE00AM01S14R", "DH00AM01S14R", "DW00AM01S14R", "DB00AC01S14R", "DA00AC01S14R", "DL00AC01S14R", "DE00AC01S14R", "DH00AC01S14R", "DW00AC01S14R", "DB00A004214R", "DA00A004214R", "DL00A004214R", "DE00A004214R", "DH00A004214R", "DW00A004214R", "DB00AR04214R", "DA00AR04214R", "DL00AR04214R", "DE00AR04214R", "DH00AR04214R", "DW00AR04214R", "DB00AM04214R", "DA00AM04214R", "DL00AM04214R", "DE00AM04214R", "DH00AM04214R", "DW00AM04214R", "DB00AC04214R", "DA00AC04214R", "DL00AC04214R", "DE00AC04214R", "DH00AC04214R", "DW00AC04214R")];

            }
        },
        ACTAverage: {
            kChart: function () {
                return $scope.actChart;
            },
            data: function () {
                return [_.pick($scope.districtData[0], "DISTNAME", "DA0CAA13R", "DB0CAA13", "DH0CAA13", "DW0CAA13")];
            }
        },
        SATAverage: {
            kChart: function () {
                return $scope.satChart;
            },
            data: function () {
                return [_.pick($scope.districtData[0], "DISTNAME", "DA0CSA13R", "DB0CSA13R", "DH0CSA13R", "DW0CSA13R")];
            }
        },
        ACTSATAverage: {
            kChart: function () {
                return $scope.actSatChart;
            },
            data: function () {
                return [_.pick($scope.districtData[0], "DISTNAME", 'DA0CT13R', 'DB0CT13R', 'DH0CT13R', 'DW0CT13R')];
            }
        },
        ACTSATAboveCriterion: {
            kChart: function () {
                return $scope.actSatAboveChart;
            },
            data: function () {
                return [_.pick($scope.districtData[0], "DISTNAME", 'DA0CC13R', 'DB0CC13R', 'DH0CC13R', 'DW0CC13R')];
            }
        },
        studentDemo: {
            kChart: function () {
                return $("#demoPie").data("kendoChart");
            },
            data: function () {
                return [_.pick($scope.districtData[0], "DISTNAME", "DPETHISP", "DPETBLAP", "DPETWHIP")];
            }
        },
        graduationRates: {
            kChart: function () {
                return $scope.gardChart;
            },
            data: function () {
                return [_.pick($scope.districtData[0], "DISTNAME", 'grad_all', 'grad_aa', 'grad_hispanic', 'grad_white', 'grad_lep', 'grad_econ')];
            }
        },
        teacherExperience: {
            kChart: function () {
                return $("#pieThing").data("kendoChart");
            },
            data: function () {
                return [_.pick($scope.districtData[0], "DISTNAME", "DPST00FP", "DPST01FP", "DPST06FP", "DPST11FP", "DPST20FP")];
            }
        },
        enrollmentChart: {
            kChart: function () {
                return $("#enrollmentChart").data("kendoChart");
            },
            data: function () {
                return $scope.justData;
            }
        },
        demoChart: {
            kChart: function () {
                return $("#demoChart").data("kendoChart");
            },
            data: function () {
                return $scope.demoData;
            }
        },
        satChart: {
            kChart: function () {
                return $("#satChart").data("kendoChart");
            },
            data: function () {
                return $scope.satData;
            }
        },
        actChart: {
            kChart: function () {
                return $("#actChart").data("kendoChart");
            },
            data: function () {
                return $scope.actData;
            }
        },
        takingChart: {
            kChart: function () {
                return $("#takingChart").data("kendoChart");
            },
            data: function () {
                return $scope.takingData;
            }
        },
        longExperienceChart: {
            kChart: function () {
                return $("#longExperienceChart").data("kendoChart");
            },
            data: function () {
                return without_2004;
            }
        },
        EcoChart: {
            kChart: function () {
                return $("#EcoChart").data("kendoChart");
            },
            data: function () {
                return $scope.justData;
            }
        },
        gradChart: {
            kChart: function () {
                return $("#gradChart").data("kendoChart");
            },
            data: function () {
                return $scope.gradData;
            }
        },
        districtLongStaar: {
            kChart: function () {
                return $("#districtLongStaar").data("kendoChart");
            },
            data: function () {
                return $scope.selectedStaar;
            }
        },
    };


    function initDistrict() {
        var data;
        //find state

        if ($routeParams.districtID) {
            data = _.findWhere($scope.filteredDistricts, { "DISTRICT": $routeParams.districtID });
        }
        else {
            data = _.findWhere($scope.filteredDistricts, { "DISTRICT": '057905' });
        }
        $scope.selectedDistrict = data;
        $scope.stateDistrict = _.findWhere($scope.filteredDistricts, { "DISTRICT": '1' });
        $scope.districtData = [data];
        $scope.finalDistrictData = [data];


        experienceChart();
        createDemoPie(data);
        createStudentStaar($scope.districtData, 'rec');
        createStudentSubject($scope.districtData, '1S14R', 'A00');
    };


    function initDistrictLong() {
        var data;
        if ($routeParams.districtID) {
            data = _.findWhere($scope.districtLongs, { "DISTRICT": "'" + $routeParams.districtID });
        }
        else {
            data = _.findWhere($scope.districtLongs, { "DISTRICT": "'057905" });
        }
        data = data || { "DISTRICT": "'" + $routeParams.districtID };
        $scope.disd = _.where($scope.districtLongs, { "DISTRICT": data["DISTRICT"] });
        $scope.stateDisd = $.extend(true, [], _.where($scope.districtLongs, { "DISTRICT": "'1" }));

        console.log("disd");
        console.log($scope.stateDisd);

        //go through it and get them

        _.each($scope.stateDisd, function (item) {
            item["YEAR"] = item["YEAR"].substr(2);
        });

        _.each($scope.disd, function (i, x) {
            //var newObject = {"YEAR": disd[x]["YEAR"] : disd[x]["DPETLLAC"].toString()};
            //var ojb={"hello":"world"};
            $scope.disd[x]["YEAR"] = $scope.disd[x]["YEAR"].substr(2);
            console.log($scope.disd[x]["YEAR"]);


            if ($scope.disd[x]["YEAR"] != "97" && $scope.disd[x]["YEAR"] != "98" && $scope.disd[x]["YEAR"] != "99" && $scope.disd[x]["YEAR"] != "00"
                 && $scope.disd[x]["YEAR"] != "01" && $scope.disd[x]["YEAR"] != "02" && $scope.disd[x]["YEAR"] != "14") {

                var matchedState = _.findWhere($scope.stateDisd, function (item) { return item["YEAR"] == i["YEAR"] }) || { DA0CA_R: "0", DA0CS_R: "0" };
                $scope.actData.push({ "act_avg": !isNaN(parseFloat($scope.disd[x]["DA0CA_R"])) ? parseFloat($scope.disd[x]["DA0CA_R"]) : -1, "state_act_avg": parseFloat(matchedState["DA0CA_R"]), "YEAR": $scope.disd[x]["YEAR"], "DISTNAME": $scope.disd[x]["DISTNAME"] });
                $scope.satData.push({ "sat_avg": !isNaN(parseFloat($scope.disd[x]["DA0CS_R"])) ? parseFloat($scope.disd[x]["DA0CS_R"]) : -1, "state_sat_avg": parseFloat(matchedState["DA0CS_R"]), "YEAR": $scope.disd[x]["YEAR"], "DISTNAME": $scope.disd[x]["DISTNAME"] });

                if (!isNaN(parseFloat($scope.disd[x]["DA0CT_R"]))) {
                    $scope.takingData.push({ "above": parseFloat($scope.disd[x]["DA0CC_R"]), "taking": parseFloat($scope.disd[x]["DA0CT_R"]), "YEAR": $scope.disd[x]["YEAR"] });
                }

                if ($scope.disd[x]["YEAR"] != "04" && $scope.disd[x]["YEAR"] != "05") {
                    $scope.gradData.push({
                        "aa": parseFloat($scope.disd[x]["DBGC4_R"]), "all": parseFloat($scope.disd[x]["DBGC4_R"]), "YEAR": $scope.disd[x]["YEAR"],
                        "hispanic": parseFloat($scope.disd[x]["DHGC4_R"]), "econ": parseFloat($scope.disd[x]["DEGC4_R"]), "lep": parseFloat($scope.disd[x]["DLGC4_R"]), "white": parseFloat($scope.disd[x]["DWGC4_R"])
                    });

                    //$scope.stateDisd["aa"] = parseFloat($scope.stateDisd["DBGC4_R"]);
                    //$scope.stateDisd["all"] = parseFloat($scope.stateDisd["DBGC4_R"]);
                    //$scope.stateDisd["hispanic"] = parseFloat($scope.stateDisd["DHGC4_R"]);
                    //$scope.stateDisd["econ"] = parseFloat($scope.stateDisd["DEGC4_R"]);
                    //$scope.stateDisd["lep"] = parseFloat($scope.stateDisd["DLGC4_R"]);
                    //$scope.stateDisd["white"] = parseFloat($scope.stateDisd["DWGC4_R"]);

                }

                if ($scope.disd[x]["YEAR"] != "04") {
                    if (!isNaN(parseFloat($scope.disd[x]["DPETALLC"]))) {
                        $scope.justData.push({ "DPETALLC": parseFloat($scope.disd[x]["DPETALLC"]), "YEAR": $scope.disd[x]["YEAR"], "DPETECOP": parseFloat($scope.disd[x]["DPETECOP"]), "DPETLEPP": parseFloat($scope.disd[x]["DPETLEPP"]) });
                    }
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
        //createGrads();

        $http({ url: '/api/districtLongStaar/get', params: { district: data["DISTRICT"] } }).then(function (response) {
            console.log("district staar");
            $scope.selectedStaar = response.data;
            console.log($scope.selectedStaar);
            createStaar();
        });

    };

    function init() {

        $scope.spinner = true;

        var promises = [districtData.getData().then(function (response) { return response.data; }), sqlData.getDistrictLong()];

        $q.all(promises).then(function (results) {
            $scope.districtLongs = results[1];
            $scope.districts = results[0];
            $scope.filteredDistricts = angular.copy(_.sortBy($filter('unique')($scope.districts, 'DISTNAME'), 'DISTNAME'));
            $scope.counties = _.sortBy($filter('unique')($scope.districts, 'CNTYNAME'), 'CNTYNAME');
            $scope.counties.unshift({ CNTYNAME: "All Counties" });
            $scope.selectedCounty = $scope.counties[0];
            initDistrict();
            initDistrictLong();
            $scope.spinner = false;
        });
    }
    $scope.districtChange = function () {
        if ($scope.selectedDistrict.DISTRICT) {
            $location.path("district_old/" + $scope.selectedDistrict["DISTRICT"]);
        }
    };

    $scope.countyChange = function () {
        console.log($scope.selectedCounty);
        if (!$scope.selectedCounty) return;
        if ($scope.selectedCounty.CNTYNAME != "All Counties") {
            $scope.filteredDistricts = _.where($scope.districts, { "CNTYNAME": $scope.selectedCounty.CNTYNAME });
        }
        else {
            $scope.filteredDistricts = angular.copy($scope.districts);
        }
        $scope.selectedDistrict = null;
    };

    $scope.$on("$viewContentLoaded", function () {
        $timeout(init, 100);
    });


    function createStudentSubject(data, recType, subType) {

        var finalData = [];
        finalData.push(data[0]);
        if ($scope.studentSubjectState) {
            finalData.push($scope.stateDistrict);
        }

        var categories = [{ code: "DA00", name: "All" }, { code: "DE00", name: "Low Income" }, { code: "DB00", name: "African American" }, { code: "DH00", name: "Hispanic" }, { code: "DW00", name: "White" }, { code: "DL00", name: "LEP" }];
        var series = [];
        //var colors = ['#003662', '#91c63d', '#fbb613', '#91c63d', '#c3151c', '#fbb613'];
        //blue, green, yellow, green, red, yellow

        var colors = ['#91c63d', '#ef5727', '#003662', '#c3151c', '#fbb613', '#0086a1'];
        //green, ornage, blue, red, yellow, teal

        var indexer = 0;
        _.each(categories, function (item) {
            series.push({ field: item.code + subType + recType, name: item.name, color: colors[indexer] });
            indexer++;
        });

        $("#studentSubject").kendoChart({
            legend: {
                visible: true
            },
            seriesDefaults: {
                type: "column",
                labels: {
                    visible: true,
                    template: "#= value < 0 ? 'N/A' : value.toFixed(0) + '%' #",
                }
            },
            tooltip: {
                visible: true,
                template: "#= series.name #: #= value < 0 ? 'N/A' : value.toFixed(0) + '%' #",
                color: 'white'
            },
            dataSource: {
                data: finalData
            },
            series: series,
            valueAxis: {
                majorGridLines: {
                    visible: true
                },
                visible: true,
                labels: {
                    template: "#: value.toFixed(0) # %"
                },
                min: 0
            },
            categoryAxis: {
                field: "DISTNAME",
                majorGridLines: {
                    visible: false
                },
                line: {
                    visible: false
                }
            }
        });
    };


    function createStudentStaar(data, recordType, sortType) {
        console.log(recordType);
        var finalData = [];
        finalData.push(data[0]);
        if ($scope.studentStaarState) {
            finalData.push($scope.stateDistrict);
        }

        var series = [];
        if (sortType == "grade") {
            series = [{ field: "m3_" + recordType, name: "3rd Grade Math", color: '#003662' },
                    { field: "r3_" + recordType, name: "3rd Grade Reading", color: '#c3151c' },
                    { field: "m4_" + recordType, name: "4th Grade Math", color: '#003662' },
                    { field: "r4_" + recordType, name: "4th Grade Reading", color: '#c3151c' },
                    { field: "w4_" + recordType, name: "4th Grade Writing", color: '#ef5727' },
                    { field: "m5_" + recordType, name: "5th Grade Math", color: '#003662' },
                    { field: "r5_" + recordType, name: "5th Grade Reading", color: '#c3151c' },
                    { field: "s5_" + recordType, name: "5th Grade Science", color: '#0086a1' },
                    { field: "r6_" + recordType, name: "6th Grade Reading", color: '#c3151c' },
                    { field: "m6_" + recordType, name: "6th Grade Math", color: '#003662' },
                    { field: "r7_" + recordType, name: "7th Grade Reading", color: '#c3151c' },
                    { field: "m7_" + recordType, name: "7th Grade Math", color: '#003662' },
                    { field: "w7_" + recordType, name: "7th Grade Writing", color: '#ef5727' },
                    { field: "r8_" + recordType, name: "8th Grade Reading", color: '#c3151c' },
                    { field: "m8_" + recordType, name: "8th Grade Math", color: '#003662' },
                    { field: "h8_" + recordType, name: "8th Grade History", color: '#fbb613' },
                    { field: "s8_" + recordType, name: "8th Grade Science", color: '#0086a1' },

                    { field: "a1_EOC_" + recordType, name: "Algebra 1", color: '#003662' },
                    { field: "e1_EOC_" + recordType, name: "English 1", color: '#c3151c' },
                    { field: "e2_EOC_" + recordType, name: "English 2", color: '#c3151c' },
                    { field: "bi_EOC_" + recordType, name: "Biology", color: '#0086a1' },
                    { field: "us_EOC_" + recordType, name: "US History", color: '#fbb613' }
            ];
        }
        else {
            series = [{ field: "m3_" + recordType, name: "3rd Grade Math", color: '#003662' },
                { field: "m4_" + recordType, name: "4th Grade Math", color: '#003662' },
                { field: "m5_" + recordType, name: "5th Grade Math", color: '#003662' },
                { field: "m6_" + recordType, name: "6th Grade Math", color: '#003662' },
                { field: "m7_" + recordType, name: "7th Grade Math", color: '#003662' },
                { field: "m8_" + recordType, name: "8th Grade Math", color: '#003662' },
                { field: "r3_" + recordType, name: "3rd Grade Reading", color: '#c3151c' },
                { field: "r4_" + recordType, name: "4th Grade Reading", color: '#c3151c' },
                { field: "r5_" + recordType, name: "5th Grade Reading", color: '#c3151c' },
                { field: "r6_" + recordType, name: "6th Grade Reading", color: '#c3151c' },
                { field: "r7_" + recordType, name: "7th Grade Reading", color: '#c3151c' },
                { field: "r8_" + recordType, name: "8th Grade Reading", color: '#c3151c' },
                { field: "w4_" + recordType, name: "4th Grade Writing", color: '#ef5727' },
                { field: "w7_" + recordType, name: "7th Grade Writing", color: '#ef5727' },
                { field: "s5_" + recordType, name: "5th Grade Science", color: '#0086a1' },
                { field: "s8_" + recordType, name: "8th Grade Science", color: '#0086a1' },
                { field: "h8_" + recordType, name: "8th Grade History", color: '#fbb613' },
                { field: "a1_EOC_" + recordType, name: "Algebra 1", color: '#003662' },
                { field: "e1_EOC_" + recordType, name: "English 1", color: '#c3151c' },
                { field: "e2_EOC_" + recordType, name: "English 2", color: '#c3151c' },
                { field: "bi_EOC_" + recordType, name: "Biology", color: '#0086a1' },
                { field: "us_EOC_" + recordType, name: "US History", color: '#fbb613' }
            ];
        }
        $("#studentStaar").kendoChart({
            //title: {
            //    align: "left",
            //    text: "Comments per day"
            //},
            legend: {
                visible: true,
                position: 'bottom'
            },
            seriesDefaults: {
                type: "column",
                labels: {
                    visible: true,
                    //background: "transparent",
                    template: "#= value < 0 ? 'N/A' : (value*100).toFixed(0) + '%' #",
                }
            },
            tooltip: {
                visible: true,
                template: "#= series.name #: #= value < 0 ? 'N/A' : (value*100).toFixed(0) + '%' #",
                color: 'white'
            },
            dataSource: {
                data: finalData
            },
            series: series,
            valueAxis: {
                majorGridLines: {
                    visible: true
                },
                labels: {
                    template: "#= (value*100).toFixed(0) # %"
                },
                visible: true,
                min: 0
            },
            categoryAxis: {
                field: "DISTNAME",
                majorGridLines: {
                    visible: false
                },
                line: {
                    visible: false
                }
            }
        });
    };

    $scope.$watch('recordType', function (value) {
        if ($scope.districtData.length > 0) {
            createStudentStaar($scope.districtData, value, $scope.sortType);
        }
    });

    $scope.$watch('sortType', function (value) {
        if ($scope.districtData.length > 0) {
            createStudentStaar($scope.districtData, $scope.recordType, value);
        }
    });

    $scope.$watch('studentStaarState', function (value) {
        if ($scope.districtData.length > 0) {
            createStudentStaar($scope.districtData, $scope.recordType, $scope.sortType);
        }
    });

    $scope.$watch('recType', function (value) {
        if ($scope.districtData.length > 0) {
            createStudentSubject($scope.districtData, value, $scope.subType);
        }
    });

    $scope.$watch('subType', function (value) {
        if ($scope.districtData.length > 0) {
            createStudentSubject($scope.districtData, $scope.recType, value);
        }
    });

    $scope.$watch('studentSubjectState', function (value) {
        if ($scope.districtData.length > 0) {
            createStudentSubject($scope.districtData, $scope.recType, $scope.subType);
        }
    });


    function setFinalData(value) {
        if (value) {
            $scope.finalDistrictData[1] = $scope.stateDistrict;
        }
        else {
            $scope.finalDistrictData.length = $scope.finalDistrictData.length > 0 ? 1 : 0;
        }
    }

    $scope.$watch('gardChartState', function (value) {
        setFinalData(value);
        if ($scope.gardChart) {
            $scope.gardChart.dataSource.data($scope.finalDistrictData);
        }
    });

    $scope.$watch('actSatChartState', function (value) {
        setFinalData(value);
        if ($scope.actSatChart) {
            $scope.actSatChart.dataSource.data($scope.finalDistrictData);
        }
    });

    $scope.$watch('actSatAboveChartState', function (value) {
        setFinalData(value);
        if ($scope.actSatAboveChart) {
            $scope.actSatAboveChart.dataSource.data($scope.finalDistrictData);
        }
    });

    $scope.$watch('satChartState', function (value) {
        setFinalData(value);
        if ($scope.satChart) {
            $scope.satChart.dataSource.data($scope.finalDistrictData);
        }
    });

    $scope.$watch('actChartState', function (value) {
        setFinalData(value);
        if ($scope.actChart) {
            $scope.actChart.dataSource.data($scope.finalDistrictData);
        }
    });


    $scope.download = function () {
        JSONToCSV($scope.districtData, "District Data", true, $scope.fields);
    };

    function createDemoPie(data) {

        var other = 100 - data["DPETWHIP"] - data["DPETBLAP"] - data["DPETHISP"];
        var all = data["DPETALLC"];
        var pieData = [
            { category: mapper.fields["DPETHISP"].replace("of Student Count", "").replace("%", ""), value: data["DPETHISP"].toFixed(0), color: '#c3151c', number: kendo.toString(parseFloat((all * data["DPETHISP"] * 0.01).toFixed(0)), "n0") },
            { category: mapper.fields["DPETBLAP"].replace("of Student Count", "").replace("%", ""), value: data["DPETBLAP"].toFixed(0), color: '#003662', number: kendo.toString(parseFloat((all * data["DPETBLAP"] * 0.01).toFixed(0)), "n0") },
            { category: mapper.fields["DPETWHIP"].replace("of Student Count", "").replace("%", ""), value: data["DPETWHIP"].toFixed(0), color: '#fbb613', number: kendo.toString(parseFloat((all * data["DPETWHIP"] * 0.01).toFixed(0)), "n0") },
            { category: 'Other ', value: other.toFixed(0), color: '#91c63d', number: kendo.toString(parseFloat((all * other * 0.01).toFixed(0)), "n0") },
        ];

        console.log(pieData);

        $("#demoPie").kendoChart({
            //title: {
            //    text: "student demographics"
            //},
            legend: {
                visible: true,
                position: 'bottom'
            },
            seriesDefaults: {
                labels: {
                    visible: true,
                    template: "#= category #: \n #= value < 0 ? 'N/A' : value + '%' #",
                    position: function (e) {
                        if (e.category == "African American  ") {
                            return "insideEnd";
                        }
                        if (e.percentage < 0.1)
                            return "outsideEnd";
                        else
                            return "insideEnd";
                    }
                }
            },
            series: [{
                type: "pie",
                data: pieData
            }],
            tooltip: {
                visible: true,
                color: "#ffffff",
                template: "#= category #: #= value < 0 ? 'N/A' : value + '%' # ( #= dataItem.number# )",
            }
        });
    };


    function experienceChart() {

        var one = [];
        var two = [];
        var three = [];
        var four = [];
        var five = [];

        one.push($scope.districtData[0]["DPST00FP"]);
        two.push($scope.districtData[0]["DPST01FP"]);
        three.push($scope.districtData[0]["DPST06FP"]);
        four.push($scope.districtData[0]["DPST11FP"]);
        five.push($scope.districtData[0]["DPST20FP"]);

        console.log("one");
        console.log(one);

        $("#pieThing").kendoChart({
            legend: {
                visible: true
            },
            seriesDefaults: {
                type: "column",
                stack: true
            },
            series: [{
                name: "% Beginning",
                data: one,
                color: "#c3151c"
            }, {
                name: "% 1-5 Years Experience",
                data: two,
                color: "#003662"
            }, {
                name: "% 6-10 Years Experience",
                data: three,
                color: "#91c63d"
            },
            {
                name: "% 11-20 Years Experience",
                data: four,
                color: "#ef5727"
            },
            {
                name: "% 20+ Years Experience",
                data: five,
                color: "#fbb613"
            }
            ],
            valueAxis: {
                max: 100,
                line: {
                    visible: false
                },
                minorGridLines: {
                    visible: true
                },
                labels: {
                    template: "#= value.toFixed(0) # %"
                },
            },
            categoryAxis: {
                categories: [2014],
                majorGridLines: {
                    visible: false
                }
            },
            tooltip: {
                visible: true,
                template: "#= series.name #: #= value.toFixed(0) #",
                color: 'white'
            }
        });



    };



    /* District Long functions */

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
                    background: "transparent",
                    template: "#= value < 0 ? 'N/A': kendo.toString(value,\"n0\") #"
                }
            },
            plotArea: { margin: { top: 20 } },
            series: [{
                field: "DPETALLC",
                name: "United States",
                color: '#c3151c'
            }],
            valueAxis: {
                labels: {
                    format: "{0}",
                    template: "#= value < 0 ? 'N/A': kendo.toString(value,\"n0\") #"
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
            },
            tooltip: {
                visible: true,
                template: "#= category #: #= value < 0 ? 'N/A': kendo.toString(value,\"n0\") #",
                color: 'white'
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
                visible: true,
                position: 'bottom'
            },
            seriesDefaults: {
                type: "line",
                labels: {
                    visible: true,
                    format: "{0}",
                    template: "#= value < 0 ? 'N/A' : value.toFixed(0) #",
                    background: "transparent"
                }
            },
            series: [{
                field: "DPETECOP",
                name: "Low Income",
                color: "#91c63d"
            }, {
                field: "DPETLEPP",
                name: "% LEP",
                color: "#fbb613"
            }],
            valueAxis: {
                labels: {
                    format: "{0}%"
                },
                line: {
                    visible: false
                },
                min: 0
            },
            categoryAxis: {
                field: "YEAR",
                majorGridLines: {
                    visible: false
                }
            },
            tooltip: {
                visible: true,
                template: "#= series.name #: #= value < 0 ? 'N/A': value #",
                color: 'white'
            }
        });


    }

    function createDemographics() {

        var without_2004 = [];

        _.each($scope.disd, function (i, x) {
            if ($scope.disd[x]['YEAR'] != "04") {
                $scope.disd[x]['DPETWHIP'] = parseFloat($scope.disd[x]['DPETWHIP']);
                $scope.disd[x]['DPETBLAP'] = parseFloat($scope.disd[x]['DPETBLAP']);
                $scope.disd[x]['DPETHISP'] = parseFloat($scope.disd[x]['DPETHISP']);
                $scope.disd[x]['Other'] = Number((100 - ($scope.disd[x]['DPETWHIP'] + $scope.disd[x]['DPETBLAP'] + $scope.disd[x]['DPETHISP'])).toFixed(1));
                if (!isNaN(parseFloat($scope.disd[x]["DPETALLC"]))) {
                    without_2004.push($scope.disd[x]);
                }

            }
        });

        console.log("without 2004");
        console.log($scope.disd);
        console.log(without_2004);

        $("#demoChart").kendoChart({
            //title: {
            //    text: "Demographics"
            //},
            dataSource: {
                data: without_2004
            },
            plotArea: { margin: { top: 20, right: 10 } },
            legend: {
                position: "bottom"
            },
            seriesDefaults: {
                type: "area",
                stack: {
                    type: "100%"
                },
                labels: {
                    visible: false
                }
            },
            series: [
                {
                    color: '#003662',
                    name: mapper.fields['DPETBLAP'],
                    field: 'DPETBLAP'
                }, {
                    color: '#fbb613',
                    name: mapper.fields['DPETWHIP'],
                    field: 'DPETWHIP'
                }, {
                    color: '#c3151c',
                    name: mapper.fields['DPETHISP'],
                    field: 'DPETHISP'
                }, {
                    color: '#91c63d',
                    name: "Other % of Student Count",
                    field: 'Other'
                }
            ],
            valueAxis: {
                line: {
                    visible: false
                }
            },
            categoryAxis: {
                field: 'YEAR',
                majorGridLines: {
                    visible: false
                },
                labels: {
                    visible: 'true'
                }
            },
            tooltip: {
                visible: true,
                format: "{0}%",
                template: "#= series.name #: #= value < 0 ? 'N/A': value #",
                color: 'white'
            }
        });
    }

    $scope.$watch('act2ChartState', function (value) {
        createACT();
    });

    function createACT() {
        var series = [{
            field: "act_avg",
            color: "#003662",
            name: $scope.actData[0] ? $scope.actData[0]["DISTNAME"] : ""
        }];
        if ($scope.act2ChartState) {
            series.push({
                field: "state_act_avg",
                color: "#c3151c",
                name: "State"
            });
        }
        $("#actChart").kendoChart({
            dataSource: {
                data: $scope.actData
            },
            legend: {
                position: "bottom",
                visible: false
            },
            seriesDefaults: {
                type: "column",
                labels: {
                    visible: true,
                    background: "transparent",
                    template: "#= value < 0 ? 'N/A' : value.toFixed(0) #"
                }
            },
            series: series,
            valueAxis: {
                min: 0,
                majorGridLines: {
                    visible: false
                },
                visible: false,
                labels: {
                    format: '{0}'
                }
            },
            categoryAxis: {
                field: "YEAR",
                majorGridLines: {
                    visible: false
                },
                line: {
                    visible: true
                },
                labels: {
                    padding: 10
                }
            },
            tooltip: {
                visible: true,
                template: "#= category #: #= value < 0 ? 'N/A': value #",
                color: 'white'
            }
        });



    }


    $scope.$watch('sat2ChartState', function (value) {
        createSAT();
    });

    function createSAT() {
        var series = [{
            field: "sat_avg",
            color: "green",
            name: $scope.satData[0] ? $scope.satData[0]["DISTNAME"] : ""
        }];
        if ($scope.sat2ChartState) {
            series.push({
                field: "state_sat_avg",
                color: "#c3151c",
                name: "State"
            });
        }
        $("#satChart").kendoChart({
            dataSource: {
                data: $scope.satData
            },
            legend: {
                position: "bottom",
                visible: false
            },
            seriesDefaults: {
                type: "column",
                labels: {
                    visible: true,
                    background: "transparent",
                    format: "{0}",
                    template: "#= value < 0 ? 'N/A' : value.toFixed(0) #"
                }
            },
            series: series,
            valueAxis: {
                min: 0,
                majorGridLines: {
                    visible: false
                },
                visible: false
            },
            categoryAxis: {
                field: 'YEAR',
                majorGridLines: {
                    visible: false
                },
                labels: {
                    padding: 10
                }
            },
            tooltip: {
                visible: true,
                template: "#= category #: #= value < 0 ? 'N/A' : value #",
                color: 'white'
            }
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
                visible: true,
                position: 'bottom'
            },
            seriesDefaults: {
                type: "line",
                labels: {
                    visible: true,
                    format: "{0}",
                    template: "#= value < 0 ? 'N/A' : value.toFixed(0) #",
                    background: "transparent"
                }
            },
            series: [{
                field: "above",
                name: "Scored Above Criterion"//these were switched
            },
            {
                field: "taking",
                name: "Grads Taken"
            }
            ],
            valueAxis: {
                labels: {
                    format: "{0}%"
                },
                line: {
                    visible: false
                },
                min: 0
            },
            categoryAxis: {
                field: "YEAR",
                majorGridLines: {
                    visible: false
                }
            },
            tooltip: {
                visible: true,
                template: "#= series.field #: #= value < 0 ? 'N/A' : value #",
                color: 'white'
            }
        });

    }

    function createExperience() {

        without_2004 = [];

        _.each($scope.disd, function (i, x) {
            if ($scope.disd[x]['YEAR'] != "04" && !isNaN(parseFloat($scope.disd[x]['DPST01FP']))) {
                without_2004.push($scope.disd[x]);
            }
        });

        $("#longExperienceChart").kendoChart({
            //title: {
            //    text: "Teacher Experience Average"
            //},
            legend: {
                visible: true,
                position: 'bottom'
            },
            seriesDefaults: {
                type: "column",
                stack: true
            },
            series: [{
                name: "Beginning",
                data: _.map(_.pluck(without_2004, 'DPST00FP'), function (y) { return parseFloat(y); }),
                color: "#91c63d"
            }, {
                name: "1-5 Years Experience",
                data: _.map(_.pluck(without_2004, 'DPST01FP'), function (y) { return parseFloat(y); }),
                color: "#fbb613"
            }, {
                name: "6-10 Years Experience",
                data: _.map(_.pluck(without_2004, 'DPST06FP'), function (y) { return parseFloat(y); }),
                color: "#c3151c"
            }, {
                name: "11-20 Years Experience",
                data: _.map(_.pluck(without_2004, 'DPST11FP'), function (y) { return parseFloat(y); }),
                color: "#0086a1"
            }, {
                name: "20+ Years Experience",
                data: _.map(_.pluck(without_2004, 'DPST20FP'), function (y) { return parseFloat(y); }),
                color: "#003662"
            }],
            valueAxis: {
                max: 100,
                line: {
                    visible: false
                },
                minorGridLines: {
                    visible: true
                },
                labels: {
                    format: "{0}%"
                }
            },
            categoryAxis: {
                categories: _.pluck(without_2004, 'YEAR'),
                majorGridLines: {
                    visible: false
                }
            },
            tooltip: {
                visible: true,
                template: "#= series.name #: #= value.toFixed(1)# % ",
                color: 'white'
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
            var thisValue = (parseFloat($scope.selectedStaar[x]['rec']) * 100).toFixed(0);
            //reset
            $scope.selectedStaarCleaned.push({ myField: thisValue, name: mapper.fields[$scope.selectedStaar[x]['SUBJECT'] + $scope.selectedStaar[x]['GRADE'] + "_rec"].split(",")[0], YEAR: $scope.selectedStaar[x]['YEAR'] });

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
                    template: "#= value < 0 ? 'N/A' : value + '%' #"
                    //template: "#= value.toFixed(0) #%",
                    //background: "transparent"
                }
            },
            series: [
                {
                    name: "12",
                    data: _.pluck(twelve, 'myField'),
                    color: '#003662'
                }, {
                    name: "13",
                    data: _.pluck(thirteen, 'myField'),
                    color: '#c3151c'
                }, {
                    name: "14",
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
                },
                labels: {
                    format: "{0}%"
                }
            },
            categoryAxis: {
                categories: _.pluck(fourteen, 'name'),
                labels: {
                    padding: 10
                }
            },
            tooltip: {
                visible: true,
                template: "#= series.name #: #= value < 0 ? 'N/A' : value + '%' #",
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
                name: "Hispanic",
                color: 'purple'
            },
            {
                field: "Econ",
                name: "Low Income",
                color: 'green'
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
            },
            tooltip: {
                visible: true,
                template: "#= series.name #: #= value #",
                color: 'white'
            }
        });

    };

    /* End of dist Long */


    $(".csvExport").on("click", function () {
        var chartType = $(this).attr("data-chart");
        var chartData = chartMapper[chartType].data();
        console.log(chartData);
        JSONToCSV(chartData, chartType, true, $scope.fields);
    });

    $(".imageExport").on("click", function () {
        var chartType = $(this).attr("data-chart");
        var chart = chartMapper[chartType].kChart();
        var imageDataURL = chart.imageDataURL();
        this.href = d2bURI(imageDataURL);
    });
});