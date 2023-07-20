import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RootPageService } from '../../root-page.service';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { param } from 'jquery';

@Component({
  selector: 'app-top5-competition-list',
  templateUrl: './top5-competition-list.component.html',
  styleUrls: ['./top5-competition-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Top5CompetitionListComponent implements OnInit {
  basicData: any;
  showHtmlChart: boolean = false
  $table: any = [];
  public p: any = 1
  public itemsPerPageC: any = 500;
  monthsList: any = [];
  date_title: any = "";
  totalYearForFilter: any = [];
  selectedYear: any = 'null';
  selectedMonth: any = 'null';
  selectedDay: any = 'null'
  productName: any = "null"
  names_: any = [];
  competition_names :any=[];
  filter:any = 'null'
  params:any = null;
  isFilter: boolean = false;
  totalRecordCount: number | undefined;
  day: any | undefined;


  constructor(private service: RootPageService, private _cd: ChangeDetectorRef, private _date: DatePipe,
    private router: Router) { }

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
    for (let _i = parseInt(currentYear); _i > 2017; _i--) {
      this.totalYearForFilter.push(_i);
    }
    this.getTop5CompetionData()
    // this.loadListingData()

  }
  itemPerPage(val: string) {
    this.itemsPerPageC = val;
    if (val == "All") {
      this.itemsPerPageC = 50000;
      this.Reset();
    }    
  }

  toggleFilter(str: string) {
    this.showHtmlChart = false;
    
    var params = this.params
    if (str == 'day') {
      this.selectedMonth = 'null';
      this.selectedYear = 'null';
      if (this.selectedDay == 'today') {
        this.date_title ='Today'
        let d = new Date();
        d.setDate(d.getDate());
        let today_date = this._date.transform(d, 'yyyy-MM-dd');
        this.day=today_date;
        
        params = `?day=${today_date}&productName=${this.productName}&filter=${this.filter}`;
      } 
      else {
        this.date_title = 'Yesterday';
        let d = new Date();
        d.setDate(d.getDate() - 1);
        let yesterday_date = this._date.transform(d, 'yyyy-MM-dd');
        this.day=yesterday_date;
        params = `?day=${yesterday_date}&productName=${this.productName}&filter=${this.filter}`;
      }
    }
    else if (str == 'month') {
      this.selectedDay = 'null';
      let month:any;
      if(this.selectedMonth != 'null'){
       month = this.monthsList.find((x:any)=>{return x.value == this.selectedMonth}).key;
      }
      if (this.selectedMonth != 'null' && this.selectedYear != 'null') {
       // this.params = `?month=${this.selectedYear}-${this.selectedMonth}-01&pageName=${this.pageName}`;
        params = `?month=${this.selectedYear}-${month}-01&productName=${this.productName}&filter=${this.filter}`;
        this.date_title = `${this.selectedMonth}-${this.selectedYear}`;
      }
      if (this.selectedMonth != 'null' && this.selectedYear == 'null') {
        this.selectedYear = this.totalYearForFilter[0];
       // this.params = `?month=${this.selectedYear}-${this.selectedMonth}-01&pageName=${this.pageName}`;
        params = `?month=${this.selectedYear}-${month}-01&productName=${this.productName}&filter=${this.filter}`;
        // let month = this.monthsList.find((x:any)=>{return x.key == this.selectedMonth}).value;
        this.date_title = `${this.selectedMonth}-${this.selectedYear}`;
       // this.api_request(this.params);
      }
      if (this.selectedYear != 'null' && this.selectedMonth == 'null') {
            params = `?year=${this.selectedYear}-01-01&productName=${this.productName}&filter=${this.filter}`;
            this.date_title = `${this.selectedYear}`;
     
      }
      this._cd.detectChanges();
    } 
    else if (str == 'year') {
      
      this.selectedDay = 'null';
     
      if (this.selectedMonth != 'null' && this.selectedYear != 'null') {
       let  month = this.monthsList.find((x: any) => x.value == this.selectedMonth).key;
        params = `?month=${this.selectedYear}-${month}-01&productName=${this.productName}&filter=${this.filter}`;
        this.date_title = `${this.selectedMonth}-${this.selectedYear}`;
      }
      
      else if (this.selectedYear != 'null' && this.selectedMonth == 'null') {
        params = `?year=${this.selectedYear}-01-01&productName=${this.productName}&filter=${this.filter}`;
        this.date_title = `${this.selectedYear}`
      }
    }  
    else if (str == 'names') {
      if(!this.isFilter  && this.productName!='null'){
      params = this.params?.replace(/(productName=)[^&]*/, `productName=${this.productName}`);
    }
    if(this.isFilter  && this.productName!='null'){
      params = this.params?.replace(/(productName=)[^&]*/, `productName=${this.productName}`);
    }
    if(this.isFilter  && this.selectedDay!='null'){
      params +=  `&day=${this.day}`;
    }
    let month:any;
    if(this.selectedMonth != 'null'){
      month = this.monthsList.find((x:any)=>{return x.value == this.selectedMonth}).key;
     }
    if(this.isFilter  && this.selectedMonth != 'null' && this.selectedYear != 'null'){
      params +=  `&month=${this.selectedYear}-${month}-01`;
    }
    if(this.isFilter  && this.selectedMonth != 'null' && this.selectedYear == 'null'){
      this.selectedYear = this.totalYearForFilter[0];      
       params +=  `&month=${this.selectedYear}-${month}-01`;
    }
    if(this.isFilter  && this.selectedMonth == 'null' && this.selectedYear != 'null'){
      params +=`&year=${this.selectedYear}-01-01`;
    }
    }
    else if(str == 'filter'){
      if(!this.isFilter  && this.filter!='null'){
        params = this.params?.replace(/(filter=)[^&]*/, `productName=${this.filter}`);
      }
      if(this.isFilter  && this.filter!='null'){
        params = this.params?.replace(/(filter=)[^&]*/, `filter=${this.filter}`);
      }
      if(this.isFilter  && this.selectedDay!='null'){
        params +=  `&day=${this.day}`;
      }
      let month:any;
      if(this.selectedMonth != 'null'){
        month = this.monthsList.find((x:any)=>{return x.value == this.selectedMonth}).key;
       }
      if(this.isFilter  && this.selectedMonth != 'null' && this.selectedYear != 'null'){
        params +=  `&month=${this.selectedYear}-${month}-01`;
      }
      if(this.isFilter  && this.selectedMonth != 'null' && this.selectedYear == 'null'){
        this.selectedYear = this.totalYearForFilter[0];      
         params +=  `&month=${this.selectedYear}-${month}-01`;
      }
      if(this.isFilter  && this.selectedMonth == 'null' && this.selectedYear != 'null'){
        params +=`&year=${this.selectedYear}-01-01`;
      }
    }
     console.log(params)
    this.service.TopFiveComp_DrillDownReport(params).subscribe((data: any) => {
      this.showHtmlChart = true;
      this.$table = [];
      console.log("toggleFilter data",data)

      // this.$table = data;
      if(data && data.length > 0){
        this.$table = data;
        this.totalRecordCount = data.length;
        this._cd.detectChanges()
      }
      this._cd.detectChanges()

    })

  }

  getTop5CompetionData() {
    this.service.getTopFiveCompetionApiParamsData().subscribe((data: any) => {
      this.basicData = data;
      console.log(this.basicData)
      if (this.basicData != null) {
        console.log('111basic data params ', JSON.stringify(this.basicData))
        sessionStorage.setItem("basicData", JSON.stringify(this.basicData));
      }
      else {
        let data: any = sessionStorage.getItem("basicData");
        this.basicData = JSON.parse(data);
        console.log('222basic data params ', this.basicData)
      }
      this.competition_names = this.basicData.competition_names;
      console.log(this.competition_names)
      // this.makeApiCall();
      this.loadListingData();
      this._cd.detectChanges();
    });
  }
  private containsSpecialChars(str:string) {
    const specialChars = /[`!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?~]/;
    if(specialChars.test(str)){ return str.replace("&clientId","");} else{ return str;}    
  }
  private removeParam(url:any) {
    let params=[];    
   let param=url.split("=");
   for(let i=0; i<param.length; i++){
      if(this.containsSpecialChars(param[i])){       
        params.push(param[i].split("&")[0]);
        params.push(param[i].split("&")[1]);
      }
      else{
        params.push(param[i]);
      }
   }   
   params = params.filter(( element ) => {
    return element !== undefined;
    });
   return params.includes("clientId");
  }

 

  loadListingData() { 
  this.productName = this.basicData.productName;
  this.filter = this.basicData.filter;  
    let uri:any=sessionStorage.getItem('basic_params'); 
    let params:any;   
    let paramVal = `?${this.basicData?.request_date}&filter=${this.basicData?.filter}&productName=${this.basicData?.productName}`    
    if(this.removeParam(uri)){
      params= sessionStorage.getItem('basic_params');      
    }else{
      if (this.basicData.clientId != null) { 
        params=uri;
        params += `&clientId=${this.basicData.clientId}`;        
      }else{
        params=uri;
      }
    }
    
    // params += `&productName=${this.basicData.productName}`;
   
    if (this.basicData.productName != null) { params += `&productName=${this.basicData.productName}` }
    let str_p1=params.split("="); 
    //console.log(str_p);
    //console.log(params);
  //  console.log(params)
    /*this.service.getTopFiveCompetionApiParamsData().subscribe((data: any) => {
      console.log("DATA>>>>>>>>>>>>JYOTIIII",data);
      console.log("CHYYYYYY>>>>>>>>>>>");
      //this.basicData = data;

    })*/

    // this.service.getTopFiveCompetitionForPieChart(params).subscribe((data: any) => {
    //   console.log("DATA>>>>>>>>>>>>JYOTIIII",data);
    //   this.names_ = this.basicData.names;
    //   if (data.length > 0) {
    //     this.names_ = data.map((x: any) => { return x.competition });
    //     console.log("data>>>>>>>>>>>>>>>>>>>>>",this.names_);
    //    // this._cd.detectChanges();
    //   }

    // })

    this.params = params;
    this.service.TopFiveComp_DrillDownReport(params).subscribe((data: any) => {
      this.showHtmlChart = true;
      console.log('loadListingData data', data)
      this.$table = data;
      this.totalRecordCount = data.length;
        this.productName = this.basicData.productName;     
      // if(data && data.length > 0){
      //   for(let i of data){
      //     if(i?.userDetail.length > 0){
      //       console.log(i)
      //        this.$table.push(i.userDetail[0]);
      //     }
      //   }
      //   this._cd.detectChanges()
      // }
      this._cd.detectChanges()
    }) 

    let a = String(params).split('?')[1];
    console.log('###### ',a);
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
      this.selectedYear =l[0]
    }
    else if (b == 'year') {
      let k = a?.split('=')[1];
      let l = k.split('-');
      this.date_title = `${l[0]}`
      this.selectedYear =l[0]
    }
    else if (b == 'day') {
      let date = a.split("=")[1].replace("&filter", "");
      let d = new Date()
      d.setDate(d.getDate());
      let today_date = this._date.transform(d, 'yyyy-MM-dd');
      console.log(today_date);
      console.log(date);
      if (today_date === date) {
        this.date_title = "Today";
        this.selectedDay ='today';
      }
      else {
        this.date_title = "Yesterday";
        this.selectedDay ='yesterday';
      }
    }
    else {
      this.date_title = "All"
    }
  }

  exportexcel() {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element)
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')

    /* save to file */
    XLSX.writeFile(wb, `Top Five Competition (${this.productName})-${this.date_title}}.xlsx`)
  }

  generatePDF() {
    let data = this.basicData.filter;
    const doc = new jsPDF()
    autoTable(doc, { html: '#excel-table' })
    doc.save(`${data}-data-table.pdf`)
  }
  // getTop5CompetitionDetailReport(obj:any){
  //   //let obj= {line_name: 'Conversion', x_axis_data: 49, y_axis_data: '12/2020', date_title: 'Year'}
  // if(obj.date_title == "Year"){
  //   let [m,y]=obj.y_axis_data.split('/')
  //   // let y=dd[1]; let m=dd[0];
  //   return this.http.get(this.base_url1+this.getTopFiveComptetionDetailReport+"?month="+m+"&year="+y);
  // }
  // else if(obj.date_title == "Days"){
  //   let monthData = obj.month;
  //   let m = monthData[obj.line_name].find((x:any)=>x._id.Day == obj.y_axis_data)?.Month;
  //   let yy = monthData[obj.line_name].find((x:any)=>x._id.Day == obj.y_axis_data)?.Year;
  //   return this.http.get(this.base_url1+this.getTopFiveComptetionDetailReport+"?day="+obj.y_axis_data+"&month="+m+"&year="+yy);
  // }
  // else if(obj.date_title == "Hour"){
  //   let dayData = obj.day;
  //   let d = dayData[obj.line_name].find((x:any)=>x._id.Hour == obj.y_axis_data)?.Day;
  //   let mm = dayData[obj.line_name].find((X:any)=>X._id.Hour == obj.y_axis_data)?.Month;
  //   let yy = dayData[obj.line_name].find((X:any)=>X._id.Hour == obj.y_axis_data)?.Year;
  //   let min = dayData[obj.line_name].find((X:any)=>X._id.Hour == obj.y_axis_data)?.Minute;
  //   let sec = dayData[obj.line_name].find((X:any)=>X._id.Hour == obj.y_axis_data)?.Second;
  //   let milSec = dayData[obj.line_name].find((X:any)=>X._id.Hour == obj.y_axis_data)?.MilliSecond;

  //  return this.http.get(this.base_url1+this.getTopFiveComptetionDetailReport+"?month="+mm+"&day="+d+"&year="+yy+"&hour="+`${obj.y_axis_data}:${min}:${sec}.${milSec}`)
  // }
  // }

  // https://javaapi-184759981.eu-west-1.elb.amazonaws.com/api
  // /getTopFiveComptetionDetailReport?month=03&year=2021
  // &day=21&hour=10:26:09&clientId=5d1c4e6a87f6c79304a9e053
  // totalListingData: any;
  // monthlyListingData: any;
  // dailyListingData: any;

  // makeApiCall() {
  //   // let obj= {line_name: 'Conversion', x_axis_data: 49, y_axis_data: '12/2020', date_title: 'Year'}
  //   if (this.basicData.date_title == "Year") {
  //     let [m, y] = this.basicData.y_axis_data.split('/')
  //     let params = "?month=" + m + "&year=" + y;
  //     if (this.basicData.clientId != "null") {
  //       params += `&clientId=${this.basicData.clientId}`;
  //     }
  //     this.service.getTop5CompetitionDetailReport(params).subscribe((data: any) => {
  //       console.log(data, "Total Data")
  //       this.totalListingData = data;
  //       console.log(this.totalListingData)
  //       this.setTableData(data)
  //     })

  //   }
  //   else if (this.basicData.date_title == "Days") {
  //     let monthData = this.basicData?.month;
  //     let m = monthData[this.basicData.line_name].find((x: any) => x._id.Day == this.basicData.y_axis_data)?.Month;
  //     let yy = monthData[this.basicData.line_name].find((x: any) => x._id.Day == this.basicData.y_axis_data)?.Year;
  //     let params = "?day=" + this.basicData.y_axis_data + "&month=" + m + "&year=" + yy;
  //     if (this.basicData.clientId != "null") {
  //       params += `&clientId=${this.basicData.clientId}`;
  //     }
  //     this.service.getTop5CompetitionDetailReport(params).subscribe((data: any) => {
  //       console.log(data, "Monthly Data")
  //       this.monthlyListingData = data;
  //       console.log(this.monthlyListingData)
  //       this.setTableData(data)
  //     })
  //   }
  //   else if (this.basicData.date_title == "Hour") {
  //     let dayData = this.basicData.day;
  //     let d = dayData[this.basicData.line_name].find((x: any) => x._id.Hour == this.basicData.y_axis_data)?.Day;
  //     let mm = dayData[this.basicData.line_name].find((X: any) => X._id.Hour == this.basicData.y_axis_data)?.Month;
  //     let yy = dayData[this.basicData.line_name].find((X: any) => X._id.Hour == this.basicData.y_axis_data)?.Year;
  //     let min = dayData[this.basicData.line_name].find((X: any) => X._id.Hour == this.basicData.y_axis_data)?.Minute;
  //     let sec = dayData[this.basicData.line_name].find((X: any) => X._id.Hour == this.basicData.y_axis_data)?.Second;
  //     let milSec = dayData[this.basicData.line_name].find((X: any) => X._id.Hour == this.basicData.y_axis_data)?.MilliSecond;

  //     let params = "?month=" + mm + "&day=" + d + "&year=" + yy + "&hour=" + `${this.basicData.y_axis_data}:${min}:${sec}.${milSec}`;
  //     if (this.basicData.clientId != "null") {
  //       params += `&clientId=${this.basicData.clientId}`;
  //     }
  //     this.service.getTop5CompetitionDetailReport(params).subscribe((data: any) => {
  //       console.log(data, "Day Data")
  //       this.dailyListingData = data;
  //       console.log(this.dailyListingData)
  //       this.setTableData(data)
  //     })

  //   }

  // }
  // TableData: any;
  // setTableData(data: any) {
  //   if (this.basicData.line_name == "Revenue") {
  //     this.TableData = data.revenue
  //   }
  //   else if (this.basicData.line_name == "Affiliate") {
  //     this.TableData = data.affiliate
  //   }
  //   else if (this.basicData.line_name == "Conversion") {
  //     this.TableData = data.conversion
  //   }
  //   else if (this.basicData.line_name == "Landing") {
  //     this.TableData = data.landing
  //   }
  //   else if (this.basicData.line_name == "Expense") {
  //     this.TableData = data.expense
  //   }
  // }
  BacktoDash() {
    this.router.navigate(['dashboard'])
  }
  Reset(){
    this.itemsPerPageC=100;
    this.isFilter=true;
    this.$table = [];
    this.showHtmlChart =false
    this.selectedDay = 'null'
    this.selectedMonth ="null"
    this.selectedYear = "null"
    // this.productName = 'null'
    this.date_title = 'All'
    let params = `?productName=${this.productName}&filter=${this.filter}`
    this.params =params
    this.service.TopFiveComp_DrillDownReport(params).subscribe((data: any) => {
      this.showHtmlChart = true;
      this.$table = data;
      this.totalRecordCount = data.length;
      this._cd.detectChanges()
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
  let params = `?productName=${this.productName}&filter=${this.filter}`
  this.params =params
  this.service.TopFiveComp_DrillDownReport(params).subscribe((data: any) => {
    this.showHtmlChart = true;
    this.$table = data;
    this.totalRecordCount=data.length;
    this._cd.detectChanges()
})
}
}
