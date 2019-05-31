import { Component, OnInit } from '@angular/core';
import { UserCompanyService } from './services/user-company-service';
import { Observable } from 'rxjs';
import { distinctUntilChanged, debounceTime,map } from 'rxjs/operators';
import { CompanyService } from '../company/services/company.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user/services/user.service';
import { UserCompany } from './model/user-company.model';

@Component({
  selector: 'user-company-list',
  templateUrl: './user-company-list.component.html',
  styleUrls: ['./user-company-list.component.css']
})
export class UserCompanyListComponent implements OnInit {
  
  user_to_company_linkages:any=[];
  cols:any[];
  pageIndex:number=0;
  company_name_array:any=[];
  user_name_and_email_array:any=[];
  company_id_value:string;
  all_company_objects:any=[];
  all_user_objects:any=[];
  company_id:string;
  term:any
  companies$: Observable<any>;
  users$: Observable<any>;
  display_dialog: boolean;
  form: FormGroup;
  company_name_value:string;
  user_email_id_value:string;
  user_name_value:string;
  user_id_value:string;
  user_not_in_db:boolean=false;
  company_not_in_db:boolean=false;
  company_name_searched:string;
  user_name_or_email_id_searched:string;
  company_name_not_in_db_error_message:string;
  user_name_or_email_id_not_in_db_error_message:string;
  duplicate_entry_error:boolean=false;
  duplicate_entry_error_message:string;

  constructor(private user_company_service:UserCompanyService, private company_service:CompanyService,
              private formBuilder: FormBuilder, private user_service:UserService) {
              
              this.form = this.formBuilder.group({
                  company_name : ['', [Validators.required]],
                  user_email_id : ['', [Validators.required]],
              }) 
  }

  ngOnInit() {
    this.user_company_service
    .get_all_user_company_linkages()
    .subscribe((result_set: any) => {
        this.user_to_company_linkages=result_set.user_to_company_linkages;
          console.log("Without Ngrx", this.user_to_company_linkages)
        })
    
    this.cols = [
      { field: 'user_name', header: 'User Name' },
      { field: 'user_email_id', header: 'User Email Id' },
      { field: 'user_role', header: 'User Role' },
      { field: 'company_name',  header: 'Associated Company '}
    ];

    this.form
    .controls['company_name']
    .valueChanges
    .subscribe(company_name_value => {
      this.company_name_value = company_name_value;
      this.companies$= this.company_service.search_company(this.company_name_value)
      this.companies$.subscribe(
        (result_set:any=[]) => { 
          for( let i=0;i<result_set.companies.length;i++){
            if ((this.company_name_array.includes(result_set.companies[i].company_name) === false) //to prevent duplicate entry in the company-name array     
            && (result_set.companies[i].is_approved==1)){  //only companies which are approved                                                    
              this.company_name_array.push(result_set.companies[i].company_name)                    
              this.all_company_objects.push(result_set.companies[i])
            }
          }
        })
          for(let i=0;i<this.all_company_objects.length;i++){
            console.log("all_company_objects", this.all_company_objects,this.company_name_value)
            if(this.company_name_value== this.all_company_objects[i].company_name){
                this.company_id_value=this.all_company_objects[i]._id;  
              }
          }
      })
    this.form
    .controls['user_email_id']
    .valueChanges
    .subscribe(user_email_id_value => {
      this.user_email_id_value = user_email_id_value;
      this.users$=this.user_service.search_user(this.user_email_id_value)
      this.users$.subscribe(
      (result_set:any=[]) => { 
        for( let i=0;i<result_set.users.length;i++){
          if ((this.user_name_and_email_array.includes(result_set.users[i].user_name) === false)||
              (this.user_name_and_email_array.includes(result_set.users[i].email_id) === false)) { //to prevent duplicate entry in the 
                this.user_name_and_email_array.push(result_set.users[i].user_name,result_set.users[i].email_id)          //array
                this.all_user_objects.push(result_set.users[i])
          }
        }
      })
      for(let i=0;i<this.all_user_objects.length;i++){
        console.log("AllUser Objects", this.all_user_objects)
        if((this.user_email_id_value== this.all_user_objects[i].email_id)||
           (this.user_email_id_value== this.all_user_objects[i].user_name)){
            this.user_id_value=this.all_user_objects[i]._id;  
            this.user_email_id_value = this.all_user_objects[i].email_id;
            this.user_name_value = this.all_user_objects[i].user_name;
          }
        }
      })
      this.form.get('company_name').valueChanges.subscribe(
        company_name_searched=>{
          this.company_name_searched=company_name_searched;
                                            
        })
      this.form.get('user_email_id').valueChanges.subscribe(
          user_name_or_email_id_searched=>{
            this.user_name_or_email_id_searched=user_name_or_email_id_searched;
                                                
          })
    }

  show_dialog_to_add() {
   this.display_dialog = true;
   this.company_not_in_db=false;    //to remove error messages on dialog open
   this.user_not_in_db=false; 
   this.duplicate_entry_error=false;
   this.form.reset();
}

save() {
    
    let user_company_obj_previous_state = [...this.user_to_company_linkages];
    let user_company_obj_to_be_saved:UserCompany
    if (!(this.company_name_array.includes(this.company_name_searched))){
       this.company_not_in_db=true;
       this.company_name_not_in_db_error_message="The Company Name you typed in, did not exist in V Sampark Group of Corporates.Hence the linkage could not be made"
    } 
    if (!(this.user_name_and_email_array.includes(this.user_name_or_email_id_searched))){
      this.user_not_in_db=true;
      this.user_name_or_email_id_not_in_db_error_message="The UserName/Email-Id you typed in, did not exist in V Sampark Group of Corporates.Hence the linkage could not be made."
   } 
    if((!this.company_not_in_db)||
        (!this.user_not_in_db)){
          user_company_obj_to_be_saved={
              company_id: this.company_id_value,
              company_name: this.company_name_value,
              user_email_id: this.user_email_id_value,
              user_id: this.user_id_value,
              user_name: this.user_name_value,
              user_role: "Business User",
        }
    
     this.user_company_service.create_user_company_linkage(user_company_obj_to_be_saved)
     .subscribe(res => {
      if(res.status==200){
        user_company_obj_previous_state.push(user_company_obj_to_be_saved)
       }
     },
      err => {
        console.log(err);
      // check error status code is 500 & if it is a duplicate record
      if((err.status==500)&&(err.error.error_message)){
        console.log(err.status)
        this.duplicate_entry_error=true;
        this.duplicate_entry_error_message=err.error.error_message;
      }
     });
    }
   
    this.user_to_company_linkages = user_company_obj_previous_state; //to show the added entry in the table
    this.display_dialog = false;
    
}
fetchPageWise(event){
  this.pageIndex = event.first/event.rows
  //this.store.dispatch(new UserActions.LoadUsersAction(this.pageIndex))
}
dynamicSort(property) {
  var sortOrder = 1;
  if(property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
  }
  return function (a,b) {
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
  }
 }
 sort_function(property){
   this.user_to_company_linkages=this.user_to_company_linkages.sort(this.dynamicSort(property))
 
  }
delete_linkage(selectedItem:any,index:number){
  this.user_company_service.delete_user_company_dinkage(selectedItem._id)
  .subscribe();
  this.ngOnInit();
}
company_formatter = (result: string) => result;
    company_search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
                              : this.company_name_array.filter(company => company.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 5)
      ))

user_formatter = (result: string) => result;
    user_search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2  ? []
                              : this.user_name_and_email_array.filter(user => user.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 5)
      ))
}

 