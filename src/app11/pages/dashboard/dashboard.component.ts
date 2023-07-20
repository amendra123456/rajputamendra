import { Component, OnInit, NgZone,ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';
// import { OwlOptions } from 'ngx-owl-carousel-o';
// import { circle, latLng, tileLayer } from 'leaflet';
// import { walletOverview, investedOverview, marketOverview, walletlineChart, tradeslineChart, investedlineChart, profitlineChart, recentActivity, News, transactionsAll, transactionsBuy, transactionsSell } from './data';
// import { ChartType, lineWithDataChartType } from './dashboard.model';
// import { BehaviorSubject, Subject } from 'rxjs';
import { RootPageService } from '../root-page.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush,
})

/**
 *  Dashboard Component
 */
export class DashboardComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  isSSNUser:boolean = false;
  isYBCUser:boolean= false;
  role:any;

  

  constructor(private router: Router, private rootPageService: RootPageService, private _ngZone: NgZone,
    private _cd:ChangeDetectorRef) {
  }


  ngOnInit(): void {
    /**
     * BreadCrumb 
     */
    this.toggleOn_RoleBase();
    

    this.breadCrumbItems = [
      { label: 'Dashboard' },
      { label: 'Qucik View', active: true }
    ];
    
  }
 
  toggleOn_RoleBase(){
    let value:any =sessionStorage.getItem('roles');
    this.role = JSON.parse(value)
   
    if (this.role == "SSN"){
        this.isSSNUser = true;
        this.isYBCUser = true;
        this._cd.detectChanges()
    } 
    else{
      this.isYBCUser = true;
      this.isSSNUser = false;
      this._cd.detectChanges()
    }
  }
  // /**
  //  * Fetches the data
  //  */
  // // total landing, conversion and revenue data variables list
  // totalLandingSeriesData: any;
  // totalLandingCountData: any;
  // totalConversionData: any;
  // totalConversionMainList: any = [];

  // // monthly landing, conversion and revenue data variables list
  // monthlyLandingSeriesData: any;
  // monthlyLandingCountData: any;
  // monthlyConversionData: any;
  // monthlyConversionMainList: any = [];

  // // daily landing, conversion and revenue data variables list
  // dailyLandingSeriesData: any;
  // dailyLandingCountData: any;
  // dailyConversionData: any;
  // dailyConversionMainList: any = [];


  // private fetchData() {
  //   this.walletOverview = walletOverview;
  //   this.investedOverview = investedOverview;
  //   this.marketOverview = marketOverview;
  //   this.walletlineChart = walletlineChart;
  //   this.tradeslineChart = tradeslineChart;
  //   this.investedlineChart = investedlineChart;
  //   this.profitlineChart = profitlineChart;
  //   this.recentActivity = recentActivity;
  //   this.News = News;
  //   this.transactionsAll = transactionsAll;
  //   this.transactionsBuy = transactionsBuy;
  //   this.transactionsSell = transactionsSell;
  //   this._cd.detectChanges();
  // }
  // dataCreation() {
  //   this.dataForDifferCharts = {
  //     yesteday: {
  //       seriesData: this.dailyLandingSeriesData,
  //       data1: this.dailyLandingCountData,
  //       data2: this.dailyConversionMainList,
  //       data3: [0,0,0,0,0,0,0,0,0],
  //       xaxisTitle: "Hours"
  //     },
  //     monthly: {
  //       seriesData: this.monthlyLandingSeriesData,
  //       data1: this.monthlyLandingCountData,
  //       data2: this.monthlyConversionMainList,
  //       data3: [0,0,0,0,0,0,0,0,0],
  //       xaxisTitle: "Days"
  //     },
  //     total: {
  //       seriesData: this.totalLandingSeriesData,
  //       data1: this.totalLandingCountData,
  //       data2: this.totalConversionMainList,
  //       data3: [0,0,0,0,0,0,0,0,0,0],
  //       xaxisTitle: "Months"
  //     }
  //   }
  //   this._cd.detectChanges();
  // }

  // resetChart() {

  //   this.toggleLineWithDataChart(this.toggledRadioValue)
  //   this._cd.detectChanges();
  // }
  // first_radio_Check: boolean = false
  // second_radio_Check: boolean = false
  // third_radio_Check: boolean = false
  // toggleLineWithDataChart(str: any) {
  //   this.toggledRadioValue = str;
  //   if (str == '') {
  //     str = 'yesterday'
  //   }
  //   if (str == 'yesterday') {
  //     this.createlineWithDataChart(this.dataForDifferCharts.yesteday)
  //     this.first_radio_Check = true
  //     this.second_radio_Check = false
  //     this.third_radio_Check = false

  //   }
  //   if (str == 'monthly') {
  //     this.first_radio_Check = false
  //     this.second_radio_Check = true
  //     this.third_radio_Check = false
  //     this.createlineWithDataChart(this.dataForDifferCharts.monthly)

  //   }
  //   if (str == 'total') {
  //     this.createlineWithDataChart(this.dataForDifferCharts.total)
  //     this.first_radio_Check = false
  //     this.second_radio_Check = false
  //     this.third_radio_Check = true
  //   }
  //   this._cd.detectChanges();
  // }

  // createlineWithDataChart(obj: any) {
  //   this.lineWithDataChart = {
  //     chart: {
  //       height: 380,
  //       type: 'line',
  //       zoom: { enabled: !1 },
  //       toolbar: { show: !1 },
  //       events: {
  //         click: (event: any, chartContext: any, config: any) => {
  //           if (config.seriesIndex !== -1) {
  //             var line_name = config.config.series[config.seriesIndex].name;
  //             var x_axis_data = config.config.series[config.seriesIndex].data[config.dataPointIndex];
  //             var y_axis_data = config.globals.categoryLabels[config.dataPointIndex]
  //             let obj: any = {
  //               line_name: line_name,
  //               x_axis_data: x_axis_data,
  //               y_axis_data: y_axis_data
  //             }
  //             this.campaignData$.next(obj);
  //             this.rootPageService.getCampaignData$(obj)
  //             this._ngZone.run(() => {
  //               console.log("this is campaign-list-data")
  //               this.router.navigate(['campaign-list-data'])
  //             })
  //             this._cd.detectChanges();
  //           }
  //         }
  //       }
  //     },
  //     colors: ['#2ab57d', '#5156be', '#dd7514'],
  //     dataLabels: { enabled: !1 },
  //     stroke: { width: [3, 3, 3,], curve: 'straight' },
  //     series: [
  //       { name: "Landings", data: obj.data1 },
  //       { name: "Conversations", data: obj.data2 },
  //       { name: "Revenue", data: obj.data3 }
  //     ],
  //     title: {
  //       text: "Average High & Low Data",
  //       align: "left",
  //       style: { fontWeight: "500" },
  //     },
  //     grid: {
  //       row: { colors: ["transparent", "transparent", "transparent"], opacity: 0.2 },
  //       borderColor: "#f1f1f1",
  //     },
  //     markers: { style: "inverted", size: 0 },
  //     xaxis: {
  //       categories: obj.seriesData,
  //       title: { text: obj.xaxisTitle },
  //     },
  //     yaxis: { title: { text: "Range" }, min: 0, max: 3000 },
  //     legend: {
  //       position: "top",
  //       horizontalAlign: "right",
  //       floating: !0,
  //       offsetY: -25,
  //       offsetX: -5,
  //     },
  //     responsive: [
  //       {
  //         breakpoint: 600,
  //         options: { chart: { toolbar: { show: !1 } }, legend: { show: !1 } },
  //       },
  //     ],
  //   };
  //   this._cd.detectChanges();
  // }
  
}