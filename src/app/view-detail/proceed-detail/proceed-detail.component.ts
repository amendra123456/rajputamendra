import { Component } from '@angular/core';

@Component({
  selector: 'app-proceed-detail',
  templateUrl: './proceed-detail.component.html',
  styleUrls: ['./proceed-detail.component.scss']
})
export class ProceedDetailComponent {
constructor(){}
ngOnInit(){
  const accordionItemHeaders = document.querySelectorAll(".accordion-item-header");

  accordionItemHeaders.forEach(accordionItemHeader => {
  accordionItemHeader.addEventListener("click", event => {

  accordionItemHeader.classList.toggle("active");
  const accordionItemBody:any = accordionItemHeader.nextElementSibling;
  if(accordionItemHeader.classList.contains("active")) {
   accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
  }
  else {
    accordionItemBody.style.maxHeight = 0;
  }
 
});
});
}
}
