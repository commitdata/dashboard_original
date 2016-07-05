angular.module('myApp').factory('campusStaff', ['campusData', '$timeout', 'fieldMapper', 'd2bURI', 'JSONToCSV', '$q', function (campusData, $timeout, fieldMapper, d2bURI, JSONToCSV, $q) {
    var chartMapper, $scope;

    return new function () {
        var self = this;

        var colors = ["#c3151c", "#003662", "#fbb613", "#0086a1", "#ef5727", "#91c63d"];

        var extendChartMapper = function (chartMapper) {
            chartMapper.teacherByDegree = {
                kChart: function () {
                    return $("#teacherByDegree").data("kendoChart");
                },
                data: function () {
                    return [_.pick($scope.campus.staffAll, "CAMPUS", "CPSTBAFC", "CPSTMSFC", "CPSTNOFC", "CPSTPHFC")];
                }
            };
            chartMapper.teacherByExp = {
                kChart: function () {
                    return $("#teacherByExp").data("kendoChart");
                },
                data: function () {
                    return [_.pick($scope.campus.staffAll, "CAMPUS", "CPST01FC", "CPST11FC", "CPST06FC", "CPST20FC", "CPST00FC")];
                }
            };
            chartMapper.teacherBySalary = {
                kChart: function () {
                    return $("#teacherBySalary").data("kendoChart");
                },
                data: function () {
                    return [_.pick($scope.campus.staffAll, "CAMPUS", "CPST01SA", "CPST11SA", "CPST06SA", "CPST20SA", "CPST00SA")];
                }
            };
            chartMapper.professionalStaff = {
                kChart: function () {
                    return $("#professionalStaff").data("kendoChart");
                },
                data: function () {
                    return [_.pick($scope.campus.staffAll, "CAMPUS", "CPSPTOFC", "CPSSTOFC", "CPSUTOFC", "CPSTTOFC")];
                }
            };
            chartMapper.classAverage = {
                kChart: function () {
                    return $("#classAverage").data("kendoChart");
                },
                data: function () {
                    return [_.pick($scope.campus.staffAll, "CAMPUS", "CPCTG01A ", "CPCTG02A ", "CPCTG03A ", "CPCTG04A ", "CPCTG05A ", "CPCTG06A ", "CPCTGKGA ", "CPCTGMEA ", "CPCTENGA ", "CPCTFLAA ", "CPCTMATA ", "CPCTSCIA ", "CPCTSOCA")];
                }
            };
            chartMapper.teacherByEthnicity = {
                kChart: function () {
                    return $("#teacherByEthnicity").data("kendoChart");
                },
                data: function () {
                    return [_.pick($scope.campus.staffAll, "CAMPUS", "CPSTBLFC", "CPSTASFC", "CPSTFEFC", "CPSTHIFC", "CPSTINFC", "CPSTMAFC", "CPSTPIFC", "CPSTTWFC", "CPSTWHFC")];
                }
            };
            chartMapper.teacherByProgram = {
                kChart: function () {
                    return $("#teacherByProgram").data("kendoChart");
                },
                data: function () {
                    return [_.pick($scope.campus.staffAll, "CAMPUS", "CPSTBIFC", "CPSTVOFC", "CPSTCOFC", "CPSTGIFC", "CPSTOPFC", "CPSTREFC", "CPSTSPFC")];
                }
            };
        };

        var initScope = function () {

        };

        this.Init = function (scope, chartMapper) {
            $scope = scope;
            initScope();
            extendChartMapper(chartMapper);
        };


        this.CreateStaffAll = function (campusID) {
            return campusData.getStaffAll(campusID).then(function (data) {

                ///* Ordering by value for all charts */
                //console.log(data[0]);
                //var objArr = _.pairs(data[0]);
                //objArr.sort(function (a, b) { return a[1] - b[1] });
                //var arrObj = _.object(objArr);
                //console.log(arrObj);
                ///* Ordering complete */

                $scope.campus.staffAll = data[0];
                createTeacherByDegree();
                createTeacherByExp();
                createTeacherBySalary();
                createProfessionalStaff();
                createClassAverage();
                createTeacherByEthnicity();
                createTeacherByProgram();
            });
        };

        /* Chart functions */

        function createTeacherByDegree() {
            var keys = ["CPSTBAFC", "CPSTMSFC", "CPSTNOFC", "CPSTPHFC"];

            var sum = 0;
            var series = [];

            _.each(keys, function (key) {
                sum += $scope.campus.staffAll[key];
                if ($scope.campus.staffAll[key]) {
                    series.push({ field: key, name: fieldMapper.campus[key].replace('Staff: Teacher ', "").replace("Full Time Equiv Count","").replace("PH Deg","Ph.D. Deg"), color: colors[series.length % (colors.length)] });
                }
            });

            var func = sum < 1 ? $("#teacherByDegreeContainer").hide : $("#teacherByDegreeContainer").show;
            func();

            $("#teacherByDegree").kendoChart({
                dataSource: { data: [$scope.campus.staffAll] },
                legend: { position: 'bottom', visible: true },
                seriesDefaults: {
                    type: 'column',
                    labels: { visible: true, template: ' #=  (!value || value < 0) ? \'N/A\' : value.toFixed(0)  #' }
                },
                plotArea: {
                    margin: { top: 20 }
                },
                series: series,
                valueAxis: {
                    min: 0,
                    line: { visible: false },
                    minorGridLines: { visible: true },
                    labels: { template: '#:  value # ' }
                },
                categoryAxis: {
                    majorGridLines: { visible: false }
                },
                tooltip: { visible: true, template: '#= series.name #: #=  (!value || value < 0) ? \'N/A\' : value.toFixed(0)  #', color: 'white' }
            });
        };

        function createTeacherByExp() {
            var keys = _.sortBy(["CPST01FC", "CPST11FC", "CPST06FC", "CPST20FC", "CPST00FC"], function (i) { return $scope.campus.staffAll[i] });

            var sum = 0;
            var series = [];

            _.each(keys, function (key) {
                sum += $scope.campus.staffAll[key];
                if ($scope.campus.staffAll[key]) {
                    series.push({ field: key, name: fieldMapper.campus[key].replace('Staff: Teacher ', "").replace("Full Time Equiv Count", ""), color: colors[series.length % (colors.length)] });
                }
            });

            var func = sum < 1 ? $("#teacherByExpContainer").hide : $("#teacherByExpContainer").show;
            func();

            $("#teacherByExp").kendoChart({
                dataSource: { data: [$scope.campus.staffAll] },
                legend: { position: 'bottom', visible: true },
                seriesDefaults: {
                    type: 'column',
                    labels: { visible: true, template: ' #=  (!value || value < 0) ? \'N/A\' : value.toFixed(0)  #' }
                },
                plotArea: {
                    margin: { top: 20 }
                },
                series: series,
                valueAxis: {
                    min: 0,
                    line: { visible: false },
                    minorGridLines: { visible: true },
                    labels: { template: '#:  value # ' }
                },
                categoryAxis: {
                    majorGridLines: { visible: false }
                },
                tooltip: { visible: true, template: '#= series.name #: #=  (!value || value < 0) ? \'N/A\' : value.toFixed(0)  #', color: 'white' }
            });
        };

        function createTeacherBySalary() {
            var keys = _.sortBy(["CPST01SA", "CPST11SA", "CPST06SA", "CPST20SA", "CPST00SA"], function (i) { return $scope.campus.staffAll[i]; });

            var sum = 0;
            var series = [];

            _.each(keys, function (key) {
                sum += $scope.campus.staffAll[key];
                if ($scope.campus.staffAll[key]) {
                    series.push({ field: key, name: fieldMapper.campus[key].replace('Staff: Teacher ', ""), color: colors[series.length % (colors.length)] });
                }
            });

            var func = sum < 1 ? $("#teacherBySalaryContainer").hide : $("#teacherBySalaryContainer").show;
            func();

            $("#teacherBySalary").kendoChart({
                dataSource: { data: [$scope.campus.staffAll] },
                legend: { position: 'bottom', visible: true },
                seriesDefaults: {
                    type: 'column',
                    labels: { visible: true, template: ' #=  (!value || value < 0) ? \'N/A\' : kendo.toString(value,\"c0\")  #' }
                },
                plotArea: {
                    margin: { top: 20 }
                },
                series: series,
                valueAxis: {
                    min: 0,
                    line: { visible: false },
                    minorGridLines: { visible: true },
                    labels: { template: '#:  kendo.toString(value,\"c0\") # ' }
                },
                categoryAxis: {
                    majorGridLines: { visible: false }
                },
                tooltip: { visible: true, template: '#= series.name #: #=  (!value || value < 0) ? \'N/A\' : kendo.toString(value,\"c0\")  #', color: 'white' }
            });
        };

        function createProfessionalStaff() {
            var keys = ["CPSPTOFC", "CPSSTOFC", "CPSUTOFC", "CPSTTOFC"];

            var sum = 0;
            var series = [];

            _.each(keys, function (key) {
                sum += $scope.campus.staffAll[key];
                if ($scope.campus.staffAll[key]) {
                    series.push({ field: key, name: fieldMapper.campus[key].replace('Staff: ', "").replace("Full Time Equiv Count", "").replace("School Admin", "School Administration"), color: colors[series.length % (colors.length)] });
                }
            });

            var func = sum < 1 ? $("#professionalStaffContainer").hide : $("#professionalStaffContainer").show;
            func();

            $("#professionalStaff").kendoChart({
                dataSource: { data: [$scope.campus.staffAll] },
                legend: { position: 'bottom', visible: true },
                seriesDefaults: {
                    type: 'column',
                    labels: { visible: true, template: ' #=  (!value || value < 0) ? \'N/A\' : value.toFixed(0)  #' }
                },
                plotArea: {
                    margin: { top: 20 }
                },
                series: series,
                valueAxis: {
                    min: 0,
                    line: { visible: false },
                    minorGridLines: { visible: true },
                    labels: { template: '#:  value # ' }
                },
                categoryAxis: {
                    majorGridLines: { visible: false }
                },
                tooltip: { visible: true, template: '#= series.name #: #=  (!value || value < 0) ? \'N/A\' : value.toFixed(0)  #', color: 'white' }
            });
        };

        function createClassAverage() {
            var keys = ["CPCTG01A", "CPCTG02A", "CPCTG03A", "CPCTG04A", "CPCTG05A", "CPCTG06A", "CPCTGKGA", "CPCTGMEA", "CPCTENGA", "CPCTFLAA", "CPCTMATA", "CPCTSCIA", "CPCTSOCA"];

            var sum = 0;
            var series = [];

            _.each(keys, function (key) {
                sum += $scope.campus.staffAll[key];
                if ($scope.campus.staffAll[key]) {
                    series.push({ field: key, name: fieldMapper.campus[key].replace('Class Size: ', ""), color: colors[series.length % (colors.length)] });
                }
            });

            var func = sum < 1 ? $("#classAverageContainer").hide : $("#classAverageContainer").show;
            func();

            $("#classAverage").kendoChart({
                dataSource: { data: [$scope.campus.staffAll] },
                legend: { position: 'bottom', visible: true },
                seriesDefaults: {
                    type: 'column',
                    labels: { visible: true, template: ' #=  (!value || value < 0) ? \'N/A\' : value.toFixed(0)  #' }
                },
                plotArea: {
                    margin: { top: 20 }
                },
                series: series,
                valueAxis: {
                    min: 0,
                    line: { visible: false },
                    minorGridLines: { visible: true },
                    labels: { template: '#:  value # ' }
                },
                categoryAxis: {
                    majorGridLines: { visible: false }
                },
                tooltip: { visible: true, template: '#= series.name #: #=  (!value || value < 0) ? \'N/A\' : value.toFixed(0)  #', color: 'white' }
            });
        };

        function createTeacherByEthnicity() {
            var keys = ["CPSTFEFC", "CPSTMAFC", "CPSTBLFC", "CPSTASFC", "CPSTHIFC", "CPSTINFC", "CPSTPIFC", "CPSTTWFC", "CPSTWHFC"];

            var sum = 0;
            var series = [];

            _.each(keys, function (key) {
                sum += $scope.campus.staffAll[key];
                if ($scope.campus.staffAll[key]) {
                    series.push({ field: key, name: fieldMapper.campus[key].replace('Staff: Teacher ', "").replace("Full Time Equiv Count", ""), color: colors[series.length % (colors.length)] });
                }
            });

            var func = sum < 1 ? $("#teacherByEthnicityContainer").hide : $("#teacherByEthnicityContainer").show;
            func();

            $("#teacherByEthnicity").kendoChart({
                dataSource: { data: [$scope.campus.staffAll] },
                legend: { position: 'bottom', visible: true },
                seriesDefaults: {
                    type: 'column',
                    labels: { visible: true, template: ' #=  (!value || value < 0) ? \'N/A\' : value.toFixed(0)  #' }
                },
                plotArea: {
                    margin: { top: 20 }
                },
                series: series,
                valueAxis: {
                    min: 0,
                    line: { visible: false },
                    minorGridLines: { visible: true },
                    labels: { template: '#:  value # ' }
                },
                categoryAxis: {
                    majorGridLines: { visible: false }
                },
                tooltip: { visible: true, template: '#= series.name #: #=  (!value || value < 0) ? \'N/A\' : value.toFixed(0)  #', color: 'white' }
            });
        };

        function createTeacherByProgram() {
            var keys = ["CPSTBIFC", "CPSTVOFC", "CPSTCOFC", "CPSTGIFC", "CPSTOPFC", "CPSTREFC", "CPSTSPFC"];

            var sum = 0;
            var series = [];

            _.each(keys, function (key) {
                sum += $scope.campus.staffAll[key];
                if ($scope.campus.staffAll[key]) {
                    series.push({ field: key, name: fieldMapper.campus[key].replace("Staff: Teacher", "").replace("Full Time Equiv Count", "").replace('Prgms', "Programs"), color: colors[series.length % (colors.length)] });
                }
            });

            var func = sum < 1 ? $("#teacherByProgramContainer").hide : $("#teacherByProgramContainer").show;
            func();

            $("#teacherByProgram").kendoChart({
                dataSource: { data: [$scope.campus.staffAll] },
                legend: { position: 'bottom', visible: true },
                seriesDefaults: {
                    type: 'column',
                    labels: { visible: true, template: ' #=  (!value || value < 0) ? \'N/A\' : value.toFixed(0)  #' }
                },
                plotArea: {
                    margin: { top: 20 }
                },
                series: series,
                valueAxis: {
                    min: 0,
                    line: { visible: false },
                    minorGridLines: { visible: true },
                    labels: { template: '#:  value # ' }
                },
                categoryAxis: {
                    majorGridLines: { visible: false }
                },
                tooltip: { visible: true, template: '#= series.name #: #=  (!value || value < 0) ? \'N/A\' : value.toFixed(0)  #', color: 'white' }
            });
        };
    };
}]);