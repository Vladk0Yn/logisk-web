import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {UserStorageService} from "../../services/user-storage.service";

@Component({
  selector: 'app-driver-header',
  templateUrl: './driver-header.component.html',
  styleUrls: ['./driver-header.component.css']
})
export class DriverHeaderComponent {
  driverBalance: number;

  constructor(
    private router: Router,
    private userStorageService: UserStorageService
  ) {
    if (userStorageService.getUser().role === 'CLIENT') {
      userStorageService.logOut();
    }
    this.driverBalance = userStorageService.getUser().balance;
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
}
