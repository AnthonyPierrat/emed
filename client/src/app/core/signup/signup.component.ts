import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  constructor() { }

  ngOnInit() {

    this.emailCtrl = new FormControl('', [Validators.required, Validators.email]);
    this.passwordCtrl = new FormControl('', [Validators.required, Validators.minLength(6)]);

    this.signupForm = new FormGroup({
      email: this.emailCtrl,
      password: this.passwordCtrl
    });
  }

  onSubmit() {
    this.submitted = true;
    console.log('test');

    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    }

    console.log(this.signupForm);

    this.submitted = false;

  }
}
