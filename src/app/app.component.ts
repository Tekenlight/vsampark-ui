import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'Tekenlight Supply Chain';
    currentUrl:any;
    constructor(private _router: Router) {
    }

    ngOnInit() {
        this._router.events.subscribe((res) => { 
            this.currentUrl=this._router.url;
               //console.log(this._router.url,"Current URL");
            })
    }
}
