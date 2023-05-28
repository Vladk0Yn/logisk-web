import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NotificationService} from "../../../services/notification.service";
import {ClientOrdersService} from "../../../services/client-orders.service";
import {OrderResponse} from "../../../models/response/OrderResponse";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LocationResponse} from "../../../models/response/LocationResponse";
import {ClientLocationsService} from "../../../services/client-locations.service";

@Component({
  selector: 'app-client-order-details',
  templateUrl: './client-order-details.component.html',
  styleUrls: ['./client-order-details.component.css']
})
export class ClientOrderDetailsComponent implements OnInit {
  orderId: number;
  orderForm: FormGroup;
  order: OrderResponse;
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
    console.log(new Date(this.order.createdTime).toLocaleString())
    this.orderForm = this.formBuilder.group({
        name: [this.order.name, Validators.required],
        weight: [this.order.weight, Validators.required],
        width: [this.order.width, Validators.required],
        height: [this.order.height, Validators.required],
        type: [this.order.type, Validators.required],
        deliveryPrice: [this.order.deliveryPrice, Validators.required],
        createdTime: [new Date(this.order.createdTime).toISOString().slice(0, 16), Validators.required],
        deliverDueTime: [new Date(this.order.deliverDueTime).toISOString().slice(0, 16), Validators.required],
        locationToId: [this.order.locationTo.id, Validators.required],
        locationFromId: [this.order.locationFrom.id, Validators.required],
        driver: [this.order.driverId]
      }
    );
  }

  convertMillisecondsToDate(milliseconds: number): string {
    const date = new Date(milliseconds);
    return date.toISOString(); // Returns the date string in the format "YYYY-MM-DDTHH:mm:ss.sssZ"
  }

  setupOrderById(id: number) {
    this.orderService.getOrder(id).subscribe({
      next: (data) => {
        this.order = <OrderResponse>JSON.parse(JSON.stringify(data));
        if (this.order.status != "CREATED") {
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
    this.selectedLocationFromId = selectedLocationId;
  }

  putOrder() {

  }

  protected readonly close = close;
}
