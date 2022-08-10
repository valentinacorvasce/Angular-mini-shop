import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { Auth } from 'src/app/models/auth';

const url = `http://localhost/php-auth-api/login.php`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userSubject!: BehaviorSubject<Auth> | any;
  public user!: Observable<Auth>;

  constructor(private http: HttpClient, private router: Router) {
    this.userSubject = new BehaviorSubject<Auth>(
      JSON.parse(localStorage.getItem('currentUser') as string)
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): Auth {
    return this.userSubject.value;
  }

  login(email: string, password: string) {
    return this.http
      .post<any>(url, { email, password })
      .pipe(
        map(({ token }) => {
          let user: Auth = {
            email: email,
            token: token,
            name: ''
          };
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.userSubject.next(user);
          return console.log(user);
        })
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.userSubject.next(null);
    this.router.navigateByUrl('login');
  }


  /* login(form: any): Observable<any> {
    const params = new HttpParams()
      .set('email', form.email)
      .set('password', form.password)

    return this.http.post(url, { params })

  }

  logout(): any {
    this.data = null;
    this.router.navigateByUrl('login');
  } */

  isLogged(): any {
    const isAuth = this.userSubject._value && this.userSubject._value.token ? true : false;
    return isAuth;
  }


}
