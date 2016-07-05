angular.module('myApp').controller('staarController', function ($scope, $filter, sqlData, mapper) {

    sqlData.getCampusList().then(function (response) {
        $scope.campusList = response.data;
        createGrid();
    });

    function preprocessData(data) {

        var manipulatedData = [];
        angular.forEach(data, function (value, index) {
            filtered = $filter("filter")($scope.campusList, { campus: value.CAMPUS });
            value.CAMPUS = filtered.length > 0 ? filtered[0].campname : value.CAMPUS;
            value.Category = mapper.categories[value.Category];
            value.Subject = mapper.subjects[value.Subject];
            angular.forEach(value.demographic, function (innerVal, innerKey) {
                var newValue = angular.copy(value);
                delete newValue["demographic"];
                newValue.id = value.id + innerKey;
                newValue.demographicName = mapper.demographies[innerKey] || innerKey;
                newValue.demographicValue = innerVal;
                manipulatedData.push(newValue);
            });
        });

        return manipulatedData;
    }


    function createGrid() {
        $("#schoolsGrid").kendoGrid({
            dataSource: {
                type: "json",
                transport: {
                    read: {
                        url: function () { return "/api/staarSimple/getCampusData?" + $("input[type=checkbox]:checked", "#campusList").serialize(); }
                    }
                },
                schema: {
                    parse: function (data) {
                        return preprocessData(data);
                    },
                    model: {
                        fields: {
                            CAMPUS: { type: "string" },
                            Category: { type: "string" },
                            Language: { type: "string" },
                            Subject: { type: "string" },
                            Grade: { type: "string" },
                            YEAR: { type: "string" },
                            demographicName: { type: "string" },
                            demographicValue: { type: "string" }
                        }
                    }
                },
                pageSize: 20
            },
            height: 550,
            scrollable: true,
            sortable: true,
            filterable: true,
            pageable: {
                input: true,
                numeric: false
            },
            columns: [
                { field: "CAMPUS", title: "CAMPNAME", width: "130px", filterable: false },
                { field: "Category", width: "130px" },
                { field: "Language", width: "130px" },
                { field: "Subject", width: "100px" },
                { field: "Grade", width: "100px" },
                { field: "YEAR", title: "Year", width: "80px" },
                { field: "demographicName", title: "Demographic Name", width: "200px" },
                { field: "demographicValue", title: "Demo. Value", width: "130px" }
            ]
        });
    };

    $scope.refreshGrid = function () {
        var filers = [];
        $("input[type=checkbox]:checked", "#campusList").each(function (index, el) {
            filers.push({ field: "CAMPUS", operator: "eq", value: $(el).next().text() });
        });
        var ds = $('#schoolsGrid').data('kendoGrid').dataSource;
        ds.filter({
            logic: "or",
            filters: filers
        });
    };

    $scope.downloadReport = function () {
        //upload objects

        //console.log(headers);

        //var newTry = [];
        //$.each(myObjects, function (i, x) {

        //    newTry.push(JSON.stringify(myObjects[i]));

        //});

        console.log("downloadReport");

        $.ajax({
            dataType: 'json',
            type: 'post',
            //traditional: true,
            url: "/download/downloader",
            data: { 'reportData': JSON.stringify($scope.schools), 'theHeaders': JSON.stringify($scope.schools[0]) },
            success: function (results) {
                window.location = results.url;
                //alert("success: " + results.url);
            },
            error: function (err) {
                alert("error: " + err.responseText)
            }
        });
    };

    $scope.$on('$viewContentLoaded', function () {
        //
    });

});