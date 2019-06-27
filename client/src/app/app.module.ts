import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './core/signup/signup.component';
import { SigninComponent } from './core/signin/signin.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { HeaderComponent } from './core/header/header.component';
import { ProfileComponent } from './core/dashboard/profile/profile.component';
import { HistoryComponent } from './core/dashboard/history/history.component';
import { AccessComponent } from './core/dashboard/access/access.component';
import { PatientComponent } from './core/dashboard/patient/patient.component';
import { DoctorGuard } from './shared/guards/doctor.guard';
import { RecordComponent } from './core/dashboard/patient/record/record.component';
import { RecordFormComponent } from './core/dashboard/patient/record-form/record-form.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    DashboardComponent,
    HeaderComponent,
    ProfileComponent,
    HistoryComponent,
    AccessComponent,
    PatientComponent,
    RecordComponent,
    RecordFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    AuthGuard,
    DoctorGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
