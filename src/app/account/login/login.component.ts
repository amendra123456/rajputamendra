import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { MfuelService } from "../../mfuel.service"

import { AuthenticationService } from '../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../core/services/authfake.service';
import { environment } from '../../../environments/environment';
import { LAYOUT_MODE } from '../../layouts/layouts.model';
import { AuthorizationService } from "../../athorization.service"
import { RootPageService } from "../../pages/root-page.service"
import { ToastrService } from 'ngx-toastr';
import { dE } from '@fullcalendar/core/internal-common';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Login Component
 */
export class LoginComponent implements OnInit {

  // set the currenr year
  year: number = new Date().getFullYear();
  // Carousel navigation arrow show
  showNavigationArrows: any;
  loginForm!: UntypedFormGroup;
  submitted = false;
  error = '';
  returnUrl!: string;
  layout_mode!: string;
  fieldTextType!: boolean;
  is_forgot_pass_show : boolean =false;

  constructor(private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private authFackservice: AuthfakeauthenticationService,
    private _sess: MfuelService,
    private _authService: AuthorizationService,
    private _root: RootPageService,
    private _toastr: ToastrService
  ) {
    // redirect to home if already logged in

    // if (this._sess.getS("userInfo")) {
    //   this.router.navigate(['dashboard']);
    // } else {
    //   this._authService.userInfo$.subscribe((res: any) => {
    //     if (res) {
    //       this.router.navigate(['dashboard']);
    //     } else {
    //       //
    //     }
    //   })
    // }
  }

  ngOnInit(): void {
    this.layout_mode = LAYOUT_MODE
    if (this.layout_mode === 'dark') {
      document.body.setAttribute("data-layout-mode", "dark");
    }
    //Validation Set
    this.loginForm = this.formBuilder.group({
      //admin@themesbrand.com
      //123456
      email: ['', [Validators.required, Validators.email,]],
      password: ['', [Validators.required]],
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    document.body.setAttribute('data-layout', 'vertical');



  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      this._toastr.error("Please enter valid credentials !!")
      return;
    } else {
      if (environment.defaultauth === 'firebase') {
        this.authenticationService.login(this.f.email.value, this.f.password.value).then((res: any) => {
          // this.router.navigate(['dashboard']);
        })
          .catch(error => {
            this.error = error ? error : '';
          });
      } else {
        this.authFackservice.login(this.f.email.value, this.f.password.value)
          .pipe(first())
          .subscribe(
            (res: any) => {
              if (res && res.status == "200") {
                // console.log(">>>>>>>>>>>>",data)
                sessionStorage.setItem("clientId", JSON.stringify(res.data.clientId))
                this._sess.setS('userInfo', JSON.stringify(res.data));
                this._authService.userInfo$.next(res.data);
                this.getUserInfo(res.data);

              }
              else {
                this._toastr.error("Please enter valid credentials !!");
                this.is_forgot_pass_show=true
              }

            },
            (error: any) => {
              console.log(">>>>>>>>>>>>", "data")
              this.error = error ? error : '';
              this._toastr.error("Please enter valid credentials !!")
            });
      }
    }
  }

  /**
   * Password Hide/Show
   */
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }


  getUserInfo = (data: any = {}) => {
    this._root.showDataOfUser(data.id).subscribe((res: any) => {
      console.log(">>>>>>", data.id);
      console.log(">>>>>>>", res);
      if (res.status == "200") {
        let _d = res.data;
        this._sess.setS("roles", JSON.stringify(_d.roles[0].resource));
        this.router.navigate(['dashboard']);

      }

    }, (error: any) => {
    })
  }
  keydown(e:any){
    if (e.keyCode == 32){
      
      return false;
    }
    else{
      console.log(e)
      return true;
    }
  }

}