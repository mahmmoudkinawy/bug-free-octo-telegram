import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/models/order';
import { Review } from 'src/app/models/review';
import { MangerService } from 'src/app/services/manger.service';

@Component({
  selector: 'app-manger-order',
  templateUrl: './manger-order.component.html',
  styleUrls: ['./manger-order.component.css'],
})
export class MangerOrderComponent implements OnInit {
  orders: Order[] = [];
  orderId: string | null = null;
  order: Order | null = null;
  reviews : Review[]=[];
  delegateId: string | null = null;
  delegateLocation: any;
  errorMessage: string = '';
  deleteSuccess: boolean = false;
  errorMessages: string = '';
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.orderId = params.get('orderId');
      this.getOrder(this.orderId);
    });
    this.route.params.subscribe((params) => {
      this.delegateId = params['delegateId'];
    });
    this.getOrders();
    this.getReviews();
  }
  constructor(
    private manageServices: MangerService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  getOrders() {
    this.manageServices.getOrders().subscribe((response: any) => {
      if (response && response.orders && Array.isArray(response.orders)) {
        this.orders = response.orders;
        // console.log(this.orders);
      } else {
        console.error('Invalid response format:', response);
        // Handle the case when the response format is not as expected
      }
    });
  }

  getOrder(orderId: string | null): void {
    if (!orderId) {
      return;
    }
    this.manageServices.getOrder(orderId).subscribe(
      (result: any) => {
        this.order = result.order;
        // console.log(this.order);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }



  deleteOrder() {
    if (this.orderId) {
      this.manageServices.deleteOrder(this.orderId).subscribe(
        () => {
          this.toastr.success(' Deleted successfully.');
          // window.location.reload();
        },
        (error) => {
          this.deleteSuccess = false;
          this.errorMessages = error.message;
        }
      );
    } else {
    }
  }

  getReviews(): void {
    this.manageServices.getReviews().subscribe(
      (reviews:any) => {
        this.reviews = reviews;
        console.log(this.reviews);

      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  deleteReview(reviewId: string): void {
    this.manageServices.deleteReview(reviewId).subscribe(
      () => {
        // Remove the deleted review from the list
        this.reviews = this.reviews.filter(review => review._id !== reviewId);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
