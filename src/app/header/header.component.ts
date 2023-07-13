import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data-types';
import { UserService } from '../user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  sellerName: string = '';
  searchItems: undefined | Product[];
  menuType: string = 'default';
  userName: string = '';
  cartData:number|undefined=0;
  cartItems:number |undefined;
  constructor(private router: Router, private product: ProductService,private user:UserService) { }

  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem("seller") && val.url.includes("seller")) {
          this.menuType = "seller";
          if (localStorage.getItem("seller")) {
            let sellerStore = localStorage.getItem("seller");
            let sellerData = sellerStore && JSON.parse(sellerStore);
            this.sellerName = sellerData.name;
          } 
        } else if (localStorage.getItem("user")) {
          let userStore = localStorage.getItem("user");
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          this.menuType = "user";
        }else {
          this.menuType = "default";

        }
      }
    })
    let userId= this.user.checkUserLoggedIn();
    if(userId!=null){
      this.product.getProductCart(userId).subscribe((res)=>{
        if (res?.length>0) {
        this.cartItems= res.length;
        }
       });;
    }else{
      
      let localCart=this.product.getLocalDataLength();
      this.cartItems= localCart?localCart:"";
    }
    
    this.product.cartItemData.subscribe((res)=>{
      this.cartItems= res?.length;
      this.checkCartData();
    })
    
  }

  logout() {
    localStorage.removeItem('seller');
    this.router.navigate(['home']);
    this.checkCartData();
  }
  searchProduct(data: KeyboardEvent) {
    if (data) {
      const element = data.target as HTMLInputElement;
      //console.warn(element.value);
      this.product.getProductSearch(element.value).subscribe((res) => {
        this.searchItems = res;
      });
    }
  }
  searchByName(val: string) {
    console.warn(val);
    this.router.navigate(['search/' + val]);
  }
  hidesearch() {
    this.searchItems = undefined;
  }
  redirectToDetail(id: number) {
    this.router.navigate(['details/' + id]);
  }
  userLogout(){
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
  checkCartData(){
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
    }, 10);
  }
}
