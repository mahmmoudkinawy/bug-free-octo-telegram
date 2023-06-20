import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserInformation } from 'src/app/models/user-information';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
})
export class MyProfileComponent implements OnInit {
  userInformation: UserInformation | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUserProfile().subscribe((userInfo) => {
      this.userInformation = userInfo;
      console.log(userInfo);
    });
  }
}
