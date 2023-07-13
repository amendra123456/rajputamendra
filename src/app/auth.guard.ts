import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { SellerService } from './services/seller.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class authGuard implements CanActivate {
  constructor(public sellerService: SellerService, public router: Router) {}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if(localStorage.getItem('seller')){
      return true;
    }
    return this.sellerService.isSellerLogedIn;
  }
}