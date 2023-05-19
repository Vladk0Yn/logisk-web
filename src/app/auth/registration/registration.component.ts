import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatButtonToggleChange} from "@angular/material/button-toggle";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  hide = true;

  registerForm: FormGroup = this.formBuilder.group({
    fullname: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  role: string = 'client';

  constructor (
    private router: Router,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
  }

  onToggleChange(event: MatButtonToggleChange) {
    this.role = event.value;
  }

  submit(): void {
    console.log(this.role)
  }
}
