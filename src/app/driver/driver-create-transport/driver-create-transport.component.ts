import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {NotificationService} from "../../services/notification.service";
import {DriverTransportService} from "../../services/driver-transport.service";

@Component({
  selector: 'app-driver-create-transport',
  templateUrl: './driver-create-transport.component.html',
  styleUrls: ['./driver-create-transport.component.css']
})
export class DriverCreateTransportComponent implements OnInit {

  constructor(
    private router: Router,
    private transportService: DriverTransportService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
  }

  createTransportForm: FormGroup = this.formBuilder.group({
    name: [null, Validators.required],
    type: [null, Validators.required],
    code: [null, Validators.required],
    loadCapacity: [null, Validators.required],
    loadLength: [null, Validators.required],
    loadHeight: [null, Validators.required],
    loadWidth: [null, Validators.required]
  });

  submit() {
    this.transportService.createTransport({
      id: 0,
      name: this.createTransportForm.value.name,
      type: this.createTransportForm.value.type,
      code: this.createTransportForm.value.code,
      loadCapacity: this.createTransportForm.value.loadCapacity,
      loadLength: this.createTransportForm.value.loadLength,
      loadHeight: this.createTransportForm.value.loadHeight,
      loadWidth: this.createTransportForm.value.loadWidth
    }).subscribe({
      next: (data) => {
        this.notificationService.showSnackBar("Транспортний засіб успішно додано");
        this.router.navigate(['/driver/orders/new']);
      }, error: (error) => {
        this.notificationService.showSnackBar("Сталася помилка при додаванні транспортного засобу");
      }
    });
  }
}
