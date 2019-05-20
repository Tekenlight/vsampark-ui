import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { SuccessComponent } from './success/success.component';
import { OtpComponent } from './otp/otp.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
//import { ClaimCompanyComponent } from './claim-company/claim-company.component';

const routes: Routes = [
    
    { path: 'login', loadChildren: './login/login.module#LoginModule' },
    //{ path: '**', redirectTo: 'not-found' },
    {
        path: '',
        component: LandingPageComponent
      },
     
      {
        path: 'user-registration',
        component: UserComponent
      },
      // {
      //   path: 'login',
      //   component: LoginComponent
      // },
      {
        path: 'success',
        component: SuccessComponent
      },
     
      {
        path: 'otp',
        component: OtpComponent
      },
      {
        path: 'reset-password/:id',
        component: ResetPasswordComponent
      },
      {
        path: 'change-password/:id',
        component: ChangePasswordComponent
      },
      { path: '', 
      loadChildren: './layout/layout.module#LayoutModule', },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
