import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  uri = 'http://localhost:3000/users/sendemail';

  userCreationUrl ='http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  secret = 'BSQ-Slt-007';

createUser(user){
        this.http.post(`${this.uri}`, user)
        .subscribe(res => console.log('Done',res));

      }
saveUser(login){
        this.http.post(`${this.userCreationUrl}`, login)
        .subscribe(res => console.log('Done',res));

      }
}