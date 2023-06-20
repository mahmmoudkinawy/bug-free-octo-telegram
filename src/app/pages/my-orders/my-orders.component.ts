import { Component, OnInit } from '@angular/core';
import { OrderResponse } from 'src/app/models/order-response';
import { SupervisorService } from 'src/app/services/supervisor.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent implements OnInit {
  orders: OrderResponse[] = [];

  constructor(private supervisorService: SupervisorService) {}

  ngOnInit(): void {
    this.loadCurrentUserOrders();
  }

  loadCurrentUserOrders() {
    this.supervisorService
      .currentUserOrders()
      .subscribe((result) => (this.orders = result));
  }
}
