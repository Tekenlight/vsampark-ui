import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompanyComponent } from './company/company.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { CompanyService } from './company/services/company.service';
import { PicklistService } from './common/services/picklist.service';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SuccessComponent } from './success/success.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { NgModule } from '@angular/core';


@NgModule({
  declarations: [
    AppComponent,
    CompanyComponent,
    LandingPageComponent,
    LoginComponent,
    UserComponent,
    SuccessComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlimLoadingBarModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    FormsModule
  ],
  providers: [PicklistService, CompanyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
