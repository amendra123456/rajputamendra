import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data-types';
import { UserService } from '../user.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  productDetail: undefined | Product;
  productCount: number = 1;
  removeCart = false;
  constructor(private router: ActivatedRoute, private product: ProductService, private user :UserService) { }
  ngOnInit() {
    let userId= this.user.checkUserLoggedIn();
    let productId = this.router.snapshot.paramMap.get('productId');
    console.log(productId);
    productId && this.product.getItemDetail(productId).subscribe((res) => {

      this.productDetail = res;
      if(userId!=null){
      productId && this.product.getProductCart(userId).subscribe((res) => {
        if (res) {console.log(res);
          let item = res;
          item = item.filter((items) => productId == items.id);
          console.log(item);
          if (item.length) {
            this.removeCart = true;
          } else {
            this.removeCart = false;
          }
        }
      });;
    }else{
      let item =localStorage.getItem('localCart');  
      let items= item && JSON.parse(item);    
    
      items = items && items.filter((items:Product) => productId == items.id.toString());
         
          if (items?.length) {
            this.removeCart = true;
          } else {
            this.removeCart = false;
          }
    } 
    })

  }
  handelQuantity(val: string) {
    if (this.productCount < 20 && val === "plus") {
      this.productCount += 1;
    } else if (this.productCount > 1 && val === "min") {
      this.productCount -= 1;
    }
  }
  addToCart() {
   
    if (this.productDetail) {
      this.productDetail.quantity = this.productCount;
      //  console.warn(this.productDetail.quantity);
      if (!localStorage.getItem('user')) {
        this.product.localAddToCart(this.productDetail);
      } else {
        
        
       
        this.product.localAddToCart(this.productDetail);
      }
      this.removeCart = true;
    }
  }
  removeToCart(id: number) {
    let storeCart;
    let productId = this.router.snapshot.paramMap.get('productId');
    let userId= this.user.checkUserLoggedIn();
    let item =localStorage.getItem('localCart');  
     
      if(userId!=null){
        productId && this.product.getProductCart(userId).subscribe((res) => {
          if (res) {
            let item = res;
            item = item.filter((items) => productId != items.id);
            console.log(item);
            this.removeCart = false;
            //this.product.AddToCart(item);
            storeCart = JSON.stringify(item);
            localStorage.setItem('localCart', storeCart);
            this.product.updateUserCart(item, userId)
    
    
          }
        });;
      }else{
        let items= item && JSON.parse(item);    
    
      items = items.filter((items:Product) => productId != items.id.toString());

      this.removeCart = false;
      //this.product.AddToCart(item);
      storeCart = JSON.stringify(items);
      localStorage.setItem('localCart', storeCart);
      this.product.cartItemData.emit(items);
      }
    
  }
}




