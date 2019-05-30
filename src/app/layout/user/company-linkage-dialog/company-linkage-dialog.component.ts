import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompanyService } from '../../company/services/company.service';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../model/user.model';
import { UserCompany } from '../../user-company-list/model/user-company.model';
import { UserCompanyService } from '../../user-company-list/services/user-company-service';
import { Router } from '@angular/router';

@Component({
  selector: 'company-linkage-dialog',
  templateUrl: './company-linkage-dialog.component.html',
  styleUrls: ['./company-linkage-dialog.component.css']
})
export class CompanyLinkageDialogComponent implements OnInit {
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();
  @Input() selected_user: User;
  
  company_name_array:any=[];
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

  private modalRef: NgbModalRef;
  
  constructor(private formBuilder: FormBuilder, private company_service:CompanyService, 
              private user_company_service:UserCompanyService,private router:Router, private modalService:NgbModal) {
    this.form = this.formBuilder.group({
      company_name : ['', [Validators.required]],
     }) 
   }
  
  onClose(){
    //this.displayChange.emit(false);
    this.modalRef.close();
  
  }

  
  ngOnInit() {
    //console.log(">>",this.selected_user)
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
  }

  
  company_formatter = (result: string) => result;
  company_search = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map(term => term === '' ? []
                            : this.company_name_array.filter(company => company.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 5)
    ))

    close_dialog(selectedItem) {
       this.modalService.dismissAll()
  }

    save(){
      
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
