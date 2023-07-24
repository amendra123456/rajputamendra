import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { authGuard } from './auth.guard';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserCardComponent } from './users/user-card/user-card.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent   
  },
  {
    path: 'seller-auth',
    component: SellerAuthComponent   
  },
  {
    path: 'seller-home',
    component: SellerHomeComponent,
    canActivate: [authGuard]
  },
  {
    path: 'seller-add-product',
    component: SellerAddProductComponent,
    canActivate: [authGuard]   
  },  
  {
    path: 'seller-add-product/:id',
    component: SellerAddProductComponent,
    canActivate: [authGuard]   
  },
  {
    path: 'search/:query',
    component: SearchComponent
  },
  {
    path: 'user-auth',
    component: UserAuthComponent
  },
  {
    path: 'cart-page',
    component: CartPageComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'details/:productId',
    component: ProductDetailsComponent
  },
  {
    path: 'my-orders',
    component: MyOrderComponent
  }
  ,
  {
    path: '',
    component: UserListComponent,

    children:[{
      path: 'user-list',
      component:UserListComponent,
      canActivate: [authGuard]
    },
    {
      path: 'user-card/:id',
      component:UserCardComponent,
      canActivate: [authGuard]
    },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
