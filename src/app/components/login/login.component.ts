import { Component, OnInit, NgZone } from "@angular/core";
import {SocialUser, SocialAuthService, GoogleLoginProvider, FacebookLoginProvider} from '@abacritt/angularx-social-login';
import { CredentialResponse, PromptMomentNotification } from 'google-one-tap';
import { OauthService } from '../../services/oauth.service';
import { TokenService } from '../../services/token.service';
import { FormBuilder } from '@angular/forms';
import { FacebookTokenDTO, GoogleTokenDto, LoginEmailPassword } from '../../models/token-dto';
import {faFacebookF} from '@fortawesome/free-brands-svg-icons'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
  })
  export class LoginComponent implements OnInit {

    faFacebookF = faFacebookF;

    socialUser: SocialUser | undefined;

    loginForm = this.formBuilder.group({
      email: '',
      password: ''
    });

    constructor(
        private authService: SocialAuthService,
        private oauthService: OauthService,
        private tokenService: TokenService,
        private _ngZone: NgZone,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
      // @ts-ignore
      window.onGoogleLibraryLoad = () => {
        // @ts-ignore
        google.accounts.id.initialize({
          client_id: '804254335312-350k42htndd15j948e1degejntgqqhku.apps.googleusercontent.com',
          callback: this.handleCredentialResponse.bind(this),
          auto_select: false,
          cancel_on_tap_outside: true
        });
        // @ts-ignore
        google.accounts.id.renderButton(
        // @ts-ignore
        document.getElementById("googleButtonDiv"),
          { theme: "outline", size: "large", width: "100%", text: "signin_with", shape: "rectangular"} 
        );
        // @ts-ignore
        google.accounts.id.prompt((notification: PromptMomentNotification) => {});
      };
      this.authService.authState.subscribe((user) => {
          this.socialUser = user;
        });
    }

    async handleCredentialResponse(response: CredentialResponse) {
      debugger;
      await this.oauthService.google(response.credential).subscribe(
        (x:any) => {
          console.log(x);
        },
        (error:any) => {
            console.log(error);
          }
        );  
  }

    signInWithFB(): void {
        this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
          data => {
            this.socialUser = data;
            const tokenFace = new FacebookTokenDTO(this.socialUser.authToken, this.socialUser.firstName, this.socialUser.lastName);
            this.oauthService.facebook(tokenFace).subscribe(
              res => {
                this.tokenService.setToken(res.accessToken);
                console.log(res);
              },
              err => {
                console.log(err);
              }
            );
          }
        ).catch(
          err => {
            console.log(err);
          }
        );
      }

      loginCredentials(): void {
        try {
          this.oauthService.credentials(new LoginEmailPassword(this.loginForm.value.email as string, this.loginForm.value.password as string)).subscribe(
            res => {
              this.tokenService.setToken(res.accessToken);
              console.log(res);
            },
            err => {
              console.log(err);
            }
          );
        }catch (e){
          console.log(e);
        }
      }
      
  }