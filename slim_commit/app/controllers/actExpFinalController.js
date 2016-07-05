angular.module('myApp').controller('actExpFinalController', ['$scope', '$routeParams', '$location', '$timeout', '$filter', 'sqlData', 'CacheFactory', 'mapper', function ($scope, $routeParams, $location, $timeout, $filter, sqlData, CacheFactory, mapper) {

    if (!CacheFactory.get('actExpCache')) {
        // or CacheFactory('bookCache', { ... });
        CacheFactory.createCache('actExpCache', {
            deleteOnExpire: 'aggressive',
            storageMode: 'localStorage',
            maxAge: 3000 // 30 seconds
        });
    }

    var actExpCache = CacheFactory.get('actExpCache');

    $scope.viewType = 'campus';
    $scope.spinner = true;
    var districtData = null;
    var selectedDist, allData;
    var colorDict = {
        "r": "#c3151c",
        "a1": "#91c63d",
        "w": "#ef5727",
        "us": "#ef5727",
        "s": "#fbb613",
        "h": "#396000",
        "m": "#003662",
        "bi": "#ef5727",
        "e1": "#0086a1",
        "e2": "#fbb613"
    };

    var orderDict = {
        "r": 2,
        "a1": 6,
        "w": 3,
        "us": 10,
        "s": 4,
        "h": 5,
        "m": 1,
        "bi": 7,
        "e1": 8,
        "e2": 9
    };


    $scope.districtOptions = {
        placeholder: "Select Districts to compare...",
        dataTextField: "DISTRICT",
        dataValueField: "DISTRICT",
        filter: "contains",
        dataSource: {
            data: []
        }
    };

    $scope.subjectGrades = [
        { Name: "Reading 3", Subject: "r", Grade: "3" },
        { Name: "Reading 4", Subject: "r", Grade: "4" },
        { Name: "Reading 5", Subject: "r", Grade: "5" },
        { Name: "Reading 6", Subject: "r", Grade: "6" },
        { Name: "Reading 7", Subject: "r", Grade: "7" },
        { Name: "Reading 8", Subject: "r", Grade: "8" },
        { Name: "Mathematics 3", Subject: "m", Grade: "3" },
        { Name: "Mathematics 4", Subject: "m", Grade: "4" },
        { Name: "Mathematics 5", Subject: "m", Grade: "5" },
        { Name: "Mathematics 6", Subject: "m", Grade: "6" },
        { Name: "Mathematics 7", Subject: "m", Grade: "7" },
        { Name: "Mathematics 8", Subject: "m", Grade: "8" },
        { Name: "Science 5", Subject: "s", Grade: "5" },
        { Name: "Science 8", Subject: "s", Grade: "8" },
        { Name: "Writing 4", Subject: "w", Grade: "4" },
        { Name: "Writing 7", Subject: "w", Grade: "7" },
        { Name: "Social Studies 8", Subject: "h", Grade: "8" },
        { Name: "U.S. History", Subject: "us", Grade: "EOC" },
        { Name: "Biology", Subject: "bi", Grade: "EOC" },
        { Name: "Algebra I", Subject: "a1", Grade: "EOC" },
        { Name: "English 1", Subject: "e1", Grade: "EOC" },
        { Name: "English 2", Subject: "e2", Grade: "EOC" }
    ];

    $scope.demoGraphics = [
        { Name: "All Students - Final Recommended %", demo: "all", yColumn: "rec" },
        { Name: "At Risk - Final Recommended %", demo: "atry", yColumn: "rec" },
        { Name: "Hispanic - Final Recommended %", demo: "ethh", yColumn: "rec" },
        { Name: "Female - Final Recommended %", demo: "sexf", yColumn: "rec" },
        { Name: "African American - Final Recommended %", demo: "ethb", yColumn: "rec" },
        { Name: "Economically Disadvantaged - Final Recommended %", demo: "ecoy", yColumn: "rec" },
        { Name: "Male - Final Recommended %", demo: "sexm", yColumn: "rec" },
        { Name: "All Students - Phase in 1 %", demo: "all", yColumn: "ph1" },
        { Name: "At Risk - Phase in 1 %", demo: "atry", yColumn: "ph1" },
        { Name: "Hispanic - Phase in 1 %", demo: "ethh", yColumn: "ph1" },
        { Name: "Female - Phase in 1 %", demo: "sexf", yColumn: "ph1" },
        { Name: "African American - Phase in 1 %", demo: "ethb", yColumn: "ph1" },
        { Name: "Economically Disadvantaged - Phase in 1 %", demo: "ecoy", yColumn: "ph1" },
        { Name: "Male - Phase in 1 %", demo: "sexm", yColumn: "ph1" }
    ];

    $scope.categories = [
        { Name: "% EcoDis", xColumn: "CPETECOP" },
        { Name: "% mobility", xColumn: "CPEMALLP" },
        { Name: "% African American", xColumn: "CPETBLAP" },
        { Name: "% Hispanic", xColumn: "CPETHISP" },
        { Name: "% LEP", xColumn: "CPETLEPP" },
        { Name: "% Special Ed", xColumn: "CPETSPEP" },
        { Name: "% White", xColumn: "CPETWHIP" },
    ];


    $scope.getHopeData = function () {
        var postValue = $scope.selectedDistricts ? $scope.selectedDistricts.slice() : [];
        postValue.push($scope.selectedDistrict);
        sqlData.getActExpAll($scope.selectedSubject.Subject, $scope.selectedSubject.Grade, $scope.selectedDemo.demo, $scope.selectedDemo.yColumn, $scope.selectedCategory.xColumn, postValue).then(function (data) {
            createHopeChart(data);
            allData = data;
        });
    };

    function createHopeChart(allData) {
        var series = [];
        _.each(allData, function (i, index) {
            if (($scope.selectedDistricts && $scope.selectedDistricts.indexOf(i.DNAME) > -1) || i.DNAME == selectedDist) {
                series.push({ name: i.CNAME + " ( " + i.CAMPUS + " )", data: [[i[$scope.selectedCategory.xColumn], i[$scope.selectedDemo.yColumn] * 100]], color: i.DNAME == selectedDist ? "#ef5727" : "#003662" });
            }
        });
        $("#hopeChart").kendoChart({
            legend: {
                position: "bottom",
                visible: false
            },
            seriesDefaults: {
                type: "scatter"
            },
            series: series,
            tooltip: {
                visible: true,
                template: "#= series.name #",
                color: 'white'
            },
            xAxis: {
                max: 101,
                title: {
                    text: $scope.selectedCategory.Name
                },
                crosshair: {
                    visible: true,
                    tooltip: {
                        visible: true,
                        format: "n1",
                        color: '#ffffff',
                        template: "#= value.toFixed(2) + '%' #",
                    }
                }
            },
            yAxis: {
                max: 101,
                title: {
                    text: $scope.selectedDemo.Name
                },
                axisCrossingValue: -5,
                crosshair: {
                    visible: true,
                    tooltip: {
                        visible: true,
                        format: "n1",
                        color: '#ffffff',
                        template: "#= value.toFixed(2) + '%' #",
                    }
                }
            }
        });
    }


    function showCampusView() {
        $scope.spinner = true;
        var campusGroups = _.groupBy(districtData, function (item) { return item.CNAME; })
        var campuses = [];
        _.each(campusGroups, function (value, key) {
            campuses.push({ Name: key, Data: value, CAMPUS: value[0].CAMPUS.substr(1) });
        });
        _.each(campuses, function (campus) {
            var fields = [];
            var chartData = {};
            _.each(campus.Data, function (data) {
                var key = data["Subject"] + data["Grade"];
                var field = { field: key, name: mapper.subjects[data["Subject"]] + " " + data["Grade"], color: colorDict[data["Subject"]], grade: data["Grade"], orderCode: orderDict[data["Subject"]] }
                chartData[key] = data["Exp_vs_Act_Per"] * 100;
                chartData[key + "tip"] = "<br />" + "Students Tested : " + data["d"] + "<br />";
                chartData[key + "tip"] += ($scope.selectedCategory.yColumn == 'rec' ? "Final Recognizaton Rate" : "Phase in 1") + " : " + (data["Final_Rec_Rate_Per"] * 100).toFixed(2) + " %<br />";
                chartData[key + "tip"] += $scope.selectedCategory.Name + " : " + (data[$scope.selectedCategory.xColumn]).toFixed(2) + " %";
                fields.push(field);
            });
            fields = $filter('orderBy')(fields, ['orderCode', 'grade']);
            //var item = _.find(fields, function (i) { return i.name == 'Total All Grades'; });
            //var index = fields.indexOf(item);
            //fields.splice(index, 1);
            //fields.push(item);
            campus.fields = fields;
            campus.chartData = [chartData];
        });
        $scope.campuses = campuses;

    };


    $scope.createCampusChart = function (campus, index) {
        $timeout(function () {
            $("#" + campus.CAMPUS).kendoChart({
                dataSource: { data: campus.chartData },
                legend: { position: 'bottom', visible: true },
                seriesDefaults: { type: 'column', labels: { visible: true, template: '#= (value).toFixed(0) # %' }, legend: { visible: true } },
                plotArea: { margin: { top: 20, bottom: 20 } },
                series: campus.fields,
                valueAxis: { labels: { template: '#=(value).toFixed(0) # %' } },
                categoryAxis: {
                    majorGridLines: { visible: false }
                },
                tooltip: { visible: true, template: '#= series.name #: #= (value).toFixed(2) # % #= dataItem[series.field+\'tip\']#', color: 'white' },
                render: function () { $scope.onRender(index); }
            });
        }, 1000);

    };

    function showSubjectView() {
        $scope.spinner = true;
        var subjectGroups = _.groupBy(districtData, function (item) { return mapper.subjects[item.Subject] + " " + item.Grade; })
        var subjects = [];
        _.each(subjectGroups, function (value, key) {
            var data = _.sortBy(value, function (i) { return i.CNAME });
            subjects.push({ Name: key, Data: data, ID: value[0].Subject + value[0].Grade });
        });
        _.each(subjects, function (subject) {

            subject.charts = [];
            var fields = [];
            var chartData = {};
            var index = 0;
            var spacing = 7 / subject.Data.length;
            var gap = 70 / (subject.Data.length * subject.Data.length);
            _.each(subject.Data, function (data) {
                var key = "c" + data["CAMPUS"].substr(1);
                var field = { field: key, name: data["CNAME"], spacing: spacing, gap: gap, color: colorDict[data["Subject"].substr(0, 2)] }
                chartData[key] = data["Exp_vs_Act_Per"] * 100;
                chartData[key + "tip"] = "<br />" + "Students Tested : " + data["d"] + "<br />";
                chartData[key + "tip"] += ($scope.selectedCategory.yColumn == 'rec' ? "Final Recognizaton Rate" : "Phase in 1") + " : " + (data["Final_Rec_Rate_Per"] * 100).toFixed(2) + " %<br />";
                chartData[key + "tip"] += $scope.selectedCategory.Name + " : " + (data[$scope.selectedCategory.xColumn]).toFixed(2) + " %";
                fields.push(field);
                index++;
                if (index % 50 == 0) {
                    subject.charts.push({ fields: fields, chartData: [chartData], id: subject.ID + subject.charts.length });
                    fields = [];
                    chartData = {};
                }
            });
            if (fields.length > 0) {
                subject.charts.push({ fields: fields, chartData: [chartData], id: subject.ID + subject.charts.length });
            }

        });
        console.log(subjects);
        $scope.subjects = subjects;

    };



    $scope.createSubjectChart = function (chart, index) {
        console.log(chart);
        $timeout(function () {
            $("#" + chart.id).kendoChart({
                dataSource: { data: chart.chartData },
                legend: { position: 'bottom', visible: true },
                seriesDefaults: { type: 'column', labels: { visible: true, template: '#= (value).toFixed(0) # %' }, legend: { visible: true } },
                plotArea: { margin: { top: 20, bottom: 20 } },
                series: chart.fields,
                valueAxis: { labels: { template: '#=(value).toFixed(0) # %' } },
                categoryAxis: {
                    majorGridLines: { visible: false }
                },
                tooltip: { visible: true, template: '#= series.name #: #= (value).toFixed(2) # % #= dataItem[series.field+\'tip\']#', color: 'white' },
                render: function () { $scope.onSubjectRender(index); }
            });
        }, 1000);
    };

    function assignComparisonDistricts(selectedDistrict) {
        var autoFillData = [];
        var selDistricts = [];
        console.log($scope.districts);
        var selectedD = _.find($scope.districts, function (i) { return i.DNAME == selectedDistrict });
        if (!selectedD) {
            alert("No district found!.. Please enter correct district name.");
            $location.path("benchmarking");
            return;
        }
        var selectedCode = selectedD.DISTRICT.toString().slice(0, -3);
        _.each($scope.districts, function (d) {
            if (d.DNAME != selectedDistrict) {
                if (selectedCode == d.DISTRICT.toString().slice(0, -3)) {
                    selDistricts.push(d.DNAME);
                }
                autoFillData.push({ DISTRICT: d.DNAME });
            }
        });
        $scope.selectedDistricts = selDistricts;
        $scope.districtOptions.dataSource.data = autoFillData;
        return selDistricts;
    };


    $scope.loadDistrict = function (selectedDistrict, selDistricts) {
        $scope.spinner = true;
        selectedDist = selectedDistrict;
        //        $scope.getHopeData();
        sqlData.getActExpData(selectedDistrict, $scope.selectedDemo.demo, $scope.selectedDemo.yColumn, $scope.selectedCategory.xColumn).then(function (data) {
            districtData = data;
            $scope.compareDistricts(selDistricts);
        });
    };

    function decodeDistrict(encoded) {
        var decoded = "";
        for (var i = 0; i < encoded.length; i++) {
            decoded += String.fromCharCode(encoded.charCodeAt(i) - 1);
        }
        return decoded;
    };

    $scope.compareDistricts = function (selDistricts) {
        console.log("Comparing");
        if (!$scope.selectedDistricts || ($scope.selectedDistricts.length != selDistricts.length)) {
            $scope.selectedDistricts = selDistricts;
        }

        var postValue = $scope.selectedDistricts ? $scope.selectedDistricts.slice() : [];
        postValue.push($scope.selectedDistrict);
        if (postValue.length < 2) {
            alert("Please select at-least one district for comparison");
            $scope.spinner = false;
            return;
        }
        $scope.spinner = true;
        sqlData.getActExpSlopeIntersect($scope.selectedDemo.demo, $scope.selectedDemo.yColumn, $scope.selectedCategory.xColumn, postValue).then(function (data) {
            _.each(districtData, function (item) {
                var tragetedSet = data[item.Subject + "__" + item.Grade];
                item.Expected_Rate = (tragetedSet.Slope * (item[$scope.selectedCategory.xColumn] / 100)) + tragetedSet.Intersect;
                item.Final_Rec_Rate_Per = item[$scope.selectedDemo.yColumn];
                item.Exp_vs_Act_Per = item.Final_Rec_Rate_Per - item.Expected_Rate;
            });
            if ($scope.viewType == 'campus') {
                showCampusView();
            }
            else {
                showSubjectView();
            }
            $scope.getHopeData();
            console.log(data);
        });
    };

    $scope.districtChange = function () {
        if ($scope.selectedDistrict) {
            $location.path("benchmarking/view/" + encodeDistrict($scope.selectedDistrict));
        }
    };

    $scope.onRender = function (index) {
        if ($scope.campuses.length - 1 == index) {
            $scope.spinner = false;
        }
    };

    $scope.onSubjectRender = function (index) {
        if ($scope.subjects.length - 1 == index) {
            $scope.spinner = false;
        }
    };

    $scope.$watch('selectedDistrict', function (value) {
        $scope.districtMessage = 'Showing data for ' + value + ' district';
    });

    $scope.$watch('viewType', function (value) {
        console.log(value);
        if (value && districtData) {
            if (value == 'campus') {
                showCampusView();
            }
            else {
                showSubjectView();
            }
        }
    });



    $scope.$on("$viewContentLoaded", function () {
        var userKey = actExpCache.get('userKey');
        if (!userKey) {
            if ($routeParams.districtID) {
                $location.path("benchmarking/" + $routeParams.districtID);
                return;
            }
            $location.path("benchmarking");
            return;
        }
        if (!$routeParams.districtID && userKey) {
            $location.path("benchmarking/view/" + userKey);
            return;
        }

        $scope.selectedSubject = $scope.subjectGrades[0];
        $scope.selectedDemo = $scope.demoGraphics[0];
        $scope.selectedCategory = $scope.categories[0];
        sqlData.getActExpDistrictsTwo().then(function (districts) {
            $scope.districts = districts;
            $scope.selectedDistrict = decodeDistrict($routeParams.districtID);
            var selDistricts = assignComparisonDistricts($scope.selectedDistrict);
            if (selDistricts)
            {
                $scope.loadDistrict($scope.selectedDistrict, selDistricts);
            }
        });

    });

}]);

angular.module('myApp').controller('actExpLoginController', ['$scope', '$routeParams', '$location', '$timeout', '$filter', 'sqlData', 'CacheFactory', function ($scope, $routeParams, $location, $timeout, $filter, sqlData, CacheFactory) {

    if (!CacheFactory.get('actExpCache')) {
        // or CacheFactory('bookCache', { ... });
        CacheFactory.createCache('actExpCache', {
            deleteOnExpire: 'aggressive',
            storageMode: 'localStorage',
            maxAge: 3000 // 30 seconds
        });
    }

    function encodeDistrict(distname) {
        var encoded = "";
        for (var i = 0; i < distname.length; i++) {
            encoded += String.fromCharCode(distname.charCodeAt(i) + 1);
        }
        return encoded;
    };

    var masterPassword = "robert123";
    var actExpCache = CacheFactory.get('actExpCache');

    $scope.districtLogin = function () {
        $scope.invalid = false;
        actExpCache.remove('userKey');
        $scope.username = $scope.username || "";
        var upperName = $scope.username.toUpperCase();
        var district = _.find($scope.districts, function (d) { return d.DNAME == upperName; });
        var key = encodeDistrict($scope.username.toUpperCase());
        if ($routeParams.districtID && $routeParams.districtID != "undefined" && $routeParams.districtID != "view") {
            key = $routeParams.districtID;
        }
        console.log(key);
        if ($scope.password == masterPassword && ($routeParams.districtID || district)) {
            actExpCache.put('userKey', key);
            $location.path("benchmarking/view/" + key);
        }
        else {
            $scope.invalid = true;
        }
    };

    $scope.$on("$viewContentLoaded", function () {
        angular.element('body').addClass("body-auth");
        var userKey = actExpCache.get('userKey');
        if ($routeParams.districtID == userKey) {
            $location.path("benchmarking/" + $routeParams.districtID);
        }
        sqlData.getActExpDistrictsTwo().then(function (districts) {
            $scope.districts = districts;
        });
    });

    $scope.$on("$destroy", function () {
        angular.element('body').removeClass("body-auth");
    });
}]);
