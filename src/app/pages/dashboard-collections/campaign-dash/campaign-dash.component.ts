import { Component, OnInit } from '@angular/core';
import { RootPageService } from '../../root-page.service';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'



@Component({
  selector: 'app-campaign-dash',
  templateUrl: './campaign-dash.component.html',
  styleUrls: ['./campaign-dash.component.scss'],
  
})
export class CampaignDashComponent implements OnInit {

  breadCrumbItems!: Array<{}>;
  public campaignData: any;
  public fileName: string = 'ExcelSheet.xlsx';
  public drillCountData: any;
  constructor(private rootPageService: RootPageService) {

  }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Dashbord' },
      { label: 'Campaign', active: true }
    ];

    this.shareCompaigingData();
  }
  shareCompaigingData() {
    this.rootPageService.shareCampaignData().subscribe(data => {
      this.campaignData = data;
    });
    this.getDrillCount();
  }
  exportexcel() {
    /* pass here the table id */
    let element = document.getElementById('excel-table')
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element)

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')

    /* save to file */
    XLSX.writeFile(wb, this.fileName)
  }

  generatePDF() {
    let data = this.campaignData;
    const doc = new jsPDF()
    autoTable(doc, { html: '#excel-table' })
    doc.save(`${data.line_name}-data-table.pdf`)
  }
  getDrillCount() {
    let str = this.campaignData.y_axis_data;
    console.log(str)  //6/2021
    let str_arr = str.split('/');
    console.log(str_arr)  // ['10','2020']
    let obj: any;
    if (str_arr.length > 2) {
      //  date=`${str_arr[str_arr.length-1]}-${str_arr[str_arr.length-2]}-${str_arr[str_arr.length-1]}`;
      obj = {
        'year': str_arr[str_arr.length - 1],
        'month': str_arr[str_arr.length - 2],
        // 'day':str_arr[str_arr.length-3]
      }
    }
    else {
      //  date=`${str_arr[str_arr.length-1]}-${str_arr[str_arr.length-2]}-00`;
      let dayCount = str_arr[str_arr.length - 2];  // 8
      console.log(dayCount);
      if (dayCount < 10) {
        dayCount = `0${str_arr[str_arr.length - 2]}`
      }
      obj = {
        'year': str_arr[str_arr.length - 1],
        'month': dayCount,
        // 'day':str_arr[str_arr.length-3]
      }
    };


    // this.rootPageService.getDrillCountData(obj).subscribe((data: any) => {
    //   if (data.status == '200') {
    //     this.drillCountData = data.data;
    //   }
    // })
  }

}