import {TransportResponse} from "./TransportResponse";

export interface DriverResponse {
  id: number;
  email: string;
  name: string;
  balance: number;
  licenseCode: string;
  phoneNumber: string;
  transport: TransportResponse;
}
