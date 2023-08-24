import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MainSearch } from '../models/main-search.model';
import { BehaviorSubject } from 'rxjs';
import { SearchModel } from '../main-search/search.model';

@Injectable({
  providedIn: 'root'
})
export class MainSearchService {
  baseUrl!: string;
  packOptions = [
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
  private dropDownOptions = new BehaviorSubject<MainSearch[]>([]);
  public share$ = this.dropDownOptions.asObservable();
  packageOptions!: MainSearch[];
  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiBaseUrl;

  }
  getByCategory(name: string) {
    if (name != '' && name != undefined) {
      return this.http.get<MainSearch[]>(this.baseUrl + `userPackage/getCategory?name=${name}&limit=50`).subscribe((res) => {
        this.dropDownOptions.next(res);
      });
    } else {
      return this.dropDownOptions.next(this.packOptions);
    }
  }

  onSerach(data: SearchModel) {
    return this.http.post<MainSearch>(this.baseUrl + `userPackage/addPacakage`, data);
  }
  sendMsg(data:any){
    return this.http.post(this.baseUrl + `userPackage/sendMsg`, data);
  }

}
