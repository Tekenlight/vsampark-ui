import { Injectable } from "@angular/core";
import { UserService } from "../../../layout/user/services/user.service";
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
 
import { ActionTypes }  from '../actions/user.actions';
import * as userActions from '../actions/user.actions';
 
@Injectable({
  providedIn: 'root'
})
export class UserEffects {
  constructor(private user_service: UserService,
    private actions$: Actions
  ) {}
 
  @Effect() 
  loadUser$: Observable<Action> = this.actions$.pipe(
    ofType<userActions.LoadUserAction>(ActionTypes.LOAD_USER),
    mergeMap((action) => this.user_service.getUserbyId(action.payload).pipe(
    map(users => (new userActions.LoadUserSuccessAction(users))),
    //catchError((err) => [new GetAllGamesError(err)])
    ))
  )
  
  @Effect() 
  loadUsers$: Observable<Action> = this.actions$.pipe(
    ofType<userActions.LoadUsersAction>(ActionTypes.LOAD_USERS),
    mergeMap((action) => this.user_service.getAllUsers(action.payload).pipe(
    map(users => (new userActions.LoadUsersSuccessAction(users)))
    ))
  )

  @Effect()
  addUser$: Observable<Action>  = this.actions$.pipe(
    ofType<userActions.AddUserAction>(ActionTypes.CREATE_USER),
    mergeMap((action) => this.user_service.createUser(action.payload).pipe(
    map(user =>(new userActions.AddUserSuccessAction(user)))
    ))
  )

  @Effect()
  updateUser$: Observable<Action>  = this.actions$.pipe(
    ofType<userActions.AddUserAction>(ActionTypes.UPDATE_USER),
    mergeMap((action) => this.user_service.updateUser(action.payload).pipe(
    map(user =>(new userActions.UpdateUserSuccessAction(user)))
    ))
  )

}