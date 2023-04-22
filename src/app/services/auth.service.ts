import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInStatus = false;
  public user: any;

  //if stored user exists, set user to that
  constructor(private http: HttpClient, private router: Router) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.loggedInStatus = true;
      this.user = storedUser;
    }
  }

  // isLoggedIn() {
  //   return !!localStorage.getItem('token');
  // }

  setLoggedIn(value: boolean, user: any) {
    this.loggedInStatus = value;
    this.user = user;
    localStorage.setItem('user', JSON.stringify(this.user)); // stringify the user object before storing
    localStorage.setItem('userEmail', this.user.email)
    localStorage.setItem('password', this.user.password)
    localStorage.setItem('totalMoney', this.user.totalMoney)
    localStorage.setItem('transactions', this.user.transactions)
  }

  get isLoggedIn() {
    return this.loggedInStatus;
  }

  get currentUser() {
    return this.user;
  }


  logout() {
    this.loggedInStatus = false;
    const userStr = localStorage.getItem('user');
    const userOut = userStr ? JSON.parse(userStr) : null;
    this.http.post('http://localhost:3000/checkout', userOut).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
        alert(err.error.message)
      },
    );

    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
