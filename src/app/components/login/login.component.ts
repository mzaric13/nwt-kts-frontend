import { Component, OnInit, NgZone } from '@angular/core';
import {
  SocialUser,
  SocialAuthService,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from '@abacritt/angularx-social-login';
import { CredentialResponse, PromptMomentNotification } from 'google-one-tap';
import { OauthService } from '../../services/oauth.service';
import { TokenService } from '../../services/token.service';
import { FormBuilder } from '@angular/forms';
import {
  FacebookTokenDTO,
  GoogleTokenDto,
  JwtToken,
  LoginEmailPassword,
} from '../../models/token-dto';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import jwtDecode from 'jwt-decode';
import { DecodedToken } from '../../models/decoded-token';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  faFacebookF = faFacebookF;

  socialUser: SocialUser | undefined;

  loginForm = this.formBuilder.group({
    email: '',
    password: '',
  });

  constructor(
    private authService: SocialAuthService,
    private oauthService: OauthService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder,
    private router: Router,
    private zone: NgZone
  ) {}

  ngOnInit() {
    // @ts-ignore
    window.onGoogleLibraryLoad = () => {
      // @ts-ignore
      google.accounts.id.initialize({
        client_id:
          '804254335312-350k42htndd15j948e1degejntgqqhku.apps.googleusercontent.com',
        callback: this.handleCredentialResponse.bind(this),
        auto_select: false,
        cancel_on_tap_outside: true,
      });
      // @ts-ignore
      google.accounts.id.renderButton(
        // @ts-ignore
        document.getElementById('googleButtonDiv'),
        {
          theme: 'filled_blue',
          size: 'large',
          width: '100',
          text: 'signin_with',
          shape: 'rectangular',
          locale: 'en-us'
        }
      );
      // @ts-ignore
      google.accounts.id.prompt((notification: PromptMomentNotification) => {});
    };
    this.authService.authState.subscribe((user) => {
      this.socialUser = user;
    });
  }

  async handleCredentialResponse(response: CredentialResponse) {
    await this.oauthService.google(response.credential).subscribe(
      async (res: JwtToken) => {
        let decodedToken: DecodedToken = jwtDecode(res.accessToken);
        this.tokenService.setToken(res.accessToken, decodedToken.role);
        await this.redirect();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  signInWithFB(): void {
    this.authService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((data) => {
        this.socialUser = data;
        const tokenFace = new FacebookTokenDTO(
          this.socialUser.authToken,
          this.socialUser.firstName,
          this.socialUser.lastName
        );
        this.oauthService.facebook(tokenFace).subscribe(
          (res: JwtToken) => {
            let decodedToken: DecodedToken = jwtDecode(res.accessToken);
            this.tokenService.setToken(res.accessToken, decodedToken.role);
            this.redirect();
          },
          (err) => {
            console.log(err);
          }
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  loginCredentials(): void {
    try {
      this.oauthService
        .credentials(
          new LoginEmailPassword(
            this.loginForm.value.email as string,
            this.loginForm.value.password as string
          )
        )
        .subscribe(
          (res) => {
            let decodedToken: DecodedToken = jwtDecode(res.accessToken);
            this.tokenService.setToken(res.accessToken, decodedToken.role);
            this.redirect();
          },
          (err) => {
            Swal.fire({
              icon: 'error',
              position: 'center',
              title: "User with given credentials doesn't exist!",
              showConfirmButton: false,
              timer: 3000
            })
          }
        );
    } catch (e) {
      Swal.fire({
        icon: 'error',
        position: 'center',
        title: e as string,
        showConfirmButton: false,
        timer: 3000
      })
    }
  }

  redirect(): void {
    let role = this.tokenService.getRole();
    if (role === 'ROLE_PASSENGER') {
      this.zone.run(() => {
        this.router.navigate(['/home-passenger']);
      });
    } else if (role === 'ROLE_ADMIN') {
      this.zone.run(() => {
        this.router.navigate(['/admin-profile']);
      });
    } else if (role === 'ROLE_DRIVER') {
      this.zone.run(() => {
        this.router.navigate(['/driver-profile']);
      });
    }
  }
}
