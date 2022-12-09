import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
} from '@abacritt/angularx-social-login';

import { FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NavbarStartPageComponent } from './components/navbar-start-page/navbar-start-page.component';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { PageRegisterComponent } from './pages/page-register/page-register.component';
import { ProfilePageCardComponent } from './components/profile-page-card/profile-page-card.component';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';
import { ProfilePageCardsComponent } from './components/profile-page-cards/profile-page-cards.component';
import { PagePassengerProfileComponent } from './pages/page-passenger-profile/page-passenger-profile.component';
import { ModalPersonalInfoChangeComponent } from './components/modal-personal-info-change/modal-personal-info-change.component';
import { ModalPasswordChangeComponent } from './components/modal-password-change/modal-password-change.component';
import { ModalPictureChangeComponent } from './components/modal-picture-change/modal-picture-change.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    NavbarStartPageComponent,
    PageLoginComponent,
    PageRegisterComponent,
    ProfilePageCardComponent,
    ProfileInfoComponent,
    ProfilePageCardsComponent,
    PagePassengerProfileComponent,
    ModalPersonalInfoChangeComponent,
    ModalPasswordChangeComponent,
    ModalPictureChangeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('865121524523148'),
          },
        ],
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
