import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserStorageService} from "../../services/user-storage.service";
import {MatDialog} from "@angular/material/dialog";
import {TopUpDialogComponent} from "../../client/client-header/top-up-dialog/top-up-dialog.component";
import {WithdrawDialogComponent} from "./withdraw-dialog/withdraw-dialog.component";
import {DriverAccountService} from "../../services/driver-account.service";

@Component({
  selector: 'app-driver-header',
  templateUrl: './driver-header.component.html',
  styleUrls: ['./driver-header.component.css']
})
export class DriverHeaderComponent implements OnInit{
  driverBalance: number;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private driverService: DriverAccountService,
    private userStorageService: UserStorageService
  ) {
    if (userStorageService.getUser().role === 'CLIENT') {
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

  navigateNewOrders() {
    this.router.navigate(['driver/orders/new']);
  }

  navigateOrders(): void {
    this.router.navigate(['driver/orders']);
  }

  navigateTransport(): void {
    this.router.navigate(['driver/transport']);
  }

  getBalance(): void {
    this.driverService.getBalance().subscribe({
      next: (data) => {
        this.driverBalance = <number>JSON.parse(JSON.stringify(data));
      }
    });
  }

  withdrawDialog() {
    this.dialog.open(WithdrawDialogComponent);
  }
}
