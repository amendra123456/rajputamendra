import { Component } from '@angular/core';
import { Product, cart, signUp } from '../data-types';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss']
})
export class UserAuthComponent {
  showLogin: boolean = true;
  errorMsg:string='';
  cartItems=0;
  constructor(private user: UserService, private route: Router,private product:ProductService) { }
  ngOnInit() {
    this.user.userAuthLoad();
    
  }
  submit(data: signUp) {
    this.user.userSignUp(data).subscribe((res) => {
      if (res) {
        localStorage.setItem('user', JSON.stringify(res.body));
       // this.route.navigate(['/']);
      }

    })


  }
  submitIn(data: signUp) {
    let authError=this.user.getLogin(data);
    if(authError){
      let userId= this.user.checkUserLoggedIn();
    setTimeout(() => {
      if(userId!=null){
        this.product.getProductCart(userId).subscribe((res)=>{
          if (res?.length>0) {
          this.cartItems= res.length;
          }
         });;
      }else{
        
        let localCart=this.product.getLocalDataLength();
        this.cartItems= localCart?localCart:"";
        let item =localStorage.getItem('localCart');  
        let items= item && JSON.parse(item);        
  
        this.product.cartItemData.emit(items);
      }
    }, 1000);
    }
    this.errorMsg="";
    
   this.user.inValidUserAuth.subscribe((res)=>{
    if(res){
      this.errorMsg="Some error occurred while email and password enter";
    } else{
      this.removeLocalStorageCartData()
    }
   
   })
  }
  openLogin() {
    this.showLogin = true;
  }
  openSignUp() {
    this.showLogin = false;console.warn("22222");
  }
  removeLocalStorageCartData(){
    let item =localStorage.getItem('localCart');  
    if(item){
      let cartData=JSON.parse(item);
      let user =localStorage.getItem('user');  
      let userId= user && JSON.parse(user).id;

      this.product.getCartItem(userId).subscribe((res)=>{ 
       // console.log(res); return;
        if(res.length == 0){
          
          this.product.addTocart(cartData,userId);
         
  
        }else{
          //cartData=res; console.log(res);
  
          let data1 = []; 
      for (var key in res) {
        if (res.hasOwnProperty(key)) {
          var products = JSON.parse(res[key].cart);        
          let ii=JSON.parse(products);
          for (let i = 0; i < ii.length; i++) {
            let obj = ii[i];//console.log(obj);
           data1.push(obj);
          //  console.log(obj);
          }
          // console.log("Cart: ", cart); break;
        }
        //console.log(data);
      }
      for(let i=0; i<cartData.length; i++){
        data1.push(cartData[i]);
      }
      
     // console.log(data1); return;
          
        this.product.updateUserCart(data1,userId);
         
        }
        
      });

    //  return;
     // this.product.addTocart(cartData,userId);
      cartData.forEach((data:cart[],index: number) => {
      //console.log(data);
        
        if(cartData.length===index+1){
        localStorage.removeItem('localCart');
        }
      });
    }
  }
}
