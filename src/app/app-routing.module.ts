import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './pages/order/order.component';
import { AuthGuard } from './gared/auth.guard';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { HomeComponent } from './pages/home/home.component';
import { UpdatePasswordComponent } from './pages/update-password/update-password.component';
import { VerifyPasswordComponent } from './pages/verify-password/verify-password.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { DelegetsComponent } from './pages/delegets/delegets.component';

const routes: Routes = [
  {path: 'order', component: OrderComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'deleget', component: DelegetsComponent },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'forgot-password',
    component: ForgetPasswordComponent,
  },
  {
    path: 'verify-otp',
    component: VerifyPasswordComponent,
  },
  {
    path: 'update-password',
    component: UpdatePasswordComponent,
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
  },
  {
    path: 'my-profile',
    component: MyProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
