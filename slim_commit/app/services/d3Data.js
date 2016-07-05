'use strict';

angular.module('myApp').factory('d3Data', function ($http, $q) {
    return {
        getData: function () {
            /* Any intermediate data processing job should be done here (if required). e.g. My page is asking for points only then 
            I can extract poits from json over here and return it. So, now in controller, I don't have to write data.points everywhere.
            This is hust example here. When you deal with APIs with too much data, you can transform data over here as per page needs.*/

            return $http.get("/app/map_data/DallasCountyCensusTracts.json").then(function (response) { return response.data.points; });
        },

        getGeoJson: function () {
            return $http.get("/app/maps/jsons/circle.json").then(function (response) { return response.data.points; });
        },

        getRadioData: function () {
            return $http.get("/app/maps/csv/radio.csv").then(function (response) {
                return response.data;
            });
        }
    };
});