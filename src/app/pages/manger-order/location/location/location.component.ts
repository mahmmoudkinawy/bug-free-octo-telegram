import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { MangerService } from 'src/app/services/manger.service';

declare const google: any;

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
})
export class LocationComponent implements OnInit, AfterViewInit {
  @ViewChild('map', { static: true }) mapElement!: ElementRef;

  map: google.maps.Map | undefined;
  delegateId: string | null = null;
  delegateLocation: any;
  errorMessage: string = '';
  deleteSuccess: boolean = false;
  errorMessages: string = '';

  constructor(
    private manageServices: MangerService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngAfterViewInit() {
    if (this.delegateLocation) {
      this.initMap();
    }
  }

  initMap() {
    const mapOptions: google.maps.MapOptions = {
      center: this.delegateLocation,
      zoom: 15,
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

  ngOnInit() {
    this.getDelegateLocation();
  }

  getDelegateLocation() {
    if (this.delegateId) {
      this.manageServices.getDelegateLocation(this.delegateId).subscribe(
        (response: any) => {
          this.delegateLocation = response.Location[0];
          if (this.delegateLocation && this.map) {
            this.map.setCenter(response.Location[0]);
          } else {
            this.initMap();
          }
          console.log(response);
        },
        (error: any) => {
          this.errorMessage = error.message;
        }
      );
    } else {
      // this.errorMessage = 'Delegate ID is not provided.';
    }
  }
}
