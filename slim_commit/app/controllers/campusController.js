angular.module('myApp').controller('campusController', function ($scope, $routeParams, $location, allData, $timeout, mapper, d2bURI, JSONToCSV, $filter) {

    $scope.tooltipOptions = {
        content: function (event) { var selector = "#" + event.target.attr('data-chart') + "Doc"; return $(selector).html(); },
        position: "left"
    };

    $scope.boxTooltipOptions = {
        content: function (event) { var selector = "#" + event.target.attr('data-div'); return $(selector).html(); },
        position: "left"
    };

    $scope.recType = "staar4";
    $scope.subType = "A00";
    $scope.demoType = "A00";
    $scope.chartType = "year";
    $scope.recordType = "rec";
    $scope.longRecordType = "rec";
    $scope.fields = mapper.fields;


    var chartMapper = {
        studentStaar: {
            kChart: function () { return $("#studentStaar").data("kendoChart"); },
            data: function () {
                return [_.pick($scope.selectedCampus, "CAMPNAME", "m3_rec", "r3_rec", "m4_rec", "r4_rec", "w4_rec", "m5_rec", "r5_rec", "s5_rec", "r6_rec", "m6_rec", "r7_rec", "m7_rec", "w7_rec", "r8_rec", "m8_rec", "h8_rec", "s8_rec", "a1EOC_rec", "e1EOC_rec", "e2EOC_rec", "biEOC_rec", "usEOC_rec",
                "m3_ph1", "r3_ph1", "m4_ph1", "r4_ph1", "w4_ph1", "m5_ph1", "r5_ph1", "s5_ph1", "r6_ph1", "m6_ph1", "r7_ph1", "m7_ph1", "w7_ph1", "r8_ph1", "m8_ph1", "h8_ph1", "s8_ph1", "a1EOC_ph1", "e1EOC_ph1", "e2EOC_ph1", "biEOC_ph1", "usEOC_ph1")];
            }
        },
        studentSubject: {
            kChart: function () {
                return $("#studentSubject").data("kendoChart");
            },
            data: function () {
                var processedData = _.each($scope.subjectStaarData, function (i) { i.value = i.value / 100; });
                return _.map($scope.subjectStaarData, function (item) { return _.pick(item, 'district', 'year', 'demo', 'subject', 'value', 'table') });

            }
        },
        ACTAverage: {
            kChart: function () {
                return $scope.actChart;
            },
            data: function () {
                return [_.pick($scope.selectedCampus, "CAMPNAME", "CA0CAASTR", "CB0CAASTR", "CH0CAASTR", "CW0CAASTR")];
            }
        },
        SATAverage: {
            kChart: function () {
                return $scope.satChart;
            },
            data: function () {
                return [_.pick($scope.selectedCampus, "CAMPNAME", "CA0CSASTR", "CB0CSASTR", "CH0CSASTR", "CW0CSASTR")];
            }
        },
        ACTSATAverage: {
            kChart: function () {
                return $scope.actSatChart;
            },
            data: function () {
                return [_.pick($scope.selectedCampus, "CAMPNAME", 'DA0CTSTR', 'DB0CTSTR', 'DH0CTSTR', 'DW0CTSTR')];
            }
        },
        ACTSATAboveCriterion: {
            kChart: function () {
                return $scope.actSatAboveChart;
            },
            data: function () {
                return [_.pick($scope.selectedCampus, "CAMPNAME", 'DA0CCSTR', 'DB0CCSTR', 'DH0CCSTR', 'DW0CCSTR')];
            }
        },
        studentDemo: {
            kChart: function () {
                return $("#demoPie").data("kendoChart");
            },
            data: function () {
                return [_.pick($scope.selectedCampus, "CAMPNAME", "YEAR", "CPETHISP", "CPETBLAP", "CPETWHIP")];
            }
        },
        graduationRates: {
            kChart: function () {
                return $scope.gardChart;
            },
            data: function () {
                return [_.pick($scope.selectedCampus, "CAMPNAME", 'CAGC4STR', 'CBGC4STR', 'CEGC4STR', 'CHGC4STR', 'CLGC4STR', 'CWGC4STR')];
            }
        },
        teacherExperience: {
            kChart: function () {
                return $("#pieThing").data("kendoChart");
            },
            data: function () {
                return [_.pick($scope.selectedCampus, "CAMPNAME", "CPST00FP", "CPST01FP", "CPST06FP", "CPST11FP", "CPST20FP")];
            }
        },
        campusDemoChart: {
            kChart: function () { return $("#campusDemoChart").data("kendoChart"); },
            data: function () {
                return _.map($scope.campusLongData, function (item) { return _.pick(item, 'CAMPUS', 'CAMPNAME', 'YEAR', 'CPETWHIP', 'CPETBLAP', 'CPETHISP') });
            }
        },
        campusLongEnrollmentChart: {
            kChart: function () { return $("#campusLongEnrollmentChart").data("kendoChart"); },
            data: function () {
                return _.map($scope.campusLongData, function (item) { return _.pick(item, 'CAMPUS', 'CAMPNAME', 'YEAR', 'CPETALLC') });
            }
        },
        longEco: {
            kChart: function () {
                return $scope.longEco;
            },
            data: function () {
                return _.map($scope.campusLongData, function (item) { return _.pick(item, 'CAMPUS', 'CAMPNAME', 'YEAR', 'CPETECOP') });
            }
        },
        longMobility: {
            kChart: function () {
                return $scope.longMobility;
            },
            data: function () {
                return _.map($scope.campusLongData, function (item) { return _.pick(item, 'CAMPUS', 'CAMPNAME', 'YEAR', 'CPEMALLP') });
            }
        },
        longStaar: {
            kChart: function () { return $("#longStaar").data("kendoChart"); },
            data: function () {
                return _.map($scope.selectedCampusStaar, function (item) { return _.pick(item, 'CAMPNAME', 'Year', 'Subject', 'Grade', 'number_tested', 'satis_ph1_nm', 'satis_rec_nm') });
            }
        }
    };


    $scope.download = function () {
        JSONToCSV($scope.campusData, "Campus Data", true, $scope.fields);
    };

    $scope.validate = function () {
        if (!$scope.selectedCampus) {
            return false;
        }
        var sum = $scope.selectedCampus["CA0CTSTR"] + $scope.selectedCampus["CB0CTSTR"] + $scope.selectedCampus["CH0CTSTR"] + $scope.selectedCampus["CW0CTSTR"]
        + $scope.selectedCampus["CA0CCSTR"] + $scope.selectedCampus["CB0CCSTR"] + $scope.selectedCampus["CH0CCSTR"] + $scope.selectedCampus["CW0CCSTR"]
        + $scope.selectedCampus["CA0CSASTR"] + $scope.selectedCampus["CB0CSASTR"] + $scope.selectedCampus["CH0CSASTR"] + $scope.selectedCampus["CW0CSASTR"]
        + $scope.selectedCampus["CA0CAASTR"] + $scope.selectedCampus["CB0CAASTR"] + $scope.selectedCampus["CH0CAASTR"] + $scope.selectedCampus["CW0CAASTR"];
        return sum > 16;
    };

    $scope.countyChange = function () {
        console.log($scope.selectedCounty);
        if (!$scope.selectedCounty) return;
        $scope.districts = null;
        $scope.campuses = null;
        $scope.selectedDistrict = null;
        $scope.selectedCampus = null;
        allData.getDistricts($scope.selectedCounty.COUNTY).success(function (data) {
            $scope.selectedDistrict = { DISTRICT: null, DISTNAME: "All" };
            data.unshift($scope.selectedDistrict);
            $scope.districts = _.sortBy($filter('unique')(data, 'DISTNAME'), 'DISTNAME');
            $scope.districtChange();
        });
    };

    $scope.districtChange = function () {
        console.log($scope.selectedDistrict);
        if (!$scope.selectedDistrict) return;
        $scope.campuses = null;
        $scope.selectedCampus = null;
        allData.getCampuses($scope.selectedDistrict.DISTRICT).success(function (data) {
            $scope.campuses = _.sortBy(data, 'CAMPNAME');
        });
    };


    $scope.campusChange = function () {
        if ($scope.selectedCampus && $scope.selectedCampus.CAMPUS) {
            console.log($scope.selectedCampus.CAMPUS);
            $location.path("campus/" + $scope.selectedCampus.CAMPUS);
        }
    };

    function initLong(campus) {
        allData.getCampLong("'" + campus.CAMPUS).success(function (data) {
            $scope.campusLongData = _.filter(data, function (item) { item.CAMPNAME = campus.CAMPNAME; return item["CPETALLC"] > 0; });
            createDemographics();
            createEnrollment();
        });
        allData.getCampLongStaar("'" + campus.CAMPUS).success(function (data) {
            _.each(data, function (item) { item.CAMPNAME = campus.CAMPNAME; });
            $scope.selectedCampusStaar = data;
            createLongStaar($scope.longRecordType);
        });
    };


    /* Campus Long charts */

    $scope.$watch('longRecordType', function (value) {
        if ($scope.selectedCampusStaar) {
            createLongStaar(value);
        }
    });

    $scope.subjects = [{ Name: "Math", Code: "m", checked: false }, { Name: "Biology", Code: "b", checked: false },
                        { Name: "Reading", Code: "r", checked: true }, { Name: "Writing", Code: "w", checked: true },
                        { Name: "English", Code: "e", checked: false }, { Name: "Algebra", Code: "a", checked: false }, { Name: "US History", Code: "u", checked: false }];

    $scope.subChecked = 2;

    $scope.checkChanged = function (item) {
        if (item.checked) $scope.subChecked++;
        else $scope.subChecked--;
        createLongStaar($scope.longRecordType);
    }

    function createLongStaar(longRecType) {

        function colorDict(subject) {
            var subCode = subject.charAt(0);
            switch (subCode) {
                case 'r': return '#c3151c';
                case 'w': return '#ef5727';
                case 'm': return '#003662';
                case 's': return '#0086a1';
                case 'h': return '#fbb613';
                case 'a': return '#003662';
                case 'e': return '#91c63d';
                case 'b': return '#0086a1';
                case 'u': return '#fbb613';
                default: return '#000000';
            }
        };

        var selectedSubjects = _.filter($scope.subjects, function (item) { return item.checked; });
        var subjectCodes = _.map(selectedSubjects, function (item) { return item.Code; })
        var selectedData = [];
        var allData = [];
        _.each($scope.selectedCampusStaar, function (i, x) {
            var subjectGrade = $scope.selectedCampusStaar[x]['Subject'] + $scope.selectedCampusStaar[x]['Grade'];
            if ($scope.selectedCampusStaar[x]["number_tested"] != 0) {
                var thisValue = (parseFloat($scope.selectedCampusStaar[x]["satis_" + longRecType + "_nm"] / $scope.selectedCampusStaar[x]["number_tested"]) * 100).toFixed(0);
                var dataItem = {
                    color: colorDict(subjectGrade),
                    myField: thisValue,
                    subjectGrade: mapper.fields[subjectGrade + "_" + longRecType].split(",")[0],
                    year: $scope.selectedCampusStaar[x]['Year'],
                    subject: $scope.selectedCampusStaar[x]['Subject']
                };
                if (subjectCodes.indexOf($scope.selectedCampusStaar[x]['Subject'].charAt(0)) > -1) {
                    selectedData.push(dataItem);
                }
                allData.push(dataItem);

            }


        });

        if ($scope.selectedCampusStaar.length < 1 || !_.find(allData, function (item) { return item.myField != "0"; })) {
            $("#longStaarDiv").hide();
            return;
        }
        selectedData = _.sortBy(selectedData, 'subject');
        $("#longStaarDiv").show();
        $("#longStaar").kendoChart({
            dataSource: {
                data: selectedData
            },
            legend: {
                position: 'bottom',
                visible: true
            },
            seriesDefaults: {
                type: "column",
                labels: {
                    visible: true,
                    background: "transparent",
                    template: "#= value < 0 ? 'N/A' : value # %"
                }
            },
            series: [
                {
                    field: "myField"
                }
            ],
            valueAxis: {
                majorGridLines: {
                    visible: false
                },
                labels: {
                    template: "#: value # %"
                },
                visible: true,
                min: 0,
                max: 100
            },
            categoryAxis: {
                field: "subjectGrade",
                majorGridLines: {
                    visible: false
                },
                line: {
                    visible: true
                },
                labels: {
                    rotation: -70,
                    padding: { right: 10 },
                    template: "#= value # (20#= dataItem.year  #)"
                }
            },
            tooltip: {
                visible: true,
                color: 'white',
                template: " #= dataItem.subjectGrade # (20#= dataItem.year  #) : #= value < 0 ? 'N/A' : value # %"
            }
        });

    };

    function createEnrollment() {

        $("#campusLongEnrollmentChart").kendoChart({
            dataSource: {
                data: $scope.campusLongData
            },
            legend: {
                position: 'bottom'
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
                field: "CPETALLC",
                name: "Enrollment",
                color: '#003662'
            }],
            plotArea: { margin: { top: 20 } },
            valueAxis: {
                labels: {
                    format: "{0}"
                },
                line: {
                    visible: true
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
                color: 'white',
                template: "#= dataItem.YEAR  #: #= value #"
            }
        });
    };


    function createDemographics() {
        _.each($scope.campusLongData, function (item) {
            var other = 100 - (item["CPETWHIP"] + item["CPETBLAP"] + item["CPETHISP"]);
            item["Other"] = other;
        })


        console.log("DDDDDDDDDDDDDDDD");
        console.log($scope.campusLongData);
        $("#campusDemoChart").kendoChart({
            legend: {
                position: "bottom"
            },
            dataSource: { data: $scope.campusLongData },
            seriesDefaults: {
                type: "area",
                stack: {
                    type: "100%"
                }
            },
            plotArea: { margin: { top: 20 } },
            series: [
                 {
                     color: '#003662',
                     name: "African American",
                     field: 'CPETBLAP'
                 }, {
                     color: '#fbb613',
                     name: "White",
                     field: 'CPETWHIP'
                 }, {
                     color: '#ef5727',
                     name: "Hispanic",
                     field: 'CPETHISP'
                 },
                {
                    color: '#91c63d',
                    name: "Other",
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
                }
            },
            tooltip: {
                visible: true,
                color: 'white',
                template: "#= series.name # : #= value.toFixed(0) #%"
            }
        });
    };



    /* End of Campus Long charts */


    function init() {

        $scope.spinner = true;

        var campusID = $routeParams.campusID || '057905022';

        allData.getCounties().success(function (data) {

            $scope.counties = data;
            $scope.selectedCounty = _.findWhere($scope.counties, { COUNTY: "'" + campusID.substr(0, 3) });
        });

        allData.getDistricts("'" + campusID.substr(0, 3)).success(function (data) {
            $scope.districts = _.sortBy($filter('unique')(data, 'DISTNAME'), 'DISTNAME');
            $scope.selectedDistrict = _.findWhere($scope.districts, { DISTRICT: "'" + campusID.substr(0, 6) });
        });

        allData.getCampuses("'" + campusID.substr(0, 6)).success(function (data) {
            $scope.campuses = _.sortBy(data, 'CAMPNAME');
            $scope.selectedCampus = _.findWhere($scope.campuses, { CAMPUS: campusID });
            console.log($scope.selectedCampus);
            $scope.map.center = {
                latitude: $scope.selectedCampus["LATITUDE"],
                longitude: $scope.selectedCampus["LONGITUDE"]
            };
            $scope.campusData = [$scope.selectedCampus];

            allData.getCampStaarSubAll($scope.selectedCampus.CAMPUS).success(function (data) {
                $scope.spinner = false;
                $scope.subjectStaarData = data;
                createStudentSubject($scope.selectedCampus.CAMPUS, 'staar4', 'A00', 'A00', 'year');
            });

            allData.getCampStaar($scope.selectedCampus.CAMPUS).success(function (data) {
                angular.extend($scope.selectedCampus, data);
                createStudentStaar($scope.campusData, 'rec');
            });

            createDemoPie($scope.selectedCampus);
            experienceChart();
            initLong($scope.selectedCampus);
        });
    };

    $scope.$on("$viewContentLoaded", function () {
        $timeout(init, 100);
    });


    $scope.$watch('recType', function (value) {
        if ($scope.selectedCampus) {
            createStudentSubject($scope.selectedCampus.CAMPUS, value, $scope.subType, $scope.demoType, $scope.chartType);
        }
    });

    $scope.$watch('subType', function (value) {
        if ($scope.selectedCampus) {
            createStudentSubject($scope.selectedCampus.CAMPUS, $scope.recType, value, $scope.demoType, $scope.chartType);
        }
    });

    $scope.$watch('demoType', function (value) {
        if ($scope.selectedCampus) {
            createStudentSubject($scope.selectedCampus.CAMPUS, $scope.recType, $scope.subType, value, $scope.chartType);
        }
    });

    $scope.$watch('chartType', function (value) {
        if ($scope.selectedCampus) {
            createStudentSubject($scope.selectedCampus.CAMPUS, $scope.recType, $scope.subType, $scope.demoType, value);
        }
    });

    function createStudentSubject(campus, recType, subType, demoType, chartType) {
        var filteredData = _.where($scope.subjectStaarData, { table: recType, subject: subType, demo: demoType });
        var campusEntries = _.filter(filteredData, function (i) { return i.district == ("'" + campus); });
        var districtEntries = _.filter(filteredData, function (i) { return i.district == ("'" + campus.substr(0, 6)); });
        var stateEntries = _.filter(filteredData, function (i) { return i.district == "'1"; });
        var campusSeries = [], districtSeries = [], stateSeries = [];
        for (i = 2012; i <= 2014; i++) {
            var campusItem = _.findWhere(campusEntries, { year: i });
            var districtItem = _.findWhere(districtEntries, { year: i });
            var stateItem = _.findWhere(stateEntries, { year: i });
            campusSeries.push(campusItem && campusItem.value ? campusItem.value : -1);
            districtSeries.push(districtItem && districtItem.value ? districtItem.value : -1);
            stateSeries.push(stateItem && stateItem.value ? stateItem.value : -1);
        }
        var series, categories;

        if (chartType == 'year') {
            series = [{
                name: "Campus",
                data: campusSeries,
                color: '#91c63d'
            }, {
                name: "District",
                data: districtSeries,
                color: '#003662'
            }, {
                name: "State",
                data: stateSeries,
                color: '#c3151c'
            }];
            categories = [2012, 2013, 2014];
        }
        else {
            categories = ['Campus', 'District', 'State'];
            mapped = [];
            for (var i = 0; i < 3; i++) {
                mapped.push([campusSeries[i], districtSeries[i], stateSeries[i]]);
            }
            series = [{
                name: "2012",
                data: mapped[0],
                color: '#91c63d'
            }, {
                name: "2013",
                data: mapped[1],
                color: '#003662'
            }, {
                name: "2014",
                data: mapped[2],
                color: '#c3151c'
            }];
        }
        console.log(series);
        $("#studentSubject").kendoChart({
            legend: {
                position: "bottom"
            },
            seriesDefaults: {
                type: "column",
                labels: {
                    visible: true,
                    template: "#= value < 0 ? 'N/A' : value.toFixed(0) + '%' #",
                }
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
                min: 0,
                max: 100
            },
            categoryAxis: {
                categories: categories
            },
            tooltip: {
                visible: true,
                template: "#= series.name #: #= value < 0 ? 'N/A' : value.toFixed(0) + '%' #",
                color: 'white'
            }
        });


    };



    function experienceChart() {

        var one = [];
        var two = [];
        var three = [];
        var four = [];
        var five = [];

        one.push($scope.selectedCampus["CPST00FP"]);
        two.push($scope.selectedCampus["CPST01FP"]);
        three.push($scope.selectedCampus["CPST06FP"]);
        four.push($scope.selectedCampus["CPST11FP"]);
        five.push($scope.selectedCampus["CPST20FP"]);

        $("#pieThing").kendoChart({
            legend: {
                position: "bottom"
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
                template: "#= series.name #: #= value.toFixed(0) # %",
                color: 'white'
            }
        });
    };


    function createDemoPie(data) {

        var other = 100 - data["CPETWHIP"] - data["CPETBLAP"] - data["CPETHISP"];
        var pieData = [
            { category: mapper.fields["CPETHISP"].replace("of Student Count", ""), value: data["CPETHISP"].toFixed(1), color: '#c3151c' },
            { category: mapper.fields["CPETBLAP"].replace("of Student Count", ""), value: data["CPETBLAP"].toFixed(1), color: '#003662' },
            { category: mapper.fields["CPETWHIP"].replace("of Student Count", ""), value: data["CPETWHIP"].toFixed(1), color: '#fbb613' },
            { category: '% Other', value: other.toFixed(1), color: '#91c63d' },
        ];



        $("#demoPie").kendoChart({
            legend: {
                position: 'bottom'
            },
            seriesDefaults: {
                labels: {
                    visible: true,
                    position: function (e) {
                        if (e.category == "African American  ") {
                            return "insideEnd";
                        }

                        if (e.percentage < 0.1)
                            return "outsideEnd";
                        else
                            return "insideEnd";
                    },
                    template: "#= category.replace('%','') #: \n #= value < 0 ? 'N/A' : value + '%' #"
                }
            },
            series: [{
                type: "pie",
                data: pieData
            }],
            tooltip: {
                visible: true,
                format: "{0}%",
                color: "#ffffff"
            }
        });
    };

    $scope.$watch('recordType', function (value) {
        if ($scope.selectedCampus) {
            createStudentStaar([$scope.selectedCampus], value);
        }
    });

    function createStudentStaar(data, recordType) {
        console.log(recordType);

        var series = [{ field: "m3_" + recordType, name: "3 Math", color: '#003662' },
                        { field: "m4_" + recordType, name: "4 Math", color: '#003662' },
                        { field: "m5_" + recordType, name: "5 Math", color: '#003662' },
                        { field: "m6_" + recordType, name: "6 Math", color: '#003662' },
                        { field: "m7_" + recordType, name: "7 Math", color: '#003662' },
                        { field: "m8_" + recordType, name: "8 Math", color: '#003662' },
                        { field: "r3_" + recordType, name: "3 Reading", color: '#c3151c' },
                        { field: "r4_" + recordType, name: "4 Reading", color: '#c3151c' },
                        { field: "r5_" + recordType, name: "5 Reading", color: '#c3151c' },
                        { field: "r6_" + recordType, name: "6 Reading", color: '#c3151c' },
                        { field: "r7_" + recordType, name: "7 Reading", color: '#c3151c' },
                        { field: "r8_" + recordType, name: "8 Reading", color: '#c3151c' },
                        { field: "w4_" + recordType, name: "4 Writing", color: '#ef5727' },
                        { field: "w7_" + recordType, name: "7 Writing", color: '#ef5727' },
                        { field: "s5_" + recordType, name: "5 Science", color: '#0086a1' },
                        { field: "s8_" + recordType, name: "8 Science", color: '#0086a1' },
                        { field: "h8_" + recordType, name: "8 History", color: '#fbb613' },
                        { field: "a1EOC_" + recordType, name: "Algebra 1", color: '#003662' },
                        { field: "e1EOC_" + recordType, name: "English 1", color: '#c3151c' },
                        { field: "e2EOC_" + recordType, name: "English 2", color: '#c3151c' },
                        { field: "biEOC_" + recordType, name: "Biology", color: '#0086a1' },
                        { field: "usEOC_" + recordType, name: "US History", color: '#fbb613' }
        ];

        $scope.targetedSeries = _.filter(series, function (item) { return $scope.selectedCampus[item.field]; });

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
                    template: "#=  value < 0 ? 'N/A' : (value*100).toFixed(0) + '%' #",
                }
            },
            tooltip: {
                visible: true,
                template: "#= series.name #: #= value < 0 ? 'N/A' :(value*100).toFixed(0) + '%' #",
                color: 'white'
            },
            dataSource: {
                data: data
            },
            series: $scope.targetedSeries,
            valueAxis: {
                majorGridLines: {
                    visible: true
                },
                labels: {
                    template: "#= (value*100).toFixed(0) # %"
                },
                visible: true,
                min: 0,
                max: 1,
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

    // var styler = [{ "featureType": "all", "stylers": [{ "saturation": 0 }, { "hue": "#e7ecf0" }] }, { "featureType": "road", "stylers": [{ "saturation": -70 }] }, { "featureType": "transit", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi", "stylers": [{ "visibility": "off" }] }, { "featureType": "water", "stylers": [{ "visibility": "simplified" }, { "saturation": -60 }] }];

    $scope.map = {
        center: {
            latitude: 32.833992,
            longitude: -96.791640
        },
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
        //styles: styler
    };
});