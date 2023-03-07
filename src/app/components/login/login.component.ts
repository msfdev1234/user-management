import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { User } from 'src/app/model/User.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user!: User;
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email, Validators.minLength(6)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(3)])
    })
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    console.log(this.loginForm.value);

    this.user = new User("", this.loginForm.value.email, this.loginForm.value.password);

    this.auth.login(this.user)
      .subscribe({
        next: ((res: { message: string | undefined; token: any | undefined; name:any; }) => {
          this.toastr.success('SUCCESS', res.message, {
            timeOut: 3000,
          });

          this.router.navigate(["dashboard"])
          this.auth.storeToken(res.token);
          this.auth.storeCurrentUser(res.name);

        }),
        error: (err => {
          this.toastr.error('ERROR', "Incorrect login details", {
            timeOut: 1200,
          });
        })
      })

  }

}