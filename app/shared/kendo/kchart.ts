
/**
 * @module
 * @description
 * Kendo Chart Component
 */

import { Component, Host, ElementRef, Input, OnInit } from 'angular2/core';

@Component({
    selector: 'k-chart', 
    template: '<div></div>'
})

export class Kchart implements  OnInit {
  constructor(@Host() private elm: ElementRef) {
    }

    @Input() chartOptions: any;

    ngOnInit() {
        // Access on DOM; ONLY works with DOM rendering !!!!
        $(this.elm.nativeElement).children().first().kendoChart(this.chartOptions);
    }
}