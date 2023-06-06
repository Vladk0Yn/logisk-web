import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatButtonToggleChange} from "@angular/material/button-toggle";
import {AuthService} from "../../services/auth.service";
import {NotificationService} from "../../services/notification.service";
import {RegisterRequest} from "../../models/request/RegisterRequest";
import {UserResponse} from "../../models/response/UserResponse";
import {UserStorageService} from "../../services/user-storage.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  role = 'CLIENT';
  hide = true;
  user: UserResponse;

  registerForm: FormGroup = this.formBuilder.group({
    name: [null, Validators.required],
    phoneNumber: [null, [Validators.required, Validators.pattern('[- +()0-9]+')]],
    email: [null, Validators.required],
    password: [null, Validators.required]
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService,
    private userStorageService: UserStorageService,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
  }

  onToggleChange(event: MatButtonToggleChange) {
    this.role = event.value
  }

  submit(): void {
    let request: RegisterRequest = this.registerForm.value;
    request.role = this.role;
    this.authService.register(request).subscribe({
      next: (data) => {
        this.user = <UserResponse>JSON.parse(JSON.stringify(data));
        this.userStorageService.saveUser(this.user);
        this.user = this.userStorageService.getUser()
        this.notificationService.showSnackBar("Вітаємо, " + this.user.name);
        if (this.user != null) {
          this.userStorageService.saveToken(btoa(request.email + ':' + request.password));
          switch (this.user.role.toUpperCase()) {
            case "CLIENT": {
              this.router.navigate(['client/locations']);
              break;
            }
            case "DRIVER": {
              this.router.navigate(['driver/transport/register']);
              break;
            }
          }
        }
      }, error: (error) => {
        this.notificationService.showSnackBar("Сталася помилка, спробуйте ще");
      }
    });
  }
}

