import { Component } from 'angular2/core';   

@Component({
  templateUrl: 'app/pages/scorecard/scorecard.component.html'
})

export class ScorecardComponent {
	info = 'Scorecard';
    pageId: string;
    cardId: string; 
    public svgTemplateUrl = 'app/assets/images/page{imageId}.svg'; 
    public svgPath = this.svgTemplateUrl.replace("{imageId}","2");
    imageId = "2";

	private navOptions = [
        { Id: 2, Name: "The Commit! Partnership" },
        { Id: 3, Name: "Great Expectations…" },
        { Id: 4, Name: "Dallas County" },
        { Id: 5, Name: "Strong Foundation for Growth" },
        { Id: 6, Name: "Why A Scorecard?", SubMenus: [{ Id: 6, Name: "Pipeline" }, { Id: 7, Name: "Pipeline, cont." }] },
        { Id: 8, Name: "Community Scorecard" },
        { Id: 9, Name: "Heading in a Positive Direction…" },
        { Id: 10, Name: "Equity", SubMenus: [{ Id: 10, Name: "Race/Gender" }, { Id: 11, Name: "Income/Language" }] },
        { Id: 12, Name: "Regional Alignment" },
        { Id: 13, Name: "National Interest" },
        { Id: 14, Name: "Partners using data" },
        { Id: 15, Name: "Local Community Engagement" },
        { Id: 16, Name: "School Readiness", SubMenus: [{ Id: 16, Name: "Data" }, { Id: 17, Name: "Highlighted Story" }] },
        { Id: 18, Name: "Early Math and Literacy", SubMenus: [{ Id: 18, Name: "Data" }, { Id: 19, Name: "Highlighted Story" }] },
        { Id: 20, Name: "College Access & Success", SubMenus: [{ Id: 20, Name: "Data" }, { Id: 21, Name: "Highlighted Story" }] },
        { Id: 22, Name: "Higher Education-Workforce", SubMenus: [{ Id: 22, Name: "Data" }, { Id: 23, Name: "Highlighted Story" }] },
        { Id: 24, Name: "Educator Pipelines", SubMenus: [{ Id: 24, Name: "Data" }, { Id: 25, Name: "Highlighted Story" }] },
        { Id: 26, Name: "Our Partners", SubMenus: [{ Id: 26, Name: "Leadership Council Members" }, { Id: 27, Name: "Commit! Partners" }, { Id: 28, Name: "Philanthropic Investors" }] },
        { Id: 29, Name: "Footnotes" },
        { Id: 30, Name: "Thank you!" }
    ];

    currentNavOption: any;
    currentSubMenuOption : any;
    spinner = false;

    constructor(){
        this.pageId = "2";
        this.cardId= null;

        this.currentNavOption = this.navOptions.find(x => x.Id == +this.pageId);
        this.currentNavOption.active = true;
        
        console.log(this.cardId);

        if(this.cardId){
            this.currentSubMenuOption = this.currentNavOption.find(x => x.Id == +this.cardId)
        }

        /*this.onScorecardChange(this.pageId, this.cardId);*/ 
    }


    private onScorecardChange(navOptionId: string, subMenuId: string) {  
        this.imageId = (subMenuId == null || subMenuId == "") ? navOptionId : subMenuId;
    }
}