
import { Action } from '@ngrx/store';
import { Company } from 'src/app/layout/company/model/company.model';

export interface Action {  
    type: string,
    payload?: any
}

export enum ActionTypes {
    LOAD_COMPANIES = '[LOAD ALL] Companies',
    LOAD_COMPANIES_SUCCESS = '[LOAD ALL] Companies Success',
    
    LOAD_COMPANY = '[LOAD] Company',
    LOAD_COMPANY_SUCCESS = '[LOAD] Company Success',
   
    CREATE_COMPANY = '[CREATE] Company',
    CREATE_COMPANY_SUCCESS = '[CREATE] Company Success',
    
    UPDATE_COMPANY = '[UPDATE] Company',
    UPDATE_COMPANY_SUCCESS = '[UPDATE] Company Success',

}
export class LoadCompanyAction implements Action {
    readonly type = ActionTypes.LOAD_COMPANY; 
    constructor(public payload: any) {}
  }
   
  export class LoadCompanySuccessAction implements Action {
    readonly type = ActionTypes.LOAD_COMPANY_SUCCESS;
    constructor(public payload: any) {}
   
  }


export class LoadCompaniesAction implements Action {
  readonly type = ActionTypes.LOAD_COMPANIES; 
  constructor(public payload?: any) {}
}
 
export class LoadCompaniesSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_COMPANIES_SUCCESS;
  constructor(public payload: any) {}
 
}
export class AddCompanyAction implements Action {
    readonly type = ActionTypes.CREATE_COMPANY;
    constructor(public payload: Company) {}
  }
  
  export class AddCompanySuccessAction implements Action {
    readonly type = ActionTypes.CREATE_COMPANY_SUCCESS;
    constructor(public payload: any) {
    }
  }
  export class UpdateCompanyAction implements Action {
    readonly type = ActionTypes.UPDATE_COMPANY;
    constructor(public payload: Company) {}
  }
  
  export class UpdateCompanySuccessAction implements Action {
    readonly type = ActionTypes.UPDATE_COMPANY_SUCCESS;
    constructor(public payload: any) {
    }
  }
  


export type Actions =
LoadCompanyAction |
LoadCompanySuccessAction |
LoadCompaniesAction |
LoadCompaniesSuccessAction |
AddCompanyAction |
AddCompanySuccessAction |
UpdateCompanyAction |
UpdateCompanySuccessAction
