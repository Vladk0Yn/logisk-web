import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatButtonToggleChange} from "@angular/material/button-toggle";
import {AuthService} from "../../services/auth.service";
import {NotificationService} from "../../services/notification.service";
import {RegisterRequest} from "../../models/RegisterRequest";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  role = 'CLIENT'
  hide = true;

  registerForm: FormGroup = this.formBuilder.group({
    name: [null, Validators.required],
    phoneNumber: [null, [Validators.required, Validators.pattern('[- +()0-9]+')]],
    email: [null, Validators.required],
    password: [null, Validators.required]
  });

  constructor (
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService,
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
    this.authService.register(request).subscribe(data => {
      console.log(request)
      this.notificationService.showSnackBar("Успішно зареєстровано, можете увійти за допомогою логіну та паролю");
      this.router.navigate(['/login']);
    }, error => {
      this.notificationService.showSnackBar("Сталася помилка, спробуйте ще");
    })
  }
}
