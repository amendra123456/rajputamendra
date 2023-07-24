import { Injectable } from "@angular/core";
import { RootReducerState, getUserError, getUserLoaded, getUserLoading, getUsers } from "../reducers";
import { Store } from "@ngrx/store";
import { Observable, combineLatest, take } from "rxjs";
import { UserListErrorAction, UserListRequestAction, UserListSuccessAction } from "../actions/user-action";
import { UserService } from "../user.service";
import { User } from "../data-types";

@Injectable()
export class EcomUtility {
    constructor(private user: UserService, private store: Store<RootReducerState>) { }

    getist(force = false): [Observable<boolean>, Observable<User[]>, Observable<boolean>] {
        const loaded$ = this.store.select(getUserLoaded);
        const loading$ = this.store.select(getUserLoading);
        const getUser$ = this.store.select(getUsers);
        const getUsersError$ = this.store.select(getUserError);
        combineLatest([loaded$, loading$]).pipe(take(1)).subscribe((data) => {
            if ((!data[0] && !data[1]) || force) {
                this.store.dispatch(new UserListRequestAction());
                this.user.getUserList().subscribe((data) => {
                    this.store.dispatch(new UserListSuccessAction({ data }))
                    //this.userList=res;

                },error =>{
                  this.store.dispatch(new UserListErrorAction);      
                })
            }
        })
        return [loading$, getUser$, getUsersError$];

        // getUser.subscribe((res)=>{
        //     return res;
        //    console.log(res);
        //    //this.userList=res;
        //  })
    }
}