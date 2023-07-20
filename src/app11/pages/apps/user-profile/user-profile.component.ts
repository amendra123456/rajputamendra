import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MfuelService } from 'src/app/mfuel.service';
import { RootPageService } from '../../root-page.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})

/**
 * User Profile Component
 */
export class UserProfileComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  userInfo: any = {};
  userImage: any;

  constructor(private _rootService : RootPageService, private _sess : MfuelService, private _cd : ChangeDetectorRef) { }

  ngOnInit(): void {
    /**
     * BreadCrumb Set
     */
    // this.breadCrumbItems = [
    //   { label: 'Contacts' },
    //   { label: 'Profile', active: true }
    // ];

    if(this._sess.getS('userInfo')){
      //console.log(JSON.parse(this._sess.getS('userInfo') || '{}'));
       let _userId = JSON.parse(this._sess.getS('userInfo') || '{}');
       this.getUserProfileData(_userId.id);
    }else{
      console.log("")
    } 
  }


  getUserProfileData = (userId:any) => {
    this._rootService.showDataOfUser(userId).subscribe((res:any)=>{
      console.log("res",res);
      if(res.status=="200"){
        this.userInfo = res.data;
        this.userImage = res.data['imageUrl']?res.data['imageUrl'] : 'assets/images/users/user-avatar.png'
        console.log('this.userInfo ', this.userInfo);
        this._cd.detectChanges();
      }else{

      }
    },(error:any)=>{
      console.log("error",error);
    })
  }
}
