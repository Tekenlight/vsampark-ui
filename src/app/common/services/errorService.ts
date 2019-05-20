import {Injectable, Inject} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ErrorService {

  
  contents:any;
  constructor(private http: HttpClient) {}

    field_error_URL = '/assets/picklist/field_errors.json';
    
    fetchFieldErrors(): Observable<any> {
      this.http
      .get(`${this.field_error_URL}`)
      .subscribe(
          results => this.contents = results
      );
    return this.http.get(`${this.field_error_URL}`)
  }
}