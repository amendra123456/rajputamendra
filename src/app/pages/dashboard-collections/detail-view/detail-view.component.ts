import { AfterContentInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts'
import { event } from 'jquery';
import { RootPageService } from '../../root-page.service';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailViewComponent implements OnInit {
  $seven_days_landing_list: any = [];
  $total_landing_count: any = 0;
  lineHighChart: any;

  role: any = null;
  selectedClient: any = null

  $total_revenue_count: any = 0;
  line_revenue_chart: any;

  $total_conversion_count: any = 0;
  line_conversion_chart: any;

  $total_conversion_percentage: any = 0;
  line_conversion_percentage_chart: any;

  _movement_landing: any = 0
  _movement_conversion: any = 0;
  _movement_revenue: any = 0;
  _movement_conv_percentage: any = 0

  constructor(private _cd: ChangeDetectorRef, private service: RootPageService) { }

  ngOnInit() {

    this.toggleUserAsPerRole();

  }


  // ngAfterViewInit(): void {
  //   let UKEuro = new Intl.NumberFormat('en-UK', {
  //     style: 'currency',
  //     currency: 'EUR',
  // });
  // this.$total_revenue_count =UKEuro.format(this.$total_revenue_count);
  // this._movement_revenue=UKEuro.format(this._movement_revenue);
  // }

  toggleUserAsPerRole() {
    let role: any = sessionStorage.getItem('roles');
    this.role = JSON.parse(role);
    if (this.role == "SSN") {
      this.laod_landing_data(this.selectedClient);
      this.laod_revenue_data(this.selectedClient);
      this.load_conversion_data(this.selectedClient);
      this.load_conversion_percentage(this.selectedClient)
    }else {
      let clientId: any = sessionStorage.getItem('clientId');
      this.selectedClient = JSON.parse(clientId);
      this.laod_landing_data(this.selectedClient);
      this.laod_revenue_data(this.selectedClient);
      this.load_conversion_data(this.selectedClient);
      this.load_conversion_percentage(this.selectedClient)
    }
    this._cd.detectChanges()
  }

  laod_landing_data(clientId: any) {
    let params = null
    if (clientId !== null) {
      params = `clientId=${clientId}`
    }
    this.service.No_of_landing_data_for_detail_view(params).subscribe((res: any) => {
      if (res.status == 200) {
        this.$total_landing_count = res.data.total_landing;
        
        if(res.data && res.data.seven_days_landing){
          let _data = res.data.seven_days_landing;
          _data.sort((a:any, b:any) => {
            const monthComparison = a._id.Month - b._id.Month;
            if (monthComparison !== 0) {
              return monthComparison;
            } else {
              return a._id.Day - b._id.Day;
            }
          });
          this.$seven_days_landing_list = _data;
        }else{
          this.$seven_days_landing_list = []
        }
       
        this._movement_landing = res.data.seven_day_movement

        let series_data = this.$seven_days_landing_list.map((x: any) => {
          let month:any = x._id.Month < 10 ? `0${x._id.Month}` : `${x._id.Month}`;
          return `${x._id.Day} / ${month}`;
        })
        let data: any = this.$seven_days_landing_list.map((x: any) => {
          return x.count
        })

        this.lineHighChart = new Chart({
          chart: {
            type: 'line'
          },
          credits: {
            enabled: false
          },
          exporting: {
            enabled: false
          },
          title: {
            text: '',
            // enabled:false
          },
          tooltip: {
            enabled: true,
            pointFormat: '{point.y}',
            style: {
              fontSize: '10px',
              padding: '0px',
              maxWidth: '10px',
            }
          },
          xAxis: {
            categories: series_data,
            /* make the x-axis line invisible */
            lineColor: 'transparent',
            visible: false

          },
          yAxis: {
            min: 0,
            /* make all y-axis gridlines invisible */
            gridLineColor: 'transparent',
            visible: false

          },


          plotOptions: { series: { marker: { enabled: false } } },


          series: [{
            name: "Landing",
            type: 'line',
            color: "#4cc8d8",
            data: data,
            showInLegend: false
          }
          ]
        })

        this._cd.detectChanges()
      }
    }, (error: any) => {
      console.log(error)
    })
  }


  laod_revenue_data(clientId: any) {
    let params = null
    if (clientId !== null) {
      params = `clientId=${clientId}`;
    }
    this.service.Total_Revenue_for_detail_view(params).subscribe((res: any) => {
      if (res.status == 200) {
        console.log(res);
        this.$total_revenue_count = res.data.totalRevenue[0].TotalRevenue.$numberDecimal;
        
        this._movement_revenue = res.data.seven_day_movement;


        let Seven_Days_Revenue : any = []
        if(res.data && res.data.Seven_Days_Revenue){
          let _data = res.data.Seven_Days_Revenue;
          _data.sort((a:any, b:any) => {
            const monthComparison = a._id.Month - b._id.Month;
            if (monthComparison !== 0) {
              return monthComparison;
            } else {
              return a._id.Day - b._id.Day;
            }
          });
          Seven_Days_Revenue = _data;
        }else{
          Seven_Days_Revenue = []
        }

        let UKEuro = new Intl.NumberFormat('en-UK', {
          style: 'currency',
          currency: 'GBP',
        });
        this.$total_revenue_count = UKEuro.format(this.$total_revenue_count);
        this._movement_revenue = UKEuro.format(this._movement_revenue);
        this._cd.detectChanges()
        // console.log(`The formated version of ${price} is ${UKEuro.format(price)}`);

        let series_data: any = Seven_Days_Revenue.map((x: any) => {
          console.log("x>>>>>>> ",x);
          //return x._id.Day;
          let month:any = x._id.Month < 10 ? `0${x._id.Month}` : `${x._id.Month}`;
          return `${x._id.Day} / ${month}`;
        })
        // let series_data = this.Seven_Days_Revenue.map((x: any) => {
        //   let month:any = x._id.Month < 10 ? `0${x._id.Month}` : `${x._id.Month}`;
        //   return `${x._id.Day} / ${month}`;
        // })

        let data: any = Seven_Days_Revenue.map((x: any) => {
          return Number(x.revenue)
        })

        this.line_revenue_chart = new Chart({
          chart: {
            type: 'line'
          },
          credits: {
            enabled: false
          },
          exporting: {
            enabled: false
          },
          title: {
            text: '',
            // enabled:false
          },
          tooltip: {
            enabled: true,
            pointFormat: '{point.y}',
            style: {
              fontSize: '10px',
              padding: '0px',
              // minWidth: '5px', // Adjust as needed
              maxWidth: '10px', // Adjust as needed
            }
          },
          xAxis: {
            categories: series_data,
            /* make the x-axis line invisible */
            lineColor: 'transparent',
            visible: false

          },
          yAxis: {
            min: 0,
            /* make all y-axis gridlines invisible */
            gridLineColor: 'transparent',
            visible: false

          },


          plotOptions: { series: { marker: { enabled: false } } },


          series: [{
            name: "Revenue",
            type: 'line',
            color: "#4cc8d8",
            data: data,
            showInLegend: false
          }
          ]
        })

        this._cd.detectChanges();

      }
    }, (error: any) => {
      console.log(error);
    })

  }



  load_conversion_data(clientId: any) {
    let params = null
    if (clientId !== null) {
      params = `clientId=${clientId}`;
    }

    this.service.Total_Conversion_for_detail_view(params).subscribe((data: any) => {
      if (data.status == 200) {
        this.$total_conversion_count = data.data.totalConversion;
        
        this._movement_conversion = data.data.seven_day_movement;
        
        let Seven_Days_Conversion = []
        if( data.data &&  data.data.seven_days_conversion){
          let _data = data.data.seven_days_conversion;
          _data.sort((a:any, b:any) => {
            const monthComparison = a._id.Month - b._id.Month;
            if (monthComparison !== 0) {
              return monthComparison;
            } else {
              return a._id.Day - b._id.Day;
            }
          });
          Seven_Days_Conversion = _data;
        }else{
          Seven_Days_Conversion = [];
        }


        // console.log(Seven_Days_Conversion)
        let series_data: any = Seven_Days_Conversion.map((x: any) => {
          let month:any = x._id.Month < 10 ? `0${x._id.Month}` : `${x._id.Month}`;
          return `${x._id.Day} / ${month}`;
        })
        let conversion_data: any = Seven_Days_Conversion.map((x: any) => {
          return Number(x.count);
        })
        console.log(conversion_data)

        this.line_conversion_chart = new Chart({
          chart: {
            type: 'line'
          },
          credits: {
            enabled: false
          },
          exporting: {
            enabled: false
          },
          title: {
            text: '',
            // enabled:false
          },
          tooltip: {
            enabled: true,
            pointFormat: '{point.y}',
            style: {
              fontSize: '10px',
              padding: '0px',
              // minWidth: '5px', // Adjust as needed
              maxWidth: '10px', // Adjust as needed
            }
          },
          xAxis: {
            categories: series_data,
            /* make the x-axis line invisible */
            lineColor: 'transparent',
            visible: false

          },
          yAxis: {
            min: 0,
            /* make all y-axis gridlines invisible */
            gridLineColor: 'transparent',
            visible: false

          },


          plotOptions: { series: { marker: { enabled: false } } },


          series: [{
            name: "Conversion",
            type: 'line',
            color: "#4cc8d8",
            data: conversion_data,
            showInLegend: false
          }
          ]
        })
        this._cd.detectChanges();


      }
    })

  }

  load_conversion_percentage(clientId: any) {

    let params = null
    if (clientId !== null) {
      params = `clientId=${clientId}`;
    }

    this.service.Total_Conversion_percentage_for_detail_view(params).subscribe((data: any) => {
      if (data.status == 200) {
        this.$total_conversion_percentage = data.data.total_conversion_percentage;
        
        this._movement_conv_percentage = Number(data.data.seven_day_movement);
        let seven_days_conversion_percentage = [];

        if(data.data && data.data.seven_days_conversion_percentage){
          let _data = data.data.seven_days_conversion_percentage;
          _data.sort((a:any, b:any) => {
            const monthComparison = a.month - b.month;
            if (monthComparison !== 0) {
              return monthComparison;
            } else {
              return a.day - b.day;
            }
          });
          seven_days_conversion_percentage = _data;
        }else{
          seven_days_conversion_percentage = []
        }


        //let seven_days_conversion_percentage = data.data.seven_days_conversion_percentage;




        let series_data: any = seven_days_conversion_percentage.map((x: any) => {
          let month:any = x.month < 10 ? `0${x.month}` : `${x.month}`;
          return `${x.day} / ${month}`;
        })
        let conversion_percentage_data: any = seven_days_conversion_percentage.map((x: any) => {
          return Number(x.conversion_percentage);
        })
        console.log(conversion_percentage_data)

        this.line_conversion_percentage_chart = new Chart({
          chart: {
            type: 'line'
          },
          credits: {
            enabled: false
          },
          exporting: {
            enabled: false
          },
          title: {
            text: '',
            // enabled:false
          },
          tooltip: {
            enabled: true,
            pointFormat: '{point.y}',
            style: {
              fontSize: '10px',
              padding: '0px',
              // minWidth: '5px', // Adjust as needed
              maxWidth: '10px', // Adjust as needed
            }
          },
          xAxis: {
            categories: series_data,
            /* make the x-axis line invisible */
            lineColor: 'transparent',
            visible: false

          },
          yAxis: {
            min: 0,
            /* make all y-axis gridlines invisible */
            gridLineColor: 'transparent',
            visible: false

          },


          plotOptions: { series: { marker: { enabled: false } } },


          series: [{
            name: "Conversion",
            type: 'line',
            color: "#4cc8d8",
            data: conversion_percentage_data,
            showInLegend: false
          }
          ]
        })
        this._cd.detectChanges();


      }
    })





  }


}
