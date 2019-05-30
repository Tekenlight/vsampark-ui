import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  uri = 'http://localhost:3000/users';

  //userCreationUrl ='http://localhost:3000/users';
  getUserUrl ='http://localhost:3000/users';
  //userLoginUrl ='http://localhost:3000/users/login'
  userLoginUrl ='http://localhost:3000/auth/login'
  userCreationUrl ='http://localhost:3000/users/';     
  //userCreationUrl ='http://localhost:4200/users';
  getAllUsersUrl='http://localhost:3000/users/getusers'
  resetPasswordUrl='http://localhost:3000/users/password_reset/'
  constructor(private http: HttpClient) { }

  secret = 'BSQ-Slt-007';

      createUser(user){
              this.http.post(`${this.uri}`, user)
              .subscribe(res => console.log('Done',res))
      }
      login(user):Observable<any>{
        return this.http.post(`${this.userLoginUrl}`, user)
              //.subscribe(res => console.log('Done',res))
      }
      reset_password(credentials:any,id:string):Observable<any>{
      
        //return this.http.put(`${this.resetPasswordUrl}`+id, credentials)
        return this.http.put(`${this.resetPasswordUrl}`, credentials)
                        //.subscribe(res => console.log('Done',res));
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
        return this.http.get(`${this.getAllUsersUrl}`)
      }
}