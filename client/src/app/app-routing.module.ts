import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './core/signup/signup.component';
import { SigninComponent } from './core/signin/signin.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { HistoryComponent } from './core/dashboard/history/history.component';
import { ProfileComponent } from './core/dashboard/profile/profile.component';
import { AccessComponent } from './core/dashboard/access/access.component';
import { PatientComponent } from './core/dashboard/patient/patient.component';
import { DoctorGuard } from './shared/guards/doctor.guard';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      { path: 'history', component: HistoryComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'access', component: AccessComponent },
      { path: 'patients', component: PatientComponent, canActivate: [DoctorGuard] },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
