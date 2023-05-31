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
    this.driverBalance = userStorageService.getUser().balance;
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
}
