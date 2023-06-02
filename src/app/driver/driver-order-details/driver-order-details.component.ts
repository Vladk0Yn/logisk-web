import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OrderResponse} from "../../models/response/OrderResponse";
import {DriverResponse} from "../../models/response/DriverResponse";
import {LocationResponse} from "../../models/response/LocationResponse";
import {ActivatedRoute, Router} from "@angular/router";
import {NotificationService} from "../../services/notification.service";
import {ClientOrdersService} from "../../services/client-orders.service";
import {ClientLocationsService} from "../../services/client-locations.service";
import {DriverOrdersService} from "../../services/driver-orders.service";
import {ClientResponse} from "../../models/response/ClientResponse";

@Component({
  selector: 'app-driver-order-details',
  templateUrl: './driver-order-details.component.html',
  styleUrls: ['./driver-order-details.component.css']
})
export class DriverOrderDetailsComponent implements OnInit {
  orderId: number;
  order: OrderResponse;
  client: ClientResponse;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private notificationService: NotificationService,
              private orderService: DriverOrdersService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.orderId = params['id'];
      this.setupOrderById(this.orderId);
    });
  }

  setupOrderClient(): void {
    this.orderService.getOrderClient(this.orderId).subscribe({
      next: (data) => {
        this.client = <ClientResponse>JSON.parse(JSON.stringify(data));
      }, error: (error) => {
        this.notificationService.showSnackBar("Помилка при завантаженні інформації про клієнта")
      }
    });
  }

  getDateFromNumber(date: number): string {
    return new Date(date).toISOString().slice(0, 16);
  }

  getOrderTypeLocale(type: string): string {
    switch (type) {
      case 'MATERIALS':
        return 'Матеріали';
      case 'FRAGILE':
        return 'Крихкий вантаж';
      case 'PRODUCTS':
        return 'Продукти';
      case 'DANGER':
        return 'Небезпечний вантаж';
    }
    return 'Інше';
  }

  setupOrderById(id: number) {
    this.orderService.getOrder(id).subscribe({
      next: (data) => {
        this.order = <OrderResponse>JSON.parse(JSON.stringify(data));
        this.setupOrderClient();
      }, error: (error) => {
        this.notificationService.showSnackBar("Сталася помилка при завантаженні замовлення")
      }
    });
  }
  closeWindow(): void {
    if (this.order.status == 'CREATED') {
      this.router.navigate(['driver/orders/new']);
    } else {
      this.router.navigate(['driver/orders']);
    }
  }
}
