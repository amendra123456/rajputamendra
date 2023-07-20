import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RootPageService } from '../../root-page.service';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DecimalPipe } from '@angular/common';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-campaign-revenue-list',
  templateUrl: './campaign-revenue-list.component.html',
  styleUrls: ['./campaign-revenue-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CampaignRevenueListComponent implements OnInit {
  isFilter: boolean = false;
  fileName: any;
  basicData: any;
  showHtmlChart: boolean = false
  $table: any = [];
  datefilter: any;
  filterKey: any;
  public p: any = 1
  public itemsPerPageC: any = 100;
  monthsList: any = [];
  yearsList: any = [];

  date_title: any = '';
  selectedDay: any = 'null'
  selectedMonth: any = 'null'
  selectedYear: any = 'null'
  selectedPlan: any = 'null'
  selectedCover: any = 'null'
  params: any = '';
  totalRecordCount: number | undefined;

  constructor(private service: RootPageService, private _cd: ChangeDetectorRef, private _date: DatePipe,
    private router: Router) { }

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

    let currentYear: any = this._date.transform(new Date(), "yyyy");

    for (let _i = parseInt(currentYear); _i > 2017; _i--) {
      this.yearsList.push(_i);
    }
    this.campaignRevenueData()

  }

  itemPerPage(val: string) {
    this.itemsPerPageC = val;
    if (val == "All") {console.log("helloo1");
      this.itemsPerPageC = 50000;
      this.Reset();
    }
    // if (this.isFilter) {console.log(this.isFilter+"helloo22");
    //   this.Reset();
    // } 
  }

  campaignRevenueData() {
    this.service.getRevenueDetailsList().subscribe((data: any) => {
      this.basicData = data;
      if (this.basicData != null) {
        sessionStorage.setItem("basicData", JSON.stringify(this.basicData));
      }
      else {
        let data: any = sessionStorage.getItem("basicData");
        this.basicData = JSON.parse(data);
      }
      console.log("session adata>>>>>", this.basicData);
      // this.makeApiCall();
      this.loadListingData();
      this._cd.detectChanges();
    });
  }

  loadListingData() {
    // http://localhost:9090/api/dashboard/revenue-detail-list?
    // key=Standard_Elite&day=2023-04-20&campaignId="uh43423i3"
    let _date_params: any = sessionStorage.getItem("revenue_params");
    this.datefilter = _date_params;
    let _date_filter_params: any = sessionStorage.getItem("key_params");
    let filterKey = _date_filter_params;

    //this.datefilter=_date_params;
    //console.log("data<<FILTERRRRRRRRR<<<<<<<<<Session from here<<<<<<<<<",this.datefilter)
    //console.log("data<<FILTERRRRRRRRR<<filterKey<<<<<<<Session from here<<<<<<<<<",filterKey)
    // 1.3 yearly - Elite   value-- > Standard_Elite

    // 2.yearly - Ultra  Standard_Ultra

    // 3Monthly - Basic  Standard_Basic

    // 4.Monthly - Basic 7DRP  Standard_Basic7Drp  
    let keyString = this.basicData.key.trim();
    this.selectedPlan = this.basicData.category
    this.selectedCover = this.basicData.planeName
    let keydata = keyString.split(" ");
    let keyvalue = keydata[0].split("_");
    console.log(keydata[0].split("_"));
    let key = (keyvalue[0] + "_" + keydata[keydata.length - 1]).trim();
    if (key == "Standard_7DRP") {
      key = "Standard_Basic7Drp";
      this.key = key
    }
    if (key == "Premium_7DRP") {
      key = "Premium_BasicDrp";
      this.key = key
    }
    let params;
    if (filterKey == "day") {
      params = `key=${key}&day=${this.datefilter}`;
      // this.date_title = "Yesterday";
      // let date = a.split("=")[1];
      let d = new Date()
      d.setDate(d.getDate());
      let today_date = this._date.transform(d, 'yyyy-MM-dd');
      let date=this.datefilter.split("=")[0]
      date =this.containsSpecialChars(date);
      if (today_date === date) {
        this.date_title = "Today";
        this.selectedDay = 'today';
      }
      else {
        this.date_title = "Yesterday";
        this.selectedDay = 'yesterday'
      }      
    } 
    else if (filterKey == "month") {
      params = `key=${key}&month=${this.datefilter}`;
      let a = this.datefilter.split('-')[1]
      let month_name = this.monthsList.find((x: any) => { return x.key == a }).value;
      this.date_title = `${month_name} ${this.datefilter.split('-')[0]}`
      this.selectedMonth = this.monthsList.find((x: any) => { return x.key == a }).key;
      this.selectedYear = this.datefilter.split('-')[0];
    } else if (filterKey == "year") {
      params = `key=${key}&year=${this.datefilter}`
      console.log(this.datefilter)
      this.date_title = `${this.datefilter.split('-')[0]}`
      this.selectedYear = this.datefilter.split('-')[0]
    } else {
      params = `key=${key}`;
      this.date_title = 'All'

    }
    // console.log("params<<<<<<<JJJJJJJJ<<<",params);
    /*if(this.basicData.campaignId == "null"){
      if(this.basicData.date == 'null'){
        params = `key=${this.basicData.key}`;
      }else{
        params = `key=${this.basicData.key}&day=${this._date.transform(new Date().setDate(new Date().getDate() - 1), "yyyy-MM-dd")}`
      }
     
    }
    else{
      if(this.basicData.date == 'null'){
        params = `key=${this.basicData.key}&${this.basicData.campaignId}`
      }
      else{
        params = `key=${this.basicData.key}&day=${this._date.transform(new Date().setDate(new Date().getDate() - 1), "yyyy-MM-dd")}&${this.basicData.campaignId}`
      }
      
    }*/
    
    this.selectedPlan = this.key
    if(this.basicData.category == '3 Yearly - Elite'){
      this.selectedPlan = `${this.basicData.planeName}_Elite`;
    }
    else if(this.basicData.category == 'Yearly - Ultra'){
      this.selectedPlan = `${this.basicData.planeName}_Ultra`;
    }
    else if(this.basicData.category == 'Monthly - Basic'){
      this.selectedPlan = `${this.basicData.planeName}_Basic`;
    }
    else if(this.basicData.category == 'Monthly - Basic 7DRP'){
      this.selectedPlan = `${this.basicData.planeName}_Basic7Drp`;
    }
    this.key = this.selectedPlan
    console.log(this.selectedPlan)
    this.getApi_Call(params)
  }

  getApi_Call(params: any) {
    this.itemsPerPageC=100;
    this.p=1;
    //this.isFilter=true;
    this.params = params
    this.service.campaign_revenue_DrillDownReport(params).subscribe((data: any) => {
      this.showHtmlChart = true;
      if (data.status == 200) {
        this.$table = data.data;
        //this.totalRecordCount = data.data.length;
        this._cd.detectChanges()
      }
    })
  }
  private containsSpecialChars(str:string) {
    const specialChars = /[`!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?~]/;
    if(specialChars.test(str)){ return str.replace("&clientId","");} else{ return str;}    
  }
  exportexcel() {
    if (this.selectedPlan != "null") {
      this.fileName = this.selectedPlan;
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
    XLSX.writeFile(wb, `Revenue Details (${this.fileName}) - ${this.date_title}.xlsx`)
     }, 500);
    
  }

  generatePDF() {
    const doc = new jsPDF()
    autoTable(doc, { html: '#excel-table' })
    doc.save(`${this.basicData.category}-${this.basicData.planeName}-data-table.pdf`)
  }
  printReport():void {
  this.service.printReport();
  }
  BacktoDash() {
    this.router.navigate(['dashboard'])
  }

  key: any = 'null';
  day: string | null | undefined;
  year: string | null | undefined;
  month: string | null | undefined; 
  onChangeParam(str: any) {
    this.showHtmlChart = false

    if (str == 'day') {
      this.selectedMonth = "null"
      this.selectedYear = 'null'
      this.year='null';
      this.month='null';
      if (this.selectedDay == 'today') {
        let d = new Date();
        d.setDate(d.getDate());
        let today = this._date.transform(new Date(d), 'yyyy-MM-dd');
        this.day=`&day=${today}`;
        let params = `key=${this.key}&day=${today}`;
        if (this.basicData.clientId != null) { params += `&clientId=${this.basicData.clientId}` };
        this.date_title = "Today";
        this.getApi_Call(params)
      }
      else {
        let d = new Date();
        d.setDate(d.getDate() - 1);
        let yesterday = this._date.transform(new Date(d), 'yyyy-MM-dd');
        this.day=`&day=${yesterday}`;
        let params = `key=${this.key}&day=${yesterday}`;
        if (this.basicData.clientId != null) { params += `&clientId=${this.basicData.clientId}` };
        this.date_title = "Yesterday";
        this.getApi_Call(params)
      }
    }
    else if (str == 'month') {
      this.showHtmlChart = false
      this.selectedDay = 'null'
      let params: string = '';
      if (this.selectedYear == 'null') { this.selectedYear = this.yearsList[0] };
      if (this.selectedMonth != 'null' && this.selectedYear != 'null') {
        params = `key=${this.key}&month=${this.selectedYear}-${this.selectedMonth}-01`;
      }
      if (this.selectedYear != 'null' && this.selectedMonth == 'null') {
        params = `key=${this.key}&year=${this.selectedYear}-01-01`;
      }
      if (this.basicData.clientId != null) {
        params += `&clientId=${this.basicData.clientId}`;
      }
      this.getApi_Call(params)

    }
    else if (str == 'year') {
      this.showHtmlChart = false
      this.selectedDay = 'null'
      let params: string = '';
      if (this.selectedMonth != 'null' && this.selectedYear != 'null') {
        params = `key=${this.key}&month=${this.selectedYear}-${this.selectedMonth}-01&`;
      }
      if (this.selectedYear != 'null' && this.selectedMonth == 'null') {
        params = `key=${this.key}&year=${this.selectedYear}-01-01&`;
      }
      if (this.selectedYear == 'null') {
        params = `key=${this.key}`;
        this.selectedMonth = 'null';
      }
      if (this.basicData.clientId != null) {
        params += `&clientId=${this.basicData.clientId}`;
      }
      this.getApi_Call(params)
    }
    else if (str == 'plan') {
      this.showHtmlChart = false;
      let updatedStr;
      // console.log(this.params);
      if(!this.isFilter && this.selectedPlan!='null'){
         updatedStr = this.params.replace(/(key=)[^&]*/, `key=${this.selectedPlan}`);
      }
      if(this.isFilter && this.selectedPlan!='null'){
        updatedStr = `key=${this.selectedPlan}`;
      }
    
      if (this.isFilter &&  this.selectedDay != 'null' && this.selectedMonth=='null' && this.selectedYear=='null' ) {
        updatedStr += `${this.day}`;
      }
      if (this.isFilter &&  this.selectedMonth != 'null' && this.selectedYear != 'null') {
        updatedStr += `&month=${this.selectedYear}-${this.selectedMonth}-01`;
      }
      if (this.isFilter &&  this.selectedMonth != 'null' && this.selectedYear == 'null' ) {
        this.selectedYear = this.yearsList[0];
        updatedStr += `&month=${this.selectedYear}-${this.selectedMonth}-01`;
      }
      if (this.isFilter &&  this.selectedYear != 'null' && this.selectedMonth == 'null' ) {
        updatedStr += `&year=${this.selectedYear}-01-01`;
      }
      if (this.isFilter &&  this.selectedYear == 'null') {
        updatedStr += ``;
      }
      this.key = this.selectedPlan;
      this.getApi_Call(updatedStr);
      }
      
      
    }
  

  Reset(){
    this.itemsPerPageC=100;
    this.isFilter = true;
    this.showHtmlChart =false  
    this.selectedDay = 'null';
    this.selectedMonth ='null';
    this.selectedYear = 'null';
    this.selectedPlan = 'null';
    //this.selectedCover = 'null';
    let params = null;
    this.date_title = 'All'
    if (this.basicData.clientId != null) {
      params = `?clientId=${this.basicData.clientId}`;
    }
    // this.params = params
    this.service.campaign_revenue_DrillDownReport_forReset(params).subscribe((data: any) => {
      this.showHtmlChart = true;
      if (data.status == 200) {
        this.$table = data.data;
        this.totalRecordCount = data.data.length;
        this._cd.detectChanges()
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
    let params = null;
    this.date_title = 'All'
    if (this.basicData.clientId != null) {
      params = `?clientId=${this.basicData.clientId}`;
    }
    // this.params = params
    this.service.campaign_revenue_DrillDownReport_forReset(params).subscribe((data: any) => {
      this.showHtmlChart = true;
      if (data.status == 200) {
        this.totalRecordCount=data.data.length;
        this.$table = data.data;       
        this._cd.detectChanges()
      }
    })
  }
}
