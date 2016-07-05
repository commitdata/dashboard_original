angular.module('myApp').controller('teksController', ['$scope', '$timeout', 'sqlData', function ($scope, $timeout, sqlData) {

    $scope.subjects = [
        { Id: 111, Name: "Mathematics", image: "math.png" },
        { Id: 116, Name: "Physical Education", image: "physical_education.png" },
        { Id: 126, Name: "Technology Applications", image: "technology.png" },
        { Id: 113, Name: "Social Studies", image: "social_studies2.png" },
        { Id: 117, Name: "Fine Arts", image: "art2.png" },
        { Id: 114, Name: "Languages Other Than English", image: "other_than_english.png" },
        { Id: 128, Name: "Spanish Language Arts and English as a Second Language", image: "ELL.png" },
        { Id: 112, Name: "Science", image: "science.png" },
        { Id: 118, Name: "Economics with Emphasis on the Free Enterprise System and Its Benefits ", image: "economics.png" },
        { Id: 115, Name: "Health Education ", image: "health.png" },
        { Id: 127, Name: "Career Development", image: "career.png" },
        { Id: 110, Name: "English Language Arts and Reading", image: "reading.png" }
    ];

    $scope.categories = [{ Code: 'a', Name: "Elementary School" }, { Code: 'b', Name: "Middle School" }, { Code: 'c', Name: "High School" }]

    $scope.grades = [{ GradeId: null, Name: "Select Subject and Category First" }];


    $scope.subjectSelected = function (subject) {
        $scope.selectedSubject = subject;
        getGrades();
    };

    $scope.categorySelected = function (category) {
        $scope.selectedCategory = category;
        getGrades();
    };

    $scope.$watch('selectedGrade', function (value) {
        if (value && value.GradeId) {
            sqlData.getSubjects($scope.selectedSubject.Id, $scope.selectedCategory.Code, value.GradeId).then(function (subjects) {
                $scope.itemSubjects = subjects;
            });
        }
    });

    function getGrades() {
        if (!$scope.selectedSubject || !$scope.selectedCategory) {
            return;
        }
        $scope.grades = [{ GradeId: null, Name: "Refreshing..." }];
        return sqlData.getGrades($scope.selectedSubject.Id, $scope.selectedCategory.Code).then(function (grades) {
            grades.unshift({ GradeId: null, Name: "Select Grade" });
            $scope.grades = grades;
        });
    }

    $scope.$on("$viewContentLoaded", function () {
        $scope.selectedSubject = $scope.subjects[11];
        $scope.selectedCategory = $scope.categories[0];
        getGrades().then(function () {
            $scope.selectedGrade = $scope.grades[3];
            $scope.ddList.value("3");
        });
    });


}]);