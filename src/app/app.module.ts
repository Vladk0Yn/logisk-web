import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {LoginComponent} from './auth/login/login.component';
import {RegistrationComponent} from './auth/registration/registration.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {ClientHeaderComponent} from './client/client-header/client-header.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {ClientOrdersComponent} from './client/client-orders/client-orders.component';
import {ClientFooterComponent} from './client/client-footer/client-footer.component';
import {MatChipsModule} from "@angular/material/chips";
import {MatLegacyChipsModule} from "@angular/material/legacy-chips";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatBadgeModule} from "@angular/material/badge";
import {MatSelectModule} from "@angular/material/select";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ClientCreateOrderComponent } from './client/client-orders/client-create-order/client-create-order.component';
import {MatDialogModule} from "@angular/material/dialog";
import {AuthInterceptorService} from "./helpers/auth-interceptor.service";
import { ClientOrderDetailsComponent } from './client/client-orders/client-order-details/client-order-details.component';
import {GoogleMapsModule} from "@angular/google-maps";
import { ClientLocationsComponent } from './client/locations/client-locations/client-locations.component';
import { DriverHeaderComponent } from './driver/driver-header/driver-header.component';
import { DriverFooterComponent } from './driver/driver-footer/driver-footer.component';
import { DriverNewOrdersComponent } from './driver/driver-new-orders/driver-new-orders.component';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import { DriverOrderDetailsComponent } from './driver/driver-order-details/driver-order-details.component';
import { DriverOrdersComponent } from './driver/driver-orders/driver-orders.component';
import { DriverCreateTransportComponent } from './driver/driver-create-transport/driver-create-transport.component';
import { DriverTransportComponent } from './driver/driver-transport/driver-transport.component';
import { TopUpDialogComponent } from './client/client-header/top-up-dialog/top-up-dialog.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatSidenavModule} from "@angular/material/sidenav";
import { WithdrawDialogComponent } from './driver/driver-header/withdraw-dialog/withdraw-dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    ClientHeaderComponent,
    ClientOrdersComponent,
    ClientFooterComponent,
    ClientCreateOrderComponent,
    ClientOrderDetailsComponent,
    ClientLocationsComponent,
    DriverHeaderComponent,
    DriverFooterComponent,
    DriverNewOrdersComponent,
    DriverOrderDetailsComponent,
    DriverOrdersComponent,
    DriverCreateTransportComponent,
    DriverTransportComponent,
    TopUpDialogComponent,
    WithdrawDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatToolbarModule,
    MatChipsModule,
    MatLegacyChipsModule,
    MatProgressBarModule,
    MatBadgeModule,
    MatSelectModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDialogModule,
    GoogleMapsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    FlexLayoutModule,
    MatSidenavModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
