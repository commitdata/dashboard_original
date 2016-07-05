angular.module('myApp').factory('aeisData', ['$http', '$q', 'districtData', 'allData', function ($http, $q, districtData, allData) {
    var cacheDict = {};

    var distData = null;
    var campusData = null;
    districtData.getData().success(function (data) {
        distData = data;
    });

    allData.getData().success(function (data) {
        campusData = data;
    });

    return new function () {
        var self = this;
        var grid = [];

        var HandleNameConversion = function (data, tableName) {
            if (tableName[0] == "C") {
                _.each(data, function (value) {
                    var realValue = value.CAMPUS.substr(1);
                    var filtered = _.findWhere(campusData, { CAMPUS: realValue });
                    value.Identity = value.CAMPUS;
                    value.CAMPUS = filtered ? filtered.CAMPNAME : value.CAMPUS;
                });
            }
            else {
                _.each(data, function (value) {
                    var realValue = value.DISTRICT.substr(1);
                    var filtered = _.findWhere(distData, { DISTRICT: realValue });
                    value.Identity = value.DISTRICT;
                    value.DISTRICT = filtered ? filtered.DISTNAME : value.DISTRICT;
                });
            }

            return data;
        };

        this.reset = function () {
            grid = [];
        };

        this.getTableData = function (tableName) {

            if (!cacheDict[tableName]) {
                cacheDict[tableName] = $http({
                    method: 'GET',
                    url: '/api/aeisCurrent/get',
                    cache: true,
                    params: { table: tableName },
                }).then(function (response) {
                    return HandleNameConversion(response.data, tableName);
                });
            }
            return cacheDict[tableName];
        };

        var buildAeisGrid = function (fields, data) {
            fields.push("Identity");
            return _.map(data, function (item) {
                return _.omit(item, function (value, key, obj) { return fields.indexOf(key) < 0; });
            });
        };

        var mergeAeisGrid = function (fields, data) {
            var newGrid = buildAeisGrid(fields, data);
            if (grid.length == 0) {
                grid = newGrid;
                return grid;
            }
            _.each(grid, function (item) {
                var matchedItem = _.find(newGrid, function (newItem) { return item.Identity == newItem.Identity; });
                if (matchedItem) {
                    _.extend(item, matchedItem);
                }
            });
            return grid;
        };

        var queryAeisTableData = function (aeisItems, tableName) {
            return $http({
                method: 'POST',
                url: '/api/aeisCurrent/AeisTable',
                cache: true,
                data: { Table: tableName, AeisItems: aeisItems },
            }).then(function (response) {
                var returnData = [];
                _.each(_.keys(response.data), function (key) {
                    var cacheKey = key.substr(1) + "_" + tableName;
                    HandleNameConversion(response.data[key], tableName);
                    cacheDict[cacheKey] = response.data[key];
                    _.each(cacheDict[cacheKey], function (aeisItem) {
                        returnData.push(aeisItem);
                    });
                });
                return returnData;
            });
        };

        this.getAeisTableData = function (items, tableName, fields) {
            var queryItems = _.filter(items, function (item) { var cacheKey = item.substr(1) + "_" + tableName; return !cacheDict[cacheKey]; });
            var cacheItems = _.filter(items, function (item) { var cacheKey = item.substr(1) + "_" + tableName; return cacheDict[cacheKey]; });
            var cacheData = [];
            _.each(cacheItems, function (item) {
                var cacheKey = item.substr(1) + "_" + tableName;
                _.each(cacheDict[cacheKey], function (aeisItem) {
                    cacheData.push(aeisItem);
                });
            });
            if (queryItems.length > 0) {
                return queryAeisTableData(queryItems, tableName).then(function (arrayData) { grid = buildAeisGrid(fields, cacheData.concat(arrayData)); return grid; });
            }
            else {
                var deffered = $q.defer();
                grid = buildAeisGrid(fields, cacheData);
                deffered.resolve(grid);
                return deffered.promise;
            }
        };

        this.addAeisTableData = function (items, tableName, fields) {
            var queryItems = _.filter(items, function (item) { var cacheKey = item.substr(1) + "_" + tableName; return !cacheDict[cacheKey]; });
            var cacheItems = _.filter(items, function (item) { var cacheKey = item.substr(1) + "_" + tableName; return cacheDict[cacheKey]; });
            var cacheData = [];
            _.each(cacheItems, function (item) {
                var cacheKey = item.substr(1) + "_" + tableName;
                _.each(cacheDict[cacheKey], function (aeisItem) {
                    cacheData.push(aeisItem);
                });
            });
            if (queryItems.length > 0) {
                return queryAeisTableData(queryItems, tableName).then(function (arrayData) { return mergeAeisGrid(fields, cacheData.concat(arrayData)); });
            }
            else {
                var deffered = $q.defer();
                deffered.resolve(mergeAeisGrid(fields, cacheData));
                return deffered.promise;
            }
        };

    };
}]);