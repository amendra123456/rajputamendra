import { Component, OnInit ,ChangeDetectionStrategy,ChangeDetectorRef} from '@angular/core';
import { RootPageService } from '../../root-page.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-affiliate-dashbord',
  templateUrl: './affiliate-dashbord.component.html',
  styleUrls: ['./affiliate-dashbord.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class AffiliateDashbordComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  showHtml: boolean = false
  AffiliateList: any = [];
  selectedAffiliateId: any = null
  current_date: any;
  lineWithDataChart:any;
  first_radio_Check: boolean = false;
  second_radio_Check: boolean = false;
  third_radio_Check: boolean = false;
  showLineDataChart:boolean=false;
  toggleButtons:boolean=false;
  constructor(private service: RootPageService,private toster: ToastrService,private _cd:ChangeDetectorRef,
    private _date : DatePipe) {

  }

  ngOnInit(): void {

    this.breadCrumbItems = [
      { label: 'Dashboard' },
      { label: 'Affiliate Dashboard', active: true }
    ];
    this.current_Date();
    this.getAffiliateListData()
  }
  current_Date() {
    // const today = new Date();
    // const year = today.getFullYear();
    // const month = String(today.getMonth() + 1).padStart(2, '0');
    // const day = String(today.getDate() - 1).padStart(2, '0');
    // this.current_date = `${year}-${month}-${day}`;

    var d = new Date();
    d.setDate(d.getDate() - 1);
    this.current_date = this._date.transform(new Date(d), "yyyy-MM-dd");

    this._cd.detectChanges()
  }


  getAffiliateListData() {
    this.service.getAffiliateList().subscribe((data: any) => {
      // if (data.status == 200) {
      // this.showHtml = true
      this.AffiliateList = data.data.Affiliate_Data//Affiliate_Data
      console.log(this.AffiliateList)
      // }

      this._cd.detectChanges()
    })
  }
  Conversion_re_ex_yesterday_data: any;
  Conversion_re_ex_monthly_data: any;
  Conversion_re_ex_total_data: any;

  yesterday_chart_obj = {}
  monthly_chart_obj = {}
  total_chart_obj = {}

  getSelectAffiliate() {
    this.toggleButtons=true
    this.showHtml=false;
    console.log(this.selectedAffiliateId)
    this.service.getConversion_Revenue_Expenses_By_affiliate(this.selectedAffiliateId, this.current_date, 'yesterday')
      .subscribe((data: any) => {
        console.log(data)
        this.Conversion_re_ex_yesterday_data = data.data;
        console.log(this.Conversion_re_ex_yesterday_data, "yesterday")
        let series_data = [];
        let count1 = [];
        let count2 = [];
        let count3 = [];
        if(this.Conversion_re_ex_yesterday_data?.ConversionData.length > 0){
          for (let i of this.Conversion_re_ex_yesterday_data?.ConversionData) {
            let label = `${i._id.Hour}/${i._id.Day}`;
            let value = i.count;
            series_data.push(label)
            count1.push(value)
          }
          for (let i of this.Conversion_re_ex_yesterday_data?.Expenses) {
            count2.push(i.count)
          }
          for (let i of this.Conversion_re_ex_yesterday_data?.Revenue) {
            count3.push(i.count)
          }
        }
       
         this.yesterday_chart_obj={
          series_data:series_data,
          conversion:count1,
          expense:count2,
          revenue:count3,
          x_axis_data:'Hours/Day'
         }
         this._cd.detectChanges()
      })

    this.service.getConversion_Revenue_Expenses_By_affiliate(this.selectedAffiliateId, this.current_date, 'monthly')
      .subscribe((data: any) => {
        this.Conversion_re_ex_monthly_data = data.data;
        console.log(this.Conversion_re_ex_monthly_data, "monthly");
        let series_data = [];
        let count1 = [];
        let count2 = [];
        let count3 = [];

        if(this.Conversion_re_ex_monthly_data?.ConversionData.length > 0){
          for (let i of this.Conversion_re_ex_monthly_data?.ConversionData) {
            let label = `${i._id.Day}/${i._id.Month}`;
            let value = i.count;
            series_data.push(label)
            count1.push(value)
          }
          for (let i of this.Conversion_re_ex_monthly_data?.Expenses) {
            count2.push(i.count)
          }
          for (let i of this.Conversion_re_ex_monthly_data?.Revenue) {
            count3.push(i.count)
          }
        }
       
        this.monthly_chart_obj = {
          series_data: series_data,
          conversion: count1,
          expense: count2,
          revenue: count3,
          x_axis_data:'Day/Month'
        }
        this._cd.detectChanges()
      })

    this.service.getConversion_Revenue_Expenses_By_affiliate(this.selectedAffiliateId, this.current_date, 'total')
      .subscribe((data: any) => {
        this.Conversion_re_ex_total_data = data.data;
        console.log(this.Conversion_re_ex_total_data, "total")
        let series_data = [];
        let count1 = [];
        let count2 = [];
        let count3 = [];
        if(this.Conversion_re_ex_total_data?.ConversionData.length > 0){
          for (let i of this.Conversion_re_ex_total_data?.ConversionData) {
            let label = `${i._id.Month}/${i._id.Year}`;
            let value = i.count;
            series_data.push(label)
            count1.push(value)
          }
          for (let i of this.Conversion_re_ex_total_data?.Expenses) {
            count2.push(i.count)
          }
          for (let i of this.Conversion_re_ex_total_data?.Revenue) {
            count3.push(i.count)
          }
        }
       
         this.total_chart_obj={
          series_data:series_data,
          conversion:count1,
          expense:count2,
          revenue:count3,
          x_axis_data:'Month/Year'
         }
         console.log(this.total_chart_obj)
         this.third_radio_Check=true;
         this.showHtml=true;
         this.createlineWithDataChart(this.total_chart_obj)
         this._cd.detectChanges()
      })
  }


  toggleLineWithDataChart(str: string) {
    if (str == 'yesterday') {
      this.first_radio_Check = true;
      this.second_radio_Check = false;
      this.third_radio_Check = false;
      this.createlineWithDataChart(this.yesterday_chart_obj)

    }
    else if (str == "monthly") {
      this.first_radio_Check = false;
      this.second_radio_Check = true;
      this.third_radio_Check = false;
      this.createlineWithDataChart(this.monthly_chart_obj)

    }
    else if (str == 'total') {
      this.first_radio_Check = false;
      this.second_radio_Check = false;
      this.third_radio_Check = true;
      this.createlineWithDataChart(this.total_chart_obj)

    }
  }

  createlineWithDataChart(obj: any) {
    
      this.showLineDataChart=true;
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
          { name: "Conversion", data: obj.conversion },
          { name: "Expense", data: obj.expense },
          { name: "Revenue", data: obj.revenue }
        ],
        title: {
          text: "Affiliate",
          align: "left",
          style: { fontWeight: "500" },
        },
        grid: {
          row: { colors: ["transparent", "transparent", "transparent"], opacity: 0.2 },
          borderColor: "#f1f1f1",
        },
        markers: { style: "inverted", size: 0 },
        xaxis: {
          categories: obj.series_data,
          title: { text: obj.x_axis_data },
        },
        yaxis: { title: { text: "Count" }, min: 0 ,max: 20},
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
   
    

}
