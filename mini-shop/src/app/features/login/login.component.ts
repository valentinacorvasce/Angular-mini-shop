import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { Auth } from 'src/app/models/auth';
import { Observable, first } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  error: any = '';

  constructor(private formBuilder: FormBuilder, public auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.auth
      .login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigateByUrl('home');
        },
        error: (error) => {
          this.error = error;
        },
      });
  }

  /* login(form: any) {
    this.auth.login(form)
      .subscribe(res => {
        this.data = res;
        console.log(this.data);
        this.router.navigateByUrl('home');
      })
  } */



}


