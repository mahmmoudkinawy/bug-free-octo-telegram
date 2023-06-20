import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DelegateOrder } from 'src/app/models/deleget';
import { Order } from 'src/app/models/order';
import { DelegateService } from 'src/app/services/delegets.service';

@Component({
  selector: 'app-delegets',
  templateUrl: './delegets.component.html',
  styleUrls: ['./delegets.component.css'],
})
export class DelegetsComponent implements OnInit {
  orders: DelegateOrder[] | null = null;
  delegateOrders: DelegateOrder[] | null = null;
  orderId: string = '';
  orderIdTack: string = '';
  proofImage: File | null = null;

  constructor(
    private delegateService: DelegateService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllOrders();
    this.getDelegateOrders();
  }

  getAllOrders() {
    this.delegateService.getAllOrders().subscribe(
      (response: any) => {
        if (response && response.Orders && Array.isArray(response.Orders)) {
          this.orders = response.Orders;
          // console.log(this.orders);
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

  getDelegateOrders(): void {
    this.delegateService.getDelegateOrders().subscribe(
      (response: any) => {
        if (response && response.orders && Array.isArray(response.orders)) {
          this.delegateOrders = response.orders;
          // console.log(this.delegateOrders)
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

  onFileSelected(event: any) {
    this.proofImage = event.target.files[0];
  }

  addProof() {
    if (!this.orderId || !this.proofImage) {
      console.log('Please provide order ID and proof image.');
      return;
    }

    this.delegateService.addProof(this.orderId, this.proofImage).subscribe(
      () => {
        this.toastr.success('Proof added successfully.');
        window.location.reload();
      },
      (error) => {
        console.error('Error adding proof:', error);
      }
    );
  }

  takeOrder() {
    if (!this.orderIdTack) {
      console.log('Please provide an order ID.');
      return;
    }

    this.delegateService.takeOrder(this.orderIdTack).subscribe(
      () => {
        this.toastr.success('Proof added successfully.');
        this.getDelegateOrders();
      },
      (error) => {
        console.error('Error taking order:', error);
      }
    );
  }

  orderPutId: string = '';
  confirmationType: string = '';
  confirmOrder(): void {
    this.delegateService
      .confirmOrder(this.orderPutId, this.confirmationType)
      .subscribe(
        () => {
          this.toastr.success('Order confirmed successfully.');
          window.location.reload();
        },
        (error: any) => {
          window.location.reload();
          console.error(error);
        }
      );
  }
}
