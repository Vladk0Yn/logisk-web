import {Component, OnInit} from '@angular/core';
import {NotificationService} from "../../services/notification.service";
import {UserStorageService} from "../../services/user-storage.service";
import {User} from "../../models/User";

@Component({
  selector: 'app-client-orders',
  templateUrl: './client-orders.component.html',
  styleUrls: ['./client-orders.component.css']
})
export class ClientOrdersComponent implements OnInit {

  constructor(
    private userStorageService: UserStorageService,
    private notificationService: NotificationService
  ) {
    let user: User = userStorageService.getUser();
    if (user == null) {
      this.userStorageService.logOut();
    }
  }

  ngOnInit(): void {

  }

}
