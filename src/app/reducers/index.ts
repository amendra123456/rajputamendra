import { ActionReducerMap, createSelector } from "@ngrx/store";
import * as fromUsers from "./user-reducer";

export interface RootReducerState{
users:fromUsers.UserReducerState;
}
export const rootReducer: ActionReducerMap<RootReducerState>={
    users: fromUsers.userReducer
}

export const getUserState =(state:RootReducerState)=>state.users;

export const getUserLoaded = createSelector(getUserState,fromUsers.getloaded);
export const getUserLoading = createSelector(getUserState,fromUsers.getloading);
export const getUsers = createSelector(getUserState,fromUsers.getUsers);
export const getUserError = createSelector(getUserState,fromUsers.getUserError);