import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LocationRequest} from "../models/request/LocationRequest";

const CLIENT_LOCATIONS_API = "http://localhost:8080/api/v1/client/locations"

@Injectable({
  providedIn: 'root'
})
export class ClientLocationsService {

  constructor(private http: HttpClient) { }

  public getAllLocations(): Observable<any> {
    return this.http.get(CLIENT_LOCATIONS_API);
  }

  public getLocationById(id: number): Observable<any> {
    return this.http.get(CLIENT_LOCATIONS_API + "/" + id);
  }

  public createLocation(location: LocationRequest): Observable<any> {
    return this.http.post(CLIENT_LOCATIONS_API, {
      id: location.id,
      name: location.name,
      type: location.type,
      address: location.address,
      longitude: location.longitude,
      latitude: location.latitude
    });
  }

  public deleteLocation(id: number): Observable<any> {
    return this.http.delete(CLIENT_LOCATIONS_API + "/" + id);
  }
}
