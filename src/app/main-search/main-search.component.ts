import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MainSearchService } from '../services/main-search.service';
import { MainSearch } from '../models/main-search.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchModel } from './search.model';
import { environment } from 'src/environments/environment';
declare var require: any
const FileSaver = require('file-saver');
@Component({
  selector: 'app-main-search',
  templateUrl: './main-search.component.html',
  styleUrls: ['./main-search.component.scss']
})
export class MainSearchComponent {
  searchForm!: FormGroup;
  packageOptions: MainSearch[] | undefined;
  href!: string;
  errorMsg: string;
  successMsg: string;
  baseUrl: string;
  msg11!: string;
  msgg!: string;
  constructor(private _formBuilder: FormBuilder, private _mainService: MainSearchService, private routes: Router) {
    this.createSearchForm();
    this.errorMsg = '';
    this.successMsg = '';
    this.baseUrl = environment.baseUrl;
  }
  ngOnInit(): void {
    this.href = this.routes.url;
    console.log(this.searchForm.controls['package'].errors);
    this.createSearchForm();
    // this.packageOptions = [
    //   {
    //     'id': 1,
    //     'category_id': 'Kedarnath',
    //     'subcategory': 'Kedarnath',
    //     'month': '04',
    //     'nop': 2,
    //     'pdf': 'test',
    //     'created_at': 'test',
    //     'filename': 'test'
    //   },
    //   {
    //     'id': 1,
    //     'category_id': 'Dodhaam',
    //     'subcategory': 'Dodhaam',
    //     'month': '04',
    //     'nop': 2,
    //     'pdf': 'test',
    //     'created_at': 'test',
    //     'filename': 'test'
    //   },
    //   {
    //     'id': 1,
    //     'category_id': 'Chardhaam',
    //     'subcategory': 'Chardhaam',
    //     'month': '04',
    //     'nop': 2,
    //     'pdf': 'test',
    //     'created_at': 'test',
    //     'filename': 'test'
    //   }
    // ];
    this.href = this.routes.url;

    if (this.routes.url.split('/')[2] != "" && this.routes.url.split('/')[2] != undefined) {
      this.routes.url.split('/')[2] && this._mainService.getByCategory(this.routes?.url?.split('/')[2])
      //this.routes.url && this._mainService.getByCategory('');
      this._mainService.share$.subscribe((res: any) => {

        this.packageOptions = res.response;
      })
    }
    else {
      this.routes.url && this._mainService.getByCategory('');
      this._mainService.share$.subscribe((res: any) => {
        if (res.response != undefined) {
          this.packageOptions = res.response;
        } else {
          this.packageOptions = res;
        }
        console.log(this.packageOptions)
      })

    }
    //console.log(this.packageOptions,"/////////////") 
  }

  createSearchForm() {
    this.searchForm = this._formBuilder.group({
      package: ["", [Validators.required]],
      nop: ["", [Validators.required]],
      mobile: ["", [Validators.required]],
      year: ["", [Validators.required]],

    });
  }
  onSearch() {

    if (this.searchForm.invalid) {
      this.errorMsg = "all fields are mandetory!";
      this.successMsg = '';
    } else {
      this.errorMsg = '';
//console.log(this.searchForm.controls['package'].value);return;
      this._mainService.onSerach(this.searchForm.getRawValue()).subscribe((res: any) => {
        this.successMsg = "Package downloaded may be download in Drive/Downloads folder on mobile our executive will connect sortly!"
        if(res?.pdf){
          const pdfUrl = this.baseUrl + "assets/" + res.pdf;console.log(pdfUrl);
          const pdfUrl1 =  "https://dodhamyatra.in/" + res.pdf;
          let url = res.pdf.split("_")[1];
          
          const pdfName = 'Package_' + url;
          FileSaver.saveAs(pdfUrl, pdfName);
          if(this.searchForm.controls['package'].value=="Kedarnath"){
            this.msgg="This a Quotation for Perosnal trip, Personal Transpotation, Personal Hotel, diner, and Breakfast Yatra Registration our side , If you want Budget friendly group tour fixed depature (15, 18, 20, 25, 30,) Sep (1 , 5, 10, 15, 18, 25, 31) oct Download the Itnarry- https://dodhamyatra.in/tour/chardham-packages  at  Offices Situated at  Haridwar  Delhi Office and Head Office-Lucknow , Check Our Latest Trip click here- https://cabio.in/travel-reviews Social Site- https://www.facebook.com/cabioholidays , https://www.youtube.com/@cabio4674 24x7 Sales/Support Call Us- 8953767676";
            this.msg11="Kedarnath-Package.pdf";
        }
       else if(this.searchForm.controls['package'].value=="Dodhaam"){
        this.msgg="This a Quotation for Perosnal trip, Personal Transpotation, Personal Hotel, diner, and Breakfast Yatra Registration our side , If you want Budget friendly group tour fixed depature (15, 18, 20, 25, 30,) Sep (1 , 5, 10, 15, 18, 25, 31) oct Download the Itnarry- https://dodhamyatra.in/tour/chardham-packages  at  Offices Situated at  Haridwar  Delhi Office and Head Office-Lucknow , Check Our Latest Trip click here- https://cabio.in/travel-reviews Social Site- https://www.facebook.com/cabioholidays , https://www.youtube.com/@cabio4674 24x7 Sales/Support Call Us- 8953767676";
        this.msg11="Kedarnath-Badrinath.pdf";
        }
        else if(this.searchForm.controls['package'].value=="Chardhaam"){
          this.msgg="This a Quotation for Perosnal trip, Personal Transpotation, Personal Hotel, diner, and Breakfast Yatra Registration our side , If you want Budget friendly group tour fixed depature (15, 18, 20, 25, 30,) Sep (1 , 5, 10, 15, 18, 25, 31) oct Download the Itnarry- https://dodhamyatra.in/tour/chardham-packages  at  Offices Situated at  Haridwar  Delhi Office and Head Office-Lucknow , Check Our Latest Trip click here- https://cabio.in/travel-reviews Social Site- https://www.facebook.com/cabioholidays , https://www.youtube.com/@cabio4674 24x7 Sales/Support Call Us- 8953767676";
          this.msg11="Chardham-Yatra.pdf";
        }
        else {
          this.msgg="This Quotaion Incl. Transpotation, Hotel, diner, and Breakfast Yatra Registration our side You Can Reserve Your Booking with Free Cancellation Syatem Also You Can book Direct Visit the office and reserve your package Offices Situated at  Haridwar,  Delhi and  Head Office-Lucknow, Check Our Latest Trip click here- https://cabio.in/travel-reviews Social Site- https://www.facebook.com/cabioholidays , https://www.youtube.com/@cabio4674 24x7 Sales/Support Call Us- 8953767676";
          this.msg11=this.searchForm.controls['package'].value+".pdf";
        }
          let msg={
            "filename":this.msg11,
            "document":pdfUrl1,
            "caption":this.msgg,
            "mobile":this.searchForm.controls['mobile'].value
          }
          this._mainService.sendMsg(msg).subscribe((res)=>{
            this.searchForm.reset();
          });
        }else{
          this.errorMsg = 'Package for this category not exist our executive will connect sortly!';
          this.successMsg = '';
        }
        

        // let link = document.createElement("a");
        //     link.download = pdfName;
        //     link.href = this.baseUrl+"assets/upload/pdf/"+res.pdf;
        //     link.click();
      });
    //  this.searchForm.reset();
    }
  }
}
