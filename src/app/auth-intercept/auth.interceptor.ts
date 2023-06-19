import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError,throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Add your authentication logic here
    const authToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OTBiMWE2OGZmYTg0YTg2Y2E3ZjVmMSIsInJvbGUiOjEwMDAsImlhdCI6MTY4NzIwNDI4MCwiZXhwIjoxNjg3ODA5MDgwfQ.GyxdjvBadU0yUsb7DPYHmtpJ9MHatBLkoIwJJy3WFy0';

    // Clone the request and append the authentication token to the headers
    const authRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return next.handle(authRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Handle the "invalid Token" or unauthorized error
          // For example, redirect the user to the login page
          this.router.navigate(['/login']);
        }
        return throwError(error);
      })
    );
  }
}
