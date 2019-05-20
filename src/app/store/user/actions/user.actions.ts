
import { Action } from '@ngrx/store';
import { User } from 'src/app/layout/user/model/user.model';

export interface Action {  
    type: string,
    payload?: any
}

export enum ActionTypes {
    LOAD_USERS = '[LOAD ALL] Users',
    LOAD_USERS_SUCCESS = '[LOAD ALL] Users Success',
    
    LOAD_USER = '[LOAD] User',
    LOAD_USER_SUCCESS = '[LOAD] User Success',
   
    CREATE_USER = '[CREATE] User',
    CREATE_USER_SUCCESS = '[CREATE] User Success',
    
    UPDATE_USER = '[UPDATE] User',
    UPDATE_USER_SUCCESS = '[UPDATE] User Success',

}
export class LoadUserAction implements Action {
    readonly type = ActionTypes.LOAD_USER; 
    constructor(public payload: any) {}
  }
   
  export class LoadUserSuccessAction implements Action {
    readonly type = ActionTypes.LOAD_USER_SUCCESS;
    constructor(public payload: any) {}
   
  }


export class LoadUsersAction implements Action {
  readonly type = ActionTypes.LOAD_USERS; 
  constructor(public payload: any) {}
}
 
export class LoadUsersSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_USERS_SUCCESS;
  constructor(public payload: any) {}
 
}
export class AddUserAction implements Action {
    readonly type = ActionTypes.CREATE_USER;
    constructor(public payload: User) {}
  }
  
  export class AddUserSuccessAction implements Action {
    readonly type = ActionTypes.CREATE_USER_SUCCESS;
    constructor(public payload: any) {
    }
  }
  export class UpdateUserAction implements Action {
    readonly type = ActionTypes.UPDATE_USER;
    constructor(public payload: User) {}
  }
  
  export class UpdateUserSuccessAction implements Action {
    readonly type = ActionTypes.UPDATE_USER_SUCCESS;
    constructor(public payload: any) {
    }
  }
  


export type Actions =
LoadUserAction |
LoadUserSuccessAction |
LoadUsersAction |
LoadUsersSuccessAction |
AddUserAction |
AddUserSuccessAction |
UpdateUserAction |
UpdateUserSuccessAction
