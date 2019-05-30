import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Http, Response, Headers,RequestOptions,Request, RequestMethod } from '@angular/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  uri = 'http://localhost:3000/companies/';
   //uri = 'http://localhost:4200/companies';

  getAllUri = 'http://localhost:3000/companies';
  //getAllUri = 'http://localhost:4200/assets/static-json/organisation_dump.json'

  private options = new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})});
  constructor(private http: HttpClient) { }
  
  getAllCompanies(pageIndex?:any) {
    
    let params=new HttpParams();
    params=params.append('limit','10');
    params=params.append('pageIndex',pageIndex);
    if(pageIndex!=null){
      return this.http.get(`${this.getAllUri}`,{params:params});
    }
    else{
      return this.http.get(`${this.getAllUri}`)
    }
  }
 
  getCompanyById(id){
    return this.http.get(`${this.uri}`+id)
    //.subscribe(res => console.log(res));
  }

addCompany(company){
    console.log("Service",company)
    const headers = new Headers();

      headers.set('Accept', 'application/json');
      headers.set('Content-Type', 'application/json');
      const requestOptions: RequestOptions = new RequestOptions({
        body: (company),
        headers: headers,
       
      });
  
      
      console.log("...........", requestOptions)
       return this.http.post(`${this.uri}`, company)
      
        //.subscribe(res => console.log('Done',res));
  } 

  fetchAllCompanies(term) {
    return this
           .http
           .get(`${this.getAllUri}`);
  }

  updateCompany(company,company_id?:any){
   
  //  let params=new HttpParams();
  //  let id=company._id
  console.log("...........",company._id)
   return this
           .http
           .put(`${this.uri}`+company._id, company)
           //.subscribe(res => console.log('Done',res))
  }
  deleteCompany(company){
     return this
             .http
             .delete(`${this.uri}`+company._id, company)
             .subscribe(res => console.log('Done',res))
    }
  
  search_company(search_term):Observable<any>{
      return this.http.get(`${this.uri}`, {params: {search_term: search_term }})
    }
}




//   addCompany( cin,company_name,company_short_name,corporate_parent_id,company_category,company_sub_category,company_class,
//                 pan,tan,tin,gstin,date_of_incorporation,registered_address,corporate_address,country,email_id,contact_number,
//                 company_status,bank_account_number,bank_branch,bank_ifsc_code) {
