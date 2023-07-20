import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RootPageService } from '../../root-page.service';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DatePipe, DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-five-campaign-list',
  templateUrl: './top-five-campaign-list.component.html',
  styleUrls: ['./top-five-campaign-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TopFiveCampaignListComponent implements OnInit {
  isFilter: boolean = false;
  fileName: any;
  basicData: any;
  showHtmlChart: boolean = false
  $table: any = [];
  currentPage:number=1;
  public p: any = 1
  public itemsPerPageC: any = 100;
  date_title: any = "";
  monthList: any = [];
  yearsList: any = [];
  totalRecordCount: number | undefined;

  constructor(private service: RootPageService, private _cd: ChangeDetectorRef, private _date: DatePipe,
    private router: Router) { }

  ngOnInit() {
    this.monthList = [{ id: "01", name: "Jan" }, { id: "02", name: "Feb" }, { id: "03", name: "Mar" }, { id: "04", name: "Apr" },
    { id: "05", name: "May" }, { id: "06", name: "Jun" }, { id: "07", name: "Jul" }, { id: "08", name: "Aug" }, { id: "09", name: "Sep" },
    { id: "10", name: "Oct" }, { id: "11", name: "Nov" }, { id: "12", name: "Dec" }];

    let currentYear: any = this._date.transform(new Date(), "yyyy");
    for (let _i = parseInt(currentYear); _i > 2017; _i--) {
      this.yearsList.push(_i);
    }

    this.getTop5CampaignListData()
  }
  itemPerPage(val: string) {
    this.itemsPerPageC = val;
    if (val == "All") {
      this.itemsPerPageC = 50000;
      this.Reset();
    }    
  }

  getTop5CampaignListData() {
    this.service.getTopFiveCampaignData().subscribe((data: any) => {
      this.basicData = data;
      console.log(this.basicData)
      if (this.basicData != null) {
        sessionStorage.setItem("basicData", JSON.stringify(this.basicData));
      }
      else {
        let data: any = sessionStorage.getItem("basicData");
        this.basicData = JSON.parse(data);
      }
      console.log(this.basicData)
      this.campaignId = this.basicData.campaignId;
      this.selectedMatrics = this.basicData.selected_matrices;
      this.loadListingData();
      this._cd.detectChanges();
    });
  }

  loadListingData() {
    // http://localhost:9090/api/dashboard/top-five-campaign-detail-list?
    // year=2020&month=10&campaignId=5f927231421aa975c03b33c4&day=23
    var d = new Date();
    d.setDate(d.getDate() - 1);
    let datePrint = this._date.transform(new Date(d), "dd-MM-yyyy");

    let year = datePrint?.split('-')[2]
    let month = datePrint?.split('-')[1]
    let day = datePrint?.split('-')[0]
    let params;
    if (this.basicData.selected_label == 'total') {
      params = `campaignId=${this.basicData.campaignId}&state=${this.basicData.selected_matrices}`;
      if (this.basicData.clientId != null) { params += `&clientId=${this.basicData.clientId}` }
      this.date_title = "All";
    }
    else if (this.basicData.selected_label == "year") {
      params = `year=${this.basicData.selected_year}&campaignId=${this.basicData.campaignId}&state=${this.basicData.selected_matrices}`;
      if (this.basicData.clientId != null) { params += `&clientId=${this.basicData.clientId}` }
      this.date_title = this.basicData.selected_year;
      this.selectedYear = this.basicData.selected_year
    }
    else if (this.basicData.selected_label == 'month') {
      // let _Month:any;
      // if(Number(this.basicData.date.Month < 10)){ _Month = `0${this.basicData.date.Month}`}
      // else{ _Month = this.basicData.date.Month }

      params = `year=${this.basicData.selected_year}&month=${this.basicData.selected_month}&campaignId=${this.basicData.campaignId}&state=${this.basicData.selected_matrices}`;
      if (this.basicData.clientId != null) { params += `&clientId=${this.basicData.clientId}` }
      let month_name = this.monthList.find((x: any) => { return x.id == this.basicData.selected_month }).name;
      this.date_title = `${month_name} ${this.basicData.selected_year}`;
      this.selectedMonth = month_name
      this.selectedYear = this.basicData.selected_year
    }
    else if (this.basicData.selected_label == 'yesterday') {
      params = `year=${year}&month=${month}&day=${day}&campaignId=${this.basicData.campaignId}&state=${this.basicData.selected_matrices}`;
      if (this.basicData.clientId != null) { params += `&clientId=${this.basicData.clientId}` }
      this.date_title = `Yesterday`
      this.selectedDay = 'yesterday'
    }
    else if (this.basicData.selected_label == "Today") {

      let d = new Date()
      d.setDate(d.getDate());
      let for_day = this._date.transform(d, "yyyy-MM-dd");
      let onday = for_day?.split('-')[2]
      params = `year=${year}&month=${month}&day=${onday}&campaignId=${this.basicData.campaignId}&state=${this.basicData.selected_matrices}`;
      if (this.basicData.clientId != null) { params += `&clientId=${this.basicData.clientId}` }
      this.date_title = `Today`
      this.selectedDay = 'today'
    }

    console.log(params);
    this.params = params

    this.service.TopFiveCampaign_DrillDownReport(params).subscribe((data: any) => {
      this.showHtmlChart = true;
      if (data.data.length > 0) {
        this.$table = data.data;
        this.totalRecordCount=data.data.length;
        this._cd.detectChanges()
      }
    })
  }

  exportexcel() {
    if (this.selectedMatrics != "null" || this.selectedMatrics != "null") {
      this.fileName = this.selectedMatrics;
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
    XLSX.writeFile(wb, `Top Five Campaign (${this.fileName})- ${this.date_title}.xlsx`)
    }, 1000);
    
  }

  generatePDF() {
    let data = this.basicData.date.campaignName[0].name;
    const doc = new jsPDF()
    autoTable(doc, { html: '#excel-table' })
    doc.save(`${data}-data-table.pdf`)
  }
  BacktoDash() {
    this.router.navigate(['dashboard'])
  }

  selectedDay: any = 'null'
  selectedMonth: any = 'null'
  selectedYear: any = 'null'
  selectedMatrics: any = 'null'
  campaignId: any = null
  params: any = '';
  type: number =100;

  toggleFilter(str: any) {
    this.itemsPerPageC = 100;
    this.isFilter = true;
    this.showHtmlChart = false;
    if (str == 'day') {
      this.selectedMonth = 'null'
      this.selectedYear = 'null'
      if (this.selectedDay == 'today') {
        let d = new Date()
        d.setDate(d.getDate());
        let for_day = this._date.transform(d, "yyyy-MM-dd");
        let year = for_day?.split('-')[0]
        let month = for_day?.split('-')[1]
        let day = for_day?.split('-')[2]
        this.params = `year=${year}&month=${month}&day=${day}&campaignId=${this.campaignId}&state=${this.selectedMatrics}`;
        if (this.basicData.clientId != null) { this.params += `&clientId=${this.basicData.clientId}` }
        this.date_title = 'Today';
        this.selectedDay = 'today'
        this.getApiCall(this.params)
      }
      else {
        let d = new Date()
        d.setDate(d.getDate() - 1);
        let for_day = this._date.transform(d, "yyyy-MM-dd");
        let year = for_day?.split('-')[0]
        let month = for_day?.split('-')[1]
        let day = for_day?.split('-')[2]
        this.params = `year=${year}&month=${month}&day=${day}&campaignId=${this.basicData.campaignId}&state=${this.selectedMatrics}`;
        if (this.basicData.clientId != null) { this.params += `&clientId=${this.basicData.clientId}` }
        this.date_title = 'Yesterday';
        this.selectedDay = 'yesterday'
        this.getApiCall(this.params);
      }
    }
    else if (str == 'month') {
      this.selectedDay = 'null';

      if (this.selectedYear == 'null') {
        this.selectedYear = this.yearsList[0];
      }
      if (this.selectedMonth != 'null' && this.selectedYear != 'null') {
        let month_key = this.monthList.find((x: any) => x.name == this.selectedMonth).id
        this.params = `year=${this.selectedYear}&month=${month_key}&campaignId=${this.basicData.campaignId}&state=${this.selectedMatrics}`;
        this.date_title = `${this.selectedMonth} ${this.selectedYear}`;

      }
      if (this.selectedMonth == 'null' && this.selectedYear != 'null') {
        this.params = `year=${this.selectedYear}&state=${this.selectedMatrics}`;
        this.date_title = `${this.selectedYear}`;
      }

      if (this.basicData.clientId != null) {
        this.params += `&clientId=${this.basicData.clientId}`;
      }
      this.getApiCall(this.params);
    }
    else if (str == 'year') {
      this.selectedDay = 'null';

      if (this.selectedYear != 'null' && this.selectedMonth != 'null') {
        let month_key = this.monthList.find((x: any) => x.name == this.selectedMonth).id
        this.params = `year=${this.selectedYear}&month=${month_key}&campaignId=${this.basicData.campaignId}&state=${this.selectedMatrics}`;
        this.date_title = `${this.selectedMonth} ${this.selectedYear}`
      }
      if (this.selectedMonth == 'null' && this.selectedYear != 'null') {
        this.params = `year=${this.selectedYear}&campaignId=${this.basicData.campaignId}&state=${this.selectedMatrics}`;
        this.date_title = `${this.selectedYear}`;
      }
      if (this.basicData.clientId != null) {
        this.params += `&clientId=${this.basicData.clientId}`;
      }
      this.getApiCall(this.params)
    }
    else if (str == 'matrics') {

      let updatedStr = this.params.replace(/(state=)[^&]*/, `state=${this.selectedMatrics}`);
      this.getApiCall(updatedStr);
    }
  }

  getApiCall(params: any) {
    this.p=1;
    this.service.TopFiveCampaign_DrillDownReport(params).subscribe((data: any) => {
      this.showHtmlChart = true;
      if (data.data.length > 0) {
        this.$table = data.data;
        this.totalRecordCount=data.data.length;
        this._cd.detectChanges()
      }
      else {
        this.$table = [];
        this._cd.detectChanges()
      }
    })
  }

  Reset() {
    this.itemsPerPageC=100;
    this.type=100;
    this.isFilter=true;
    this.showHtmlChart=false;
    this.selectedDay = 'null'
    this.selectedMonth = 'null'
    this.selectedYear = "null"
    //this.selectedMatrics = 'null'
    this.date_title = 'All'
    let params: any = `?state=${this.selectedMatrics}&campaignId=${this.campaignId}`;
    if (this.basicData.clientId != null) {
      this.params = `&clientId=${this.basicData.clientId}`;
    }

    this.getApiCall(params)

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
    let params: any = `?state=${this.selectedMatrics}&campaignId=${this.campaignId}`;
    if (this.basicData.clientId != null) {
      this.params = `&clientId=${this.basicData.clientId}`;
    }

    this.getApiCall(params)
  }
}