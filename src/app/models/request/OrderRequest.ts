export interface OrderRequest {
  id: number;
  name: string;
  weight: number;
  length: number;
  width: number
  height: number;
  type: string;
  deliveryPrice: number;
  deliverDueTime: number;
  locationToId: number;
  locationFromId: number;
}
