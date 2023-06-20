import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './pages/order/orders/order.component';
import { AuthGuard } from './gared/auth.guard';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { UpdatePasswordComponent } from './pages/update-password/update-password.component';
import { VerifyPasswordComponent } from './pages/verify-password/verify-password.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { DelegetsComponent } from './pages/delegets/delegets.component';

import { AboutComponent } from './pages/about/about.component';
import { SupervisorService } from './services/supervisor.service';
import { SupervisorGuard } from './gared/supervisor.guard';
import { HomeComponent } from './pages/home/home.component';
import { SupervisorHomeComponent } from './pages/supervisors/supervisor-home/supervisor-home.component';
import { OrdersSupervisorComponent } from './pages/orders-supervisor/orders-supervisor.component';
import { MyOrdersComponent } from './pages/my-orders/my-orders.component';
import { ProofsComponent } from './pages/proofs/proofs.component';
import { UsersComponent } from './pages/users/users.component';
import { ManagerGuard } from './gared/manager.guard';
import { CreateSupervisorComponent } from './pages/supervisors/create-supervisor/create-supervisor.component';
import { MangerOrderComponent } from './pages/manger-order/manger-order.component';
import { PageNtFoundComponent } from './components/page-nt-found/page-nt-found.component';
import { GetRateComponent } from './pages/order/get-rate/get-rate.component';
import { ReviewComponent } from './pages/order/review/review.component';
import { TackerComponent } from './pages/order/tacker/tacker.component';
import { LocationComponent } from './pages/manger-order/location/location/location.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'order', component: OrderComponent, canActivate: [AuthGuard] },
  { path: 'rate', component: GetRateComponent, canActivate: [AuthGuard] },
  { path: 'rewiew', component: ReviewComponent, canActivate: [AuthGuard] },
  { path: 'tacker', component: TackerComponent, canActivate: [AuthGuard] },
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
    canActivate: [AuthGuard],
  },
  {
    path: 'my-profile',
    component: MyProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'my-orders',
    component: MyOrdersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'supervisors',
    component: SupervisorHomeComponent,
    canActivate: [AuthGuard, SupervisorGuard],
  },
  {
    path: 'orders-for-supervisors',
    component: OrdersSupervisorComponent,
    canActivate: [AuthGuard, SupervisorGuard],
  },
  {
    path: 'proofs',
    component: ProofsComponent,
    canActivate: [AuthGuard, SupervisorGuard],
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard, ManagerGuard],
  },
  {
    path: 'create-supervisor',
    component: CreateSupervisorComponent,
    canActivate: [AuthGuard, ManagerGuard],
  },
  { path: 'manger', component: MangerOrderComponent },
  { path: 'location', component: LocationComponent },
  { path: 'not-found', component: PageNtFoundComponent },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
