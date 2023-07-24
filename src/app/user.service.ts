import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { User, signUp } from './data-types';
import { Router } from '@angular/router';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { ProductService } from './services/product.service';
import { environment } from 'src/environment/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  inValidUserAuth= new EventEmitter<boolean>(false);
  cartItems=0;
  apiUrl:string=environment.apiUrlLocal;
  constructor(private http:HttpClient,
    private route:Router
    ) { }
  userSignUp(data:signUp){
    return this.http.post(this.apiUrl+"seller/user",data,{observe:'response'});
  }
  userAuthLoad(){
    if(localStorage.getItem('user')){
     this.route.navigate(['/']);
    }
  }
  getUserList(){
  return  this.http.get<User[]>(this.apiUrl+"user/getUserList");
  }
  getLogin(data:signUp){
    return  this.http.post(this.apiUrl+"user/login",data,{observe:'response'}).subscribe({
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
