import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

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

  constructor(private authService: AuthService) { }

  ngOnInit() {

    this.emailCtrl = new FormControl('', [Validators.required, Validators.email]);
    this.passwordCtrl = new FormControl('', [Validators.required, Validators.minLength(6)]);
    this.passwordConfirmationCtrl = new FormControl('', [Validators.required, Validators.minLength(6)]);
    this.firstNameCtrl = new FormControl('', [Validators.required]);
    this.lastNameCtrl = new FormControl('', [Validators.required]);
    this.birthdateCtrl = new FormControl('', [Validators.required]);

    this.signupForm = new FormGroup({
      email: this.emailCtrl,
      password: this.passwordCtrl,
      passwordConfirmation: this.passwordCtrl,
      firstName: this.firstNameCtrl,
      lastName: this.lastNameCtrl,
      birthdate: this.birthdateCtrl
    });
  }

  private signup(user: any) {
    let { email, password } = this.signupForm.value;
    let { firstName, lastName, birthdate } = this.signupForm.value;
    const data = { firstName, lastName, birthdate };
    this.authService.signup({ email, password, data }).subscribe(
      result => {

      },
      error => {

      },
      () => { }
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

    console.log(this.signupForm.value);

    this.submitted = false;

  }
}
