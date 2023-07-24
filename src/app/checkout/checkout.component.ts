import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, order } from '../data-types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent  {
  totalPrice:number|undefined;
  userId:number|undefined; 
  cartData:cart[]|undefined; 
  orderMsg:string="";
  constructor(private product: ProductService, private route: Router){}
  ngOnInit(){
    let userData = localStorage.getItem('user');
    let userId = userData && JSON.parse(userData).id;
    this.product.getCartItem(userId).subscribe((res) => {
      let data1 = [];
      let price=0;
      for (var key in res) {
        if (res.hasOwnProperty(key)) {
          var products = JSON.parse(res[key].cart);
          let ii = JSON.parse(products);
          for (let i = 0; i < ii.length; i++) {
            let obj = ii[i];//console.log(obj);
            data1.push(obj);
            //  console.log(obj);
          }
          // console.log("Cart: ", cart); break;
        }
        //console.log(data);
      }

    
      data1.forEach((items) => {
        if (items.quantity) {
          price = price + (+items.price * items.quantity);
        }
  
      });
      this.cartData=data1;
      console.log(data1);
      this.totalPrice=price;
    });
    this.userId=userId;
  }
  
  orderNow(order:order){
  let orderData:order={
    'user_id': this.userId,
    'email': order.email,
    'address': order.address,
    'contact': order.contact,
    'total_price': this.totalPrice,
    'cart':this.cartData,
    'price': 0
  };
  let userData = localStorage.getItem('user');
  let userId = userData && JSON.parse(userData).id;
  this.product.deleteUserCart(userId);
   /// console.log(order.email);return;q
   userId && this.product.orderItem(orderData).subscribe((res)=>{
    console.log(res);
    this.orderMsg="order placed sucessfully!"
    // this.cartData?.forEach((item: any)=>{
    //   return item.id && this.product.deleteCartItem(item.id);
    // })
    setTimeout(() => {
      this.route.navigate(['my-orders']);
    }, 5000);
  })
  
  }
}
