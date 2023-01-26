import { Component, OnInit } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { PassengerService } from 'src/app/services/passenger.service';
import { AdminService } from 'src/app/services/admin.service';
import { ChatService } from 'src/app/services/chat.service';
import { PassengerDTO } from 'src/app/models/passenger-dto';
import { AdminDTO } from 'src/app/models/admin-dto';
import { MessageDTO } from 'src/app/models/message-dto';
import { Observable, of } from 'rxjs';
import { FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { DriverDTO } from 'src/app/models/driver-dto';
import { DriverService } from 'src/app/services/driver.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-page-live-chat',
  templateUrl: './page-live-chat.component.html',
  styleUrls: ['./page-live-chat.component.css']
})
export class PageLiveChatComponent implements OnInit {

  constructor(
    private readonly passengerService: PassengerService,
    private readonly adminService: AdminService,
    private readonly chatService: ChatService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly driverService: DriverService,
    private readonly tokenService: TokenService,
  ) { }

  loggedPassenger!: PassengerDTO;
  loggedAdmin!: AdminDTO;
  loggedDriver!: DriverDTO;
  chatName: string = '';
  socket?: WebSocket;
  stompClient?: Stomp.Client;
  newMessage = new FormControl('');
  messages?: Observable<MessageDTO[]>;

  url = environment.apiUrl;
  receiver: string = "";

  ngOnInit(): void {
    this.passengerService.getLoggedPassenger().subscribe({
      next: (passenger) => {
        this.loggedPassenger = passenger;
        this.chatName = this.loggedPassenger.email + '&' + 'admin';
        this.receiver = 'Admin'
        this.connectToChat();
      },
      error: () => {
        this.driverService.getLoggedDriver().subscribe({
          next: (driver) => {
            this.loggedDriver = driver;
            this.chatName = this.loggedDriver.email + '&' + 'admin';
            this.receiver = 'Admin'
            this.connectToChat();
          },
          error: () => {
            this.adminService.getLoggedAdministrator().subscribe({
              next: (admin) => {
                this.loggedAdmin = admin;
                this.activatedRoute.params.subscribe(s => {
                  this.receiver = s["name"]
                  this.chatName = s["name"] + '&' + 'admin';
                  this.connectToChat();
                })
              }
            });
          }
        })
      }
    });
  }

  connectToChat() {
    this.loadChat();
    console.log('connecting to chat...');
    this.socket = new SockJS(this.url + '/secured/chat');
    this.stompClient = Stomp.over(this.socket);

    this.stompClient.connect({}, (frame) => {
      console.log('connected to: ' + frame);
      this.stompClient!.subscribe(
        '/secured/topic/messages/' + this.chatName,
        (response) => {
          this.loadChat();
        }
      );
    });
  }

  sendMsg() {
    let sender: string = '';
    if (this.receiver == 'Admin') {
      sender = this.loggedPassenger ? this.loggedPassenger.email : this.loggedDriver.email;
    } else {
      sender = 'admin';
    }
    if (this.newMessage.value !== '') {
      this.stompClient!.send(
        '/app/secured/chat/' + this.chatName,
        {},
        JSON.stringify({
          sender,
          message: this.newMessage.value,
        })
      );
      this.newMessage.setValue('');
    }
  }

  loadChat() {
    this.chatService.getChatMessages(this.chatName).subscribe({
      next: (messages) => {
        this.messages = of(messages);
      }
    })
    console.log(this.messages);
  }

}
