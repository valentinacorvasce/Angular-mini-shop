import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'src/app/models/auth';

const url = `http://localhost:3000/login`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  data!: Auth | any;

  constructor(private http: HttpClient, private router: Router) { }

  login(form: any): any {

    const params = new HttpParams()
      .set('email', form.email)
      .set('password', form.pass)

    this.http.get<Auth>(url, { params })
      .subscribe(res => {
        this.data = res;
        console.log(this.data);
        this.router.navigateByUrl('home');
      })

  }

  logout(): any {
    this.data = null;
    this.router.navigateByUrl('login');
  }

  isLogged(): any {
    const isAuth = this.data && this.data.token ? true : false;
    return isAuth;
  }


}
