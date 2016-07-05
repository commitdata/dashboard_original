angular.module('myApp').factory('sqlData', ['$http', function ($http) {
    var campusListPromise = null;
    var filterDataPromise = null;
    var districtLongPromise = null;
    var cacheDict = {};
    return {
        getFilterData: function () {
            if (!filterDataPromise) {
                filterDataPromise = $http.get("/api/DistrictStaar/GetFilterData");
            }
            return filterDataPromise;
        },
        getDistrictStaarData: function (filters) {
            return $http.post("/api/Staar/FilterDistrictStaarData", filters);
        },
        getCampusStaarData: function (filters) {
            return $http.post("/api/Staar/FilterCampusStaarData", filters);
        },
        getCampusList: function () {
            if (!campusListPromise) {
                campusListPromise = $http.get("/api/staarSimple/getCampusList");
            }
            return campusListPromise;
        },
        getDistrictLong: function () {
            if (!districtLongPromise || districtLongPromise.$$state.status != 1) {
                districtLongPromise = $http.get("/api/districtLong/get").then(function (response) {
                    return response.data;
                });
            }
            return districtLongPromise;
        },
        getGrades: function (subjectID, categoryCode) {
            return $http({ method: "GET", url: "/api/teks/GetGrades", params: { subjectID: subjectID, categoryCode: categoryCode } }).then(function (response) { return response.data; });
        },
        getSubjects: function (subjectID, categoryCode, gradeID) {
            return $http({ method: "GET", url: "/api/teks/GetSubs", params: { subjectID: subjectID, categoryCode: categoryCode, gradeID: gradeID } }).then(function (response) { return response.data; });
        },
        getActExpDistricts: function () {
            return $http({ method: "GET", url: "/api/actExp/GetDistricts" }).then(function (response) { return response.data; });
        },
        getActExpFeeders: function (district) {
            return $http({ method: "GET", url: "/api/actExp/GetFeeders", params: { district: district } }).then(function (response) { return response.data; });
        },
        getActExpSchools: function (district, feeder) {
            return $http({ method: "GET", url: "/api/actExp/GetSchools", params: { district: district, feeder: feeder } }).then(function (response) { return response.data; });
        },
        getActExpSchoolsBySubject: function (district, column, table) {
            return $http({ method: "GET", url: "/api/actExp/GetSchoolsBySubject", params: { district: district, column: column, table: table } }).then(function (response) { return response.data; });
        },
        getActExpDistrictsTwo: function () {
            if (!cacheDict['actExpDistrictPromise']) {
                cacheDict['actExpDistrictPromise'] = $http({ method: "GET", url: "/api/actExp/GetDistrictsTwo" }).then(function (response) { return response.data; });
            }
            return cacheDict['actExpDistrictPromise'];
        },
        getActExpData: function (district, demo, yColumn, xColumn) {
            return $http({ method: "POST", url: "/api/actExp/ActExpData", data: { CurrentDistrict: district, Demo: demo, yColumn: yColumn, xColumn: xColumn } }).then(function (response) { return response.data; });
        },
        getActExpAll: function (subject, grade, demo, yColumn, xColumn, districts) {
            return $http({ method: "POST", url: "/api/actExp/ActExpAllData", data: { Subject: subject, Grade: grade, Demo: demo, yColumn: yColumn, xColumn: xColumn, Districts: districts } }).then(function (response) { return response.data; });
        },
        getActExpSlopeIntersect: function (demo, yColumn, xColumn, districts) {
            return $http({ method: "POST", url: "/api/actExp/ActExpSlopeIntersect", data: { Demo: demo, yColumn: yColumn, xColumn: xColumn, Districts: districts } }).then(function (response) { return response.data; });
        },
    };

}]);


angular.module('myApp').factory("JSONToCSV", function () {

    function publish(data, filename) {
        var Builder = window.MozBlobBuilder || window.WebKitBlobBuilder || window.BlobBuilder;
        var blob;
        if (Builder) {
            var builder = new Builder();
            builder.append(data);
            blob = builder.getBlob();
        }
        else {
            blob = new Blob([data]);
        }

        var bURL = window.webkitURL || window.URL;

        var url = bURL.createObjectURL(blob);

        var link = document.createElement("a");
        link.href = url;

        //set the visibility hidden so it will not effect on your web-layout
        link.style = "visibility:hidden";
        link.download = fileName + ".csv";

        //this part will append the anchor tag and remove it after automatic click
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    var converter = function (JSONData, ReportTitle, ShowLabel, labelDict) {
        //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
        var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

        var CSV = '';
        //Set Report title in first row or line

        //CSV += ReportTitle + '\r\n\n';

        //This condition will generate the Label/Header
        if (ShowLabel) {
            var row = "";
            labelDict = labelDict || {};
            //This loop will extract the label from 1st index of on array
            for (var index in arrData[0]) {

                //Now convert each value to string and comma-seprated
                row += "\"" + (labelDict[index] || index) + "\"" + ',';
            }

            row = row.slice(0, -1);

            //append Label row with line break
            CSV += row + '\r\n';
        }

        //1st loop is to extract each row
        for (var i = 0; i < arrData.length; i++) {
            var row = "";

            //2nd loop will extract each column and convert it in string comma-seprated
            for (var index in arrData[i]) {
                var data;
                try { data = (arrData[i][index]).toString(); } catch (ex) { data = "null"; }
                data = data.replace(/\"/g, '""');
                row += '"' + data + '",';
            }

            row.slice(0, row.length - 1);

            //add a line break after each row
            CSV += row + '\r\n';
        }

        if (CSV == '') {
            alert("Invalid data");
            return;
        }

        //this will remove the blank-spaces from the title and replace it with an underscore
        fileName = ReportTitle.replace(/ /g, "_");

        publish(CSV, fileName + ".csv");
    };

    return converter;
});



angular.module('myApp').factory("d2bURI", function () {

    function dataURItoBlob(dataURI) {
        var rawData = dataURI.substring(dataURI.indexOf("base64,") + 7);
        var data = atob(rawData);
        var arr = new Uint8Array(data.length);

        for (var i = 0; i < data.length; ++i) {
            arr[i] = data.charCodeAt(i);
        }
        var stream = arr.buffer;
        var Builder = window.MozBlobBuilder || window.WebKitBlobBuilder || window.BlobBuilder;
        var blob;
        if (Builder) {
            var builder = new Builder();
            builder.append(stream);
            blob = builder.getBlob();
        }
        else {
            blob = new Blob([stream]);
        }
        return blob;
    };


    var downloader = function (dataURI) {
        var blob = dataURItoBlob(dataURI);
        var bURL = window.webkitURL || window.URL;
        return bURL.createObjectURL(blob);
    };

    return downloader;
});


//angular.module('myApp').factory("printDiv", ['$q', function ($q) {

//    var printer = function (divID, fileName) {
//        var deferred = $q.defer();
//        var height = 595.28;
//        var width = 841.89;
//        effeciveWidth = width - 20;
//        effectiveHeight = height - 80;
//        var doc = new jsPDF("l", "pt", 'a4'); /* 'a4'  : [ 595.28,  841.89] you can specify custom size like [640,480] http://stackoverflow.com/questions/23104008/where-to-change-default-pdf-page-width-and-font-size-in-jspdf-debug-js */
//        var selector = $(".print-item:visible", "#" + divID);

//        var cursor = 40;


//        function addItem(el, index) {
//            var jEl = $(el);
//            var elements = jEl.find('svg').map(function () {
//                var svg = $(this);
//                var canvas = document.createElement('canvas');

//                canvg(canvas, svg[0].outerHTML);
//                svg.replaceWith(canvas);
//                return {
//                    svg: svg,
//                    canvas: canvas
//                };
//            });

//            var backG = jEl.css("background-color");
//            if (backG == "rgba(0, 0, 0, 0)") {
//                jEl.css("background-color", "#ffffff");
//            }
           
//            html2canvas(jEl, {
//                useCORS: true,
//                logging: true
//            }).then(function (canvas) {
//                var dataUrl = canvas.toDataURL('image/jpeg');
//                if (canvas.width > effeciveWidth) {
//                    var ratio = canvas.width / effeciveWidth;
//                    canvas.width = effeciveWidth;
//                    canvas.height = canvas.height / ratio;
//                }
//                if ((cursor + canvas.height) > effectiveHeight) {
//                    doc.addPage();
//                    cursor = 40;
//                }

//                doc.addImage(dataUrl, 'JPEG', 10, cursor, canvas.width, canvas.height);

//                cursor += canvas.height + (jEl.hasClass("no-print-padding") ? 0 : 10);

//                jEl.css("background-color", backG);
//                elements.each(function () {
//                    $(this.canvas).replaceWith(this.svg);
//                });
//                if (index == (selector.length - 1)) {
//                    doc.save(fileName + '.pdf');
//                    deferred.resolve();
//                }
//                else {
//                    addItem(selector[index + 1], index + 1);
//                }

//            });
//        };
        
//        addItem(selector[0], 0);

//        return deferred.promise;
//    };

//    return printer;
//}]);

angular.module('myApp').factory("printDiv", ['$q', function ($q) {

    kendo.pdf.defineFont({
        "themify": "/content/fonts/themify-icons/fonts/themify.ttf",
        "Open Sans": "/content/fonts/open-sans/OpenSans-Regular.ttf",
        "FontAwesome": "/content/fonts/font-awesome/fontawesome-webfont.ttf",
        "Arial": "/content/fonts/arial/arial.ttf"
    });

    var printer = function (divID, fileName, pageSize) {
        var deferred = $q.defer();
        kendo.drawing
                .drawDOM("#" + divID, {
                    paperSize: pageSize,
                    margin: {
                        left: "20mm",
                        top: "40mm",
                        right: "20mm",
                        bottom: "40mm"
                    },
                    forcePageBreak: ".page-break"
                })
                .then(function (group) {
                    kendo.drawing.pdf.saveAs(group, fileName + ".pdf");
                    deferred.resolve();
                });

        return deferred.promise;
    };

    return printer;
}]);