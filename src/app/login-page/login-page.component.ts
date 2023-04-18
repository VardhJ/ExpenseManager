import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  newUser = {
    email: '',
    password: ''
  }
  user = {
    email: '',
    password: ''
  };
  msg = "";

  constructor(private http: HttpClient, private router: Router, private authser: AuthService) { }

  onLogin() {
    this.http.post('http://localhost:3000/api/login', this.user).subscribe(
      res => {
        console.log(res);
        alert("Successful Login");
        // Update the authentication status
        this.authser.setLoggedIn(true, res);
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
