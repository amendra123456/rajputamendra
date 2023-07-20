import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { RootPageService } from '../../root-page.service';
import { Chart } from 'angular-highcharts'
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-traffic-distribution',
  templateUrl: './traffic-distribution.component.html',
  styleUrls: ['./traffic-distribution.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrafficDistributionComponent implements OnInit {

  selectedClient: any = null
  selectedAffiliate: any = "null"
  totalAffiliateSeriesData: any = []
  monthlyAffilaiteSeriesData: any = []
  dailyAffiliateSeriesData: any = []
  totalOrganicSeriesData: any = []
  monthlyOrganicSeriesData: any = []
  dayOrganicSeriesData: any = []
  total_affiliate: any = []
  monthly_affiliate: any = []
  daily_affiliate: any = []
  total_organic: any = []
  monthly_organic: any = []
  day_organic: any = []
  total_max_limit: any;
  total_organic_max_limit: any;
  monthly_organic_max_limit: any
  day_organic_max_limit: any
  dataForDifferCharts: any;
  monthlyData: any;
  dayData: any;
  clientList: any;
  isCampaignShow: boolean = false
  getCampaignList: any
  campaignID: any
  selectedCampaign: any = "null";
  public toggledRadioValue = '';
  createDataforDiffChart: any;
  total_serieseData: any = []
  logined_client_Id: any;
  today_trafficdist_check:boolean = false;
  selectedDay:any = 'today';

  day_hours: any = {
    Affiliate: [],
    Organic: []
  }
  constructor(
    private rootPageService: RootPageService, private _ngZone: NgZone, private router: Router,
    private _cd: ChangeDetectorRef, private _date: DatePipe
  ) { }

  showChart: boolean = false;
  showChartHtml: boolean = false
  current_date: any;
  selectedMonth: any = 'null';
  selectedYear: any = 'null';
  monthsList: any;
  yearsList: any;

  ngOnInit() {
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
    this.yearsList = [2023, 2022, 2021, 2020, 2019, 2018]; // years given static

    var d = new Date();
    d.setDate(d.getDate() - 1);
    this.current_date = this._date.transform(new Date(d), "yyyy-MM-dd");
    this.toggleUserAsPerRole()
    this.createChartForDifferentDta()
  }
  onMonthChange() {
    this.selectedDay ="null"
    this.today_trafficdist_check =false
    this.showChartHtml = false;
    this.first_radio_Check = false;
    if (this.selectedMonth != 'null' && this.selectedYear != 'null') {
      let params = `?month=${this.selectedYear}-${this.selectedMonth}-01`;
      if(this.selectedClient != null){
        params += `&clientId=${this.selectedClient}`
      }
      this.rootPageService.getAffiliateData(params).subscribe((data: any) => {
        this.showChartHtml = true;
        if (data.status == '200') {
          this.commonDataSetForAffiliateMonthly(data.data);
          // this.calling_monthlyOrganicData(params)
          this.rootPageService.getOrganicData(params).subscribe((data: any) => {
            if (data.status == '200') {
              this.commonOrganicDataSetForMonthly(data.data);
              this.changeDataStructure('monthly');
            }
          })
        }
      }, (error: any) => {
        this.rootPageService.getOrganicData(params).subscribe((data: any) => {
          this.showChartHtml = true;
          if (data.status == '200') {
            this.commonOrganicDataSetForMonthly(data.data);
            this.changeDataStructure('monthly');
          }
        }, (err:any)=>{
          this.showChartHtml = true;
        })
      })
    }
    if (this.selectedMonth == 'null' && this.selectedYear != 'null') {
      let params = `?year=${this.selectedYear}-01-01`;
      if(this.selectedClient != null){
        params += `&clientId=${this.selectedClient}`
      }
      this.rootPageService.getAffiliateData(params).subscribe((data: any) => {
        this.showChartHtml = true;
        if (data.status == '200') {
          this.showChart = true;
          this.third_radio_Check = true
          this.commonDataSetForAffiliateTotal(data.data)
          // this.calling_totalOrganicData(params)
          this.rootPageService.getOrganicData(params).subscribe((data: any) => {
            if (data.status == '200') {
              this.showChart = true;
              this.third_radio_Check = true
              this.commonOrganicDataSetForTotal(data.data)
              this.changeDataStructure('total')
              // this.createLineHighChart(this.createDataforDiffChart.monthly)
              // this.getDailyIntialData();
              // this.getMonthlyIntialData()
            }
          })
        }
      }, (error: any) => {
        this.rootPageService.getOrganicData(params).subscribe((data: any) => {
          this.showChartHtml = true;
          if (data.status == '200') {
            this.showChart = true;
            this.third_radio_Check = true
            this.commonOrganicDataSetForTotal(data.data)
            this.changeDataStructure('total')
            // this.createLineHighChart(this.createDataforDiffChart.total)
            // this.getDailyIntialData();
            // this.getMonthlyIntialData()
          }
        },(err:any)=>{
          this.showChartHtml = true;
        })
      })

    }
    if (this.selectedMonth != 'null' && this.selectedYear == 'null') {
      this.selectedYear = this.yearsList[0];
      let params = `?month=${this.selectedYear}-${this.selectedMonth}-01`;
      if(this.selectedClient != null){
        params += `&clientId=${this.selectedClient}`
      }
      this.rootPageService.getAffiliateData(params).subscribe((data: any) => {
        this.showChartHtml = true;
        if (data.status == '200') {
          this.commonDataSetForAffiliateMonthly(data.data);
          // this.calling_monthlyOrganicData(params)
          this.rootPageService.getOrganicData(params).subscribe((data: any) => {
            if (data.status == '200') {
              this.commonOrganicDataSetForMonthly(data.data);
              this.changeDataStructure('monthly')
            }
          })
        }
      }, (error: any) => {
        this.rootPageService.getOrganicData(params).subscribe((data: any) => {
          this.showChartHtml = true;
          if (data.status == '200') {
            this.commonOrganicDataSetForMonthly(data.data);
            this.changeDataStructure('monthly')
          }
        }, (err:any)=>{
          this.showChartHtml = true;
        })
      })

    }


  }
  onYearChange() {
    this.selectedDay = "null"
    this.today_trafficdist_check =false
    this.showChartHtml = false;
    this.first_radio_Check = false;
    if (this.selectedMonth != 'null' && this.selectedYear != 'null') {
      let params: any = `?month=${this.selectedYear}-${this.selectedMonth}-01`; //month
      if(this.selectedClient != null){
        params += `&clientId=${this.selectedClient}`
      }
      this.rootPageService.getAffiliateData(params).subscribe((data: any) => {
        this.showChartHtml = true;
        if (data.status == '200') {
          this.commonDataSetForAffiliateMonthly(data.data);
          // this.calling_monthlyOrganicData(params)
          this.rootPageService.getOrganicData(params).subscribe((data: any) => {
            if (data.status == '200') {
              this.commonOrganicDataSetForMonthly(data.data);
              this.changeDataStructure('monthly');
            }
          })
        }
      }, (error: any) => {
        this.rootPageService.getOrganicData(params).subscribe((data: any) => {
          this.showChartHtml = true;
          if (data.status == '200') {
            this.commonOrganicDataSetForMonthly(data.data);
            this.changeDataStructure('monthly');
          }
        },(err: any)=>{
          this.showChartHtml = true;
        })
      })

    }
    console.log("selectedYear>>>>>>>>>>>>>>>>>>>",this.selectedYear);
    console.log("selectedMonth>>>>>>>>>>>>>>>>>>>",this.selectedMonth);

    if (this.selectedYear == 'null') {
      this.selectedMonth = 'null';
      let params: any = null;   //year
      if(this.selectedClient != null){
        params = `?clientId=${this.selectedClient}`;
      }
      this.rootPageService.getAffiliateData(params).subscribe((data: any) => {
        if (data.status == '200') {
          this.showChart = true;
          this.third_radio_Check = true
          this.commonDataSetForAffiliateTotal(data.data)
          // this.calling_totalOrganicData(params)
          this.rootPageService.getOrganicData(params).subscribe((data: any) => {
            if (data.status == '200') {
              this.showChart = true;
              this.third_radio_Check = true
              this.commonOrganicDataSetForTotal(data.data)
              this.changeDataStructure('total')
              // this.createLineHighChart(this.createDataforDiffChart.monthly)
              // this.getDailyIntialData();
              // this.getMonthlyIntialData()
            }
          })
        }
      }, (error: any) => {
        this.rootPageService.getOrganicData(params).subscribe((data: any) => {
          if (data.status == '200') {
            this.showChart = true;
            this.third_radio_Check = true
            this.commonOrganicDataSetForTotal(data.data)
            this.changeDataStructure('total')
            // this.createLineHighChart(this.createDataforDiffChart.total)
            // this.getDailyIntialData();
            // this.getMonthlyIntialData()
          }
        })
      })

    }
    if (this.selectedMonth == 'null' && this.selectedYear != 'null') {
      let params = `?year=${this.selectedYear}-01-01`; //year
      if(this.selectedClient != null){
        params += `&clientId=${this.selectedClient}`
      }
      this.rootPageService.getAffiliateData(params).subscribe((data: any) => {
        if (data.status == '200') {
          this.showChart = true;
          this.third_radio_Check = true
          console.log("1-COMMONDATASET_AFFILIATE--->>>>",data.data);
          this.commonDataSetForAffiliateTotal(data.data)
          // this.calling_totalOrganicData(params)
          this.rootPageService.getOrganicData(params).subscribe((data: any) => {
            if (data.status == '200') {
              this.showChart = true;
              this.third_radio_Check = true
             // console.log("2-COMMONDATASET_Total--->>>>",data.data);

              this.commonOrganicDataSetForTotal(data.data)
              this.changeDataStructure('total')
              // this.createLineHighChart(this.createDataforDiffChart.monthly)
              // this.getDailyIntialData();
              // this.getMonthlyIntialData()
            }
          })
        }
      }, (error: any) => {
        this.rootPageService.getOrganicData(params).subscribe((data: any) => {
          if (data.status == '200') {
            this.showChart = true;
            this.third_radio_Check = true
            this.commonOrganicDataSetForTotal(data.data)
            this.changeDataStructure('total')
            // this.createLineHighChart(this.createDataforDiffChart.total)
            // this.getDailyIntialData();
            // this.getMonthlyIntialData()
          }
        })
      })
    }
  }
  role: any;
  showClientDropdown: any = false;
  //  loginedClientId:any;
  toggleUserAsPerRole() {
    let role: any = sessionStorage.getItem('roles')
    this.role = JSON.parse(role);
    if (this.role == "SSN") {
      // this.getDailyIntialData()
      this.getTodayData()
    }
    else {
      let clientId: any = sessionStorage.getItem('clientId')
      this.selectedClient = JSON.parse(clientId)
      // this.getDailyIntialData()
      this.getTodayData()
    }
    this._cd.detectChanges()
  }
  // clinet based data and api calls  @@@@@@@
  // getClientListData() {
  //   this.rootPageService.getClientsList().subscribe((data: any) => {
  //     this.clientList = data.Client_Data
  //     console.log(this.clientList, "*******************************************")
  //     this._cd.detectChanges()
  //   })
  //   console.log(this.getClientListData, "getClientListData")
  // }

  // getSelectClient() {
  //   this.showChartHtml = false
  //   this.selectedCampaign = 'null'
  //   // if ssn === need dropdown
  //   // this.logined_client_Id = "5d11fd7768d3820aa7a3f5b3";
  //   this.rootPageService.getClientCampignList(this.selectedClient).subscribe((data: any) => {
  //     if (data.Campaign_Data.length > 0) {
  //       this.getCampaignList = data.Campaign_Data;
  //       this.isCampaignShow = true;
  //       // this.showChartHtml=true
  //       // this.campaignID = this.getCampaignList.find((x: any) => x.partnerId == this.logined_client_Id)?._id;
  //       this._cd.detectChanges();
  //     }
  //     // else {
  //     //   alert("No data found !! ");
  //     //   this.selectedCampaign = 'null';
  //     // }
  //   })

  //   // when user selects clientId showing the client details and have to show html when data loads from api

  //   let params1 = `?clientId=${this.selectedClient}`;

  //   this.rootPageService.getAffiliateData(params1).subscribe((data: any) => {
  //     if (data.status == '200') {
  //       this.third_radio_Check = true
  //       this.commonDataSetForAffiliateTotal(data.data)
  //       this.calling_OrganicTotal_for_SelectClient(params1);
  //     }
  //   }, (error: any) => {
  //     this.calling_OrganicTotal_for_SelectClient(params1);
  //   })

  // }

  // calling_OrganicTotal_for_SelectClient(params1: any) {
  //   this.rootPageService.getOrganicData(params1).subscribe((data: any) => {
  //     if (data.status == '200') {
  //       this.commonOrganicDataSetForTotal(data.data);
  //       this.calling_AffiliateMonthly_for_SelectClinet();
  //     }
  //   })
  // }

  // calling_AffiliateMonthly_for_SelectClinet() {
  //   let params2 = `?clientId=${this.selectedClient}&month=${this.current_date}`
  //   this.rootPageService.getAffiliateData(params2).subscribe((data: any) => {
  //     if (data.status == '200') {
  //       this.commonDataSetForAffiliateMonthly(data.data)
  //       this.calling_OrganicMonthly_for_SelectClinet(params2);
  //     }
  //   }, (error: any) => {
  //     this.calling_OrganicMonthly_for_SelectClinet(params2)
  //   })
  // }

  // calling_OrganicMonthly_for_SelectClinet(params2: any) {
  //   this.rootPageService.getOrganicData(params2).subscribe((data: any) => {
  //     if (data.status == '200') {
  //       this.commonOrganicDataSetForMonthly(data.data)
  //       this.calling_AffiliateDaily_for_SelectClient()
  //     }
  //   }, (error: any) => {
  //     this.calling_AffiliateDaily_for_SelectClient()
  //   })
  // }
  // calling_AffiliateDaily_for_SelectClient() {

  //   let params3 = `?clientId=${this.selectedClient}&day=${this.current_date}`
  //   this.rootPageService.getAffiliateData(params3).subscribe((data: any) => {
  //     if (data.status == '200') {
  //       this.commonDataSetForAffiliateDaily(data.data)
  //       this.calling_OrganicDaily_for_SelectClient(params3)
  //       // this.showChartHtml = true; needs to put at end api call
  //     }
  //     this._cd.detectChanges()
  //   }, (error: any) => {
  //     this.calling_OrganicDaily_for_SelectClient(params3)
  //   })

  // }
  // calling_OrganicDaily_for_SelectClient(params3: any) {
  //   this.rootPageService.getOrganicData(params3).subscribe((data: any) => {
  //     if (data.status == '200') {
  //       this.commonOrganicDataSetForDay(data.data)
  //       this.changeDataStructure()

  //     }
  //     this._cd.detectChanges()
  //   })
  // }
  // @@@@@@2


  // getSelectCampaign() {
  //   this.showChartHtml = false
  //   console.log(this.selectedCampaign, "selectedCampaign");
  //   this.getAfterCampaignAffiliateTotalData()
  // }

  // getTotalAffiliateData() {
  //   this.rootPageService.getAffiliateDashboardData().subscribe((data: any) => {
  //     if (data.status == '200') {
  //       this.showChart = true;
  //       this.third_radio_Check=true
  //       this.commonDataSetForTotal(data.data)
  //     }
  //     this._cd.detectChanges()
  //   })

  // }

  // getMonthlyAffiliateData() {
  //   this.rootPageService.getAffiliateTrafficDataForMonth().subscribe((data: any) => {
  //     if (data.status == '200') {
  //       // this.showChart = true;
  //       this.commonDataSetForAffiliateMonthly(data.data)
  //     }
  //     this._cd.detectChanges()
  //   })
  // }

  // getDailyAffiliateData() {
  //   this.rootPageService.getAffiliateTrafficeDataForDaily().subscribe((data: any) => {
  //     if(data.status == '200'){
  //       // this.showChart = true
  //       this.commonDataSetForAffiliateDaily(data.data)
  //     }
  //     this._cd.detectChanges()
  //   })
  // }

  // campaign based data & api calls  *********
  // getAfterCampaignAffiliateTotalData() {
  //   let params = `?clientId=${this.selectedClient}&campaignId=${this.selectedCampaign}`;

  //   this.rootPageService.getAffiliateData(params).subscribe((data: any) => {
  //     if (data.status == '200') {
  //       this.showChart = true;
  //       this.third_radio_Check = true
  //       this.commonDataSetForAffiliateTotal(data.data)
  //       this.getAfterCampaignOrganicTotalData(params)
  //     }
  //     this._cd.detectChanges()
  //   }, (error: any) => {
  //     this.getAfterCampaignOrganicTotalData(params)
  //   })




  // }
  // getAfterCampaignOrganicTotalData(params: any) {
  //   // let params = `?campaignId=${this.selectedCampaign}`;
  //   this.rootPageService.getOrganicData(params).subscribe((data: any) => {
  //     if (data.status == '200') {
  //       this.showChart = true;
  //       this.third_radio_Check = true
  //       this.commonOrganicDataSetForTotal(data.data)
  //       this.getAfterCampaignAffiliateMonthlyData()
  //     }
  //     this._cd.detectChanges()
  //   }, (error: any) => {
  //     this.getAfterCampaignAffiliateMonthlyData()
  //   })

  //   // params = `?month=${this.current_date}&campaignId=${this.selectedCampaign}`
  //   // this.rootPageService.getOrganicData(params).subscribe((data: any) => {
  //   //   if (data.status == '200') {
  //   //     this.commonOrganicDataSetForMonthly(data.data)
  //   //   }
  //   //   this._cd.detectChanges()
  //   // })

  //   // params = `?day=${this.current_date}&campaignId=${this.selectedCampaign}`;
  //   // this.rootPageService.getOrganicData(params).subscribe((data: any) => {
  //   //   if (data.status == '200') {
  //   //     this.commonOrganicDataSetForDay(data.data)
  //   //   }
  //   //   this._cd.detectChanges()
  //   // })
  // }

  // getAfterCampaignAffiliateMonthlyData() {
  //   let params = `?month=${this.current_date}&clientId=${this.selectedClient}&campaignId=${this.selectedCampaign}`;
  //   this.rootPageService.getAffiliateData(params).subscribe((data: any) => {
  //     if (data.status == '200') {
  //       this.commonDataSetForAffiliateMonthly(data.data)
  //       this.getAfterCampaignOrganicMonthlyData(params)
  //     }
  //     this._cd.detectChanges()
  //   }, (error: any) => {
  //     this.getAfterCampaignOrganicMonthlyData(params)
  //   })
  // }
  // getAfterCampaignOrganicMonthlyData(params: any) {
  //   this.rootPageService.getOrganicData(params).subscribe((data: any) => {
  //     if (data.status == '200') {
  //       this.commonOrganicDataSetForMonthly(data.data)
  //       this.getAfterCampaignAffiliateDailyData()
  //     }
  //     this._cd.detectChanges()
  //   }, (error: any) => {
  //     this.getAfterCampaignAffiliateDailyData()
  //   })
  // }

  // getAfterCampaignAffiliateDailyData() {
  //   let params = `?day=${this.current_date}&clientId=${this.selectedClient}&campaignId=${this.selectedCampaign}`;
  //   this.rootPageService.getAffiliateData(params).subscribe((data: any) => {
  //     if (data.status == '200') {
  //       this.commonDataSetForAffiliateDaily(data.data)
  //       this.getAfterCampaignOrganicDailyData(params)
  //     }
  //     this._cd.detectChanges()
  //   }, (error: any) => {
  //     this.getAfterCampaignOrganicDailyData(params)
  //   })
  // }
  // getAfterCampaignOrganicDailyData(params: any) {
  //   this.rootPageService.getOrganicData(params).subscribe((data: any) => {
  //     if (data.status == '200') {
  //       this.commonOrganicDataSetForDay(data.data)
  //       this.changeDataStructure()
  //     }
  //     this._cd.detectChanges()
  //   })
  // }

  //  *********

  // getIntialAffiliateDataForAll() { //oninit
  //   // let params = null
  //   // this.rootPageService.getAffiliateData(params).subscribe((data: any) => {
  //   //   if (data.status == '200') {
  //   //     this.showChart = true;
  //   //     this.third_radio_Check = true
  //   //     this.commonDataSetForAffiliateTotal(data.data)
  //   //   }
  //   // })

  //   // params = `?month=${this.current_date}`
  //   // this.rootPageService.getAffiliateData(params).subscribe((data: any) => {
  //   //   if (data.status == '200') {
  //   //     this.commonDataSetForAffiliateMonthly(data.data)
  //   //   }
  //   // })

  //   // params = `?day=${this.current_date}`
  //   // this.rootPageService.getAffiliateData(params).subscribe((data: any) => {
  //   //   if (data.status == '200') {
  //   //     this.commonDataSetForAffiliateDaily(data.data)

  //   //   }
  //   // })

  // }
  // getIntialOrganicDataForAll() { //oninit
  //   // let params = null
  //   // this.rootPageService.getOrganicData(params).subscribe((data: any) => {
  //   //   if (data.status == '200') {
  //   //     this.showChart = true;
  //   //     this.third_radio_Check = true
  //   //     this.commonOrganicDataSetForTotal(data.data)
  //   //   }
  //   // })

  //   // params = `?month=${this.current_date}`
  //   // this.rootPageService.getOrganicData(params).subscribe((data: any) => {
  //   //   if (data.status == '200') {
  //   //     this.commonOrganicDataSetForMonthly(data.data)
  //   //   }
  //   // })

  //   // params = `?day=${this.current_date}`
  //   // this.rootPageService.getOrganicData(params).subscribe((data: any) => {
  //   //   if (data.status == '200') {
  //   //     this.commonOrganicDataSetForDay(data.data)
  //   //   }
  //   // })

  //   // this._cd.detectChanges()
  // }


  getTotalIntialData() {
    let params: any = null;
    if(this.selectedClient != null){
      params = `?clientId=${this.selectedClient}`;
    }

    this.rootPageService.getAffiliateData(params).subscribe((data: any) => {
      if (data.status == '200') {
        this.showChart = true;
        this.third_radio_Check = true
        console.log("2-COMMONDATASET_AFFILIATE-TOTAL-->>>>",data.data);

        this.commonDataSetForAffiliateTotal(data.data)
        this.calling_totalOrganicData(params)
      }
    }, (error: any) => {
      this.calling_totalOrganicData(params)
    })

  }
  calling_totalOrganicData(params: any) {
    this.rootPageService.getOrganicData(params).subscribe((data: any) => {
      if (data.status == '200') {
        this.showChart = true;
        this.third_radio_Check = true
        this.commonOrganicDataSetForTotal(data.data)
        this.changeDataStructure('total')
        // this.getDailyIntialData();
        // this.getMonthlyIntialData()
      }
    })
  }


  getMonthlyIntialData() {
    let params = `?month=${this.current_date}`
    if(this.selectedClient != null){
      params += `&clientId=${this.selectedClient}`;
    }
    this.rootPageService.getAffiliateData(params).subscribe((data: any) => {
      if (data.status == '200') {
        this.commonDataSetForAffiliateMonthly(data.data);
        this.calling_monthlyOrganicData(params)
      }
    }, (error: any) => {
      this.calling_monthlyOrganicData(params)
    })
    // params = `?month=${this.current_date}`

  }
  calling_monthlyOrganicData(params: any) {
    this.rootPageService.getOrganicData(params).subscribe((data: any) => {
      if (data.status == '200') {
        this.commonOrganicDataSetForMonthly(data.data);
        // this.getDailyIntialData();
      }
    })
  }

  getDailyIntialData() {
    this.today_trafficdist_check =false
    this.showChartHtml = false;
    this.first_radio_Check = true;
    this.selectedMonth = "null";
    this.selectedYear ="null";
    let params = `?day=${this.current_date}`
    if(this.selectedClient != null){
      params += `&clientId=${this.selectedClient}`
    }
    this.rootPageService.getAffiliateData(params).subscribe((data: any) => {
      if (data.status == '200') {
        this.commonDataSetForAffiliateDaily(data.data)
        this.calling_dailyOrganicData(params)
      }
    })
    // params = `?day=${this.current_date}`

  }
 
  calling_dailyOrganicData(params: any) {
    this.rootPageService.getOrganicData(params).subscribe((data: any) => {
      if (data.status == '200') {
        this.commonOrganicDataSetForDay(data.data);
        this.changeDataStructure('yesterday')
        // this.createLineHighChart(this.createDataforDiffChart.total)
      }
    })
  }

  getTodayData() {
    this.dailyAffiliateSeriesData= [];
    this.dayOrganicSeriesData = []
    
    var d = new Date();
    d.setDate(d.getDate());
    let today_date = this._date.transform(new Date(d), "yyyy-MM-dd");

    this.showChartHtml = false;
    this.first_radio_Check = false;
    this.today_trafficdist_check =true
    this.selectedMonth = "null";
    this.selectedYear ="null";
    let params = `?day=${today_date}`
    if(this.selectedClient != null){
      params += `&clientId=${this.selectedClient}`
    }
    this.rootPageService.getAffiliateData(params).subscribe((data: any) => {
      if (data.status == '200') {
        this.commonDataSetForAffiliateDaily(data.data)
        this.calling_Today_OganicData(params)
      }
    })
    // params = `?day=${this.current_date}`

  }
  calling_Today_OganicData(params: any) {
    this.rootPageService.getOrganicData(params).subscribe((data: any) => {
      if (data.status == '200') {
        this.commonOrganicDataSetForDay(data.data);
        this.changeDataStructure('today')
        // this.createLineHighChart(this.createDataforDiffChart.total)
      }
    })
  }

  commonDataSetForAffiliateTotal(data: any) {

    let totalData = JSON.parse(JSON.stringify(data.Affiliate_Traffic_Data));
    let totalAffiliateCountData: any = [];
    this.total_affiliate = []
    this.totalAffiliateSeriesData = []
    console.log(totalData, "totalData =============>>>>")
    if (totalData.length > 0) {

      for (let i of totalData) {
        let monthOfYear = `${i._id.Month}/${i._id.Year}`;
        this.totalAffiliateSeriesData.push(monthOfYear);
        this.total_affiliate.push({ 'monthOfYear': monthOfYear, 'count': i.count, date: i });
      }
      console.log("totalAffiliateSeriesData",this.totalAffiliateSeriesData);
    }

  }

  commonDataSetForAffiliateMonthly(data: any) {

    let monthlyData = data.Affiliate_Traffic_Data;
    let monthlyAffiliateCountData: any = [];
    this.monthly_affiliate = []
    if (monthlyData.length > 0) {
      if (monthlyData.length > 0) {

        for (let i of monthlyData) {
          let monthOfYear = `${i._id.Day}`;
          this.monthlyAffilaiteSeriesData.push(monthOfYear);
          this.monthly_affiliate.push({ 'monthOfYear': monthOfYear, 'count': i.count, date: i })
        }
      }

    }
  }

  commonDataSetForAffiliateDaily(data: any) {

    let dailyData = data.Affiliate_Traffic_Data;
    let dailyAffilateCountData: any = []
    this.daily_affiliate = []
    this.day_hours.Affiliate = [];
    if (dailyData.length > 0) {

      for (let i of dailyData) {
        let monthOfYear = `${i._id.Hour}`;
        this.dailyAffiliateSeriesData.push(monthOfYear);
        this.daily_affiliate.push({ 'monthOfYear': monthOfYear, 'count': i.count, date: i })
        this.day_hours.Affiliate.push(i)
      }
    }

  }

  commonOrganicDataSetForTotal(data1: any) {

    let totalOrganicData = JSON.parse(JSON.stringify(data1.Organic_Traffic_Data));
    let totalOrganicCountData: any = [];
    this.total_organic = []
    this.totalOrganicSeriesData = [];
    if (totalOrganicData.length > 0) {

      for (let i of totalOrganicData) {
        let monthOfYear = `${i._id.Month}/${i._id.Year}`;
        this.totalOrganicSeriesData.push(monthOfYear);
        this.total_organic.push({ 'monthOfYear': monthOfYear, 'count': i.count, date: i });
      }
      console.log("totalOrganicSeriesData",this.totalOrganicSeriesData);
      this._cd.detectChanges()
    }
  }

  commonOrganicDataSetForMonthly(data: any) {

    let monthlyData = data.Organic_Traffic_Data
    let monthlyOrganicCountData: any = [];
    this.monthly_organic = [];
    if (monthlyData.length > 0) {

      for (let i of monthlyData) {
        let monthOfYear = `${i._id.Day}`;
        this.monthlyOrganicSeriesData.push(monthOfYear)
        this.monthly_organic.push({ 'monthOfYear': monthOfYear, 'count': i.count, date: i })
      }

    }
  }

  commonOrganicDataSetForDay(data: any) {

    let dayData = data.Organic_Traffic_Data
    let dayOrganicCountData: any = [];
    this.dayOrganicSeriesData = []
    this.day_organic = []
    this.day_hours.Organic = [];
    if (dayData.length > 0) {

      for (let i of dayData) {
        let monthOfYear = `${i._id.Hour}`;
        this.dayOrganicSeriesData.push(monthOfYear)
        this.day_organic.push({ 'monthOfYear': monthOfYear, 'count': i.count, date: i })
        this.day_hours.Organic.push(i)
      }

    }

  }


  first_radio_Check: boolean = false
  second_radio_Check: boolean = false
  third_radio_Check: boolean = false

  // toggleLineWithDataChart(str: any) {

  //   // if(str == 'yesterday'){
  //   //   this.showChartHtml = false
  //     // this.getDailyIntialData();
  //   //   this.first_radio_Check = true

  //   // }
  //   // this.toggledRadioValue = str;
  //   // if (str == '') {
  //   //   str = 'total'
  //   // }
  //   // if (str == 'yesterday') {
  //   //   this.createChartForDifferentDta();

  //   //   this.createLineHighChart(this.createDataforDiffChart.yesteday)
  //   //   console.log(this.createDataforDiffChart.yesteday)
  //   //   this.first_radio_Check = true
  //   //   this.second_radio_Check = false
  //   //   this.third_radio_Check = false

  //   // }
  //   // if (str == 'monthly') {
  //   //   this.first_radio_Check = false
  //   //   this.second_radio_Check = true
  //   //   this.third_radio_Check = false

  //   //   this.createLineHighChart(this.createDataforDiffChart.monthly)

  //   // }
  //   // if (str == 'total') {

  //   //   this.createLineHighChart(this.createDataforDiffChart.total)
  //   //   this.first_radio_Check = false
  //   //   this.second_radio_Check = false
  //   //   this.third_radio_Check = true
  //   // }

  // }



  

  changeDataStructure(str: any) {
    this.showChartHtml =true
    // console.log(this.totalAffiliateSeriesData, "-------------------->total affiliate series data")
    // console.log(this.totalOrganicSeriesData, " ---------------------->total organic series data")

    let totalseries = [...this.totalAffiliateSeriesData, ...this.totalOrganicSeriesData];
    let totalsortedArray = [...new Set(totalseries)];
    console.log("totalSERIES>>>>>>>>>>",totalsortedArray)
    this.total_serieseData = totalsortedArray.sort((a, b) => {
      const [monthA, yearA] = a.split('/');
      const [monthB, yearB] = b.split('/');
      const dateA: any = new Date(yearA, monthA - 1, 1);
      const dateB: any = new Date(yearB, monthB - 1, 1);
      return dateA - dateB;
    });
    console.log('===> ', this.total_serieseData)

    let monthlyseries = [...this.monthlyAffilaiteSeriesData, ...this.monthlyOrganicSeriesData];
    let monthlysortedArray = [...new Set(monthlyseries)];
    this.monthlyAffilaiteSeriesData = monthlysortedArray.sort((a, b) => {
      return parseInt(a) - parseInt(b)
    })
    let dailyseries = [...this.dailyAffiliateSeriesData, ...this.dayOrganicSeriesData];
    let daysortedArray = [...new Set(dailyseries)]
    this.dailyAffiliateSeriesData = daysortedArray.sort((a, b) => {
      return parseInt(a) - parseInt(b)
    })

    // console.log(this.total_serieseData)
    // console.log(this.total_affiliate)
    // console.log(this.total_organic)

    // console.log(this.monthly_affiliate);
    // console.log(this.monthly_organic);

    // console.log(this.daily_affiliate);
    // console.log(this.day_organic);

    this.total_affiliate = this.total_serieseData.map((value: any) => {
      let machvalue = this.total_affiliate.find((x: any) => x.monthOfYear == value)?.count;
      return machvalue ? machvalue : 0;
    })
    this.total_organic = this.total_serieseData.map((value: any) => {
      let machvalue = this.total_organic.find((x: any) => x.monthOfYear == value)?.count;
      return machvalue ? machvalue : 0;
    })

    this.monthly_affiliate = this.monthlyAffilaiteSeriesData.map((value: any) => {
      let machvalue = this.monthly_affiliate.find((x: any) => x.monthOfYear == value)?.count;
      return machvalue ? machvalue : 0;
    })
    this.monthly_organic = this.monthlyAffilaiteSeriesData.map((value: any) => {
      let machvalue = this.monthly_organic.find((x: any) => x.monthOfYear == value)?.count;
      return machvalue ? machvalue : 0;
    })
     
    this.daily_affiliate = this.dailyAffiliateSeriesData.map((value: any) => {
      let machvalue = this.daily_affiliate.find((x: any) => x.monthOfYear == value)?.count;
      return machvalue ? machvalue : 0;
    })
    this.day_organic = this.dailyAffiliateSeriesData.map((value: any) => {
      let machvalue = this.day_organic.find((x: any) => x.monthOfYear == value)?.count;
      return machvalue ? machvalue : 0;
    })
    this.createChartForDifferentDta();
    // this.createLineHighChart(this.createDataforDiffChart.total)
    this.showChartHtml = true
    if (str == 'total') { this.createLineHighChart(this.createDataforDiffChart.total) }
    if (str == 'monthly') { this.createLineHighChart(this.createDataforDiffChart.monthly) }
    if (str == 'yesterday') { this.createLineHighChart(this.createDataforDiffChart.yesteday) }
    if(str == 'today') {this.createLineHighChart(this.createDataforDiffChart.today)}
    // this.createLineHighChart(data)
    this._cd.detectChanges();

    // console.log(this.total_serieseData)
    // console.log(this.total_affiliate)
    // console.log(this.total_organic)

    // console.log(this.monthlyAffilaiteSeriesData)
    // console.log(this.monthly_affiliate);
    // console.log(this.monthly_organic);

    // console.log(this.dailyAffiliateSeriesData)
    // console.log(this.daily_affiliate);
    // console.log(this.day_organic);

  }
  createChartForDifferentDta() {
console.log('1',this.total_serieseData)
console.log('2',this.total_affiliate)
console.log('3',this.total_organic)
    this.createDataforDiffChart = {
      today:{
        seriesData: this.dailyAffiliateSeriesData,
        data1: this.daily_affiliate,
        data2: this.day_organic,
        title: "Hour",
        selectedDay :'Today',
        day_hours: this.day_hours
      },
      yesteday: {
        seriesData: this.dailyAffiliateSeriesData,
        data1: this.daily_affiliate,
        data2: this.day_organic,
        title: "Hour",
        selectedDay :'Yesterday',
        day_hours: this.day_hours


      },
      monthly: {
        seriesData: this.monthlyAffilaiteSeriesData,
        data1: this.monthly_affiliate,
        data2: this.monthly_organic,
        title: "Day"

      },
      total: {
        seriesData: this.total_serieseData,
        data1: this.total_affiliate,
        data2: this.total_organic,
        title: "Month/Year"
      }
    }
    this._cd.detectChanges()

  }



  lineHighChart: any;
  createLineHighChart(data: any) {
    console.log('final data: ', data)

    this.lineHighChart = new Chart({
      title: {
        text: ''
      },

      xAxis: {
        categories: data.seriesData,
        title: {
          text: data.title
        }
      },
      yAxis: {
        title: {
          text: 'Count'
        }
      },

      plotOptions: {
        series: {
          cursor: 'pointer',
          events: {
            click: (event: any) => {
              console.log(event)

              let obj: any = {
                date: event.point.category,
                clientId: this.selectedClient,
                campaignId: this.selectedCampaign,
                line_name: event.point.series.name,
                title: data.title,
                count: event.point.options.y,
                // day_hours : data.day_hours
                year: this.selectedYear,
                month: this.selectedMonth,
                selectedDay:data.selectedDay


              }
              console.log(obj)

              this.rootPageService.saveTrafficDistAffiliate_Organic(obj);
              this._ngZone.run(() => {
                this.router.navigate(['dashboard/traffic-organic-list'])
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

    //"#4cc8d8", "#35a3d3", "#f4b3ce", "#e2a493", "#ffc8ba", "#74c0e1"
      series: [{
        name: "Affiliate",
        type: 'line',
        color : "#4cc8d8",
        data: data.data1,
      },
      {
        name: "Organic",
        type: 'line',
        color : "#ffc8ba",
        data: data.data2,
      },
      {
        name: "Direct",
        type: 'line',
        color : "#f4b3ce",
        data: [],
      },
      {
        name: "Social Media",
        type: 'line',
        color : "#e2a493",
        data: [],
      }
    
    ]
    })
    console.log(this.lineHighChart);

    this._cd.detectChanges()

  }
  onDayChange(){
    if(this.selectedDay == 'today'){
      this.getTodayData()
    }
    else{
      this.getDailyIntialData()
    }
  }


}