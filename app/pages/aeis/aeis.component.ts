import { Component, Inject } from 'angular2/core';
import { Kchart }   from '../../shared/kendo/kchart'; 
import { Grid }     from '../../shared/kendo/grid';  
import { Observable }     from 'rxjs/Observable'; 
import { AeisDictionary, AeisService }  from './aeis.service';
import { SelectListItem } from '../../shared/select.component'

@Component({
  templateUrl: 'app/pages/aeis/aeis.component.html',
  directives: [Grid, Kchart],
  providers: [AeisService]
})

 
export class AeisComponent {  

    info = "Commit";
    options: any;
    yearOptions: any;
    tableOptions: any;
    chartOptions: any;
    listTableUrl : string;
    selectedTableUrl : string; 
    baseApiUrl = "http://commitstaging.azurewebsites.net/";
    tables : SelectListItem[]; 
    years = [
        new SelectListItem (null,"Select Year"), 
        new SelectListItem ("1999", "1999"),
        new SelectListItem ("2000","2000"), 
        new SelectListItem ("2001","2001"),
        new SelectListItem ("2002","2002"), 
        new SelectListItem ("2003","2003"), 
        new SelectListItem ("2004","2004"),
        new SelectListItem ("2005","2005"), 
        new SelectListItem ("2006","2006"), 
        new SelectListItem ("2007","2007"),
        new SelectListItem ("2008","2008"), 
        new SelectListItem ("2009","2009"), 
        new SelectListItem ("2010","2010"),
        new SelectListItem ("2011","2011"), 
        new SelectListItem ("2012","2012"), 
        new SelectListItem ("2013","2013"),
        new SelectListItem ("2014","2014")];

	dic : AeisDictionary[];

    tableMap = {
        cothr: "Campus AP/IB, Annual Dropout, Attendance, Advanced Courses, Higher Education (IHE)",
        dothr: "District AP/IB, Annual Dropout, Attendance, Advanced Courses, Higher Education (IHE)"
    };

    constructor(public _aeisService: AeisService) {           
        this.setUpChartOptions();
        this.listTableUrl = this.baseApiUrl + "api/dictionary/ListTables?year={year}"; 
        this.selectedTableUrl = this.baseApiUrl + "api/dictionary/Get?selectedTable={selectedTable}&selectedYear={selectedYear}";
    } 
      
    selectedTable = null;
    selectedYear = null;
 
    private changeYear(selectedValue: string) {    
         debugger;
        this.selectedYear = selectedValue; 
        if (!this.selectedYear || this.selectedYear == "") return;

        let url : string;
        url = this.listTableUrl.replace("{year}",this.selectedYear)
        console.log(url);

        this._aeisService.getTablesByYear(url)
        .subscribe(item => this.onArrayAdded(item)); 
  
        this.selectedTable = null;
    };

    private onArrayAdded(items: string[]): void {  
        this.tables = [];
        this.tables.push(new SelectListItem("","Select Table")); 
        for (var n = 1; n <= items.length; n++) { 
            this.tables.push(new SelectListItem(items[n], items[n]));
        } 
    }

    private changeTable(selectedTable: string) {
        if (!selectedTable || !selectedTable) return;
        let url : string;
        url = this.selectedTableUrl.replace("{selectedTable}",selectedTable).replace("{selectedYear}",this.selectedYear);
        console.log(url);      
        this._aeisService.getDictionaryByTable(url)
        .subscribe(item => this.onDictionaryAdded(item)); 
    };

    private onDictionaryAdded(items: AeisDictionary[]): void { 
        debugger;
        this.dic = items;
        this.createGrid();
    }
  
    private setUpChartOptions() {
         
        this.chartOptions = {
            legend: {
                visible: true,
                position: 'bottom'
            },
            chartArea: {
                background: ""
            },
            seriesDefaults: {
                labels: {
                    visible: false,
                    background: "transparent",
                    template: "#= category #: \n #= value#%"
                }
            },
            series: [{
                type: "pie",
                startAngle: 150,
                data: [{
                    category: "African American",
                    value: 12.7,
                    color: "#003662"
                }, {
                    category: "Hispanic",
                    value: 51.8,
                    color: "#c3151c"
                }, {
                    category: "White",
                    value: 29.4,
                    color: "#fbb613"
                }, {
                    category: "Other",
                    value: 5.1,
                    color: "#91c63d"
                }]
            }],
            tooltip: {
                visible: true,
                color: 'white',
                template: "#= category #: \n #= value#%"
            }
        }
    }

    private createGrid() { 

        let grid = document.getElementById("dictionaryGrid");
        console.log(grid);
        $(grid).kendoGrid({
            dataSource: {
                data: this.dic,
                schema: {
                    model: {
                        fields: {
                            YEAR: { type: "string" },
                            TABLE: { type: "string" }, //, parse: function (i) { return this.tableMap[i] || i; }
                            VARIABLE: { type: "string" },
                            DESCRIPTION: { type: "string" }
                        }
                    }
                }
                //pageSize: 20
            },
            //height: 550,
            scrollable: true,
            sortable: true,
            filterable: true,
            pageable: {
                input: true,
                numeric: false
            },
            columns: [
                { field: "YEAR", title: "Year", width: "10%" },
                { field: "TABLE", title: "Table", format: "{0:c}", width: "15%" },
                { field: "VARIABLE", title: "Variable", width: "20" },
                { field: "DESCRIPTION", title: "Description", width: "55%" }
            ]
        });
    }
}