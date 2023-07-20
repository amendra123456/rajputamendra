import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'transformstring'
})
export class TransformstringPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(value: string, param:string) {  
    if(param=="@"){
      let [before, after]= value.split("@");
      //before
      return this.sanitizer.bypassSecurityTrustHtml("<del style='text-shadow: #111 0 0 4px;filter: blur(5px);'>"+before+"</del>"+'@'+after);
    }  
    else{
      //value
      return this.sanitizer.bypassSecurityTrustHtml("<del style='text-shadow: #111 0 0 4px;filter: blur(5px);'>"+value+"</del>");
    }
    //return finalString;
  }

}
