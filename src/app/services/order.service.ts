import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://localhost:8080/client';

  constructor(private http: HttpClient) {}

  getRate(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/get_rate`, data);
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/orders`);
  }

  getOrderById(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/order/${orderId}`);
  }

  getOrderByTrackId(trackId: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/order/track/${trackId}`);
  }

  makeOrder(order: any) {
    return this.http.post<Order>(`${this.apiUrl}/order`, order);
  }

  updateOrder(orderId: string, order: Order): Observable<Order> {
    return this.http.patch<Order>(`${this.apiUrl}/order/${orderId}`, order);
  }

  deleteOrder(orderId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/order/${orderId}`);
  }

  getPaymopAuth(price: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/paymop/auth`, { price });
  }

  getPaymentKey(
    order: Order,
    token: string,
    paymentId: string
  ): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/paymop/payment_key`, {
      order,
      token,
      paymentId,
    });
  }

  makeReview(
    orderId: string,
    delegateId: string,
    review: number
  ): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/make_review/${orderId}`, {
      delegateId,
      review,
    });
  }
}
