import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cartData, priceSummary } from '../data-types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent {
  cartData: cartData[] | undefined;
  priceSummary: priceSummary = {
    price: 0,
    total: 0,
    delivery: 0,
    tax: 0,
    discount: 0
  }
  constructor(private product: ProductService,  private route: Router) { }
  ngOnInit() {

    let userData = localStorage.getItem('user');
    let userId = userData && JSON.parse(userData).id;
    this.product.getCartItem(userId).subscribe((res) => {
      let data1 = [];
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

      this.cartData = data1;
      let price = 0;
      this.cartData.forEach((items) => {
        if (items.quantity) {
          price = price + (+items.price * items.quantity);
        }

      })
      this.priceSummary.price = price;
      this.priceSummary.delivery = 100;
      this.priceSummary.tax = price / 10;
      this.priceSummary.discount = price / 10;
      this.priceSummary.total = this.priceSummary.price + this.priceSummary.tax - this.priceSummary.discount + this.priceSummary.delivery;
      console.log(price);
    });
  }
  checkout(){
   this. route.navigate(['checkout']);
  }
}
