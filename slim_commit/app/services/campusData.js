angular.module('myApp').factory('campusData', ['$http', '$q', function ($http, $q) {
    var cachePromise = null;
    function parseData(obj) {
        _.each(obj, function (value, key) {
            if (["CAMPUS"].indexOf(key) < 0) {
                var flt = parseFloat(value) || 0;
                obj[key] = flt < 0 ? 0 : flt;
            }
        });
    };
    var year = 2016;
    return {
        setCurrentYear: function (currentYear) {
            year = currentYear;
        },
        getCounties: function () {
            return $http.get("/api/campus/GetCounties?year=" + year);
        },
        getDistricts: function (county) {
            return $http.get("/api/campus/GetDistricts?year=" + year + "&county=" + county);
        },
        getCampuses: function (district, county) {
            return $http.get("/api/campus/GetCampuses?year=" + year + "&district=" + (district || "") + "&county=" + county);
        },
        getCampusInfo: function (campus) {
            return $http.get("/api/campus/GetCampus?campus=" + campus).then(function (response) { return response.data; });
        },
        getStudentInfo: function (campus) {
            return $http.get("/api/campus/GetStudentInfo?year=" + year + "&campus=" + campus).then(function (response) { return response.data; });
        },
        getStaffExperience: function (campus) {
            return $http.get("/api/campus/GetStaffExperience?year=" + year + "&campus=" + campus).then(function (response) { return response.data; });
        },
        getGraduationRates: function (campus) {
            return $http.get("/api/campus/GetGraduationRates?year=" + year + "&campus=" + campus).then(function (response) {
                parseData(response.data[0]);
                return response.data;
            });
        },
        getCollegeAdmissions: function (campus) {
            return $http.get("/api/campus/GetCollegeAdmissions?year=" + year + "&campus=" + campus).then(function (response) {
                parseData(response.data[0]);
                return response.data;
            });
        },
        getStaarAll: function (campus) {
            var promises = [];
            promises.push($http.get("/api/campus/GetStaarAllCampus?campus=" + campus).then(function (response) {
                _.each(response.data, function (i) {
                    parseData(i);
                });
                return response.data;
            }));

            promises.push($http.get("/api/campus/GetStaarAllDistrict?campus=" + campus).then(function (response) {
                _.each(response.data, function (i) {
                    parseData(i);
                });
                return response.data;
            }));

            promises.push($http.get("/api/campus/GetStaarAllDistrict?campus=").then(function (response) {
                _.each(response.data, function (i) {
                    parseData(i);
                });
                return response.data;
            }));

            return $q.all(promises).then(function (dataSet) {
                //Hide spinner when all promises are resolved
                return { campus: dataSet[0], district: dataSet[1], state: dataSet[2] };
            });
        },
        getStaarSubject: function (campus) {
            return $http.get("/api/campus/GetStaarSubjectNew?year=" + year + "&campus=" + campus).then(function (response) {
                _.each(response.data, function (obj) { 
                    //_.each(obj, function (value, key) { 
                    //    if (["CAMPUS", "Subject", "Grade"].indexOf(key) < 0) {
                    //        obj[key] = parseFloat(value) || null;
                    //    }
                    //});
                    obj["d"] = obj["d"] || (obj["satis_ph1_nm"] + obj["satis_rec_nm"]);
                    obj["ph1"] = (obj["satis_ph1_nm"] * 100) / obj["d"];
                    obj["rec"] = (obj["satis_rec_nm"] * 100) / obj["d"];
                });
                return response.data;
            });
        },
        getStaarGrades: function (campus, grade, subject) {
            var params = "?year=" + year + "&campus=" + campus;
            if (grade) {
                params = params + "&grade=" + grade;
            } else {
                params = params + "&grade=3";
            }
            if (subject) {
                params = params + "&subject=" + subject;
            }
            return $http.get("/api/campus/GetStaarGradesNew" + params).then(function (response) {
                var finalData = [];
                var ph = {};
                var rec = {};
                _.each(response.data, function (obj) {
                    _.each(obj, function (value, key) {
                        if (["demo", "Subject", "Grade"].indexOf(key) < 0) {
                            obj[key] = parseFloat(value) || null;
                        }
                    });
                    obj["d"] = obj["d"] || (obj["satis_ph1_nm"] + obj["satis_rec_nm"]);
                    obj["ph1"] = ((obj["satis_ph1_nm"] * 100) / obj["d"]).toFixed();
                    obj["rec"] = ((obj["satis_rec_nm"] * 100) / obj["d"]).toFixed();
                    var d = obj["demo"];
                    ph[d] = obj["ph1"];
                    rec[d] = obj["rec"];
                });
                finalData.push(ph);
                finalData.push(rec);
                return finalData;
            });

        },
        getSelectStaarGrades: function (grade) {
            var subjects = [];
            if (!grade) grade = "3";

            return $http.get("/api/campus/GetGradesSubjectNew?year=" + year + "&grade=" + grade).then(function (response) {
                return response.data;
            });
        },


        getNewStaarSubject: function (campus) {
            return $http.get("/api/campus/GetNewStaarSubjectNew?year=" + year + "&campus=" + campus).then(function (response) {
                _.each(response.data, function (obj) {
                    //_.each(obj, function (value, key) {
                    //    if (["CAMPUS", "Subject", "Grade"].indexOf(key) < 0) {
                    //        obj[key] = parseFloat(value) || null;
                    //    }
                    //});
                    obj["d"] = obj["d"] || (obj["satis_ph1_nm"] + obj["satis_rec_nm"]);
                    obj["ph1"] = (obj["satis_ph1_nm"] * 100) / obj["d"];
                    obj["rec"] = (obj["satis_rec_nm"] * 100) / obj["d"];
                });
                return response.data;
            });
        },
        getStudentAll: function (campus) {
            return $http.get("/api/campus/GetStudentAll?year=" + year + "&campus=" + campus).then(function (response) { parseData(response.data[0]); console.log(response.data); return response.data; });
        },
        getStaffAll: function (campus) {
            return $http.get("/api/campus/GetStaffAll?year=" + year + "&campus=" + campus).then(function (response) { parseData(response.data[0]); console.log(response.data); return response.data; });
        },
        getAdmissionAll: function (campus) {
            return $http.get("/api/campus/GetAdmissionAll?year=" + year + "&campus=" + campus).then(function (response) { parseData(response.data[0]); console.log(response.data); return response.data; });
        },
        GetC4LongAll: function (campus) {
            return $http.get("/api/campus/GetC4LongAll?year=" + year + "&campus=" + campus).then(function (response) { parseData(response.data[0]); console.log(response.data); return response.data; });
        },
        getDemograhicsTime: function (campus) {
            return $http.get("/api/campus/getDemograhicsTime?year=" + year + "&campus=" + campus);
        },
        getMobilityTime: function (campus) {
            return $http.get("/api/campus/getMobilityTime?year=" + year + "&campus=" + campus);
        },
        getAttendanceTime: function (campus) {
            return $http.get("/api/campus/GetAttendanceTime?year=" + year + "&campus=" + campus);
        },
        getDropoutAll: function (campus) {
            return $http.get("/api/campus/GetDropoutAll?year=" + year + "&campus=" + campus).then(function (response) { parseData(response.data[0]); console.log(response.data); return response.data; });
        },
        getAPIBAll: function (campus) {
            return $http.get("/api/campus/GetAPIBAll?year=" + year + "&campus=" + campus).then(function (response) { parseData(response.data[0]); console.log(response.data); return response.data; });
        },
        getCCReadyAll: function (campus) {
            return $http.get("/api/campus/GetCCReadyAll?year=" + year + "&campus=" + campus).then(function (response) { parseData(response.data[0]); console.log(response.data); return response.data; });
        },
        addCampusAnalytics: function (analytics) {
            return $http({ url: "/api/campus/AddCampusAnalytics", method: "POST", data: analytics }).then(function (response) {
                return response;
            });
        }
    };

}]);