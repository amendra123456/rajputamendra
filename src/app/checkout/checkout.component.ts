import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { order } from '../data-types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent  {
  totalPrice:number|undefined;
  userId:number|undefined;  
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
    'price': 0
  };

   /// console.log(order.email);return;
  this.product.orderItem(orderData).subscribe((res)=>{
    console.log(res);
    this.route.navigate(['my-order']);
  })
  }
}
