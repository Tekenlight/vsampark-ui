import { Component, OnInit, Input } from '@angular/core';

import {Location} from '@angular/common';
@Component({
    selector: 'app-page-header',
    templateUrl: './page-header.component.html',
    styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {
    @Input() heading: string;
    @Input() icon: string;
    @Input() back_button: boolean;
    constructor(private _location:Location) {}
    
    backClicked() {
        this._location.back();
      }
    ngOnInit() {}
}
