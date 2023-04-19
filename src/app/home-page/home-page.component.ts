// import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../services/auth.service';
// import { HttpClient } from '@angular/common/http';
// @Component({
//   selector: 'app-home-page',
//   templateUrl: './home-page.component.html',
//   styleUrls: ['./home-page.component.scss']
// })
// export class HomePageComponent {
//   public curruser: any;
//   public userEmail: any;
//   public totalMoney = localStorage.getItem('totalMoney');
//   public transactions: any;
//   constructor(public auth: AuthService, private http: HttpClient,) { }
//   ngOnInit() {
//     // this.userEmail = localStorage.getItem('userEmail');
//     // this.curruser = this.auth.currentUser;
//     // this.totalMoney = this.curruser.totalMoney;
//     // this.transactions = this.curruser.transactions;

//     const curruser = this.auth.getCurrentUser();
//     this.totalMoney = curruser.totalMoney;
//     this.transactions = curruser.transactions;
//     console.log(this.curruser);
//   }

// }


import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  public curruser: any;
  public userEmail: any;
  public totalMoney = 0;
  public transactions: any;

  constructor(public auth: AuthService, private http: HttpClient,) { }

  ngOnInit() {
    this.userEmail = localStorage.getItem('userEmail');
    this.curruser = this.auth.currentUser;
    this.totalMoney = this.curruser.totalMoney;
    this.transactions = this.curruser.transactions;
    console.log(this.curruser);
  }

  onTransactionAdded() {
    this.curruser = this.auth.currentUser;
    this.totalMoney = this.curruser.totalMoney;
  }
}

