import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrderComponent } from './pages/order/orders/order.component';
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

import { AboutComponent } from './pages/about/about.component';
import { SupervisorHomeComponent } from './pages/supervisors/supervisor-home/supervisor-home.component';
import { SupervisorHasRoleDirective } from './directives/supervisor-has-role.directive';
import { OrdersSupervisorComponent } from './pages/orders-supervisor/orders-supervisor.component';
import { MyOrdersComponent } from './pages/my-orders/my-orders.component';
import { ProofsComponent } from './pages/proofs/proofs.component';
import { UsersComponent } from './pages/users/users.component';
import { CreateSupervisorComponent } from './pages/supervisors/create-supervisor/create-supervisor.component';
import { HasRoleDirective } from './directives/has-role.directive';
import { MangerOrderComponent } from './pages/manger-order/manger-order.component';
import { PageNtFoundComponent } from './components/page-nt-found/page-nt-found.component';
import { GetRateComponent } from './pages/order/get-rate/get-rate.component';
import { ReviewComponent } from './pages/order/review/review.component';
import { TackerComponent } from './pages/order/tacker/tacker.component';
import { LocationComponent } from './pages/manger-order/location/location/location.component';
// import { GoogleMapsModule } from '@angular/google-maps';
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
    AboutComponent,
    SupervisorHomeComponent,
    SupervisorHasRoleDirective,
    OrdersSupervisorComponent,
    MyOrdersComponent,
    ProofsComponent,
    UsersComponent,
    CreateSupervisorComponent,
    HasRoleDirective,
    MangerOrderComponent,
    PageNtFoundComponent,
    GetRateComponent,
    ReviewComponent,
    TackerComponent,
    LocationComponent
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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
