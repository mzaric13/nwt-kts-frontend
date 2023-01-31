import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GoogleTokenDto, FacebookTokenDTO, JwtToken, LoginEmailPassword } from '../../shared/models/token-dto';
import { environment } from 'src/environments/environment';
import { TokenService } from 'src/app/shared/services/token.service';

const cabecera = {headers: new HttpHeaders({'Content-Type' : 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class OauthService {

  private url = environment.apiUrl;

  constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

  public credentials(loginData: LoginEmailPassword) {
    if (loginData.username === '' || loginData.password === '') throw new Error("Email and password not given.");
    return this.httpClient.post<JwtToken>(this.url + '/auth/login-credentials', loginData, cabecera);
  }

  public google(credentials: string) {
    return this.httpClient.post<JwtToken>(this.url + '/auth/login-google', new GoogleTokenDto(credentials), cabecera);
  }

  public facebook(tokenDto: FacebookTokenDTO) {
    return this.httpClient.post<JwtToken>(this.url + '/auth/login-facebook', tokenDto, cabecera);
  }

  public logout() {
    let newHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.tokenService.getToken(),
      }),
    };
    this.tokenService.logOut();
    return this.httpClient.get<string>(this.url + '/auth/logout', newHeader);
  }
}