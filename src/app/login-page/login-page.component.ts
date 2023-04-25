import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

interface LoginResponse {
  id: string;
  message: string;
}

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  providers: [FormBuilder]
})
export class LoginPageComponent {

  get currLoginEmail() {
    return this.user.get('email')
  }

  get currRegisterEmail() {
    return this.newUser.get('email')
  }

  newUser = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl(''),

    //new
    pin: new FormControl(null, [
      Validators.required,
      Validators.pattern("^[0-9]{4}$")
    ]),

    totalMoney: new FormControl(0),
    transactions: new FormControl([])
  });

  //EXISTING USER
  user = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl(''),

    //new
    pin: new FormControl(null, [
      Validators.required,
      Validators.pattern("^[0-9]{4}$")
    ]),

    totalMoney: new FormControl(0),
    transactions: new FormControl([])
  });

  constructor(private http: HttpClient, private router: Router, private authser: AuthService, private cookieService: CookieService, private fb: FormBuilder) {
  }

  onLogin() {
    console.log(JSON.parse(JSON.stringify(this.user.value)))
    this.http.post<LoginResponse>('http://localhost:3000/api/login', JSON.parse(JSON.stringify(this.user.value))).subscribe(
      res => {
        console.log(res);
        alert("Successful Login");

        // Update the authentication status
        this.authser.setLoggedIn(true, res);

        // Set instance ID in cookie
        // const instanceId = res.id;
        // this.cookieService.set('instanceId', instanceId);
        this.router.navigate(['home']);
      },
      err => {
        console.log(err);
        alert(err.error.message)
      },
    );

  }

  onRegister() {
    this.http.post('http://localhost:3000/api/register', JSON.parse(JSON.stringify(this.newUser.value))).subscribe(
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
