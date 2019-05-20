import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStorage } from '../common/dataProvider/dataProvider';
import { isError } from 'util';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {
  public sub:any;
  public selectedCompany:any=[];
  contact_number:any="";
  corporate_email_id:string="";
  generatedOtp:number;
  constructor(private route: ActivatedRoute,private _company_data: DataStorage,private router:Router) { }
  public otp:number;
  public error:string;
  public isError:boolean=false;
  ngOnInit() {

      // this.sub = this.route.queryParams.subscribe(params => {
      // console.log(">>>>>>>>>>",params)
      // this.selectedCompany=params;
      // console.log(this.selectedCompany)
      // })
      this.selectedCompany=this._company_data.data;
      console.log(this.selectedCompany)
      if(this.selectedCompany){
      this.contact_number=this.selectedCompany.contact_number;
      this.corporate_email_id= this.selectedCompany.company_email_id;
      }
      this.generateOtp()
}
  generateOtp(){
    this.generatedOtp=Math.floor(100000 + Math.random() * 900000)
    console.log("Generated OTP",this.generatedOtp)
  }
  validateOtp(){
  if(this.otp==this.generatedOtp){
     this.router.navigate(['company/edit'])
    }
   else{
     this.isError=true;
     this.error="The OTP does not match OTP that was sent"
    }
  }
}
