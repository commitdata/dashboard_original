angular.module('myApp').factory('district2015Data', ['$http', function ($http) {
    function parseData(obj) {
        _.each(obj, function (value, key) {
            if (["DISTRICT"].indexOf(key) < 0) {
                obj[key] = parseFloat(value) || 0;
            }
        });
    };
    var year = 2015;
    return {
        setCurrentYear: function (currentYear) {
            year = currentYear;
        },
        getCounties: function () {
            return $http.get("/api/district/GetCounties?year=" + year);
        },
        getDistricts: function (county) {
            return $http.get("/api/district/GetDistricts?year=" + year + "&county=" + (county || ""));
        },

        getStudentInfo: function (district) {
            return $http.get("/api/district/getStudentInfo?year=" + year + "&district=" + district);
        },
        getCollegeAdmissions: function (district) {
            return $http.get("/api/district/GetCollegeAdmissions?year=" + year + "&district=" + district).then(function (response) {
                parseData(response.data[0]);
                parseData(response.data[1]);
                response.data[1].DISTNAME = "State";
                return response.data;
            });
        },
        getStaarAllGrades: function (district) {
            return $http.get("/api/district/GetStaarAllGrades?year=" + year + "&district=" + district).then(function (response) {
                parseData(response.data[0]);
                parseData(response.data[1]);
                response.data[1].DISTNAME = "State";
                return response.data;
            });
        },
        getStaarGrades: function (district, grade, subject, state) {
            var params = "?year=" + year + "&district=" + district;
            if (grade) {
                params = params + "&grade=" + grade;
            } else {
                params = params + "&grade=3";
            }
            if (subject) {
                params = params + "&subject=" + subject;
            }
            if(state)
            {
                params = params + "&state=" + state;
            }
            return $http.get("/api/district/GetStaarGrades" + params).then(function (response) {
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

            return $http.get("/api/district/GetGradesSubject?year=" + year +"&grade=" + grade).then(function (response) {
                return response.data;
            });
        },
        getStaarAllSubjectGrades: function (district) {
            return $http.get("/api/district/GetStaarAllSubjectGrades?year=" + year + "&district=" + district).then(function (response) {
                _.each(response.data, function (obj) {
                    _.each(obj, function (value, key) {
                        if (["District", "Subject", "Grade"].indexOf(key) < 0) {
                            obj[key] = parseFloat(value) || null;
                        }
                    });
                    obj["d"] = obj["d"] || (obj["satis_ph1_nm"] + obj["satis_rec_nm"]);
                    obj["ph1"] = (obj["satis_ph1_nm"] * 100) / obj["d"];
                    obj["rec"] = (obj["satis_rec_nm"] * 100) / obj["d"];
                });
                var groups = _.groupBy(response.data, function (i) { return i.District; });
                return _.values(groups);
            });
        },
        getStudentAll: function (district) {
            return $http.get("/api/district/GetStudentAll?year=" + year + "&district=" + district).then(function (response) { parseData(response.data[0]); return response.data; });
        },
        getStaffInformation: function (district) {
            return $http.get("/api/district/getStaffInfo?year=" + year + "&district=" + district);
        },
        getStaffExperience: function (district) {
            return $http.get("/api/district/getStaffExperience?year=" + year + "&district=" + district);
        },
        getDemograhicsTime: function (district) {
            return $http.get("/api/district/getDemograhicsTime?year=" + year + "&district=" + district);
        },
        getGraduationRates: function (district) {
            return $http.get("/api/district/getGraduationRates?year=" + year + "&district=" + district).then(function (response) {
                _.each(response.data, function (i) {
                    parseData(i);
                    if (i.DISTRICT == "'1") {
                        i.DISTNAME = "State";
                    }
                });
                return response.data;
            });
        },
        getStaarSubject: function (district) {
            return $http.get("/api/district/GetStaarSubject?year=" + year + "&district=" + district).then(function (response) {
                _.each(response.data, function (obj) {
                    _.each(obj, function (value, key) {
                        if (["District", "Year", "Subject", "Grade"].indexOf(key) < 0) {
                            obj[key] = parseFloat(value) || null;
                        }
                    });
                    obj["d"] = obj["d"] || (obj["satis_ph1_nm"] + obj["satis_rec_nm"]);
                    obj["ph1"] = (obj["satis_ph1_nm"] * 100) / obj["d"];
                    obj["rec"] = (obj["satis_rec_nm"] * 100) / obj["d"];
                });
                return response.data;
            });
        },
        getSatActTime: function (district) {
            return $http.get("/api/district/GetSatActTime?year=" + year + "&district=" + district).then(function (response) {
                _.each(response.data, function (i) {
                    parseData(i);
                    if (i.DISTRICT == "'1") {
                        i.DISTNAME = "State";
                    }
                });
                var groups = _.groupBy(response.data, function (i) { return i.DISTRICT; });
                return _.values(groups);
            });
        },
        addDistrictAnalytics: function (analytics) {
            return $http({ url: "/api/district/AddDistrictAnalytics", method: "POST", data: analytics }).then(function (response) {
                return response;
            });
        }
    };
}]);