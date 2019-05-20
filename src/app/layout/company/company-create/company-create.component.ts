import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { PicklistService } from '../../../common/services/picklist.service';
import { Observable } from 'rxjs';
import { CompanyService } from '../../company/services/company.service';
import { Company } from '../../company/model/company.model';
import { Address } from '../../company/model//address.model';
import { debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { DataStorage } from '../../../common/dataProvider/dataProvider';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageFormatter } from "../../../common/message-handler/message-handler"
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/model/app.state';
import * as CompanyActions from '../../../store/company/actions/company.actions';
import * as moment from 'moment';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';

export interface AllValidationErrors {
  control_name: string;
  error_name: string;
  error_value: any;
  length ?:number;
  error_message?:string;
}

export interface FormGroupControls {
  [key: string]: AbstractControl;
}

export interface ErrorKeyValue {
   control_name: string,
   error_message: string  
}

@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styleUrls: ['./company-create.component.scss']
})
export class CompanyCreateComponent implements OnInit {
  

  companyForm: FormGroup;
  picklist$: Observable<any>;
  company: Company
  onSubmit: boolean = false;
  selectedCompany:any=[]; 
  date_of_incorporation: Date;
  public option_selected: string;
  public code: any;
  public error:any;
  public company_class_code: string;
  public company_category_code:string;
  public company_sub_category_code: string;
  public company_status_code: string ="ACT";
  public company_class_value_array: any=[];
  public company_category_value_array: any=[];
  public company_sub_category_value_array: any=[];
  public company_status_value_array: any=[];
  public result: any=[];
  public errorMessage:string="";
  public hasError : boolean = false;
  public error_message_array:any=[];
  public error_key_value: any=[]
  public currentUrl
  public edit_mode:boolean=false;
  public code_value_array:any =[];
  myDatePickerOptions: IMyDpOptions = {
     dateFormat: 'dd-mm-yyyy',
     disableSince: {year: (new Date()).getFullYear(), month: (new Date()).getMonth() + 1, day: (new Date()).getDate() + 1}
};
  
  constructor(private router:Router,private formBuilder: FormBuilder, private picklistService: PicklistService,
              private companyService: CompanyService,private _company_data: DataStorage,private messageFormatter: MessageFormatter,
              private activatedRoute: ActivatedRoute,private store: Store<AppState>) {
     
    this.companyForm = this.formBuilder.group({
      cin : ['',Validators.maxLength(21)],
      company_name : ['', [Validators.required]],
      company_short_name : ['', [Validators.minLength(3),Validators.required]],
      company_status : ['Active', [Validators.required]],
      company_category : ['', [Validators.required]],
      company_sub_category : ['', [Validators.required]],
      company_class : ['', [Validators.required]],
      pan : ['',[Validators.maxLength(10), Validators.pattern('^([a-zA-Z0-9_-]+)$')]],
      tan : ['', Validators.maxLength(10)],
      tin : ['',Validators.maxLength(11) ],
      gstin : ['',Validators.maxLength(15)],
      date_of_incorporation : ['', [Validators.required]],
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
      contact_number : ['91', [Validators.required]],
      bank_account_number : ['',],
      bank_branch : [''],
      bank_ifsc_code: [''],
      });
   }
    get form_controls() { 
     return this.companyForm.controls;
     }
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
      this.company={
          cin: this.companyForm.get('cin').value,
          company_name: this.companyForm.get('company_name').value,
          company_short_name: this.companyForm.get('company_short_name').value,
          company_category:  this.company_category_code,
          company_sub_category:  this.company_sub_category_code,
          company_class: this.company_class_code,
          pan: this.companyForm.get('pan').value,
          tan: this.companyForm.get('tan').value,
          tin: this.companyForm.get('tin').value,
          gstin: this.companyForm.get('gstin').value,
          //date_of_incorporation:this.companyForm.get('date_of_incorporation').value,
          date_of_incorporation:this.date_of_incorporation,
          registered_address: registered_address,
          corporate_address: corporate_address, 
          country:this.companyForm.get('country').value,
          email_id: this.companyForm.get('email_id').value,
          company_email_id: this.companyForm.get('company_email_id').value,
          contact_number: this.companyForm.get('contact_number').value,
          company_status: this.company_status_code,
          bank_account_number: this.companyForm.get('bank_account_number').value,
          bank_branch:this.companyForm.get('bank_branch').value,
          bank_ifsc_code: this.companyForm.get('bank_ifsc_code').value
        }
        if((!this.company.pan)&&(!this.company.tan)&&(!this.company.tin)&&(!this.company.gstin)){
          this.hasError=true;
          this.error="Please enter any one of PAN,TAN,TIN,GSTIN";
        }
        console.log("Component>>", this.company)
        //this.companyService.addCompany(this.company); // before ngrx implementatation
        this.store.dispatch(new CompanyActions.AddCompanyAction(this.company))
        this.router.navigateByUrl('success')
  
    }
  editCompany(){
    this.onSubmit=true;
     this.get_code_value(); // for getting code values during submission
    
    this.company.company_class = this.company_class_code //Assigning code values
    this.company.company_category= this.company_category_code
    this.company.company_sub_category=this.company_sub_category_code
    this.company.company_status= this.company_status_code
    console.log("Component Edit>>", this.company)
    //this.companyService.updateCompany(this.company)  // before ngrx implementatation
    this.store.dispatch(new CompanyActions.UpdateCompanyAction(this.company))
    this.router.navigateByUrl('success')
  }

  omit_special_char(event){  
   var keyCode;  
   keyCode = event.charCode;  
                                                                                               //refer https://keycode.info/ -for all key codes
   return((keyCode > 64 && keyCode < 91) || (keyCode > 96 && keyCode < 123) || keyCode == 8 || keyCode == 32 || (keyCode >= 48 && keyCode <= 57)); 
         /*8-backspace,32-space, 48-57: 0-9 ,*/
  
  }
  omit_char(event){  
    var keyCode;  
    keyCode = event.charCode;  
    return((keyCode > 96 && keyCode < 123) || keyCode == 8 || keyCode == 32 || (keyCode >= 48 && keyCode <= 57)); 
  }
 
 
   formatter = (result: any) => result;
  
   company_class_search = (text$: Observable<any>) =>
     text$.pipe(
       debounceTime(200),
       distinctUntilChanged(),
       map(term => term === '' ? []:this.company_class_value_array
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
     company_status_search = (text$: Observable<any>) =>
     text$.pipe(
       debounceTime(200),
       distinctUntilChanged(),
       map(term => term === '' ? []:this.result.company_status)
     )
  
      getCode(event){
        this.option_selected=event.item;
        
        for(let i=0;i<=this.result[0].length;i++){
        for(let j=0,k=1;j<this.result[i][k].length;j++){
            if((this.option_selected == this.result[i][k][j].value) && (this.result[i][k-1]=="company_class") ){
            this.company_class_code=this.result[i][k][j].code;
            
            //console.log(">>>>>>>>>>",this.company_class_code,(this.result[i][k-1]))
          }  
          if((this.option_selected == this.result[i][k][j].value) && (this.result[i][k-1]=="company_category") ){
            this.company_category_code=this.result[i][k][j].code;
          }  
          if((this.option_selected == this.result[i][k][j].value) && (this.result[i][k-1]=="company_sub_category") ){
            this.company_sub_category_code=this.result[i][k][j].code;
            //console.log(">>>>>>>>>>",this.company_sub_category_code,(this.result[i][k-1]))
          }  
          if((this.option_selected == this.result[i][k][j].value) && (this.result[i][k-1]=="company_status") ){
            //this.company_status_code=this.result[i][k][j].code;
            this.company_status_code="ACT";
            //console.log(">>>>>>>>>>",this.company_status_code,(this.result[i][k-1]))
          }  
      }
    }
    }
  ngOnInit() {
    this.picklist$ = this.picklistService.fetchPicklist()
    this.picklist$.subscribe(
      (data:any) => {
        this.code_value_array=data;
        for( let i=0;i<data.code_type.company_category.length;i++){
             this.company_class_value_array.push(data.code_type.company_class[i].value)
             this.company_category_value_array.push(data.code_type.company_category[i].value)
             this.company_sub_category_value_array.push(data.code_type.company_sub_category[i].value)
            // this.company_status_value_array.push(data.code_type.company_status[i].value)
        }
        for( let i=0;i<Object.keys(data.code_type).length;i++){
          this.result = Object.keys(data.code_type).map(function(key) {
            //console.log("!!",key);
            return [(key), data.code_type[key]];
          });
          console.log(this.result);
        }
      
     })
     //this.selectedCompany=this._company_data.data;
     this.router.events.subscribe((res) => { 
      this.currentUrl=this.router.url;
         //console.log(this.router.url,"Current URL");
        })
    
      
     this.companyForm.valueChanges.subscribe(val => {
     //this.getFormValidationErrorsTest()
     this.onChanges()  // to persist the changes in the form if value is modified
     this.getFormValidationErrors(this.companyForm.controls)
     
    })
      this.activatedRoute.params.subscribe((params:any) => {
      console.log("URL has changed ",params)
      if(params.id){
        // this.companyService.getCompanyById(params.id).subscribe(value =>{
        //     this.selectedCompany=value;
        //     this.edit_mode=true;
        //     this.picklist$.subscribe(
        //     (data:any) => {
        //       this.code_value_array=data;
        //       this.get_code_value()
        //       this.patch_value_for_form();
        //     })
        //   });

          this.store.dispatch(new CompanyActions.LoadCompanyAction(params.id));
          this.selectedCompany=this.store.subscribe((value:any)=>{ this.selectedCompany=value.companies.selected
            if(this.selectedCompany){
              this.get_code_value();
              console.log(typeof(this.selectedCompany.date_of_incorporation))
              this.patch_value_for_form();}
              this.edit_mode=true;
              this.picklist$.subscribe(
                (data:any) => {
                    this.code_value_array=data;
                   
                   // this.get_code_value();
                    //console.log(typeof(this.selectedCompany.date_of_incorporation))
                    //this.patch_value_for_form();
                    //console.log(typeof(this.selectedCompany.date_of_incorporation))
                    
                  })
              })
          
        }
      });
  
  }
    
     patch_value_for_form(){
      //this.get_code_value();
      this.companyForm.patchValue({
        cin: this.selectedCompany.cin?this.selectedCompany.cin:'' ,
        company_name : this.selectedCompany.company_name?this.selectedCompany.company_name:'',
        company_short_name :  this.selectedCompany.company_short_name?this.selectedCompany.company_short_name:'',
        company_status :  this.selectedCompany.company_status?this.selectedCompany.company_status:'',
        //corporate_parent_id : [1],
        company_category :  this.selectedCompany.company_category?this.selectedCompany.company_category:'',
        company_sub_category :  this.selectedCompany.company_sub_category?this.selectedCompany.company_sub_category:'',
        company_class : this.selectedCompany.company_class?this.selectedCompany.company_class:'',
        pan : this.selectedCompany.pan?this.selectedCompany.pan:'',
        tan : this.selectedCompany.tan?this.selectedCompany.tan:'',
        tin : this.selectedCompany.tin?this.selectedCompany.tin:'',
        gstin : this.selectedCompany.gstin?this.selectedCompany.gstin:'',
        //date_of_incorporation : this.selectedCompany.date_of_incorporation?this.selectedCompany.date_of_incorporation:'',
        date_of_incorporation : this.selectedCompany.date_of_incorporation?moment(this.selectedCompany.date_of_incorporation).format('DD-MM-YYYY'):'',
        //country : ['INDIA'],
        company_email_id :this.selectedCompany.company_email_id ? this.selectedCompany.company_email_id : '' ,
        email_id : this.selectedCompany.email_id?this.selectedCompany.email_id:'',
        contact_number : this.selectedCompany.contact_number?this.selectedCompany.contact_number:'',
       
        bank_account_number : this.selectedCompany.bank_account_number?this.selectedCompany.bank_account_number:'',
        bank_branch : this.selectedCompany.bank_branch?this.selectedCompany.bank_branch:'',
        bank_ifsc_code: this.selectedCompany.bank_ifsc_code?this.selectedCompany.bank_ifsc_code:'',
        registered_address : (this.selectedCompany.registered_address!= null)?{
          line1 : this.selectedCompany.registered_address.line1,
          line2 : this.selectedCompany.registered_address.line2,
          city : this.selectedCompany.registered_address.city,
          pincode : this.selectedCompany.registered_address.pincode
      }:null,
        //  corporate_address : (this.selectedCompany.corporate_address!=null)?{
        //   line1 : this.selectedCompany.corporate_address.line1,
        //   line2 : this.selectedCompany.corporate_address.line2,
        //   city : this.selectedCompany.corporate_address.city,
        //   pincode : this.selectedCompany.corporate_address.pincode
        // }:null,

        user_id: this.selectedCompany.user_id,
       
       _id: this.selectedCompany._id
      })
   
     }
     get_code_value(){ 
     
        if(this.result.length>0){
        for(let i=0;i<=this.result[0].length;i++){
        for(let j=0,k=1;j<this.result[i][k].length;j++){
            if((this.selectedCompany.company_class == this.result[i][k][j].code) && (this.result[i][k-1]=="company_class") ){
            this.selectedCompany.company_class=this.result[i][k][j].value; //edit mode display value
            this.company_class_code=this.result[i][k][j].code; 
            }
            if((this.selectedCompany.company_category  == this.result[i][k][j].code) && (this.result[i][k-1]=="company_category") ){
              this.selectedCompany.company_category=this.result[i][k][j].value;
              this.company_category_code=this.result[i][k][j].code;
            }  
            if((this.selectedCompany.company_sub_category == this.result[i][k][j].code) && (this.result[i][k-1]=="company_sub_category") ){
              this.selectedCompany.company_sub_category=this.result[i][k][j].value;
              this.company_sub_category_code=this.result[i][k][j].code;
            }
         }
       }
    }
  }
     
      onChanges(): void {
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
        this.company={
          cin: this.companyForm.get('cin').value,
          company_name: this.companyForm.get('company_name').value,
          company_short_name: this.companyForm.get('company_short_name').value,
          company_category:  this.companyForm.get('company_category').value,
          company_sub_category: this.companyForm.get('company_sub_category').value,
          company_class: this.companyForm.get('company_class').value,
          pan: this.companyForm.get('pan').value,
          tan: this.companyForm.get('tan').value,
          tin: this.companyForm.get('tin').value,
          gstin: this.companyForm.get('gstin').value,
          //date_of_incorporation:this.companyForm.get('date_of_incorporation').value,
          date_of_incorporation:this.date_of_incorporation,
          registered_address: registered_address,
          corporate_address: corporate_address, 
          country:this.companyForm.get('country').value,
          email_id: this.companyForm.get('email_id').value,
          company_email_id: this.companyForm.get('company_email_id').value,
          contact_number: this.companyForm.get('contact_number').value,
          company_status: this.companyForm.get('company_status').value,
          bank_account_number: this.companyForm.get('bank_account_number').value,
          bank_branch:this.companyForm.get('bank_branch').value,
          bank_ifsc_code: this.companyForm.get('bank_ifsc_code').value,
          user_id:  this.selectedCompany?this.selectedCompany.user_id:null,
          _id: this.selectedCompany?this.selectedCompany._id:null
         
        }
    
       
    }

   
    
     getFormValidationErrors(controls: FormGroupControls): AllValidationErrors[] {
        let errors: AllValidationErrors[] = [];
          Object.keys(controls).forEach(key => {
            const control = controls[key];
            if (control instanceof FormGroup) {
              errors = errors.concat(this.getFormValidationErrors(control.controls));
            }
            const controlErrors: ValidationErrors = controls[key].errors;
            if (controlErrors !== null) {
                Object.keys(controlErrors).forEach(keyError => {
                  errors.push({
                    control_name: key,
                    error_name: keyError,
                    error_value: controlErrors[keyError],
                    length: controlErrors[keyError].requiredLength
                    });
                });
              }
          });
         for(let index=0;index<errors.length;index++){
             if((errors[index].error_name=="maxlength")||(errors[index].error_name=="minlength")){ 
              this.errorMessage=this.messageFormatter.message_handler("LEN",{"$fieldName":errors[index].control_name,"$length":errors[index].length});
               if (this.error_message_array.indexOf(this.errorMessage) === -1) { //to prevent duplicate entry(as user keeps typing,
                                                                                  //the errorMessage is continuosly received, hence
                                                                                  //mulitple entries of same error message should not be
                                                                                  //pushed)
                  this.error_message_array.push(this.errorMessage)
                  this.get_error_key_value_map(errors[index].control_name,this.errorMessage,errors[index].error_name)
                }
              }
             if(errors[index].error_name=="email"){ 
              this.errorMessage= this.messageFormatter.message_handler("EMAIL",{"$fieldName":errors[index].control_name})
                if (this.error_message_array.indexOf(this.errorMessage) === -1) { //to prevent duplicate entry
                  this.error_message_array.push(this.errorMessage)
                  this.get_error_key_value_map(errors[index].control_name,this.errorMessage,errors[index].error_name)
                }
             }
             if(errors[index].error_name=="required"){ 
              this.errorMessage= this.messageFormatter.message_handler("REQD",{"$fieldName":errors[index].control_name})
              if (this.error_message_array.indexOf(this.errorMessage) === -1) { //to prevent duplicate entry
                  this.error_message_array.push(this.errorMessage)
                this.get_error_key_value_map(errors[index].control_name,this.errorMessage,errors[index].error_name)
              }
            }
          }
       return this.error_message_array;
    }

    get_error_key_value_map(control_name,error_message,error_type){
        this.error_key_value.push({control_name:control_name,error_message:error_message,error_type:error_type}) //error-type-added incase
          //console.log("@@@@@!!!>>>>>",this.error_key_value)                                                    //of multiple error-types
                                                                                                                 //single error needs to be
    }                                                                                                            //displayed 
    onDateChanged(event: IMyDateModel) {
      console.log('onDateChanged(): ', event.date, ' - jsdate: ', new Date(event.jsdate), ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
      console.log(this.companyForm.get('date_of_incorporation').value)
      this.date_of_incorporation=new Date(event.jsdate);
    }
    

} 
  


  
  
  

