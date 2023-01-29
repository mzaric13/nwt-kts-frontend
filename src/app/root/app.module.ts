import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { NgxChartsModule } from '@swimlane/ngx-charts';


import {
  SocialLoginModule
} from '@abacritt/angularx-social-login';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AuthModule } from '../auth/auth.module';
import { SharedModule } from '../shared/shared.module';
import { NavbarStartPageComponent } from './components/navbar-start-page/navbar-start-page.component';
import { ActivatedAccountComponent } from './pages/activated-account/activated-account.component';
import { PageForgottenPasswordComponent } from './pages/page-forgotten-password/page-forgotten-password.component';
import { PageHomeUnregisteredComponent } from './pages/page-home-unregistered/page-home-unregistered.component';
import { PageResetPasswordComponent } from './pages/page-reset-password/page-reset-password.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { NavbarAdminComponent } from './components/navbar-admin/navbar-admin.component';
import { NavbarDriverComponent } from './components/navbar-driver/navbar-driver.component';
import { NavbarPassengerComponent } from './components/navbar-passenger/navbar-passenger.component';
import { UserModule } from '../user/user.module';
import { PageRegisterPassengerComponent } from './pages/page-register-passenger/page-register-passenger.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarStartPageComponent,
    NavbarAdminComponent,
    NavbarDriverComponent,
    NavbarPassengerComponent,
    ActivatedAccountComponent,
    PageForgottenPasswordComponent,
    PageHomeUnregisteredComponent,
    PageResetPasswordComponent,
    LayoutComponent,
    PageRegisterPassengerComponent
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SocialLoginModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    SweetAlert2Module.forRoot(),
    DragDropModule,
    NgxMaterialTimepickerModule,
    NgxChartsModule,
    AuthModule,
    UserModule,
    SharedModule
  ]
})
export class AppModule { }
