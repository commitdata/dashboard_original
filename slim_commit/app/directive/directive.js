"use strict";
angular.module('myApp.directives', [])
.directive("flotChart", [
            function () {
                return {
                    restrict: "A",
                    scope: {
                        data: "=",
                        options: "="
                    },
                    link: function (scope, ele) {
                        var data, options, plot;
                        return data = scope.data, options = scope.options, plot = $.plot(ele[0], data, options)
                    }
                }
            }
])

.directive("flotChartRealtime", [
            function () {
                return {
                    restrict: "A",
                    link: function (scope, ele) {
                        var data, getRandomData, plot, totalPoints, update, updateInterval;
                        return data = [], totalPoints = 300, getRandomData = function () {
                            var i, prev, res, y;
                            for (data.length > 0 && (data = data.slice(1)) ; data.length < totalPoints;) prev = data.length > 0 ? data[data.length - 1] : 50, y = prev + 10 * Math.random() - 5, 0 > y ? y = 0 : y > 100 && (y = 100), data.push(y);
                            for (res = [], i = 0; i < data.length;) res.push([i, data[i]]), ++i;
                            return res
                        }, update = function () {
                            plot.setData([getRandomData()]), plot.draw(), setTimeout(update, updateInterval)
                        }, data = [], totalPoints = 300, updateInterval = 200, plot = $.plot(ele[0], [getRandomData()], {
                            series: {
                                lines: {
                                    show: !0,
                                    fill: !0
                                },
                                shadowSize: 0
                            },
                            yaxis: {
                                min: 0,
                                max: 100
                            },
                            xaxis: {
                                show: !1
                            },
                            grid: {
                                hoverable: !0,
                                borderWidth: 1,
                                borderColor: "#eeeeee"
                            },
                            colors: ["#5B90BF"]
                        }), update()
                    }
                }
            }
])
    .directive("sparkline", [
            function () {
                return {
                    restrict: "A",
                    scope: {
                        data: "=",
                        options: "="
                    },
                    link: function (scope, ele) {
                        var data, options, sparkResize, sparklineDraw;
                        return data = scope.data, options = scope.options, sparkResize = void 0, sparklineDraw = function () {
                            return ele.sparkline(data, options)
                        }, $(window).resize(function () {
                            return clearTimeout(sparkResize), sparkResize = setTimeout(sparklineDraw, 200)
                        }), sparklineDraw()
                    }
                }
            }
    ])
.directive("uiJvectormap", [
            function () {
                return {
                    restrict: "A",
                    scope: {
                        options: "="
                    },
                    link: function (scope, ele) {
                        var options;
                        return options = scope.options, ele.vectorMap(options)
                    }
                }
            }
])
.directive("toggleNavCollapsedMin", ["$rootScope", function ($rootScope) {
    return {
        restrict: "A",
        link: function (scope, ele) {
            var app;
            console.log('nav init');
            return app = $("#app"), ele.on("click", function (e) {
                return app.hasClass("nav-collapsed-min") ? app.removeClass("nav-collapsed-min") : (app.addClass("nav-collapsed-min"), $rootScope.$broadcast("nav:reset")), e.preventDefault()
            })
        }
    }
}]).directive("collapseNav", [function () {
    return {
        restrict: "A",
        link: function (scope, ele) {
            var $a, $aRest, $app, $lists, $listsRest, $nav, $window, Timer, prevWidth, updateClass;
            return $window = $(window), $lists = ele.find("ul").parent("li"), $lists.append('<i class="ti-angle-down icon-has-ul-h"></i><i class="ti-angle-double-right icon-has-ul"></i>'), $a = $lists.children("a"), $listsRest = ele.children("li").not($lists), $aRest = $listsRest.children("a"), $app = $("#app"), $nav = $("#nav-container"), $a.on("click", function (event) {
                var $parent, $this;
                return $app.hasClass("nav-collapsed-min") || $nav.hasClass("nav-horizontal") && $window.width() >= 768 ? !1 : ($this = $(this), $parent = $this.parent("li"), $lists.not($parent).removeClass("open").find("ul").slideUp(), $parent.toggleClass("open").find("ul").stop().slideToggle(), event.preventDefault())
            }), $aRest.on("click", function () {
                return $lists.removeClass("open").find("ul").slideUp(5000)
            }), scope.$on("nav:reset", function () {
                return $lists.removeClass("open").find("ul").slideUp(5000)
            }), Timer = void 0, prevWidth = $window.width(), updateClass = function () {
                var currentWidth;
                return currentWidth = $window.width(), 768 > currentWidth && $app.removeClass("nav-collapsed-min"), 768 > prevWidth && currentWidth >= 768 && $nav.hasClass("nav-horizontal") && $lists.removeClass("open").find("ul").slideUp(), prevWidth = currentWidth
            }, $window.resize(function () {
                var t;
                return clearTimeout(t), t = setTimeout(updateClass, 300)
            })
        }
    }
}]).directive("highlightActive", [function () {
    return {
        restrict: "A",
        controller: ["$scope", "$element", "$attrs", "$location", function ($scope, $element, $attrs, $location) {
            var highlightActive, links, path;
            return links = $element.find("a"), path = function () {
                return $location.path()
            }, highlightActive = function (links, path) {
                return path = "#" + path, angular.forEach(links, function (link) {
                    var $li, $link, href;
                    return $link = angular.element(link), $li = $link.parent("li"), href = $link.attr("href"), $li.hasClass("active") && $li.removeClass("active"), 0 === path.indexOf(href) ? $li.addClass("active") : void 0
                })
            }, highlightActive(links, $location.path()), $scope.$watch(path, function (newVal, oldVal) {
                return newVal !== oldVal ? highlightActive(links, $location.path()) : void 0
            })
        }]
    }
}]).directive("toggleOffCanvas", [function () {
    return {
        restrict: "A",
        link: function (scope, ele) {
            return ele.on("click", function () {
                return $("#app").toggleClass("on-canvas")
            })
        }
    }
}]);
