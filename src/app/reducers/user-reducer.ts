
import { Action } from "src/app/actions";
import { USER_LIST_ERROR, USER_LIST_REQUEST, USER_LIST_SUCCESS, UserListRequestAction } from "src/app/actions/user-action";
import { User } from "src/app/data-types";

export interface UserReducerState {
    loading:boolean;
    loaded:boolean;
    error:boolean
    users:User[];
}

const initialState: UserReducerState={
    loading:false,
    loaded:false,
    error:false,
    users:[]
}

export function userReducer(state=initialState, action:Action):UserReducerState {
switch(action.type){
 case USER_LIST_REQUEST:{
    return {...state,loading:true};
 }
 case USER_LIST_ERROR:{
   return {...state,error:true};
}
 case USER_LIST_SUCCESS:{
    const updatedUser =  state.users.concat(action.payload.data);
    return {...state,loading:false,loaded:true,users: updatedUser,error: false};
 }
 default:{
    return state;
 }
}
}


//selectors

export const getloading= (state: UserReducerState)=>state.loading;
export const getloaded= (state: UserReducerState)=>state.loaded;
export const getUsers= (state: UserReducerState)=>state.users;
export const getUserError= (state: UserReducerState)=>state.error;