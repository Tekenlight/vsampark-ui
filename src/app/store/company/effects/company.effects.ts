import { Injectable } from "@angular/core";
import { CompanyService } from "../../../layout/company/services/company.service";
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
 
import { ActionTypes }  from '../actions/company.actions';
import * as companyActions from '../actions/company.actions';
 
@Injectable({
  providedIn: 'root'
})
export class CompanyEffects {
  constructor(private company_service: CompanyService,
    private actions$: Actions
  ) {}
 
  @Effect() 
  loadCompany$: Observable<Action> = this.actions$.pipe(
    ofType<companyActions.LoadCompanyAction>(ActionTypes.LOAD_COMPANY),
    mergeMap((action) => this.company_service.getCompanyById(action.payload).pipe(
    map(companies => (new companyActions.LoadCompanySuccessAction(companies))),
    //catchError((err) => [new GetAllGamesError(err)])
    ))
  )
  
  @Effect() 
  loadCompanies$: Observable<Action> = this.actions$.pipe(
    ofType<companyActions.LoadCompaniesAction>(ActionTypes.LOAD_COMPANIES),
    mergeMap((action) => this.company_service.getAllCompanies(action.payload).pipe(
    map(companies => (new companyActions.LoadCompaniesSuccessAction(companies)))
    ))
  )

  @Effect()
  addCompany$: Observable<Action>  = this.actions$.pipe(
    ofType<companyActions.AddCompanyAction>(ActionTypes.CREATE_COMPANY),
    mergeMap((action) => this.company_service.addCompany(action.payload).pipe(
    map(company =>(new companyActions.AddCompanySuccessAction(company)))
    ))
  )

  @Effect()
  updateCompany$: Observable<Action>  = this.actions$.pipe(
    ofType<companyActions.AddCompanyAction>(ActionTypes.UPDATE_COMPANY),
    mergeMap((action) => this.company_service.updateCompany(action.payload).pipe(
    map(company =>(new companyActions.UpdateCompanySuccessAction(company)))
    ))
  )
//
//   @Effect()
//   getCompanyInfo = this.actions$.pipe(
//     ofType<companyActions.LoadCompanyAction>(ActionTypes.LOAD_COMPANY),
//     switchMap((action) => {
//       return this.company_service.getAllCompanies(action.payload.page).pipe(
//         map(companies => (new companyActions.LoadCompanySuccessAction(companies)))
//       ),
     
//     }),  
//   )
}