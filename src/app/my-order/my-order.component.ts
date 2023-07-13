import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { order } from '../data-types';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.scss']
})
export class MyOrderComponent {
  getMyOrder:order[]|undefined;
constructor(private product: ProductService){}
ngOnInit(){
  this.product.getMyOrder().subscribe((res)=>{
    this.getMyOrder=res;
  })
}
}
