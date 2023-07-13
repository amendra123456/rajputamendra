import { Component } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router'
import { userLogin, userSignUp } from '../data-types';
@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.scss']
})
export class SellerAuthComponent {
  showLogin = false;
  authError: string = '';
  constructor(private _seller: SellerService, private router: Router) { }
  ngOnInit() {
    this._seller.reloadSeller();
  }
  signUp(formValue: userSignUp): void {
    console.log(formValue);
    this._seller.userSignUp(formValue)
  }

  login(data: userLogin): void {
    this.authError = '';
    this._seller.userLogin(data);
    this._seller.isLoginError.subscribe((isError) => {
      if (isError) {
        this.authError = "Email and password is not match!";
      } else {
        this.authError = '';
      }
    })
  }

  openLogin() {
    this.showLogin = true;
  }
  openSignUp() {
    this.showLogin = false;
  }
}
