import { Component,OnInit } from '@angular/core';
import { RootPageService } from '../../root-page.service';

@Component({
  selector: 'app-notification-detail',
  templateUrl: './notification-detail.component.html',
  styleUrls: ['./notification-detail.component.scss']
})
export class NotificationDetailComponent implements OnInit{
  AlarmNotificationData:any=[];

  constructor(
        private rootPageService: RootPageService
){}

showHtml : boolean = false;
ngOnInit(): void {
  this.viewAllNotification()
}

viewAllNotification(){
return this.rootPageService.alarmNotificationList().subscribe((data: any) => {
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
      this.AlarmNotificationData = data.data;
      console.log("JYOTI NOTIFICATION DATA>>>>>", this.AlarmNotificationData );
      this.showHtml = true;
    //  this.viewMoreBtn = false;
     //console.log("data>>>>>>>>>>>>>>>",this.AlarmNotificationData);
     // this._cd.detectChanges();
    })

  }
}
