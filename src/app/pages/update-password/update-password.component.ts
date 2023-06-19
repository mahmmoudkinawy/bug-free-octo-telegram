import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css'],
})
export class UpdatePasswordComponent {
  userReset = {
    userId: JSON.parse(localStorage.getItem('userId') as any).userId,
    password: '',
    confirmPassword: '',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    console.log(JSON.parse(localStorage.getItem('userId') as any).userId);
  }

  updatePassword() {
    this.authService
      .updatePassword(
        this.userReset.userId!,
        this.userReset.password,
        this.userReset.confirmPassword
      )
      .subscribe(
        (data) => {
          localStorage.removeItem('userId');
          this.toaster.success('Success please login with new data');
          this.router.navigateByUrl('/login');
        },
        (error) => {
          localStorage.removeItem('userId');
          this.toaster.success('Success please login with new data');
          this.router.navigateByUrl('/login');
          console.log(error);
        }
      );
  }
}
