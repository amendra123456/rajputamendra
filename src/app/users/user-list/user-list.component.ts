import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { EcomUtility } from 'src/app/Repository/ecom-utility';
import { UserListRequestAction, UserListSuccessAction } from 'src/app/actions/user-action';
import { User } from 'src/app/data-types';
import { RootReducerState, getUserLoaded, getUserLoading, getUsers } from 'src/app/reducers';
import { UserService } from 'src/app/user.service';



@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  userList:User[]|undefined;
  loading:boolean=false;
  error:boolean=false;
constructor(private _utility:EcomUtility, private store:Store<RootReducerState>){}
ngOnInit(){
this.fetchUser()
}

fetchUser(){
  const observer$= this._utility.getist();
  const userData$=observer$[1];
  const loading$=observer$[0];
  const error$=observer$[2];
  userData$.subscribe((res)=>{
this.userList=res;
  });
  loading$.subscribe((res)=>{
   this.loading=res;
  })

  error$.subscribe((res)=>{
    this.error=res;
   })

}
deleteItem(id:number){

}
updateItem(id:number){

}
viewDetail(data:User){

}
getUserData(){
  this._utility.getist(true);

}
}
