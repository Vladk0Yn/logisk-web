import {Component, OnInit} from '@angular/core';
import {OrderResponse} from "../../models/response/OrderResponse";
import {ClientCreateOrderComponent} from "../../client/client-orders/client-create-order/client-create-order.component";
import {DriverOrdersService} from "../../services/driver-orders.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-driver-orders',
  templateUrl: './driver-orders.component.html',
  styleUrls: ['./driver-orders.component.css']
})
export class DriverOrdersComponent implements OnInit {

  orders: OrderResponse[];
  constructor(
    private ordersService: DriverOrdersService,
    private router: Router,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
    this.setupDriverOrders();
  }

  setupDriverOrders(): void {
    this.ordersService.getOrders().subscribe({
      next: (data) => {
        this.orders = <OrderResponse[]>JSON.parse(JSON.stringify(data));
      }, error: (error) => {
        this.notificationService.showSnackBar("Сталася помилка при завантажені замовлень");
      }
    });
  }

  convertDate(date: number): string {
    const dateType = new Date(date);
    return dateType.toLocaleString();
  }

  openOrderDetails(id: number) {
    this.router.navigate(['driver/orders', id]);
  }

  setOrderDelivering(id: number) {
    this.ordersService.setOrderStatus(id, "DELIVERING").subscribe({
      next: (data) => {
        this.notificationService.showSnackBar("Замовлення в дорозі");
        location.reload();
      }, error: (error) => {
        this.notificationService.showSnackBar("Сталася помилка");
      }
    });
  }

  setOrderFinished(id: number) {
    this.ordersService.setOrderStatus(id, "FINISHED").subscribe({
      next: (data) => {
        this.notificationService.showSnackBar("Замовлення доставлено");
        location.reload();
      }, error: (error) => {
        this.notificationService.showSnackBar("Сталася помилка");
      }
    });
  }

  setOrderCanceled(id: number) {
    this.ordersService.setOrderStatus(id, "CANCELED").subscribe({
      next: (data) => {
        this.notificationService.showSnackBar("Замовлення скасовано");
        location.reload();
      }, error: (error) => {
        this.notificationService.showSnackBar("Сталася помилка");
      }
    });
  }

}
