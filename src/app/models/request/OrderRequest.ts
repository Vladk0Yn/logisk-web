export interface OrderRequest {
  id: number;
  name: string;
  weight: number;
  width: number
  height: number;
  type: string;
  deliveryPrice: number;
  deliverDueTime: number;
  locationToId: number;
  locationFromId: number;
}
