import { Component, OnInit } from '@angular/core';
import { OrderResponse } from 'src/app/models/order-response';
import { SupervisorService } from 'src/app/services/supervisor.service';

@Component({
  selector: 'app-orders-supervisor',
  templateUrl: './orders-supervisor.component.html',
  styleUrls: ['./orders-supervisor.component.css'],
})
export class OrdersSupervisorComponent implements OnInit {
  orders: OrderResponse[] = [];

  constructor(private supervisorService: SupervisorService) {}

  ngOnInit(): void {
    this.loadSupervisorOrders();
  }

  private loadSupervisorOrders() {
    this.supervisorService
      .loadAllOrders()
      .subscribe((result) => (this.orders = result));
  }
}
