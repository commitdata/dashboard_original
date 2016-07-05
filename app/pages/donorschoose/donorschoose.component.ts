import { OnInit, Component, ElementRef }                            from 'angular2/core';  
import { County, DonorChooseService, Proposal, DonorChooseObject }  from '../donorschoose/donorschoose.service'
import { Location, RouteParams, Router, RouteRegistry  }            from 'angular2/router';



@Component({
    templateUrl: 'app/pages/donorschoose/donorschoose.component.html', 
    providers: [County,DonorChooseService],
})
 
 
export class DonorsChooseComponent implements OnInit {

    info = "Donors Choose";
    options: any;
    projects: Proposal[];
    countyOptions: any;
    counties : County[];
    spinner = false;
    numberOfProjects = 242;
    amountNeeded = 2523.23;
    NuDistricts = 352;
    NuSchools = 23; 
    //selectedCounty = "331"; 
    donorChooseObj : DonorChooseObject;
    selectedCounty:County = new County();


    constructor(
        public _donorService: DonorChooseService, 
        public element: ElementRef,
        public _params: RouteParams,
        public _router: Router) { 
        
        this.selectedCounty.CountyID = "331";

    } 

    ngOnInit(): void { 
        this.spinner = false;
        let countyId = this._params.get("id");
        if(countyId){
            this.selectedCounty.CountyID = countyId;
        }
        this.fillGrid(this.selectedCounty.CountyID); 
        this.fillCountyOtpions();
    }

    public downloadExcel(){ 
        var fields = ['School', 'Title', 'Cost to Complete', 'City', 'Link']; 
        this.json2Csv(this.projects, "County-Data", fields);
    }

    private json2Csv(data : any, title : string, fields : string[] ){
        debugger;
        //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
        var arrData = typeof data != 'object' ? JSON.parse(data) : data;
        
        var CSV = '';  
        var row = ""; 
            
        //create top fields row
        for (var field in fields) {  
            row += field + ',';
        }

        row = row.slice(0, -1);
        
        //append Label row with line break
        CSV += row + '\r\n';
        
        //1st loop is to extract each row
        for (var i = 0; i < arrData.length; i++) {
            var row = "";
            
            //2nd loop will extract each column and convert it in string comma-seprated
            for (var index in arrData[i]) {
                row += '"' + arrData[i][index] + '",';
            }

            row.slice(0, row.length - 1);
            
            //add a line break after each row
            CSV += row + '\r\n';
        }

        if (CSV == '') {        
            alert("Invalid data");
            return;
        }   
        
        //Generate a file name
        var fileName = "Report_";
        //this will remove the blank-spaces from the title and replace it with an underscore
        fileName += title.replace(/ /g,"_");   
        
        //Initialize file format you want csv or xls
        var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
        
        // Now the little tricky part.
        // you can use either>> window.open(uri);
        // but this will not work in some browsers
        // or you will not get the correct file extension    
        
        //this trick will generate a temp <a /> tag
        var link = document.createElement("a");    
        link.href = uri;
        
        //set the visibility hidden so it will not effect on your web-layout
        link.setAttribute("target","_blank");
        link.setAttribute("style", "visibility:hidden");
        link.setAttribute("href", fileName + ".csv"); 
        
        //this part will append the anchor tag and remove it after automatic click
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    private createGrid() { 

        let grid = document.getElementById("grid");
        //this.options =
        $(grid).kendoGrid({ 
            dataSource: {
                data: this.projects,
                schema: {
                    model: {
                        fields: {
                            schoolName: { type: "string" },
                            title: { type: "string" },
                            costToComplete: { type: "number" },
                            city: { type: "string" }
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
                { field: "schoolName", title: "School", width: "130px", encoded: false },
                { field: "title", title: "Title", format: "{0:c}", width: "250px", encoded: false },
                { field: "costToComplete", title: "Cost to Complete", width: "130px" },
                { field: "city", title: "City", width: "130px" },
                { field: "proposalURL", title: "Link", width: "130px", template: "<a href='#= proposalURL#' target='_blank'>link</a>" } //, 
            ]
        });
    }

    private loadMap() {
        var container = document.getElementById("mapContainer");
        container.innerHTML = "";   

        var mapDiv = $("<div></div>").attr("id", "map-canvas-dc").height(548).css('border', '2px solid orange');
        mapDiv.appendTo("#mapContainer");
        var map = L.map('map-canvas-dc').setView([32.795903, -96.795903], 10);
        L.tileLayer('http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://www.opencyclemap.org">OpenCycleMap</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

    }

    private fillGrid(county:string){      

        this._donorService.getDonorResult(county)
        .subscribe(data => 
        {  
            this.donorChooseObj = data; 
            this.projects = data.proposals;
            
            let temp : number = 0;
            let districts : string[] = [];
            let schools : string[] = [];

            for(var project of this.projects) { 
                temp += +project.costToComplete;

                if(districts.indexOf(project.city) == -1) {
                    districts.push(project.city);
                }

                if(schools.indexOf(project.schoolName) == -1) {
                    schools.push(project.schoolName);
                }
            }

            this.numberOfProjects = this.projects.length;
            this.NuDistricts = districts.length;
            this.NuSchools = schools.length;
            this.amountNeeded = temp;

            this.createGrid();
            this.loadMap();
        },
        err => console.error(err),
        () => console.log('done'));
    }

    private changeCounty(county : any) : void{
      
        debugger;
        console.log(county);

        this.selectedCounty.CountyID = county;
 
        //TODO
        if (this.selectedCounty.CountyID) {
            this._router.navigate(['/DonorsChoose', {id: this.selectedCounty.CountyID}]); 
        }
    }

    private fillCountyOtpions() {  
        this._donorService.getCountyOptions()
        .subscribe(x => this.counties = x); 
    } 

}