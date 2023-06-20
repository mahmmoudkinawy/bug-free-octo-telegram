import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-get-rate',
  templateUrl: './get-rate.component.html',
  styleUrls: ['./get-rate.component.css']
})
export class GetRateComponent implements OnInit {
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
  ngOnInit(): void {
    this.rateForm = this.formBuilder.group({
      Dcountry: ['', Validators.required],
      Rcountry: ['', Validators.required],
      weight: ['', Validators.required],
      Npackge: ['', Validators.required],
    });
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
}
