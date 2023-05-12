import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public curruser: any;
  public totalMoney: any;
  public transactions: any;
  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    const userEmail = localStorage.getItem('userEmail');
    this.http.get(`http://localhost:3000/api/userdata/${userEmail}`).subscribe(
      res => {
        localStorage.setItem('user', JSON.stringify(res));
        console.log(res);
        const userStr = localStorage.getItem('user');
        this.curruser = userStr ? JSON.parse(userStr) : null;
        this.totalMoney = this.curruser['totalMoney']
        this.transactions = this.curruser['transactions']
      },
      err => {
        console.log(err);
        alert(err.error.message)
      },
    );

  }

  getTimestamp(transaction: any) {
    const timestamp = new Date(parseInt(transaction._id.toString().substring(0, 8), 16) * 1000);
    return timestamp.toUTCString();
  }
}
