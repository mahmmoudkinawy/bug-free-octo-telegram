import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

import { UserForLogin } from '../models/user-for-login';
import { UserForRegister } from '../models/user-for-register';
import { User } from '../models/user';
import { UserInformation } from '../models/user-information';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:8080/auth';
  currentUser$ = new BehaviorSubject<User | undefined>(undefined);

  constructor(private http: HttpClient) {}

  login(userForLogin: UserForLogin) {
    return this.http
      .post<User>(`${this.apiUrl}/login`, userForLogin)
      .pipe(map((user) => this.setUserToLocalStorage(user)));
  }

  register(userForRegister: UserForRegister) {
    console.log(userForRegister);
    return this.http.post<any>(
      `${this.apiUrl}/register?type=${userForRegister.type}`,
      userForRegister
    );
  }

  changePassword(
    oldPassword: string,
    newPassword: string,
    newConfirmPassword: string
  ) {
    return this.http.patch<any>(`${this.apiUrl}/changepassword`, {
      oldPassword: oldPassword,
      newPassword: newPassword,
      newConfirmPassword: newConfirmPassword,
    });
  }

  updatePassword(userId: string, password: string, confirmPassword: string) {
    return this.http.patch<any>(`${this.apiUrl}/updatepassword`, {
      userId: userId,
      password: password,
      confirmPassword: confirmPassword,
    });
  }

  verifyOtp(email: string, otp: string) {
    return this.http.post<any>(`${this.apiUrl}/verifyotp`, {
      email: email,
      otp: otp,
    });
  }

  forgetPassword(email: string) {
    return this.http.post<any>(`${this.apiUrl}/forget`, {
      email: email,
    });
  }

  setUserToLocalStorage(user: User) {
    this.currentUser$.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  currentUserProfile() {
    return this.http.get<UserInformation>(`${this.apiUrl}/userInfo`);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser$.next(undefined);
  }
}
