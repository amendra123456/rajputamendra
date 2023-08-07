import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MainSearchService } from '../services/main-search.service';
import { MainSearch } from '../models/main-search.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main-search',
  templateUrl: './main-search.component.html',
  styleUrls: ['./main-search.component.scss']
})
export class MainSearchComponent {
  searchForm!: FormGroup;
  packageOptions: MainSearch[] | undefined;
  constructor(private _formBuilder: FormBuilder, private _mainService: MainSearchService, private routes: ActivatedRoute) { }
  ngOnInit() {
    this.routes.queryParams.subscribe(params => {
      console.log(params['id']);
  });
    this.searchForm = this.createSearchForm();
    this.packageOptions = [
      {
        'id': 1,
        'category_id': 'Kedarnath',
        'subcategory': 'Kedarnath',
        'month': '04',
        'nop': 2,
        'pdf': 'test',
        'created_at': 'test',
        'filename': 'test'
      },
      {
        'id': 1,
        'category_id': 'Dodhaam',
        'subcategory': 'Dodhaam',
        'month': '04',
        'nop': 2,
        'pdf': 'test',
        'created_at': 'test',
        'filename': 'test'
      },
      {
        'id': 1,
        'category_id': 'Chardhaam',
        'subcategory': 'Chardhaam',
        'month': '04',
        'nop': 2,
        'pdf': 'test',
        'created_at': 'test',
        'filename': 'test'
      }
    ];
  }
  private createSearchForm(): FormGroup {
    return this._formBuilder.group({
      package: [""],
      nop: [""],
      mobile: [""],
      year: ['']

    });
  }
}
