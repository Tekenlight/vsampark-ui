import * as companyActions from '../actions/company.actions';
import { ActionTypes }  from '../actions/company.actions';
import { AppState } from '../../../model/app.state';
import { Company } from 'src/app/layout/company/model/company.model';
import { createFeatureSelector } from '@ngrx/store';


// export const initialState: AppState = {
//     data:[]
    
// } 
export interface State {
  data: Company[];
  selected: Company;
  action: string;
  loading: boolean;
  //error?: Error;
}

const initialState: State = {
  data: [],
  selected: null,
  action: null,
  loading: false,
  //error: null
};


 
export function reducer(state = initialState, action: companyActions.Actions):AppState {
  switch(action.type) {

    case ActionTypes.LOAD_COMPANY_SUCCESS: {
      return {
        ... state, 
        loading: true,
        selected: action.payload,
         };
      }
    case ActionTypes.LOAD_COMPANIES_SUCCESS: {
      return {
        ... state, 
        data: action.payload,
        loading: true,
        selected: null,
         };
    }
    case ActionTypes.CREATE_COMPANY_SUCCESS: {
        return {
          ... state, 
          data: action.payload,
          selected: null,
          //error: null,
          loading: true 
        };
      }
      case ActionTypes.UPDATE_COMPANY_SUCCESS: {
        return {
          ... state, 
          data: action.payload,
          loading: true,
          selected: null,
        };
      }
    default:
      return state;
  }
}

export const getCompaniesState = createFeatureSelector < State > ('Companies');