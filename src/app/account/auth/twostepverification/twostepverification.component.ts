import { Component, ElementRef, OnInit, ViewChild,Renderer2, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { event } from 'jquery';
import { NgOtpInputComponent } from 'ng-otp-input';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { AuthorizationService } from 'src/app/athorization.service';

@Component({
  selector: 'app-twostepverification',
  templateUrl: './twostepverification.component.html',
  styleUrls: ['./twostepverification.component.scss']
})

/**
 * Two Step Verification Component
 */
export class TwostepverificationComponent implements OnInit {

  // set the currenr year
  year: number = new Date().getFullYear();
  // Carousel navigation arrow show
  showNavigationArrows: any;
  verifyOTPForm!:FormGroup;
  /**
   * Confirm Otp Verification
   */
  config = {
    allowNumbersOnly: true,
    length:6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '40px',
      'height': '40px',
    }
  };
  otpFormControl= new FormControl()
  otp:any = null;
  emailShow: any;

  
  
  @ViewChild(NgOtpInputComponent, { static: false}) ngOtpInput:NgOtpInputComponent | undefined;
  constructor(private authService:AuthorizationService,private toastr:ToastrService,
    private router:Router) { }
   
  ngOnInit(): void {
    let email = null;
    let e:any=sessionStorage.getItem('email');
     email = JSON.parse(e);
    if(email == null){
      this.router.navigate(['login'])
    }
   window.scrollTo(0,250);

     
      this.emailShow = email
   
  }
 
  onOtpChange(event:any){
    if(event.length == 6){
      this.otp = event
      console.log(this.otp)
    }
    else{
      this.otp = null;
    }
  }

  verifyOtp(){
    if(this.otp != null && this.otp.length == 6){
      let e:any=sessionStorage.getItem('email');
      let email = JSON.parse(e);
        this.authService.verify_Otp({'otp':this.otp,'email':email}).subscribe((data:any)=>{
          if(data.status == '200'){
            this.toastr.success("OTP has been verified successfully");
            this.router.navigate(['create-pass']);
          }
          else{
            this.toastr.error('Please enter valid OTP');
          }
        })
        
    }
    else{
      this.toastr.error('Please enter valid OTP');
    }

  }

  resend_otp(){
    let e:any = sessionStorage.getItem('email');
    let email = JSON.parse(e);
    let data:any = {'email':email}
    this.authService.forgot_password(data).subscribe((res:any)=>{ 
      if(res.status == '200'){
        this.ngOtpInput?.setValue('')
        this.toastr.success("OTP has been sent successfully")
      }
    })
  }

  


}

