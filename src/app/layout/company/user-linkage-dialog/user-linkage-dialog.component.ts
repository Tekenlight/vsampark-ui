import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyService } from '../services/company.service';
import { UserCompanyService } from '../../user-company-list/services/user-company-service';
import { Router } from '@angular/router';
import { UserService } from '../../user/services/user.service';
import { debounceTime, distinctUntilChanged,map } from 'rxjs/operators';
import { UserCompany } from '../../user-company-list/model/user-company.model';
import { Company } from '../model/company.model';

@Component({
  selector: 'user-linkage-dialog',
  templateUrl: './user-linkage-dialog.component.html',
  styleUrls: ['./user-linkage-dialog.component.css']
})
export class UserLinkageDialogComponent implements OnInit {
  
  @Input() selected_company:Company;
  
  form: FormGroup;
  company_name_value:string;
  company_id_value:string;
  all_company_objects:any=[];
  all_user_objects:any=[];
  company_id:string;
  term:any
  companies$: Observable<any>;
  users$: Observable<any>;
  display_dialog: boolean;
  user_email_id_value:string;
  user_name_value:string;
  user_id_value:string;
  user_name_and_email_array:any=[];

  private modalRef: NgbModalRef;
  
 
  
  constructor(private formBuilder: FormBuilder, private user_service:UserService, 
              private user_company_service:UserCompanyService,private router:Router,private modal_service:NgbModal) {
    this.form = this.formBuilder.group({
      user_email_id : ['', [Validators.required]],
     }) 
   }

  ngOnInit() {
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
  }
 

    close_dialog(selectedItem) {
       this.modal_service.dismissAll()
  }

    save(){
      
      let user_company_obj_to_be_saved:UserCompany
     
         user_company_obj_to_be_saved={
            company_id: this.selected_company._id,
            company_name: this.selected_company.company_name,
            user_email_id: this.user_email_id_value,
            user_id: this.user_id_value,
            user_name: this.user_name_value,
            user_role: "Business User",
  
          
         }
       this.user_company_service.create_user_company_linkage(user_company_obj_to_be_saved)
       .subscribe(res => console.log('Done',res))
       this.router.navigateByUrl('/user-company-linkages')
    }

    user_formatter = (result: string) => result;
    user_search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
                              : this.user_name_and_email_array.filter(company => company.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 5)
      ))
}




