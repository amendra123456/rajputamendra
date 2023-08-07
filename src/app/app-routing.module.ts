import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomeComponent } from './home/home.component';
import { TermsconditionComponent } from './termscondition/termscondition.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'about-us',
    component: AboutUsComponent
  },
  {
    path:'contact-us',
    component: ContactUsComponent
  },
  {
    path: 'terms-condition',
    component: TermsconditionComponent
  },
  {
    path: '',
    loadChildren: () => import('./view-detail/view-detail.module').then(m => m.ViewDetailModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
