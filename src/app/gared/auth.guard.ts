import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(): boolean {
    // Add your authentication logic here
    const isAuthenticated = true; // Replace with your authentication check

    if (!isAuthenticated) {
      // Redirect the user to the login page or any other desired action
      this.router.navigate(['/login']);
    }

    return isAuthenticated;
  }

}
