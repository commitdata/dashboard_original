/* Global variables */
var SCHOOLS = [];

var rScale = d3.scale.sqrt()
                     .range([2, 20])

var colorScale = d3.scale.linear()
                        .range(["#c4161c", "#003663"])

/* Initalize the Google map. */
function schoolMap() {

    d3.json("assets/literacy/schools.json", function (data) {

        /* Assign data to global variables. */
        SCHOOLS = data;
        /* Sort so that the smallest schools display on top. */
        SCHOOLS.sort(function (a, b) { return d3.descending(a["gradeLevelNum"], b["gradeLevelNum"]) })

        rScale.domain(d3.extent(SCHOOLS, function (d) { return d["gradeLevelNum"] }))
        colorScale.domain(d3.extent(SCHOOLS, function (d) { return d["literacyRate"] }))



        var map = L.map('leafletMap').setView([32.7830600, -96.8066700], 10);
        L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
            maxZoom: 16
        }).addTo(map);

        _.each(SCHOOLS, function (school) {
            var cm = L.circleMarker([school.latitude, school.longitude], { fillOpacity: 0.6, radius: rScale(school["gradeLevelNum"]), fillColor: colorScale(school["literacyRate"]), color: '#ffffff', weight: 1, opacity: 1});
            cm.bindPopup(school["name"] + "<br><b>" + d3.format(".01f")(school["literacyRate"] * 100) + "%</b>");
            cm.addTo(map);
        });


    })

}