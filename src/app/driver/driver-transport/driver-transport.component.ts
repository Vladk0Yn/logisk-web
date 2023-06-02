import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {DriverTransportService} from "../../services/driver-transport.service";
import {NotificationService} from "../../services/notification.service";
import {TransportResponse} from "../../models/response/TransportResponse";
import {OrderResponse} from "../../models/response/OrderResponse";

@Component({
  selector: 'app-driver-transport',
  templateUrl: './driver-transport.component.html',
  styleUrls: ['./driver-transport.component.css']
})
export class DriverTransportComponent implements OnInit {
  editTransportForm: FormGroup;
  transport: TransportResponse;
  constructor(
    private router: Router,
    private transportService: DriverTransportService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.getTransport();
  }

  getTransport() {
    this.transportService.getTransport().subscribe({
      next: (data) => {
        this.transport = <TransportResponse>JSON.parse(JSON.stringify(data));
        this.editTransportForm = this.formBuilder.group({
          name: [this.transport.name, Validators.required],
          type: [this.transport.type, Validators.required],
          code: [this.transport.code, Validators.required],
          loadCapacity: [this.transport.loadCapacity, Validators.required],
          loadHeight: [this.transport.loadHeight, Validators.required],
          loadWidth: [this.transport.loadWidth, Validators.required]
        });
      }, error: (error) => {
        this.notificationService.showSnackBar("Сталася помилка при завантаженні транспорту");
      }
    });
  }

  submit() {
    this.transportService.updateTransport({
      id: this.transport.id,
      name: this.editTransportForm.value.name,
      type: this.editTransportForm.value.type,
      code: this.editTransportForm.value.code,
      loadCapacity: this.editTransportForm.value.loadCapacity,
      loadHeight: this.editTransportForm.value.loadHeight,
      loadWidth: this.editTransportForm.value.loadWidth
    }).subscribe({
      next: (data) => {
        this.notificationService.showSnackBar("Транспортний засіб успішно оновлено");
        location.reload();
      }, error: (error) => {
        this.notificationService.showSnackBar("Сталася помилка при оновленні транспортного засобу");
      }
    });
  }
}
