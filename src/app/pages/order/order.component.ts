import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  orders: Order[] = [];
  rateForm: FormGroup | null = null;
  rateData: any;

  order: Order = {
    _id: '',
    senderName: '',
    senderPhone: '',
    senderEmail: '',
    senderPostalCode: '',
    senderAddress: '',
    receivedName: '',
    receivedPhone: '',
    receivedEmail: '',
    receivedPostalCode: '',
    receivedAddress: '',
    category: '',
    weight: 0,
    dimension: '',
    services: '',
    notes: '',
    paymentId: '',
    deliverTime: '',
  };
  errorMessage: string = '';
  orderForm: FormGroup | null = null;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      senderName: ['', Validators.required],
      senderPhone: ['', Validators.required],
      senderEmail: ['', [Validators.required, Validators.email]],
      senderPostalCode: ['', Validators.required],
      senderAddress: ['', Validators.required],
      receivedName: ['', Validators.required],
      receivedPhone: ['', Validators.required],
      receivedEmail: ['', [Validators.required, Validators.email]],
      receivedPostalCode: ['', Validators.required],
      receivedAddress: ['', Validators.required],
      category: ['', Validators.required],
      weight: [0, Validators.required],
      dimension: ['', Validators.required],
      services: ['', Validators.required],
      notes: ['', Validators.required],
      paymentId: ['', Validators.required],
      deliverTime: ['', Validators.required],
    });

    this.rateForm = this.formBuilder.group({
      Dcountry: ['', Validators.required],
      Rcountry: ['', Validators.required],
      weight: ['', Validators.required],
      Npackge: ['', Validators.required],
    });

    this.getOrders();
  }

  getOrders() {
    this.orderService.getOrders().subscribe(
      (orders: Order[]) => {
        this.orders = orders;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  submitOrder() {
    this.orderService.makeOrder(this.orderForm?.value).subscribe(
      (order) => {
        this.order = order;
        this.toastr.success('Created Order successfully');
        window.location.reload();
      },
      (error) => {
        console.error('Error creating order:', error);
      }
    );
  }

  deleteOrder(orderId: string) {
    this.orderService.deleteOrder(orderId).subscribe(
      () => {
        this.toastr.success('Deleted Order successfully');
        window.location.reload();
        // Perform any necessary actions after successful order deletion
      },
      (error) => {
        console.error('Error deleting order:', error);
        // Handle the error as needed
      }
    );
  }

  updateOrder(orderId: string) {
    const orderToUpdate: Order = this.orderForm?.value;
    this.orderService.updateOrder(orderId, orderToUpdate).subscribe(
      (updatedOrder: Order) => {
        this.toastr.success('Update Order successfully');
        window.location.reload();
      },
      (error) => {
        console.error('Error updating order:', error);
        // Handle the error as needed
      }
    );
  }

  getRate() {
    if (this.rateForm?.valid) {
      const data = {
        Dcountry: this.rateForm.value.Dcountry,
        Rcountry: this.rateForm.value.Rcountry,
        weight: this.rateForm.value.weight,
        Npackge: this.rateForm.value.Npackge,
      };

      this.orderService.getRate(data).subscribe(
        (rateResponse: any) => {
          this.rateData = rateResponse;
          // console.log(this.rateData);
          this.errorMessage = '';
        },
        (error) => {
          console.error('Error getting rate:', error);
          this.errorMessage = 'Error getting rate. Please try again.';
          this.rateData = null;
        }
      );
    } else {
      this.errorMessage = 'Please fill in all the required fields.';
    }
  }

  orderId: string='';
  delegateId: string='';
  review: number=0;
  makeReview(): void {
    if (!this.orderId || !this.delegateId || !this.review) {
      console.error('All fields are required');
      return;
    }

    this.orderService.makeReview(this.orderId, this.delegateId, this.review).subscribe(
      () => {
        this.toastr.success('Review submitted successfully');
        window.location.reload();
        // Perform any necessary actions after successful review submission
      },
      (error: any) => {
        console.error(error);
        // Handle error appropriately
      }
    );
  }
}
