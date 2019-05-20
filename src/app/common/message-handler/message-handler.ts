import { Observable } from 'rxjs';
import { Component,} from '@angular/core';
import { PicklistService } from '../services/picklist.service';
import { ErrorService } from '../services/errorService';



@Component({
    providers: [ErrorService]
})


export class MessageFormatter {
    
   field_errors$: Observable<any>;
   field_error_array:any=[]
   constructor(public errorService:ErrorService) {
        this.field_errors$= this.errorService.fetchFieldErrors()  
        this.field_errors$.subscribe(
            (data:any) => {   
                this.field_error_array=data;
            })
      }
    message_handler(error_code: string, placeholders : any):string
    {
    
           let error_message:string;
           //console.log(">>>>>>>>>>>>",placeholders,this.field_error_array)
           
           if (error_code in this.field_error_array){
               error_message=this.field_error_array[error_code].error_message  //returns the corresponding generic error_message 
                                                                               //from the field_errors.json based on error
                                                                               //code passed.
            
            /*formatting error message to show field specific error message 
              based on placeholders passed.
              where placeholders -->parameters to replaced in the generic error message*/
                
                for (var element in placeholders) {
                    //console.log("!!!!!!!",element,"Replaced with >>>>",placeholders[element])
                    error_message = error_message.replace(element, placeholders[element]); //replace corresponding placeholder
                                                                                           //with its corresponding value
                }
            }
              
          return error_message;
    }


}

