import {Component, OnInit, ViewChild} from '@angular/core';
import {GoogleMap, MapInfoWindow} from "@angular/google-maps";
import {Router} from "@angular/router";
import {UserStorageService} from "../../../services/user-storage.service";
import {ClientOrdersService} from "../../../services/client-orders.service";
import {ClientLocationsService} from "../../../services/client-locations.service";
import {NotificationService} from "../../../services/notification.service";
import {MatDialog} from "@angular/material/dialog";
import {LocationResponse} from "../../../models/response/LocationResponse";
import {FormBuilder} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {GeocoderResponse} from "../../../models/response/GeocoderResponse";
import {GeocodingService} from "../../../services/geocoding.service";

@Component({
  selector: 'app-client-locations',
  templateUrl: './client-locations.component.html',
  styleUrls: ['./client-locations.component.css']
})
export class ClientLocationsComponent implements OnInit {

  @ViewChild(GoogleMap, {static: false}) map: GoogleMap;
  @ViewChild(MapInfoWindow, {static: false}) infoWindow: MapInfoWindow;

  locations: LocationResponse[] = [];
  selectedLocation: LocationResponse;

  center: google.maps.LatLngLiteral;

  name: string = '';
  type: string = '';
  address: string = '';

  createName: string = '';
  createType: string = '';
  createAddress: string = '';

  zoom = 15;

  mapCenter: google.maps.LatLng;
  locationCoords?: google.maps.LatLng | null = null;

  mapOptions: google.maps.MapOptions = {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoomControl: true,
    disableDoubleClickZoom: true
  };

  markerOptions: google.maps.MarkerOptions = {
    draggable: false
  };

  constructor(private router: Router,
              private userStorageService: UserStorageService,
              private ordersService: ClientOrdersService,
              private locationsService: ClientLocationsService,
              private notificationService: NotificationService,
              private formBuilder: FormBuilder,
              private geocodingService: GeocodingService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.setupUserLocations();
  }

  setupUserLocations(): void {
    this.locationsService.getAllLocations().subscribe({
      next: (data) => {
        this.locations = <LocationResponse[]>JSON.parse(JSON.stringify(data));
        this.center = {
          lat: this.locations[this.locations.length - 1].latitude,
          lng: this.locations[this.locations.length - 1].longitude
        }
      }, error: (error) => {
        this.notificationService.showSnackBar("Сталася помилка при завантаженні локацій")
      }
    });
  }

  selectMarker(location: LocationResponse) {
    this.selectedLocation = location;
    this.name = location.name;
    this.type = location.type;
    this.address = location.address;
    this.locationCoords = null;
    this.createAddress = '';
    this.createName = '';
    this.createType = '';
  }

  closeLocation() {
    this.name = '';
    this.type = '';
    this.address = '';
  }

  checkAddress() {
    if (!this.createAddress || this.createAddress.length === 0) {
      return;
    }
    this.geocodingService
      .getLocation(this.createAddress)
      .subscribe(
        (response: GeocoderResponse) => {
          if (response.status === 'OK' && response.results?.length) {
            const location = response.results[0];
            const loc: any = location.geometry.location;

            this.locationCoords = new google.maps.LatLng(loc.lat, loc.lng);

            this.mapCenter = location.geometry.location;

            setTimeout(() => {
              if (this.map !== undefined) {
                this.map.panTo(location.geometry.location);
              }
            }, 500);

            this.createAddress = location.formatted_address;

            this.markerOptions = {
              draggable: false,
              animation: google.maps.Animation.DROP,
            };
          } else {
            this.notificationService.showSnackBar("Невірно введена адреса")
          }
        },
        (err: HttpErrorResponse) => {
          console.error('geocoder error', err);
        }
      );
  }

  createLocation() {
    this.locationsService.createLocation({
      id: 0,
      name: this.createName,
      type: this.createType,
      address: this.createAddress,
      latitude: this.locationCoords.lat(),
      longitude: this.locationCoords.lng()
    }).subscribe({
      next: (data) => {
        this.notificationService.showSnackBar("Локацію успішно створено");
        location.reload()
      }, error: (error) => {
        this.notificationService.showSnackBar("Сталася помилка при створенні локації");
      }
    });
  }

  deleteLocation() {
    this.locationsService.deleteLocation(this.selectedLocation.id).subscribe({
      next: (data) => {
        this.notificationService.showSnackBar("Якщо локація не видалилась - це означає що вона задіяна в замовленні");
        location.reload();
      }, error: (error) => {
        this.notificationService.showSnackBar("Сталася помилка при видаленні локації");
      }
    })
  }
}
