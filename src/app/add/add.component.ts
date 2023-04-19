import { OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';

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

  constructor(public auth: AuthService, private http: HttpClient,) {
    const currentUser = this.auth.currentUser;
    currentUser.transactions = [];
  }

  onSubmit() {
    const currentUser = this.auth.currentUser;
    if (this.transaction.money && this.transaction.category) {
      if (this.transaction.money < 0) {
        currentUser.totalMoney -= Math.abs(this.transaction.money);
      } else {
        currentUser.totalMoney += this.transaction.money;
      }
      currentUser.transactions.push(this.transaction);
    }
  }
}
