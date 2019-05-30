import { Component, OnInit } from '@angular/core';
import { routerTransition } from 'src/app/router.animations';
import { UserService } from '../services/user.service';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/model/app.state';
import * as UserActions from '../../../store/user/actions/user.actions'
import { CompanyViewComponent } from '../../company/company-view/company-view.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyLinkageDialogComponent } from '../company-linkage-dialog/company-linkage-dialog.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Company } from '../../company/model/company.model';
import { CompanyService } from '../../company/services/company.service';
import { UserCompanyService } from '../../user-company-list/services/user-company-service';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { UserCompany } from '../../user-company-list/model/user-company.model';
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
  display: boolean = false;
  totalRecords:number = 50;
  show_typeahead:boolean= false;
  form: FormGroup;
  company_name_value:string;
  company_id_value:string;
  all_company_objects:any=[];
  all_user_objects:any=[];
  company_id:string;
  term:any
  users$: Observable<any>;
  companies$: Observable<any>;
  display_dialog: boolean;
  user_email_id_value:string;
  user_name_value:string;
  user_id_value:string;
  user_name_and_email_array:any=[];
  selected_user:User;
  row_selected:number;
  company_name_array:any=[]
  user_not_in_db:boolean=false;
  company_not_in_db:boolean=false;
  company_name_searched:string;
  user_name_or_email_id_searched:string;
  
  constructor(private user_service:UserService, private router:Router, private company_service:CompanyService,
              private store:Store<AppState>,private modalService: NgbModal,private formBuilder: FormBuilder,  
              private user_company_service:UserCompanyService) {
              
             this.form = this.formBuilder.group({
                  company_name : ['', [Validators.required]],
                 })  
               
              }

  ngOnInit() {
    this.user_service
    .getAllUsers()
    .subscribe((data: any) => {
        this.users=data.users;
          //console.log("Without Ngrx", this.users)
        })
    this.cols = [
        
      { field: 'user_name', header: 'User Name' },
      { field: 'contact_number', header: 'Contact Number' },
      { field: 'email_id', header: 'User Email Id' },
      { field: 'user_type', header: 'Type of User' },
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
            if(this.company_name_value== this.all_company_objects[i].company_name){
                this.company_id_value=this.all_company_objects[i]._id;  
              }
          }
      })
      this.form.get('company_name').valueChanges.subscribe(
        company_name_searched=>{
          this.company_name_searched=company_name_searched;
                                            
        })
  }

  company_formatter = (result: string) => result;
  company_search = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map(term => term === '' ? []
                            : this.company_name_array.filter(company => company.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 5)
    ))

   fetchPageWise(event){
      this.pageIndex = event.first/event.rows
      this.store.dispatch(new UserActions.LoadUsersAction(this.pageIndex))
    }
    paginate(event){
      this.pageIndex = event.first/event.rows
      this.store.dispatch(new UserActions.LoadUsersAction(this.pageIndex))
    }

    editUser(selectedItem:any, index: number){
      console.log("User",selectedItem)
      this.router.navigate(["user/edit",selectedItem._id])
    }
    
  show_dialog(selectedItem) {
    
      this.display = true;
      //console.log("Open",selectedItem,this.display)
      const modalRef = this.modalService.open(CompanyLinkageDialogComponent,{ windowClass:'modal-size',centered:true });
      modalRef.componentInstance.selected_user = selectedItem;
  }
  show_typeahead_box(selected_item,i){
    this.row_selected =i;
    this.selected_user=selected_item
    this.show_typeahead=true;
  }
  save(){
      if (!(this.company_name_array.includes(this.company_name_searched))){
          this.company_not_in_db=true;
      } 
      if(!this.company_not_in_db){
        let user_company_obj_to_be_saved:UserCompany
        user_company_obj_to_be_saved={
            company_id: this.company_id_value,
            company_name: this.company_name_value,
            user_email_id: this.selected_user.email_id,
            user_id: this.selected_user._id,
            user_name: this.selected_user.user_name,
            user_role: "Business User",
        }
        this.user_company_service.create_user_company_linkage(user_company_obj_to_be_saved)
        .subscribe(res => console.log('Done',res))
        this.router.navigateByUrl('/user-company-linkages')
  }
 }
}