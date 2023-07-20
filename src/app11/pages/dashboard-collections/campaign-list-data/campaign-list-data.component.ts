import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RootPageService } from '../../root-page.service'
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
// import { DataTableService } from '../../tables/datatable/datatable.service';
// import { dataTableSortableDirective } from '../dashboard-datatablele.directive';
import { DatePipe, DecimalPipe } from '@angular/common';

import { Router } from '@angular/router';

// import { BehaviorSubject } from 'rxjs';
// import { SafeValue } from '@angular/platform-browser';


export type SortColumn = keyof Table | '';
export type SortDirection = 'asc' | 'desc' | '';

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}
export interface Table {
  id: number,
  ipAdress: string,
  createdOn: any,
  countryCode: string,
  location: string
}

@Component({
  selector: 'app-campaign-list-data',
  templateUrl: './campaign-list-data.component.html',
  styleUrls: ['./campaign-list-data.component.scss'],
  providers: [DecimalPipe]
})



export class CampaignListDataComponent implements OnInit {
  isFilter: boolean = false;
  //fileName: any;
  breadCrumbItems!: Array<{}>;
  public campaignData: any;
  public fileName: string = 'ExcelSheet.xlsx';
  public drillCountData: any;
  public searchTerm: any;
  tables$: any;
  total$: any;
  pageSize: number = 10;
  showHtmlChart: boolean = false;

  conversionTableData: any = []
  landingTableData: any = []
  revenueTableData: any = []
  $table: any = [];
  showConvTable: boolean = false;
  showLandTable: boolean = false;
  showRevTable: boolean = false;
  public _yearFilter: any;
  public _monthFilter: any;
  public _dateFilter: any;
  public p: any = 1
  public itemsPerPageC: any = 1000;
  yearsList: any = []
  line_name:any='null';
  totalRecordCount: number | undefined;

  constructor(private rootPageService: RootPageService, private _cd: ChangeDetectorRef, private _date: DatePipe, private router: Router) {

  }

  ngOnInit(): void {

    let currentYear: any = this._date.transform(new Date(), "yyyy");
    for (let _i = parseInt(currentYear); _i > 2017; _i--) {
      this.yearsList.push(_i);
    }

    this.breadCrumbItems = [
      { label: 'Dashbord' },
      { label: 'Campaign-list', active: true }
    ];

    this._dateFilter = ""
    this._monthFilter = ""
    this._yearFilter = ""
    if (sessionStorage.getItem("landing_metric_date")) {
      let _filterDate = sessionStorage.getItem("landing_metric_date");
      let _dateArray: any = _filterDate?.split("-");

      if (_dateArray && _dateArray.length > 0) {
        this._dateFilter = _dateArray[2];
        this._monthFilter = _dateArray[1];
        this._yearFilter = _dateArray[0];
      } else {
        const currentDate = new Date();
        // Get previous date
        const previousDate = new Date();
        previousDate.setDate(currentDate.getDate() - 1);

        let _currentDate = this._date.transform(new Date(previousDate), "yyyy-MM-dd");
        let _dateArray: any = _currentDate?.split("-");
        if (_dateArray && _dateArray.length > 0) {
          this._dateFilter = _dateArray[2];
          this._monthFilter = _dateArray[1];
          this._yearFilter = _dateArray[0];
        }
      }
    }



    this.shareCompaigingData();
    this.getDrillCount("null");



  }
  itemPerPage(val: string) {
    this.itemsPerPageC = val;
    if (this.totalRecordCount != undefined && val == "All") {
      this.itemsPerPageC = 50000;
      this.Reset();
    }    
  }
  shareCompaigingData() {
    this.rootPageService.shareCampaignData().subscribe(data => {
      this.campaignData = data;
      this.line_name = this.campaignData.line_name
    });
    this.getTitle()
  }
  title_date: any;
  Month_names: any = []
  getTitle() {

    this.Month_names = [{ id: 1, key: '01', name: "Jan" }, { id: 2, key: '02', name: "Feb" }, { id: 3, key: '03', name: "Mar" }, { id: 4, key: '04', name: "Apr" },
    { id: 5, key: '05', name: "May" }, { id: 6, key: '06', name: "Jun" }, { id: 7, key: '07', name: "Jul" }, { id: 8, key: '08', name: "Aug" }, { id: 9, key: '09', name: "Sep" },
    { id: 10, key: '10', name: "Oct" }, { id: 11, key: '11', name: "Nov" }, { id: 12, key: '12', name: "Dec" }];


    if (this.campaignData.date_title == "Hour") {
      let s = this.campaignData.y_axis_data;
      var d = new Date();
      d.setDate(d.getDate() - 1);
      let datePrint = this._date.transform(new Date(d), "dd-MM-yyyy");
      // this.title_date = `${datePrint}-${s}:00`;
      if (this.campaignData.selectedDay === "today") {
        this.title_date = `Today - ${s}:00`
        this.selectedDay = 'today'
      }
      else {
        this.title_date = `Yesterday - ${s}:00`;
        this.selectedDay = 'yesterday'
      }
      // this.title_date = `${s}:00-${day}-${month}-${year}`;
    } else if (this.campaignData.date_title == "Day") {
      let s = this.campaignData.y_axis_data;
      if (Number(s) < 10) { s = `0${s}` }
      let month = this.Month_names.find((x: any) => x.id == this._monthFilter)?.name;
      this.title_date = `${s}-${month}-${this._yearFilter}`;
    } else {
      let s = this.campaignData.y_axis_data.split('/');
      let month = this.Month_names.find((x: any) => x.id == s[0])?.name;
      this.title_date = `${month} ${s[1]}`
    }

  }
  exportexcel() {
    /* pass here the table id */
    let element = document.getElementById('excel-table')
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element)

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')

    /* save to file */
    XLSX.writeFile(wb, `Landing Trends (${this.campaignData.line_name})-${this.title_date}).xlsx`)
  }

  generatePDF() {
    let data = this.campaignData;
    const doc = new jsPDF()
    autoTable(doc, { html: '#excel-table' })
    doc.save(`${data.line_name}-data-table.pdf`)
  }
  getDrillCount(value: any) {
    this.count = this.campaignData.x_axis_data;
    let totalObj;
    if (value != 'null') {
      totalObj = value;
    }
    if (this.campaignData.date_title == 'Month/Year') {
      totalObj = {
        year: this.campaignData.y_axis_data.split('/')[1],
        month: this.campaignData.y_axis_data.split('/')[0],
        clientId: this.campaignData.clientId,
        campaignId: this.campaignData.campaignId
      }
      let month = Number(totalObj.month) < 10 ? `0${totalObj.month}` : totalObj.month;
      let params = `year=${totalObj.year}&month=${month}`;
      if (totalObj.clientId != 'null') { params += `&clientId=${totalObj.clientId}` }
      if (totalObj.campaignId != 'null') { params += `&campaignId=${totalObj.campaignId}` }

      this.rootPageService.getDrillCountDataForTotal(params).subscribe((data: any) => {
        if (data.status == '200') {
          this.drillCountData = data.data;
          this.showHtmlChart = true


          if (this.campaignData.line_name == 'Conversion') {
            this.showConvTable = true;
            this.showLandTable = false;
            this.showRevTable = false;
            this.conversionTableData = data.data.Conversion_data;
            this.count = this.conversionTableData.length;

          } else if (this.campaignData.line_name == 'Landing') {
            this.showConvTable = false;
            this.showLandTable = true;
            this.showRevTable = false;
            this.landingTableData = data.data.Landing_data;
            this.count = this.landingTableData.length
          }
          // else if (this.campaignData.line_name == 'Revenue') {
          //   this.showConvTable = false;
          //   this.showLandTable = false;
          //   this.showRevTable = true;
          //   this.revenueTableData = data.data.Revenue_data
          // }
        }
      })

    }
    else if (this.campaignData.date_title == "Day") {
      const today = new Date();
      // const year = today.getFullYear();
      // const month_ = String(today.getMonth() + 1).padStart(2, '0');

      var d = new Date(this._yearFilter + "-" + this._monthFilter + "-" + this._dateFilter);

      let datePrint = this._date.transform(new Date(d), "dd-MM-yyyy");




      let day = Number(this.campaignData.y_axis_data) < 10 ? `0${this.campaignData.y_axis_data}` : this.campaignData.y_axis_data;
      totalObj = {
        year: datePrint?.split('-')[2],
        month: datePrint?.split('-')[1],
        day: day,
        clientId: this.campaignData.clientId,
        campaignId: this.campaignData.campaignId
      }
      let params = `year=${totalObj.year}&month=${totalObj.month}&day=${day}`;
      if (totalObj.clientId != 'null') { params += `&clientId=${totalObj.clientId}` }
      if (totalObj.campaignId != 'null') { params += `&campaignId=${totalObj.campaignId}` }
      this.rootPageService.getDrillCountDataForMonth(params).subscribe((data: any) => {
        if (data.status == '200') {
          this.drillCountData = data.data;
          this.showHtmlChart = true

          if (this.campaignData.line_name == 'Conversion') {
            this.showConvTable = true;
            this.showLandTable = false;
            this.showRevTable = false;
            this.conversionTableData = data.data.Conversion_data;
            this.count = this.conversionTableData.length
          } else if (this.campaignData.line_name == 'Landing') {
            this.showConvTable = false;
            this.showLandTable = true;
            this.showRevTable = false;
            this.landingTableData = data.data.Landing_data;
            this.count = this.landingTableData.length

          }
          // else if (this.campaignData.line_name == 'Revenue') {
          //   this.showConvTable = false;
          //   this.showLandTable = false;
          //   this.showRevTable = true;
          //   this.revenueTableData = data.data.Revenue_data
          // }
          // console.log()
        }
      })

    }
    else if (this.campaignData.date_title == "Hour") {
      
      // const today = new Date();
      // const year = today.getFullYear();
      // const month_ = String(today.getMonth() + 1).padStart(2, '0');
      // const day = String(today.getDate() - 1).padStart(2, '0');

      var d = new Date();
      d.setDate(d.getDate() - 1);
      let datePrint = this._date.transform(new Date(d), "dd-MM-yyyy");
      let hour = this.campaignData.y_axis_data;
      if (Number(hour) < 10) { hour = `0${hour}` }
      // totalObj = {
      //   year: datePrint?.split('-')[3],
      //   month: datePrint?.split('-')[2],
      //   // day: this.campaignData.y_axis_data
      //   day : datePrint?.split('-')[1]
      // }

      if (this.campaignData.line_name == 'Landing') {

        totalObj = {
          year: datePrint?.split('-')[2],
          month: datePrint?.split('-')[1],
          day: datePrint?.split('-')[0],
          hour: hour,
          // min: this.campaignData.day[this.campaignData.line_name].find((x: any) => x.landing_count == this.campaignData.x_axis_data)?.Minute,
          // sec: this.campaignData.day[this.campaignData.line_name].find((x: any) => x.landing_count == this.campaignData.x_axis_data)?.Second,
          // millSe: this.campaignData.day[this.campaignData.line_name].find((x: any) => x.landing_count == this.campaignData.x_axis_data)?.Millisecond,
          clientId: this.campaignData.clientId,
          campaignId: this.campaignData.campaignId
        }

      }
      else if (this.campaignData.line_name == 'Conversion') {
        totalObj = {

          year: datePrint?.split('-')[2],
          month: datePrint?.split('-')[1],
          day: datePrint?.split('-')[0],
          hour: hour,
          // min: this.campaignData.day[this.campaignData.line_name].find((x: any) => x.count == this.campaignData.x_axis_data)?.Minute,
          // sec: this.campaignData.day[this.campaignData.line_name].find((x: any) => x.count == this.campaignData.x_axis_data)?.Second,
          // millSe: this.campaignData.day[this.campaignData.line_name].find((x: any) => x.count == this.campaignData.x_axis_data)?.Millisecond,
          clientId: this.campaignData.clientId,
          campaignId: this.campaignData.campaignId
        }
      }
      let onday: any;
      if (this.campaignData.selectedDay == "today") {
        let d = new Date();
        d.setDate(d.getDate());
        onday = this._date.transform(d, "yyyy-MM-dd");
        console.log("onday", onday)
        onday = onday.split('-')[2]
      }
      else {
        onday = totalObj.day;
      }
      let params = `year=${totalObj.year}&month=${totalObj.month}&day=${onday}&hour=${totalObj.hour}`;
      // if (totalObj.clientId != null) { params += `&clientId=${totalObj.clientId}` }
      // if (totalObj.campaignId != 'null') { params += `&campaignId=${totalObj.campaignId}` }

      this.params = params;

      this.get_api_data_for_day(params);
    }


    if (totalObj != undefined) {
      let obj = {
        api_params: totalObj,
        line_name: this.campaignData.line_name,
        date_title: this.campaignData.date_title
      }
      sessionStorage.setItem("lastEmittedObj", JSON.stringify(obj));
      sessionStorage.setItem("campaignData", JSON.stringify(this.campaignData))
    }
    else {
      let data: any = sessionStorage.getItem('campaignData');
      this.campaignData = JSON.parse(data)
      let Obj: any = sessionStorage.getItem('lastEmittedObj');
      this.getDrillCount(JSON.parse(Obj).api_params);
      this.getTitle()
    }
  }
  showAlert: boolean = true;
  hideAlertMessage() {
    let comp = document.getElementById("alert");
    comp?.classList.add('remove')
    //  this.showAlert = false
  }
  BacktoDash() {
    this.router.navigate(['dashboard'])
  }
  selectedDay: any = 'null'
  selectedMonth: any = 'null'
  selectedYear: any = 'null'
  params: any = 'null'
  count: any = ''

  toggleFilter(str: any) {
    this.itemsPerPageC=1000;
    this.isFilter=true;
    this.showHtmlChart = false
    if (str == 'day') {
      this.selectedMonth = 'null'
      this.selectedYear = 'null'
      let d = new Date()
      if (this.selectedDay == 'today') {
        this.title_date = 'Today'
        d.setDate(d.getDate())
      }
      else {
        this.title_date = 'Yesterday';
        d.setDate(d.getDate() - 1)
      }
      let _date = this._date.transform(d, 'yyyy-MM-dd');
      let year = _date?.split('-')[0].trim()
      let month = _date?.split('-')[1].trim()
      let day = _date?.split('-')[2].trim()
      let params = `year=${year}&month=${month}&day=${day}`;
      console.log(params)
      this.get_api_data_for_day(params);
    }
    else if (str == 'month') {
      this.selectedDay = 'null'
      let params: any = '';
       if (this.selectedYear == 'null' && this.selectedMonth != 'null') {
        this.selectedYear = this.yearsList[0];
        params = `year=${this.selectedYear}&month=${this.selectedMonth}`;
        let m_name = this.Month_names.find((x:any)=>{return x.key == this.selectedMonth}).name;
        this.title_date = `${m_name}-${this.selectedYear}`;
      }
      else if (this.selectedMonth != 'null' && this.selectedYear != 'null') {
        params = `year=${this.selectedYear}&month=${this.selectedMonth}`;
        let m_name = this.Month_names.find((x:any)=>{return x.key == this.selectedMonth}).name;
        this.title_date = `${m_name}-${this.selectedYear}`;
      }
     
      else if (this.selectedMonth == 'null' && this.selectedYear != 'null') {
        debugger
        params = `year=${this.selectedYear}`;
        this.title_date  = `${this.selectedYear}`;
      }
      this.get_api_data_for_day(params)
    }
    else if (str == 'year') {
      this.selectedDay = 'null';
      this.selectedDay = 'null';
      let params: any = '';
      if (this.selectedMonth != 'null' && this.selectedYear != 'null') {
        params = `year=${this.selectedYear}&month=${this.selectedMonth}`;
        let m_name = this.Month_names.find((x:any)=>{return x.key == this.selectedMonth}).name;
        this.title_date = `${m_name}-${this.selectedYear}`;
      }
      else if (this.selectedMonth == 'null') {
        params = `year=${this.selectedYear}`;
        this.title_date = `${this.selectedYear}`;
      }
      this.get_api_data_for_day(params);
    }
  }

  get_api_data_for_day(params: any) {
    this.p=1;
    if (this.campaignData.clientId != 'null') { params += `&clientId=${this.campaignData.clientId}` }
    if (this.campaignData.campaignId != 'null') { params += `&campaignId=${this.campaignData.campaignId}` }

    this.rootPageService.getDrillCountDataForDay(params).subscribe((data: any) => {
      this.landingTableData = []
      this.conversionTableData =[]
      this.showHtmlChart = true
      if (data.status == '200' && (data.data.Conversion_data || data.data.Landing_data)) {
        this.drillCountData = data.data;
        if (this.campaignData.line_name == 'Conversion') {
          this.showConvTable = true;
          this.showLandTable = false;
          this.showRevTable = false;
          this.conversionTableData = data.data.Conversion_data;
          this.count = this.conversionTableData.length
        } else if (this.campaignData.line_name == 'Landing') {
          this.showConvTable = false;
          this.showLandTable = true;
          this.showRevTable = false;
          this.landingTableData = data.data.Landing_data;
          this.count = this.landingTableData.length

        }
        else if (this.campaignData.line_name == 'Revenue') {
          this.showConvTable = false;
          this.showLandTable = false;
          this.showRevTable = true;
          this.revenueTableData = data.data?.Revenue_data
        }

      }

    })
  }
  
  Reset(){
    this.itemsPerPageC=1000;
    this.isFilter = true;
    this.title_date = "All"
    this.line_name ='All'
    this.showHtmlChart = false
    this.selectedDay = 'null'
    this.selectedMonth  = 'null'
    this.selectedYear = 'null'
    let params:any = null;
    if (this.campaignData.clientId != 'null' && this.campaignData.clientId != undefined) { params = `clientId=${this.campaignData.clientId}` }
    if (this.campaignData.campaignId != 'null' && this.campaignData.campaignId != undefined) { params += `&campaignId=${this.campaignData.campaignId}`};

    this.rootPageService.getDrillCountDataForDay(params).subscribe((data: any) => {
      this.landingTableData = []
      this.conversionTableData =[]
      this.showHtmlChart = true
      if (data.status == '200' && (data.data.Conversion_data || data.data.Landing_data)) {
        this.drillCountData = data.data;
        this.totalRecordCount=data.data.length;
        if (this.campaignData.line_name == 'Conversion') {
          this.showConvTable = true;
          this.showLandTable = false;
          this.showRevTable = false;
          this.conversionTableData = data.data.Conversion_data;
          this.count = this.conversionTableData.length;
          this.line_name = this.campaignData.line_name+" All"
        } else if (this.campaignData.line_name == 'Landing') {
          this.showConvTable = false;
          this.showLandTable = true;
          this.showRevTable = false;
          this.landingTableData = data.data.Landing_data;
          this.count = this.landingTableData.length;
          this.line_name = this.campaignData.line_name+" All";
        }
        else if (this.campaignData.line_name == 'Revenue') {
          this.showConvTable = false;
          this.showLandTable = false;
          this.showRevTable = true;
          this.revenueTableData = data.data?.Revenue_data;
          this.line_name = this.campaignData.line_name+" All";
        }

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
    let params:any = null;
    if (this.campaignData.clientId != 'null' && this.campaignData.clientId != undefined) { params = `clientId=${this.campaignData.clientId}` }
    if (this.campaignData.campaignId != 'null' && this.campaignData.clientId != undefined) { params += `&campaignId=${this.campaignData.campaignId}`};

    this.rootPageService.getDrillCountDataForDay(params).subscribe((data: any) => {
      this.landingTableData = []
      this.conversionTableData =[]
      this.showHtmlChart = true
      if (data.status == '200' && (data.data.Conversion_data || data.data.Landing_data)) {
        this.drillCountData = data.data;
        this.totalRecordCount=data.data.length;
        if (this.campaignData.line_name == 'Conversion') {
          this.showConvTable = true;
          this.showLandTable = false;
          this.showRevTable = false;
          this.conversionTableData = data.data.Conversion_data;
          this.count = this.conversionTableData.length
        } else if (this.campaignData.line_name == 'Landing') {
          this.showConvTable = false;
          this.showLandTable = true;
          this.showRevTable = false;
          this.landingTableData = data.data.Landing_data;
          this.count = this.landingTableData.length

        }
        else if (this.campaignData.line_name == 'Revenue') {
          this.showConvTable = false;
          this.showLandTable = false;
          this.showRevTable = true;
          this.revenueTableData = data.data?.Revenue_data
        }

      }
    })
  }
}
