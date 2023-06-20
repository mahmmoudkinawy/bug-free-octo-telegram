import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrderComponent } from './pages/order/order.component';
import { AuthInterceptor } from './auth-intercept/auth.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';

import { ToastrModule } from 'ngx-toastr';
import { UpdatePasswordComponent } from './pages/update-password/update-password.component';
import { VerifyPasswordComponent } from './pages/verify-password/verify-password.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { DelegetsComponent } from './pages/delegets/delegets.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderComponent,
    LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    HeaderComponent,
    HomeComponent,
    UpdatePasswordComponent,
    VerifyPasswordComponent,
    MyProfileComponent,
    ChangePasswordComponent,
    DelegetsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      closeButton: true,
      positionClass: 'toast-bottom-right',
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
