import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {User} from "src/app/model/User.model";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  signupForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth:AuthService,
    private toastr: ToastrService,

    ) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      name:  new FormControl(null, [Validators.required, Validators.minLength(3)]),
      email: new FormControl(null, [Validators.required, Validators.email, Validators.minLength(6)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    })
  }
  

  onSubmitt() {
    if(this.signupForm.invalid) {
      return;
    }

    console.log(this.signupForm.value);
    
    this.auth.signUp(this.signupForm.value).subscribe({
      next:(res=>{
        this.toastr.success('SUCCESS', res.message, {
          timeOut: 3000,
        });
        this.router.navigate(['login']);
      }),
      error:(err=>{
        alert(err?.error.message)
      })
    })
  }

}
