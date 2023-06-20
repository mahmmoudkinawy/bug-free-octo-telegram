import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { UserForLogin } from 'src/app/models/user-for-login';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  currentUser$ = this.authService.currentUser$;
  userForLogin: UserForLogin = {
    email: '',
    password: '',
  };

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {}

  onSubmit() {
    this.authService.login(this.userForLogin).subscribe(
      () => {
        this.toastr.success('Sucess login');
        this.router.navigateByUrl('/');
      },
      (error) => {
        this.toastr.error('Email or Password is invalid.');
      }
    );
  }
}
