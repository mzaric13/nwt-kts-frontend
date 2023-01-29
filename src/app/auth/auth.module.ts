import { NgModule } from "@angular/core";
import { LoginComponent } from "./components/login/login.component";
import { PageLoginComponent } from "./pages/page-login/page-login.component";
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import {
  FacebookLoginProvider,
} from '@abacritt/angularx-social-login';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { RouterModule } from "@angular/router";
import { AuthRoutes } from "./auth.routes";

@NgModule({
  declarations: [
    LoginComponent,
    PageLoginComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    RouterModule.forChild(AuthRoutes)
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
    },
  ],
})
export class AuthModule { };