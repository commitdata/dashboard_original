angular.module('myApp').controller('scorecardController', ['$scope', '$routeParams', '$location', '$timeout', function ($scope, $routeParams, $location, $timeout) {
    console.log($routeParams.pageId);
    var pageID = $routeParams.pageId || 2;
    var path = "../../../scorecard_assets/page" + pageID.toString() + ".svg";

    if ($routeParams.cardId) {
        path = "../../../scorecard_assets/page" + $routeParams.cardId.toString() + ".svg";
        /* Do Something if submneu route is there.*/
    }

    //d3.xml(path, "image/svg+xml", function (xml) {
    //    var doccer = document.getElementById("scorecardPage");
    //    doccer.appendChild(xml.documentElement);
    //    create(path);


    //    //        $("#countier").attr("fill", "green");


    //});

    function create(myPath) {
        $scope.spinner = true;
        d3.xml(myPath, "image/svg+xml", function (xml) {
            var doccer = document.getElementById("scorecardPage");

            $(doccer).empty();
            //while (doccer.firstChild) {
            //    doccer.removeChild(doccer.firstChild);
            //}

            doccer.appendChild(xml.documentElement);
            //visualize();
            $timeout(function () { $scope.spinner = false; }, 10);
            var h = window.innerHeight - 60;
            var w = window.innerWidth - 530;

            var svg = d3.select("svg")
                //.attr("viewBox", "0 0 600 600")
                .attr("width", w)
                .attr("height", h);
            //.attr("preserveAspectRatio", "none");


            svg.selectAll("path")
                    .on('click', function () {
                        console.log("clicked");
                        d3.select(this).attr('stroke', 'red');
                        d3.select(this).attr('stroke-width', '2px');
                    })
                   .each(function (d, i) {
                       d3.select(this)
                           .transition()
                           .duration(i * 17)
                       //.style("fill","red")
                   });

            svg.selectAll("polygon")
                .on("mouseenter", function () {
                    var countier = d3.select(this);
                    countier.style("fill", "green");
                })
                .on("mouseleave", function () {
                    var countier = d3.select(this);
                    countier.style("fill", "blue");
                });

            //$("#countier").attr("fill", "green");

        });
    };


    $scope.navOptions = [
        { ID: 2, Name: "The Commit! Partnership" },
        { ID: 3, Name: "Great Expectations…" },
        { ID: 4, Name: "Dallas County" },
        { ID: 5, Name: "Strong Foundation for Growth" },
        { ID: 6, Name: "Why A Scorecard?", SubMenus: [{ ID: 6, Name: "Pipeline" }, { ID: 7, Name: "Pipeline, cont." }] },
        { ID: 8, Name: "Community Scorecard" },
        { ID: 9, Name: "Heading in a Positive Direction…" },
        { ID: 10, Name: "Equity", SubMenus: [{ ID: 10, Name: "Race/Gender" }, { ID: 11, Name: "Income/Language" }] },
        { ID: 12, Name: "Regional Alignment" },
        { ID: 13, Name: "National Interest" },
        { ID: 14, Name: "Partners using data" },
        { ID: 15, Name: "Local Community Engagement" },
        { ID: 16, Name: "School Readiness", SubMenus: [{ ID: 16, Name: "Data" }, { ID: 17, Name: "Highlighted Story" }] },
        { ID: 18, Name: "Early Math and Literacy", SubMenus: [{ ID: 18, Name: "Data" }, { ID: 19, Name: "Highlighted Story" }] },
        { ID: 20, Name: "College Access & Success", SubMenus: [{ ID: 20, Name: "Data" }, { ID: 21, Name: "Highlighted Story" }] },
        { ID: 22, Name: "Higher Education-Workforce", SubMenus: [{ ID: 22, Name: "Data" }, { ID: 23, Name: "Highlighted Story" }] },
        { ID: 24, Name: "Educator Pipelines", SubMenus: [{ ID: 24, Name: "Data" }, { ID: 25, Name: "Highlighted Story" }] },
        { ID: 26, Name: "Our Partners", SubMenus: [{ ID: 26, Name: "Leadership Council Members" }, { ID: 27, Name: "Commit! Partners" }, { ID: 28, Name: "Philanthropic Investors" }] },
        { ID: 29, Name: "Footnotes" },
        { ID: 30, Name: "Thank you!" },
    ];


    $scope.$on("$viewContentLoaded", function () {
        var pageID = parseInt($routeParams.pageId, 10);

        $scope.currentNavOption = _.find($scope.navOptions, function (option) { return option.ID == pageID });
        $scope.currentNavOption.active = true;
        if ($routeParams.cardId) {
            var cardID = parseInt($routeParams.cardId, 10);

            $scope.currentSubMenuOption = _.find($scope.currentNavOption.SubMenus, function (option) { return option.ID == cardID });
        }
        $timeout(function () {
            $("#scorecard-li").addClass("active");
            $("#scorecard-menu-container").height(window.innerHeight - 50);
            $("#scorecard-menu-container").css("overflow-y", 'auto');
        }, 1000);

        create(path);
    });

    function nextCard() {
        var nextID, nextCardID = "";
        var pageID = parseInt($routeParams.pageId);
        var navOption = _.find($scope.navOptions, function (n) { return n.ID == pageID });
        var cardID = parseInt($routeParams.cardId);
        if (navOption.SubMenus && (!cardID || cardID < navOption.SubMenus[navOption.SubMenus.length - 1].ID)) {
            nextID = pageID;
            nextCardID = (cardID || navOption.SubMenus[0].ID) + 1;
        }
        else {
            var index = $scope.navOptions.indexOf(navOption);
            var nextIndex = index < 19 ? index + 1 : 0;
            nextID = $scope.navOptions[nextIndex].ID;
            if ($scope.navOptions[nextIndex].SubMenus) {
                nextCardID = $scope.navOptions[nextIndex].SubMenus[0].ID;
            }
        }
        console.log(nextID);
        $timeout(function () { $location.path("scorecard/" + nextID + "/" + nextCardID) }, 10);
    };

    function prevCard() {
        var prevID, prevCardID = "";
        var pageID = parseInt($routeParams.pageId);
        var navOption = _.find($scope.navOptions, function (n) { return n.ID == pageID });
        var cardID = parseInt($routeParams.cardId);
        if (navOption.SubMenus && cardID && cardID > navOption.SubMenus[0].ID) {
            prevID = pageID;
            prevCardID = cardID - 1;
        }
        else {
            var index = $scope.navOptions.indexOf(navOption);
            var prevIndex = index > 0 ? index - 1 : 19;
            prevID = $scope.navOptions[prevIndex].ID;
            if ($scope.navOptions[prevIndex].SubMenus) {
                prevCardID = $scope.navOptions[prevIndex].SubMenus[$scope.navOptions[prevIndex].SubMenus.length - 1].ID;
            }
        }
        console.log(prevID);
        $timeout(function () { $location.path("scorecard/" + prevID + "/" + prevCardID) }, 10);
    };

    $scope.$on("keydown:37", function () {
        console.log("keydown");
        prevCard();
    });

    //$scope.$on("keydown:38", function () {
    //    console.log("keydown");
    //    prevCard();
    //});

    $scope.$on("keydown:39", function () {
        console.log("keydown");
        nextCard();
    });

    //$scope.$on("keydown:40", function () {
    //    console.log("keydown");
    //    nextCard();
    //});

}]);