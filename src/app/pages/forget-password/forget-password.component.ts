import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent {
  emailForUser = {
    email: '',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private toaster: ToastrService
  ) {}

  onResetSubmit() {
    console.log('onResetSubmit');
    this.authService.forgetPassword(this.emailForUser.email).subscribe(
      (data) => {
        console.log('inside');

        localStorage.setItem('email', this.emailForUser.email);
        this.toaster.success('An Otp sent to your email.');
        this.router.navigateByUrl('/verify-otp');
      },
      (error) => {
        localStorage.setItem('email', this.emailForUser.email);
        this.toaster.success('An Otp sent to your email.');
        this.router.navigateByUrl('/verify-otp');
        console.log(error);
      }
    );
  }
}
