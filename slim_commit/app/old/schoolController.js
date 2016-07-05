angular.module('myApp').controller('schoolController', function ($scope) {
    $scope.schoolTypes = [
        { name: "Elementary School", url: "app/templates/pages/school_elementary.html" },
        { name: "Middle School", url: "app/templates/pages/school_middle.html" },
        { name: "High School", url: "app/templates/pages/school_high.html" }
    ];
    $scope.selectedSchool = $scope.schoolTypes[0];
});

angular.module('myApp').controller('elementarySchoolController', function ($scope, allData) {

    function init() {
        $scope.message = "Elementary school charts";

        console.log("You know what, I have access to my parent data as well. I am " + $scope.selectedSchool.name);
    };

    init();
});

angular.module('myApp').controller('middleSchoolController', function ($scope, allData) {

    function init() {
        $scope.message = "Middle school charts";
        console.log("You know what, I have access to my parent data as well. I am " + $scope.selectedSchool.name);
    };

    init();
});

angular.module('myApp').controller('highSchoolController', function ($scope, allData) {

    function init() {
        $scope.message = "High school charts";
        console.log("You know what, I have access to my parent data as well. I am " + $scope.selectedSchool.name);
    };

    init();
});