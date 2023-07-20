import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RootPageService } from '../../root-page.service';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DatePipe, DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-traffic-organic-list',
  templateUrl: './traffic-organic-list.component.html',
  styleUrls: ['./traffic-organic-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrafficOrganicListComponent implements OnInit {
  isFilter: boolean = false;
  fileName: any;
  basicData: any;
  showHtmlChart: boolean = false
  $table: any = [];
  Month_names: any = []
  date_title: any;
  isAffiliate: boolean = false;
  public p: any = 1
  public itemsPerPageC: any = 1000;
  totalYearForFilter: any = [];
  count: any = ''
  data_type: any = '';
  params: any = '';
  selectedType: any = 'null'
  day: string | undefined;
  month: string | undefined;
  year: string | undefined;

  constructor(private service: RootPageService, private _cd: ChangeDetectorRef,
    private _date: DatePipe, private router: Router) { }

  ngOnInit(): void {
    this.Month_names = [{ id: 1, key: '01', name: "JAN" }, { id: 2, key: '02', name: "FEB" }, { id: 3, key: '03', name: "MAR" }, { id: 4, key: '04', name: "APR" },
    { id: 5, key: '05', name: "MAY" }, { id: 6, key: '06', name: "JUN" }, { id: 7, key: '07', name: "JUL" }, { id: 8, key: '08', name: "AUG" }, { id: 9, key: '09', name: "SEP" },
    { id: 10, key: '10', name: "OCT" }, { id: 11, key: '11', name: "NOV" }, { id: 12, key: '12', name: "DEC" }];

    let currentYear: any = this._date.transform(new Date(), "yyyy");
    for (let _i = parseInt(currentYear); _i > 2017; _i--) {
      this.totalYearForFilter.push(_i);
    }

    this.laodTrafficData()
  }
  itemPerPage(val: string) {
    this.itemsPerPageC = val;
    if (val == "All") {
      this.itemsPerPageC = 50000;
      this.Reset();
    }    
  }
  laodTrafficData() {
    this.service.getTrafficDistAffiliate_Organic().subscribe((data: any) => {
      this.basicData = data;
      console.log(this.basicData)
      if (this.basicData != null) {
        sessionStorage.setItem("basicData", JSON.stringify(this.basicData));
      }
      else {
        let data: any = sessionStorage.getItem("basicData");
        this.basicData = JSON.parse(data);
      }
      console.log(this.basicData);
      this.selectedType = this.basicData.line_name;

      // this.makeApiCall();
      this.loadListingData();
      this._cd.detectChanges();
    });
  }



  loadListingData() {
    // http://localhost:9090/api/dashboard/client/Affiliate-traffic-detail-list?month=09&year=2020&day=04&
    // clientId=5d11fd7768d3820aa7a3f5b3&campaignId=5f927201421aa975c03b33c3

    // const today = new Date();
    // const year = today.getFullYear();
    // const month = String(today.getMonth() + 1).padStart(2, '0');
    // const day = String(today.getDate() - 1).padStart(2, '0');

    var d = new Date();
    d.setDate(d.getDate());
    let yesteday_Date = this._date.transform(new Date(d), "yyyy-MM-dd");
    let year = yesteday_Date?.split('-')[0]
    let month = yesteday_Date?.split('-')[1]
    let day = yesteday_Date?.split('-')[2]
    // if(Number(month) < 10){ month = `0${month}`}
    // if(Number(day) < 10){ day = `0${day}`}

    //console.log(this.basicData);

    this.count = this.basicData.count;
    this.data_type = this.basicData.line_name;



    if (this.basicData.line_name == 'Organic') {
      this.isAffiliate = false
      //  params =  `month=${month}`;
      if (this.basicData.title == "Month/Year") {
        let [month, year] = this.basicData.date.split("/");
        this.date_title = `${this.Month_names.find((x: any) => { return x.id == month }).name}/${year}`;
        this.selectedMonth = this.Month_names.find((x: any) => { return x.id == month }).name;
        this.selectedYear = year;
        if (Number(month) < 10) { month = `0${month}` }
        if (Number(day) < 10) { day = `0${day}` }

        let params = `month=${month}&year=${year}`;
        if (this.basicData.clientId != null) {
          params += `&clientId=${this.basicData.clientId}`;
        }
        // if(this.basicData.campaignId != "null" || this.basicData.campaignId != null){
        //  params += `&campaignId=${this.basicData.campaignId}`;
        // }
        // else {
        //   params = `month=${month}&year=${year}&clientId=${this.basicData.clientId}&campaignId=${this.basicData.campaignId}`;
        // }
        this.params = params
        this.service.getOrganic_Traffic_DrillDownReport(params).subscribe((data: any) => {
          if (data.status == 200) {
            this.data_type = 'Organic';
            this.$table = data.data.OrganicData;
            this.count = this.$table.length
            this.showHtmlChart = true
            console.log(this.$table)
            this._cd.detectChanges()
          }

        })
      }
      else if (this.basicData.title == "Day") {

        let day = this.basicData.date;
        if (Number(this.basicData.date) < 10) { day = `0${day}` }
        this.date_title = `${day}/${this.Month_names.find((x: any) => { return x.id == month }).name}/${year}`;
        let params = `month=${this.basicData.month}&year=${this.basicData.year}&day=${day}`;
        this.selectedMonth = this.Month_names.find((x: any) => { return x.key == this.basicData.month }).name;
        this.selectedYear = this.basicData.year;
        if (this.basicData.campaignId != null) {
          params += `&clientId=${this.basicData.clientId}`;
        }
        // if(this.basicData.campaignId != "null"|| this.basicData.campaignId !=null){
        //   params += `&campaignId=${this.basicData.campaignId}`;
        // }
        this.params = params
        this.service.getOrganic_Traffic_DrillDownReport(params).subscribe((data: any) => {
          if (data.status == 200) {
            this.data_type = 'Organic';
            this.$table = data.data.OrganicData
            this.showHtmlChart = true
            console.log(this.$table)
            this._cd.detectChanges()
          }
        })
      }
      else if (this.basicData.title == "Hour") {
        console.log(this.basicData.campaignId, "ccccccccccccccccccccccccccccc")
        console.log(this.basicData)
        let hour = this.basicData.date;
        if (Number(this.basicData.date < 10)) { hour = `0${this.basicData.date}` };
        // this.date_title = `${hour}:00-${day}/${this.Month_names.find((x:any)=>{return x.id == month}).name}/${year}`;
        let onday;
        if (this.basicData.selectedDay === "Today") {
          this.date_title = "Today"
          this.selectedDay = 'today'
          let d = new Date();
          d.setDate(d.getDate());
          let for_day = this._date.transform(d, 'yyyy-MM-dd');
          onday = for_day?.split('-')[2]
        }
        else {
          this.selectedDay = 'yesterday'
          this.date_title = "Yesterday"
          let d = new Date();
          d.setDate(d.getDate() - 1);
          let for_day = this._date.transform(d, 'yyyy-MM-dd');
          onday = for_day?.split('-')[2]
        }

        let params = `month=${month}&year=${year}&day=${onday}&hour=${hour}`;
        if (this.basicData.clientId != null) {
          params += `&clientId=${this.basicData.clientId}`;
        }
        // if(this.basicData.campaignId != null) {
        //   params += `&campaignId=${this.basicData.campaignId}`;
        // }
        this.params = params
        this.service.getOrganic_Traffic_DrillDownReport(params).subscribe((data: any) => {
          if (data.status == 200) {
            this.data_type = 'Organic';
            this.$table = data.data.OrganicData
            this.showHtmlChart = true
            console.log(this.$table)
            this._cd.detectChanges()
          }
        })
      }
    }
    else {
      this.isAffiliate = true
      if (this.basicData.title == "Month/Year") {
        let [month, year] = this.basicData.date.split("/");
        this.date_title = `${this.Month_names.find((x: any) => { return x.id == month }).name}/${year}`;
        this.selectedMonth = this.Month_names.find((x: any) => { return x.id == month }).name
        this.selectedYear = year;
        // if (this.basicData.campaignId == "null") {
        //   params = `month=${month}&year=${year}&clientId=${this.basicData.clientId}`;
        // }
        // else {
        //   params = `month=${month}&year=${year}&clientId=${this.basicData.clientId}&campaignId=${this.basicData.campaignId}`;
        // }
        if (Number(month) < 10) { month = `0${month}` }
        if (Number(day) < 10) { day = `0${day}` }
        let params = `month=${month}&year=${year}`;
        if (this.basicData.clientId != null) {
          params += `&clientId=${this.basicData.clientId}`;
        }
        // if(this.basicData.campaignId != "null"){
        //  params += `&campaignId=${this.basicData.campaignId}`;
        // }
        this.params = params
        this.service.getAffiliate_Traffic_DrillDownReport(params).subscribe((data: any) => {
          if (data.status == 200) {
            this.data_type = 'Affiliate';
            this.$table = data.data.Affiliate_Detail
            this.showHtmlChart = true
            this.count = this.$table.length
            console.log(this.$table)
            this._cd.detectChanges()
          }
        })
      }
      else if (this.basicData.title == "Day") {

        // if (this.basicData.campaignId == "null") {
        //   params = `month=${month}&year=${year}&day=${this.basicData.date}&clientId=${this.basicData.clientId}`;
        // }
        // else {
        //   params = `month=${month}&year=${year}&day=${this.basicData.date}&clientId=${this.basicData.clientId}&campaignId=${this.basicData.campaignId}`;
        // }
        let day = this.basicData.date
        if (day < 10) {
          day = `0${day}`;
        }
        this.date_title = `${day}/${this.Month_names.find((x: any) => { return x.id == month }).name}/${year}`;
        let params = `month=${this.basicData.month}&year=${this.basicData.year}&day=${day}`;
        this.selectedMonth = this.Month_names.find((x: any) => { return x.id == month }).name;
        this.selectedYear = year;

        if (this.basicData.clientId != null) {
          params += `&clientId=${this.basicData.clientId}`;
        }
        // if(this.basicData.campaignId != "null"){
        //   params += `&campaignId=${this.basicData.campaignId}`;
        // }
        this.params = params
        this.service.getAffiliate_Traffic_DrillDownReport(params).subscribe((data: any) => {
          if (data.status == 200) {
            this.data_type = 'Affiliate';
            this.$table = data.data.Affiliate_Detail;
            this.showHtmlChart = true
            console.log(this.$table)
            this._cd.detectChanges()
          }
        })
      }
      else if (this.basicData.title == "Hour") {
        let hour = Number(this.basicData.date) < 10 ? `0${this.basicData.date}` : this.basicData.date
        // this.date_title = `${hour}:00-${day}/${this.Month_names.find((x:any)=>{return x.id == month}).name}/${year}`;
        // if (this.basicData.campaignId == "null") {
        //   params = `month=${month}&year=${year}&day=${day}&hour=${this.basicData.date}&clientId=${this.basicData.clientId}`;
        // }
        // else {
        //   params = `month=${month}&year=${year}&day=${day}&hour=${this.basicData.date}&clientId=${this.basicData.clientId}&campaignId=${this.basicData.campaignId}`;
        // }
        let onday;
        if (this.basicData.selectedDay === "Today") {
          this.selectedDay = 'today'
          this.date_title = "Today"
          let d = new Date();
          d.setDate(d.getDate());
          let for_day = this._date.transform(d, 'yyyy-MM-dd');
          onday = for_day?.split('-')[2]
        }
        else {
          this.selectedDay = 'yesterday'
          this.date_title = "Yesterday"
          let d = new Date();
          d.setDate(d.getDate() - 1);
          let for_day = this._date.transform(d, 'yyyy-MM-dd');
          onday = for_day?.split('-')[2]
        }
        let params = `month=${month}&year=${year}&day=${onday}&hour=${hour}`;
        if (this.basicData.clientId != null) {
          params += `&clientId=${this.basicData.clientId}`;
        }
        // if(this.basicData.campaignId != "null") {
        //   params += `&campaignId=${this.basicData.campaignId}`;
        // }
        this.params = params
        this.service.getAffiliate_Traffic_DrillDownReport(params).subscribe((data: any) => {
          if (data.status == 200) {
            this.data_type = 'Affiliate';
            this.$table = data.data.Affiliate_Detail
            this.showHtmlChart = true
            this._cd.detectChanges()
            console.log(this.$table);
          }
        })
      }
    }
    this.sort('createdOn')
  }
 

  exportexcel() {
    if (this.selectedType != "null" || this.selectedType != "null") {
      this.fileName = this.selectedType;
    } else {
      this.fileName = "All";
    } 
    setTimeout(() => {
      /* pass here the table id */
    let element = document.getElementById('excel-table')
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element)

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')

    /* save to file */
    XLSX.writeFile(wb, `Traffic Distribution (${this.fileName}) - ${this.date_title}.xlsx`)
     }, 1500);
    
  }

  generatePDF() {
    const doc = new jsPDF()
    autoTable(doc, { html: '#excel-table' })
    doc.save(`Traffic-organicList-table.pdf`)
  }
  BacktoDash() {
    this.router.navigate(['dashboard'])
  }

  selectedDay: any = "null"
  selectedMonth: any = "null"
  selectedYear: any = "null"

  toggleFilter(str: any) {
    this.itemsPerPageC = 100;
   // this.isFilter = true;
    this.showHtmlChart = false
    // let params = `month=${month}&year=${year}&day=${onday}&hour=${hour}`;
    if (str == 'day') {
      this.selectedMonth = 'null'
      this.selectedYear = 'null'

      if (this.selectedDay == 'today') {
        let d = new Date();
        d.setDate(d.getDate());
        let today_date = this._date.transform(d, 'yyyy-MM-dd');
        let params = `year=${today_date?.split('-')[0]}&month=${today_date?.split('-')[1]}&day=${today_date?.split('-')[2]}`;
        this.day=params;
        if (this.basicData.clientId != null) {
          params += `&clientId=${this.basicData.clientId}`;
        }
        this.params = params
        if (this.data_type == 'Organic') {
          this.getApiCall_Organic(params)
        }
        else if (this.data_type == 'All') {
          this.get_All_data(params)
        }
        else {
          this.getApiCall_Affiliate(params)
        }
        this.date_title = 'Today'

      }
      else {
        this.date_title = 'Yesterday'
        let d = new Date();
        d.setDate(d.getDate() - 1);
        let today_date = this._date.transform(d, 'yyyy-MM-dd');
        let params = `year=${today_date?.split('-')[0]}&month=${today_date?.split('-')[1]}&day=${today_date?.split('-')[2]}`;
        if (this.basicData.clientId != null) {
          params += `&clientId=${this.basicData.clientId}`;
        }
        this.day=params;
        this.params = params
        if (this.data_type == 'Organic') {
          this.getApiCall_Organic(params)
        }
        else if (this.data_type == 'All') {
          this.get_All_data(params)
        }
        else {
          this.getApiCall_Affiliate(params)
        }
      }
    }
    else if (str == 'month') {
      this.selectedDay = 'null';
      let params: string = ''
      if (this.selectedYear == 'null') {
        this.selectedYear = this.totalYearForFilter[0];
      }
      if (this.selectedMonth != 'null' && this.selectedYear != 'null') {
        let month_key = this.Month_names.find((x: any) => x.name == this.selectedMonth).key
        params = `year=${this.selectedYear}&month=${month_key}`;
        this.date_title = `${this.selectedMonth}-${this.selectedYear}`
      }
      if (this.selectedMonth == 'null' && this.selectedYear != 'null') {
        params = `year=${this.selectedYear}`;
        this.date_title = `${this.selectedYear}`
      }
      if (this.basicData.clientId != null) {
        params += `&clientId=${this.basicData.clientId}`;
      }
      this.month=params;
      this.params = params
      if (this.data_type == 'Organic') {
        this.getApiCall_Organic(params)
      }
      else if (this.data_type == 'All') {
        this.get_All_data(params)
      }
      else {
        this.getApiCall_Affiliate(params)
      }

    }
    else if (str == 'year') {
      this.selectedDay = 'null';
      let params: string = '';
      if (this.selectedYear != 'null' && this.selectedMonth != 'null') {
        let month_key = this.Month_names.find((x: any) => x.name == this.selectedMonth).key
        params = `year=${this.selectedYear}&month=${month_key}`;
        this.date_title = `${this.selectedMonth}-${this.selectedYear}`
      }
      if (this.selectedMonth == 'null' && this.selectedYear != 'null') {
        params = `year=${this.selectedYear}`;
        this.date_title = `${this.selectedYear}`
      }
      if (this.basicData.clientId != null) {
        params += `&clientId=${this.basicData.clientId}`;
      }
      this.params = params;
      this.year=params;
      if (this.data_type == 'Organic') {
        this.getApiCall_Organic(params);
      }
      else if (this.data_type == 'All') {
        this.get_All_data(params)
      }
      else {
        this.getApiCall_Affiliate(params)
      }
    }
    else if (str == 'type') {
      let str_p;
      if(!this.isFilter  && this.selectedType!='null'){
        str_p=this.params;
      }
      if(this.isFilter  && this.selectedType!='null'){
        str_p="";
      }
      if(this.isFilter  && this.selectedDay!='null'){
        str_p +=this.day;
      }
      if (this.selectedYear == 'null') {
        this.selectedYear = this.totalYearForFilter[0];
      }
      if(this.isFilter  && this.selectedMonth!='null' && this.selectedYear!='null'){
        let month_key = this.Month_names.find((x: any) => x.name == this.selectedMonth).key
        str_p += `&year=${this.selectedYear}&month=${month_key}`;       
      }
      if(this.isFilter  && this.selectedMonth=='null' && this.selectedYear!='null'){
        str_p += `&year=${this.selectedYear}`;
      }
      if (this.basicData.clientId != null) {
        str_p += `&clientId=${this.basicData.clientId}`;
      }
      //console.log(str_p)
      if (this.selectedType == 'Affiliate') {
        this.getApiCall_Affiliate(str_p);
      }
      else {
        this.getApiCall_Organic(str_p);
      }
    }


  }

  getApiCall_Affiliate(params: any) {
    this.p=1;
    this.params = params
    this.$table = []
    this.count = 0
    this.service.getAffiliate_Traffic_DrillDownReport(params).subscribe((data: any) => {
      this.showHtmlChart = true
      if (data.status == 200 && data.data.Affiliate_Detail) {
        this.data_type = 'Affiliate';
        this.$table = data.data.Affiliate_Detail;
        this.count = this.$table.length;
        this._cd.detectChanges()
        console.log(this.$table);
      }
      else {

        this.$table = []
        this.count = 0
      }
    })
  }

  getApiCall_Organic(params: any) {
    this.p=1;
    this.params = params
    this.$table = []
    this.count = 0

    this.service.getOrganic_Traffic_DrillDownReport(params).subscribe((data: any) => {
      this.showHtmlChart = true
      if (data.status == 200 && data.data.OrganicData) {
        this.data_type = 'Organic';
        this.$table = data.data.OrganicData
        this.count = this.$table.length;
        console.log(this.$table)
        this._cd.detectChanges()
      }
      else {
        this.$table = []
        this.count = 0
      }
    })
  }

  line_name: any = '';
  Reset() {
    this.itemsPerPageC=1000;
    this.isFilter = true;
    this.selectedType = "null"
    this.showHtmlChart = false
    this.selectedDay = 'null'
    this.selectedMonth = 'null'
    this.selectedYear = 'null'
    this.line_name = 'All';
    this.date_title = 'All'
    let params: any = null
    if (this.basicData.clientId != null) {
      params = `?clientId=${this.basicData.clientId}`
    }
    this.get_All_data(params)
  }

  get_All_data(params:any){
    this.p=1;
    let _Data1: any = [];
    let _Data2: any = [];
    this.service.getAffiliate_Traffic_DrillDownReport(params).subscribe((data: any) => {
      // this.showHtmlChart=true
      if (data.status == 200 && data.data.Affiliate_Detail) {
        // this.data_type = 'Affiliate';
        this.$table = data.data.Affiliate_Detail
        _Data1 = this.$table

        this.service.getOrganic_Traffic_DrillDownReport(params).subscribe((data: any) => {
          this.showHtmlChart = true
          if (data.status == 200 && data.data.OrganicData) {
            this.data_type = 'All'
            this.$table = data.data.OrganicData
            _Data2 = this.$table;
            this.$table = [..._Data1, ..._Data2]
            this.count = this.$table.length;

            this._cd.detectChanges()
          }
          else {
            this.$table = []
            this.count = 0
          }
        })

      }
      else {

        this.$table = []
        this.count = 0
      }
    })
  }
  sortColumn: any;
  sortDirection: any;

  
  sort(column:any ){
    if (column === this.sortColumn) {
      // If the same column is clicked again, reverse the sort direction
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // If a new column is clicked, set it as the sort column and default to ascending direction
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    // Perform the actual sorting
    this.$table.sort((a :any, b:any) => {
      const valueA = a[column];
      const valueB = b[column];

      if (valueA < valueB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      } else if (valueA > valueB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
    this._cd.detectChanges()
  }
  resetAll(){
    let params: any = null
    if (this.basicData.clientId != null) {
      params = `?clientId=${this.basicData.clientId}`
    }
    this.get_All_data(params)
  }
}
