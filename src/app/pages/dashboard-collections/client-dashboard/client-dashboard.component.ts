import { ChangeDetectionStrategy, Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { RootPageService } from '../../root-page.service';
import { Chart } from 'chart.js'



@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})



export class ClientDashboardComponent implements OnInit {

  breadCrumbItems!: Array<{}>;
  lineWithDataChart: any;
  getCliensList: any;
  getCampaignList: any;
  selectedClient: any = 'null';
  selectedCampaign: any = 'null';
  showHtml: boolean = false;
  isCampaignShow = false;
  pieChartListDATA: any = [];
  showPieChart: any = false;
  showTop5Campaignchart: any = false;
  lineBarChart: any;
  showOptions: boolean = false;
  //pieChart
  pieChartData: any;
  showCon_Rev_Exp: boolean = false



  constructor(private rootservice: RootPageService, private _cd: ChangeDetectorRef) {

  }

  ngOnInit(): void {


    this.breadCrumbItems = [
      { label: 'Dashboard' },
      { label: 'Client Dashboard', active: true }
    ];
    this.getClientDashboardData()

    // calling the line chart method

    //calling the pie chart method 

  }

  createPieChartData(obj: any) {
    console.log(obj)
    // Initialize Chart.js
    Chart.defaults.global.responsive = true;
    this.showPieChart = true


    this.pieChartData = {
      labels: obj.labels,
      datasets: [
        {
          data: obj.data,
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
    this._cd.detectChanges()
  }


  getClientDashboardData() {
    this.rootservice.getClientsList().subscribe((data: any) => {
      console.log(data);
      this.getCliensList = data.Client_Data;
      console.log(this.getCliensList)
      this.showHtml = true;
      this._cd.detectChanges();
    })

  }
  campaignID: any;
  Top5CampaignDetails: any = [];
  getSelectClient() {
    this.showHtml = false;
    this.isCampaignShow = false;
    this.selectedCampaign="null"
    this.rootservice.getClientCampignList(this.selectedClient).subscribe((data: any) => {

      console.log(this.getCampaignList)
      if (data.Campaign_Data.length > 0) {
        this.getCampaignList = data.Campaign_Data;
        this.showHtml = true;
        this.isCampaignShow = true;
        this.campaignID = this.getCampaignList.find((x: any) => x.partnerId == this.selectedClient)._id;
      }
      else {
        alert("No data found !! ");
        this.selectedCampaign = 'null';
      }
      this._cd.detectChanges();
    })
  }

  campaigncount1: boolean = false;
  campaigncount2: boolean = false;
  campaigncount3: boolean = false;

  top5campaign1: boolean = false
  top5campaign2: boolean = false
  top5campaign3: boolean = false

  Conversion_revenue1: boolean = false
  Conversion_revenue2: boolean = false
  Conversion_revenue3: boolean = false

  getSelectCampaign(str: any) {
    this.showHtml = false;
    console.log(this.selectedCampaign);
    let date;
    if (str == 'total') {
      this.showOptions = true
      date = null
      this.top5campaign3 = true
      this.campaigncount3 = true
      this.Conversion_revenue3 = true
      this.getCampaignStatusApiCall(date);
      this.getTop5CampaignListApiCall(date);
      this.getConversionRevenueExpenseApiCall(str)
    }
    this._cd.detectChanges()
  }

  showDataFromCampaignCountChart(str: string) {
    if (str == 'total') {
      let secondParameter = null
      this.campaigncount1 = false;
      this.campaigncount2 = false;
      this.campaigncount3 = true;
      this.getCampaignStatusApiCall(secondParameter);
    }
    else if (str == 'monthly') {
      this.campaigncount1 = false;
      this.campaigncount2 = true;
      this.campaigncount3 = false;
      let secondParameter;
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      secondParameter = `&month=${year}-${month}-${day}`;
      this.getCampaignStatusApiCall(secondParameter);
    }
    else if (str == 'yesterday') {
      this.campaigncount1 = true;
      this.campaigncount2 = false;
      this.campaigncount3 = false;
      let secondParameter;
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate() - 1).padStart(2, '0');
      secondParameter = `&day=${year}-${month}-${day}`;
      this.getCampaignStatusApiCall(secondParameter);
    }
    this._cd.detectChanges()
  }


  showDataFromTop5CampaignChart(str: string) {
    if (str == 'total') {
      let secondParameter = null
      this.top5campaign1 = false;
      this.top5campaign2 = false;
      this.top5campaign3 = true;
      this.getTop5CampaignListApiCall(secondParameter);
    }
    else if (str == 'monthly') {
      this.top5campaign1 = false;
      this.top5campaign2 = true;
      this.top5campaign3 = false;
      let secondParameter;
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      secondParameter = `&month=${year}-${month}-${day}`;
      this.getTop5CampaignListApiCall(secondParameter);
    }
    else if (str == 'yesterday') {
      this.top5campaign1 = true;
      this.top5campaign2 = false;
      this.top5campaign3 = false;
      let secondParameter;
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate() - 1).padStart(2, '0');
      secondParameter = `&day=${year}-${month}-${day}`;
      this.getTop5CampaignListApiCall(secondParameter);
    }
    this._cd.detectChanges()
  }

  getCampaignStatusApiCall(date: any) {
    this.rootservice.getCampaignStatusCount(this.selectedCampaign, date).subscribe((data: any) => {
      console.log(data)
      this.showHtml = true
      if (data.status == 200 && data.data.length > 0) {
        this.pieChartListDATA = data.data;
        let labels: any = [];
        let count: any = [];
        for (let element of this.pieChartListDATA) {
          let item = `${element._id.state} : ${element._id.Month}/${element._id.Year}`;
          let value = element.count
          labels.push(item)
          count.push(value)
        }
        let obj = {
          labels: labels,
          data: count
        }
        this.createPieChartData(obj);
      }
      
      this._cd.detectChanges()
    })
  }

  getTop5CampaignListApiCall(date: any) {
    this.rootservice.getTopFiveCampaignList(this.campaignID, date).subscribe((data: any) => {
      // console.log(data);
      if (data.status == 200 && data.data.length > 0) {
        this.Top5CampaignDetails = data.data;
        let labels: any = []
        let top5data: any = []
        for (let item of this.Top5CampaignDetails) {
          let label;
          if (item._id.Year == (undefined || null)) {
            label = `${item._id.Day}/${item._id.Month}`
          }
          else {
            label = `${item._id.Month}/${item._id.Year}`
          }
          let count = `${item.count}`
          labels.push(label);
          top5data.push(count)
        }
        let obj = {
          labels: labels,
          data: top5data
        }
        this.createBarChartData(obj)
        this._cd.detectChanges()
      }
     
    })

  }
  totalConversion: any = [];
  totalRevenue: any = [];
  totalExpense: any = [];

  getConversionRevenueExpenseApiCall(str: any) {
    let dateof: any;
    // this.showCon_Rev_Exp = true
    if (str == 'total') {
      dateof = null;
      this.Conversion_revenue1 = false
      this.Conversion_revenue2 = false
      this.Conversion_revenue3 = true
    }
    else if (str == 'yesterday') {
      this.Conversion_revenue1 = true
      this.Conversion_revenue2 = false
      this.Conversion_revenue3 = false
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate() - 1).padStart(2, '0');
      const currentDate = `${year}-${month}-${day}`;
      dateof = `&day=${currentDate}`
    }
    else if (str == 'monthly') {
      this.Conversion_revenue1 = false
      this.Conversion_revenue2 = true
      this.Conversion_revenue3 = false
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      const currentDate = `${year}-${month}-${day}`;
      dateof = `&month=${currentDate}`
    }
    this.rootservice.getConversionRevenueExpense(this.campaignID, dateof).subscribe((data: any) => {
      if (data.status == 200 && data.data.Conversion.length > 0) {
        console.log(data.data);
        this.totalConversion = data.data.Conversion
        this.totalRevenue = data.data.Revenue
        this.totalExpense = data.data.Expense

        const conversion_lables: any = [];
        const conv_count_values: any = [];
        const revenue_count_values: any = []
        const expense_count_values: any = []

        for (let i of this.totalConversion) {
          let date;
          if (str == 'monthly') {
            date = `${i._id.Day}/${i._id.Month}`;
          }
          if (str == 'total') {
            date = `${i._id.Month}/${i._id.Year}`;
          }
          if (str == 'yesterday') {
            date = `${i._id.Hour}/${i._id.Day}`;
          }
          let count = i.count;
          conversion_lables.push(date)
          conv_count_values.push(count)
        }

        for (let i of this.totalRevenue) {
          let c = `${i.count}`
          revenue_count_values.push(c)
        }

        for (let i of this.totalExpense) {
          let c = `${i.count}`
          expense_count_values.push(c)
        }

        let obj: any;
        if (str == 'total') {
          obj = {
            seriesData: conversion_lables,
            data1: conv_count_values,
            data2: revenue_count_values,
            data3: expense_count_values,
            xaxisTitle: "Month/Year"
          }
        }
        if (str == 'monthly') {
          obj = {
            seriesData: conversion_lables,
            data1: conv_count_values,
            data2: revenue_count_values,
            data3: expense_count_values,
            xaxisTitle: "Day/Month"
          }
        }
        if (str == 'yesterday') {
          obj = {
            seriesData: conversion_lables,
            data1: conv_count_values,
            data2: revenue_count_values,
            data3: expense_count_values,
            xaxisTitle: "Hour/Day"
          }
        }
        console.log(obj)

        this.createConversionRevenueExpenseLineDataChart(obj);
        this._cd.detectChanges()
      }
    })

  }


  createConversionRevenueExpenseLineDataChart(obj: any) {
    if(obj.seriesData.length > 0){
      this.showCon_Rev_Exp=true
    }
    
    this.lineWithDataChart = {
      chart: {
        height: 380,
        type: 'line',
        zoom: { enabled: !1 },
        toolbar: { show: !1 },
        events: {
          click: (event: any, chartContext: any, config: any) => {
            if (config.seriesIndex !== -1) {
              var line_name = config.config.series[config.seriesIndex].name;
              var x_axis_data = config.config.series[config.seriesIndex].data[config.dataPointIndex];
              var y_axis_data = config.globals.categoryLabels[config.dataPointIndex]
              let obj: any = {
                line_name: line_name,
                x_axis_data: x_axis_data,
                y_axis_data: y_axis_data
              }
              // this.campaignData$.next(obj);
              // this.rootPageService.getCampaignData$(obj)
              // this._ngZone.run(() => {
              //   this.router.navigate(['campaign-list-data'])
              // })

            }
          }
        }
      },
      colors: ['#2ab57d', '#5156be', '#dd7514'],
      dataLabels: { enabled: !1 },
      stroke: { width: [3, 3, 3,], curve: 'straight' },
      series: [
        { name: "Landings", data: obj.data1 },
        { name: "Conversations", data: obj.data2 },
        { name: "Revenue", data: obj.data3 }
      ],
      title: {
        text: "Client",
        align: "left",
        style: { fontWeight: "500" },
      },
      grid: {
        row: { colors: ["transparent", "transparent", "transparent"], opacity: 0.2 },
        borderColor: "#f1f1f1",
      },
      markers: { style: "inverted", size: 0 },
      xaxis: {
        categories: obj.seriesData,
        title: { text: obj.xaxisTitle },
      },
      yaxis: { title: { text: "Count" }, min: 0, max: 100 },
      legend: {
        position: "top",
        horizontalAlign: "center",
        floating: !0,
        offsetY: -25,
        offsetX: -5,
      },
      responsive: [
        {
          breakpoint: 600,
          options: { chart: { toolbar: { show: !1 } }, legend: { show: !1 } },
        },
      ],
    };
    this._cd.detectChanges()
  }

  createBarChartData(obj: any) {

    console.log(obj)
    this.showTop5Campaignchart = true
    this.lineBarChart = {
      labels: obj.labels,
      datasets: [
        {
          label: 'Campaign Count',
          backgroundColor: 'rgba(52, 195, 143, 0.8)',
          borderColor: 'rgba(52, 195, 143, 0.8)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(52, 195, 143, 0.9)',
          hoverBorderColor: 'rgba(52, 195, 143, 0.9)',
          data: obj.data,
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
              },
              ticks: {
                min: 0,
                stepSize: 1
              }
            }
          ]
        }
      }
    };
    this._cd.detectChanges()
  }

}
