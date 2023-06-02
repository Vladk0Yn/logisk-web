import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {UserStorageService} from "./services/user-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'logisk-web';
  constructor(
    private userService: UserStorageService,
    private router: Router
  ) {
      if (userService.getUser() === null) {
        this.router.navigate(['login']);
      }
    }
}
