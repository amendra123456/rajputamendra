import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { signUp } from './data-types';
import { Router } from '@angular/router';
import { catchError, retry, throwError } from 'rxjs';
import { ProductService } from './services/product.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  inValidUserAuth= new EventEmitter<boolean>(false);
  cartItems=0;
  constructor(private http:HttpClient,
    private route:Router
    ) { }
  userSignUp(data:signUp){
    return this.http.post("http://localhost:8080/api/seller/user",data,{observe:'response'});
  }
  userAuthLoad(){
    if(localStorage.getItem('user')){
     this.route.navigate(['/']);
    }
  }
  getLogin(data:signUp){
    return  this.http.post("http://localhost:8080/api/user/login",data,{observe:'response'}).subscribe({
      next: (data) => 
      {
        console.log(data.body)
         localStorage.setItem('user',JSON.stringify(data.body));
         this.inValidUserAuth.emit(false);
         this.route.navigate(['/']);
       
      },
      error: (e) => 
      {
        this.inValidUserAuth.emit(true);
        var error=JSON.parse(JSON.stringify(e));
        console.log(error.error.message+'Error while loading the product data');
        return error.error.message;
      }      
    })
  }
 checkUserLoggedIn(){
  let userData = localStorage.getItem('user');
        let userId = userData && JSON.parse(userData).id;
        if(userId!=null){
          return userId;
        }else{
          return null;
        }
       
 }
}
