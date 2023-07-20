import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { RootPageService } from '../../root-page.service';
import { Chart } from "angular-highcharts"
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-consumer-drop',
  templateUrl: './consumer-drop.component.html',
  styleUrls: ['./consumer-drop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsumerDropComponent {
  pieChartData: any;
  data: any;
  showHtmlChart: boolean = true;
  consumerLabels: any = [];

  consumerCountTotal: any = [];
  consumerCountMonthly: any = [];
  consumerCountYesterday: any = [];

  consumerCountArr: any = []

  first_drop_radio_Check: boolean = false;
  second_drop_radio_Check: boolean = false;
  third_drop_radio_Check: boolean = false;

  request_date: any = null
  current_date: any;

  bankDetailsCount: any;
  homePageCount: any;
  optinCount: any
  submitCount: any

  selectedMonth: any = "null";
  selectedYear: any = "null";
  monthsList: any = [];
  yearsList: any = [];
  yearlySelectedList: any = "null";
  totalMonthForFilter: any = [];
  totalYearForFilter: any = [];
  currentYear: any;
  current_date_params: any = 'null';
  today_radio_Check :boolean = true
  selectedDay:any = 'today';

  colorPicker: any = ["#4cc8d8", "#35a3d3", "#f4b3ce", "#e2a493", "#ffc8ba", "#74c0e1", "#ccaada", "#9ad9c7", "#eaeabb", "#bcb3bb", "#3daabe", "#267ca9", "#ffcade", "#4cc8d8", "#c49083", "#85dfff", "#ad8077", "#ae8fbc", "#669e8d", "#c6c499", "#8e8b8e"]

  constructor(private _cd: ChangeDetectorRef, private service: RootPageService, private _ngZone: NgZone,
    private router: Router, private _date: DatePipe) {

  }
  ngOnInit() {

    let currentYear: any = this._date.transform(new Date(), "yyyy");
    this.currentYear = currentYear;
    for (let _i = parseInt(currentYear); _i > 2017; _i--) {
      this.totalYearForFilter.push(_i);
    }

    this.showMonthList();

    var d = new Date();
    d.setDate(d.getDate() - 1);
    this.current_date = this._date.transform(new Date(d), "yyyy-MM-dd");
    // this.getConsumer_drop_details();

    this.toggleUserAsPerRole()

  }
  role: any;
  selectedClient: any = null;
  toggleUserAsPerRole() {
    let role: any = sessionStorage.getItem('roles')
    this.role = JSON.parse(role);
    if (this.role == "SSN") {
      this.getToDayData()
      // this.getYesterDayData();
      // this.getConsumer_drop_details();
      // this.getClientListData();
      // this.loadIntialData()  // loading intial data for ssn user without having any client id
      // this.showClientDropdown = true;
    }
    else {
      let clientId: any = sessionStorage.getItem('clientId')
      this.selectedClient = JSON.parse(clientId);
      this.getToDayData()
      // this.getYesterDayData();
      // this.getConsumer_drop_details();
      // this.getSelectClient()
      //pending we have to call intial data based on the client id for ybc user..
    }
    this._cd.detectChanges()
  }

  // getConsumer_drop_details() {
  //   // const today = new Date();
  //   // const year = today.getFullYear();
  //   // const month = String(today.getMonth() + 1).padStart(2, '0');
  //   // const day = String(today.getDate() - 1).padStart(2, '0');
  //   // this.current_date = `${year}-${month}-${day}`;
  //   // this.getYesterDayData();


  //   // if(clientId == null){
  //   //   this.getYesterDayData()
  //     // let params;
  //     // params = null;
  //     // this.current_date_params = null;
  //     // this.service.getConsumerDropDetails(params).subscribe((data: any) => {
  //     //     this.setConsumerCountTotal(data);
  //     // })
  //   // }
  //   // else{
  //   //   this.getYesterDayData()
  //     // let params;
  //     // params = `?clientId=${clientId}`;
  //     // this.current_date_params = null;
  //     // this.service.getConsumerDropDetails(params).subscribe((data: any) => {
  //     //     this.setConsumerCountTotal(data);
  //     // })
  //   // }

  //   // params = `?month=${this.current_date}`
  //   // this.service.getConsumerDropDetails(params).subscribe((data: any) => {
  //   //   this.setConsumerCountMonthly(data);
  //   // })


  // }

  onMonthChange() {
    this.selectedDay ="null"
    this.consumerCountMonthly = [];
    this.consumerCountTotal = []
    console.log(this.selectedMonth)
    this.first_drop_radio_Check = false;
    this.today_radio_Check = false;

    // let params;
    if (this.selectedYear == 'null' && this.selectedMonth == 'null') {
      let params = null;
      if (this.selectedClient != null) { params = `?clientId=${this.selectedClient}` }
      this.current_date_params = params;
      console.log("params", params);
      this.service.getConsumerDropDetails(params).subscribe((data: any) => {
        this.setConsumerCountTotal(data);
      })
    } else if (this.selectedMonth != 'null' && this.selectedYear != 'null') {
      // console.log("params",params);
      let params = `?month=${this.selectedYear}-${this.selectedMonth}-01`;
      if (this.selectedClient != null) { params += `&clientId=${this.selectedClient}` }
      this.current_date_params = params;
      this.service.getConsumerDropDetails(params).subscribe((data: any) => {
        this.setConsumerCountMonthly(data);
      })
    } else if (this.selectedMonth == 'null' && this.selectedYear != 'null') {
      // console.log("params",params);
      let params = `?year=${this.selectedYear}-01-01`;
      if (this.selectedClient != null) { params += `&clientId=${this.selectedClient}` }
      this.current_date_params = params;
      this.service.getConsumerDropDetails(params).subscribe((data: any) => {
        this.setConsumerCountTotal(data);
      })
    } else if (this.selectedMonth != 'null' && this.selectedYear == 'null') {

      let params = `?month=${this.currentYear}-${this.selectedMonth}-01`;
      if (this.selectedClient != null) { params += `&clientId=${this.selectedClient}` }
      this.current_date_params = params;
      console.log("params", params);
      this.selectedYear = JSON.parse(JSON.stringify(this.currentYear));
      this.service.getConsumerDropDetails(params).subscribe((data: any) => {
        this.setConsumerCountMonthly(data);
      })
    }
    this._cd.detectChanges()



  }

  onYearChange() {
    this.selectedDay ="null"
    this.consumerCountMonthly = [];
    this.consumerCountTotal = []
    this.first_drop_radio_Check = false;
    this.today_radio_Check = false;
    this.selectedMonth = "null"
    let params;
    this.showMonthList();
    if (this.selectedYear == 'null') {
      this.selectedMonth = 'null';
      params = null;
      if (this.selectedClient != null) { params = `?clientId=${this.selectedClient}` }
      this.current_date_params = params;
      this.service.getConsumerDropDetails(params).subscribe((data: any) => {
        this.setConsumerCountTotal(data)
      })
    } else if (this.selectedYear != 'null' && this.selectedMonth != 'null') {
      params = `?month=${this.selectedYear}-${this.selectedMonth}-01`;
      if (this.selectedClient != null) { params += `&clientId=${this.selectedClient}` }
      this.current_date_params = params;
      this.service.getConsumerDropDetails(params).subscribe((data: any) => {
        this.setConsumerCountMonthly(data)
      })
    } else if (this.selectedYear != 'null' && this.selectedMonth == 'null') {
      params = `?year=${this.selectedYear}-01-01`;
      if (this.selectedClient != null) { params += `&clientId=${this.selectedClient}` }
      this.current_date_params = params;
      this.service.getConsumerDropDetails(params).subscribe((data: any) => {
        this.setConsumerCountTotal(data)
      })
    }
    this._cd.detectChanges()

  }



  setConsumerCountTotal(data: any) {

    this.consumerCountTotal = []
    // let [bankDetailsCount, homePageCount, optinCount, submitCount] = [data.BankDetailsDropPercentage, data.HomePageDropPercentage,
    // data.OptinDropPercentage, data.SubmitDropPercentage]

    // let [bankDetailsCount, homePageCount, optinCount, submitCount]=[
    //    data.find((x:any)=>x.level == 'Bank Detail page')?.count,
    //    data.find((x:any)=>x.level == 'LANDING')?.count,
    //    data.find((x:any)=>x.level == 'OptinPage')?.count,
    //    data.find((x:any)=>x.level == 'SubmitPage')?.count,
    // ]
    this.consumerCountTotal = data.map((ele: any) => {
      return { name: ele.level, 'y': ele.count }
    });
    //  console.log(this.consumerCountTotal)
    // this.consumerCountTotal = [{ name: "Bank", 'y': bankDetailsCount }, { name: "Home", 'y': homePageCount }, { name: "Optins", 'y': optinCount }, { name: "Submit", 'y': submitCount }];
    this.createPieChartData(this.consumerCountTotal)
    // this.third_drop_radio_Check = true;
    this.showHtmlChart = true;
    this._cd.detectChanges()
  }








  setConsumerCountMonthly(data: any) {
    this.consumerCountMonthly = []

    this.consumerCountMonthly = data.map((ele: any) => {
      return { name: ele.level, 'y': ele.count }
    })
    this.createPieChartData(this.consumerCountMonthly)
    this._cd.detectChanges()
  }


  getYesterDayData = () => {
    this.showHtmlChart = true
    this.first_drop_radio_Check = true;
    this.today_radio_Check = false;
    this.selectedMonth = 'null'
    this.selectedYear = 'null'
    let params = `?day=${this.current_date}`;
    if (this.selectedClient != null) { params += `&clientId=${this.selectedClient}` }
    this.current_date_params = params;
    this.service.getConsumerDropDetails(params).subscribe((data: any) => {
      this.setConsumerCountYesterday(data);
    })
  }


  setConsumerCountYesterday(data: any) {
    // this.consumerCountYesterday=[]
    // let [bankDetailsCount, homePageCount, optinCount, submitCount] = [data.BankDetailsDropPercentage, data.HomePageDropPercentage,
    // data.OptinDropPercentage, data.SubmitDropPercentage]

    // this.consumerCountYesterday = [{ name: "Bank", 'y': bankDetailsCount }, { name: "Home", 'y': homePageCount }, { name: "Optins", 'y': optinCount }, { name: "Submit", 'y': submitCount }];

    this.consumerCountYesterday = data.map((ele: any) => {
      return { name: ele.level, 'y': ele.count }
    })
    this.createPieChartData(this.consumerCountYesterday)
  }

  setConsumerCountToday(data: any) {
    
   let today_data : any= data.map((ele: any) => {
      return { name: ele.level, 'y': ele.count }
    })
    this.createPieChartData(today_data)
  }




  createPieChartData(obj: any) {
    console.log("obj", obj);
    let names_= obj.map((x:any) =>{ return x.name })
    let colorChoice = []
    let im = 0;
    for (let cd of obj) {
      colorChoice.push(this.colorPicker[im]);
      im++;
    }

    this.pieChartData = new Chart({
      chart: {
        plotBackgroundColor: "",
        plotBorderWidth: 0,
        plotShadow: false,
        type: 'pie',
        marginTop: 50
      },
      title: {
        text: '',
        align: 'center'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b><br>count:{point.y}'
      },//   <b>{point.percentage:.1f}%</b><br>count :{point.y}
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      legend: {
        enabled: true
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          // colors: ["#2ab57d", "#5156be", "#fd625e", "#4ba6ef", "#ffbf53"],
          colors: colorChoice,
          dataLabels: {
            enabled: true,
            padding: 0,
            format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
            // softConnector: false
            // distance: -50,
            // filter: {
            //   property: 'percentage',
            //   operator: '>',
            //   value: 1
            // }
          }
        },
        series: {
          cursor: 'pointer',
          events: {
            click: (event: any) => {
              console.log(event)
              let page_name = event?.point?.options?.name;
              let obj: any = {
                request_date: this.current_date_params,
                page_name: page_name,
                count: event?.point?.y,
                clientId : this.selectedClient,
                names : names_
              }
              this.service.saveConsumerDropData(obj);

              this._ngZone.run(() => {
                this.router.navigate(['dashboard/consumer-drop-list'])
              })
              //  http://localhost:8087/api/getConsumerDropPerReportDetails?
              // day=2023-04-19&pageName=YbcLandingPage


            }
          }
        }
      },
      credits: {
        enabled: false
      },
      series: [{
        type: 'pie',
        name: 'Share',
        data: obj
      }],
      exporting: {
        buttons: {
          contextButton: {
            menuItems: ['downloadPNG', 'downloadJPEG', 'downloadPDF', 'downloadSVG'],
          },
        },
      }
    });

    this._cd.detectChanges()
  }
  onChartClick(event: any) {
    // console.log(event)
  }

  toggleWithConsumerDataChart(str: any) {
    console.log('Yesterday :: ', str)
    if (str == "yesterday") {
      this.first_drop_radio_Check = true;
      this.selectedMonth = "null";
      this.selectedYear = "null";
      // console.log(this.consumerCountYesterday)
      // this.second_drop_radio_Check = false;
      // this.third_drop_radio_Check = false;
      this.request_date = `day=${this.current_date}`
      this.current_date_params = this.request_date;
      this.createPieChartData(this.consumerCountYesterday)
    }
    // else if (str == "monthly") {
    //   this.first_drop_radio_Check = false;
    //   this.second_drop_radio_Check = true;
    //   this.third_drop_radio_Check = false;
    //   this.request_date = `month=${this.current_date}`
    //   this.createPieChartData(this.consumerCountMonthly)

    // }
    // else if (str == "total") {
    //   this.first_drop_radio_Check = false;
    //   this.second_drop_radio_Check = false;
    //   this.third_drop_radio_Check = true;
    //   this.request_date = null;
    //   this.createPieChartData(this.consumerCountTotal)

    // }
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
      this.selectedMonth = "null";
      this.totalMonthForFilter = _totalMonthForFilter;
    }

    console.log("this.selectedMonth", this.selectedMonth);
    this._cd.detectChanges();
  }
  getToDayData=()=>{
    this.today_radio_Check = true
    var d = new Date();
    d.setDate(d.getDate());
    let today_date = this._date.transform(new Date(d), "yyyy-MM-dd");

    this.showHtmlChart = true
    this.today_radio_Check = true;
    this.first_drop_radio_Check = false;
    this.selectedMonth = 'null'
    this.selectedYear = 'null'
    let params = `?day=${today_date}`;
    if (this.selectedClient != null) { params += `&clientId=${this.selectedClient}` }
    this.current_date_params = params;
    this.service.getConsumerDropDetails(params).subscribe((data: any) => {
      this.setConsumerCountToday(data);
    })
  }
  onDayChange(){
    if(this.selectedDay == 'today'){
      this.getToDayData()
    }
    else{
      this.getYesterDayData()
    }
  }
}