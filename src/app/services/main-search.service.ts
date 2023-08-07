import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MainSearch } from '../models/main-search.model';

@Injectable({
  providedIn: 'root'
})
export class MainSearchService {
baseUrl!:string;
  constructor(private http: HttpClient) { 
    this.baseUrl= environment.apiBaseUrl;
  }
  getByCategory(name:string){   
  return  this.http.get<MainSearch[]>(this.baseUrl+`userPackage/getCategory?name=${name}&limit=50`);
  }
}
