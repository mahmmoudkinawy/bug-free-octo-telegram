import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

export interface ResetPassword {
  email: string;
  otp: string;
}
@Component({
  selector: 'app-verify-password',
  templateUrl: './verify-password.component.html',
  styleUrls: ['./verify-password.component.css'],
})
export class VerifyPasswordComponent {
  userReset: ResetPassword = {
    email: '',
    otp: '',
  };
  constructor(
    private authService: AuthService,
    private router: Router,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.userReset.email = localStorage.getItem('email') as string;
  }

  verify() {
    this.authService
      .verifyOtp(this.userReset.email, this.userReset.otp)
      .subscribe(
        (userId) => {
          localStorage.removeItem('email');
          localStorage.setItem('userId', JSON.stringify(userId));
          this.router.navigateByUrl('/update-password');
          this.toaster.success('Nice set your new password.');
        },
        (error) => {
          if (error) {
            this.toaster.error('Wrong OTP');
          }
          console.log(error);
        }
      );
  }
}
