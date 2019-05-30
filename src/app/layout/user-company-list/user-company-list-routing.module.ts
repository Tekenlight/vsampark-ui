import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserCompanyListComponent } from './user-company-list.component';


const routes: Routes = [
  {
      path: '',
      component: UserCompanyListComponent
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserCompanyListRoutingModule { }
