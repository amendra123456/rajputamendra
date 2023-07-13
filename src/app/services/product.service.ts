import { EventEmitter, Injectable } from '@angular/core';
import { Product, cart, order } from '../data-types';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartItemData= new EventEmitter<cart[]>();
  cartData:number|undefined;
  constructor(private http:HttpClient, private user:UserService) { }
  addProduct(formData:Product){
    return this.http.post("http://localhost:8080/api/seller/product",formData,{observe:'response'});
  }
  editProduct(id:number,formData:Product){
    return this.http.put("http://localhost:8080/api/seller/product/"+id,formData,{observe:'response'});
  }
  getList(){
    return this.http.get<Product[]>("http://localhost:8080/api/seller/product");
  }
  deleteItem(id:number){
    return this.http.delete("http://localhost:8080/api/seller/product/"+id);
  }
  getItem(id:number){
    return this.http.get<Product>("http://localhost:8080/api/seller/product/"+id);
  }
  getPopularProduct(){
    return this.http.get<Product[]>("http://localhost:8080/api/seller/product/limit/3");
  }
  getTrendyProduct(){
    return this.http.get<Product[]>("http://localhost:8080/api/seller/product/limit/20");
  }
  getProductSearch(search:string){
    return this.http.get<Product[]>("http://localhost:8080/api/seller/product?name="+search);    
  }
  getItemDetail(id:string){
    return this.http.get<Product>("http://localhost:8080/api/seller/product/"+id);
  }
  getCartItem(id:number){
    return this.http.get<cart[]>("http://localhost:8080/api/user/getCart/"+id);
  }
  getProductCart(id:number){
    return this.http.get<cart[]>("http://localhost:8080/api/user/getProductCart/"+id);
  }
  orderItem(formData:order){
    return this.http.post("http://localhost:8080/api/user/order",formData,{observe:'response'});
  }
  getMyOrder(){
    let userData=localStorage.getItem('user'); 
    let userId= userData && JSON.parse(userData).id;
    return this.http.get<order[]>("http://localhost:8080/api/user/getMyOrder/"+userId);
  }
  addTocart(storeCart:cart[],userId:number){
    this.http.post("http://localhost:8080/api/user/userCart",
        {
          'user_id':userId,
          'cart':JSON.stringify(storeCart)
        },{observe:'response'}).subscribe((res)=>{
          this.getProductCart(userId).subscribe((res)=>{ 
            this.cartItemData.emit(res);
             
         });;
        });;
  }
  updateUserCart(storeCart:cart[],user_id:number){
    this.http.put("http://localhost:8080/api/user/updateUserCart",
        {
          'user_id':user_id,
          'cart':JSON.stringify(storeCart)
        },{observe:'response'}).subscribe((res)=>{
          this.getProductCart(1).subscribe((res)=>{ 
            this.cartItemData.emit(res);
             
         });
        });
  }
  
  localAddToCart(data:Product){
    let cartData=[];
    let storeCart;
    let localCart=localStorage.getItem('localCart'); 
    let userId= this.user.checkUserLoggedIn();
        //console.log(userId); 
        // if(userId=="" || userId==null){
        //   userId=Math.floor((Math.random()*1000000)+1);
        // }
        // if(localCart!= null){
        //   let res =JSON.parse(localCart);
        //   console.log(res[0].user_id);
        //   userId=res[0].user_id;
        // }
 if(userId==null){
      if(!localCart){
      storeCart=JSON.stringify([data]);
     localStorage.setItem('localCart',JSON.stringify([data]));
     this.cartItemData.emit(JSON.parse(storeCart));
    }
    else{
      cartData=JSON.parse(localCart); 
      cartData.push(data);
      storeCart=JSON.stringify(cartData);
      localStorage.setItem('localCart',JSON.stringify(cartData));
      this.cartItemData.emit(cartData);
    }
   return;
  }
    this.getCartItem(userId).subscribe((res)=>{ 
      if(res.length == 0){
        storeCart=JSON.stringify([data]);
       // localStorage.setItem('localCart',JSON.stringify([data]));
       
        this.http.post("http://localhost:8080/api/user/userCart",
        {
          'user_id':userId,
          'cart':storeCart
        },{observe:'response'}).subscribe((res)=>{
          this.getProductCart(userId).subscribe((res)=>{ 
            this.cartItemData.emit(res);
             
         });;
        })

      }else{
        cartData=res; console.log(res);

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
    data1.push(data);
    
        
        storeCart=JSON.stringify(data1);
       // localStorage.setItem('localCart',storeCart);
        this.http.put("http://localhost:8080/api/user/updateUserCart",
        {
          'user_id':userId,
          'cart':storeCart
        },{observe:'response'}).subscribe((res)=>{
          this.getProductCart(userId).subscribe((res)=>{ 
            this.cartItemData.emit(res);
             
         });;
        })
      }
      

      
    
    });



    // if(!localCart){
    //   storeCart=JSON.stringify([data]);
    //  localStorage.setItem('localCart',JSON.stringify([data]));
    // }
    // else{
    //   cartData=JSON.parse(localCart); 
    //   cartData.push(data);
    //   storeCart=JSON.stringify(cartData);
    //   localStorage.setItem('localCart',JSON.stringify(cartData));
    // }
    
    // this.http.post("http://localhost:8080/api/user/userCart",
    // {
    //   'user_id':1,
    //   'cart':storeCart
    // },{observe:'response'}).subscribe((res)=>{
    //   this.getCartItem(1).subscribe((res)=>{ 
    //     this.cartItemData.emit(res);
         
    //  });;
    // })
    
  }
  getLocalDataLength(){
    let localCart=localStorage.getItem('localCart'); 
    if(localCart){
      return localCart && JSON.parse(localCart).length;
    }else{
      return null;
    }
     
  }
  getLocalData(){
    let localCart=localStorage.getItem('localCart'); 
    if(localCart){
      return  JSON.parse(localCart);
    }else{
      return null;
    }
     
  }
}
