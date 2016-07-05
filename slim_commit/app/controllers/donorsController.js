angular.module('myApp').controller('donorsController', ['$scope', '$timeout', 'JSONToCSV', '$compile', '$http', '$routeParams', '$location', function ($scope, $timeout, JSONToCSV, $compile, $http, $routeParams, $location) {
    var map;

    $scope.numberOfProjects = 27;
    $scope.amountNeeded = 100;
    $scope.NuSchools = 100;
    $scope.NuDistricts = 100;
    $scope.projects;

    //PAGE LOADER.
    $scope.spinner = false;

    var districtNumbers = {
        'Dallas County': '331:1',
        'mesquite isd': '1440:2',
        'dallas isd': '105:9'
    };

   
    $scope.projects = [];

    $http.get("/assets/donorsCounties.json").then(function (response) {
        console.log(response.data);
        $scope.counties = response.data;
        $scope.selectedCounty = _.find($scope.counties, function (c) { return c.CountyID == $routeParams.countyID; });
    });

    $scope.countyChange = function () {
        if ($scope.selectedCounty && $scope.selectedCounty.CountyID) {
            $location.path("donors/" + $scope.selectedCounty.CountyID);
        }
    };

    function createGrid() {

        $("#donorsGrid").kendoGrid({
            toolbar: [{
                template: '<a id="downloadLink" ng-click="downloadExcel()" ng-href="" class="k-button k-button-icontext k-grid-Download"><span class=" "></span>Download as Excel</a>'
            }],
            dataSource: {
                data: $scope.projects,
                schema: {
                    model: {
                        fields: {
                            schoolName: { type: "string" },
                            title: { type: "string" },
                            costToComplete: { type: "number" },
                            city: { type: "string" }
                        }
                    }
                }
                //pageSize: 20
            },
            //height: 550,
            scrollable: true,
            sortable: true,
            filterable: true,
            pageable: {
                input: true,
                numeric: false
            },
            columns: [
                { field: "schoolName", title: "School", width: "130px", encoded: false },
                { field: "title", title: "Title", format: "{0:c}", width: "250px", encoded: false },
                { field: "costToComplete", title: "Cost to Complete", width: "130px" },
                { field: "city", title: "City", width: "130px" },
                { field: "proposalURL", title: "Link", width: "130px", template: "<a href='${proposalURL}' target='_blank'>link</a>" }
            ]
        });
        /* Manual compilation required as grid is created out of angular boundries */
        //$compile($("#downloadLink"))($scope);
    }

    $scope.downloadExcel = function () {
        var columnDict = { id: "ID", proposalURL: "Proposal URL", latitude: "Latitude", longitude: "Longitude", imageURL: "Image URL", shortdescription: "Short Description", costToComplete: "Cost To Complete", expirationDate: "Expiration Date", schoolName: "School Name", city: "City", state: "State", povertyLevel: "Poverty Level", title: "Title" }
        JSONToCSV($scope.projects, "Donors Data", true, columnDict);
    };

    function loadMap() {
        $("#mapContainer").empty();
        var mapDiv = $("<div></div>").attr("id", "map-canvas-dc").height(548).css('border', '2px solid orange');
        mapDiv.appendTo("#mapContainer");
        map = L.map('map-canvas-dc').setView([32.795903, -96.795903], 10);
        L.tileLayer('http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://www.opencyclemap.org">OpenCycleMap</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

    };


    $scope.init = function () {
        $scope.spinner = true;
        console.log("init here");
        console.log($routeParams.countyID);
        if (!$routeParams.countyID) {
            $location.path("donors/331");
            return;
        }

        $.ajax({
            url: "http://api.donorschoose.org/common/json_feed.html?state=TX&Community=" + $routeParams.countyID + ":1&APIKey=vmspm5ygamje&concise=true&description=true",
            dataType: 'jsonp',
            success: function (results) {
                $scope.projects = results.proposals;
                console.log("proposals");
                console.log(results.proposals);
                createGrid();
                $timeout(function () {
                    loadMap();
                    //proposalURL
                    $scope.numberOfProjects = results.proposals.length;

                    var allCosts = _.pluck(results.proposals, "costToComplete");
                    var sum = _.reduce(allCosts, function (memo, num) { return memo + parseFloat(num); }, 0);
                    $scope.amountNeeded = sum;

                    var allDistricts = _.pluck(results.proposals, "city");
                    var distinctDistricts = _.uniq(allDistricts);

                    $scope.NuDistricts = distinctDistricts.length;

                    var allSchools = _.pluck(results.proposals, "schoolName");
                    var distinctSchools = _.uniq(allSchools);

                    $scope.NuSchools = distinctSchools.length;
                    $scope.spinner = false;
                    var markerLayer = L.featureGroup();
                    for (var i = 0; i < results.proposals.length; i++) {

                        var lat = results.proposals[i].latitude;
                        var long = results.proposals[i].longitude;


                        var marker = L.marker([parseFloat(lat), parseFloat(long)], {
                            icon: L.icon({
                                iconUrl: '../images/orange1.png',
                            })
                        });
                        console.log(marker);
                        marker.bindPopup(results.proposals[i]["schoolName"] + " : " + results.proposals[i]["costToComplete"]);
                        marker.addTo(markerLayer);
                    }
                    markerLayer.addTo(map);
                    map.fitBounds(markerLayer.getBounds());
                }, 10);
            }
        });

    };

    $scope.$on("$viewContentLoaded", function () {
       
        $scope.init();
    });



}]);