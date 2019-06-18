import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  private submitted: boolean = false;
  private signinForm: FormGroup;
  private emailCtrl: FormControl;
  private passwordCtrl: FormControl;
  private redirectUrl: string;

  constructor(private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit() {

    this.route.queryParams
      .subscribe(params => this.redirectUrl = params['return'] || '/dashboard');

    this.emailCtrl = new FormControl('', [Validators.required, Validators.email]);
    this.passwordCtrl = new FormControl('', [Validators.required, Validators.minLength(6)]);

    this.signinForm = new FormGroup({
      email: this.emailCtrl,
      password: this.passwordCtrl,
    });
  }

  private signin(user: any) {
    this.authService.signin(user).subscribe(
      result => {
        localStorage.setItem('currentUser', JSON.stringify(result));
      },
      error => {
        this.toastr.error("Authentification", 'Please check your credentials', { timeOut: 3000 });
      },
      () => {
        this.toastr.success("Authentification", 'Successfully logged in !', { timeOut: 3000 });
        this.router.navigateByUrl(this.redirectUrl);
      }
    );
  }



  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signinForm.invalid) {
      return;
    }

    this.signin(this.signinForm.value);

    this.submitted = false;

  }

}
