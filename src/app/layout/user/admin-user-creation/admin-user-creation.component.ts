import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../model/user.model';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { CompanyService } from '../../company/services/company.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/model/app.state';
import * as UserActions from '../../../store/user/actions/user.actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'admin-user-creation',
  templateUrl: './admin-user-creation.component.html',
  styleUrls: ['./admin-user-creation.component.scss']
})
export class AdminUserCreationComponent implements OnInit {

  userForm: FormGroup;
  user: User;
  company_name_array:any=[];
  allCompanyObjects:any=[];
  company_id:string;
  term:any
  companies$: Observable<any>;
  edit_mode:boolean=false;
  selectedUser

  constructor(private formBuilder: FormBuilder,private userService: UserService,private companyService:CompanyService,
              private store: Store<AppState>, private activatedRoute:ActivatedRoute) { 
  this.userForm = this.formBuilder.group({
    user_name : ['',[Validators.required]],
    contact_number : ['', [Validators.required,Validators.maxLength(12)]],
    email_id : ['', [Validators.email,Validators.required]],
    user_type:['Corporate', Validators.required],
    company_name: ['',Validators.required]
  })
}
 
    ngOnInit() {
      //this.companies$= this.companyService.fetchAllCompanies(this.term) ?? backend change, for search pageIndex should not be sent
      this.companies$= this.companyService.getAllCompanies(0)//here 0--- is pageIndex 
      this.companies$.subscribe(
            (data:any=[]) => { 
              for( let i=0;i<data.companies.length;i++){
                  this.company_name_array.push(data.companies[i].company_name)
                  this.allCompanyObjects.push(data.companies[i])
                   this.userForm.valueChanges.subscribe(formdata=>{
                  if (this.userForm.get('company_name').value==data.companies[i].company_name){
                    this.company_id=data.companies[i]._id;
                      
                  }
                })
                }
            })
      this.activatedRoute.params.subscribe((params:any) => {
          console.log("URL has changed ",params)
          if(params.id){
            this.userService.getUserbyId(params.id).subscribe(value =>{
                  this.selectedUser=value;
                  console.log(this.selectedUser)
                  this.edit_mode=true;
                  if(this.selectedUser)
                  this.patch_value_for_form();
              });
            }
         })
      }
    patch_value_for_form(){
        this.userForm.patchValue({
          user_name: this.selectedUser.user_name?this.selectedUser.user_name:'' ,
          contact_number: this.selectedUser.contact_number?this.selectedUser.contact_number:'' ,
          email_id: this.selectedUser.email_id?this.selectedUser.email_id:'' ,
          user_type: this.selectedUser.user_type?this.selectedUser.user_type:'' ,
          company_name: this.selectedUser.contact_number?this.selectedUser.company_name:'' ,
        })
    }
    createUser(){
      const user :User={
        user_name:this.userForm.get('user_name').value,
        contact_number: this.userForm.get('contact_number').value,
        email_id: this.userForm.get('email_id').value,
        user_type: this.userForm.get('user_type').value,
        company_name: this.userForm.get('company_name').value,
        company_id: this.company_id,
        //password:"dummy_password"
      }
      console.log("User Creation",user)
      this.userService.createUser(user).subscribe(res => console.log('Done',res));
      //this.store.dispatch(new UserActions.AddUserAction(this.user))
    }

    formatter = (result: string) => result.toUpperCase();
    company_search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
                              : this.company_name_array.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 5)
      ))
}
