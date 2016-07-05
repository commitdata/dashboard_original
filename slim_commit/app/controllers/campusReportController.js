angular.module('myApp').controller('campusReportController', ['$scope', '$routeParams', '$location', 'campusReportData', '$timeout', 'fieldMapper', 'printDiv', 'd2bURI', 'JSONToCSV', '$filter', '$q',
    function ($scope, $routeParams, $location, campusReportData, $timeout, fieldMapper, printDiv, d2bURI, JSONToCSV, $filter, $q) {
        var allDistrict = { DISTRICT: null, DISTNAME: "All" };
        var allCampus = { CAMPUS: null, CAMPNAME: "All" };


        $scope.campusOptions = {
            placeholder: "Select Campuses",
            dataTextField: "CAMPNAME",
            dataValueField: "CAMPUS",
            filter: "contains",
            dataSource: {
                data: []
            }
        };

        $scope.countyChange = function () {
            if (!$scope.selectedCounty) return;
            $scope.districts = null;
            $scope.campusOptions.dataSource.data = null;
            $scope.selectedDistrict = null;
            $scope.selectedCampus = null;
            campusReportData.getDistricts($scope.selectedYear, $scope.selectedCounty.COUNTY).success(function (data) {
                $scope.selectedDistrict = allDistrict;
                data.unshift($scope.selectedDistrict);
                $scope.districts = data;
                $scope.districtChange();
            });
        };

        $scope.districtChange = function () {
            if (!$scope.selectedDistrict) return;
            $scope.campusOptions.dataSource.data = null;
            $scope.selectedCampus = null;
            campusReportData.getCampuses($scope.selectedYear, $scope.selectedDistrict.DISTRICT, $scope.selectedCounty.COUNTY).success(function (data) {
                $scope.campusOptions.dataSource.data = _.sortBy(data, 'CAMPNAME');
            });
        };

        function init() {
            $scope.spinner = true;
            $scope.selectedYear = '2015';
            campusReportData.getCounties($scope.selectedYear).success(function (data) {
                $scope.counties = data;
                $scope.selectedCounty = _.findWhere($scope.counties, { COUNTY: "'057" });
                $scope.countyChange();
                $scope.spinner = false;
            })
        }



        $scope.$on("$viewContentLoaded", function () {
            init();
        });


    }]);