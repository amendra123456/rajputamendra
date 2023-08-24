import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PackDetailComponent } from './pack-detail/pack-detail.component';
import { ProceedDetailComponent } from './proceed-detail/proceed-detail.component';


const routes: Routes = [
  {
    path:'view-detail',
    component: PackDetailComponent,
  },
  {
    path:'proceed-detail',
    component: ProceedDetailComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewDetailRoutingModule {
  constructor(){console.log("hi");}
 }
