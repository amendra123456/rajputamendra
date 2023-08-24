import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MainSearchService } from 'src/app/services/main-search.service';

@Component({
  selector: 'app-chardham-packages-from-hyderabad',
  templateUrl: './chardham-packages-from-hyderabad.component.html',
  styleUrls: ['./chardham-packages-from-hyderabad.component.scss']
})
export class ChardhamPackagesFromHyderabadComponent {
  href!: string;
  constructor(private _mainService: MainSearchService, private routes: Router){}
  ngOnInit(){
    this.href = this.routes.url;  
    this.routes.url.split('/')[2] && this._mainService.getByCategory(this.routes?.url?.split('/')[2]);
    window.scrollTo(0,0);
  }
}
