import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { MfuelExtensionService } from "./pages/mfuel-extension.service";
import { RootPageService } from "./pages/root-page.service";
@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  //base_url1: string = "https://javastaing.encashoffers.com/api/";
  
  constructor(private http: MfuelExtensionService, private _rootPge : RootPageService) { }

  userInfo$ : any =  new BehaviorSubject({});

  forgot_password(data:any){
   return this.http.s_post(this._rootPge.base_url1+'mfuelForgetPassword',data);
  }
  verify_Otp(data:any){
   return this.http.s_post(this._rootPge.base_url1+'mfuelForgetPasswordVerify',data)
  }
  set_password(data:any){
    return this.http.s_post(this._rootPge.base_url1+'mfuelSetPassword',data)
  }

}