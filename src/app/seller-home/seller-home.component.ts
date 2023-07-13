import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../data-types';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.scss']
})
export class SellerHomeComponent {
  productMsg:string|undefined;
productData:undefined | Product[];
  routeSub: any;
constructor(private product:ProductService,private router:Router){}
ngOnInit(){
  this.getList();
  
}
getList(){
  this.product.getList().subscribe((res)=>{
    console.log(res);
    this.productData=res;
    });
}
deleteItem(id:number){
  this.product.deleteItem(id).subscribe((res)=>{
    console.log(res);
    this.productMsg="product deleted succesfully!"
    setTimeout(() => {
      this.productMsg=undefined;
    }, 3000);
    this.getList();
    });
}
updateItem(id:number){
  this.router.navigate(['seller-add-product/'+id]);
  // this.product.getItem(id).subscribe((res)=>{
  //   console.log(res);
    
  //   this.getList();
  //   });
}
}
