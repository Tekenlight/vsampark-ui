import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyDetailViewPageComponent } from './company-detail-view-page.component';

const routes: Routes = [
  {
      path: '',
      component: CompanyDetailViewPageComponent
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [
    RouterModule
  ]
})
export class CompanyDetailViewPageRoutingModule { }






