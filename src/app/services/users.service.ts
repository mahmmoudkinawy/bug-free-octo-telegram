import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserResponse } from '../models/user-response';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly apiUrl = 'http://localhost:8080/manager';

  constructor(private http: HttpClient) {}

  loadUsers() {
    return this.http
      .get<UserResponse>(`${this.apiUrl}/users`)
      .pipe(map((result) => result.users));
  }

  deleteUser(userId: string) {
    return this.http.delete(`${this.apiUrl}/users/${userId}`);
  }
}
