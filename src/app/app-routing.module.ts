import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./auth/login/login.component";
import {RegistrationComponent} from "./auth/registration/registration.component";
import {ClientOrdersComponent} from "./client/client-orders/client-orders.component";
import {ClientOrderDetailsComponent} from "./client/client-orders/client-order-details/client-order-details.component";
import {ClientLocationsComponent} from "./client/locations/client-locations/client-locations.component";
import {DriverNewOrdersComponent} from "./driver/driver-new-orders/driver-new-orders.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'client/orders', component: ClientOrdersComponent},
  {path: 'client/locations', component: ClientLocationsComponent},
  {path: 'client/orders/:id', component: ClientOrderDetailsComponent},
  {path: 'driver/orders/new', component: DriverNewOrdersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
