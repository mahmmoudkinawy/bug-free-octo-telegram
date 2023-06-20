import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DelegateOrder } from '../models/deleget';
import { Proof } from '../models/proof';
 // Import the DelegateOrder model

@Injectable({
  providedIn: 'root'
})
export class DelegateService {
  private baseUrl = 'http://localhost:8080/delegate'; // Replace with your API base URL

  constructor(private http: HttpClient) { }

  getAllOrders(): Observable<any> {
    return this.http.get<DelegateOrder[]>(`${this.baseUrl}/orders`);
  }

  getOrder(orderId: string): Observable<any> {
    return this.http.get<DelegateOrder>(`${this.baseUrl}/orders/${orderId}`);
  }

  getDelegateOrders(): Observable<any> {
    return this.http.get<DelegateOrder[]>(`${this.baseUrl}/delegate_orders`);
  }

  addProof(orderId: string, proofImage: File): Observable<any> {
    const formData = new FormData();
    formData.append('proof', proofImage);

    return this.http.post<any>(`${this.baseUrl}/proof/${orderId}`, formData);
  }



  takeOrder(orderId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/take_order/${orderId}`, {});
  }

  confirmOrder(orderId: string, type: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/confirm_order/${orderId}?type=${type}`, {});
  }

}
