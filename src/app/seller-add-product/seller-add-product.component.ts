import { Component } from '@angular/core';
import { Product } from '../data-types';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.scss']
})
export class SellerAddProductComponent {
  productMsg: string | undefined;
  editProduct: Product | undefined;
  isEdit: boolean = false;
  productId:number | undefined;
  constructor(private _product: ProductService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit() {
    this.productId = this.route.snapshot.params['id'];
    
    this.productId && this.getProduct(this.productId);
  }
  getProduct(productId: number) {
    productId && this._product.getItem(productId).subscribe((res) => {
      console.log(res);
      this.editProduct = res;
      this.isEdit = true;
    });
  }


  addProduct(data: Product) {
    if (this.isEdit) {
      this.productId && this._product.editProduct(this.productId,data).subscribe((res) => {
        this.productMsg = "product is successfully Edited!";
        setTimeout(() => {
          this.router.navigate(['seller-home']);
        }, 3000);
       
      });
    } else {
      this._product.addProduct(data).subscribe((res) => {
        this.productMsg = "product is successfully added!";
        setTimeout(() => {
          this.productMsg = undefined;
        }, 3000);
        // this.router.navigate(['product-list']);
      });
    }
  }
}
