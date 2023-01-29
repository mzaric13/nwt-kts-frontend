import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';

const ROLE_KEY = 'Role';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  public setToken(token: string, role: string): void {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.setItem(TOKEN_KEY, token);
    sessionStorage.setItem(ROLE_KEY, role);
  }

  public getToken() : string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public getRole() : string | null {
    return sessionStorage.getItem(ROLE_KEY);
  }

  logOut(): void {
    sessionStorage.clear();
  }
}