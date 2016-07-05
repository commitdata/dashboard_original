angular.module('myApp').controller('spreadsheetController', ['$scope', '$timeout', 'mapper', 'lookup', 'JSONToCSV', function ($scope, $timeout, mapper, lookup, JSONToCSV) {

    var spreadsheet = null;
    $scope.spreadsheetFields = mapper.spreadsheetFields;
    $scope.categories = [
        {
            name: "Campus Information", fields: [
              { name: "County_Name", selected: false },
              { name: "Grade_Span", selected: false },
              { name: "School_Type", selected: false },
              { name: "Campus_Number", selected: false },
              { name: "All_Students_Count", selected: false }
            ]
        },
        {
            name: "student demographics", fields: [
              { name: "Econ_Disadv_Count", selected: false },
              { name: "Econ_Disadv_P", selected: false },
              { name: "Non_Econ_Disdav_Count", selected: false },
              { name: "Non_Econ_Disadv_P", selected: false },
              { name: "African_American_Count", selected: false },
              { name: "African_American_P", selected: false },
              { name: "Hispanic_Count", selected: false },
              { name: "Hispanic_P", selected: false },
              { name: "White_Count", selected: false },
              { name: "White_P", selected: false },
              { name: "Other_Race_Count", selected: false },
              { name: "Other_Race_P", selected: false },
              { name: "White_Other_Race_Count", selected: false },
              { name: "White_Other_Race_P", selected: false },
              { name: "LEP_Count", selected: false },
              { name: "LEP_P", selected: false },
              { name: "Non_LEP_Count", selected: false },
              { name: "Non_LEP_P", selected: false },
              { name: "At_Risk_Count", selected: false },
              { name: "At_Risk_P", selected: false }
            ]
        },
         {
             name: "student enrollment", fields: [
                { name: "EE_Count", selected: false },
                { name: "EE_P", selected: false },
                { name: "Pre_K_Count", selected: false },
                { name: "Pre_K_P", selected: false },
                { name: "Kinder_Count", selected: false },
                { name: "Kinder_P", selected: false },
                { name: "N1st_Grade_Count", selected: false },
                { name: "N1st_Grade_P", selected: false },
                { name: "N2nd_Grade_Count", selected: false },
                { name: "N2nd_Grade_P", selected: false },
                { name: "N3rd_Grade_Count", selected: false },
                { name: "N3rd_Grade_P", selected: false },
                { name: "N4th_Grade_Count", selected: false },
                { name: "N4th_Grade_P", selected: false },
                { name: "N5th_Grade_Count", selected: false },
                { name: "N5th_Grade_P", selected: false },
                { name: "N6th_Grade_Count", selected: false },
                { name: "N6th_Grade_P", selected: false },
                { name: "N7th_Grade_Count", selected: false },
                { name: "N7th_Grade_P", selected: false },
                { name: "N8th_Grade_Count", selected: false },
                { name: "N8th_Grade_P", selected: false },
                { name: "N9th_Grade_Count", selected: false },
                { name: "N9th_Grade_P", selected: false },
                { name: "N10th_Grade_Count", selected: false },
                { name: "N10th_Grade_P", selected: false },
                { name: "N11th_Grade_Count", selected: false },
                { name: "N11th_Grade_P", selected: false },
                { name: "N12th_Grade_Count", selected: false },
                { name: "N12th_Grade_P", selected: false }
             ]
         },
         {
             name: "other variables", fields: [
                { name: "Mobile_Students", selected: false },
                { name: "Mobility_P", selected: false },
                { name: "Total_Graduates_Count", selected: false },
                { name: "African_American_Grads", selected: false },
                { name: "Hispanic_Grads", selected: false },
                { name: "White_Grads", selected: false },
                { name: "Other_Race_Grads", selected: false },
                { name: "Est_Econ_Disadv_1st_Graders", selected: false },
                { name: "Pre_K_Enrollment", selected: false },
                { name: "Pre_K_Enrollment_Gap", selected: false },
                { name: "Pre_K_Enrollment_P", selected: false },
                { name: "Pre_K_Gap_P", selected: false }

             ]
         },
         {
             name: "STAAR indicator achievement", fields: [
                { name: "N3rd_Graders_Taking_Math_Exam", selected: false },
                { name: "P_Level_2_Phase_In_1_3rd_Grade_Math", selected: false },
                { name: "H_3rd_Graders_Not_Level_2_Phase_in_1_in_Math", selected: false },
                { name: "P_Level_2_Fin_Rec_3rd_Grade_Math", selected: false },
                { name: "H_3rd_Graders_Not_Level_2_Fin_Rec_in_Math", selected: false },
                { name: "N3rd_Graders_Taking_Rdg_Exam", selected: false },
                { name: "P_Level_2_Phase_In_1_3rd_Grade_Rdg", selected: false },
                { name: "H_3rd_Graders_Not_Level_2_Phase_in_1_in_Rdg", selected: false },
                { name: "P_Level_2_Fin_Rec_3rd_Grade_Rdg", selected: false },
                { name: "H_3rd_Graders_Not_Level_2_Fin_Rec_in_Rdg", selected: false },
                { name: "N4th_Graders_Taking_Math_Exam", selected: false },
                { name: "P_Level_2_Phase_In_1_4th_Grade_Math", selected: false },
                { name: "H_4th_Graders_Not_Level_2_Phase_in_1_in_Math", selected: false },
                { name: "P_Level_2_Fin_Rec_4th_Grade_Math", selected: false },
                { name: "H_4th_Graders_Not_Level_2_Fin_Rec_in_Math", selected: false },
                { name: "N4th_Graders_Taking_Rdg_Exam", selected: false },
                { name: "P_Level_2_Phase_In_1_4th_Grade_Rdg", selected: false },
                { name: "H_4th_Graders_Not_Level_2_Phase_in_1_in_Rdg", selected: false },
                { name: "P_Level_2_Fin_Rec_4th_Grade_Rdg", selected: false },
                { name: "H_4th_Graders_Not_Level_2_Fin_Rec_in_Rdg", selected: false },
                { name: "N8th_Graders_Taking_Sci_Exam", selected: false },
                { name: "P_Level_2_Phase_In_1_8th_Grade_Sci", selected: false },
                { name: "H_8th_Graders_Not_Level_2_Phase_in_1_in_Sci", selected: false },
                { name: "P_Level_2_Fin_Rec_8th_Grade_Sci", selected: false },
                { name: "H_8th_Graders_Not_Level_2_Fin_Rec_in_Sci", selected: false },
                { name: "Alg_1_Taking_Exam", selected: false },
                { name: "P_Level_2_Phase_In_1_Alg_1", selected: false },
                { name: "H_Alg_1_Not_Level_2_Phase_in_1", selected: false },
                { name: "P_Level_2_Fin_Rec_Alg_1", selected: false },
                { name: "H_Alg_1_Not_Level_2_Fin_Rec", selected: false }

             ]
         },
         {
             name: "STAAR all grades all subjects", fields: [
                { name: "Phase_in_1_All_Grades_All_Subjects", selected: false },
                { name: "Final_Rec_All_Grades_All_Subjects", selected: false }
             ]
         },
          {
              name: "SAT/ACT College Ready", fields: [
                { name: "Percent_of_2013_Grads_Taking_SAT_ACT", selected: false },
                { name: "Percent_of_Grads_Above_Criterion", selected: false },
                { name: "Percent_College_Ready", selected: false },
                { name: "Number_graduates_not_College_Ready", selected: false }
              ]
          }
    ];


    function ResetGrid() {
        if (spreadsheet) {
            spreadsheet.destroy();
            $("#spreadsheet").empty();
            spreadsheet = null;
        }
    };


    function GetColumns() {
        var columns = ['Campus_Name', 'District_Name'];
        _.each($scope.categories, function (item) {
            _.each(item.fields, function (field) {
                if (field.selected) {
                    columns.push(field.name);
                }
            })
        });
        return columns;
    };

    $scope.setAll = function (category, value) {
        _.each(category.fields, function (field) {
            field.selected = value;
        })
        $scope.update();
    };

    $scope.update = function () {
        updateGrid();
    };

    $scope.downloadExcel = function () {
        var allData = $("#spreadsheet").data("kendoGrid").dataSource.view();
        var columns = GetColumns();
        var mappedData = _.map(allData, function (item) { return _.pick(item, function (value, key) { return columns.indexOf(key) > -1; }); });
        JSONToCSV(mappedData, "spreadsheet_data", true, mapper.spreadsheetFields);
    };

    $scope.$on("$viewContentLoaded", function () {
        init();
    });

    function init() {
        d3.csv('assets/DemographicsSTAARCollege.csv', function (data) {
            $timeout(function () { $scope.data = data; createGrid(); }, 5);
        });
    };

    function updateGrid() {
        /*Thanks to Dimo (http://www.telerik.com/forums/dynamically-add-new-column) : http://jsfiddle.net/rusev/6yJkM/12/ */
        var columns = GetColumns();
        var mappedData = _.map($scope.data, function (item) { return _.pick(item, function (value, key) { return columns.indexOf(key) > -1; }); });
        spreadsheet.columns = [];
        spreadsheet.thead.remove();
        spreadsheet.dataSource.data(mappedData);
    };


    function createGrid() {
        var selectedColumns = GetColumns();
        var columns = [];
        _.each(selectedColumns, function (i, x) {
            if (i != "Identity") {
                columns.push({ field: selectedColumns[x], width: "130px", title: mapper.spreadsheetFields[selectedColumns[x]], headerAttributes: { style: "white-space: normal" } });
            }
        });

        $("#spreadsheet").kendoGrid({
            toolbar: [{
                template: '<a ng-click="downloadExcel()" ng-href="" class="k-button k-button-icontext k-grid-Download"><span class=" "></span>Download as Excel</a>'
            }],
            dataSource: new kendo.data.DataSource({ /* pageSize: 20, */ data: $scope.data }),
            height: 550,
            scrollable: true,
            sortable: true,
            filterable: true,
            /* pageable: {
                input: true,
                numeric: false
            }, */
            columns: columns
        });
        spreadsheet = $("#spreadsheet").data("kendoGrid");
    };

}]);