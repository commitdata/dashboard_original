angular.module('myApp').controller('signupController', ['$scope', '$timeout', '$document', function ($scope, $timeout, $document) {
    $scope.hello = "world";

    $scope.$on("$viewContentLoaded", function () {
        angular.element('body').addClass("body-auth");
    });


    $scope.$on("$destroy", function () {
        //angular.element('body').removeClass("body-wide body-auth");
        angular.element('body').removeClass("body-auth");
    });


}]);