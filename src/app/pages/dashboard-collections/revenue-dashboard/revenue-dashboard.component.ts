import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { RootPageService } from '../../root-page.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Chart } from 'angular-highcharts';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-revenue-dashboard',
  templateUrl: './revenue-dashboard.component.html',
  styleUrls: ['./revenue-dashboard.component.scss']
})
export class RevenueDashboardComponent implements OnInit {
  role:any;
  showClientDropdown:boolean = false;
  selectedClient:any = null
  clientList:any;
  isCampaignShow:any;
  getCampaignList:any=[]

  planChart: any;
  _seriesData: any = [];
  requested_date:any;
  selectedCampaign:any;

  first_radio_Check:boolean=false;
  totalMonthForFilter :any = [];
  totalYearForFilter: any = [];
  yearlySelectedList: any;
  monthlySelectedList: any;
  showHtmlChart:boolean=true
  _d:any=""
  today_revenue_check :boolean = true;
  selectedDay:any = 'today';

  constructor(private router: Router, private rootPageService: RootPageService, private _ngZone: NgZone, private _cd: ChangeDetectorRef, private _date: DatePipe) { }

  ngOnInit(): void {
    this.yearlySelectedList = "null";
    this.monthlySelectedList = "null";

    this.totalMonthForFilter = [
      {
        key : "01",
        value : "Jan"
      },
      {
        key : "02",
        value : "Feb"
      },
      {
        key : "03",
        value : "Mar"
      },
      {
        key : "04",
        value : "Apr"
      },
      {
        key : "05",
        value : "May"
      },
      {
        key : "06",
        value : "Jun"
      },
      {
        key : "07",
        value : "Jul"
      },{
        key : "08",
        value : "Aug"
      },{
        key : "09",
        value : "Sep"
      },{
        key : "10",
        value : "Oct"
      },{
        key : "11",
        value : "Nov"
      },{
        key : "12",
        value : "Dec"
      }
    ];

    let currentYear :any = this._date.transform(new Date(), "yyyy");

    for(let _i = parseInt(currentYear); _i >  2017; _i-- ){
      this.totalYearForFilter.push(_i);
    }
    this.toggleUserAsPerRole();
    // this.getRevenue('total');

  }

 
  
  toggleUserAsPerRole() {
    let role: any = sessionStorage.getItem('roles')
    this.role = JSON.parse(role);
    if (this.role == "SSN") {
      this.getRevenue('today');
      // this.loadIntialData()  // loading intial data for ssn user without having any client id
      // this.getClientListData();
      // this.showClientDropdown = true;
    }
    else {
      let clientId: any = sessionStorage.getItem('clientId')
      this.selectedClient = JSON.parse(clientId)
      this.getRevenue('today');
      // this.getSelectClient()
      //pending we have to call intial data based on the client id for ybc user..
    }
    this._cd.detectChanges()
  }

  getClientListData() {
    this.rootPageService.getClientsList().subscribe((data: any) => {
      // if(data.status == 200){
      this.clientList = data.Client_Data;

      // }
      // this.loadIntialData()

      this._cd.detectChanges()
    })
  }

 

  getSelectClient() {

    this.isCampaignShow = true
    console.log(this.selectedClient);
    this.getCampaignList = [];
    this.rootPageService.getClientCampignList(this.selectedClient).subscribe((data: any) => {

      // console.log(this.getCampaignList)
      if (data.Campaign_Data.length > 0) {
        this.getCampaignList = data.Campaign_Data;
        // this.showHtml = true;
        this.isCampaignShow = true;
        // this.campaignID = this.getCampaignList.find((x: any) => x.partnerId == this.selectedClient)?._id;
      }
      // else {
      //    alert("No data found !! ");
      //    this.selectedCampaign = 'null';
      // }
      // this.getTotalData(this.selectedClient, this.selectedCampaign);
      //this.getMonthlyData(this.selectedClient, this.selectedCampaign);
     // this.getDailyData(this.selectedClient, this.selectedCampaign);
      this._cd.detectChanges();
    },(error:any)=>{

    })
  }

  getRevenue = (type: any) => {
    console.log("type", type);
    if (type == "yesterday") {
      this.monthlySelectedList="null"
      this.yearlySelectedList ="null"
      this.today_revenue_check = false
      this.first_radio_Check = true;
      this._d = this._date.transform(new Date().setDate(new Date().getDate() - 1), "yyyy-MM-dd");
      console.log(this._d);
      if(this.selectedClient != null){ this._d +=`&clientId=${this.selectedClient}` }
      
      sessionStorage.setItem("revenue_params",this._d)
      sessionStorage.setItem("key_params",'day')

      this.rootPageService.getRevenuData('YBC', '&day=' + this._d).subscribe((res: any) => {
        if (res.status == "200") {
          console.log("res.data", res.data);
          this.getRevnueData(res.data)
        } else {
          console.log("res.data", res.data);
          this.getRevnueData([])
        }
      }, (error: any) => {
        console.log(error);
      });
    }
    else if(type == "today"){
      this.monthlySelectedList="null"
      this.yearlySelectedList ="null"
      this.first_radio_Check = false;
      this.today_revenue_check = true
      this._d = this._date.transform(new Date().setDate(new Date().getDate()), "yyyy-MM-dd");
      console.log(this._d);
      if(this.selectedClient != null){ this._d +=`&clientId=${this.selectedClient}` }
      
      sessionStorage.setItem("revenue_params",this._d)
      sessionStorage.setItem("key_params",'day')

      this.rootPageService.getRevenuData('YBC', '&day=' + this._d).subscribe((res: any) => {
        if (res.status == "200") {
          console.log("res.data", res.data);
          this.getRevnueData(res.data)
        } else {
          console.log("res.data", res.data);
          this.getRevnueData([])
        }
      }, (error: any) => {
        console.log(error);
      });
    }
     else if (type == "monthly") {
      this.selectedDay = "null"
      this.today_revenue_check = false
      this.first_radio_Check = false;
      this.yearlySelectedList = this.yearlySelectedList == 'null' ? this._date.transform(new Date(), "yyyy") : this.yearlySelectedList;
      let filterDate = this.yearlySelectedList+'-'+this.monthlySelectedList+'-01'
      this._d = this._date.transform(new Date(filterDate), "yyyy-MM-dd");
      if(this.selectedClient != null){ this._d +=`&clientId=${this.selectedClient}` }
      sessionStorage.setItem("revenue_params", this._d)
      sessionStorage.setItem("key_params",'month')
      this.rootPageService.getRevenuData('YBC', '&month=' + this._d).subscribe((res: any) => {
        if (res.status == "200") {
          this.getRevnueData(res.data)
        } else {
          this.getRevnueData([])
        }
      }, (error: any) => {
        console.log(error);
      });
    } else if (type == "total") {
      this.selectedDay = "null"
      this.today_revenue_check = false
      this.first_radio_Check = false;
      this.monthlySelectedList="null"
      console.log('this.yearlySelectedList ',this.yearlySelectedList)
      if(this.yearlySelectedList == "" || this.yearlySelectedList == "null" || this.yearlySelectedList == null || this.yearlySelectedList == undefined){
        this._d = this._date.transform(new Date(), "yyyy-MM-dd");
        if(this.selectedClient != null){ this._d +=`&clientId=${this.selectedClient}` }
        sessionStorage.setItem("revenue_params",this._d)
        sessionStorage.setItem("key_params",'total')
        this.rootPageService.getRevenuData('YBC', this.yearlySelectedList?'&total=' + this._d:'').subscribe((res: any) => {
          if (res.status == "200") {
            this.getRevnueData(res.data)
          } else {
            this.getRevnueData([])
          }
        }, (error: any) => {
          console.log(error);
        });
        
      } else {
        this.today_revenue_check = false
        let filterDate = this.yearlySelectedList+'-01-01' 
        this._d = this._date.transform(new Date(filterDate), "yyyy-MM-dd");
        if(this.selectedClient != null){ this._d +=`&clientId=${this.selectedClient}` }
        sessionStorage.setItem("revenue_params",this._d)
        sessionStorage.setItem("key_params",'year')
        this.rootPageService.getRevenuData('YBC', this.yearlySelectedList?'&year=' + this._d:'').subscribe((res: any) => {
          if (res.status == "200") {
            this.getRevnueData(res.data)
          } else {
            this.getRevnueData([])
          }
        }, (error: any) => {
          console.log(error);
        });
      }
      console.log('this._d ',this._d)
     
      
    }
  }

  getRevnueData = (_tempData: any) => {
    this.showHtmlChart = true
  
    console.log(_tempData)



    this._seriesData = [
      {
        "name": "Standard",
        "type": 'column',
        "data": [],
        "color" : "#4cc8d8"
      },
      {
        "name": "Premium",
        "type": 'column',
        "data": [],
        "color" : "#f4b3ce"
      }
    ];


    let standardAr: any = [];
    let premiumAr: any = [];
     
    if (_tempData.length > 0) {
      for (let item of _tempData) {
        if (((item.key).toLocaleLowerCase()).indexOf("standard") > -1) {
          standardAr.push(parseFloat((((item["ssnRevenue"])) + ((item["ybcRevenue"]))).toFixed(2)));

        } else if (((item.key).toLocaleLowerCase()).indexOf("premium") > -1) {
          premiumAr.push(parseFloat((((item["ssnRevenue"])) + ((item["ybcRevenue"]))).toFixed(2)));

        }
      }

      this._seriesData[0]["data"] = standardAr;
      this._seriesData[1]["data"] = premiumAr;
      console.log("_seriesData", this._seriesData);
    } else {
      console.log("_seriesData", this._seriesData);
    }





    this.planChart = new Chart({
      chart: {
        type: 'column',
        marginTop: 50,
        marginBottom: 100
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: ['3 Yearly - Elite', 'Yearly - Ultra', 'Monthly - Basic' , 'Monthly - Basic 7DRP']
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Revenue'
        },
        stackLabels: {
          enabled: true,
          style: {
            fontWeight: 'bold',
            color: 'gray',
            textOutline: 'none'
          }
        }
      },
      legend: {
        align: 'center',
        // x: 70,
        verticalAlign: 'bottom',
        // y: 70,
        floating: true,
        backgroundColor: 'white',
        // borderColor: '#CCC',
        // borderWidth: 1,
        shadow: false
      },
      tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: true
          }
        },
        
        series: {
          events: {
            click: (event: any) => {
              // http://localhost:9090/api/dashboard/revenue-detail-list?
              // key=Standard_Elite&day=2023-04-20&campaignId="uh43423i3"

              let obj: any = {
                category: event.point.category,
                planeName: event.point.series.name,
                key: `${event.point.series.name}_${event.point.category}`,
                date: this.requested_date,
                campaignId: this.selectedCampaign,
                clientId: this.selectedClient,
                count:event.point.y
              }
              this.rootPageService.saveRevenueDetailsList(obj)
              this._ngZone.run(() => {
                this.router.navigate(['dashboard/campaign-revenue-list'])
              })
            }
          }
        }
      },
      credits: {
        enabled: false
      },
      exporting: {
        buttons: {
          contextButton: {
            menuItems: ['downloadPNG', 'downloadJPEG', 'downloadPDF', 'downloadSVG'],
          },
        },
      },
      series: this._seriesData
    });

    this._cd.detectChanges();
  }

  onDayChange(){
     if(this.selectedDay == 'today'){
         this.getRevenue('today');
     }
     else{
      this.getRevenue('yesterday')
     }
  }



 
}
