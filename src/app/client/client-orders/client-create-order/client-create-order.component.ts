import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../../../services/notification.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {OrderRequest} from "../../../models/request/OrderRequest";
import {LocationResponse} from "../../../models/response/LocationResponse";
import {MatOptionSelectionChange} from "@angular/material/core";
import {ClientOrdersService} from "../../../services/client-orders.service";
import {ClientLocationsService} from "../../../services/client-locations.service";

@Component({
  selector: 'app-client-create-order',
  templateUrl: './client-create-order.component.html',
  styleUrls: ['./client-create-order.component.css']
})
export class ClientCreateOrderComponent implements OnInit {
  orderForm !: FormGroup;
  selectedLocationFromId: number;
  locations: LocationResponse[];

  constructor(
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private ordersService: ClientOrdersService,
    private locationsService: ClientLocationsService,
    private dialogRef: MatDialogRef<ClientCreateOrderComponent>) {
  }

  ngOnInit(): void {
    this.setupUserLocations()
    this.orderForm = this.formBuilder.group({
        name: ['', Validators.required],
        weight: ['', Validators.required],
        width: ['', Validators.required],
        height: ['', Validators.required],
        type: ['', Validators.required],
        deliveryPrice: ['', Validators.required],
        deliverDueTime: ['', Validators.required],
        locationToId: ['', Validators.required],
        locationFromId: ['', Validators.required]
      }
    );
  }

  setupUserLocations(): void {
    this.locationsService.getAllLocations().subscribe({
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

  createOrder() {
    this.ordersService.createOrder({
      id: 0,
      name: this.orderForm.value.name,
      weight: this.orderForm.value.weight,
      width: this.orderForm.value.width,
      height: this.orderForm.value.height,
      type: this.orderForm.value.type,
      deliveryPrice: this.orderForm.value.deliveryPrice,
      deliverDueTime: new Date(this.orderForm.value.deliverDueTime).getTime(),
      locationToId: this.orderForm.value.locationToId,
      locationFromId: this.orderForm.value.locationFromId
    }).subscribe({
      next: (data) => {
        this.notificationService.showSnackBar("Замовлення на доставку успішно створене")
        this.orderForm.reset();
        this.dialogRef.close();
        location.reload();
      }, error: (error) => {
        this.notificationService.showSnackBar("Сталася помилка, перевірте правильність данних")
        this.orderForm.reset();
        this.dialogRef.close();
      }
    });
  }
}
