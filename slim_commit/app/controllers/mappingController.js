angular.module('myApp').controller('mappingController', function ($scope) {

    $scope.hello = "yo!";

    $scope.schools = [];

    //====
    //var styler = [{ "featureType": "all", "stylers": [{ "saturation": 0 }, { "hue": "#e7ecf0" }] }, { "featureType": "road", "stylers": [{ "saturation": -70 }] }, { "featureType": "transit", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi", "stylers": [{ "visibility": "off" }] }, { "featureType": "water", "stylers": [{ "visibility": "simplified" }, { "saturation": -60 }] }];
    //var styler = [{ "featureType": "road", "elementType": "labels", "stylers": [{ "visibility": "on" }] }, { "featureType": "poi", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative", "stylers": [{ "visibility": "off" }] }, { "featureType": "road", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "weight": 1 }] }, { "featureType": "road", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "weight": 0.8 }] }, { "featureType": "landscape", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "water", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "stylers": [{ "visibility": "off" }] }, { "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "elementType": "labels.text", "stylers": [{ "visibility": "on" }] }, { "elementType": "labels.text.stroke", "stylers": [{ "color": "#ffffff" }] }, { "elementType": "labels.text.fill", "stylers": [{ "color": "#ffffff" }] }, { "elementType": "labels.icon", "stylers": [{ "visibility": "on" }] }];
    //var styler = [{ "featureType": "road", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "road", "elementType": "labels", "stylers": [{ "visibility": "on" }] }, { "featureType": "poi", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative", "stylers": [{ "visibility": "off" }] }, { "featureType": "road", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "weight": 1 }] }, { "featureType": "road", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "weight": 0.8 }] }, { "featureType": "landscape", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "water", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "stylers": [{ "visibility": "off" }] }, { "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "elementType": "labels.text", "stylers": [{ "visibility": "on" }] }, { "elementType": "labels.text.stroke", "stylers": [{ "color": "#ffffff" }] }, { "elementType": "labels.text.fill", "stylers": [{ "color": "#ffffff" }] }, { "elementType": "labels.icon", "stylers": [{ "visibility": "on" }] }];

    $("#map-canvas").height($(window).height()-50);
    $("#mapLeft").height($(window).height() - 50);
        var mapOptions = {
            center: new google.maps.LatLng(32.795903, -96.795903),
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true
            //styles: styler
            //fillOpacity:.1
        };

        var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        map.data.loadGeoJson('/app/map_data/TravisCounty.json');


        
        //map.data.loadGeoJson('/app/map_data/DallasCityLimits.json');






        //d3.csv('../../commute_times.csv', function (data) {
        //    var x = [];
        //    data.forEach(function (d) {
        //        //x.push({d.GeoId: d.data});
        //        var myObj = new Object();
        //        myObj["geo"] = parseInt(d.GEOID);
        //        //console.log(d.GeoId);
        //        myObj["data"] = parseFloat(d.travel_time);
        //        //console.log("d.multiplied");
        //        //console.log(d.multiplied);
        //        x.push(myObj);
        //    });

        //    //createHeatmapPercent('data', x);
        //    createHeatmap('data', x);

        //});

        d3.csv('../../PovertyByCounty.csv', function (data) {
            var x = [];
            data.forEach(function (d) {
                //x.push({d.GeoId: d.data});
                var myObj = new Object();
                myObj["geo"] = parseInt(d.GEOID);
                myObj["data"] = parseFloat(d.percent_poverty);
                myObj["county"] =d.county;
                myObj["year"] = parseFloat(d.Year);

                x.push(myObj);
            });

            createHeatmapPercent('data', x);
            //createHeatmapNeg('data', x);

        });

        function createHeatmapNeg(field, myData) {

            var justField = _.pluck(myData, field);
            //get max & min
            var max = _.max(justField);
            var min = _.min(justField);

            console.log(min + "," + max);

            map.data.setStyle(function (feature) {
                var GEOID = feature.getProperty('GEOID');
                //console.log(GEOID);
                var match = _.where(myData, { "geo": GEOID });

                if (match.length != 0) {
                    //console.log(parseFloat(match[0][field]));
                    //var filler = Math.round(match[0][field] * (255 / max));
                    var filler = Math.round(match[0][field] * 255);
                    //console.log(Math.round(((max - match[0][field]) / max) * 255));
                    if (parseFloat(match[0][field]) < 0) {
                        return ({
                            fillColor: 'rgb(255,0,0)',
                            fillOpacity: 1,
                            strokeColor: 'white',
                            strokeWeight: .5
                        });

                    }
                    else {//not negative
                        //filler = Math.round(match[0][field] * (255 / max));

                        //return ({

                        //    fillColor: 'rgb(0,' + filler.toString() + ',0)',
                        //    fillOpacity: 1,
                        //    strokeColor: 'white',
                        //    strokeWeight: 1
                        //});

                        if (parseFloat(match[0][field]) > 25.7) {
                            return ({

                                fillColor: 'rgb(0,255,0)',
                                fillOpacity: 1,
                                //strokeColor: 'white',
                                strokeWeight: .2
                            });
                        }
                        if (parseFloat(match[0][field]) > 5.83 && parseFloat(match[0][field]) <= 25.7) {
                            return ({

                                fillColor: 'rgb(0,192,0)',
                                fillOpacity: 1,
                                //strokeColor: 'white',
                                strokeWeight: .2
                            });
                        }
                        if (parseFloat(match[0][field]) > 1.34 && parseFloat(match[0][field]) <= 5.83) {
                            return ({

                                fillColor: 'rgb(0,128,0)',
                                fillOpacity: 1,
                                //strokeColor: 'white',
                                strokeWeight: .2
                            });
                        }
                        else {
                            return ({

                                fillColor: 'rgb(0,64,0)',
                                fillOpacity: 1,
                                //strokeColor: 'white',
                                strokeWeight: .2
                            });


                        }
                    }
                }
                else {
                    return ({
                        fillColor: 'rgb(0,0,255)',
                        fillOpacity: 1,
                        strokeColor: 'white',
                        strokeWeight: 1
                    });

                }



                

            });
        }

        //var data2 = new google.maps.Data();
        //data2.loadGeoJson('/app/map_data/DallasCityLimits.json');
        //map.dataLayer = data2;
        //data2.setMap(map);
        //data2.setStyle({
        //    strokeColor: 'white',
        //    strokeWeight: 15
        //});



        function createHeatmap(field, myData) {

            var justField = _.pluck(myData, field);
            //get max & min
            var max = _.max(justField);
            var min = _.min(justField);

            console.log(min + "," + max);

            map.data.setStyle(function (feature) {
                var GEOID = feature.getProperty('GEOID');
                //console.log(GEOID);
                var match = _.where(myData, { "geo": GEOID });
                //console.log(match);

                if (match.length === 0) {
                    console.log("null " + GEOID);
                }

                var filler;
                if (match.length === 0) {
                    filler = 255;
                }
                else {
                    //                    filler = Math.round(((max - match[0][field]) / max) * 255);

                    filler = Math.round(match[0][field]*(255/max));
                    //console.log("okay");
                    console.log(Math.round(((max - match[0][field]) / max) * 255));
                    //if (parseInt(match[0][field]) < 0) {
                    //    filler = Math.round(match[0][field] * (255 / max));

                    //}
                }
                if (match.length === 0) {
                    return ({
                        fillColor: 'rgb(0,255,0)',
                        fillOpacity: .2,
                        strokeColor: 'white',
                        strokeWeight: 1
                    });
                }
                else {
                    return ({
                        fillColor: 'rgb(0,' + filler.toString() + ',0)',
                        fillOpacity: 1,
                        strokeColor: 'white',
                        strokeWeight: 1
                    });
                }
            });

            //addMarkers();

            //var pointArray = new google.maps.MVCArray(taxiData);
            //map.heatLayer = new google.maps.visualization.HeatmapLayer({
            //    data: pointArray
            //});
            //map.heatLayer.setMap(map);

            //var marker = new google.maps.Marker({
            //    position: new google.maps.LatLng(32.826458, -96.806549),
            //    map: map,
            //    title: 'Hello World!'
            //});

        }




        $scope.table = [
            { variable: 'HKROSDS', title: 'Total Households' },
            { variable: 'HKROSDS', title: 'Total Population' },
            { variable: 'HKROSDS', title: 'Educational Attainment' },
            { variable: 'HKROSDS', title: 'Total Households' },
            { variable: 'HKROSDS', title: 'Total Households' },
            { variable: 'HKROSDS', title: 'Total Households' }
        ];

        $scope.hello = function () {
            d3.csv('../../census_data.csv', function (data) {
                var x = [];
                data.forEach(function (d) {
                    //x.push({d.GeoId: d.data});
                    var myObj = new Object();
                    myObj["geo"] = parseInt(d.GeoId);
                    myObj["data"] = parseFloat(d.below_poverty_p);

                    x.push(myObj);
                });

                createHeatmapPercent('data', x);
            });
        }


        function createHeatmapPercent(field, myData) {
            console.log(myData);
            var filtered = _.where(myData, { 'county': 'Travis County', 'year': 2010});
            console.log('filtered');
            console.log(filtered);
            var justField = _.pluck(filtered, field);
            //get max & min
            var max = _.max(justField);
            var min = _.min(justField);

            console.log(min + "," + max);

            map.data.setStyle(function (feature) {
                var GEOID = feature.getProperty('GEOID');
                //console.log(GEOID);
                var match = _.where(filtered, { "geo": GEOID });
                //console.log(match);

                if (match.length === 0) {
                    console.log("null " + GEOID);
                }

                var filler;
                if (match.length === 0) {
                    filler = 255;
                }
                else {
                    //filler = Math.round(match[0][field] * (255/max));//255
                    filler = Math.round(match[0][field] * 255);//255
                    console.log(filler);
                }
                if (match.length === 0) {
                    return ({
                        //fillColor: 'rgb(0,0,255)',
                        fillColor: 'rgb(255,0,0)',
                        fillOpacity: 0,
                        strokeColor: 'white',
                        strokeWeight: 1
                    });
                }
                else {
                    return ({
                        //fillColor: 'rgb(0,0,' + filler.toString() + ')',
                        fillColor: 'rgb(0,0,'+filler.toString()+')',
                        fillOpacity: 1,
                        strokeColor: 'white',
                        strokeWeight: 0
                    });
                }
            });

        }


        function addMarkers() {

            var myMarkers = [
  {
      "colorCode": 1,
      "lat": 32.877078,
      "lng": -96.87578
  },
  {
      "colorCode": 1,
      "lat": 32.877555,
      "lng": -96.874946
  },
  {
      "colorCode": 1,
      "lat": 32.8556563,
      "lng": -96.8660521
  },
  {
      "colorCode": 1,
      "lat": 32.864635,
      "lng": -96.868217
  },
  {
      "colorCode": 1,
      "lat": 32.875949,
      "lng": -96.845909
  },
  {
      "colorCode": 1,
      "lat": 32.865116,
      "lng": -96.818778
  },
  {
      "colorCode": 1,
      "lat": 32.8666567,
      "lng": -96.8220183
  },
  {
      "colorCode": 1,
      "lat": 32.901565,
      "lng": -96.804885
  },
  {
      "colorCode": 1,
      "lat": 32.901565,
      "lng": -96.804885
  },
  {
      "colorCode": 1,
      "lat": 32.89513,
      "lng": -96.808517
  },
  {
      "colorCode": 1,
      "lat": 32.9096096,
      "lng": -96.8061268
  },
  {
      "colorCode": 1,
      "lat": 32.8949406,
      "lng": -96.8066981
  },
  {
      "colorCode": 1,
      "lat": 32.8949406,
      "lng": -96.8066981
  },
  {
      "colorCode": 1,
      "lat": 32.917621,
      "lng": -96.801605
  },
  {
      "colorCode": 1,
      "lat": 32.916103,
      "lng": -96.799644
  },
  {
      "colorCode": 1,
      "lat": 32.880661,
      "lng": -96.797203
  },
  {
      "colorCode": 1,
      "lat": 32.895755,
      "lng": -96.791786
  },
  {
      "colorCode": 1,
      "lat": 32.880249,
      "lng": -96.788146
  },
  {
      "colorCode": 1,
      "lat": 32.909896,
      "lng": -96.772232
  },
  {
      "colorCode": 1,
      "lat": 32.909896,
      "lng": -96.772232
  },
  {
      "colorCode": 1,
      "lat": 32.899978,
      "lng": -96.772781
  },
  {
      "colorCode": 1,
      "lat": 32.899978,
      "lng": -96.772781
  },
  {
      "colorCode": 1,
      "lat": 32.881237,
      "lng": -96.802658
  },
  {
      "colorCode": 1,
      "lat": 32.881237,
      "lng": -96.802658
  },
  {
      "colorCode": 1,
      "lat": 32.881237,
      "lng": -96.802658
  },
  {
      "colorCode": 1,
      "lat": 32.87339,
      "lng": -96.876396
  },
  {
      "colorCode": 1,
      "lat": 32.880027,
      "lng": -96.864776
  },
  {
      "colorCode": 1,
      "lat": 32.919391,
      "lng": -96.809844
  },
  {
      "colorCode": 1,
      "lat": 32.876457,
      "lng": -96.869194
  },
  {
      "colorCode": 1,
      "lat": 32.869976,
      "lng": -96.854499
  },
  {
      "colorCode": 1,
      "lat": 32.864955,
      "lng": -96.873001
  },
  {
      "colorCode": 1,
      "lat": 32.902217,
      "lng": -96.783271
  },
  {
      "colorCode": 1,
      "lat": 32.895755,
      "lng": -96.791786
  },
  {
      "colorCode": 1,
      "lat": 32.895755,
      "lng": -96.791786
  },
  {
      "colorCode": 1,
      "lat": 32.880786,
      "lng": -96.794878
  },
  {
      "colorCode": 1,
      "lat": 32.883182,
      "lng": -96.784622
  },
  {
      "colorCode": 1,
      "lat": 32.88557,
      "lng": -96.784545
  },
  {
      "colorCode": 1,
      "lat": 32.879299,
      "lng": -96.740402
  },
  {
      "colorCode": 1,
      "lat": 32.865509,
      "lng": -96.749496
  },
  {
      "colorCode": 1,
      "lat": 32.858661,
      "lng": -96.740493
  },
  {
      "colorCode": 1,
      "lat": 32.8665715,
      "lng": -96.8797897
  },
  {
      "colorCode": 1,
      "lat": 32.8743976,
      "lng": -96.872706
  },
  {
      "colorCode": 1,
      "lat": 32.859752,
      "lng": -96.863594
  },
  {
      "colorCode": 1,
      "lat": 32.8666567,
      "lng": -96.8220183
  },
  {
      "colorCode": 1,
      "lat": 32.867507,
      "lng": -96.838661
  },
  {
      "colorCode": 1,
      "lat": 32.890747,
      "lng": -96.801315
  },
  {
      "colorCode": 1,
      "lat": 32.921741,
      "lng": -96.786834
  },
  {
      "colorCode": 1,
      "lat": 32.917621,
      "lng": -96.801605
  },
  {
      "colorCode": 1,
      "lat": 32.916103,
      "lng": -96.799644
  },
  {
      "colorCode": 1,
      "lat": 32.910018,
      "lng": -96.793426
  },
  {
      "colorCode": 1,
      "lat": 32.881237,
      "lng": -96.802658
  },
  {
      "colorCode": 1,
      "lat": 32.881237,
      "lng": -96.802658
  },
  {
      "colorCode": 2,
      "lat": 32.857734,
      "lng": -96.874992
  },
  {
      "colorCode": 2,
      "lat": 32.860771,
      "lng": -96.88198
  },
  {
      "colorCode": 2,
      "lat": 32.9094969,
      "lng": -96.7721573
  },
  {
      "colorCode": 2,
      "lat": 32.857734,
      "lng": -96.874992
  },
  {
      "colorCode": 2,
      "lat": 32.854545,
      "lng": -96.867912
  },
  {
      "colorCode": 2,
      "lat": 32.8675278,
      "lng": -96.8648907
  },
  {
      "colorCode": 2,
      "lat": 32.880096,
      "lng": -96.856575
  },
  {
      "colorCode": 3,
      "lat": 32.8743976,
      "lng": -96.872706
  },
  {
      "colorCode": 3,
      "lat": 32.851394,
      "lng": -96.879028
  },
  {
      "colorCode": 3,
      "lat": 32.876457,
      "lng": -96.869194
  },
  {
      "colorCode": 3,
      "lat": 32.876457,
      "lng": -96.869194
  },
  {
      "colorCode": 3,
      "lat": 32.869976,
      "lng": -96.854499
  },
  {
      "colorCode": 3,
      "lat": 32.880027,
      "lng": -96.864776
  },
  {
      "colorCode": 4,
      "lat": 32.8792175,
      "lng": -96.8386137
  },
  {
      "colorCode": 4,
      "lat": 32.8949406,
      "lng": -96.8066981
  },
  {
      "colorCode": 2,
      "lat": 32.879692,
      "lng": -96.89093
  },
  {
      "colorCode": 3,
      "lat": 32.862876,
      "lng": -96.859085
  },
  {
      "colorCode": 3,
      "lat": 32.8708115,
      "lng": -96.8647995
  },
  {
      "colorCode": 3,
      "lat": 32.923393,
      "lng": -96.78421
  },
  {
      "colorCode": 3,
      "lat": 32.851394,
      "lng": -96.879028
  },
  {
      "colorCode": 3,
      "lat": 32.851394,
      "lng": -96.879028
  },
  {
      "colorCode": 3,
      "lat": 32.892498,
      "lng": -96.770584
  },
  {
      "colorCode": 3,
      "lat": 32.9094969,
      "lng": -96.7721573
  }
            ];


            _.each(myMarkers, function (i, x) {

                if (myMarkers[x]["colorCode"] == "1") {

                    var marker = new google.maps.Marker({
                        position: new google.maps.LatLng(myMarkers[x]["lat"], myMarkers[x]["lng"]),
                        map: map,
                        icon: '../../images/orangeSmall.png',
                        //title: 'Hello World!'
                    });


                }

                else if (myMarkers[x]["colorCode"] == "2") {

                    var marker = new google.maps.Marker({
                        position: new google.maps.LatLng(myMarkers[x]["lat"], myMarkers[x]["lng"]),
                        map: map,
                        icon: '../../images/redCircle.png',
                        //title: 'Hello World!'
                    });

                }
                else if (myMarkers[x]["colorCode"] == "3")
                {

                    var marker = new google.maps.Marker({
                        position: new google.maps.LatLng(myMarkers[x]["lat"], myMarkers[x]["lng"]),
                        map: map,
                        icon: '../../images/blueCircle.png',
                        //title: 'Hello World!'
                    });

                }
                else if (myMarkers[x]["colorCode"] == "4") {

                    var marker = new google.maps.Marker({
                        position: new google.maps.LatLng(myMarkers[x]["lat"], myMarkers[x]["lng"]),
                        map: map,
                        icon: '../../images/yellowCircle.png',
                        //title: 'Hello World!'
                    });

                }


            });



        }




});