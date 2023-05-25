import { Component } from '@angular/core';
import {UserStorageService} from "../../services/user-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-client-header',
  templateUrl: './client-header.component.html',
  styleUrls: ['./client-header.component.css']
})
export class ClientHeaderComponent {

  userBalance: number;

  constructor(
    private router: Router,
    private userStorageService: UserStorageService
  ) {
    this.userBalance = userStorageService.getUser().balance;
  }

  logout(): void {
    this.userStorageService.logOut();
    this.router.navigate(['/login']);
  }
}
