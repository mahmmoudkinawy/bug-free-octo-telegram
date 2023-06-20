import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddDelegate } from 'src/app/models/add-delegate';
import { SupervisorService } from 'src/app/services/supervisor.service';

@Component({
  selector: 'app-supervisor-home',
  templateUrl: './supervisor-home.component.html',
  styleUrls: ['./supervisor-home.component.css'],
})
export class SupervisorHomeComponent {
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

  onAddDelegate() {
    this.supervisorService
      .addDelegate(this.newDelegate, this.newDelegate.userImg!)
      .subscribe(
        (response) => {
          console.log(response);
          this.toastr.success('Delegate added successfully');
          this.router.navigateByUrl('/');
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
