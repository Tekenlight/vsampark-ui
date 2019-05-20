import { Component, OnInit } from '@angular/core';
import { Company } from '../../company/model/company.model';
import { CompanyService } from '../../company/services/company.service';
import { DataStorage } from '../../../common/dataProvider/dataProvider';
import { Router, NavigationExtras } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyViewComponent } from '../company-view/company-view.component';
@Component({
  selector: 'app-company-approve-reject',
  templateUrl: './company-approve-reject.component.html',
  styleUrls: ['./company-approve-reject.component.scss']
})
export class CompanyApproveRejectComponent implements OnInit {
  companies:Company[];
  pageIndex:number=0
  cols:any[]
  constructor(private companyService: CompanyService,private _company_data: DataStorage,public router:Router,private modalService: NgbModal) { }
  

  viewCompany(selectedItem:any){
    this._company_data.data=selectedItem;
     const modalRef = this.modalService.open(CompanyViewComponent,{ size: 'lg' });
     modalRef.componentInstance.company = selectedItem;
  //   let navigationExtras: NavigationExtras = {
  //     queryParams: {
  //       id:selectedItem.id
  //     }
  // }
       //this.router.navigate(["edit"],navigationExtras)
  }
  approveCompany(selectedItem:any){
     selectedItem.is_approved=1
     console.log(">>>", selectedItem);
     this.companyService.addCompany(selectedItem)
     this.router.navigateByUrl('/companies')
  }
  rejectCompany(selectedItem:any){
    console.log(">>>", selectedItem);
   this.companyService.addCompany(selectedItem)
  }
  fetchPageWise(event){
    this.pageIndex = event.first/event.rows
    this.companyService
    .getAllCompanies(this.pageIndex)
    .subscribe((data: any) => {
       this.companies=data.companies;
    })
  }
  ngOnInit() {
      this.companyService
      .getAllCompanies(this.pageIndex)
      .subscribe((data: any) => {
        this.companies=data.companies;
        })
      this.cols = [
        { field: 'company_name', header: 'Company Name' },
        { field: 'cin', header: 'Cin' },
        { field: 'company_email_id', header: 'Corporate Email' },
        { field: 'registered_address', header: 'Address' },
    ];
  }
}


