angular.module('myApp').controller('signinController', ['$scope', '$timeout', function ($scope, $timeout) {
    $scope.hello = "world";

    $scope.$on("$viewContentLoaded", function () {
        angular.element('body').addClass("body-auth");
    });


    $scope.$on("$destroy", function () {
        angular.element('body').removeClass("body-auth");
    });

}]);