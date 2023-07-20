import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from './athorization.service';
import { MfuelService } from './mfuel.service';
import { Router } from '@angular/router';
// import { MfuelExtensionService } from './pages/mfuel-extension.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'M-Fuel';

  constructor(private _authService : AuthorizationService, private _sess : MfuelService,private router:Router){}
  ngOnInit(){
    let _inofAvailable = this._sess.getS('userInfo');
    if(_inofAvailable){
      this._authService.userInfo$.next(JSON.parse(_inofAvailable));
    }  
    else{
      this.router.navigate(['login']);
    }  
  }
}

