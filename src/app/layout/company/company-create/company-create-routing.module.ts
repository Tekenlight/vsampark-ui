import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyCreateComponent } from './company-create.component';

const routes: Routes = [
  {
      path: '',
      component: CompanyCreateComponent
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyCreateRoutingModule { }