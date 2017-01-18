angular.module('myApp').factory('districtLong', ['district2015Data', '$timeout', '$http', 'fieldMapper', 'd2bURI', 'JSONToCSV', '$q', function (district2015Data, $timeout, $http, fieldMapper, d2bURI, JSONToCSV, $q) {
    var chartMapper, $scope;

    return new function () {
        var self = this;

        var colors = ["#c3151c", "#003662", "#fbb613", "#0086a1", "#ef5727", "#91c63d"];

        var extendChartMapper = function (chartMapper) {
            chartMapper.economicsTime = {
                kChart: function () {
                    return $("#economicsTime").data("kendoChart");
                },
                data: function () {
                    return _.map($scope.districtDemographicsTime, function (i) { return _.pick(i, "DISTRICT", "YEAR", "DPETWHIP", "DPETBLAP", "DPETHISP"); });
                }
            };
            chartMapper.demographicsTime = {
                kChart: function () {
                    return $("#demoGraphicsTime").data("kendoChart");
                },
                data: function () {
                    return _.map($scope.districtDemographicsTime, function (i) { return _.pick(i, "DISTRICT", "YEAR", "DPETLEPP", "DPETECOP"); });
                }
            };
            chartMapper.enrollmentTime = {
                kChart: function () {
                    return $("#enrollmentTime").data("kendoChart");
                },
                data: function () {
                    return _.map($scope.districtDemographicsTime, function (i) { return _.pick(i, "DISTRICT", "YEAR", "DPETALLC"); });
                }
            };
            chartMapper.satTime = {
                kChart: function () {
                    return $("#satTime").data("kendoChart");
                },
                data: function () {
                    return _.map($scope.districtSatActTime, function (i) { return _.pick(i, "DISTRICT", "YEAR", "DA0CSA*R"); });
                }
            };
            chartMapper.actTime = {
                kChart: function () {
                    return $("#actTime").data("kendoChart");
                },
                data: function () {
                    return _.map($scope.districtSatActTime, function (i) { return _.pick(i, "DISTRICT", "YEAR", "DA0CAA*R"); });
                }
            };
            chartMapper.satActTime = {
                kChart: function () {
                    return $("#satActTime").data("kendoChart");
                },
                data: function () {
                    return _.map($scope.districtSatActTime, function (i) { return _.pick(i, "DISTRICT", "YEAR", "DA0CC*R", "DA0CT*R"); });
                }
            };
        };

        var initScope = function () {


            $scope.$watch('satTimeState', function (newValue, oldValue) {
                if (newValue == undefined) return;
                createSatTime();
            });

            $scope.$watch('actTimeState', function (newValue, oldValue) {
                if (newValue == undefined) return;
                createActTime();
            });
        };

        this.Init = function (scope, chartMapper) {
            $scope = scope;
            initScope();
            extendChartMapper(chartMapper);
        };

        this.CreateDemographicsTime = function (district) {

            return district2015Data.getDemograhicsTime(district).then(function (response) {
                $scope.districtDemographicsTime = response.data;
                createDemographicsTime();
                createEconomicsTime();
                createEnrollmentTime();
            });

        };

        this.CreateSatActTime = function (district) {
            /*return district2015Data.getSatActTime(district).then(function (data) {
                _.each(data, function (i) {
                    if (i[0].DISTRICT == "'1") {
                        $scope.stateSatActTime = i;
                    }
                    else {
                        $scope.districtSatActTime = i;
                    }
                });
                createSatTime();
                createActTime();
                createSatActTime();
            });*/
        };

        /* Chart Functions */

        function createEconomicsTime() {
            $("#economicsTime").kendoChart({
                dataSource: {
                    data: $scope.districtDemographicsTime
                },
                legend: {
                    visible: true,
                    position: 'bottom'
                },
                seriesDefaults: {
                    type: "line",
                    labels: {
                        visible: true,
                        format: "{0}",
                        template: "#= (!value || value < 0) ? 'N/A' : value.toFixed(0) #",
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
                    labels: {
                        rotation: -70,
                        padding: { right: 10 }
                    },
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

        function createDemographicsTime() {

            var data = [];

            _.each($scope.districtDemographicsTime, function (item, index) {
                item['Other'] = Number((100 - (item['DPETWHIP'] + item['DPETBLAP'] + item['DPETHISP'])).toFixed(1));
                if (!isNaN(Number(item["DPETALLC"]))) {
                    data.push(item);
                }
            });

            $("#demographicsTime").kendoChart({
                //title: {
                //    text: "Demographics"
                //},
                dataSource: {
                    data: data
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
                        name: '% ' + fieldMapper.district['DPETBLAP'].replace("Student: ", "").replace(" Percent", ""),
                        field: 'DPETBLAP'
                    }, {
                        color: '#fbb613',
                        name: '% ' + fieldMapper.district['DPETWHIP'].replace("Student: ", "").replace(" Percent", ""),
                        field: 'DPETWHIP'
                    }, {
                        color: '#c3151c',
                        name: '% ' + fieldMapper.district['DPETHISP'].replace("Student: ", "").replace(" Percent", ""),
                        field: 'DPETHISP'
                    }, {
                        color: '#91c63d',
                        name: "% Others",
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
                        visible: 'true',
                        rotation: -70,
                        padding: { right: 10 }
                    }
                },
                tooltip: {
                    visible: true,
                    format: "{0}%",
                    template: "#= series.name #: #= value < 0 ? 'N/A': value #",
                    color: 'white'
                }
            });
        };


        function createEnrollmentTime() {
            $("#enrollmentTime").kendoChart({
                dataSource: {
                    data: $scope.districtDemographicsTime
                },
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
                    name: fieldMapper.district['DPETALLC'],
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
                    labels: {
                        rotation: -70,
                        padding: { right: 10 }
                    },
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

        };

        function createSatTime() {
            var data = [];
            _.each($scope.districtSatActTime, function (i) {
                var stateItem = _.find($scope.stateSatActTime, function (s) { return s.YEAR == i.YEAR }) || {};
                if (i["DA0CSA*R"] || stateItem["DA0CSA*R"]) {
                    data.push({ DISTRICT: i.DISTRICT, YEAR: ("" + i.YEAR), "sat": i["DA0CSA*R"], "state_sat": stateItem["DA0CSA*R"] });
                }

            });

            var series = [{
                field: "sat",
                color: "green",
                name: $scope.selectedDistrict.DISTNAME
            }];

            if ($scope.satTimeState) {
                series.push({
                    field: "state_sat",
                    color: "#c3151c",
                    name: "State"
                });
            }

            $("#satTime").kendoChart({
                dataSource: {
                    data: data
                },
                plotArea: { margin: { top: 20 } },
                legend: {
                    position: "bottom",
                    visible: $scope.satTimeState
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
            });
        };

        function createActTime() {

            var data = [];
            _.each($scope.districtSatActTime, function (i) {
                var stateItem = _.find($scope.stateSatActTime, function (s) { return s.YEAR == i.YEAR }) || {};
                if (i["DA0CAA*R"] || stateItem["DA0CAA*R"]) {
                    data.push({ DISTRICT: i.DISTRICT, YEAR: ("" + i.YEAR), "act": i["DA0CAA*R"], "state_act": stateItem["DA0CAA*R"] });
                }

            });

            var series = [{
                field: "act",
                color: "#003662",
                name: $scope.selectedDistrict.DISTNAME
            }];

            if ($scope.actTimeState) {
                series.push({
                    field: "state_act",
                    color: "#c3151c",
                    name: "State"
                });
            }

            $("#actTime").kendoChart({
                dataSource: {
                    data: data
                },
                plotArea: { margin: { top: 20 } },
                legend: {
                    position: "bottom",
                    visible: $scope.actTimeState
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
                        padding: 10,
                        visible: true
                    }
                },
                tooltip: {
                    visible: true,
                    template: "#= category #: #= value < 0 ? 'N/A': value #",
                    color: 'white'
                }
            });
        };

        function createSatActTime() {
            var data = [];
            _.each($scope.districtSatActTime, function (i) {
                data.push({ DISTRICT: i.DISTRICT, YEAR: ("" + i.YEAR).substr(2), "above": i["DA0CC*R"], "taking": i["DA0CT*R"] });
            });
            $("#satActTime").kendoChart({
                dataSource: {
                    data: data
                },
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
                    name: "Grads Taking Exam"
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
                    template: "#= series.name #: #= value < 0 ? 'N/A' : value #",
                    color: 'white'
                }
            });

        };

    };
}]);