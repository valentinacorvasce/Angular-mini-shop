import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Auth } from 'src/app/models/auth';

const url = `http://localhost/php-auth-api/login.php`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  data!: Auth | any;
  private options: HttpHeaders = new HttpHeaders().set('Content-type', 'application/json');

  constructor(private http: HttpClient, private router: Router) { }

  login(form: NgForm): Observable<string> {
    const body = this.body(form);

    return this.http.post(url, body, { headers: this.options })
      .pipe(
        map(res => {
          this.data = res;
          if (this.data['token']) {
            this.setSession(this.data['token']);
          }
          return this.data['token'];
        }),
        catchError(this.errorHandler)
      );

  }

  private body(df: NgForm) {
    const params = new HttpParams()
      .set('email', df.value.email)
      .set('password', df.value.pass)
    return params;
  }

  logout(): any {
    this.data = null;
    this.router.navigateByUrl('login');
    localStorage.removeItem('token');
    localStorage.removeItem('expired');
  }

  isLogged(): any {
    const isAuth = this.data && this.data.token ? true : false;
    return isAuth;
  }

  setSession(jwt: string) {
    let expire: number = new Date().getTime() + 10000;
    localStorage.setItem('token', jwt);
    localStorage.setItem('expired', expire.toString());
  }
  notExpired(): boolean {
    if (localStorage.getItem('expire')) {
      let expire: number = parseInt(localStorage.getItem('expire') as string);
      return new Date().getTime() < expire;
    }
    return false;
  }

  /* Gestione Errori */
  errorHandler(error: any) {
    console.log(error);
    let msg: string;
    if (error instanceof HttpErrorResponse) {
      if (error.status === 0) {
        msg = `Applicazione Offline!`
      } else {
        msg = `Si è verificato un errore: ${error.error.msg} (server status code ${error.status})`;
      }
      return throwError(msg);
    }
    return throwError(`Si è verificato un errore di tipo: ${error.message}`);
  }


}
