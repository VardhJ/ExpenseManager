import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }
  // isLoggedIn() {
  //   return !!localStorage.getItem('token');
  // }
  private loggedInStatus = false;
  private user: any;
  setLoggedIn(value: boolean, user: any) {
    this.loggedInStatus = value;
    this.user = user;
  }

  get isLoggedIn() {
    return this.loggedInStatus;
  }

  get getUser() {
    return this.user;
  }

  logout() {
    this.loggedInStatus = false;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
