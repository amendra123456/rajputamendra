import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { AuthorizationService } from 'src/app/athorization.service';

@Component({
  selector: 'app-recoverpwd',
  templateUrl: './recoverpwd.component.html',
  styleUrls: ['./recoverpwd.component.scss']
})

/**
 * Recover Password Component
 */
export class RecoverpwdComponent implements OnInit {

  resetForm!: UntypedFormGroup;
  submitted = false;
  error = '';
  success = '';
  loading = false;

  // set the currenr year
  year: number = new Date().getFullYear();
  // Carousel navigation arrow show
  showNavigationArrows: any;
  $is_email_valid = new BehaviorSubject(false);

  
  constructor(private formBuilder: UntypedFormBuilder, private authService:AuthorizationService,
    private toastr:ToastrService,private router:Router) { }

  ngOnInit(): void {
    /**
     * Form Validation
     */
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.resetForm.controls; }

  /**
   * On submit form
   */
  onSubmit() {
    this.success = '';
    this.submitted = true;
    // stop here if form is invalid
    if (this.resetForm.invalid) {
      return;
    }
    else{
      console.log(this.resetForm.value);
      this.authService.forgot_password(this.resetForm.value).subscribe((data:any)=>{
        console.log(data);
        if(data.status == '200'){
           this.toastr.success('OTP has been sent to your email successfully');
           this.submitted =false;
           sessionStorage.setItem('email',JSON.stringify(this.resetForm.value.email))
           this.resetForm.reset();
           this.router.navigate(['verification'])
        }
        
      })
    }
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
