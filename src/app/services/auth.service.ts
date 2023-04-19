import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInStatus = false;
  public user: any;
  constructor(private http: HttpClient, private router: Router) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.loggedInStatus = true;
      this.user = { email: storedUser };
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
    console.log(user)
  }

  get isLoggedIn() {
    return this.loggedInStatus;
  }

  get currentUser() {
    return this.user;
  }

  getCurrentUser() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      return JSON.parse(storedUser);
    } else {
      return null;
    }
  }

  logout() {
    this.loggedInStatus = false;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
