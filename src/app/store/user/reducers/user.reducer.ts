import * as userActions from '../actions/user.actions';
import { ActionTypes }  from '../actions/user.actions';
import { AppState } from '../../../model/app.state';
import { User} from 'src/app/layout/user/model/user.model';
import { createFeatureSelector } from '@ngrx/store';



export interface State {
  data: User[];
  selected: User;
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


 
export function reducer(state = initialState, action: userActions.Actions):AppState {
  switch(action.type) {

    case ActionTypes.LOAD_USER_SUCCESS: {
      return {
        ... state, 
        loading: true,
        selected: action.payload,
         };
      }
    case ActionTypes.LOAD_USERS_SUCCESS: {
      return {
        ... state, 
        data: action.payload,
        loading: true,
        selected: null,
         };
    }
    case ActionTypes.CREATE_USER_SUCCESS: {
        return {
          ... state, 
          data: action.payload,
          selected: null,
          //error: null,
          loading: true 
        };
      }
    case ActionTypes.UPDATE_USER_SUCCESS: {
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

export const getUsersState = createFeatureSelector < State > ('users');