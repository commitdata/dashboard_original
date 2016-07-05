var app = angular.module('myApp', ['ngRoute', 'angular-cache', 'myApp.localization', 'ui.bootstrap', 'ngAnimate', 'myApp.directives', "kendo.directives"]);

app.config(["CacheFactoryProvider", function (CacheFactoryProvider) {
    angular.extend(CacheFactoryProvider.defaults, { maxAge: 15 * 60 * 1000 /* 15 minutes */ });
}])

app.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.
      when('/', {
          templateUrl: '../../app/templates/pages/type_two.html',
          controller: 'homeController'
      }).
        when('/campus', {
            templateUrl: '../../app/templates/pages/campus2015.html',
            controller: 'campus2015Controller'
        }).
        when('/campus/:year/:campusID', {
            templateUrl: '../../app/templates/pages/campus2015.html',
            controller: 'campus2015Controller'
        }).
        when('/district', {
            templateUrl: '../../app/templates/pages/district2015.html',
            controller: 'district2015Controller'
        }).
        when('/district/:year/:districtID', {
            templateUrl: '../../app/templates/pages/district2015.html',
            controller: 'district2015Controller'
        }).
        when('/signin', {
            templateUrl: '../../app/templates/pages/signin.html',
            controller: 'signinController'
        }).
        when('/signup', {
            templateUrl: '../../app/templates/pages/signup.html',
            controller: 'signupController'
        }).
        when('/literacy', {
            templateUrl: '../../app/templates/pages/literacy.html',
            controller: 'literacyController'
        }).
      //when('/mapping', {
      //    templateUrl: '../../app/templates/pages/mapping.html',
      //    controller: 'mappingController'
      //}).
      when('/bulk', {
          templateUrl: '../../app/templates/pages/bulk.html',
          controller: 'bulkController'
      }).
      //when('/resources', {
      //    templateUrl: '../../app/templates/pages/resources.html',
      //    controller: 'resourcesController'
      //}).
      //when('/blog', {
      //    templateUrl: '../../app/templates/pages/blog.html',
      //    controller: 'blogController'
      //}).
      //when('/type', {
      //    templateUrl: '../../app/templates/pages/type_two.html'
      //}).
      //when('/dictionary', {
      //    templateUrl: '../../app/templates/pages/dictionary.html',
      //    controller: 'dictionaryController'
      //}).
      when('/aeis_explanation', {
          templateUrl: '../../app/templates/pages/aeis_explanation.html',
          controller: 'aeis_explanationController'
      }).
      when('/staar_explanation', {
          templateUrl: '../../app/templates/pages/staar_explanation.html',
          controller: 'staar_explanationController'
      }).
      when('/donors/:countyID?', {
          templateUrl: '../../app/templates/pages/donors.html',
          controller: 'donorsController'
      }).
        when('/spreadsheet', {
            templateUrl: '../../app/templates/pages/spreadsheet.html',
            controller: 'spreadsheetController'
        }).
      when('/teks', {
          templateUrl: '../../app/templates/pages/teks.html',
          controller: 'teksController'
      }).
         when('/benchmarking/:districtID?', {
             templateUrl: '../../app/templates/pages/actExpLogin.html',
             controller: 'actExpLoginController'
         }).
         when('/benchmarking/view/:districtID', {
             templateUrl: '../../app/templates/pages/actExpFinal.html',
             controller: 'actExpFinalController'
         }).
         when('/scorecard', {
             redirectTo: '/scorecard/2'
         }).
          when('/scorecard/:pageId/:cardId?', {
              templateUrl: '../../app/templates/pages/scorecard.html',
              controller: 'scorecardController'
          }).
      //when('/naep', {
      //    templateUrl: '../../app/templates/pages/naep.html',
      //    controller: 'naepController'
      //}).
          when('/reporter', {
              templateUrl: '../../app/templates/pages/campusReport.html',
              controller: 'campusReportController'
          }).
        when('/report', {
            templateUrl: '../../app/templates/pages/report.html',
            controller: 'reportController'
        }).
      otherwise({
          redirectTo: '/'
      });

}]);

app.controller("slimParentController", ["$scope", "$rootScope", "$http", "$timeout", "$document", function ($scope, $rootScope, $http, $timeout, $document) {
    var $window;

    $document.bind('keydown', function (e) {
        $rootScope.$broadcast('keydown', e);
        $rootScope.$broadcast('keydown:' + e.keyCode, e);
    });

    $scope.validateEmail = function (email) {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    $scope.$on('$viewContentLoaded', function (event) {
        if (location.href.indexOf('localhost') < 0 && location.href.indexOf('commitstaging') < 0) {
            window.ga('send', 'pageview', { page: location.href });
        }
    });

    $scope.isolated = { email: "", feedback: "" };
    $scope.message = "Get updates via E-mail!";
    $scope.messageText = "Friend's Email..";

    $scope.AddEmail = function () {
        email = $scope.isolated.email;
        if (!$scope.validateEmail(email)) {
            $scope.isolated.email = "";
            $scope.message = "Please enter valid email.";
            return;
        }
        $scope.isolated.email = "";
        console.log(email);
        $scope.message = "Please wait...";
        $http({
            url: "Home/AddEmail",
            method: "POST",
            params: { email: email }
        }).then(function () {
            $scope.message = "Added " + email;
        });
    };

    $scope.SendFeedback = function () {
        $http({
            url: "Home/SendFeedback",
            method: "POST",
            params: { feedback: $scope.isolated.feedback }
        }).then(function () {
            $scope.isolated.message = "Feedback submitted successfully."
            $timeout(function () {
                $scope.isolated.fwindow.close();
                $scope.isolated.message = "";
                $scope.isolated.feedback = "";
            }, 1000);
        });
    };

    $scope.SendInvitation = function () {
        friendEmail = $scope.isolated.friendEmail;
        name = $scope.isolated.name;
        friendMessage = $scope.isolated.friendMessage;
        if (!$scope.validateEmail(friendEmail)) {
            $scope.isolated.friendEmail = "";
            $scope.messageText = "Please enter valid email.";
            return;
        }

        console.log(friendEmail);
        $http({
            url: "Home/SendInvitation",
            method: "POST",
            params: { Email: friendEmail, Name: name, Message: friendMessage }
        }).then(function () {
            $scope.isolated.message = "Invitation sent!";
            $timeout(function () {
                $scope.isolated.friendEmail = "";
                $scope.isolated.name = "";
                $scope.isolated.friendMessage = "";
                $scope.isolated.iwindow.close();
                $scope.isolated.message = "";
            }, 1000);
        });
    };

    return $window = $(window), $scope.main = {
        brand: "Commit!",
        name: "Lisa Doe"
    },
        $scope.pageTransitionOpts = [{
            name: "Fade up",
            "class": "no-animate-fade-up"
        }, {
            name: "Scale up",
            "class": "ainmate-scale-up"
        }, {
            name: "Slide in from right",
            "class": "ainmate-slide-in-right"
        }, {
            name: "Flip Y",
            "class": "animate-flip-y"
        }],

        $scope.admin = {
            layout: "wide",
            menu: "vertical",
            fixedHeader: !0,
            fixedSidebar: !0,
            pageTransition: $scope.pageTransitionOpts[0],
            skin: "11"
        },

        $scope.$watch("admin", function (newVal, oldVal) {
            return "horizontal" === newVal.menu && "vertical" === oldVal.menu ? void $rootScope.$broadcast("nav:reset") : newVal.fixedHeader === !1 && newVal.fixedSidebar === !0 ? (oldVal.fixedHeader === !1 && oldVal.fixedSidebar === !1 && ($scope.admin.fixedHeader = !0, $scope.admin.fixedSidebar = !0), void (oldVal.fixedHeader === !0 && oldVal.fixedSidebar === !0 && ($scope.admin.fixedHeader = !1, $scope.admin.fixedSidebar = !1))) : (newVal.fixedSidebar === !0 && ($scope.admin.fixedHeader = !0), void (newVal.fixedHeader === !1 && ($scope.admin.fixedSidebar = !1)))
        }, !0),

    $scope.color = {
        primary: "#5B90BF",
        success: "#A3BE8C",
        info: "#7FABD2",
        infoAlt: "#B48EAD",
        warning: "#EBCB8B",
        danger: "#BF616A",
        gray: "#DCDCDC"
    }
}]);

app.controller('HeaderCtrl',['$scope', function ($scope) {

}]);

app.controller('NavContainerCtrl',['$scope', function ($scope) {

}]);

app.controller("NavCtrl", ["$scope", function ($scope) {


}]);

app.controller('dashboardController',['$scope', function ($scope) {

}]);

app.controller('homeController',['$scope', function ($scope) {
    $scope.welcomeMessage = "Welcome to Home";
}]);

app.controller('myC', ['$scope',function ($scope) {

}]);

app.filter('unique', function () {
    return function (collection, keyname) {
        var output = [],
            keys = [];

        angular.forEach(collection, function (item) {
            var key = item[keyname];
            if (keys.indexOf(key) === -1) {
                keys.push(key);
                output.push(item);
            }
        });

        return output;
    };
});
