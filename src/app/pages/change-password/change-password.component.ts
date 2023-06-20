import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent {
  changePasswordData = {
    oldPassword: '',
    newPassword: '',
    newConfirmPassword: '',
  };

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {}

  onChangePasswordSubmit() {
    this.authService
      .changePassword(
        this.changePasswordData.oldPassword,
        this.changePasswordData.newPassword,
        this.changePasswordData.newConfirmPassword
      )
      .subscribe(
        (result) => {
          this.toastr.success('Changed the password successfully');
          this.router.navigateByUrl('/');
        },
        (error) => {
          // this.toastr.error('Old password is Worng.');
        }
      );
  }
}
