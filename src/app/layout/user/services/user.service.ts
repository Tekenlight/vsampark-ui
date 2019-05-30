import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { RequestOptions,Headers } from '@angular/http';
import { User } from '../model/user.model';
import { JwtService } from 'src/app/common/services/jwt.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  uri = 'http://localhost:3000/users/';

  //userCreationUrl ='http://localhost:3000/users';
  getUserUrl ='http://localhost:3000/users';
  userCreationUrl ='http://localhost:3000/users/';     //currently using for login
 
  getAllUsersUrl='http://localhost:3000/users/'
  //getAllUsersUrl='http://localhost:4200/assets/static-json/dummy_user_data.json'
  constructor(private http : HttpClient, private jwtService : JwtService) { }
   headersConfig
  
   private setHeaders(): Headers {
   if (this.jwtService.getToken()) {
         this.headersConfig['x-access-token'] = ` ${this.jwtService.getToken()}`;
         console.log(this.headersConfig)
       }
         return new Headers(this.headersConfig);
       }

  secret = 'BSQ-Slt-007';

      createUser(user:User):Observable<any>{
        console.log("Service -->",user)
        return this.http.post(`${this.uri}`, user)

              //.subscribe(res => console.log('Done',res))
      }
     
      login(user){
        return this.http.post(`${this.userCreationUrl}`, user)
              //.subscribe(res => console.log('Done',res))
      }
      saveUser(login):Observable<any>{
        console.log("saveUser")
        return this.http.post(`${this.userCreationUrl}`, login)
              //.subscribe(res => console.log('Done',res));
      }
      getUserbyId(id):Observable<any>{
        return this.http.get(`${this.getUserUrl}/`+id)
      }
      getAllUsers(pageIndex?):Observable<any>{
        let params=new HttpParams();
        params=params.append('limit','10');
        params=params.append('pageIndex',pageIndex);
        if(pageIndex!=null){
          return this.http.get(`${this.getAllUsersUrl}`,{params:params});
        }
        else{
          return this.http.get(`${this.getAllUsersUrl}`)
        }
      }
      updateUser(user):Observable<any>{
        return this.http.put(`${this.getAllUsersUrl}`+user._id,user)
      }

      search_user(search_term):Observable<any>{
        return this.http.get(`${this.getAllUsersUrl}`, {params: {search_term: search_term }})
      }
      
}