import { Component,ChangeDetectorRef, OnInit, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { EventService } from '../../core/services/event.service';
import { LanguageService } from '../../core/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../core/services/authfake.service';

import { LAYOUT_MODE } from "../layouts.model";
import { AuthorizationService } from 'src/app/athorization.service';
import { RootPageService } from '../../pages/root-page.service';


@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})

/**
 * Topbar Component
 */

export class TopbarComponent implements OnInit {

  mode: string | undefined;
  element: any;
  flagvalue: any;
  cookieValue: any;
  countryName: any;
  valueset: any;
  alarmCount: any;
  AlarmNotificationData:any=[];
  countingNotification: any = 0;
  viewMoreBtn:boolean=true;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private authFackservice: AuthfakeauthenticationService,
    public languageService: LanguageService,
    public _cookiesService: CookieService,
    public translate: TranslateService,
    private eventService: EventService,
    private authrizwService : AuthorizationService,
    private rootPageService: RootPageService,
    private _cd: ChangeDetectorRef
  ) { }

  /**
   * Language Listing
   */
  listLang = [
    { text: 'UK English', flag: 'assets/images/flags/english.jpg', lang: 'en' },
    // { text: 'Spanish', flag: 'assets/images/flags/spain.jpg', lang: 'es' },
    // { text: 'German', flag: 'assets/images/flags/germany.jpg', lang: 'de' },
    // { text: 'Italian', flag: 'assets/images/flags/italy.jpg', lang: 'it' },
    // { text: 'Russian', flag: 'assets/images/flags/russia.jpg', lang: 'ru' },
  ];

  @Output() settingsButtonClicked = new EventEmitter();
  @Output() mobileMenuButtonClicked = new EventEmitter();

  layoutMode!: string;

  imageUrl :any = ""
  userFullName : any = ""
  ngOnInit(): void {
    this.layoutMode = LAYOUT_MODE;

    this.element = document.documentElement;
    // Cookies wise Language set
    this.cookieValue = this._cookiesService.get('lang');
    const val = this.listLang.filter(x => x.lang === this.cookieValue);
    this.countryName = val.map(element => element.text);
    if (val.length === 0) {
      if (this.flagvalue === undefined) { this.valueset = 'assets/images/flags/english.jpg'; }
    } else {
      this.flagvalue = val.map(element => element.flag);
    }

    this.authrizwService.userInfo$.subscribe((res:any)=>{
      if(res){
        console.log("res",res);
        if(res.imageUrl){
          this.imageUrl = res.imageUrl;
        }else{
          this.imageUrl = "assets/images/users/user-avatar.png";
        }
        this.userFullName = res.firstName +" "+res.lastName;
        // assets/images/users/avatar-1.jpg
      }      


      this.countNotification()
    },(error:any)=>{
      console.log("error",error)
    })
    this.loadAlarmNotificationData()
  }

  /**
   * Language Value Set
   */
  setLanguage(text: string, lang: string, flag: string) {
    this.countryName = text;
    this.flagvalue = flag;
    this.cookieValue = lang;
    this.languageService.setLanguage(lang);
  }

  /**
   * Topbar Light-Dark Mode Change
   */
  changeMode(mode: string) {
    this.layoutMode = mode;
    this.mode = mode;
    this.eventService.broadcast('changeMode', mode);
  }

  /**
   * Toggle the menu bar when having mobile screen
   */
  toggleMobileMenu(event: any) {
    event.preventDefault();
    this.mobileMenuButtonClicked.emit();
  }

  /**
   * Toggles the right sidebar
   */
  toggleRightSidebar() {
    this.settingsButtonClicked.emit();
  }

  /**
   * Logout the user
   */
  logout() {
      sessionStorage.removeItem("userInfo");
      sessionStorage.removeItem("campaignData")
      sessionStorage.removeItem("basicData")
      sessionStorage.removeItem("lastEmittedObj")
      sessionStorage.removeItem("clientId")
      sessionStorage.removeItem("roles")

    if (environment.defaultauth === 'firebase') {
      this.authService.logout();
      this.authrizwService.userInfo$.next(null)
    } else {
      this.authFackservice.logout();
      this.authrizwService.userInfo$.next(null)

      
    }
    this.router.navigate(['/account/login']);
  }

  loadAlarmNotificationData(){
    this.rootPageService.alarmNotificationList().subscribe((data: any) => {
      let currentDate = new Date();
      let timeValue;
      let timeKey;
      for(let i=0;i<data.data.length;i++){
        let preDate = new Date(data.data[i].submittedOn);
        let diff = currentDate.getTime() - preDate.getTime(); 
        let yeardiff = diff / (1000 * 60 * 60 * 24*365);
        let monthdiff = diff / (1000 * 60 * 60 * 24*30);
        let weekdiff = diff / (1000 * 60 * 60 * 24*7);  
        let daydiff = diff / (1000 * 60 * 60 * 24);
        let hourdiff = diff / (1000 * 60*60); 
        let minutediff = diff / (1000 * 60); 
        let seconddiff = diff / (1000); 

       let year=parseInt(yeardiff.toString().split(".")[0]);
       let month=parseInt(monthdiff.toString().split(".")[0]);
       let week=parseInt(weekdiff.toString().split(".")[0]);
       let day=parseInt(daydiff.toString().split(".")[0]);
       let hour=parseInt(hourdiff.toString().split(".")[0]);
       let minute=parseInt(minutediff.toString().split(".")[0]);
      let second=parseInt(seconddiff.toString().split(".")[0]);

      if(year > 0){
        timeValue = year;
      timeKey="year" 
    }
    else if(month>0){
       timeValue = month;
      timeKey="month" 
    }
    else if(week>0){
        timeValue = week;
      timeKey="week" 
    }
    else if (day > 0) {
      timeValue = day;
      timeKey="day"
    } else if (hour > 0) {
      timeValue = hour;
      timeKey="hour"
    } else if(minute > 0){
      timeValue = minute;
      timeKey="minute"
    }else if(second > 0){
      timeValue = second;
       timeKey="second"
    }
    data.data[i].timeKey=timeKey
    data.data[i].timeValue=timeValue

      }
      if(data.data.length>20){
        this.AlarmNotificationData= data.data.slice(0, 20);
      }else{
        this.AlarmNotificationData = data.data;
        this.viewMoreBtn = false;
      }
      this._cd.detectChanges();
    })

  }
  readNotification(){
    const list:any = document.getElementById('notification-dropdown');
    list.classList.remove('close')
    return  this.rootPageService.updateAlarmNotificationList().subscribe((data:any)=>{
      if(data.status == 200){
        this.countingNotification = 0;
        this.loadAlarmNotificationData()
      }
      this._cd.detectChanges();
     
    })

  }

  countNotification(){
    return  this.rootPageService.getCountOfNotification().subscribe((data:any)=>{
      if(data.status == 200){
        // this.countingNotification = 0;
        //this.loadAlarmNotificationData()
       if(data.data.length>0){
        this.countingNotification = data.data.length;
        }else{
          this.countingNotification = 0;

        }
      }
      this._cd.detectChanges();
     
    })

  }

  viewAllNotification(){
    const list:any = document.getElementById('notification-dropdown');
    list.classList.add('close');

    this.router.navigate(['dashboard/notification-detail'])

   /*return this.rootPageService.alarmNotificationList().subscribe((data: any) => {
      let currentDate = new Date();
      let timeValue;
      let timeKey;
      for(let i=0;i<data.data.length;i++){
        let preDate = new Date(data.data[i].submittedOn);
        let diff = currentDate.getTime() - preDate.getTime(); 
        let yeardiff = diff / (1000 * 60 * 60 * 24*365);
        let monthdiff = diff / (1000 * co0 * 60 * 24*30);
        let weekdiff = diff / (1000 * 60 * 60 * 24*7);  
        let daydiff = diff / (1000 * 60 * 60 * 24);
        let hourdiff = diff / (1000 * 60*60); 
        let minutediff = diff / (1000 * 60); 
        let seconddiff = diff / (1000); 

       let year=parseInt(yeardiff.toString().split(".")[0]);
       let month=parseInt(monthdiff.toString().split(".")[0]);
       let week=parseInt(weekdiff.toString().split(".")[0]);
       let day=parseInt(daydiff.toString().split(".")[0]);
       let hour=parseInt(hourdiff.toString().split(".")[0]);
       let minute=parseInt(minutediff.toString().split(".")[0]);
      let second=parseInt(seconddiff.toString().split(".")[0]);

      if(year > 0){
        timeValue = year;
      timeKey="year" 
    }
    else if(month>0){
       timeValue = month;
      timeKey="month" 
    }
    else if(week>0){
        timeValue = week;
      timeKey="week" 
    }
    else if (day > 0) {
      timeValue = day;
      timeKey="day"
    } else if (hour > 0) {
      timeValue = hour;
      timeKey="hour"
    } else if(minute > 0){
      timeValue = minute;
      timeKey="minute"
    }else if(second > 0){
      timeValue = second;
       timeKey="second"
    }
    data.data[i].timeKey=timeKey
    data.data[i].timeValue=timeValue

      }
      this.AlarmNotificationData = data.data;
      this.viewMoreBtn = false;
     //console.log("data>>>>>>>>>>>>>>>",this.AlarmNotificationData);
      this._cd.detectChanges();
    })*/

  }

}
