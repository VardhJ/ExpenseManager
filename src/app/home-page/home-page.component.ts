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
  public totalMoney: any;
  public transactions: any;
  constructor(public auth: AuthService, private http: HttpClient,) { }

  ngOnInit() {

    const userStr = localStorage.getItem('user');
    this.curruser = userStr ? JSON.parse(userStr) : null;
    this.totalMoney = this.curruser['totalMoney']
    this.transactions = this.curruser['transactions']
    console.log(this.curruser['transactions'])

  }


}

