export interface Order {
  _id: string;
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
  dimension: string;
  services: string;
  notes: string;
  paymentId: string;
  deliverTime: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
  };
  delegate: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
  };
}
