import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from '../model/company.model';
import { HttpHeaders } from '@angular/common/http';
import { Http, Response, Headers,RequestOptions,Request, RequestMethod } from '@angular/http'
import { Observable } from 'rxjs';
// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type':  'application/json',
   
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  uri = 'http://localhost:3000/companies';

  getAllUri = 'http://localhost:3000/companies/getlist';
  constructor(private http: HttpClient) { }

//   addCompany( cin,company_name,company_short_name,corporate_parent_id,company_category,company_sub_category,company_class,
//                 pan,tan,tin,gstin,date_of_incorporation,registered_address,corporate_address,country,email_id,contact_number,
//                 company_status,bank_account_number,bank_branch,bank_ifsc_code) {

addCompany(company){
    console.log("Service",company)
   
    // this.http.post(`${this.uri}`,company,httpOptions)
    //     .subscribe(res => console.log('Done',res));

    // let headers = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: headers });
    // let body = JSON.stringify(company);
    // return this.http.post(`${this.uri}`, body, options ).map((res: Response) => res.json());


    const headers = new Headers();

      headers.set('Accept', 'application/json');
      headers.set('Content-Type', 'application/json');
      const requestOptions: RequestOptions = new RequestOptions({
        body: (company),
        headers: headers,
        //: RequestMethod.Post,
        //url: this.uri,
      });
  
      //return this.http.post(`${this.uri}`,JSON.stringify(company));
      console.log("...........", requestOptions)
        this.http.post(`${this.uri}`, company)
        .subscribe(res => console.log('Done',res));
  }

  fetchAllCompanies() {
    return this
           .http
           .get(`${this.getAllUri}`);
  }
}