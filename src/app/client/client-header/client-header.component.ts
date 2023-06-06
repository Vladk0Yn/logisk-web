import {Component, OnInit} from '@angular/core';
import {UserStorageService} from "../../services/user-storage.service";
import {Router} from "@angular/router";
import {ClientOrdersService} from "../../services/client-orders.service";
import {ClientAccountService} from "../../services/client-account.service";
import {UserResponse} from "../../models/response/UserResponse";
import {MatDialog} from "@angular/material/dialog";
import {TopUpDialogComponent} from "./top-up-dialog/top-up-dialog.component";

@Component({
  selector: 'app-client-header',
  templateUrl: './client-header.component.html',
  styleUrls: ['./client-header.component.css']
})
export class ClientHeaderComponent implements OnInit {

  userBalance: number;

  constructor(
    private router: Router,
    private clientService: ClientAccountService,
    private userStorageService: UserStorageService,
    private dialog: MatDialog
  ) {
    if (userStorageService.getUser().role === 'DRIVER') {
      userStorageService.logOut();
    }
  }

  ngOnInit(): void {
    this.getBalance();
  }

  logout(): void {
    this.userStorageService.logOut();
    this.router.navigate(['/login']);
  }

  navigateOrders() {
    this.router.navigate(['client/orders']);
  }

  navigateLocations(): void {
    this.router.navigate(['client/locations']);
  }

  getBalance(): void {
    this.clientService.getBalance().subscribe({
      next: (data) => {
        this.userBalance = <number>JSON.parse(JSON.stringify(data));
      }
    });
  }

  topUpDialog() {
    this.dialog.open(TopUpDialogComponent);
  }
}
