import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { PasswordResetDTO } from "../../shared/models/password-reset-dto";
import { UserDTO } from "../../shared/models/user-dto";
import { UserPassResetDTO } from "../../shared/models/user-pass-reset-dto";

const cabecera = {headers: new HttpHeaders({'Content-Type' : 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class UserService {

    private url = environment.apiUrl;

    constructor(private httpClient: HttpClient) { }

    public checkIfUserExist(email: string) {
        return this.httpClient.get<UserPassResetDTO>(this.url + '/users/get-user/' + email, cabecera);
    }

    public resetPassword(password: string, confirmPassword: string, email: string) {
        let passwordResetDTO : PasswordResetDTO = {
            password: password,
            confirmPassword: confirmPassword
        }
        return this.httpClient.put<UserDTO>(this.url + '/users/reset-password/' + email, passwordResetDTO, cabecera);
    }
}