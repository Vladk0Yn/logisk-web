import {LocationResponse} from "./LocationResponse";

export interface OrderResponse {
  id: number;
  name: string;
  weight: number;
  width: number;
  height: number;
  type: string;
  status: string;
  deliveryPrice: number;
  deliverDueTime: number;
  createdTime: number;
  locationTo: LocationResponse;
  locationFrom: LocationResponse;
  clientId: number;
  driverId: number;
}
