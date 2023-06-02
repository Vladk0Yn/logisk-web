import {Component, OnInit, ViewChild} from '@angular/core';
import {OrderResponse} from "../../models/response/OrderResponse";
import {MatTableDataSource} from "@angular/material/table";
import {OrderRequest} from "../../models/request/OrderRequest";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {Router} from "@angular/router";
import {UserStorageService} from "../../services/user-storage.service";
import {ClientOrdersService} from "../../services/client-orders.service";
import {ClientLocationsService} from "../../services/client-locations.service";
import {NotificationService} from "../../services/notification.service";
import {MatDialog} from "@angular/material/dialog";
import {DriverOrdersService} from "../../services/driver-orders.service";

@Component({
  selector: 'app-driver-new-orders',
  templateUrl: './driver-new-orders.component.html',
  styleUrls: ['./driver-new-orders.component.css']
})
export class DriverNewOrdersComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'type','deliverDueTime', 'locationFrom', 'locationTo' ,'deliveryPrice', 'action'];
  dataSource: MatTableDataSource<OrderResponse>;
  orders: OrderResponse[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    private userStorageService: UserStorageService,
    private ordersService: DriverOrdersService,
    private locationService: ClientLocationsService,
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.getAvailableOrders();
  }

  getAvailableOrders(): void {
    this.ordersService.getAvailableOrders().subscribe({
      next: (data) => {
        this.orders = <OrderResponse[]>JSON.parse(JSON.stringify(data));
        this.dataSource = new MatTableDataSource<OrderResponse>(this.orders);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, error: (error) => {
        this.notificationService.showSnackBar("Сталася помилка при завантаженні нових замовлень");
      }
    })
  }

  getOrderDeliverDueTime(order: OrderResponse): string {
    return new Date(order.deliverDueTime).toLocaleString();
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

  takeOrder(id: number) {
    this.ordersService.takeOrder(id).subscribe({
      next: (data) => {
        this.notificationService.showSnackBar("Доставку успішно обрано");
        this.router.navigate(['driver/orders']);
      }, error: (error) => {
        this.notificationService.showSnackBar("Сталася помилка при обранні доставки");
      }
    });
  }

  openOrderDetails(id: number) {
    this.router.navigate(['driver/orders', id]);
  }
}
