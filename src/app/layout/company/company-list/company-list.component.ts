import { Component, OnInit } from '@angular/core';
import { routerTransition } from 'src/app/router.animations';
import { Company } from '../model/company.model';
import { MenuItem } from 'primeng/api';
import { CompanyService } from '../services/company.service';
import { DataStorage } from 'src/app/common/dataProvider/dataProvider';
import { Router, NavigationExtras } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyViewComponent } from '../company-view/company-view.component';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/model/app.state';
import { Observable } from 'rxjs';
import * as CompanyActions from '../../../store/company/actions/company.actions';
import { UserLinkageDialogComponent } from '../user-linkage-dialog/user-linkage-dialog.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/layout/user/services/user.service';
import { UserCompanyService } from '../../user-company-list/services/user-company-service';
import { UserCompany } from '../../user-company-list/model/user-company.model';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss'],
  animations: [routerTransition()]
})
export class CompanyListComponent implements OnInit {
  
  companies$:Observable<any>;
  companies:Company[];
  companies_new:any;
  totalRecords:number=30;
  cols:any[]
  pageIndex:number=0;
  show_typeahead:boolean= false;
  form: FormGroup;
  company_name_value:string;
  company_id_value:string;
  all_company_objects:any=[];
  all_user_objects:any=[];
  company_id:string;
  term:any
  users$: Observable<any>;
  display_dialog: boolean;
  user_email_id_value:string;
  user_name_value:string;
  user_id_value:string;
  user_name_and_email_array:any=[];
  selected_company:Company;
  row_selected:number;
  user_not_in_db:boolean=false;
  company_not_in_db:boolean=false;
  company_name_searched:string;
  user_name_or_email_id_searched:string;

  constructor(private companyService: CompanyService,private _company_data: DataStorage,public router:Router,
    private modalService: NgbModal,private formBuilder: FormBuilder, private user_service:UserService, 
    private user_company_service:UserCompanyService,
    private store: Store<AppState>) {
      this.companies$ = this.store.select('companies');
      this.form = this.formBuilder.group({
        user_email_id : ['', [Validators.required]],
       }) 
     }
   addCompany(){
     this.router.navigateByUrl('/companies/registeration')
   }

  editCompany(selectedItem:any,index:number){
    console.log(selectedItem, index)
    this.router.navigate(["company/edit",selectedItem._id])
  }
  viewCompany(selectedItem:any, index:number){
        /* MODAL VIEW */
    // this._company_data.data=selectedItem;
    // const modalRef = this.modalService.open(CompanyViewComponent,{size: 'lg'});
    // modalRef.componentInstance.company = selectedItem;
    this.router.navigate(["company-detail-view/",selectedItem._id])
  }
  disableCompany(selectedItem:any,index:number){
    console.log(">>>", selectedItem);
    this._company_data.data=selectedItem
  }
  fetchPageWise(event){
    this.pageIndex = event.first/event.rows
    // this.companyService
    // .getAllCompanies(this.pageIndex)
    // .subscribe((data: any) => {         /*without Ngrx Redux Pattern*/
    //    this.companies=data.companies;
    // });
    
    this.store.dispatch(new CompanyActions.LoadCompaniesAction(this.pageIndex))
  }
  paginate(event:any) {
    
    //Info:-
    //event.first: Index of first record being displayed 
    //event.rows: Number of rows to display in new page 
    //event.page: Index of the new page 
    //event.pageCount: Total number of pages 
    //this.pageIndex = event.first/event.rows + 1 // Index of the new page if event.page not defined.
    
    
    this.pageIndex = event.first/event.rows
    // if (event==0)
    // this.pageIndex=0;
    //this.store.dispatch(new CompanyActions.LoadCompaniesAction(this.pageIndex))
    
    console.log("Current PageIndex",this.pageIndex,event.first)
    //this.store.dispatch(new CompanyActions.LoadCompanyAction(this.pageIndex))
    }
  ngOnInit() {
    
    // this.companyService
    // .getAllCompanies(this.pageIndex)
    // .subscribe((data: any) => {
    //    this.companies=data.companies;
    //    console.log("Without Ngrx", this.companies)
    //   })
     
      this.companies$
      .subscribe((state:AppState) => {this.companies_new = state.data
       this.companies=this.companies_new.companies;
       console.log("With Ngrx", this.companies)
          if(this.companies){
           // console.log(this.companies.sort(this.dynamicSort("-company_name")));
          }
      });
      //this.paginate(0)
      this.cols = [
        
        { field: 'company_name', header: 'Company Name' },
        { field: 'cin', header: 'Cin' },
        { field: 'company_email_id', header: 'Corporate Email Id' },
        { field: 'registered_address', header: 'Address' },
      ];

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
      
      this.form.get('user_email_id').valueChanges.subscribe(
          user_name_or_email_id_searched=>{
            this.user_name_or_email_id_searched=user_name_or_email_id_searched;
                                                
          })
   }

   show_dialog(selected_item) {
    console.log("Open",selected_item)
    const modalRef = this.modalService.open(UserLinkageDialogComponent,{ windowClass:'modal-size',centered:true });
    modalRef.componentInstance.selected_company = selected_item;
    
  }
   show_typeahead_box(selected_item,i){
     this.row_selected =i;
     this.selected_company=selected_item
     this.show_typeahead=true;
   }
  testing(test,$event){
    console.log("Inside Testing",test,$event);
    this.store.subscribe(()=>this.companies.sort(this.dynamicSort(test)))
    console.log("Inside Testing",test,test.count);
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
 save(){
     
  if (!(this.user_name_and_email_array.includes(this.user_name_or_email_id_searched))){
      this.user_not_in_db=true;
    } 
    if(!this.user_not_in_db){   
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


