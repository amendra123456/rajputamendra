import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { userLogin, userSignUp } from '../data-types';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Router } from '@angular/router';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
isSellerLogedIn = new BehaviorSubject<boolean>(false);
isLoginError= new EventEmitter<boolean>(false);
apiUrl:string=environment.apiUrlLocal;

  constructor(private http:HttpClient,private Router:Router) { 
  }
  userSignUp(data:userSignUp){
    console.log("calling");
    return this.http.post(this.apiUrl+"seller/add",data,{observe:'response'}).subscribe((res)=>{
      localStorage.setItem('seller',JSON.stringify(res.body))
      this.isSellerLogedIn.next(true);
      this.Router.navigate(['seller-home']);
    });;
  }
  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLogedIn.next(true);
      this.Router.navigate(['seller-home']);
    }
  }
  userLogin(data:userLogin){
    console.log("calling");
   this.http.post(this.apiUrl+`seller/login`,data,{observe:'response'})
   .subscribe((res:any)=>{console.log(res.body);
    if(res && res.body){
      localStorage.setItem('seller',JSON.stringify(res.body))
      this.isSellerLogedIn.next(true);
      this.Router.navigate(['seller-home']);
    }else{
     this.isLoginError.emit(true);
    }
   });
  }
}
