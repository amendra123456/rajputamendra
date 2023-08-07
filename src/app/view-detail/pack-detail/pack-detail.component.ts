import { Component, Inject, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-pack-detail',
  templateUrl: './pack-detail.component.html',
  styleUrls: ['./pack-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PackDetailComponent {
  public minDate: Date = new Date ("05/07/2017");
    public maxDate: Date = new Date ("08/27/2017");
    public value: Date = new Date ("05/16/2017");
    public isBtnActive: number = 1;
  ngOnInit(){
    const accordionItemHeaders = document.querySelectorAll(".accordion-item-header");

    accordionItemHeaders.forEach(accordionItemHeader => {
      accordionItemHeader.addEventListener("click", event => {
  
        accordionItemHeader.classList.toggle("active");
        const accordionItemBody:any = accordionItemHeader.nextElementSibling;
        if (accordionItemHeader.classList.contains("active")) {
          accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
        }
        else {
          accordionItemBody.style.maxHeight = 0;
        }
  
      });
    });
    const modal:any = document.getElementById("myModal");

    // Get the button that opens the modal
    const btn:any = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    const span:any = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    btn.onclick = function () {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    // setInterval( () =>{
    //       this.click();  
    // }, 4000);
  
  }
  click(){    
      $('#next').trigger('click');      
  }
  scrollToElement(id:any,element: any): void {
    this.isBtnActive = id
    const el:any = document.getElementById(element);
    el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  }
 
}
