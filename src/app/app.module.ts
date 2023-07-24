import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SearchComponent } from './search/search.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserCardComponent } from './users/user-card/user-card.component';
import { StoreModule } from '@ngrx/store';
import { rootReducer } from 'src/app/reducers';
import { EcomUtility } from './Repository/ecom-utility';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CartPageComponent,
    CheckoutComponent,
    HomeComponent,
    MyOrderComponent,
    ProductDetailsComponent,
    SearchComponent,
    SellerAddProductComponent,
    SellerAuthComponent,
    SellerHomeComponent,
    UserAuthComponent,
    MyOrdersComponent,
    UserListComponent,
    UserCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,    
    NgbModule,
    StoreModule.forRoot(rootReducer)
   
  ],
  providers: [EcomUtility],
  bootstrap: [AppComponent]
})
export class AppModule { }
