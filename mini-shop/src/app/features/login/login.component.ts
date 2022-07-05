import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  modelEmail!: string;
  modelPass!: string;
  showMsg!: string;

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  sendLogin(form: NgForm) {
    this.auth.login(form)
      .subscribe(res => {
        alert('Il token passato è: ' + res)
        this.router.navigateByUrl('book')
      },
        error => this.showMsg = error
      )

  }

}
