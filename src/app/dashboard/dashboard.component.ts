import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public curruser: any;
  public totalMoney: any;
  public transactions: any;
  constructor() { }

  ngOnInit() {

    const userStr = localStorage.getItem('user');
    this.curruser = userStr ? JSON.parse(userStr) : null;
    this.totalMoney = this.curruser['totalMoney']
    this.transactions = this.curruser['transactions']
    console.log(this.curruser['transactions'])

  }

  getTimestamp(transaction: any) {
    const timestamp = new Date(parseInt(transaction._id.substring(0, 8), 16) * 1000);
    return timestamp.toUTCString();
  }
}
