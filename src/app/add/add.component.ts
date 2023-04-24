import { OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {
  transaction = {
    money: 0,
    category: ''
  };

  public user: any;

  constructor(public auth: AuthService, private http: HttpClient, private router: Router) {
  }


  ngOnInit() {
    console.log("helo")
    this.user = localStorage.getItem('user');
    console.log(this.user);
  }

  onSubmit() {
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;

    //const currentUser = this.auth.currentUser;
    if (this.transaction.money && this.transaction.category) {
      if (this.transaction.money < 0) {
        //currentUser.totalMoney -= Math.abs(this.transaction.money);
        user['totalMoney'] -= Math.abs(this.transaction.money);
      } else {
        //.totalMoney += this.transaction.money;
        user['totalMoney'] += this.transaction.money;
      }
      //currentUser.transactions.push(this.transaction);
      user['transactions'].push(this.transaction);
    }
    localStorage.setItem('user', JSON.stringify(user));
    this.router.navigate(['dashboard'])
  }
}
