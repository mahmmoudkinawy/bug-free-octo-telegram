import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-tacker',
  templateUrl: './tacker.component.html',
  styleUrls: ['./tacker.component.css']
})
export class TackerComponent implements OnInit {
  trackerId: string|null = null;
  order: Order | null = null;

  constructor(private route: ActivatedRoute, private orderService: OrderService) { }

  ngOnInit(): void {

  }
  getOrderDetails(): void {
    if (this.trackerId) {
      this.orderService.getOrderByTrackId(this.trackerId).subscribe(
        (response: any) => {
          if (response && response.order) {
            this.order = response.order;
            console.log(this.order);
          } else {
            console.error('Invalid response format:', response);
            // Handle the case when the response format is not as expected
          }
        },
        (error: any) => {
          console.error(error);
        }
      );
    }
  }

}
