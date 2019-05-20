import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, tap, switchMap, catchError } from 'rxjs/operators';
import { CompanyService } from '../company/services/company.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { DataStorage } from '../../common/dataProvider/dataProvider';
import { UserService } from 'src/app/user/services/user.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/model/app.state';
import * as CompanyActions from '../../store/company/actions/company.actions';
import * as UserActions from '../../store/user/actions/user.actions';
@Component({
  selector: 'app-claim-company',
  templateUrl: './claim-company.component.html',
  styleUrls: ['./claim-company.component.scss']
})
export class ClaimCompanyComponent implements OnInit {

  searching = false;
  searchFailed = false;
  form: FormGroup;
  company_name_array:any=[];
  allCompanyObjects:any=[];
  selectedCompany:any=[];
  add_button:boolean=false;
  term:any
  companies$: Observable<any>;
  user_id:string;
  user_email_id:string;
  claim_message:string;
  has_been_claimed:boolean=false;
  not_in_db:boolean=false;;
  user$: Observable<any>;
  company_name_searched:string;
  request_message:string;
  constructor(private formBuilder: FormBuilder,private companyService: CompanyService,private router: Router,
              private _company_data: DataStorage,private useService:UserService,private store: Store<AppState>,
              private user_data:DataStorage,private activatedRoute: ActivatedRoute,) {
                           
        this.form = this.formBuilder.group({
        company_name : ['', [Validators.required]],
       })
      
    }
  ngOnInit() {
    this.activatedRoute.params.subscribe((params:any) => {
      console.log("URL has changed params ",params)
      this.user_id=params.id
    })
    //this.companies$= this.companyService.fetchAllCompanies(this.term) ?? backend change, for search pageIndex should not be sent
    //this.companies$= this.companyService.getAllCompanies(0)//here 0--- is pageIndex
    // this.companies$= this.companyService.getAllCompanies() 
    this.store.dispatch(new CompanyActions.LoadCompaniesAction())
    this.store.dispatch(new UserActions.LoadUserAction(this.user_id))
    this.companies$=this.store.select('companies');
    this.store.subscribe(
      (state:any) => {
         if(state.companies.data.length!=0){
            this.allCompanyObjects=state.companies.data.companies;
         }
        if(state.users.selected !=null){
            this.user_email_id=state.users.selected.email_id;
        }
        for( let i=0;i<this.allCompanyObjects.length;i++){
          if(this.company_name_array.length<= this.allCompanyObjects.length){   //to prevent the 2nd push  
          this.company_name_array.push(this.allCompanyObjects[i].company_name) // company_name_array used for filtering 
          }
        }
      });
     
       
      
      this.form.get('company_name').valueChanges.subscribe(
        company_name_searched=>{
          this.company_name_searched=company_name_searched;
          this.has_been_claimed=false; //to remove error messages on value change
          this.not_in_db=false;
          this.add_button=false;
        })
      
   }
   claimCompany(){
     for( let i=0;i<this.allCompanyObjects.length;i++){
        if ((this.company_name_searched) == this.allCompanyObjects[i].company_name){
          this.selectedCompany= this.allCompanyObjects[i];
          this.store.dispatch(new CompanyActions.LoadCompanyAction(this.selectedCompany._id))
          if(this.selectedCompany.claim_status=="Claimed"){
              this.has_been_claimed=true;
            }
            else{
              //this._company_data.data=this.selectedCompany
              this.router.navigate(['/generate-otp'])
          }
        }
        else if (!(this.company_name_array.includes(this.company_name_searched))){
          console.log(this.company_name_searched)
          this.not_in_db=true;
        } 
      }
    }

  formatter = (result: string) => result.toUpperCase();
  company_search = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map(term => term === '' ? []
       : this.company_name_array.filter(company => company.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 5)
    ))
  
    add_company(){
      this.add_button=true;
      this.request_message="A notification has been sent to V Sampark Admin. V Sampark Admin will contact you at "
                            + this.user_email_id+" for further details."
    }
}
