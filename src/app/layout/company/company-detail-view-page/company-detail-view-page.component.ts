import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { PicklistService } from 'src/app/common/services/picklist.service';
import { Company } from '../model/company.model';
import { CompanyService } from '../services/company.service';
import { ActivatedRoute } from '@angular/router';
import { AppState } from 'src/app/model/app.state';
import { Store } from '@ngrx/store';
import  * as CompanyActions from '../../../store/company/actions/company.actions'

@Component({
  selector: 'company-detail-view-page',
  templateUrl: './company-detail-view-page.component.html',
  styleUrls: ['./company-detail-view-page.component.css']
})
export class CompanyDetailViewPageComponent implements OnInit,OnChanges {

  
    //@Input() public company;
   
    company: any=[]
    picklist$: Observable<any>;
    picklist_array:any=[];
    cols:any[];
    result:any;
    company_category_view_value;
    company_sub_category_view_value;
    company_class_view_value;
    company_status_view_value:string="Active";
    typeahead_array:any=[]
    constructor(private picklistService: PicklistService,private company_service:CompanyService,private activatedRoute: ActivatedRoute, private store:Store<AppState>) { }
  
    
    ngOnInit() {
      console.log("IIII",this.company);
      this.activatedRoute.params.subscribe((params:any) => {
        console.log("URL has changed ",params)
        if(params.id){
          //this.company_service.getCompanyById(params.id).subscribe(value =>{
            this.store.dispatch(new CompanyActions.LoadCompanyAction(params.id))
            this.store.subscribe((value:any)=>{ 
              this.company=value.companies.selected;
            });
            
          }
        });
      this.picklist$ = this.picklistService.fetchPicklist()
      this.picklist$.subscribe((data:any) => {  
        
        this.picklist_array=data;
        console.log(this.picklist_array)
        this.typeahead_array=[
          {code_type:"company_category", code: this.company.company_category},
          {code_type:"company_sub_category", code: this.company.company_sub_category}
      ]
    
        
        
        for( let [key, value] of Object.entries(this.picklist_array.code_type)){
              console.log(key,value)
            }
            this.result = Object.keys(data.code_type).map(function(key) {
              //console.log("!!",key);
              return [(key), data.code_type[key]];
            });
            console.log(this.result);
            for(let i=0;i<=this.result[0].length;i++){
              for(let j=0,k=1;j<this.result[i][k].length;j++){
                if((this.company.company_category == this.result[i][k][j].code) && (this.result[i][k-1]=="company_category")){
                 this.company_category_view_value=this.result[i][k][j].value
              }
              if((this.company.company_sub_category == this.result[i][k][j].code) && (this.result[i][k-1]=="company_sub_category") ){
                this.company_sub_category_view_value=this.result[i][k][j].value
             }
              if((this.company.company_class == this.result[i][k][j].code) && (this.result[i][k-1]=="company_class") ){
                this.company_class_view_value=this.result[i][k][j].value
            }
            //console.log(this.result[i][k][j].code)
            if((this.company.company_status == this.result[i][k][j].code) && (this.result[i][k-1]=="company_status") ){
              console.log(this.result[i][k][j].value)
              this.company_status_view_value=this.result[i][k][j].value
          }
         }
        }
      });
     
      
      
   
      this.cols= [
        
        { field: 'company_name', label: 'Company Name' , type: 'normal'},
        { field: 'cin', label: 'Cin', type: 'normal' },
        { field: 'company_email_id', label: 'Corporate Email Id', type: 'normal' },
        { field: 'company_short_name', label: 'Company Short Name',  type: 'normal' },
        { field: 'company_category', label: 'Company Category', type: 'typeahead' },
        { field: 'company_sub_category', label: 'Company Sub Category', type: 'typeahead' },
        { field: 'company_class', label: 'Company Class',type: 'typeahead' },
        { field: 'company_status', label: 'Company Status',type: 'typeahead' },
        { field: 'pan', label: 'PAN' ,type: 'normal'},
        { field: 'tan', label: 'TAN' ,type: 'normal' },
        { field: 'tin', label: 'TIN',type: 'normal' },
        { field: 'gstin', label: 'GSTIN',type: 'normal' },
        { field: 'date_of_incorporation', label: 'Date of Incorporation',type: 'date'  },
        { field: 'registered_address', label: ' Registered Address',type: 'nested_object' },
        { field: 'corporate_address', label: ' Corporate Address',type: 'normal' },
        { field: 'email_id', label: 'Email id',type: 'normal' },
        { field: 'company_email_id', label: 'Company Email Id',type: 'normal' },
        { field: 'bank_account_number', label: 'Bank Account Number',type: 'normal' }, 
        { field: 'bank_branch', label: 'Bank Branch',type: 'normal'}, 
        { field: 'bank_ifsc_code', label: 'Bank IFSC code',type: 'normal' },
       
    ];
    }
   ngOnChanges(){
    console.log("IIII",this.company);
   }
    
  }


