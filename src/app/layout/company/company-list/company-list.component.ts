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
  totalRecords:number=100;
  cols:any[]
  pageIndex:number=0;
  items: MenuItem[];
  

  constructor(private companyService: CompanyService,private _company_data: DataStorage,public router:Router,
    private modalService: NgbModal,
    private store: Store<AppState>) {
      this.companies$ = this.store.select('companies');
     }
   addCompany(){
     this.router.navigateByUrl('/companies/registeration')
   }

  editCompany(selectedItem:any,index:number){
    console.log(selectedItem, index)
    //this._company_data.data=selectedItem; 
    // this.store.subscribe((value:any)=>{
    //     if(value!=undefined){
    //       selectedItem._id=value.ApplicationState.data
    //     }
    //   })
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
  paginate(event) {
    //event.first: Index of first record being displayed 
    //event.rows: Number of rows to display in new page 
    //event.page: Index of the new page 
    //event.pageCount: Total number of pages 
    //this.pageIndex = event.first/event.rows + 1 // Index of the new page if event.page not defined.
    this.pageIndex = event.first/event.rows
  
    
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
       //console.log("With Ngrx", this.companies)
      });
      this.cols = [
        
        { field: 'company_name', header: 'Company Name' },
        { field: 'cin', header: 'Cin' },
        { field: 'company_email_id', header: 'Corporate Email Id' },
        { field: 'registered_address', header: 'Address' },
      ];
   }

}
