import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStorage } from '../../common/dataProvider/dataProvider';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/model/app.state';

import  * as CompanyActions from '../../store/company/actions/company.actions'

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {
 
  public selectedCompany:any=[];
  contact_number:any="";
  email_id:string="";
  generatedOtp:number;
  public otp:number;
  public error:string;
  public isError:boolean=false;
  constructor(private router:Router, private store: Store<AppState>) { }
  
  ngOnInit() {
    this.store.subscribe(
      (state:any) => {
        if(state.users.selected !=null){
            this.email_id=state.users.selected.email_id;
            this.contact_number=state.users.selected.contact_number;
          }
          if(state.companies.selected !=null){
            this.selectedCompany=state.companies.selected;
          }
        })
    this.generateOtp()
}
  generateOtp(){
    this.generatedOtp=Math.floor(100000 + Math.random() * 900000)
    console.log("Generated OTP",this.generatedOtp)
  }
  validateOtp(){
  if(this.otp==this.generatedOtp){
     this.store.dispatch(new CompanyActions.UpdateCompanyAction(this.selectedCompany._id))
     this.router.navigate(['company/edit', this.selectedCompany._id])
    }
   else{
     this.isError=true;
     this.error="The OTP does not match OTP that was sent"
    }
  }
}
