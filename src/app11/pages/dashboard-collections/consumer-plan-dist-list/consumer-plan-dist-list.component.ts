import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { RootPageService } from '../../root-page.service';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DatePipe, DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-consumer-plan-dist-list',
  templateUrl: './consumer-plan-dist-list.component.html',
  styleUrls: ['./consumer-plan-dist-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsumerPlanDistListComponent {
  isFilter: boolean = false;
  fileName: any;
  basicData: any;
  showHtmlChart: boolean = false
  $table: any = [];
  public p: any = 1
  public itemsPerPageC: any = 100;
  count: number = 1;
  date_title: any = '';
  monthsList: any = [];
  isYesterdayCheck: boolean = true;
  selectedMonth: any = 'null'
  selectedYear: any = 'null'
  yearsList: any = [];
  current_date: any;
  selectedDay: any = 'null'
  pre_params: any = null;
  selectedPlan: any;
  selectedCover: any;
  ap_name: any = []
  b_name: any = []
  c_name: any = []
  day: string | null | undefined;
  year: string | null | undefined;
  month: string | null | undefined;
  totalRecordCount: number | undefined;

  constructor(private service: RootPageService, private _cd: ChangeDetectorRef,
    private _date: DatePipe, private router: Router) { }

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
    this.showMonthList()
    this.getConsumerPlanDistData()
  }

  itemPerPage(val: string) {
    this.itemsPerPageC = val;
    if (val == "All") {
      this.itemsPerPageC = 50000;
      this.Reset();
    }    
  }

  showMonthList = () => {

    let _newYear = this._date.transform(new Date(), "yyyy");
    let _currentMonth: any = this._date.transform(new Date(), "MM");


    if (this.selectedYear == _newYear) {
      this.monthsList = this.monthsList.filter((x: any) => {
        return parseInt(x.key) <= parseInt(_currentMonth)
      });
    }

    var d = new Date();
    d.setDate(d.getDate() - 1);
    this.current_date = this._date.transform(new Date(d), "yyyy-MM-dd");

    let currentYear: any = this._date.transform(new Date(), "yyyy");

    for (let _i = parseInt(currentYear); _i > 2017; _i--) {
      this.yearsList.push(_i);
    }
    this._cd.detectChanges();
  }
  getConsumerPlanDistData() {

    this.service.getConsumerPlanDistData().subscribe((data: any) => {
      if (data) {
        this.basicData = data;
        if (this.basicData != null) {
          sessionStorage.setItem("basicData", JSON.stringify(this.basicData));
        }
        else {
          let data: any = sessionStorage.getItem("basicData");
          this.basicData = JSON.parse(data);
        }
        this.selectedPlan = this.basicData.planName;
        this.selectedCover = this.basicData.category;
        this.loadListingData();
      }
      else {
        let data: any = sessionStorage.getItem("basicData");
        this.basicData = JSON.parse(data);
        this.selectedPlan = this.basicData.planName;
        this.selectedCover = this.basicData.category;
        this.loadListingData();
        this._cd.detectChanges()
      }
    });
  }

  loadListingData() {

    // month=2023-04-20&day=2023-04-20&planName=3 Yearly 
    let params;
    if (this.basicData.request_date == null) {
      params = `?planName=${this.basicData.planName}&coverName=${this.basicData.category} Cover`;
      if (this.basicData.clientId != null) { params += `&clientId=${this.basicData.clientId}` }
    }
    else {
      params = `${this.basicData.request_date}&planName=${this.basicData.planName}&coverName=${this.basicData.category} Cover`;
      if (this.basicData.clientId != null) { params += `&clientId=${this.basicData.clientId}` }

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
      this.date_title = `${name} ${l[0]}`
      this.selectedMonth = this.monthsList.find((x: any) => { return x.key == l[1] }).key;
      this.selectedYear = l[0];
    }
    else if (b == 'year') {
      let k = a?.split('=')[1];
      let l = k.split('-');
      this.date_title = `${l[0]}`
      this.selectedYear = l[0]
    }
    else {
      // this.date_title = "Yesterday"
      let date = a.split("=")[1];
      date =this.containsSpecialChars(date);
      let d = new Date()
      d.setDate(d.getDate());
      let today_date = this._date.transform(d, 'yyyy-MM-dd');
      if (today_date === date) {
        this.date_title = "Today";
        this.selectedDay = "today";
      }
      else {
        this.date_title = "Yesterday";
        this.selectedDay = "yesterday";
      }
    }


    this.count++;
    if (this.count == 2) {
      this.params = params;
      this.service.ConsumerPlanDist_DrillDownReport(params).subscribe((data: any) => {
        this.showHtmlChart = true;
        if (data && data.length > 0) {
          this.totalRecordCount = data.length;
          this.$table = data;
          this._cd.detectChanges()
        }
      })
      this.count++;
    }
  }
  private containsSpecialChars(str:string) {
    const specialChars = /[`!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?~]/;
    if(specialChars.test(str)){ return str.replace("&clientId","");} else{ return str;}    
  }
  exportexcel() {
    if (this.selectedCover != "null" || this.selectedPlan != "null") {
      if(this.selectedCover != "null" && this.selectedPlan != "null"){
        this.fileName = `(${this.selectedCover} - ${this.selectedPlan})`;
      }else if(this.selectedCover != "null" && this.selectedPlan == "null"){
        this.fileName = `(${this.selectedCover})`;
      }
      else if(this.selectedCover == "null" && this.selectedPlan != "null"){
        this.fileName = `(${this.selectedPlan})`;
      }
      
    } else {
      this.fileName = "(All)";
    }
    setTimeout(() => {
      /* pass here the table id */
      let element = document.getElementById('excel-table')
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element)

      /* generate workbook and add the worksheet */
      const wb: XLSX.WorkBook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')

      /* save to file */
      XLSX.writeFile(wb, `Consumer Plan Distribution ${this.fileName} - ${this.date_title}.xlsx`)

    }, 500);

  }

  generatePDF() {
    let data = this.basicData.filter;
    const doc = new jsPDF()
    autoTable(doc, { html: '#excel-table' })
    doc.save(`${this.basicData.category}-data-table.pdf`)
  }  
  displayAplianceName(data: any,val:any) {    
    this.ap_name = []
    data.map((x: any) => {
      if (x.plan_name == val) {
        this.ap_name.push(x.applianceName)
      }
    });
    return this.ap_name.join(", ").trim()
  }
  displayBrandName(data: any,val:any) {   
    this.b_name = []
    data.map((x: any) => {
      if (x.plan_name == val) {
        this.b_name.push(x.brandName)
      }
    });
    return this.b_name.join(", ").trim()
  }
  displayCoreReference(data: any,val:any) {  
    this.c_name = []
    data.map((x: any) => {
      if (x.plan_name == val) {
        this.c_name.push(x.coreReference)
      }
    });
    return this.c_name.join(", ")
  }
  transactionUpdate = (transactionAr: any) => {
    let _trx = transactionAr;
    let newAr: any = []
    if (transactionAr && transactionAr.length > 0) {
      newAr = [...new Set(_trx.map((item: any) => item.transactionNo))];
      return newAr.join(",")
    } else {
      return "NA";
    }
  }

  onMonthChange() {
    this.showHtmlChart = false
    this.selectedDay = 'null'
    this.day = 'null'
    let params: string = '';
    if (this.selectedYear == 'null') { this.selectedYear = this.yearsList[0] };
    if (this.selectedMonth != 'null' && this.selectedYear != 'null') {
      params = `?month=${this.selectedYear}-${this.selectedMonth}-01`;
    }
    if (this.selectedYear != 'null' && this.selectedMonth == 'null') {
      params = `?year=${this.selectedYear}-01-01`;
    }
    this.month = params;
    if (this.selectedCover != "null") { params += `&coverName=${this.selectedCover} Cover` };
    if (this.selectedPlan != "null") { params += `&planName=${this.selectedPlan}` };
    if (this.basicData.clientId != null) {
      params += `&clientId=${this.basicData.clientId}`;
    }
    this.getApiRequest(params);
    this._cd.detectChanges();
  }
  onYearChange() {
    this.showHtmlChart = false
    this.selectedDay = 'null'
    this.day = 'null'
    let params: string = '';
    if (this.selectedMonth != 'null' && this.selectedYear != 'null') {
      params = `?month=${this.selectedYear}-${this.selectedMonth}-01&`;
    }
    if (this.selectedYear != 'null' && this.selectedMonth == 'null') {
      params = `?year=${this.selectedYear}-01-01&`;
    }
    this.year = params;
    if (this.selectedYear == 'null') {
      params = `?`;
      this.selectedMonth = 'null';
    }
    if (this.selectedCover != "null") { params += `&coverName=${this.selectedCover} Cover` };
    if (this.selectedPlan != "null") { params += `&planName=${this.selectedPlan}` };

    if (this.basicData.clientId != null) {
      params += `&clientId=${this.basicData.clientId}`;
    }
    this.getApiRequest(params);
    this._cd.detectChanges();
  }

  onChangeDay() {
    this.selectedMonth = 'null'
    this.selectedYear = 'null'
    this.month != 'null'
    this.year != 'null'
    this.showHtmlChart = false
    if (this.selectedDay == 'today') {
      let d = new Date();
      d.setDate(d.getDate());
      let today = this._date.transform(new Date(d), 'yyyy-MM-dd');
      let params = `?day=${today}`;
      if (this.selectedCover != "null") { params += `&coverName=${this.selectedCover} Cover` };
      if (this.selectedPlan != "null") { params += `&planName=${this.selectedPlan}` };
      if (this.basicData.clientId != null) { params += `&clientId=${this.basicData.clientId}` };
      this.date_title = "Today";
      this.day = today;
      this.getApiRequest(params);
    }
    else {
      let d = new Date();
      d.setDate(d.getDate() - 1);
      let today = this._date.transform(new Date(d), 'yyyy-MM-dd');
      let params = `?day=${today}`;
      if (this.selectedCover != "null") { params += `&coverName=${this.selectedCover} Cover` };
      if (this.selectedPlan != "null") { params += `&planName=${this.selectedPlan}` };
      if (this.basicData.clientId != null) { params += `&clientId=${this.basicData.clientId}` };
      this.date_title = "Yesterday";
      this.day = today;
      this.getApiRequest(params);
    }

  }
  params: string = "";

  onChangePlan() {
    this.showHtmlChart = false;
    let updatedStr;
    if (!this.isFilter) {
      updatedStr = this.params.replace(/(planName=)[^&]*/, `planName=${this.selectedPlan}`);
    } else {
      this.params = ""
      updatedStr = this.params = `?planName=${this.selectedPlan}`;
      if (this.selectedCover != "null" && this.isFilter) { updatedStr = this.params += `&coverName=${this.selectedCover} Cover` };
      if (this.day != undefined && this.day != 'null' && this.isFilter && this.selectedMonth == "null" && this.selectedYear == "null") { updatedStr = this.params += `&day=${this.day}` };
      if (this.month != undefined && this.month != 'null' && this.isFilter && this.selectedDay == "null") {
        if (this.selectedPlan != "" || this.selectedPlan != 'null') { updatedStr = this.params += `&${this.month.replace(/[?]/g, "")}` } else { updatedStr = this.params += `${this.month}` };
      }
      if (this.year != undefined && this.year != 'null' && this.isFilter && this.selectedMonth == "null" && this.selectedDay == "null") {
        if (this.selectedCover != "null" || this.selectedPlan != 'null') { updatedStr = this.params += `&${this.year.replace(/[?]/g, "")}` } else { updatedStr = this.params += `${this.year}` };
      }
    }
    this.getApiRequest(updatedStr);
  }
  onChangeCover() {
    this.showHtmlChart = false;
    let updatedStr;
    if (!this.isFilter) {
      updatedStr = this.params.replace(/(coverName=)[^&]*/, `coverName=${this.selectedCover} Cover`);
    } else {
      this.params = ""
      updatedStr = this.params = `?coverName=${this.selectedCover} Cover`;
      //if (this.selectedCover != "null" && this.isFilter) { updatedStr = this.params += `&coverName=${this.selectedCover} Cover` };
      if (this.selectedPlan != "null" && this.isFilter) { updatedStr = this.params += `&planName=${this.selectedPlan}` };
      if (this.day != undefined && this.day != 'null' && this.isFilter && this.selectedMonth == "null" && this.selectedYear == "null") { updatedStr = this.params += `&day=${this.day}` };
      if (this.month != undefined && this.month != 'null' && this.isFilter && this.selectedDay == "null") {
        if (this.selectedCover != "null" || this.selectedPlan != 'null') { updatedStr = this.params += `&${this.month.replace(/[?]/g, "")}` } else { updatedStr = this.params += `${this.month}` }
      }
      if (this.year != undefined && this.year != 'null' && this.isFilter && this.selectedMonth == "null" && this.selectedDay == "null") {
        if (this.selectedCover != "null" || this.selectedPlan != 'null') { updatedStr = this.params += `&${this.year.replace(/[?]/g, "")}` } else { updatedStr = this.params += `${this.year}` };
      }
    }
    this.getApiRequest(updatedStr);
  }

  getApiRequest(params: string) {
    //this.itemsPerPageC = 100;
    //this.isFilter = true;
    this.p=1;
    this.params = params;
    this.showHtmlChart = false;
    this.service.ConsumerPlanDist_DrillDownReport(params).subscribe((data: any) => {
      //console.log(data);
      this.showHtmlChart = true;
      if (data && data.length > 0) {
        this.totalRecordCount = data.length;
        this.$table = data;
        // console.log(this.$table, "$$$$$$$$$$$$$$$table")
        this._cd.detectChanges()
      }
      else {
        this.$table = [];
        this._cd.detectChanges()
      }
    })
  }
  BacktoDash() {
    this.router.navigate(['dashboard'])
  }

  Reset() {
    this.itemsPerPageC = 100;
    this.isFilter = true;
    this.showHtmlChart = false
    this.selectedDay = 'null';
    this.selectedMonth = 'null';
    this.selectedYear = 'null';
    this.selectedPlan = 'null';
    this.selectedCover = 'null';
    this.day = 'null';
    this.month = 'null';
    this.year = 'null';
    let params = null;
    this.date_title = 'All'
    if (this.basicData.clientId != null) {
      params = `?clientId=${this.basicData.clientId}`;
    }

    this.service.ConsumerPlanDist_DrillDownReport(params).subscribe((data: any) => {
      this.showHtmlChart = true;
      if (data.length > 0) {
        this.$table = data;
        this.showHtmlChart = true;
        this.totalRecordCount = data.length;
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
    this.selectedPlan = 'null';
    this.selectedCover = 'null';
    this.day = 'null';
    this.month = 'null';
    this.year = 'null'; 
    let params = null;
    this.date_title = 'All'
    if (this.basicData.clientId != null) {
      params = `?clientId=${this.basicData.clientId}`;
    }
    this.showHtmlChart = false;
    this.service.ConsumerPlanDist_DrillDownReport(params).subscribe((data: any) => {
      this.showHtmlChart = true;
      if (data.length > 0) {
        this.totalRecordCount = data.length;
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
