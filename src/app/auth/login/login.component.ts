import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {UserStorageService} from "../../services/user-storage.service";
import {User} from "../../models/User";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  user: User;
  public loginForm: FormGroup;

  constructor (
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService,
    private userStorageService: UserStorageService) {
    this.loginForm = this.createLoginForm();

  }

  ngOnInit(): void {
    this.loginForm = this.createLoginForm();
  }

  createLoginForm(): FormGroup {
    return this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit(): void {
    this.authService.login(this.loginForm.value).subscribe(data => {
      this.user = <User>JSON.parse(JSON.stringify(data));
      this.userStorageService.saveUser(this.user);
      this.user = this.userStorageService.getUser()
      if (this.user != null) {
        switch (this.user.role) {
          case "CLIENT": {
            this.router.navigate(['client/orders']);
            break;
          }
          case "DRIVER": {
            this.router.navigate(['driver/orders'])
            break;
          }
        }
      }
    }, error => {
      this.notificationService.showSnackBar("Oops, wrong login or password :(")
    });
  }
}
