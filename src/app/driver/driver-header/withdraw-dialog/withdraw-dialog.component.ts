import { Component } from '@angular/core';
import {NotificationService} from "../../../services/notification.service";
import {ClientAccountService} from "../../../services/client-account.service";
import {MatDialogRef} from "@angular/material/dialog";
import {DriverAccountService} from "../../../services/driver-account.service";

@Component({
  selector: 'app-withdraw-dialog',
  templateUrl: './withdraw-dialog.component.html',
  styleUrls: ['./withdraw-dialog.component.css']
})
export class WithdrawDialogComponent {
  amount: number;

  constructor(
    private notificationService: NotificationService,
    private driverService: DriverAccountService,
    private dialogRef: MatDialogRef<WithdrawDialogComponent>
  ) {
  }

  withdraw() {
    this.driverService.withdraw(this.amount).subscribe({
      next: (data) => {
        this.notificationService.showSnackBar("Успішно знято");
        this.dialogRef.close();
        location.reload();
      }, error: (error) => {
        this.notificationService.showSnackBar("Не вдалося зняти");
      }
    });
  }
}
