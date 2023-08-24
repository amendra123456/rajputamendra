import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainSearchComponent } from './main-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [MainSearchComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    
    
    FormsModule,
   
    HttpClientModule,
    ReactiveFormsModule,
  ],
  exports:[MainSearchComponent]
})
export class MainSearchModule { }
