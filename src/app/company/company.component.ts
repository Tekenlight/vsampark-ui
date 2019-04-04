import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PicklistService } from '../common/services/picklist.service';
import { Observable } from 'rxjs';
import { CompanyService } from './services/company.service';
import { Company } from './model/company.model';
import { Address } from './model/address.model';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';



@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  companyForm: FormGroup;
  picklist$: Observable<any>;
  company: Company
  onSubmit: boolean = false;
  constructor(private formBuilder: FormBuilder, private picklistService: PicklistService,private companyService: CompanyService) {
    this.companyForm = this.formBuilder.group({
      cin : ['',Validators.maxLength(21)],
      company_name : ['', [Validators.required]],
      company_short_name : ['', [Validators.minLength(3),Validators.required]],
      company_status : ['', [Validators.required]],
      corporate_parent_id : [1],
      company_category : ['', [Validators.required]],
      company_sub_category : ['', [Validators.required]],
      company_class : ['', [Validators.required]],
      pan : ['',[Validators.minLength(10), Validators.pattern('^([a-zA-Z0-9_-]+)$')]],
      tan : ['', Validators.minLength(10)],
      tin : ['',Validators.minLength(11) ],
      gstin : ['',Validators.minLength(15)],
      date_of_incorporation : ['Thu Feb 14 2019 00:00:00 GMT+0530 (India Standard Time)', [Validators.required]],
      registered_address : this.formBuilder.group({
        line1 : ['', Validators.required],
        line2 : ['', Validators.required],
        city : ['', Validators.required],
        pincode : ['',[ Validators.required,Validators.minLength(6)]]
    }),
       corporate_address : this.formBuilder.group({
        line1 : ['', ],
        line2 : ['', ],
        city : ['', ],
        pincode : ['',Validators.minLength(6)]
    }),
      country : ['INDIA', [Validators.required]],
      company_email_id : ['', [Validators.required,Validators.email]],
      email_id : ['', [Validators.required,Validators.email]],
      contact_number : ['', [Validators.required]],
     
      bank_account_number : ['',],
      bank_branch : [''],
      bank_ifsc_code: [''],
      
      //model :['']
     
     
    });
   }
   get f() { 
     
     return this.companyForm.controls; }
   addCompany() {
     this.onSubmit=true;
     var registered_address:Address={
      line1:this.companyForm.get('registered_address.line1').value,
      line2:this.companyForm.get('registered_address.line2').value,
      city:this.companyForm.get('registered_address.city').value,
      pincode:this.companyForm.get('registered_address.pincode').value
     }
     var corporate_address:Address={
      line1:this.companyForm.get('corporate_address.line1').value,
      line2:this.companyForm.get('corporate_address.line2').value,
      city:this.companyForm.get('corporate_address.city').value,
      pincode:this.companyForm.get('corporate_address.pincode').value
     }
     if((!registered_address.line1) && (!registered_address.line2) && (!registered_address.city) && (!registered_address.pincode)){
      registered_address=null;
   }
     if((!corporate_address.line1) && (!corporate_address.line2) && (!corporate_address.city) && (!corporate_address.pincode)){
        corporate_address=null;
     }
      const company: Company ={
        cin: this.companyForm.get('cin').value,
        company_name: this.companyForm.get('company_name').value,
        company_short_name: this.companyForm.get('company_short_name').value,
        corporate_parent_id: this.companyForm.get('corporate_parent_id').value,
        company_category: this.companyForm.get('company_category').value,
        company_sub_category: this.companyForm.get('company_sub_category').value,
        company_class:this.companyForm.get('company_class').value,
        pan: this.companyForm.get('pan').value,
        tan: this.companyForm.get('tan').value,
        tin: this.companyForm.get('tin').value,
        gstin: this.companyForm.get('gstin').value,
        date_of_incorporation:this.companyForm.get('date_of_incorporation').value,
        registered_address: registered_address,
        corporate_address: corporate_address, 
        country:this.companyForm.get('country').value,
        email_id: this.companyForm.get('email_id').value,
        company_email_id: this.companyForm.get('company_email_id').value,
        contact_number: this.companyForm.get('contact_number').value,
        company_status: this.companyForm.get('company_status').value,
        bank_account_number: this.companyForm.get('bank_account_number').value,
        bank_branch:this.companyForm.get('bank_branch').value,
        bank_ifsc_code: this.companyForm.get('bank_ifsc_code').value
      }
      if((!company.pan)&&(!company.tan)&&(!company.tin)&&(!company.gstin)){
        alert("PLease enter any one of PAN,TAN,TIN,GSTIN")
      }
      console.log("Component>>", company)
      this.companyService.addCompany(company);
      console.log("Component", company)
  }
  omit_special_char(event){  
   var keyCode;  
   keyCode = event.charCode;  
                                                                                            //        refer https://keycode.info/ -for all key codes
   return((keyCode > 64 && keyCode < 91) || (keyCode > 96 && keyCode < 123) || keyCode == 8 || keyCode == 32 || (keyCode >= 48 && keyCode <= 57)); 
         /*8-backspace,32-space, 48-57: 0-9 ,*/
  
  }
  omit_char(event){  
    var keyCode;  
    keyCode = event.charCode;  
    return((keyCode > 96 && keyCode < 123) || keyCode == 8 || keyCode == 32 || (keyCode >= 48 && keyCode <= 57)); 
  }
   public model: any;
   public test2: any;
   public code: any;
   public company_class_code: any;
   public company_category_code: any;
   public company_sub_category_code: any;
   public company_status_code: any;
   public test: any=[];
   public test3: any=[];
   public code_array: any=[];
   public company_category_value_array: any=[];
   public company_sub_category_value_array: any=[];
   public result: any=[];
   formatter = (result: any) => result
  
   company_class_search = (text$: Observable<any>) =>
     text$.pipe(
       debounceTime(200),
       distinctUntilChanged(),
       map(term => term === '' ? []:this.test
        //  :  this.picklist$.subscribe(
        //   (data:any) => { 
        //       for( let i=0;i<data.code_type.company_category.length;i++){
        //       console.log(data.code_type.company_category[i].value)
        //       this.test=data.code_type.company_category[i].value
        //       //.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)
        //       }
        //  })
         )
     )
     company_category_search = (text$: Observable<any>) =>
     text$.pipe(
       debounceTime(200),
       distinctUntilChanged(),
       map(term => term === '' ? []:this.company_category_value_array)
     )

     company_sub_category_search = (text$: Observable<any>) =>
     text$.pipe(
       debounceTime(200),
       distinctUntilChanged(),
       map(term => term === '' ? []:this.company_sub_category_value_array)
     )
  getCode(event){
    this.test2=event.item;
    for(let i=0;i<=this.result[0].length;i++){
     for(let j=0,k=1;j<this.result[i][k].length;j++){
          if((this.test2 == this.result[i][k][j].value) && (this.result[i][k-1]=="company_class") ){
           this.company_class_code=this.result[i][k][j].code;
           console.log(">>>>>>>>>>",this.company_class_code,(this.result[i][k-1]))
        }  
        if((this.test2 == this.result[i][k][j].value) && (this.result[i][k-1]=="company_category") ){
          this.company_category_code=this.result[i][k][j].code;
         }  
         if((this.test2 == this.result[i][k][j].value) && (this.result[i][k-1]=="company_sub_category") ){
          this.company_sub_category_code=this.result[i][k][j].code;
          console.log(">>>>>>>>>>",this.company_sub_category_code,(this.result[i][k-1]))
         }  
         if((this.test2 == this.result[i][k][j].value) && (this.result[i][k-1]=="company_status") ){
          this.company_status_code=this.result[i][k][j].code;
         }  
     }
   }
  }
  ngOnInit() {
    this.picklist$ = this.picklistService.fetchPicklist()
     this.picklist$.subscribe(
      (data:any) => {
        for( let i=0;i<data.code_type.company_category.length;i++){
             this.test.push(data.code_type.company_class[i].value)
             this.company_category_value_array.push(data.code_type.company_category[i].value)
             this.company_sub_category_value_array.push(data.code_type.company_sub_category[i].value)
        }
        for( let i=0;i<Object.keys(data.code_type).length;i++){
          this.result = Object.keys(data.code_type).map(function(key) {
            return [(key), data.code_type[key]];
          });
          console.log(this.result.length);
        }
     })
  }
}



  

