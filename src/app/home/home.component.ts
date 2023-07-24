import { Component } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../services/product.service';
import { Product } from '../data-types';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  imageProductData:Product[] | undefined;
  trendyProductData:Product[] | undefined;
  removeCart = false;
  constructor(private product:ProductService){}
  ngOnInit(){
    this.product.getPopularProduct().subscribe((res)=>{
    this.imageProductData=res;
    });
    this.product.getTrendyProduct().subscribe((res)=>{
     this.trendyProductData=res;
    });
  }
  addToCart(product:Product){
    product.quantity = 1;
  console.log(product);
  if (product) {
    product.quantity = 1;
    //  console.warn(this.productDetail.quantity);
    if (!localStorage.getItem('user')) {
      this.product.localAddToCart(product);
    } else {
      this.product.localAddToCart(product);
    }
    this.removeCart = true;
  }
  }
  
}
