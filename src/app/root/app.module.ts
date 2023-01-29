import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';


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
    LayoutComponent
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
    LeafletModule,
    NgxChartsModule,
    AuthModule,
    UserModule,
    SharedModule
  ]
})
export class AppModule { }
