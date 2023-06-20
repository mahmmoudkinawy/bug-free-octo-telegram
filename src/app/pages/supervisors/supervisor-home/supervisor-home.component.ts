import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddDelegate } from 'src/app/models/add-delegate';
import { Delegate } from 'src/app/models/delegate';
import { SupervisorService } from 'src/app/services/supervisor.service';

@Component({
  selector: 'app-supervisor-home',
  templateUrl: './supervisor-home.component.html',
  styleUrls: ['./supervisor-home.component.css'],
})
export class SupervisorHomeComponent implements OnInit {
  delegates: Delegate[] = [];
  newDelegate: AddDelegate = {
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    userImg: null,
  };

  constructor(
    private supervisorService: SupervisorService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDelegates();
  }

  onDeleteDelegate(delegate: Delegate): void {
    const confirmation = window.confirm(
      'Do you really want to remove this delegate?'
    );
    if (confirmation) {
      this.supervisorService.deleteDelegate(delegate).subscribe(
        () => {
          this.toastr.success('Delegate deleted successfully.');
          this.loadDelegates();
        },
        (error) => {
          this.toastr.success('Delegate deleted successfully.');
          this.loadDelegates();
          console.log(error);
        }
      );
    }
  }

  loadDelegates() {
    this.supervisorService
      .loadDelegates()
      .subscribe((delegates) => (this.delegates = delegates));
  }

  onAddDelegate() {
    this.supervisorService
      .addDelegate(this.newDelegate, this.newDelegate.userImg!)
      .subscribe(
        (response) => {
          console.log(response);
          this.toastr.success('Delegate added successfully');
          // this.router.navigateByUrl('/');
          this.loadDelegates();
        },
        (error) => {
          this.toastr.error('Email or Phone already taken.');
        }
      );
  }

  onFileSelected($event: any) {
    const file: File = $event.target.files[0];
    this.newDelegate.userImg = file;
  }
}
