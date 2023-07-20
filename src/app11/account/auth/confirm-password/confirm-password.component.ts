import { Component } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationService } from 'src/app/athorization.service';

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.scss']
})
export class ConfirmPasswordComponent {
  year: number = new Date().getFullYear();
  createForm !:UntypedFormGroup;
  submitted:boolean=false;
  showNavigationArrows: any;
  fieldTextType!: boolean;
  fieldTextType1 !:boolean;

  constructor(private formBuilder: UntypedFormBuilder,private authService:AuthorizationService,
    private toastr:ToastrService,private router:Router) { }

  ngOnInit(): void {
    let email = null;
    let e:any=sessionStorage.getItem('email');
     email = JSON.parse(e);
    if(email == null){
      this.router.navigate(['login'])
    }
   window.scrollTo(0,250);
    
    this.createForm = this.formBuilder.group({
      password: ['', [Validators.required,Validators.maxLength(15),Validators.minLength(8)]],
      confirmpassword: ['', [Validators.required,Validators.maxLength(15),Validators.minLength(8)]],
    });
    document.body.setAttribute('data-layout', 'vertical');
  }

  // convenience getter for easy access to form fields
  get f() { return this.createForm.controls; }

  /**
   * Form submit
   */
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.createForm.invalid) {
      this.toastr.error('Please enter valid password')
      return;
    }
    else{
      if(this.createForm.value.password == this.createForm.value.confirmpassword){
        console.log(this.createForm.value);
        let e:any = sessionStorage.getItem('email');
        let email = JSON.parse(e);
        this.authService.set_password({'email':email,'password':this.createForm.value.password})
        .subscribe((data:any)=>{
           if(data.status == '200'){
             console.log(data);
             this.toastr.success("Your password updated successfully")
             this.router.navigate(['login'])
             sessionStorage.removeItem('email')
           }
           else{
            this.toastr.error(data.error);
           }
        })
      }
      else{
        this.toastr.error('Please enter valid password');
      }
    }

  }
  carouselOption: OwlOptions = {
    items: 1,
    loop: false,
    margin: 0,
    nav: false,
    dots: true,
    responsive: {
      680: {
        items: 1
      },
    }
  }

 
  toggleFieldTextType(id:string) {
    if(id == 'password'){
      this.fieldTextType = !this.fieldTextType;
    }
    else{
     this.fieldTextType1 = ! this.fieldTextType1;
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
