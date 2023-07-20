import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { EChartsOption } from 'echarts'
import { RootPageService } from '../../root-page.service';
import { Chart } from 'angular-highcharts';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-consumer-plan-distribution',
  templateUrl: './consumer-plan-distribution.component.html',
  styleUrls: ['./consumer-plan-distribution.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsumerPlanDistributionComponent {
  pieChart!: EChartsOption;
  showHtml: boolean = true;
  selectedPlanCover: any = "null";
  selected_cover_Cover: any = "null"
  coverListData: any;
  current_date: any;
  planDistributionCheck1: boolean = false
  planDistributionCheck2: boolean = false
  planDistributionCheck3: boolean = false
  planChart: any;
  coverChart: any;
  mode: any;
  request_date: any = null;
  coverDistributionCheck1: any;
  coverDistributionCheck2: any;
  coverDistributionCheck3: any;
  selectedMonth: any = 'null'
  selectedYear: any = 'null'
  monthsList: any = []
  yearsList: any = []
  yearlySelectedList: any;
  totalMonthForFilter: any = [];
  totalYearForFilter: any = [];
  current_date_params:any= null;
  plan_today_radio:boolean = true;
  selectedDay:any = 'today';

  constructor(private service: RootPageService, private _cd: ChangeDetectorRef, private _ngZone: NgZone,
    private router: Router, private _date: DatePipe) {

  }
  ngOnInit() {
   

    var d = new Date();
    d.setDate(d.getDate() - 1);
    this.current_date = this._date.transform(new Date(d), "yyyy-MM-dd");

    let currentYear: any = this._date.transform(new Date(), "yyyy");

    for (let _i = parseInt(currentYear); _i > 2017; _i--) {
      this.yearsList.push(_i);
    }

    this.showMonthList();
    // this.loadIntialData();
    this.toggleUserAsPerRole()
  }


  role: any;
  selectedClient: any = null;
  toggleUserAsPerRole() {
    let role: any = sessionStorage.getItem('roles')
    this.role = JSON.parse(role);
    if (this.role == "SSN") {
      // this.dailyData()
      this.getToDayData()
    }
    else {
      let clientId: any = sessionStorage.getItem('clientId')
      this.selectedClient = JSON.parse(clientId);
      // this.dailyData()
      this.getToDayData()
    }
    this._cd.detectChanges()
  }

  showMonthList = () => {


    let _totalMonthForFilter = [
      {
        key: "01",
        value: "Jan"
      },
      {
        key: "02",
        value: "Feb"
      },
      {
        key: "03",
        value: "Mar"
      },
      {
        key: "04",
        value: "Apr"
      },
      {
        key: "05",
        value: "May"
      },
      {
        key: "06",
        value: "Jun"
      },
      {
        key: "07",
        value: "Jul"
      }, {
        key: "08",
        value: "Aug"
      }, {
        key: "09",
        value: "Sep"
      }, {
        key: "10",
        value: "Oct"
      }, {
        key: "11",
        value: "Nov"
      }, {
        key: "12",
        value: "Dec"
      }
    ];
    let _newYear = this._date.transform(new Date(), "yyyy");
    let _currentMonth: any = this._date.transform(new Date(), "MM");


    if (this.selectedYear == _newYear) {
      this.totalMonthForFilter = _totalMonthForFilter.filter((x: any) => {
        return parseInt(x.key) <= parseInt(_currentMonth)
      });
    } else {
      this.totalMonthForFilter = _totalMonthForFilter;
    }
    this._cd.detectChanges();
  }





  onMonthChange() {
    this.selectedDay = "null"
    this.plan_today_radio = false
    this.planDistributionCheck1 = false;
    this.totalSeriesData = [];
    this.monthlySeriesData = [];
    
    if (this.selectedMonth != 'null' && this.selectedYear != 'null') {
      let params = `?month=${this.selectedYear}-${this.selectedMonth}-01`;
      if(this.selectedClient != null){ params += `&clientId=${this.selectedClient}`}
      this.current_date_params=params;
      this.service.consumerPlanDistributionDataForMonth(params).subscribe((data: any) => {
        this.monthlyConsumerPlanDistData = data;
        this.preapreChart(data);
      })
    }
    if (this.selectedMonth == 'null' && this.selectedYear != 'null') {
      let params = `?year=${this.selectedYear}-01-01`;
      if(this.selectedClient != null){ params += `&clientId=${this.selectedClient}`}
      this.current_date_params=params;
      this.service.consumerPlanDistributionDataForTotal(params).subscribe((data: any) => {

        this.totalConsumerPlanDistData = data;
        // this.planDistributionCheck3 = true;

        this.preapreChart(data);
      })
    }
    if (this.selectedMonth != 'null' && this.selectedYear == 'null') {
      this.selectedYear = this.yearsList[0];
      let params = `?month=${this.selectedYear}-${this.selectedMonth}-01`;
      if(this.selectedClient != null){ params += `&clientId=${this.selectedClient}`}
      this.current_date_params=params
      this.service.consumerPlanDistributionDataForMonth(params).subscribe((data: any) => {

        this.monthlyConsumerPlanDistData = data;
        this.preapreChart(data);
      })
    }

  }
  onYearChange() {
    this.selectedDay = 'null'
    this.plan_today_radio = false
    this.planDistributionCheck1 = false;
    this.totalSeriesData = [];
    this.monthlySeriesData = [];
    this.selectedMonth="null"
    if (this.selectedYear == "null" && (this.selectedMonth != "null" || this.selectedMonth == 'null')) {
      this.selectedMonth = "null";
      let params = 'null';
      if(this.selectedClient != null){ params = `?clientId=${this.selectedClient}`}
      this.current_date_params=null
      this.service.consumerPlanDistributionDataForTotal(params).subscribe((data: any) => {
        this.preapreChart(data);
      })
    }
    if (this.selectedYear != 'null' && this.selectedMonth == 'null') {
      let params = `?year=${this.selectedYear}-01-01`;
      if(this.selectedClient != null){ params += `&clientId=${this.selectedClient}`}
      this.current_date_params=params
      this.service.consumerPlanDistributionDataForTotal(params).subscribe((data: any) => {

        this.totalConsumerPlanDistData = data;
        this.planDistributionCheck3 = true;

        this.preapreChart(data);
      })
    }
    if (this.selectedYear != 'null' && this.selectedMonth != 'null') {
      let params = `?month=${this.selectedYear}-${this.selectedMonth}-01`;
      if(this.selectedClient != null){ params += `&clientId=${this.selectedClient}`}
      this.current_date_params=params
      this.service.consumerPlanDistributionDataForMonth(params).subscribe((data: any) => {

        this.monthlyConsumerPlanDistData = data;
        this.preapreChart(data);
      })
    }
  }


  // togglePlanDistributionChart(str: string) {
  //   this.mode = str;
  //   if (str == "yesterday") {

  //     this.planDistributionCheck1 = true
  //     this.planDistributionCheck2 = false
  //     this.planDistributionCheck3 = false
  //     this.request_date = `day=${this.current_date}`
  //     this.planDistributionChart(this.dailySeriesData)
  //   }
  //   else if (str == "monthly") {

  //     this.planDistributionCheck1 = false
  //     this.planDistributionCheck2 = true
  //     this.planDistributionCheck3 = false
  //     this.request_date = `month=${this.current_date}`
  //     this.planDistributionChart(this.monthlySeriesData)
  //   }
  //   else if (str == "total") {

  //     this.planDistributionCheck1 = false
  //     this.planDistributionCheck2 = false
  //     this.planDistributionCheck3 = true
  //     this.request_date = null
  //     this.planDistributionChart(this.totalSeriesData)
  //   }
  // }


  totalConsumerPlanDistData: any;
  monthlyConsumerPlanDistData: any;
  dailyConsumerPlanDistData: any;

  totalSeriesData: any = [];
  monthlySeriesData: any = [];
  dailySeriesData: any = [];
  
  loadIntialData() {
    let params: any = 'null';
    this.current_date_params=null;
    this.service.consumerPlanDistributionDataForTotal(params).subscribe((data: any) => {



      if(data && data.length > 0){
        this.preapreChart(data);
      }else{
        this.preapreChart([]);
      }
     
    })

  }




  preapreChart = (data:any)=>{
    
    if(data && data.length > 0){
      this.totalConsumerPlanDistData = data;
      this.totalSeriesData = data;
     
  
  
      let standardCover3Yearly = [];
      //standardCover3Yearly = pipe()
      
      
      standardCover3Yearly = this.totalSeriesData.map((item:any)=>{
   
        if(item["_id"]["planType"] == "3 Yearly" && (item["_id"]["cover"] == "Standard Cover" || item["_id"]["cover"] == "Standard")){
          return item["count"];
        }else{
          return 0;
        }
      });
      let yearly3Standarad = standardCover3Yearly.reduce((x:any,y:any)=>x+y); 
  
  
  
      let premiumCover3Yearly = [];
      premiumCover3Yearly = this.totalSeriesData.map((item:any)=>{
        if(item["_id"]["planType"] == "3 Yearly" && (item["_id"]["cover"] == "Premium Cover" || item["_id"]["cover"] == "Premium")){
          return item["count"];
        }else{
          return 0;
        }
      });
      let yearly3Premium = premiumCover3Yearly.reduce((x:any,y:any)=>x+y); 

      let standardCoverYearly = [];
      standardCoverYearly = this.totalSeriesData.map((item:any)=>{
        if(item["_id"]["planType"] == "Yearly" && (item["_id"]["cover"] == "Standard Cover" || item["_id"]["cover"] == "Standard")){
          return item["count"];
        }else{
          return 0
        }
      });
      let yearlyStandarad = standardCoverYearly.reduce((x:any,y:any)=>x+y); 
  
      let premiumCoverYearly = [];
      premiumCoverYearly = this.totalSeriesData.map((item:any)=>{
        if(item["_id"]["planType"] == "Yearly" && (item["_id"]["cover"] == "Premium Cover" || item["_id"]["cover"] == "Premium")){
          return item["count"];
        }else{
          return 0;
        } 
      });
      let yearlyPremium = premiumCoverYearly.reduce((x:any,y:any)=>x+y);   
  
      let standardCoverMonthly = [];
      standardCoverMonthly = this.totalSeriesData.map((item:any)=>{
        if(item["_id"]["planType"] == "Monthly" && (item["_id"]["cover"] == "Standard Cover" || item["_id"]["cover"] == "Standard")){
          return item["count"];
        }else{
          return 0;
        }
      });
      let monthlyStandard = standardCoverMonthly.reduce((x:any,y:any)=>x+y); 
  
      let premiumCoverMonthly = [];
      premiumCoverMonthly = this.totalSeriesData.map((item:any)=>{
        if(item["_id"]["planType"] == "Monthly" && (item["_id"]["cover"] == "Premium Cover" || item["_id"]["cover"] == "Premium")){
          return item["count"];
        }else{
          return 0;
        }
      });
      let monthlyPremium = premiumCoverMonthly.reduce((x:any,y:any)=>x+y); 

      let standardCoverMonthly7 = [];
      standardCoverMonthly7 = this.totalSeriesData.map((item:any)=>{
        if(item["_id"]["planType"] == "Monthly 7DRP" && (item["_id"]["cover"] == "Standard Cover" || item["_id"]["cover"] == "Standard")){
          return item["count"];
        }else{
          return 0;
        }
      });
      let monthlyStandard7 = standardCoverMonthly7.reduce((x:any,y:any)=>x+y); 
    
  
      let premiumCoverMonthly7 = [];
      premiumCoverMonthly7 = this.totalSeriesData.map((item:any)=>{
        if(item["_id"]["planType"] == "Monthly 7DRP" && (item["_id"]["cover"] == "Premium Cover" || item["_id"]["cover"] == "Premium")){
          return item["count"];
        }else{
          return 0
        }
      });
      let monthlyPremium7 = premiumCoverMonthly7.reduce((x:any,y:any)=>x+y); 

  
      this.totalSeriesData = [
        {
          name: "3 Yearly",
          type: "column",
          data: [yearly3Standarad, yearly3Premium],
          color : "#4cc8d8"
        },
        {
          name: "Yearly",
          type: "column",
          data: [yearlyStandarad, yearlyPremium],
          color : "#f4b3ce"
        },
        {
          name: "Monthly",
          type: "column",
          data: [monthlyStandard, monthlyPremium],
          color : "#e2a493"
        }, {
          name: "Monthly 7DRP",
          type: "column",
          data: [monthlyStandard7, monthlyPremium7],
          color : "#ffc8ba"
        }
      ]
  
    }else{

      this.totalSeriesData = [
        {
          name: "3 Yearly",
          type: "column",
          data: [0,0],
          color : "#4cc8d8"
        },
        {
          name: "Yearly",
          type: "column",
          data: [0,0],
          color : "#f4b3ce"
        },
        {
          name: "Monthly",
          type: "column",
          data: [0,0],
          color : "#e2a493"
        }, {
          name: "Monthly 7DRP",
          type: "column",
          data: [0,0],
          color : "#ffc8ba"
        }
      ]

    }
    


    this.planDistributionChart(this.totalSeriesData);
    this.showHtml = true;
    this._cd.detectChanges();
  
  }

  dailyData = () =>{
    this.plan_today_radio = false
    this.planDistributionCheck1 =true;
    this.selectedMonth = 'null'
    this.selectedYear = 'null'
    let params = "?day=" + this.current_date;
    if(this.selectedClient != null){ params += `&clientId=${this.selectedClient}`}
    this.current_date_params=params
    this.service.consumerPlanDistributionDataForDay(params).subscribe((data: any) => {
      this.dailyConsumerPlanDistData = data;
      this.preapreChart(data)
      // this._cd.detectChanges();
    })
  }






  planDistributionChart(data: any) {

    const total_series_data = data;
    this.planChart = new Chart({
      chart: {
        marginTop : 50,
        marginBottom :100,
        type: 'row',
        inverted: false
      },
      title: {
        text: '',
        align: 'center'
      },
      xAxis: {
        categories: ['Standard', 'Premium']
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Count'
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
          cursor: 'pointer',
          events: {
            click: (event: any) => {
              console.log(event)
              // http://localhost:8086/api/getConsumerPlanDistributionDetailReport?
              // month=2023-04-20&day=2023-04-20&planName=3 Yearly
              console.log(event)
              let obj = {
                request_date:  this.current_date_params,
                planName: event.target.point.series.name,
                count:event?.point?.y,
                category:event?.point?.category,
                clientId:this.selectedClient
              }
              
              this.service.saveConsumerPlanDistData(obj);
              this._ngZone.run(() => {
                this.router.navigate(['dashboard/consumer-pland-list'])
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
      series: total_series_data
    });
  }

  getToDayData=()=>{
    this.plan_today_radio = true;
    this.planDistributionCheck1=false
    this.selectedMonth = 'null'
    this.selectedYear = 'null'

    var d = new Date();
    d.setDate(d.getDate());
    let today_date = this._date.transform(new Date(d), "yyyy-MM-dd");
    let params = "?day=" + today_date;
    if(this.selectedClient != null){ params += `&clientId=${this.selectedClient}`}
    this.current_date_params=params
    this.service.consumerPlanDistributionDataForDay(params).subscribe((data: any) => {
      this.dailyConsumerPlanDistData = data;
      this.preapreChart(data)
      this._cd.detectChanges();
    })
    
  }
  onDayChange(){
    if(this.selectedDay == 'today'){
      this.getToDayData()
    }
    else{
      this.dailyData()
    }
  }

}
