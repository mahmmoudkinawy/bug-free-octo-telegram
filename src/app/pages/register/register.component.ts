import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserForRegister } from 'src/app/models/user-for-register';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  userForRegister: UserForRegister = {
    address: '',
    confirmPassword: '',
    email: '',
    lastName: '',
    firstName: '',
    password: '',
    phone: '',
    type: '',
  };

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {}

  onSubmit() {
    this.authService.register(this.userForRegister).subscribe(
      () => {
        this.toastr.success('Your data is saved please login');
        this.router.navigateByUrl('/login');
      },
      (error) => {
        if (error.status === 201) {
          this.toastr.success('Your data is saved please login');
          this.router.navigateByUrl('/login');
        } else if (error.status === 500) {
          this.toastr.error('Email or Phone Number is already taken.');
        }
      }
    );
  }
}
