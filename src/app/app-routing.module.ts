import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./auth/login/login.component";
import {RegistrationComponent} from "./auth/registration/registration.component";
import {ClientOrdersComponent} from "./client/client-orders/client-orders.component";
import {ClientOrderDetailsComponent} from "./client/client-orders/client-order-details/client-order-details.component";
import {ClientLocationsComponent} from "./client/locations/client-locations/client-locations.component";
import {DriverNewOrdersComponent} from "./driver/driver-new-orders/driver-new-orders.component";
import {DriverOrderDetailsComponent} from "./driver/driver-order-details/driver-order-details.component";
import {DriverOrdersComponent} from "./driver/driver-orders/driver-orders.component";
import {DriverCreateTransportComponent} from "./driver/driver-create-transport/driver-create-transport.component";
import {DriverTransportComponent} from "./driver/driver-transport/driver-transport.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'client/orders', component: ClientOrdersComponent},
  {path: 'client/locations', component: ClientLocationsComponent},
  {path: 'client/orders/:id', component: ClientOrderDetailsComponent},
  {path: 'driver/orders/new', component: DriverNewOrdersComponent},
  {path: 'driver/orders/:id', component: DriverOrderDetailsComponent},
  {path: 'driver/orders', component: DriverOrdersComponent},
  {path: 'driver/transport/register', component: DriverCreateTransportComponent},
  {path: 'driver/transport', component: DriverTransportComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
