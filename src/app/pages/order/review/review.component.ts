import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit{
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  constructor(
    private orderService: OrderService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}
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
