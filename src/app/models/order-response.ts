export interface OrderResult {
  orders: OrderResponse[];
}

export interface OrderResponse {
  _id: string;
  user: string;
  trackId: string;
  senderName: string;
  senderPhone: string;
  senderEmail: string;
  senderPostalCode: string;
  senderAddress: string;
  receivedName: string;
  receivedPhone: string;
  receivedEmail: string;
  receivedPostalCode: string;
  receivedAddress: string;
  category: string;
  weight: number;
  dimension: any[];
  services: number;
  deliverTime: string;
  status: string;
  paymentId: number;
  notes: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  delegate?: string;
  supervisor?: string;
}
