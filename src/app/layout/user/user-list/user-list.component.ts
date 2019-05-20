import { Component, OnInit } from '@angular/core';
import { routerTransition } from 'src/app/router.animations';
import { UserService } from '../services/user.service';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/model/app.state';
import * as UserActions from '../../../store/user/actions/user.actions'
@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  animations: [routerTransition()]
})
export class UserListComponent implements OnInit {
  cols:any[];
  users:User[];
  pageIndex:number=0;

  constructor(private user_service:UserService, private router:Router, private store:Store<AppState>) { }

  ngOnInit() {
    this.user_service
    .getAllUsers()
    .subscribe((data: any) => {
        this.users=data.users;
          console.log("Without Ngrx", this.users)
        })
    this.cols = [
        
      { field: 'user_name', header: 'User Name' },
      { field: 'contact_number', header: 'Contact Number' },
      { field: 'email_id', header: 'User Email Id' },
      { field: 'user_type', header: 'Type of User' },
      { field: 'company_id',  header: 'Associated Company'}
    ];
  }

  
  fetchPageWise(event){
      this.pageIndex = event.first/event.rows
      this.store.dispatch(new UserActions.LoadUsersAction(this.pageIndex))
    }

    editUser(selectedItem:any, index: number){
      console.log("User",selectedItem)
      this.router.navigate(["user/edit",selectedItem._id])
    }
}