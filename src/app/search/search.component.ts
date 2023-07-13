import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data-types';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchResult:undefined| Product[];
constructor(private route:ActivatedRoute, private product:ProductService){}
ngOnInit(){
 let query= this.route.snapshot.paramMap.get('query');
 query && this.product.getProductSearch(query).subscribe((res)=>{
this.searchResult=res;
 })
}
}
