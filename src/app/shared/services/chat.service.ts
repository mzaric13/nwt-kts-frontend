import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MessageDTO } from '../models/message-dto';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private url = environment.apiUrl;

  constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

  public getChatMessages(chatName: String) {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.tokenService.getToken(),
      }),
    };
    return this.httpClient.get<MessageDTO[]>(this.url + "/get-user-messages/" + chatName, options);
  }
}
