import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { Observable } from 'rxjs';
import { Review } from '../models/review';

@Injectable({
  providedIn: 'root'
})
export class MangerService {
  private baseUrl = 'http://localhost:8080/manager';

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/orders`);
  }

  getOrder(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/orders/${orderId}`);
  }

  getDelegateLocation(delegateId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/delegate_location/${delegateId}`);
  }
  deleteOrder(orderId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/orders/${orderId}`);
  }
  getReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.baseUrl}/reviews`);
  }

  deleteReview(reviewId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/reviews/${reviewId}`);
  }
}
