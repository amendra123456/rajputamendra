import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RootPageService } from '../../root-page.service';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DatePipe, DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consumer-drop-list',
  templateUrl: './consumer-drop-list.component.html',
  styleUrls: ['./consumer-drop-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsumerDropListComponent implements OnInit {
  isFilter: boolean = false;
  basicData: any;
  showHtmlChart: boolean = false
  $table: any = [];
  date_title: any = '';
  header_details: any = {};
  monthsList: any = [];
  selectedMonth: any = 'null'
  public p: any = 1
  public itemsPerPageC: any = 100;
  selectedDay: any = 'null'
  totalYearForFilter: any = [];
  selectedYear: any = 'null';
  pageName: any;
  names_: any = [];
  fileName: any;
  totalRecordCount: number | undefined;

  constructor(private service: RootPageService, private _cd: ChangeDetectorRef,
    private _date: DatePipe, private router: Router) { }

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
      this.totalYearForFilter.push(_i);
    }
    this.getConsumerDropDetails()
  }
  itemPerPage(val: string) {
    this.itemsPerPageC = val;
    if (this.totalRecordCount != undefined && val == "All") {
      this.itemsPerPageC = 50000;
      this.Reset();
    }
    // if (this.isFilter) {
    //   this.Reset();
    // } 
  }
  getConsumerDropDetails() {
    this.service.getConsumerDropData().subscribe((data: any) => {
      this.basicData = data;
      if (this.basicData != null) {
        sessionStorage.setItem("basicData", JSON.stringify(this.basicData));
      }
      else {
        let data: any = sessionStorage.getItem("basicData");
        this.basicData = JSON.parse(data);
      }
      console.log(this.basicData);
      // this.makeApiCall();
      this.loadListingData();
      this._cd.detectChanges();
    });
  }

  loadListingData() {
    // http://localhost:8087/api/getConsumerDropPerReportDetails?day=2023-04-19&pageName=YbcLandingPage
    let params;
    if (this.basicData.request_date == null || this.basicData.request_date == "") {
      params = `?pageName=${this.basicData.page_name}`;
      if (this.basicData.clientId != null && this.basicData.clientId != undefined) {
        params += `&clientId=${this.basicData.clientId}`;
      }
      // this.header_details.selectedMode = "All";
    }
    else {
      params = `${this.basicData.request_date}&pageName=${this.basicData.page_name}`;
      // if (this.basicData.clientId != null) {
      //   params += `&clientId=${this.basicData.clientId}`;
      // }
      // this.date_title =String(this.basicData.request_date).split('=')[1]
      // this.header_details.
    }

    // for header details-
    let a = String(this.basicData.request_date).split('?')[1];
    console.log(a);
    let b = a?.split('=')[0]
    console.log(b)
    if (b == undefined) {
      this.date_title = "All";
    }
    else if (b == 'month') {
      // this.date_title = a?.split('=')[1]
      let k = a?.split('=')[1];
      let l = k.split('-');
      console.log(l[1])
      let name = this.monthsList.find((x: any) => { return x.key == l[1] }).value;
      this.date_title = `${name} ${l[0]}`;
      this.selectedMonth = this.monthsList.find((x: any) => { return x.key == l[1] }).value;
      this.selectedYear = l[0];
    }
    else if (b == 'year') {
      let k = a?.split('=')[1];
      let l = k.split('-');
      this.date_title = `${l[0]}`;
      this.selectedYear = l[0]
    }
    else {
      let date = a.split("=")[1];
      date=this.containsSpecialChars(date);      
      let d = new Date()
      d.setDate(d.getDate());
      let today_date = this._date.transform(d, 'yyyy-MM-dd');
      if (today_date === date) {
        this.date_title = "Today";
        this.selectedDay = "today";
      }
      else {
        this.date_title = "Yesterday";
        this.selectedDay = 'yesterday';
      }
    }
    this.pageName = this.basicData.page_name;
    //this.names_ = this.basicData.names;    
    this.params = params;
    this.api_request(params)
  }
  private containsSpecialChars(str:string) {
    const specialChars = /[`!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?~]/;
    if(specialChars.test(str)){ return str.replace("&clientId","");} else{ return str;}    
  }
  private getDropDownPagName(params:any){
    let p;
    if(!this.isFilter){
      p = params.split('&')[0];
    }else{
      p = null;
    }
    this.service.getConsumerDropDetails(p).subscribe((data: any) => {
      if (data.length > 0) {
        this.names_ = data.map((x: any) => { return x.level });
        this._cd.detectChanges();
      }
    })
  }
  api_request(params: any) {
    this.p=1;
    let p = params.split('&')[0];
    this.getDropDownPagName(params);
    if (this.basicData.clientId) {
      params += `&clientId=${this.basicData.clientId}`;
    }
    this.service.ConsumerDrop_DrillDownReport(params).subscribe((data: any) => {
      console.log(data);
      this.showHtmlChart = true;
      if (data.length > 0) {
        this.$table = data;
        this.showHtmlChart = true;
        this._cd.detectChanges()
      }
      else {
        this.$table = []
        this._cd.detectChanges()
      }
    })
  }

  exportexcel() {
    if (this.pageName != "null") {
      this.fileName = this.pageName;
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
      XLSX.writeFile(wb, `Consumer Drop (${this.fileName}) - ${this.date_title}.xlsx`)
    }, 500);

  }

  generatePDF() {
    let data = this.basicData.page_name;
    const doc = new jsPDF()
    autoTable(doc, { html: '#excel-table' })
    doc.save(`${data}-data-table.pdf`);
  }
  printReport():void{
    this.service.printReport();
  }
  BacktoDash() {
    this.router.navigate(['dashboard'])
  }

  params: string = '';
  day: string | null | undefined;
  year: string | null | undefined;
  month: string | null | undefined;
  toggleFilter(str: string) {
    this.itemsPerPageC = 100;
    //this.isFilter = true;
    this.showHtmlChart = false;
    if (str == 'day') {
      console.log(this.selectedDay)
      this.selectedMonth = 'null';
      this.selectedYear = 'null';

      if (this.selectedDay == 'today') {
        let d = new Date();
        d.setDate(d.getDate());
        let today_date = this._date.transform(d, 'yyyy-MM-dd');
        this.params = `?day=${today_date}`;
        this.day = today_date;
        if (this.pageName != 'null') { this.params += `&pageName=${this.pageName}`; }
        this.date_title = 'Today'
        this.api_request(this.params);

      }
      else {
        let d = new Date();
        d.setDate(d.getDate() - 1);
        let yesterday_date = this._date.transform(d, 'yyyy-MM-dd');
        this.params = `?day=${yesterday_date}`;
        this.day = yesterday_date;
        if (this.pageName != 'null') { this.params += `&pageName=${this.pageName}`; }
        this.date_title = 'Yesterday'
        this.api_request(this.params);
      }

    }

    else if (str == 'month') {
      this.day = 'null';
      this.selectedDay = 'null';
      this.selectedMonth = this.monthsList.find((x: any) => x.value == this.selectedMonth).key;
      if (this.selectedMonth != 'null' && this.selectedYear != 'null') {
        this.month = `?month=${this.selectedYear}-${this.selectedMonth}-01`;
        this.params = `?month=${this.selectedYear}-${this.selectedMonth}-01`;
        if(this.pageName!='null'){this.params += `&pageName=${this.pageName}`}
        this.api_request(this.params);
      }
      if (this.selectedMonth != 'null' && this.selectedYear == 'null') {
        this.selectedYear = this.totalYearForFilter[0];
        this.month = `?month=${this.selectedYear}-${this.selectedMonth}-01`;
        this.params = `?month=${this.selectedYear}-${this.selectedMonth}-01`;
        if(this.pageName!='null'){this.params += `&pageName=${this.pageName}`}
        this.api_request(this.params);
      }
      if (this.selectedYear != 'null' && this.selectedMonth == 'null') {
        this.month = `?year=${this.selectedYear}-01-01}`;
        this.params = `?year=${this.selectedYear}-01-01&pageName=${this.pageName}`;
        this.api_request(this.params);
      }
      // this.selectedMonth = this.monthsList.find((x:any)=>{x.value == this.selectedMonth}).value
      this._cd.detectChanges();
    }
    else if (str == 'year') {
      this.selectedDay = 'null';
      if (this.selectedMonth != 'null') {
        this.selectedMonth = this.monthsList.find((x: any) => x.value == this.selectedMonth).key;
      }
      if (this.selectedMonth != 'null' && this.selectedYear != 'null') {
        this.year = `?month=${this.selectedYear}-${this.selectedMonth}-01`;
        this.params = `?month=${this.selectedYear}-${this.selectedMonth}-01`;
        if(this.pageName!='null'){this.params += `&pageName=${this.pageName}`}
        this.api_request(this.params);
      }
      else if (this.selectedYear == 'null') {
        this.year = `?pageName=${this.pageName}`;
        this.params = `?pageName=${this.pageName}`;
        this.selectedMonth = 'null';
        this.month = 'null';
        this.date_title = 'All'
        this.api_request(this.params);
      }
      else if (this.selectedYear != 'null' && this.selectedMonth == 'null') {
        this.year = `?year=${this.selectedYear}-01-01`;
        this.params = `?year=${this.selectedYear}-01-01`;
        if(this.pageName!='null'){this.params += `&pageName=${this.pageName}`}
        this.date_title = this.selectedYear
        this.api_request(this.params);
      }
      this._cd.detectChanges();
    }
    else if (str == 'names') {
      let p = this.params.split('=');
      let str_p:any;
      /// let str_p = p[0] + '=' + p[1] + '=' + this.pageName;
      //str_p = this.params = `?pageName=${this.pageName}`     
      if(this.pageName != 'null' && this.pageName != undefined && !this.isFilter){
        str_p =  this.params.replace(/(pageName=)[^&]*/, `pageName=${this.pageName}`);
      }
      if(this.pageName != 'null' && this.pageName != undefined && this.isFilter){
        str_p =  str_p = this.params = `?pageName=${this.pageName}`;
      }
      if (this.day != 'null' && this.day != undefined && this.isFilter) {
        str_p += `&day=${this.day}`;
      }
      if (this.selectedMonth != "null") {
        var month = this.monthsList.find((x: any) => x.value == this.selectedMonth).key;
        str_p += `${this.month}`;
      }
      if (this.selectedMonth != 'null' && this.selectedYear != 'null' && this.isFilter) {
        this.month = `&month=${this.selectedYear}-${month}-01`;
        str_p += `${this.month}`;
      }
      if (this.selectedMonth != 'null' && this.selectedYear == 'null' && this.isFilter) {
        this.selectedYear = this.totalYearForFilter[0];
        this.month = `&month=${this.selectedYear}-${month}-01`;
        str_p += `${this.month}`;
      }
      if (this.selectedYear != 'null' && this.selectedMonth == 'null' && this.isFilter) {
        this.month = `&year=${this.selectedYear}-01-01`;
        str_p += `${this.month}`;
      }
      if (this.selectedYear == 'null' && this.isFilter) {
        this.month = ``;
        str_p += `${this.month}`;
      }      
      this.params=str_p;
      this.api_request(str_p);
    }
    let p = this.params.split('=');
    let a = String(p[0] + '=' + p[1]).split('?')[1];
    console.log(a);
    let b = a?.split('=')[0]
    console.log(b)
    if (b == undefined) {
      this.date_title = "All";
    }
    else if (b == 'month') {
      // this.date_title = a?.split('=')[1]
      let k = a?.split('=')[1];
      let l = k.split('-');
      console.log(l[1])
      let name = this.monthsList.find((x: any) => { return x.key == l[1] }).value;
      this.date_title = `${name} ${l[0]}`;
      this.selectedMonth = name;
      this.selectedYear = l[0]
    }
    else if (b == 'year') {
      let k = a?.split('=')[1];
      let l = k.split('-');
      this.date_title = `${l[0]}`;
      this.selectedYear = l[0]
    }

  }

  Reset() {    
    this.isFilter = true;
    this.getDropDownPagName(this.params);
    this.itemsPerPageC = 100;    
    this.showHtmlChart = false
    this.selectedDay = 'null';
    this.selectedMonth = 'null';
    this.selectedYear = 'null';
    this.pageName = 'null';
    let params = null;
    this.date_title = 'All'
    this.day = 'null';
    this.month = 'null';
    this.year = 'null';
    if (this.basicData.clientId != null) {
      params = `?clientId=${this.basicData.clientId}`;
    }

    this.service.ConsumerDrop_DrillDownReport(params).subscribe((data: any) => {
      console.log(data);
      this.showHtmlChart = true;
      if (data.length > 0) {
        this.$table = data;
        this.showHtmlChart = true;
        this.totalRecordCount = data.length;
        //console.log(data.length);
        // console.log(this.$table, "$$$$$$$$$$$$$$$table")
        this._cd.detectChanges()
      }
      else {
        this.$table = []
        this._cd.detectChanges()
      }
    })
  }

  sortColumn: any;
  sortDirection: any;


  sort(column: any) {

    if (column === this.sortColumn) {
      // If the same column is clicked again, reverse the sort direction
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // If a new column is clicked, set it as the sort column and default to ascending direction
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    // Perform the actual sorting
    this.$table.sort((a: any, b: any) => {
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
  resetAll() {   
    this.selectedDay = 'null';
    this.selectedMonth = 'null';
    this.selectedYear = 'null';
    this.pageName = 'null';
    let params = null;
    this.date_title = 'All'
    if (this.basicData.clientId != null) {
      params = `?clientId=${this.basicData.clientId}`;
    }
    this.showHtmlChart = false
    this.service.ConsumerDrop_DrillDownReport(params).subscribe((data: any) => {      
      this.showHtmlChart = true;
      if (data.length > 0) {
        this.$table = data;
        this.showHtmlChart = true;
        this._cd.detectChanges()
      }
      else {
        this.$table = []
        this._cd.detectChanges()
      }
    })
  }

}
