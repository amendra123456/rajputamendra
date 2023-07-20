import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { Chart } from "angular-highcharts"
import { RootPageService } from '../../root-page.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { environment } from '../../../../environments/environment';


@Component({
    selector: 'app-top5-campaign',
    templateUrl: './top5-campaign.component.html',
    styleUrls: ['./top5-campaign.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Top5CampaignComponent {

    barChartData: any;
    totalCategoryData: any = [];
    totalSeriesData: any = [];

    monthlyCategoryData: any = [];
    monthlySeriesData: any = []

    dailyCategoryData: any = [];
    dailySeriesData: any = [];

    top5CampaignCheck1: boolean = false;
    top5CampaignCheck2: boolean = false;
    top5CampaignCheck3: boolean = false;

    selectedMatrics: any = "STARTED";

    totalIntialObj: any;
    monthlyIntialObj: any;
    dailyIntialObj: any;

    showHtmlChart: boolean = true;
    current_date: any;
    request_date: any = null;

    monthsList: any = []
    yearsList: any = []
    selectedMonth: any = 'null';
    selectedYear: any = 'null';
    selected_label: string = "Today";
    selectedClient: any = null;
    today_campaign_Check:boolean = true;
    selectedDay:any = 'today';

    constructor(private _cd: ChangeDetectorRef, private service: RootPageService, private _ngZone: NgZone,
        private router: Router, private _date: DatePipe) { }

    ngOnInit() {
        var d = new Date();
        d.setDate(d.getDate() - 1);
        this.current_date = this._date.transform(new Date(d), "yyyy-MM-dd");

        this.monthsList = [
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

        // it should be changed dynamical in future...........................important.......
        // this.yearsList = [2023, 2022, 2021, 2020, 2019, 2018];

        let currentYear: any = this._date.transform(new Date(), "yyyy");
        for (let _i = parseInt(currentYear); _i > 2017; _i--) {
            this.yearsList.push(_i);
        }

        // this.loadIntialData()
        this.toggleUserAsPerRole();
    }

    role: any;

    toggleUserAsPerRole() {
        let role: any = sessionStorage.getItem('roles')
        this.role = JSON.parse(role);
        if (this.role == "SSN") {
            // this.daily_data()
            this.getToDayData()
        }
        else {
            let clientId: any = sessionStorage.getItem('clientId')
            this.selectedClient = JSON.parse(clientId);
            // this.daily_data()
            this.getToDayData()
        }
        this._cd.detectChanges()
    }

    onMonthChange() {
        //selectedMatrics
        this.selectedDay = "null"
        this.today_campaign_Check = false
        this.top5CampaignCheck1 = false;
        this.selectedYear = this.selectedYear == 'null' ? 2023 : this.selectedYear;
        let params = `?month=${this.selectedYear}-${this.selectedMonth}-01&state=${this.selectedMatrics}`;
        if (this.selectedClient != null) { params += `&clientId=${this.selectedClient}` }
        this.selected_label = "month"
        // params = this.selectedMonth == 'null' ?  `?year=${this.selectedYear}-01-01&state=${this.selectedMatrics}` : params
        if (this.selectedMonth == 'null') {
            this.selected_label = "year";
            params = `?year=${this.selectedYear}-01-01&state=${this.selectedMatrics}`;
            if (this.selectedClient != null) { params += `&clientId=${this.selectedClient}` }
        }

        this.service.getTopFiveCampaignListData(params).subscribe((data: any) => {
            if (data.status == 200 && data.data.length > 0) {
                this.loadMonthlyIntialData(data.data);
            }
            else {
                this.loadMonthlyIntialData([]);
            }
        }, (error: any) => {
            this.loadMonthlyIntialData([])
        })

    }
    onYearChange() {
        this.selectedDay = "null"
        this.today_campaign_Check = false
        this.top5CampaignCheck1 = false;

        let params;
        this.selectedMonth = this.selectedYear == 'null' ? "null" : this.selectedMonth;
        // let params = this.selectedYear == "null" ? `?filter=STARTED` : `?year=${this.selectedYear}-01-01&filter=STARTED`
        // let params = this.selectedMonth != "null" ? `?month=${this.selectedMonth}`
        // if(this.selectedMonth != 'null'){
        //    if(this.selectedYear !== 'null'){ params = `?month=${this.selectedYear}-${this.selectedMonth}-01`}
        //    else if(this.selectedYear == 'null'){ params = ''; }
        // }
        if (this.selectedYear == 'null') {
            params = `?state=${this.selectedMatrics}`;
            if (this.selectedClient != null) { params += `&clientId=${this.selectedClient}` }
            this.selected_label = "All";
            this.selectedMonth = "null"
            this.service.getTopFiveCampaignListData(params).subscribe((data: any) => {
                if (data.status == 200 && data.data.length > 0) {
                    this.loadTotalIntialData(data.data);
                    this._cd.detectChanges()
                }
                else {
                    this.loadTotalIntialData([]);

                    this._cd.detectChanges()
                }
            }, (error: any) => {
                this.loadTotalIntialData([]);
            })
        }
        else {
            if (this.selectedMonth == "null") {
                params = `?year=${this.selectedYear}-01-01&state=${this.selectedMatrics}`;
                if (this.selectedClient != null) { params += `&clientId=${this.selectedClient}` }
                this.selected_label = "year"
                this.service.getTopFiveCampaignListData(params).subscribe((data: any) => {
                    if (data.status == 200 && data.data.length > 0) {
                        this.loadTotalIntialData(data.data);
                        this._cd.detectChanges()
                    }
                    else {
                        this.loadTotalIntialData([]);
                        this._cd.detectChanges()
                    }
                }, (error: any) => {
                    this.loadTotalIntialData([]);
                })
            }
            else {
                params = `?month=${this.selectedYear}-${this.selectedMonth}-01&state=${this.selectedMatrics}`;
                if (this.selectedClient != null) { params += `&clientId=${this.selectedClient}` }
                this.selected_label = "month"
                this.service.getTopFiveCampaignListData(params).subscribe((data: any) => {
                    if (data.status == 200 && data.data.length > 0) {
                        this.loadMonthlyIntialData(data.data)
                    }
                    else {
                        this.loadMonthlyIntialData([])
                        this._cd.detectChanges()
                    }
                }, (error: any) => {
                    this.loadMonthlyIntialData([])
                })
            }

        }

    }

    getSelectedMatrics() {
        // this.showHtmlChart = false;
        // this.selectedMonth = 'null';
        // this.selectedYear = 'null';
        // let params: any = `?state=${this.selectedMatrics}`;
        // if (this.selectedClient != null) { params += `&clientId=${this.selectedClient}` }
        // this.selected_label = "All"
        // this.selectedMonth = "null"
        // this.service.getTopFiveCampaignListData(params).subscribe((data: any) => {
        //     if (data.status == 200 && data.data.length > 0) {
        //         this.loadTotalIntialData(data.data);
        //         this._cd.detectChanges()
        //     }
        //     else {
        //         this.loadTotalIntialData([]);
        //         this._cd.detectChanges()
        //     }
        // }, (error: any) => {
        //     this.loadTotalIntialData([]);
        // })
       if(this.today_campaign_Check == true){
        this.getToDayData()
       }
       else if(this.top5CampaignCheck1 == true){
        this.daily_data()
       }
       else if(this.selectedYear != 'null' && this.selectedMonth != 'null'){
        this.onMonthChange()
       }
       else{
        this.onYearChange()
       }


        // const today = new Date();
        // const year = today.getFullYear();
        // const month = String(today.getMonth() + 1).padStart(2, '0');
        // const day = String(today.getDate() - 1).padStart(2, '0');
        // this.current_date = `${year}-${month}-${day}`;

        // // ?state=STARTED&day=2020-10-23
        // let params;
        // params = `?state=${this.selectedMatrics}`
        // this.service.getTopFiveCampaignListData(params).subscribe((data: any) => {
        //     if (data.status == 200) {
        //         this.loadTotalIntialData(data.data);
        //         this._cd.detectChanges()
        //     }
        // })
        // params = `?month=${this.current_date}&state=${this.selectedMatrics}`
        // this.service.getTopFiveCampaignListData(params).subscribe((data: any) => {
        //     if (data.status == 200) {
        //         this.loadMonthlyIntialData(data.data)
        //     }
        // })
        // params = `?day=${this.current_date}&state=${this.selectedMatrics}`
        // this.service.getTopFiveCampaignListData(params).subscribe((data: any) => {
        //     if (data.status == 200) {
        //         this.loadDailyIntialData(data.data)
        //     }
        // })

    }


    // toggleWithTop5CampaignChart(str: any) {

    //     if (str == 'yesterday') {
    //         // this.top5CampaignCheck1 = true;
    //         // this.selectedMonth = "null"
    //         // this.selectedYear = 'null'
    //         // this.selected_label = "yesterday"
    //         // this.top5CampaignCheck2=false;
    //         // this.top5CampaignCheck3=false;
    //         this.createBarChart(this.dailyIntialObj)
    //     }
    //     //  else if(str == 'monthly'){
    //     //     this.top5CampaignCheck1=false
    //     //     this.top5CampaignCheck2=true;
    //     //     this.top5CampaignCheck3=false;
    //     //     this.createBarChart(this.monthlyIntialObj)
    //     //  }
    //     //  else if(str == 'total'){
    //     //     this.top5CampaignCheck1=false;
    //     //     this.top5CampaignCheck2=false;
    //     //     this.top5CampaignCheck3=true;
    //     //     this.createBarChart(this.totalIntialObj)
    //     //  }
    // }

    createBarChart(data: any) {
        console.log(data)
        this.barChartData = new Chart({
            chart: {
                type: 'row',
                inverted: false,
                marginTop: 50
            },
            title: {
                text: '',
                align: 'center'
            },
            credits: {
                enabled: false
            },
            xAxis: {
                categories: data.categoryData
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
                enabled: false,
                // align: 'center',
                // // x: 0,
                // verticalAlign: 'top',
                // // y: -20,
                // floating: true,
                // backgroundColor: 'white',
                // borderColor: '#CCC',
                // borderWidth: 1,
                // shadow: false
            },
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: 'Total: {point.stackTotal}'
                // pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'

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
                            let obj: any = {
                                selected_label: this.selected_label,
                                selected_month: this.selectedMonth,
                                selected_year: this.selectedYear,
                                selected_matrices: this.selectedMatrics,
                                clientId: this.selectedClient,
                                campaignId: event.point.date.campaignName[0]._id,
                                campaignName: event.point.date.campaignName[0].name,
                                other_options: event.point.date
                            }
                            this.service.saveTopFiveCampaignData(obj);

                            this._ngZone.run(() => {
                                this.router.navigate(['dashboard/top5-Campaign-list'])
                            })
                            // http://localhost:9090/api/dashboard/top-five-campaign-detail-list?
                            // year=2020&month=10&campaignId=5f927231421aa975c03b33c4&day=23
                        }
                    },
                },
                
            },
            exporting: {
                buttons: {
                  contextButton: {
                    menuItems: ['downloadPNG', 'downloadJPEG', 'downloadPDF', 'downloadSVG'],
                  },
                },
              },
            series: data.serieseData
            // series:this.totalSeriesData
        });
    }

    loadIntialData() {

        // var d = new Date();
        // d.setDate(d.getDate() - 1);
        // let yesterday_date = this._date.transform(new Date(d), "yyyy-MM-dd");

        // ?state=STARTED&day=2020-10-23
        let params;
        params = `?state=${this.selectedMatrics}`
        if (this.selectedClient != null) { params += `&clientId=${this.selectedClient}` }
        this.service.getTopFiveCampaignListData(params).subscribe((data: any) => {
            if (data.status == 200) {
                this.loadTotalIntialData(data.data);
                this._cd.detectChanges()
            }
        })
        // params = `?month=${current_date}&state=STARTED`
        // this.service.getTopFiveCampaignListData(params).subscribe((data: any) => {
        //     if (data.status == 200) {
        //         this.loadMonthlyIntialData(data.data)
        //     }
        // })

    }

    daily_data() {
        this.showHtmlChart = true
        this.top5CampaignCheck1 = true;
        this.selectedMonth = "null"
        this.selectedYear = 'null'
        this.selected_label = "yesterday"
        this.today_campaign_Check = false

        var d = new Date();
        d.setDate(d.getDate() - 1);
        let yesterday_date = this._date.transform(new Date(d), "yyyy-MM-dd");

        let params = `?day=${yesterday_date}&state=${this.selectedMatrics}`
        if (this.selectedClient != null) { params += `&clientId=${this.selectedClient}` }
        this.service.getTopFiveCampaignListData(params).subscribe((data: any) => {
            if (data.status == 200) {
                this.loadDailyIntialData(data.data)
            }
        })
    }


    loadTotalIntialData(data: any) {
        this.showHtmlChart = true
        this.totalCategoryData = [];
        this.totalSeriesData = [];

        let a: number = 0;
        data.forEach((ele: any) => {
            // let colors: any = ["#b6df6b", "#ec7f7f", "#1a5a63", "#ddcf0aef", "#40384d9a"]
            let colors: any = environment.chartColor //["#4cc8d8", "#35a3d3", "#f4b3ce", "#e2a493", "#ffc8ba"]
            this.totalCategoryData.push(ele.campaignName[0]?.name);
            let obj = { 'y': ele.count, color: colors[a], date: ele, filter: "total" }
            this.totalSeriesData.push(obj)
            a += 1;
        })
        this.totalIntialObj = {
            categoryData: this.totalCategoryData,
            serieseData: [{
                name: this.totalCategoryData,
                type: 'column',
                // values:values.Year, // added in series.userOptions.values
                data: this.totalSeriesData,
                maxPointWidth: 50

            }]
        }
        this.createBarChart(this.totalIntialObj);
        this.top5CampaignCheck3 = true;
        this.showHtmlChart = true;
        this._cd.detectChanges();

    }
    loadMonthlyIntialData(data: any) {
        this.monthlyCategoryData = [];
        this.monthlySeriesData = [];
        // for (let i of data) {
        //     this.monthlyCategoryData.push(String(i.campaignName[0]?.name));
        //     this.monthlySeriesData.push(i.count);
        //   }
        let a: number = 0;
        data.forEach((ele: any) => {
            // let colors: any = ["#b6df6b", "#ec7f7f", "#1a5a63", "#ddcf0aef", "#40384d9a"]
            let colors: any = environment.chartColor
            this.monthlyCategoryData.push(ele.campaignName[0]?.name);
            let obj = { 'y': ele.count, color: colors[a], date: ele, filter: "month" }
            this.monthlySeriesData.push(obj)
            a += 1;
        })
        this.monthlyIntialObj = {
            categoryData: this.monthlyCategoryData,
            serieseData: [{
                name: 'count',
                type: 'column',
                data: this.monthlySeriesData,
                maxPointWidth: 50
            }]
        }
        this.createBarChart(this.monthlyIntialObj)

        this._cd.detectChanges();

    }
    loadDailyIntialData(data: any) {
        this.dailyCategoryData = [];
        this.dailySeriesData = [];

        // for (let i of data) {
        //     this.dailyCategoryData.push(String(i.campaignName[0]?.name));
        //     this.dailySeriesData.push(i.count);
        //   }
        let a: number = 0;
        data.forEach((ele: any) => {
            // let colors: any = ["#b6df6b", "#ec7f7f", "#1a5a63", "#ddcf0aef", "#40384d9a"]
            let colors: any = environment.chartColor
            this.dailyCategoryData.push(ele.campaignName[0]?.name);
            let obj = { 'y': ele.count, color: colors[a], date: ele, filter: "day" }
            this.dailySeriesData.push(obj)
            a += 1;
        })
        this.dailyIntialObj = {
            categoryData: this.dailyCategoryData,
            serieseData: [{
                name: 'count',
                type: 'column',
                data: this.dailySeriesData,
                maxPointWidth: 50
            }]
        }
        this.createBarChart(this.dailyIntialObj)

        this._cd.detectChanges();

    }
    getToDayData() {
        this.showHtmlChart = true
        this.top5CampaignCheck1 = false
        this.selectedMonth = "null"
        this.selectedYear = 'null'
        this.selected_label = "Today"
        this.today_campaign_Check = true

        var d = new Date();
        d.setDate(d.getDate());
        let today_date:any = this._date.transform(new Date(d), "yyyy-MM-dd");

        let params = `?day=${today_date}&state=${this.selectedMatrics}`
        if (this.selectedClient != null) { params += `&clientId=${this.selectedClient}` }
        this.service.getTopFiveCampaignListData(params).subscribe((data: any) => {
            if (data.status == 200) {
                this.loadDailyIntialData(data.data)
            }
        })
    }

     
    onDayChange(){
      if(this.selectedDay == 'today'){
        this.getToDayData()
      }
      else{
        this.daily_data()
      }
    }
}