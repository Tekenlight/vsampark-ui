import {Injectable, Inject} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PicklistService {

  picklistURL = '/assets/picklist/reference_code.json';
  contents:any;
  constructor(private http: HttpClient) {}

  fetchPicklist(): Observable<any> {
    this.http
    .get(`${this.picklistURL}`)
    .subscribe(
          results => this.contents = results
    );
    return this.http.get(`${this.picklistURL}`);
  }
}