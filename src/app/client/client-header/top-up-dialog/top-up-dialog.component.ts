import { Component } from '@angular/core';
import {ClientAccountService} from "../../../services/client-account.service";
import {NotificationService} from "../../../services/notification.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-top-up-dialog',
  templateUrl: './top-up-dialog.component.html',
  styleUrls: ['./top-up-dialog.component.css']
})
export class TopUpDialogComponent {
  amount: number;

  constructor(
    private notificationService: NotificationService,
    private clientService: ClientAccountService,
    private dialogRef: MatDialogRef<TopUpDialogComponent>
  ) {
  }

  topUp() {
    this.clientService.topUpBalance(this.amount).subscribe({
      next: (data) => {
        this.notificationService.showSnackBar("Успішно поповнено");
        this.dialogRef.close();
        location.reload();
      }, error: (error) => {
        this.notificationService.showSnackBar("Не вдалося поповнити");
      }
    });
  }
}
