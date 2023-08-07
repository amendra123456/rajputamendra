import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackDetailComponent } from './pack-detail/pack-detail.component';
import { ViewDetailRoutingModule } from './view-detail-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProceedDetailComponent } from './proceed-detail/proceed-detail.component';
import { CalendarModule } from '@syncfusion/ej2-angular-calendars';

@NgModule({
  declarations: [
    PackDetailComponent,
    ProceedDetailComponent
  ],
  imports: [
    CommonModule,
    ViewDetailRoutingModule,
    CalendarModule
  ],
  exports:[PackDetailComponent]
})
export class ViewDetailModule {
  constructor(){console.log("hi");}
 }
