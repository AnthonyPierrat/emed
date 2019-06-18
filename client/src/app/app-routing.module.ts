import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './core/signup/signup.component';
import { SigninComponent } from './core/signin/signin.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
