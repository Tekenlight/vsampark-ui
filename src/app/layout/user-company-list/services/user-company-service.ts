import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserCompany } from '../model/user-company.model';



@Injectable({
  providedIn: 'root'
})
export class UserCompanyService {

  uri = 'http://localhost:3000/user-company-linkages/';

  
  constructor(private http : HttpClient) { }
  

      create_user_company_linkage(user_company:UserCompany):Observable<any>{
        console.log("Service -->",user_company)
        return this.http.post(`${this.uri}`, user_company)
            //.subscribe(res => console.log('Done',res))
      }
     get_all_user_company_linkages(pageIndex?:number):Observable<any>{
        return this.http.get(`${this.uri}`)
       }
    
     delete_user_company_dinkage(id:string):Observable<any>{
        return this.http.delete(`${this.uri}`+id)
      }
}