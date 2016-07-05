
/**
 * @module
 * @description
 * Kendo Dropdown Component
 */

import { Component, Host, ElementRef, Input, OnInit } from 'angular2/core';

@Component({
    selector: 'k-dropdown', 
    template: '<div></div>'
})

export class Dropdown implements  OnInit {
  constructor(@Host() private elm: ElementRef) {
    }

    @Input() dropdownOptions: any;

    ngOnInit() {
        // Access on DOM; ONLY works with DOM rendering !!!!
        $(this.elm.nativeElement).children().first().kendoDropDownList(this.dropdownOptions);
    } 
}