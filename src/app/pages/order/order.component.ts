import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})

export class OrderComponent implements OnInit {
  orders: Order[] = [];
order: Order = {
  _id:'',
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
  deliverTime: ''
};
errorMessage: string = '';
orderForm: FormGroup | null = null;

constructor(private orderService: OrderService, private formBuilder: FormBuilder) {}

ngOnInit() {
  this.orderForm = this.formBuilder.group({
    senderName: ['', Validators.required],
    senderPhone: ['01027373837', Validators.required],
    senderEmail: ['bnb@gmail.com', [Validators.required, Validators.email]],
    senderPostalCode: ['1234', Validators.required],
    senderAddress: ['fffffffff', Validators.required],
    receivedName: ['', Validators.required],
    receivedPhone: ['01027373838', Validators.required],
    receivedEmail: ['bni@gmail.com', [Validators.required, Validators.email]],
    receivedPostalCode: ['1234', Validators.required],
    receivedAddress: ['gggggg', Validators.required],
    category: ['red', Validators.required],
    weight: [0, Validators.required],
    dimension: ['hh', Validators.required],
    services: ['56', Validators.required],
    notes: ['ggggggggg', Validators.required],
    paymentId: ['3456787654', Validators.required],
    deliverTime: ['day', Validators.required]
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
      console.log(this.order);
    },
    (error) => {
      console.error('Error creating order:', error);
    }
  );
}

deleteOrder(orderId: string) {
  this.orderService.deleteOrder(orderId).subscribe(
    () => {
      console.log('Order deleted successfully');
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
      console.log('Order updated:', updatedOrder);
      // Perform any necessary actions after successful order update
    },
    (error) => {
      console.error('Error updating order:', error);
      // Handle the error as needed
    }
  );
}

}

