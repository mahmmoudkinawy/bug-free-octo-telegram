export interface DelegateOrder {
  _id: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    governorate: string;
    companyName: string;
    postalCode: string;
  };
  delegate: string;
  supervisor: string;
  status: string;
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
}
