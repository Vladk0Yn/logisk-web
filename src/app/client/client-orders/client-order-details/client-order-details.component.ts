import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NotificationService} from "../../../services/notification.service";
import {ClientOrdersService} from "../../../services/client-orders.service";
import {OrderResponse} from "../../../models/response/OrderResponse";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LocationResponse} from "../../../models/response/LocationResponse";
import {ClientLocationsService} from "../../../services/client-locations.service";
import {DriverResponse} from "../../../models/response/DriverResponse";

@Component({
  selector: 'app-client-order-details',
  templateUrl: './client-order-details.component.html',
  styleUrls: ['./client-order-details.component.css']
})
export class ClientOrderDetailsComponent implements OnInit {
  orderId: number;
  orderForm: FormGroup;
  order: OrderResponse;
  driver: DriverResponse;
  readonly: boolean = false;
  selectedLocationFromId: number;
  locations: LocationResponse[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private notificationService: NotificationService,
              private orderService: ClientOrdersService,
              private locationService: ClientLocationsService) {
  }

  ngOnInit(): void {
    this.setupClientLocations()
    this.route.params.subscribe(params => {
      this.orderId = params['id'];
      this.setupOrderById(this.orderId);
    });
  }

  initOrderForm(): void {
    this.orderForm = this.formBuilder.group({
        name: [this.order.name, Validators.required],
        weight: [this.order.weight, Validators.required],
        length: [this.order.length, Validators.required],
        width: [this.order.width, Validators.required],
        height: [this.order.height, Validators.required],
        type: [this.order.type, Validators.required],
        deliveryPrice: [this.order.deliveryPrice, Validators.required],
        createdTime: [this.getDate(this.order.createdTime), Validators.required],
        deliverDueTime: [this.getDate(this.order.deliverDueTime), Validators.required],
        locationToId: [this.order.locationTo.id, Validators.required],
        locationFromId: [this.order.locationFrom.id, Validators.required]
      }
    );
  }

  getDate(dateNum: number): string {
    const date = new Date(dateNum);
    date.setHours(date.getHours() + 3);
    return date.toISOString().slice(0, 16);
  }

  setupOrderDriver(): void {
    this.orderService.getOrderDriver(this.orderId).subscribe({
      next: (data) => {
        this.driver = <DriverResponse>JSON.parse(JSON.stringify(data));
      }, error: (error) => {
        this.notificationService.showSnackBar("Помилка при завантаженні інформації про водія")
    }
    });
  }

  setupOrderById(id: number) {
    this.orderService.getOrder(id).subscribe({
      next: (data) => {
        this.order = <OrderResponse>JSON.parse(JSON.stringify(data));
        this.selectedLocationFromId = this.order.locationFrom.id;
        if (this.order.driverId != null) {
          this.setupOrderDriver();
        }
        if (this.order.status != "CREATED" && this.order.status != 'CANCELED') {
          this.readonly = true;
        }
        this.initOrderForm();
      }, error: (error) => {
       this.notificationService.showSnackBar("Сталася помилка при завантаженні замовлення")
      }
    });
  }
  closeWindow(): void {
    this.router.navigate(['client/orders']);
  }

  setupClientLocations(): void {
    this.locationService.getAllLocations().subscribe({
      next: (data) => {
        this.locations = <LocationResponse[]>JSON.parse(JSON.stringify(data));
      }, error: (error) => {
        this.notificationService.showSnackBar("Сталася помилка при завантаженні локацій")
      }
    });
  }

  disableSelectedLocation(selectedLocationId: number) {
    if (selectedLocationId === this.orderForm.value.locationFromId) {
      this.orderForm.get('locationToId').setValue(null);
      this.selectedLocationFromId = selectedLocationId;
    }
  }

  putOrder() {
    this.orderService.putOrder({
      id: this.order.id,
      name: this.orderForm.value.name,
      weight: this.orderForm.value.weight,
      length: this.orderForm.value.length,
      width: this.orderForm.value.width,
      height: this.orderForm.value.height,
      type: this.orderForm.value.type,
      deliveryPrice: this.orderForm.value.deliveryPrice,
      deliverDueTime: new Date(this.orderForm.value.deliverDueTime).getTime(),
      locationToId: this.orderForm.value.locationToId,
      locationFromId: this.orderForm.value.locationFromId
    }).subscribe({
      next: (data) => {
        this.notificationService.showSnackBar("Замовлення на доставку успішно оновлене");
        this.router.navigate(["client/orders"]);
      }, error: (error) => {
        this.notificationService.showSnackBar("Сталася помилка, перевірте правильність данних");
      }
    });
  }
}
