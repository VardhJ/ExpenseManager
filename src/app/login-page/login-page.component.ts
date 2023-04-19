import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

interface LoginResponse {
  id: string;
  message: string;
}

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  newUser = {
    email: '',
    password: '',
    totalMoney: 0,
    transactions: []
  }
  user = {
    email: '',
    password: '',
    totalMoney: 0,
    transactions: []
  };

  arrId: number[] = [];

  constructor(private http: HttpClient, private router: Router, private authser: AuthService, private cookieService: CookieService) { }

  onLogin() {
    this.http.post<LoginResponse>('http://localhost:3000/api/login', this.user).subscribe(
      res => {
        console.log(res);
        alert("Successful Login");
        // let currId = Math.floor(Math.random() * 100);
        // while (this.arrId.includes(currId)) {
        //   currId = Math.floor(Math.random() * 100);
        // }
        //this.arrId.push(currId)

        // Update the authentication status
        this.authser.setLoggedIn(true, this.user);

        // Set instance ID in cookie
        const instanceId = res.id;
        this.cookieService.set('instanceId', instanceId);
        this.router.navigate(['home']);
      },
      err => {
        console.log(err);
        alert(err.error.message)
      },
    );

  }

  onRegister() {
    this.http.post('http://localhost:3000/api/register', this.newUser).subscribe(
      res => {
        console.log(res);
        alert("Successful Registration");
      },
      err => {
        console.log(err);
        alert(err.error.message);
      }
    );
  }
}
