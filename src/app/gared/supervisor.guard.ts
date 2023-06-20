import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, map } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class SupervisorGuard implements CanActivate {
  constructor(
    private AuthService: AuthService,
    private toastr: ToastrService
  ) {}

  canActivate(): Observable<boolean> {
    return this.AuthService.currentUser$.pipe(
      map((user) => {
        if (user?.user.role === 3000) {
          return true;
        }
        this.toastr.error("You're not authorized for this page.");
        return false;
      })
    );
  }
}
