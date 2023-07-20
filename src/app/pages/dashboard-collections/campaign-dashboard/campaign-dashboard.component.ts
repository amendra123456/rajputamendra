import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { RootPageService } from '../../root-page.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Chart } from 'angular-highcharts';
import { DatePipe } from '@angular/common';
import { style } from '@angular/animations';



@Component({
  selector: 'app-campaign-dashboard',
  templateUrl: './campaign-dashboard.component.html',
  styleUrls: ['./campaign-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CampaignDashboardComponent implements OnInit {
  planChart: any;
  _seriesData: any = [];
  totalMonthForFilter: any = [];
  totalYearForFilter: any = [];
  yearlySelectedList: any;
  monthlySelectedList: any;
  constructor(private router: Router, private rootPageService: RootPageService, private _ngZone: NgZone, private _cd: ChangeDetectorRef, private _date: DatePipe) { }
  breadCrumbItems!: Array<{}>;
  showHtmlChart: boolean = true;
  // total landing, conversion and revenue data variables list
  totalLandingSeriesData: any;
  totalLandingCountData: any;
  totalConversionData: any;
  totalConversionMainList: any = [];

  // monthly landing, conversion and revenue data variables list
  monthlyLandingSeriesData: any;
  monthlyLandingCountData: any;
  monthlyConversionData: any;
  monthlyConversionMainList: any = [];

  // daily landing, conversion and revenue data variables list
  dailyLandingSeriesData: any;
  dailyLandingCountData: any;
  dailyConversionData: any;
  dailyConversionMainList: any = [];
  dailyRevenueData: any;
  monthlyRevenueData: any;
  totalRevenueData: any;
  // main data variables
  totalData: any;
  monthlyData: any;
  dailyData: any;

  dailyMaxLimit: any;
  monthlyMaxLimit: any;
  totalMaxLimit: any;

  public toggledRadioValue = '';
  clientList: any;
  showChart: boolean = false;
  //subject
  public campaignData$ = new BehaviorSubject(0);
  campaign_data$ = this.campaignData$.asObservable();
  dataForDifferCharts: any;
  dataForRevenueChart: any;
  lineWithDataChart: any;
  lineWithRevenueDataChart: any;
  selectedClient: any = null
  isCampaignShow: boolean = false
  selectedCampaign: any = "null";
  getCampaignList: any
  campaignID: any;

  simplePieChart: any;
  requested_date: any = "null"
  current_date: any;
  today_campaign_Check: boolean = false;
  selectedDay: any = 'today';

  colorPicker: any = ["#4cc8d8", "#35a3d3", "#f4b3ce", "#e2a493", "#ffc8ba", "#74c0e1", "#ccaada", "#9ad9c7", "#eaeabb", "#bcb3bb", "#3daabe", "#267ca9", "#ffcade", "#4cc8d8", "#c49083", "#85dfff", "#ad8077", "#ae8fbc", "#669e8d", "#c6c499", "#8e8b8e"]
  ngOnInit() {
    this.yearlySelectedList = "null";
    this.monthlySelectedList = "null";

    // let _totalMonthForFilter = [
    //   {
    //     key: "01",
    //     value: "Jan"
    //   },
    //   {
    //     key: "02",
    //     value: "Feb"
    //   },
    //   {
    //     key: "03",
    //     value: "Mar"
    //   },
    //   {
    //     key: "04",
    //     value: "Apr"
    //   },
    //   {
    //     key: "05",
    //     value: "May"
    //   },
    //   {
    //     key: "06",
    //     value: "Jun"
    //   },
    //   {
    //     key: "07",
    //     value: "Jul"
    //   }, {
    //     key: "08",
    //     value: "Aug"
    //   }, {
    //     key: "09",
    //     value: "Sep"
    //   }, {
    //     key: "10",
    //     value: "Oct"
    //   }, {
    //     key: "11",
    //     value: "Nov"
    //   }, {
    //     key: "12",
    //     value: "Dec"
    //   }
    // ];

    // let _currentMonth : any = this._date.transform(new Date(), "MM");

    // this.totalMonthForFilter = _totalMonthForFilter.filter((x:any)=>{
    //   return parseInt(x.key) <= parseInt(_currentMonth)
    // });


   // this.showMonthList();

    let currentYear: any = this._date.transform(new Date(), "yyyy");

    for (let _i = parseInt(currentYear); _i > 2017; _i--) {
      this.totalYearForFilter.push(_i);
    }

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate() - 1).padStart(2, '0');
    this.current_date = `${year}-${month}-${day}`;

    console.log("current_date>>>>>>>",this.current_date);

    this.toggleUserAsPerRole();

    this.breadCrumbItems = [
      { label: 'Dashboard' },
      { label: 'Campaign Dashboard', active: true }
    ];
    // this.getClientListData()
    // this.loadIntialData()
    // this.createPieChartData()
    // this.getSelectClient();

    this.getRevenue('total');

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


    if (this.yearlySelectedList == _newYear) {
      this.totalMonthForFilter = _totalMonthForFilter.filter((x: any) => {
        return parseInt(x.key) <= parseInt(_currentMonth)
      });
    } else {
      this.totalMonthForFilter = _totalMonthForFilter;
    }
    this._cd.detectChanges();
  }






  role: any;
  showClientDropdown: any = false;
  //  loginedClientId:any;
  toggleUserAsPerRole() {
    let role: any = sessionStorage.getItem('roles')
    this.role = JSON.parse(role);
    if (this.role == "SSN") {
      // this.getClientListData();
      // this.loadIntialData()
      // loading intial data for ssn user without having any client id
      this.paramsPipe(null, null, 'today')
      this.showClientDropdown = true;
    }
    else {
      let clientId: any = sessionStorage.getItem('clientId')
      this.selectedClient = JSON.parse(clientId)
      this.paramsPipe(this.selectedClient, null, 'today')
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

    this.getCampaignList = [];
    this.rootPageService.getClientCampignList(this.selectedClient).subscribe((data: any) => {
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

      this.paramsPipe(this.selectedClient, null);
      // this._cd.detectChanges();
    }, (error: any) => {
      this.paramsPipe(this.selectedClient, null);
    })
  }

  getSelectCampaign() {
    this.getTotalData(this.selectedClient, this.selectedCampaign);
    //this.getMonthlyData(this.selectedClient, this.selectedCampaign);
    this.getDailyData(this.selectedClient, this.selectedCampaign);

  }

  // rendering Html chart based on the data from showHtmlChart




  paramsPipe = (clientId: any, campaignId: any, calendarType: any = "") => {

    if (calendarType == "yesterday") {
      this.getDailyData(this.selectedClient, null);
      this.yearlySelectedList = "null"
      this.monthlySelectedList = "null"
      this.today_campaign_Check = false
      this.first_radio_Check = true
      this._cd.detectChanges()
    }
    else if (calendarType == "today") {
      this.getTodayData(this.selectedClient, null);
      this.yearlySelectedList = "null"
      this.monthlySelectedList = "null"
      this.today_campaign_Check = true
      this.first_radio_Check = false
      this._cd.detectChanges()
    }
    else {
      this.selectedDay = "null"
      this.today_campaign_Check = false
      this.first_radio_Check = false
      if (calendarType == "yearly") {
        this.monthlySelectedList = "null"
      }
      let yesteday_Date: any = "";
      let yearParams: any = ""

      let _year = this._date.transform(new Date(), "yyyy");
      let _month = this._date.transform(new Date(), "MM");
      let _day = this._date.transform(new Date(), "dd");

      if (this.yearlySelectedList != "null" && this.yearlySelectedList != null) {
        let _combineDate = `${this.yearlySelectedList}-${_month}-${_day}`;
        yesteday_Date = this._date.transform(new Date(_combineDate), "yyyy-MM-dd");
        yearParams = "&year=" + yesteday_Date;
        sessionStorage.setItem("landing_metric_date", yesteday_Date);

        if (this.monthlySelectedList != "null" && this.monthlySelectedList != null) {

          let _combineDate = `${this.yearlySelectedList}-${this.monthlySelectedList}-${_day}`
          yesteday_Date = this._date.transform(new Date(_combineDate), "yyyy-MM-dd");
          yearParams = "&month=" + yesteday_Date;
          sessionStorage.setItem("landing_metric_date", yesteday_Date);
        }
      } else if (this.monthlySelectedList != "null" && this.monthlySelectedList != null) {
        this.yearlySelectedList = _year;
        let _combineDate = `${_year}-${this.monthlySelectedList}-${_day}`
        yesteday_Date = this._date.transform(new Date(_combineDate), "yyyy-MM-dd");
        yearParams = "&month=" + yesteday_Date;
        sessionStorage.setItem("landing_metric_date", yesteday_Date);
      } else {
        // yesteday_Date = this._date.transform(new Date(), "yyyy-MM-dd");
        yearParams = "";
        sessionStorage.setItem("landing_metric_date", '');
      }

      this.requested_date = yearParams;
      if (yearParams.indexOf('month') > -1) {
        this.getMonthlyData(this.selectedClient, null, yearParams);
      } else {
        this.getTotalData(this.selectedClient, null, yearParams);
      }
      this._cd.detectChanges()
    }
  }







  getTotalData(client: any, campaign: any, yearParams: any = "") {
    // let yearParams = ""
    // let yesteday_Date: any
    // if (this.yearlySelectedList != "null" && this.yearlySelectedList != null) {

    //   console.log("yearlySelectedList", this.yearlySelectedList);
    //   yesteday_Date = this._date.transform(new Date(), this.yearlySelectedList + "-MM-dd");
    //   yearParams = "&year=" + yesteday_Date;
    // } else {
    //   yesteday_Date = this._date.transform(new Date(), "yyyy-MM-dd");
    //   yearParams = "&year=" + yesteday_Date;
    // }
    // console.log("yearParams", yearParams);

    this.rootPageService.getTotalData(client, campaign, yearParams).subscribe((data: any) => {
      if (data.status == '200') {
        this.showChart = true
        this.commonDataSetForTotal(data.data)
      }
      this._cd.detectChanges();
    })
  }

  getMonthlyData(client: any, campaign: any, ybcParams: any = "") {

    // var d = new Date();
    // d.setDate(d.getDate() - 1);

    // let yesteday_Date: any
    // if (this.monthlySelectedList != "null" && this.monthlySelectedList != null) {
    //   console.log("monthlySelectedList", this.monthlySelectedList);
    //   yesteday_Date = this._date.transform(new Date(d), "yyyy-" + this.monthlySelectedList + "-dd");
    //   yesteday_Date = "&month=" + yesteday_Date;
    // } else {
    //   yesteday_Date = "&month=" + yesteday_Date;
    // }

    this.rootPageService.getMonthlyData(client, campaign, ybcParams).subscribe((data: any) => {
      if (data.status == '200') {
        this.showChart = true
        this.commonDataSetForMonthly(data.data)
      }

      this._cd.detectChanges();

    })
  }
  getDailyData(client: any, campaign: any) {
    var d = new Date();
    d.setDate(d.getDate() - 1);
    let yesteday_Date = this._date.transform(new Date(d), "yyyy-MM-dd");

    this.rootPageService.getDailyData(client, campaign, yesteday_Date).subscribe((data: any) => {
      if (data.status == '200') {
        this.showChart = true
        this.commonDataSetForDaily(data.data, 'yesterday')
      }
      this._cd.detectChanges();
    })
  }
  getTodayData(client: any, campaign: any) {
    var d = new Date();
    d.setDate(d.getDate());
    let today_date = this._date.transform(new Date(d), "yyyy-MM-dd");

    this.rootPageService.getDailyData(client, campaign, today_date).subscribe((data: any) => {
      if (data.status == '200') {
        this.showChart = true
        this.commonDataSetForDaily(data.data, 'today')
      }
      this._cd.detectChanges();
    })
  }
  dataCreation() {
    this.dataForDifferCharts = {
      today: {
        seriesData: this.dailyLandingSeriesData,
        data1: this.dailyLandingCountData,
        data2: this.dailyConversionData,
        // data3: this.dailyRevenueData,
        maxLimit: this.dailyMaxLimit,
        day: this.day_details,
        xaxisTitle: "Hour"
      },
      yesteday: {
        seriesData: this.dailyLandingSeriesData,
        data1: this.dailyLandingCountData,
        data2: this.dailyConversionData,
        // data3: this.dailyRevenueData,
        maxLimit: this.dailyMaxLimit,
        day: this.day_details,
        xaxisTitle: "Hour"
      },
      monthly: {
        seriesData: this.monthlyLandingSeriesData,
        data1: this.monthlyLandingCountData,
        data2: this.monthlyConversionData,
        // data3: this.monthlyRevenueData,
        maxLimit: this.monthlyMaxLimit,
        month: this.month_details,
        xaxisTitle: "Day"
      },
      total: {
        seriesData: this.totalLandingSeriesData,
        data1: this.landing_count,
        data2: this.conversion_count,
        // data3: this.totalRevenueData,
        maxLimit: this.totalMaxLimit,
        xaxisTitle: "Month/Year"

      }
    }
    // this.dataForRevenueChart = {
    //   yesteday: {
    //     seriesData: this.dailyLandingSeriesData,
    //     data1: this.dailyRevenueData,
    //     maxLimit: this.dailyMaxLimit,
    //     xaxisTitle: "Hour"
    //   },
    //   monthly: {
    //     seriesData: this.monthlyLandingSeriesData,
    //     data1: this.monthlyRevenueData,
    //     maxLimit: this.monthlyMaxLimit,
    //     month: this.month_details,
    //     xaxisTitle: "Day"
    //   },
    //   total: {
    //     seriesData: this.totalLandingSeriesData,
    //     data1: this.totalRevenueData,
    //     maxLimit: this.totalMaxLimit,
    //     xaxisTitle: "Month/Year"
    //   }

    // }
  }
  first_radio_Check: boolean = false

  toggleLineWithDataChart(str: any) {
    this.toggledRadioValue = str;
    if (str == '') {
      str = 'yesterday'
    }
    if (str == 'today') {
      this.loadLineHighChart(this.dataForDifferCharts.today)
    }
    else if (str == 'yesterday') {

      this.loadLineHighChart(this.dataForDifferCharts.yesteday)
    }
    if (str == 'monthly') {
      this.first_radio_Check = false
      // this.second_radio_Check = true
      // this.third_radio_Check = false
      // this.createlineWithDataChart(this.dataForDifferCharts.monthly)
      // this.createLineWithRevenueChart(this.dataForRevenueChart.monthly)
      // this.requested_date = `month=${this.current_date}`;
      this.loadLineHighChart(this.dataForDifferCharts.monthly)
    }
    if (str == 'total') {
      // this.createlineWithDataChart(this.dataForDifferCharts.total)
      // this.createLineWithRevenueChart(this.dataForRevenueChart.total)

      this.requested_date = null;
      this.first_radio_Check = false

      this.loadLineHighChart(this.dataForDifferCharts.total)
    }

  }

  // createlineWithDataChart(obj: any) {

  //   this.showHtmlChart = true;
  //   console.log('obj:: ', obj);
  //   let k = obj;
  //   let month = obj.month;
  //   let day = obj.day;

  //   console.log()
  //   if (obj.seriesData.length > 0) {
  //     this.showHtmlChart = true;
  //     this.lineWithDataChart = {
  //       chart: {
  //         height: 380,
  //         type: 'line',
  //         zoom: { enabled: !1 },
  //         toolbar: { show: !1 },
  //         events: {
  //           click: (event: any, chartContext: any, config: any) => {
  //             if (config.seriesIndex !== -1) {
  //               var line_name = config.config.series[config.seriesIndex].name;
  //               var x_axis_data = config.config.series[config.seriesIndex].data[config.dataPointIndex];
  //               var y_axis_data = config.globals.categoryLabels[config.dataPointIndex]
  //               let obj: any = {
  //                 line_name: line_name,
  //                 x_axis_data: x_axis_data,
  //                 y_axis_data: y_axis_data,
  //                 date_title: k.xaxisTitle,
  //                 day: day,
  //                 month: month
  //               }
  //               this.campaignData$.next(obj);
  //               this.rootPageService.getCampaignData$(obj)
  //               this._ngZone.run(() => {
  //                 this.router.navigate(['campaign-list-data'])
  //               })

  //             }
  //           }
  //         }
  //       },
  //       colors: ['#2ab57d', '#5156be', '#dd7514'],
  //       dataLabels: { enabled: !1 },
  //       stroke: { width: [3, 3, 3,], curve: 'straight' },
  //       series: [
  //         { name: "Landings", data: obj.data1},
  //         { name: "Conversations", data: obj.data2 },
  //         // { name: "Revenue", data: obj.data3 },
  //       ],
  //       title: {
  //         text: "Campaign Data",
  //         align: "left",
  //         style: { fontWeight: "500" },
  //       },
  //       grid: {
  //         row: { colors: ["transparent", "transparent", "transparent"], opacity: 0.2 },
  //         borderColor: "#f1f1f1",
  //       },
  //       markers: { style: "inverted", size: 0 },
  //       xaxis: {
  //         categories: obj.seriesData,
  //         title: { text: obj.xaxisTitle },
  //       },
  //       yaxis: { title: { text: "Count" }, min: 0, max: obj.maxLimit + 5 },
  //       legend: {
  //         position: "top",
  //         horizontalAlign: "center",
  //         floating: !0,
  //         offsetY: -25,
  //         offsetX: -5,
  //       },
  //       responsive: [
  //         {
  //           breakpoint: 600,
  //           options: { chart: { toolbar: { show: !1 } }, legend: { show: !1 } },
  //         },
  //       ],
  //     };
  //   }


  // }
  // createLineWithRevenueChart(obj:any){
  //     this.showHtmlChart = true;
  //     console.log('obj:: ', obj);
  //     let k = obj;
  //     let month = obj.month;
  //     let day = obj.day;

  //     if (obj.seriesData.length > 0) {
  //       this.showHtmlChart = true;
  //       this.lineWithRevenueDataChart = {
  //         chart: {
  //           height: 380,
  //           type: 'line',
  //           zoom: { enabled: !1 },
  //           toolbar: { show: !1 },
  //           events: {
  //             click: (event: any, chartContext: any, config: any) => {
  //               if (config.seriesIndex !== -1) {
  //                 var line_name = config.config.series[config.seriesIndex].name;
  //                 var x_axis_data = config.config.series[config.seriesIndex].data[config.dataPointIndex];
  //                 var y_axis_data = config.globals.categoryLabels[config.dataPointIndex]
  //                 let obj: any = {
  //                   line_name: line_name,
  //                   x_axis_data: x_axis_data,
  //                   y_axis_data: y_axis_data,
  //                   date_title: k.xaxisTitle,
  //                   day: day,
  //                   month: month
  //                 }
  //                 console.log(obj,"-------------------------->> obj need to send")
  //                 this.campaignData$.next(obj);
  //                 this.rootPageService.getCampaignData$(obj)
  //                 this._ngZone.run(() => {
  //                   this.router.navigate(['campaign-list-data'])
  //                 })

  //               }
  //             }
  //           }
  //         },
  //         colors: ['dd7514'],
  //         dataLabels: { enabled: !1 },
  //         stroke: { width: [3, 3, 3,], curve: 'straight' },
  //         series: [
  //           // { name: "Landings", data: obj.data1},
  //           // { name: "Conversations", data: obj.data2 },
  //           { name: "Revenue", data: obj.data1 },
  //         ],
  //         title: {
  //           text: "Campaign Data",
  //           align: "left",
  //           style: { fontWeight: "500" },
  //         },
  //         grid: {
  //           row: { colors: ["transparent", "transparent", "transparent"], opacity: 0.2 },
  //           borderColor: "#f1f1f1",
  //         },
  //         markers: { style: "inverted", size: 0 },
  //         xaxis: {
  //           categories: obj.seriesData,
  //           title: { text: obj.xaxisTitle },
  //         },
  //         yaxis: { title: { text: "Count" }, min: 0, max: obj.maxLimit + 5 },
  //         legend: {
  //           position: "top",
  //           horizontalAlign: "center",
  //           floating: !0,
  //           offsetY: -25,
  //           offsetX: -5,
  //         },
  //         responsive: [
  //           {
  //             breakpoint: 600,
  //             options: { chart: { toolbar: { show: !1 } }, legend: { show: !1 } },
  //           },
  //         ],
  //       };
  //     }



  // }






  loadIntialData() {
    var d = new Date();
    d.setDate(d.getDate() - 1);
    let yesteday_Date = this._date.transform(new Date(d), "yyyy-MM-dd");

    // this.rootPageService.loadIntialDataForDay(yesteday_Date, this.selectedClient).subscribe((data: any) => {
    //   if (data.status == '200') {
    //     this.showChart = true
    //     this.commonDataSetForDaily(data.data)
    //   }
    //   this._cd.detectChanges();
    // })

    // this.rootPageService.loadIntialDataForMonth(yesteday_Date, this.selectedClient).subscribe((data: any) => {
    //   if (data.status == '200') {
    //     this.showChart = true
    //     this.commonDataSetForMonthly(data.data)
    //   }
    //   this._cd.detectChanges();
    // })

    this.rootPageService.loadIntialDataForTotal(this.selectedClient).subscribe((data: any) => {
      if (data.status == '200') {
        this.showChart = true
        this.commonDataSetForTotal(data.data)
      }
      this._cd.detectChanges();
    })

  }
  landing_count: any = [];
  conversion_count: any = [];

  commonDataSetForTotal(data: any) {

    let totalData = data;
    let totalLandingSeriesData: any = [];
    let totalLandingCountData: any = []
    let totalConversionData: any = [];
    let totalRevenueData: any = []


    if (totalData?.Landing_data?.length > 0) {
      for (let i of totalData.Landing_data) {
        let monthOfYear = `${i._id.Month}/${i._id.Year}`;
        totalLandingSeriesData.push(monthOfYear);
        totalLandingCountData.push({ monthOfYear: monthOfYear, count: i.landing_count });

      }
    }

    if (totalData?.Conversion_data?.length > 0) {
      for (let i of totalData.Conversion_data) {
        let monthOfYear = `${i._id.Month}/${i._id.Year}`;
        let conversion_count = i?.count;
        // let revenue_count = i?.revenue?.$numberDecimal;
        totalLandingSeriesData.push(monthOfYear)
        totalConversionData.push({ monthOfYear: monthOfYear, count: conversion_count });
        // totalRevenueData.push({ monthOfYear: monthOfYear, count: revenue_count })
      }
    }

    let tsd = [...new Set(totalLandingSeriesData)];
    this.totalLandingSeriesData = tsd;
    // console.log(totalLandingSeriesData)


    const formattedDates = this.totalLandingSeriesData.map((date: any) => {
      const [month, year] = date.split('/');
      return `${year}-${month.padStart(2, '0')}-01`;
    });

    // Sort the dates in ascending order
    formattedDates.sort((a: any, b: any) => a.localeCompare(b));

    // Convert the dates back to their original format
    this.totalLandingSeriesData = formattedDates.map((date: any) => {
      const [year, month] = date.split('-');
      if (Number(month) < 10) {
        let m = month.split('')[1]
        return `${m}/${year}`
      }
      else {
        return `${month}/${year}`;
      }
    });

    this.landing_count = this.totalLandingSeriesData.map((value: any) => {
      let machvalue = totalLandingCountData.find((x: any) => x.monthOfYear == value)
      return machvalue ? machvalue.count : 0
    })
    this.conversion_count = this.totalLandingSeriesData.map((value: any) => {
      let machvalue = totalConversionData.find((x: any) => x.monthOfYear == value)
      return machvalue ? machvalue.count : 0
    })

    // console.log(this.totalLandingSeriesData ,"totalLandingSeriesData")
    // console.log(totalLandingCountData,"TotalLanding Count data")
    // console.log(landing_count,"modif lading count")
    // console.log(totalConversionData,"conversionCot data")
    // console.log(conversion_count,"modif conve cont data")
    // const revenue_count = totalLandingSeriesData.map((value: any) => {
    //   let machvalue = totalRevenueData?.find((x: any) => x.monthOfYear == value)
    //   return machvalue ? machvalue.count : 0
    // })

    // let lc = totalLandingSeriesData.map((value: any) => {
    //   let machvalue = totalLandingCountData.find((x: any) => x.monthOfYear == value)
    //   return machvalue ? machvalue.count : 0
    // })
    // let cc = totalLandingSeriesData.map((value: any) => {
    //   let machvalue = totalConversionData.find((x: any) => x.monthOfYear == value)
    //   return machvalue ? machvalue.count : 0
    // })
    // let rc = totalLandingSeriesData.map((value: any) => {
    //   let machvalue = totalRevenueData?.find((x: any) => x.monthOfYear == value)
    //   return machvalue ? machvalue.count : 0
    // })

    // this.totalLandingCountData = landing_count;
    // this.totalConversionData = conversion_count;
    // this.totalRevenueData = revenue_count;

    // let max_num = [];
    // max_num[0] = lc[lc.sort((a: any, b: any) => a - b).length - 1]
    // max_num[1] = cc[cc.sort((a: any, b: any) => a - b).length - 1]
    // max_num[2] = rc[rc.sort((a: any, b: any) => a - b).length - 1]
    // this.totalMaxLimit =Number( max_num[max_num.sort((a: any, b: any) => a - b).length - 1])

    this.dataCreation();
    // this.createlineWithDataChart(this.dataForDifferCharts.total);
    // this.createLineWithRevenueChart(this.dataForRevenueChart.total)
    this.loadLineHighChart(this.dataForDifferCharts.total)
    // this.third_radio_Check = true;
    this._cd.detectChanges();
  }
  month_details: any = {
    "Landing": [], "Conversion": []
  }
  commonDataSetForMonthly(data: any) {
    this.monthlyData = data;
    this.monthlyLandingSeriesData = [];
    this.monthlyLandingCountData = [];
    this.monthlyConversionData = [];
    this.monthlyRevenueData = []
    if (this.monthlyData?.Landing_data?.length > 0) {
      for (let i of this.monthlyData?.Landing_data) {
        this.month_details.Landing.push(i._id);
        let monthOfYear = `${i._id.Day}`;
        this.monthlyLandingSeriesData.push(monthOfYear);
        this.monthlyLandingCountData.push({ monthOfYear: monthOfYear, count: i.landing_count });
      }
    }
    if (this.monthlyData?.Conversion_data?.length > 0)
      for (let i of this.monthlyData?.Conversion_data) {
        this.month_details.Conversion.push(i._id);
        let monthOfYear = `${i._id.Day}`;
        let conversion_count = i.count;
        let revenue_count = Number(i.revenue?.$numberDecimal ? i.revenue?.$numberDecimal : i.revenue);
        this.monthlyLandingSeriesData.push(monthOfYear)
        this.monthlyConversionData.push({ monthOfYear: monthOfYear, count: conversion_count });
        this.monthlyRevenueData.push({ monthOfYear: monthOfYear, count: revenue_count })
      }
    // if (this.monthlyData?.Revenue_data?.length > 0) {
    //   for (let i of this.dailyData.Revenue_data) {
    //     this.month_details.Revenue.push(i._id);
    //     let monthOfYear = `${i._id.Day}`;
    //     let revenue_count = i.count;
    //     this.monthlyLandingSeriesData.push(monthOfYear)
    //     this.monthlyRevenueData.push({ monthOfYear: monthOfYear, count: revenue_count });
    //   }
    // }

    // this.monthlyConversionData = [...new Set(this.monthlyConversionData)];

    // this.monthlyRevenueData = [...new Set(this.monthlyRevenueData)];

    this.monthlyLandingSeriesData = [...new Set(this.monthlyLandingSeriesData)];

    this.monthlyLandingSeriesData.sort((a: any, b: any) => { return a - b });

    const landing_count = this.monthlyLandingSeriesData.map((value: any) => {
      let machvalue = this.monthlyLandingCountData.find((x: any) => x.monthOfYear == value)
      return machvalue ? machvalue.count : 0
    })
    const conversion_count = this.monthlyLandingSeriesData.map((value: any) => {
      let machvalue = this.monthlyConversionData.find((x: any) => x.monthOfYear == value)
      return machvalue ? machvalue.count : 0
    })
    const revenue_count = this.monthlyLandingSeriesData.map((value: any) => {
      let machvalue = this.monthlyRevenueData?.find((x: any) => x.monthOfYear == value)
      return machvalue ? machvalue.count : 0
    })
    const lc = this.monthlyLandingSeriesData.map((value: any) => {
      let machvalue = this.monthlyLandingCountData.find((x: any) => x.monthOfYear == value)
      return machvalue ? machvalue.count : 0
    })
    const cc = this.monthlyLandingSeriesData.map((value: any) => {
      let machvalue = this.monthlyConversionData.find((x: any) => x.monthOfYear == value)
      return machvalue ? machvalue.count : 0
    })
    const rc = this.monthlyLandingSeriesData.map((value: any) => {
      let machvalue = this.monthlyRevenueData?.find((x: any) => x.monthOfYear == value)
      return machvalue ? machvalue.count : 0
    })

    this.monthlyLandingCountData = landing_count;
    this.monthlyConversionData = conversion_count;
    this.monthlyRevenueData = revenue_count;

    let max_num = [];
    max_num[0] = lc[lc.sort((a: any, b: any) => { return a - b }).length - 1]
    max_num[1] = cc[cc.sort((a: any, b: any) => { return a - b }).length - 1]
    max_num[2] = rc[rc.sort((a: any, b: any) => { return a - b }).length - 1]
    this.monthlyMaxLimit = Number(max_num[max_num.sort((a: any, b: any) => { return a - b }).length - 1])

    this.dataCreation();
    this.toggleLineWithDataChart('monthly')
    this._cd.detectChanges()

  }
  day_details: any = {
    "Landing": [], "Conversion": []
  }
  commonDataSetForDaily(data: any, calendarType: string) {
    this.dailyData = data;
    this.dailyLandingSeriesData = [];
    this.dailyLandingCountData = [];
    this.dailyConversionData = [];
    this.dailyRevenueData = []
    if (this.dailyData?.Landing_data?.length > 0) {
      for (let i of this.dailyData.Landing_data) {
        this.day_details.Landing.push(i)
        let monthOfYear = `${i._id.Hour}`;
        this.dailyLandingSeriesData.push(monthOfYear);
        this.dailyLandingCountData.push({ monthOfYear: monthOfYear, count: i.landing_count });
      }
    }
    if (this.dailyData?.Conversion_data?.length > 0) {
      for (let i of this.dailyData?.Conversion_data) {
        this.day_details.Conversion.push(i)
        let monthOfYear = `${i._id.Hour}`;
        let conversion_count = i.count;
        let revenue_count = i.revenue?.$numberDecimal;
        this.dailyLandingSeriesData.push(monthOfYear)
        this.dailyConversionData.push({ monthOfYear: monthOfYear, count: conversion_count });
        this.dailyRevenueData.push({ monthOfYear: monthOfYear, count: revenue_count });
      }
    }

    // if (this.dailyData?.Revenue_data?.length > 0) {
    //   for (let i of this.dailyData.Revenue_data) {
    //     this.day_details.Revenue.push(i);
    //     let monthOfYear = `${i._id.Hour}`;
    //     let revenue_count = i.count;
    //     this.dailyLandingSeriesData.push(monthOfYear)
    //     this.dailyRevenueData.push({ monthOfYear: monthOfYear, count: revenue_count });
    //   }
    // }


    this.dailyConversionData = [...new Set(this.dailyConversionData)];

    this.dailyLandingSeriesData = [...new Set(this.dailyLandingSeriesData)];

    this.dailyLandingSeriesData.sort((a: any, b: any) => { return a - b });


    const landing_count = this.dailyLandingSeriesData.map((value: any) => {
      let machvalue = this.dailyLandingCountData.find((x: any) => x.monthOfYear == value)
      return machvalue ? machvalue.count : 0
    })
    const conversion_count = this.dailyLandingSeriesData.map((value: any) => {
      let machvalue = this.dailyConversionData.find((x: any) => x.monthOfYear == value)
      return machvalue ? machvalue.count : 0
    })
    const revenue_count = this.dailyLandingSeriesData?.map((value: any) => {
      let machvalue = this.dailyRevenueData?.find((x: any) => x.monthOfYear == value)
      return machvalue ? machvalue.count : 0
    })

    const lc = this.dailyLandingSeriesData.map((value: any) => {
      let machvalue = this.dailyLandingCountData.find((x: any) => x.monthOfYear == value)
      return machvalue ? machvalue.count : 0
    })
    const cc = this.dailyLandingSeriesData.map((value: any) => {
      let machvalue = this.dailyConversionData.find((x: any) => x.monthOfYear == value)
      return machvalue ? machvalue.count : 0
    })
    const rc = this.dailyLandingSeriesData?.map((value: any) => {
      let machvalue = this.dailyRevenueData?.find((x: any) => x.monthOfYear == value)
      return machvalue ? machvalue.count : 0
    })
    this.dailyLandingCountData = landing_count;
    this.dailyConversionData = conversion_count;
    this.dailyRevenueData = revenue_count;

    let max_num = [];
    max_num[0] = lc[lc.sort((a: any, b: any) => { return a - b }).length - 1]
    max_num[1] = cc[cc.sort((a: any, b: any) => { return a - b }).length - 1]
    max_num[2] = rc[rc.sort((a: any, b: any) => { return a - b }).length - 1]
    this.dailyMaxLimit = Number(max_num[max_num.sort((a: any, b: any) => { return a - b }).length - 1])

    this.dataCreation();
    this.toggleLineWithDataChart(calendarType)
    this._cd.detectChanges()
  }


  pieChartData: any;
  lineBarChart: any;

  createPieChartData() {
    // console.log(obj)
    // Initialize Chart.js
    // Chart.defaults.global.responsive = true;
    // this.showPieChart = true


    this.pieChartData = {
      labels: ["Internal", "External", "Drop", "Excess"],
      datasets: [
        {
          data: [24, 44, 32, 13],
          backgroundColor: ["#2ab57d", "#5156be", "#fd625e", "#4ba6ef", "#ffbf53"]
        },
      ],
      options: {
        legend: {
          display: true,
          position: 'bottom'
        },
        plugins: {
          labels: {
            render: 'value',
            precision: 0,
            fontSize: 14,
            fontColor: '#fff',
            fontFamily: 'Arial'
          }
        }
      }
    };


    this.lineBarChart = {
      labels: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'Agust'
      ],
      datasets: [
        {
          label: 'Sales Analytics',
          backgroundColor: 'rgba(52, 195, 143, 0.8)',
          borderColor: 'rgba(52, 195, 143, 0.8)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(52, 195, 143, 0.9)',
          hoverBorderColor: 'rgba(52, 195, 143, 0.9)',
          data: [65, 59, 81, 45, 56, 80, 50, 20, 1],
          barPercentage: 0.4

        },
      ],
      options: {
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              gridLines: {
                color: 'rgba(166, 176, 207, 0.1)'
              },
            }
          ],
          yAxes: [
            {
              gridLines: {
                color: 'rgba(166, 176, 207, 0.1)'
              }
            }
          ]
        }
      }
    };
    this._cd.detectChanges()
  }





  getRevnueData = (_tempData: any) => {
    //   let _tempData = [
    //     {
    //         "key": "Standard_Elite",
    //         "ssnRevenue": 90,
    //         "ybcRevenue": 360
    //     },
    //     {
    //         "key": "Standard_Ultra",
    //         "ssnRevenue": 154,
    //         "ybcRevenue": 616
    //     },
    //     {
    //         "key": "Standard_Basic",
    //         "ssnRevenue": 0,
    //         "ybcRevenue": 0
    //     },
    //     {
    //         "key": "Standard_Basic7Drp",
    //         "ssnRevenue": 0,
    //         "ybcRevenue": 0
    //     },
    //     {
    //         "key": "Premium_Elite",
    //         "ssnRevenue": 52,
    //         "ybcRevenue": 208
    //     },
    //     {
    //         "key": "Premium_Ultra",
    //         "ssnRevenue": 40,
    //         "ybcRevenue": 160
    //     },
    //     {
    //         "key": "Premium_Basic",
    //         "ssnRevenue": 0,
    //         "ybcRevenue": 0
    //     },
    //     {
    //         "key": "Premium_BasicDrp",
    //         "ssnRevenue": 0,
    //         "ybcRevenue": 0
    //     }
    // ];

    this._seriesData = [
      {
        "name": "Standard",
        "type": 'column',
        "data": []
      },
      {
        "name": "Premium",
        "type": 'column',
        "data": []
      }
    ];


    let standardAr: any = [];
    let premiumAr: any = [];

    if (_tempData.length > 0) {
      for (let item of _tempData) {
        if (((item.key).toLocaleLowerCase()).indexOf("standard") > -1) {
          standardAr.push(((item["ssnRevenue"])) + ((item["ybcRevenue"])));
        } else if (((item.key).toLocaleLowerCase()).indexOf("premium")) {
          premiumAr.push(((item["ssnRevenue"])) + ((item["ybcRevenue"])));
        }
      }

      this._seriesData[0]["data"] = standardAr;
      this._seriesData[1]["data"] = premiumAr;

    }





    this.planChart = new Chart({
      chart: {
        type: 'column',
        marginTop: 50
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: ['Elite', 'Ultra', 'Basic', 'Basic 7DRP']
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
        verticalAlign: 'top',
        // y: 70,
        floating: true,
        backgroundColor: 'white',
        borderColor: '#CCC',
        borderWidth: 1,
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
                clientId: this.selectedClient
              }
              this.rootPageService.saveRevenueDetailsList(obj)
              this._ngZone.run(() => {
                this.router.navigate(['campaign-revenue-list'])
              })
            }
          }
        }
      },
      series: this._seriesData,
      exporting: {
        buttons: {
          contextButton: {
            menuItems: ['downloadPNG', 'downloadJPEG', 'downloadPDF', 'downloadSVG'],
          },
        },
      }
    });

    this._cd.detectChanges();
  }












  // implementing the High charts

  lineHighChart: any;

  loadLineHighChart(data: any) {
    console.log('chart data : ', data)

    this.showHtmlChart = true;
    let day = data.day;
    let month = data.month;
    this.lineHighChart = new Chart({
      //   chart: {
      //     marginTop: 50
      //   },
      //   title: {
      //     text: ''
      //   },

      //   xAxis: {
      //     categories: data.seriesData,
      //     crosshair: true
      //   },

      //   yAxis: {
      //     title: {
      //       text: 'Count'
      //     }
      //   },

      //   plotOptions: {
      //     series: {
      //       cursor: 'pointer',
      //       events: {
      //         click: (event: any) => {
      //           let y_axis_data = event?.point?.category;
      //           let x_axis_data = event.point.options.y;
      //           let date_title = data.xaxisTitle;
      //           let line_name = event?.point?.series?.name;

      //           let obj: any = {
      //             line_name: line_name,
      //             x_axis_data: x_axis_data,
      //             y_axis_data: y_axis_data,
      //             date_title: date_title,
      //             day: day,
      //             month: month,
      //             clientId: this.selectedClient,
      //             campaignId: this.selectedCampaign
      //           }
      //           this.campaignData$.next(obj);
      //           this.rootPageService.getCampaignData$(obj)
      //           this._ngZone.run(() => {
      //             this.router.navigate(['dashboard/campaign-list-data'])
      //           })
      //         }
      //       }
      //     }
      //   },
      //   credits: {
      //     enabled: false
      // },
      //   series: [{
      //     name: "Landing",
      //     type: 'line',
      //     color : "#4cc8d8",
      //     data: data.data1
      //   },
      //   {
      //     name: "Conversion",
      //     color : "#f4b3ce",
      //     type: 'line',
      //     data: data.data2
      //   }]
      chart: {
        marginTop: 50
      },
      title: {
        text: '',
      },
      credits: {
        enabled: false
      },
      xAxis: [{
        categories: data.seriesData,
        crosshair: true
      }],
      yAxis: [{ // Primary yAxis
        opposite: true,
        title: {
          text: 'Conversion Count',
        }
      }, { // Secondary yAxis  
        title: {
          text: 'Landing Count',
        }
      }],
      tooltip: {
        shared: true
      },
      // legend: {
      //   align: 'left',
      //   x: 80,
      //   verticalAlign: 'top',
      //   y: 80,
      //   floating: true,
      //   backgroundColor:  // theme
      //     'rgba(255,255,255,0.25)'
      // },
      plotOptions: {
        series: {
          cursor: 'pointer',
          events: {
            click: (event: any) => {
              let y_axis_data = event?.point?.category;
              let x_axis_data = event.point.options.y;
              let date_title = data.xaxisTitle;
              let line_name = event?.point?.series?.name;

              let obj: any = {
                line_name: line_name,
                x_axis_data: x_axis_data,
                y_axis_data: y_axis_data,
                date_title: date_title,
                day: day,
                month: month,
                clientId: this.selectedClient,
                campaignId: this.selectedCampaign,
                selectedDay : this.selectedDay
              }
              console.log('data obj>>>>>>>>>> ', obj)
              this.campaignData$.next(obj);
              this.rootPageService.getCampaignData$(obj)
              this._ngZone.run(() => {
                this.router.navigate(['dashboard/campaign-list-data'])
              })
            }
          }
        }
      },
      exporting: {
        buttons: {
          contextButton: {
            menuItems: ['downloadPNG', 'downloadJPEG', 'downloadPDF', 'downloadSVG'],
          },
        },
      },
      series: [{
        name: 'Landing',
        type: 'spline',
        color: '#4cc8d8',
        yAxis: 1,
        data: data.data1


      }, {
        name: 'Conversion',
        type: 'spline',
        color: '#f4b3ce',
        data: data.data2
      }]
    })

    this._cd.detectChanges()
  }


  getRevenue = (type: any) => {
    if (type == "yesterday") {
      let _d = this._date.transform(new Date(), "yyyy-MM-dd");
      this.rootPageService.getRevenuData('YBC', '&day=' + _d).subscribe((res: any) => {
        if (res.status == "200") {

          this.getRevnueData(res.data)
        } else {

          this.getRevnueData([])
        }
      }, (error: any) => {
        this.getRevnueData([])
      });
    } else if (type == "monthly") {
      let _d = this._date.transform(new Date(), "yyyy-MM-dd");
      this.rootPageService.getRevenuData('YBC', '&month=' + _d).subscribe((res: any) => {
        if (res.status == "200") {
          this.getRevnueData(res.data)
        } else {
          this.getRevnueData([])
        }
      }, (error: any) => {
        this.getRevnueData([])
      });
    } else if (type == "total") {
      let _d = this._date.transform(new Date(), "yyyy-MM-dd");
      this.rootPageService.getRevenuData('YBC', '').subscribe((res: any) => {
        if (res.status == "200") {
          this.getRevnueData(res.data)
        } else {
          this.getRevnueData([])
        }
      }, (error: any) => {
        this.getRevnueData([])
      });
    }
  }
  onDayChange() {
    if (this.selectedDay == 'today') {
      this.paramsPipe(null, null, 'today')
    }
    else {
      this.paramsPipe(null, null, 'yesterday')
    }
  }

}
