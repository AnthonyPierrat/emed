import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { toast } from "bulma-toast";
import { ToastrService } from 'ngx-toastr';
import { Events } from 'src/app/shared/enums/event.enum';
import Record from 'src/app/shared/models/record.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  private submitted: boolean = false;
  private signupForm: FormGroup;
  private emailCtrl: FormControl;
  private passwordCtrl: FormControl;
  private passwordConfirmationCtrl: FormControl;
  private firstNameCtrl: FormControl;
  private lastNameCtrl: FormControl;
  private birthdateCtrl: FormControl;
  private selectCtrl: FormControl;
  private Events: typeof Events = Events;


  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {

    this.emailCtrl = new FormControl('', [Validators.required, Validators.email]);
    this.passwordCtrl = new FormControl('', [Validators.required, Validators.minLength(6)]);
    this.passwordConfirmationCtrl = new FormControl('', [Validators.required, Validators.minLength(6)]);
    this.firstNameCtrl = new FormControl('', [Validators.required]);
    this.lastNameCtrl = new FormControl('', [Validators.required]);
    this.birthdateCtrl = new FormControl('', [Validators.required]);
    this.selectCtrl = new FormControl('', [Validators.required]);

    this.signupForm = new FormGroup({
      email: this.emailCtrl,
      password: this.passwordCtrl,
      passwordConfirmation: this.passwordCtrl,
      type: this.selectCtrl,
      firstName: this.firstNameCtrl,
      lastName: this.lastNameCtrl,
      birthdate: this.birthdateCtrl
    });
  }

  private signup(user: any) {
    let { email, password, type } = this.signupForm.value;
    let { firstName, lastName, birthdate } = this.signupForm.value;
    const data = new Record({ firstName, lastName, birthdate, event: Events.CREATION, message: "Account creation", canSee: [], canWrite: [], height: null, weight: null, sex: null, bloodType: null });
    this.authService.signup({ email, password, type, data }).subscribe(
      result => {
        localStorage.setItem('currentUser', JSON.stringify(result.data));
      },
      error => {
        this.toastr.error("Authentification", 'Something wrong happen', { timeOut: 3000 });
      },
      () => {
        this.toastr.success("Authentification", 'Successfully signed up !', { timeOut: 3000 });
        this.router.navigateByUrl('/dashboard');
      }
    );
  }



  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    }

    if (this.signupForm.value.password === this.signupForm.value.passwordConfirmation) {
      this.signup(this.signupForm.value);
    }

    this.submitted = false;

  }
}
