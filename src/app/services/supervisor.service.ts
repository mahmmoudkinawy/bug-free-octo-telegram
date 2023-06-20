import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddDelegate } from '../models/add-delegate';
import { DelegateResponse } from '../models/delegate-response';
import { Delegate, Delegates } from '../models/delegate';
import { map } from 'rxjs';
import { OrderResult } from '../models/order-response';

@Injectable({
  providedIn: 'root',
})
export class SupervisorService {
  private readonly apiUrl = 'http://localhost:8080/supervisor';

  constructor(private http: HttpClient) {}

  deleteDelegate(delegate: Delegate) {
    return this.http.delete(`${this.apiUrl}/remove_delegate/${delegate._id}`);
  }

  currentUserOrders() {
    return this.http
      .get<OrderResult>(`${this.apiUrl}/orders`)
      .pipe(map((res) => res.orders));
  }

  loadAllOrders() {
    return this.http
      .get<OrderResult>(`${this.apiUrl}/all_orders`)
      .pipe(map((res) => res.orders));
  }

  loadDelegates() {
    return this.http
      .get<Delegates>(`${this.apiUrl}/delegates`)
      .pipe(map((res) => res.delegates));
  }

  addDelegate(delegate: AddDelegate, image: File) {
    const formData = new FormData();
    formData.append('firstName', delegate.firstName);
    formData.append('lastName', delegate.lastName);
    formData.append('email', delegate.email);
    formData.append('phone', delegate.phone);
    formData.append('userImg', image);

    console.log(delegate);

    return this.http.post<DelegateResponse>(
      `${this.apiUrl}/add_delegate`,
      formData
    );
  }
}
