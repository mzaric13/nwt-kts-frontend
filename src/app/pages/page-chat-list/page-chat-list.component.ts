import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PassengerDTO } from 'src/app/models/passenger-dto';
import { PassengerService } from 'src/app/services/passenger.service';

@Component({
  selector: 'app-page-chat-list',
  templateUrl: './page-chat-list.component.html',
  styleUrls: ['./page-chat-list.component.css']
})
export class PageChatListComponent implements OnInit {

  tableData: PassengerDTO[] = [];
  displayedColumns: string[] = ['profile-picture', 'email', 'name', 'surname'];

  constructor(
    private readonly passengerService: PassengerService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.passengerService.getAllActivatedPassengers().subscribe({
      next: passengers => {
        this.tableData = passengers;
      }
    })
  }

  goToChat(passengerDTO: PassengerDTO) {
    this.router.navigate(['/chat/' + passengerDTO.email]);
  }

}
