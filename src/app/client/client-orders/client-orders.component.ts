import {Component, OnInit} from '@angular/core';
import {NotificationService} from "../../services/notification.service";
import {UserStorageService} from "../../services/user-storage.service";
import {UserResponse} from "../../models/response/UserResponse";
import {MatDialog} from "@angular/material/dialog";
import {ClientCreateOrderComponent} from "./client-create-order/client-create-order.component";
import {OrderResponse} from "../../models/response/OrderResponse";
import {ClientOrdersService} from "../../services/client-orders.service";
import {LocationResponse} from "../../models/response/LocationResponse";
import {ClientLocationsService} from "../../services/client-locations.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-client-orders',
  templateUrl: './client-orders.component.html',
  styleUrls: ['./client-orders.component.css']
})
export class ClientOrdersComponent implements OnInit {

  orders: OrderResponse[];

  constructor(
    private router: Router,
    private userStorageService: UserStorageService,
    private ordersService: ClientOrdersService,
    private locationService: ClientLocationsService,
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) {
    let user: UserResponse = userStorageService.getUser();
    if (user == null) {
      this.userStorageService.logOut();
    }
  }

  ngOnInit(): void {
    this.setupClientOrders();
  }

  setupClientOrders(): void {
    this.ordersService.getOrders().subscribe({
      next: (data) => {
        this.orders = <OrderResponse[]>JSON.parse(JSON.stringify(data));
      }, error: (error) => {
        this.notificationService.showSnackBar("Сталася помилка при завантажені замовлень");
      }
    });
  }

  createOrderDialog() {
    this.dialog.open(ClientCreateOrderComponent);
  }

  convertDate(date: number): string {
    const dateType = new Date(date);
    return dateType.toLocaleString();
  }

  openOrderDetails(id: number) {
    this.router.navigate(['client/orders', id]);
  }
}
