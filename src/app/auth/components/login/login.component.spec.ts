import { HttpClientModule } from "@angular/common/http";
import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule, By } from "@angular/platform-browser";
import { OauthService } from "../../services/oauth.service";
import { LoginComponent } from "./login.component";
import { OAuthServiceMock } from 'src/app/mock/oauth.service.mock';
import { TokenService } from "src/app/shared/services/token.service";
import { Router } from "@angular/router";
import { SocialAuthService, } from "@abacritt/angularx-social-login";
import { SocialAuthServiceMock } from "src/app/mock/social.auth.mock";

describe('Login component', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let oAuthService: any;
  let tokenService: any;
  let router: any;
  let authService: any;

  beforeEach(async () => {
    let routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    let tokenServiceMock = {
      getRole: jasmine.createSpy('getRole').and.returnValue('ROLE_PASSENGER'),
      setToken: jasmine.createSpy('setToken').and.returnValue(''),
    }
  
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
      ],
      providers: [
        { provide: SocialAuthService, useClass: SocialAuthServiceMock},
        { provide: OauthService, useClass: OAuthServiceMock },
        { provide: TokenService, useValue: tokenServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);

    component = fixture.componentInstance; // ContactComponent test instance
      // query for the title <h1> by CSS element selector
    de = fixture.debugElement.query(By.css('form'));
    el = de.nativeElement;
    oAuthService = TestBed.inject(OauthService);
    tokenService = TestBed.inject(TokenService);
    router = TestBed.inject(Router);
    authService = TestBed.inject(SocialAuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`form should be invalid because of all empty fields`, () => {
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('');
    expect(component.loginForm.valid).toBeFalsy();
  });

  it(`form should be invalid because of email`, () => {
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('sifra123');
    expect(component.loginForm.valid).toBeFalsy();
  });

  it(`form should be invalid because of password`, () => {
    component.loginForm.controls['email'].setValue('admin.admin@gmail.com');
    component.loginForm.controls['password'].setValue('');
    expect(component.loginForm.valid).toBeFalsy();
  });

  it(`should login`, () => {
    component.loginForm.controls['email'].setValue('admin.admin@gmail.com');
    component.loginForm.controls['password'].setValue('sifra123');
    
    component.loginCredentials();
    expect(router.navigate).toHaveBeenCalledWith(['/user/home-passenger']);
  });
});