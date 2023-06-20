import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserResponse } from '../models/user-response';
import { map } from 'rxjs';
import { SupervisorToCreate } from '../models/supervisor';
import { DelegateResponse } from '../models/delegate-response';

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

  // No way to get the Supervisors alone
  updateSupervisor(city: string, userId: string) {
    return this.http.patch(`${this.apiUrl}/supervisor/${userId}`, {
      city: city,
    });
  }

  createSupervisor(supervisorToCreate: SupervisorToCreate, image: File) {
    const formData = new FormData();
    formData.append('firstName', supervisorToCreate.firstName);
    formData.append('lastName', supervisorToCreate.lastName);
    formData.append('email', supervisorToCreate.email);
    formData.append('phone', supervisorToCreate.phone);
    formData.append('city', supervisorToCreate.city);
    formData.append('userImg', image);

    // DelegateResponse and supervisorToCreate is the same so i used DelegateResponse for the response for all of them
    return this.http.post<DelegateResponse>(
      `${this.apiUrl}/supervisor`,
      formData
    );
  }
}
