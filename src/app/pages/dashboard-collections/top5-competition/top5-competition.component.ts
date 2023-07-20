import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { RootPageService } from '../../root-page.service';
import { Router } from '@angular/router';
import { Chart } from "angular-highcharts"
import { DatePipe } from '@angular/common';



// import {ChartType} from './top5-competitions.model'


@Component({
    selector: 'app-top5-competition',
    templateUrl: './top5-competition.component.html',
    styleUrls: ['./top5-competition.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class Top5CompetitionComponent implements OnInit {
    // showHtmlChart: boolean = false;
    // selectedClient: any = "null"
    // isCampaignShow: boolean = false;
    // selectedCampaign: any = "null";
    // showChart: boolean = false;
    // lineWithDataChart: any;


    // clientList: any;
    // getCampaignList: any;
    // intialTopCompData: any;

    // showHtml: boolean = true;
    // consumerCount: any;

    monthsList: any = []
    yearsList: any = []
    selectedMonth: any = 'null';
    selectedYear: any = 'null';
    selectedMatrix: any = "Landing"
    selectedDropMatrix: any
    pieChartData: any;

    total_consumerCount: any = [];
    monthly_consumerCount: any = [];
    daily_consumerCount: any = [];


    showHtmlChart: boolean = true

    first_radio_Check: boolean = false;
    second_radio_Check: boolean = false;
    third_radio_Check: boolean = false;

    current_date: any;
    filter: any = 'Landing';
    requestDate: any = null;
    current_request_date: any = null
    today_camptition_Check : boolean = false
    selectedDay:any = 'today';
    competion_names:any= [];

    constructor(private service: RootPageService, private _ngZone: NgZone, private router: Router, private _cd: ChangeDetectorRef, private _date: DatePipe) {

    }

    ngOnInit(): void {

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
        let currentYear: any = this._date.transform(new Date(), "yyyy");
        // this.currentYear = currentYear;
        for (let _i = parseInt(currentYear); _i > 2017; _i--) {
            this.yearsList.push(_i);
        }
        // this.yearsList = [2023, 2022, 2021, 2020, 2019, 2018];
        // this.loadClientData()
        // this.dataCreation()
        // this.createChart(this.dataForDifferCharts.total)
        // this.getIntialTopCompetitions();
        //temporary calling

        // this.createPieChartData();
        // var d = new Date();
        // d.setDate(d.getDate() - 1);
        // this.current_date = this._date.transform(new Date(d), "yyyy-MM-dd");
        // this.loadIntialData() 

        this.toggleUserAsPerRole();

    }

    role: any;
    selectedClient: any = null;
    toggleUserAsPerRole() {
        let role: any = sessionStorage.getItem('roles')
        this.role = JSON.parse(role);
        if (this.role == "SSN") {
            // this.get_yesterday_Data()
            this.getToDayData()
        }
        else {
            let clientId: any = sessionStorage.getItem('clientId')
            this.selectedClient = JSON.parse(clientId);
            // this.get_yesterday_Data()
            this.getToDayData()
        }
        this._cd.detectChanges()
    }



    onMonthChange = () => {
        this.first_radio_Check = false
        this.today_camptition_Check =false
        this.selectedDay = "null"
        let params;
        if (this.selectedYear == 'null') {
            if (this.selectedMonth == 'null') {
                params = `?filter=${this.filter}`;
                if (this.selectedClient != null) { params += `&clientId=${this.selectedClient}` }
            }
            else {
                this.selectedYear = 2023;
                params = `?month=${this.selectedYear}-${this.selectedMonth}-01&filter=${this.filter}`;
                if (this.selectedClient != null) { params += `&clientId=${this.selectedClient}` }
            }
        }
        else {
            if (this.selectedMonth != 'null') {
                params = `?month=${this.selectedYear}-${this.selectedMonth}-01&filter=${this.filter}`;
                if (this.selectedClient != null) { params += `&clientId=${this.selectedClient}` }
            }
            else {
                params = `?year=${this.selectedYear}-01-01&filter=${this.filter}`
                if (this.selectedClient != null) { params += `&clientId=${this.selectedClient}` }
            }
        }

        this.requestDate = params;
        this.service.getTopFiveCompetitionForPieChart(params).subscribe((data: any) => {
            let consumer_count: any = [];
            if (data.length > 0) {
                for (let i of data) {
                    let obj = {
                        name: i.competition,
                        y: i.count
                    }
                    consumer_count.push(obj);
                }
                this.competion_names = consumer_count.map((x:any)=>{return x.name})
                this.createPieChartData(consumer_count);
            }
            else {
                this.createPieChartData([])
            }

        }, (error: any) => {
            this.createPieChartData([])
        })
        this._cd.detectChanges();


    }
    
    onYearChange = () => {
        this.selectedDay = "null"
        this.today_camptition_Check =false
        // this.total_consumerCount =[]
        // this.selectedMonth = this.selectedYear == "null" ? "null" : this.selectedMonth ;

        // let params = this.selectedMonth == 'null' ? `?year=${this.selectedYear}-01-01` : `?month=${this.selectedYear}-${this.selectedMonth}-01`;
        // params += `&filter=${this.filter}`;
        // if(this.selectedYear == 'null'){ params = '?filter='+this.filter}

        let params;
        if (this.selectedYear == 'null') {
            this.selectedMonth = 'null'
            params = `?filter=${this.filter}`;
            if (this.selectedClient != null) { params += `&clientId=${this.selectedClient}` }
        }
        else {
            if (this.selectedMonth == 'null') {
                params = `?year=${this.selectedYear}-01-01&filter=${this.filter}`
                if (this.selectedClient != null) { params += `&clientId=${this.selectedClient}` }
            }
            else {
                params = `?month=${this.selectedYear}-${this.selectedMonth}-01&filter=${this.filter}`
                if (this.selectedClient != null) { params += `&clientId=${this.selectedClient}` }
            }
        }
        this.requestDate = params;
        this.service.getTopFiveCompetitionForPieChart(params).subscribe((data: any) => {
            let cosumer_count: any = [];
            if (data.length > 0) {
                for (let i of data) {
                    let obj = {
                        name: i.competition,
                        y: i.count
                    }
                    cosumer_count.push(obj);
                }
               this.competion_names = cosumer_count.map((x:any)=>{return x.name})
                this.createPieChartData(cosumer_count);

                this.showHtmlChart = true;
                this._cd.detectChanges();
            }
            else {
                this.createPieChartData([])
            }
        }, (error: any) => {
            this.createPieChartData([])
        }),
            this.first_radio_Check = false;
        this._cd.detectChanges();

    }




    // total_revenue: any;
    // total_affiliate: any;
    // total_conversions: any
    // total_landings: any
    // total_expense: any
    // total_series_data: any;
    // totalMaxLimit:any;

    // monthly_revenue: any;
    // monthly_affiliate: any;
    // monthly_conversions: any
    // monthly_landings: any
    // monthly_expense: any
    // monthly_series_data: any;
    // monthlyMaxLimit:any;

    // yesterday_revenue: any;
    // yesterday_affiliate: any;
    // yesterday_conversions: any
    // yesterday_landings: any
    // yesterday_expense: any
    // yesterday_series_data: any;
    // yesterdayMaxLimit:any;

    // getIntialTopCompetitions() {
    //     const today = new Date();
    //     const year = today.getFullYear();
    //     const month = String(today.getMonth() + 1).padStart(2, '0');
    //     const day = String(today.getDate() - 1).padStart(2, '0');
    //     const current_date = `${day}/${month}/${year}`;

    //     this.service.getIntialTopCompetitions(null,"total").subscribe((data: any) => {
    //         if (data.affiliate.length > 0 || data.conversion.length > 0 ||
    //             data.expense.length > 0 || data.landing.length > 0 || data.revenue.length > 0) {
    //             this.loadTotalData(data)
    //         }
    //     })
    //     this.service.getIntialTopCompetitions(current_date,"monthly").subscribe((data:any)=>{
    //         if (data.affiliate.length > 0 || data.conversion.length > 0 ||
    //             data.expense.length > 0 || data.landing.length > 0 || data.revenue.length > 0) {
    //             this.loadMonthlyData(data)
    //         }
    //     })
    //     this.service.getIntialTopCompetitions(current_date,"yesterday").subscribe((data:any)=>{
    //         if (data.affiliate.length > 0 || data.conversion.length > 0 ||
    //             data.expense.length > 0 || data.landing.length > 0 || data.revenue.length > 0) {
    //             this.loadYesterdayData(data)
    //         }
    //     })
    // }

    // loadClientData() {
    //     this.service.getClientsList().subscribe((data: any) => {

    //         if (data.Client_Data) {
    //             this.clientList = data.Client_Data;
    //             console.log(this.clientList)
    //         }
    //         this._cd.detectChanges()
    //     })


    // }
    // getSelectClient() {
    //     this.showChart=false;
    //     this.showHtmlChart=false
    //     // this.isCampaignShow = true;
    //     // selectedClient
    //     const today = new Date();
    //     const year = today.getFullYear();
    //     const month = String(today.getMonth() + 1).padStart(2, '0');
    //     const day = String(today.getDate() - 1).padStart(2, '0');
    //     const current_date = `${day}/${month}/${year}`;

    //     this.service.getClientTopCompetitions(this.selectedClient,null,"total").subscribe((data: any) => {
    //         if (data.affiliate.length > 0 || data.conversion.length > 0 ||
    //             data.expense.length > 0 || data.landing.length > 0 || data.revenue.length > 0) {
    //             this.loadTotalData(data)
    //         }
    //     })
    //     this.service.getClientTopCompetitions(this.selectedClient,current_date,"monthly").subscribe((data:any)=>{
    //         if (data.affiliate.length > 0 || data.conversion.length > 0 ||
    //             data.expense.length > 0 || data.landing.length > 0 || data.revenue.length > 0) {
    //             this.loadMonthlyData(data)
    //         }
    //     })
    //     this.service.getClientTopCompetitions(this.selectedClient,current_date,"yesterday").subscribe((data:any)=>{
    //         if (data.affiliate.length > 0 || data.conversion.length > 0 ||
    //             data.expense.length > 0 || data.landing.length > 0 || data.revenue.length > 0) {
    //             this.loadYesterdayData(data)
    //         }
    //     })


    //     this._cd.detectChanges()
    // }
    // getSelectCampaign() {
    //     this.selectedCampaign

    // }

    // toggleLineWithDataChart(str: any) {
    //     this.showChart=false;
    //     if (str == "yesterday") {
    //         this.createChart(this.dataForDifferCharts.yesteday)
    //         this.first_radio_Check = true;
    //         this.second_radio_Check = false
    //         this.third_radio_Check = false
    //     }
    //     else if (str == "monthly") {
    //         this.createChart(this.dataForDifferCharts.monthly)
    //         this.first_radio_Check = false;
    //         this.second_radio_Check = true
    //         this.third_radio_Check = false
    //     }
    //     else if (str == "total") {
    //         this.createChart(this.dataForDifferCharts.total)
    //         this.first_radio_Check = false
    //         this.second_radio_Check = false
    //         this.third_radio_Check = true
    //     }
    //     this._cd.detectChanges()
    // }

    // dataForDifferCharts: any;
    // dataCreation() {
    //     this.dataForDifferCharts = {
    //         yesteday: {
    //             seriesData: this.yesterday_series_data,
    //             data1: this.yesterday_revenue,
    //             data2: this.yesterday_affiliate,
    //             data3: this.yesterday_conversions,
    //             data4: this.yesterday_landings,
    //             data5: this.yesterday_expense,
    //             maxLimit : this.yesterdayMaxLimit,
    //             day: this.day_details,
    //             xaxisTitle : "Hour"
    //         },
    //         monthly: {
    //             seriesData: this.monthly_series_data,
    //             data1: this.monthly_revenue,
    //             data2: this.monthly_affiliate,
    //             data3: this.monthly_conversions,
    //             data4: this.monthly_landings,
    //             data5: this.monthly_expense,
    //             maxLimit : this.monthlyMaxLimit,
    //             month: this.month_details,
    //             xaxisTitle : "Days"
    //         },
    //         total: {
    //             seriesData: this.total_series_data,
    //             data1: this.total_revenue,
    //             data2: this.total_affiliate,
    //             data3: this.total_conversions,
    //             data4:this.total_landings,
    //             data5:this.total_expense,
    //             maxLimit: this.totalMaxLimit,
    //             xaxisTitle:"Year"

    //         }
    //     }
    //     this._cd.detectChanges()
    // }

    // createChart(obj: any) {
    //     console.log(obj)
    //     let k= obj;
    //     let month=obj.month_details;
    //     let day =obj.day_details
    //     this.showHtmlChart = true;
    //     this.showChart = true
    //     this.lineWithDataChart = {
    //         chart: {
    //             height: 380,
    //             type: 'line',
    //             zoom: { enabled: !1 },
    //             toolbar: { show: !1 },
    //             events: {
    //                 click: (event: any, chartContext: any, config: any) => {
    //                     if (config.seriesIndex !== -1) {
    //                         var line_name = config.config.series[config.seriesIndex].name;
    //                         var x_axis_data = config.config.series[config.seriesIndex].data[config.dataPointIndex];
    //                         var y_axis_data = config.globals.categoryLabels[config.dataPointIndex]
    //                         let obj: any = {
    //                             line_name: line_name,
    //                             x_axis_data: x_axis_data,
    //                             y_axis_data: y_axis_data,
    //                             date_title:k.xaxisTitle,
    //                             day:day,
    //                             month:month,
    //                             clientId:this.selectedClient
    //                         }
    //                         // this.campaignData$.next(obj);
    //                         this.service.sendTop5ListData(obj);
    //                         this._ngZone.run(() => {
    //                           this.router.navigate(['top5-competition-list'])
    //                         })

    //                     }
    //                 }
    //             }
    //         },
    //         colors: ['#2ab57d', '#5156be', '#dd7514',"pink","yellow"],
    //         dataLabels: { enabled: !1 },
    //         stroke: { width: [3, 3, 3,3,3], curve: 'straight' },
    //         series: [
    //             { name: "Revenue", data: obj.data1 },
    //             { name: "Affiliate", data: obj.data2 },
    //             { name: "Conversion", data: obj.data3 },
    //             { name: "Landing",data:obj.data4},
    //             { name: "Expense",data:obj.data5}
    //         ],
    //         title: {
    //             text: "Campaign Data",
    //             align: "left",
    //             style: { fontWeight: "500" },
    //         },
    //         grid: {
    //             row: { colors: ["transparent", "transparent", "transparent","transparent","transparent"], opacity: 0.2 },
    //             borderColor: "#f1f1f1",
    //         },
    //         markers: { style: "inverted", size: 0 },
    //         xaxis: {
    //             categories: obj.seriesData,
    //             title: { text: obj.xaxisTitle },
    //         },
    //         yaxis: { title: { text: "Count" }, min: 0, max: obj.maxLimit },
    //         legend: {
    //             position: "top",
    //             horizontalAlign: "center",
    //             floating: !0,
    //             offsetY: -25,
    //             offsetX: -5,
    //         },
    //         responsive: [
    //             {
    //                 breakpoint: 600,
    //                 options: { chart: { toolbar: { show: !1 } }, legend: { show: !1 } },
    //             },
    //         ],
    //     };
    //     this._cd.detectChanges()
    // }

    // loadTotalData(data:any){

    //     let total_revenue = data?.revenue;
    //     let total_affiliate = data?.affiliate
    //     let total_conversions = data?.conversion
    //     let total_landings = data?.landing
    //     let total_expense = data?.expense

    //     // creating the labels for the total
    //     if (total_revenue?.length > 0) {
    //         total_revenue = total_revenue.map((ele: any) => {
    //             return `${ele._id.month}/${ele._id.year}`;
    //         });
    //     }
    //     if (total_affiliate?.length > 0) {
    //         total_affiliate = total_affiliate.map((ele: any) => {
    //             return `${ele._id.month}/${ele._id.year}`;
    //         });
    //     }
    //     if (total_conversions?.length > 0) {
    //         total_conversions = total_conversions.map((ele: any) => {
    //             return `${ele._id.month}/${ele._id.year}`;
    //         });
    //     }
    //     if (total_landings?.length > 0) {
    //         total_landings = total_landings.map((ele: any) => {
    //             return `${ele._id.month}/${ele._id.year}`;
    //         });
    //     }
    //     if (total_expense?.length > 0) {
    //         total_expense = total_expense.map((ele: any) => {
    //             return `${ele._id.month}/${ele._id.year}`;
    //         });
    //     }

    //         let arrays = [total_revenue, total_affiliate, total_conversions, total_landings, total_expense];
    //         this.total_series_data = arrays.reduce((acc, cur) => cur.length > acc.length ? cur : acc, []);

    //         // creating count data
    //         if (total_revenue?.length > 0) {
    //             this.total_revenue = this.total_series_data.map((date: any) => {
    //                 let [month, year] = date.split('/');
    //                 let item = data.revenue.find((d: any) => d._id.month == month && d._id.year == year)?.count
    //                 return item ? item : 0
    //             })
    //         }
    //         if (total_affiliate?.length > 0) {
    //             this.total_affiliate = this.total_series_data.map((date: any) => {
    //                 let [month, year] = date.split('/');
    //                 let item = data.affiliate.find((d: any) => d._id.month == month && d._id.year == year)?.count
    //                 return item ? item : 0
    //             })
    //         }
    //         if (total_conversions?.length > 0) {
    //             this.total_conversions = this.total_series_data.map((date: any) => {
    //                 let [month, year] = date.split('/');
    //                 let item = data.conversion.find((d: any) => d._id.month == month && d._id.year == year)?.count
    //                 return item ? item : 0
    //             })
    //         }
    //         if (total_landings?.length > 0) {
    //             this.total_landings = this.total_series_data.map((date: any) => {
    //                 let [month, year] = date.split('/');
    //                 let item = data.landing.find((d: any) => d._id.month == month && d._id.year == year)?.count
    //                 return item ? item : 0
    //             })
    //         }
    //         if (total_expense?.length > 0) {
    //             this.total_expense = this.total_series_data.map((date: any) => {
    //                 let [month, year] = date.split('/');
    //                 let item = data.expense.find((d: any) => d._id.month == month && d._id.year == year)?.count
    //                 return item ? item : 0
    //             })
    //         }

    //         // for the maxcount
    //         let tr;let ta;let tc;let tl;let te;
    //         if (total_revenue?.length > 0) {
    //             tr = this.total_series_data.map((date: any) => {
    //                 let [month, year] = date.split('/');
    //                 let item = data.revenue.find((d: any) => d._id.month == month && d._id.year == year)?.count
    //                 return item ? item : 0
    //             })
    //         }
    //         if (total_affiliate?.length > 0) {
    //             ta = this.total_series_data.map((date: any) => {
    //                 let [month, year] = date.split('/');
    //                 let item = data.affiliate.find((d: any) => d._id.month == month && d._id.year == year)?.count
    //                 return item ? item : 0
    //             })
    //         }
    //         if (total_conversions?.length > 0) {
    //             tc = this.total_series_data.map((date: any) => {
    //                 let [month, year] = date.split('/');
    //                 let item = data.conversion.find((d: any) => d._id.month == month && d._id.year == year)?.count
    //                 return item ? item : 0
    //             })
    //         }
    //         if (total_landings?.length > 0) {
    //             tl = this.total_series_data.map((date: any) => {
    //                 let [month, year] = date.split('/');
    //                 let item = data.landing.find((d: any) => d._id.month == month && d._id.year == year)?.count
    //                 return item ? item : 0
    //             })
    //         }
    //         if (total_expense?.length > 0) {
    //             te = this.total_series_data.map((date: any) => {
    //                 let [month, year] = date.split('/');
    //                 let item = data.expense.find((d: any) => d._id.month == month && d._id.year == year)?.count
    //                 return item ? item : 0
    //             })
    //         }
    //         // const [tr,ta,tc,tl,te]=[this.total_revenue,this.total_affiliate,this.total_conversions,this.total_landings,this.total_expense]
    //          let max_num = [];

    //         max_num[0] = tr[tr.sort((a: any, b: any) => { return a - b }).length - 1]
    //         max_num[1] = ta[ta.sort((a: any, b: any) => { return a - b }).length - 1]
    //         max_num[2] = tc[tc.sort((a: any, b: any) => { return a - b }).length - 1]
    //         max_num[1] = tl[tl.sort((a: any, b: any) => { return a - b }).length - 1]
    //         max_num[2] = te[te.sort((a: any, b: any) => { return a - b }).length - 1]
    //         this.totalMaxLimit = max_num[max_num.sort((a: any, b: any) => { return a - b }).length - 1]
    //         console.log(this.total_revenue)
    //         console.log(this.total_affiliate)
    //         console.log(this.total_conversions);
    //         console.log(this.total_landings)
    //         console.log(this.total_expense)

    //       this.dataCreation();
    //       this.createChart(this.dataForDifferCharts.total)
    //       this.third_radio_Check=true;
    //       this._cd.detectChanges()

    // }

    // month_details: any = {
    //     "Landings": [], "Conversations": [], "Revenue": [], "Expense":[],"Affiliate":[]
    //   }
    // loadMonthlyData(data:any){ 

    //     let monthly_revenue = data?.revenue;
    //     let monthly_affiliate = data?.affiliate
    //     let monthly_conversions = data?.conversion
    //     let monthly_landings = data?.landing
    //     let monthly_expense = data?.expense

    //     // creating the labels for the total
    //     if (monthly_revenue?.length > 0) {
    //         monthly_revenue = monthly_revenue.map((ele: any) => {
    //             this.month_details.Revenue.push(ele);
    //             return `${ele._id.day}`;
    //         });
    //     }
    //     if (monthly_affiliate?.length > 0) {
    //         monthly_affiliate = monthly_affiliate.map((ele: any) => {
    //             this.month_details.Affiliate.push(ele)
    //             return `${ele._id.day}`;
    //         });
    //     }
    //     if (monthly_conversions?.length > 0) {
    //         monthly_conversions = monthly_conversions.map((ele: any) => {
    //             this.month_details.Conversations.push(ele)
    //             return `${ele._id.day}`;
    //         });
    //     }
    //     if (monthly_landings?.length > 0) {
    //         monthly_landings = monthly_landings.map((ele: any) => {
    //             this.month_details.Landings.push(ele)
    //             return `${ele._id.day}`;
    //         });
    //     }
    //     if (monthly_expense?.length > 0) {
    //         monthly_expense = monthly_expense.map((ele: any) => {
    //             this.month_details.Expense.push(ele)
    //             return `${ele._id.day}`;
    //         });
    //     }

    //         let arrays = [monthly_revenue, monthly_affiliate, monthly_conversions, monthly_landings, monthly_expense];
    //         this.monthly_series_data = arrays.reduce((acc, cur) => cur.length > acc.length ? cur : acc, []);

    //         // creating count data
    //         if (monthly_revenue?.length > 0) {
    //             this.monthly_revenue = this.monthly_series_data.map((date: any) => {
    //                 // let [month, year] = date.split('/');
    //                 let item = data.revenue.find((d: any) => d._id.day == date)?.count
    //                 return item ? item : 0
    //             })
    //         }
    //         if (monthly_affiliate?.length > 0) {
    //             this.monthly_affiliate = this.monthly_series_data.map((date: any) => {
    //                 // let [month, year] = date.split('/');
    //                 let item = data.affiliate.find((d: any) => d._id.day == date)?.count
    //                 return item ? item : 0
    //             })
    //         }
    //         if (monthly_conversions?.length > 0) {
    //             this.monthly_conversions = this.monthly_series_data.map((date: any) => {
    //                 // let [month, year] = date.split('/');
    //                 let item = data.conversion.find((d: any) => d._id.day == date)?.count
    //                 return item ? item : 0
    //             })
    //         }
    //         if (monthly_landings?.length > 0) {
    //             this.monthly_landings = this.monthly_series_data.map((date: any) => {
    //                 // let [month, year] = date.split('/');
    //                 let item = data.landing.find((d: any) => d._id.day == date)?.count
    //                 return item ? item : 0
    //             })
    //         }
    //         if (monthly_expense?.length > 0) {
    //             this.monthly_expense = this.monthly_series_data.map((date: any) => {
    //                 // let [month, year] = date.split('/');
    //                 let item = data.expense.find((d: any) => d._id.day == date)?.count
    //                 return item ? item : 0
    //             })
    //         }

    //         // for the maxcount
    //         let tr;let ta;let tc;let tl;let te;
    //         if (monthly_revenue?.length > 0) {
    //             tr = this.monthly_series_data.map((date: any) => {
    //                 // let [month, year] = date.split('/');
    //                 let item = data.revenue.find((d: any) => d._id.day == date)?.count
    //                 return item ? item : 0
    //             })
    //         }
    //         if (monthly_affiliate?.length > 0) {
    //             ta = this.monthly_series_data.map((date: any) => {
    //                 // let [month, year] = date.split('/');
    //                 let item = data.affiliate.find((d: any) => d._id.day == date)?.count
    //                 return item ? item : 0
    //             })
    //         }
    //         if (monthly_conversions?.length > 0) {
    //             tc = this.monthly_series_data.map((date: any) => {
    //                 // let [month, year] = date.split('/');
    //                 let item = data.conversion.find((d: any) => d._id.day == date)?.count
    //                 return item ? item : 0
    //             })
    //         }
    //         if (monthly_landings?.length > 0) {
    //             tl = this.monthly_series_data.map((date: any) => {
    //                 // let [month, year] = date.split('/');
    //                 let item = data.landing.find((d: any) => d._id.day == date)?.count
    //                 return item ? item : 0
    //             })
    //         }
    //         if (monthly_expense?.length > 0) {
    //             te = this.monthly_series_data.map((date: any) => {
    //                 // let [month, year] = date.split('/');
    //                 let item = data.expense.find((d: any) => d._id.day == date)?.count
    //                 return item ? item : 0
    //             })
    //         }
    //         // const [tr,ta,tc,tl,te]=[this.total_revenue,this.total_affiliate,this.total_conversions,this.total_landings,this.total_expense]
    //          let max_num = [];

    //         max_num[0] = tr[tr.sort((a: any, b: any) => { return a - b }).length - 1]
    //         max_num[1] = ta[ta.sort((a: any, b: any) => { return a - b }).length - 1]
    //         max_num[2] = tc[tc.sort((a: any, b: any) => { return a - b }).length - 1]
    //         max_num[1] = tl[tl.sort((a: any, b: any) => { return a - b }).length - 1]
    //         max_num[2] = te[te.sort((a: any, b: any) => { return a - b }).length - 1]
    //         this.monthlyMaxLimit = max_num[max_num.sort((a: any, b: any) => { return a - b }).length - 1]

    //       this.dataCreation();
    //     //   this.createChart(this.dataForDifferCharts.monthly)
    //     //   this.second_radio_Check=true;
    //       this._cd.detectChanges()

    // }
    // day_details: any = {
    //     "Landings": [], "Conversations": [], "Revenue": [], "Expense":[],"Affiliate":[]
    //   }

    // loadYesterdayData(data:any){ 

    //     let yesterday_revenue = data?.revenue;
    //     let yesterday_affiliate = data?.affiliate
    //     let yesterday_conversions = data?.conversion
    //     let yesterday_landings = data?.landing
    //     let yesterday_expense = data?.expense

    //     // creating the labels for the total
    //     if (yesterday_revenue?.length > 0) {
    //         yesterday_revenue = yesterday_revenue.map((ele: any) => {
    //             this.day_details.Revenue.push(ele)
    //             return `${ele._id.day}`;
    //         });
    //     }
    //     if (yesterday_affiliate?.length > 0) {
    //         yesterday_affiliate = yesterday_affiliate.map((ele: any) => {
    //             this.day_details.Affiliate.push(ele)
    //             return `${ele._id.day}`;
    //         });
    //     }
    //     if (yesterday_conversions?.length > 0) {
    //         yesterday_conversions = yesterday_conversions.map((ele: any) => {
    //             this.day_details.Conversations.push(ele)
    //             return `${ele._id.day}`;
    //         });
    //     }
    //     if (yesterday_landings?.length > 0) {
    //         yesterday_landings = yesterday_landings.map((ele: any) => {
    //             this.day_details.Landings.push(ele)
    //             return `${ele._id.day}`;
    //         });
    //     }
    //     if (yesterday_expense?.length > 0) {
    //         yesterday_expense = yesterday_expense.map((ele: any) => {
    //             this.day_details.Expense.push(ele)
    //             return `${ele._id.day}`;
    //         });
    //     }

    //         let arrays = [yesterday_revenue, yesterday_affiliate, yesterday_conversions, yesterday_landings,yesterday_expense];
    //         this.yesterday_series_data = arrays.reduce((acc, cur) => cur.length > acc.length ? cur : acc, []);

    //         // creating count data
    //         if (yesterday_revenue?.length > 0) {
    //             this.yesterday_revenue = this.yesterday_series_data.map((date: any) => {
    //                 // let [month, year] = date.split('/');
    //                 let item = data.revenue.find((d: any) => d._id.day == date)?.count
    //                 return item ? item : 0
    //             })
    //         }
    //         if (yesterday_affiliate?.length > 0) {
    //             this.yesterday_affiliate = this.yesterday_series_data.map((date: any) => {
    //                 // let [month, year] = date.split('/');
    //                 let item = data.affiliate.find((d: any) => d._id.day == date)?.count
    //                 return item ? item : 0
    //             })
    //         }
    //         if (yesterday_conversions?.length > 0) {
    //             this.yesterday_conversions = this.yesterday_series_data.map((date: any) => {
    //                 // let [month, year] = date.split('/');
    //                 let item = data.conversion.find((d: any) => d._id.day == date)?.count
    //                 return item ? item : 0
    //             })
    //         }
    //         if (yesterday_landings?.length > 0) {
    //             this.yesterday_landings = this.yesterday_series_data.map((date: any) => {
    //                 // let [month, year] = date.split('/');
    //                 let item = data.landing.find((d: any) => d._id.day == date)?.count
    //                 return item ? item : 0
    //             })
    //         }
    //         if (yesterday_expense?.length > 0) {
    //             this.yesterday_expense = this.yesterday_series_data.map((date: any) => {
    //                 // let [month, year] = date.split('/');
    //                 let item = data.expense.find((d: any) => d._id.day == date)?.count
    //                 return item ? item : 0
    //             })
    //         }

    //         // for the maxcount
    //         let tr;let ta;let tc;let tl;let te;
    //         if (yesterday_revenue?.length > 0) {
    //             tr = this.yesterday_series_data.map((date: any) => {
    //                 // let [month, year] = date.split('/');
    //                 let item = data.revenue.find((d: any) => d._id.day == date)?.count
    //                 return item ? item : 0
    //             })
    //         }
    //         if (yesterday_affiliate?.length > 0) {
    //             ta = this.yesterday_series_data.map((date: any) => {
    //                 // let [month, year] = date.split('/');
    //                 let item = data.affiliate.find((d: any) => d._id.day == date)?.count
    //                 return item ? item : 0
    //             })
    //         }
    //         if (yesterday_conversions?.length > 0) {
    //             tc = this.yesterday_series_data.map((date: any) => {
    //                 // let [month, year] = date.split('/');
    //                 let item = data.conversion.find((d: any) => d._id.day == date)?.count
    //                 return item ? item : 0
    //             })
    //         }
    //         if (yesterday_landings?.length > 0) {
    //             tl = this.yesterday_series_data.map((date: any) => {
    //                 // let [month, year] = date.split('/');
    //                 let item = data.landing.find((d: any) => d._id.day == date)?.count
    //                 return item ? item : 0
    //             })
    //         }
    //         if (yesterday_expense?.length > 0) {
    //             te = this.yesterday_series_data.map((date: any) => {
    //                 // let [month, year] = date.split('/');
    //                 let item = data.expense.find((d: any) => d._id.day == date)?.count
    //                 return item ? item : 0
    //             })
    //         }
    //         // const [tr,ta,tc,tl,te]=[this.total_revenue,this.total_affiliate,this.total_conversions,this.total_landings,this.total_expense]
    //          let max_num = [];

    //         max_num[0] = tr[tr.sort((a: any, b: any) => { return a - b }).length - 1]
    //         max_num[1] = ta[ta.sort((a: any, b: any) => { return a - b }).length - 1]
    //         max_num[2] = tc[tc.sort((a: any, b: any) => { return a - b }).length - 1]
    //         max_num[1] = tl[tl.sort((a: any, b: any) => { return a - b }).length - 1]
    //         max_num[2] = te[te.sort((a: any, b: any) => { return a - b }).length - 1]
    //         this.yesterdayMaxLimit = max_num[max_num.sort((a: any, b: any) => { return a - b }).length - 1]


    //       this.dataCreation();
    //       this._cd.detectChanges()

    // }






    loadIntialData() {


        let params;
        params = `?filter=${this.filter}`;
        if (this.selectedClient != null) { params += `&clientId=${this.selectedClient}` }
        this.service.getTopFiveCompetitionForPieChart(params).subscribe((data: any) => {
            // console.log(data, "getTopFiveCompetitionForPieChart....total.....");
            if (data.length > 0) {

                for (let i of data) {
                    let obj = {
                        name: i.competition,
                        y: i.count
                    }
                    this.total_consumerCount.push(obj);
                }
                this.createPieChartData(this.total_consumerCount);
                // this.third_radio_Check = true;
                this.showHtmlChart = true;
                this._cd.detectChanges();
            }
        })

        // this.get_yesterday_Data();

        // date formate for yesterday;
        // params = `?month=${this.current_date}&filter=${this.filter}`;
        // this.service.getTopFiveCompetitionForPieChart(params).subscribe((data: any) => {
        //     // console.log(data, "getTopFiveCompetitionForPieChart......month......");
        //     if (data.length > 0) {
        //         for (let i of data) {
        //             let obj = {
        //                 name: i.competition,
        //                 y: i.count
        //             }
        //             this.monthly_consumerCount.push(obj);
        //         }
        //         this._cd.detectChanges();
        //     }

        // })
    }

    get_yesterday_Data() {
      

        this.showHtmlChart = true
        this.today_camptition_Check =false
        this.first_radio_Check = true;
        console.log('yesterday', this.first_radio_Check)
       
        console.log('yesterday', this.requestDate)

        this.selectedMonth = 'null'
        this.selectedYear = 'null'

        this.daily_consumerCount = [];
        var d = new Date();
        d.setDate(d.getDate() - 1);
        let datePrint = this._date.transform(new Date(d), "yyyy-MM-dd");
        this.requestDate = 'yesterday'
        let params = `?day=${datePrint}&filter=${this.filter}`;
        if (this.selectedClient != null) { params += `&clientId=${this.selectedClient}` }
        this.service.getTopFiveCompetitionForPieChart(params).subscribe((data: any) => {
            if (data.length > 0) {
                for (let i of data) {
                    let obj = {
                        name: i.competition,
                        y: i.count
                    }
                    this.daily_consumerCount.push(obj);
                }
                this.competion_names = this.daily_consumerCount.map((x:any)=>{return x.name})
                this.createPieChartData(this.daily_consumerCount);
                this._cd.detectChanges();
            }
        })
    }

    loadSelectedData() {
        this.total_consumerCount = [];
        this.monthly_consumerCount = [];
        this.daily_consumerCount = [];

        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate() - 1).padStart(2, '0');
        const current_date = `${year}-${month}-${day}`;

        // ?month=2021-02-22&day=2020-09-10&filter=Revenue
        let params;
        params = `?filter=${this.selectedMatrix}`;
        if (this.selectedClient != null) { params += `&clientId=${this.selectedClient}` }
        this.service.getTopFiveCompetitionForPieChart(params).subscribe((data: any) => {
            // console.log(data, "getTopFiveCompetitionForPieChart....total.....");
            if (data.length > 0) {

                for (let i of data) {
                    let obj = {
                        name: i.competition,
                        y: i.count
                    }
                    this.total_consumerCount.push(obj);
                }
                this.createPieChartData(this.total_consumerCount);
                this.third_radio_Check = true;
                this.showHtmlChart = true;
                this._cd.detectChanges();
            }
        })
        params = `?month=${current_date}&filter=${this.selectedMatrix}`;
        if (this.selectedClient != null) { params += `&clientId=${this.selectedClient}` }
        this.service.getTopFiveCompetitionForPieChart(params).subscribe((data: any) => {
            // console.log(data, "getTopFiveCompetitionForPieChart......month......");
            if (data.length > 0) {
                for (let i of data) {
                    let obj = {
                        name: i.competition,
                        y: i.count
                    }
                    this.monthly_consumerCount.push(obj);
                }
                this._cd.detectChanges();
            }

        })
        params = `?day=${current_date}&filter=${this.selectedMatrix}`;
        if (this.selectedClient != null) { params += `&clientId=${this.selectedClient}` }
        this.service.getTopFiveCompetitionForPieChart(params).subscribe((data: any) => {
            // console.log(data, "getTopFiveCompetitionForPieChart.........day.......");
            if (data.length > 0) {
                for (let i of data) {
                    let obj = {
                        name: i.competition,
                        y: i.count
                    }
                    this.daily_consumerCount.push(obj);
                }
                this._cd.detectChanges();
            }
        })
    }

    getSelectMatrics() {

        // this.requestDate = null
        this.filter = this.selectedMatrix;
        //   this.onMonthChange()
        //   this.onYearChange()
        // this.loadSelectedData();
        if (this.first_radio_Check == true) {
            this.get_yesterday_Data()
        }
        else if(this.today_camptition_Check == true) {
           this.getToDayData()
        }
       else if(this.selectedYear != 'null' && this.selectedMonth != 'null'){
        this.onMonthChange()
       }
       else{
        this.onYearChange()
       }
      



    }

    getSelectDropMatrics() {
        // console.log(this.selectedDropMatrix)
    }
    // toggleWithDataChart(str: any) {

    //     // if (str == "total") {
    //     //     this.first_radio_Check = false;
    //     //     this.second_radio_Check = false;
    //     //     this.third_radio_Check = true;
    //     //     this.requestDate = null;
    //     //     this.createPieChartData(this.total_consumerCount);

    //     // }
    //     // else if (str == "monthly") {
    //     //     this.first_radio_Check = false;
    //     //     this.second_radio_Check = true;
    //     //     this.third_radio_Check = false;
    //     //     this.requestDate = `month=${this.current_date}`;
    //     //     this.createPieChartData(this.monthly_consumerCount);
    //     // }
    //     // else if (str == "yesterday") {
    //         const date = new Date();
    //         // const originalDay = date.getDate();
    //         // const newDay = originalDay - 1;

    //         this.get_yesterday_Data();

    //         this.first_radio_Check = true;
    //         console.log('yesterday',this.first_radio_Check)
    //     //     this.second_radio_Check = false;
    //     //     this.third_radio_Check = false;
    //         this.requestDate = `day=${this.current_date}`;
    //         console.log('yesterday',this.requestDate)

    //         this.selectedMonth='null'
    //         this.selectedYear='null'
    //         this._cd.detectChanges()
    //     // }

    // }


    createPieChartData(data: any) {
        //
       // console.log("data>>>>>>>>>>>>>>>>>>>TODAYYYY",data);
        // let params = `?filter=landing`;
        // let competitionName:any=[];

        // let params=`?productName=${this.basicData.productName}&filter=${this.basicData.filter}`;
        //  params = `?productName=${this.basicData.productName}&filter=${this.basicData.filter}`;

        // this.service.getTopFiveCompetitionForPieChart(params).subscribe((data: any) => {
        //     console.log("DATA>>>>>>>>>>>>",data);
        //      if(data.length>0){
        //         for(let i=0;i<data.length;i++){
        //             competitionName.push(data[i].competition);
        //         }

        //      }
        //      console.log("Competition name>>>>>>>",competitionName);
        //     sessionStorage.setItem("competitionName",competitionName)
        // })

        this.showHtmlChart = true;
        this.pieChartData = new Chart({
            chart: {
                plotBackgroundColor: "",
                plotBorderWidth: 0,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: '',
                align: 'center'
            },
            credits: {
                enabled: false
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b><br>count :{point.y}'
            },
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
                    // colors: ["#2ab57d", "#5156be", "#fd625e", "#4ba6ef", "#ffbf53", 'pink'],
                    colors: ["#4cc8d8", "#35a3d3", "#f4b3ce", "#e2a493", "#ffc8ba", "#74c0e1"],
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
                        // distance: -50,
                        filter: {
                            property: 'percentage',
                            operator: '>',
                            value: 4
                        }
                    }
                },
                series: {
                    cursor: 'pointer',
                    events: {
                        click: (event: any) => {
                            let obj = {
                                request_date: this.requestDate ? this.requestDate : null,
                                filter: this.filter,
                                productName: event.point.options.name,
                                clientId: this.selectedClient,
                                competition_names:this.competion_names 
                            }
                            
                            this.service.saveTopFiveCompetitionApiParams(obj);
                            this._ngZone.run(() => {
                                this.router.navigate(['dashboard/top5-competition-list']);
                            })
                            // month=2021-02-22&day=2020-09-10&filter=Landing&productName=iPhoneX;

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
                type: 'pie',
                name: 'Share',
                data: data
            }]
        });

        this._cd.detectChanges()
    }

    getToDayData() {
        this.showHtmlChart = true
        this.first_radio_Check = false;
        this.today_camptition_Check = true
        this.selectedMonth = 'null'
        this.selectedYear = 'null'
        this.daily_consumerCount = [];
        var d = new Date();
        d.setDate(d.getDate());
        let datePrint = this._date.transform(new Date(d), "yyyy-MM-dd");
        this.requestDate = `today`;
        let params = `?day=${datePrint}&filter=${this.filter}`;
        if (this.selectedClient != null) { params += `&clientId=${this.selectedClient}` }
        this.service.getTopFiveCompetitionForPieChart(params).subscribe((data: any) => {
            // console.log(data, "getTopFiveCompetitionForPieChart.........day.......");
            if (data.length > 0) {
                for (let i of data) {
                    let obj = {
                        name: i.competition,
                        y: i.count
                    }
                    this.daily_consumerCount.push(obj);
                }
                this.competion_names = this.daily_consumerCount.map((x:any)=>{return x.name})
                this.createPieChartData(this.daily_consumerCount);
                this._cd.detectChanges();
            }
        })
    }


    onDayChange(){
      if(this.selectedDay == 'today'){
        this.getToDayData()
      }
      else{
        this.get_yesterday_Data()
      }
    }
}
