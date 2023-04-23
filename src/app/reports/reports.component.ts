import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {

  public curruser: any;
  public totalMoney: any;
  public transactions: any;

  //labels will be transaction categories
  public pieChartLabels = [];
  //data will be transaction money

  public pieChartData: any = [
    {
      data: []
    }
  ];
  public pieChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Expense Pie Chart',
      },
    },
  };

  ngOnInit() {
    const userStr = localStorage.getItem('user');
    this.curruser = userStr ? JSON.parse(userStr) : null;
    this.totalMoney = this.curruser['totalMoney']
    this.transactions = this.curruser['transactions']
    console.log(this.transactions)

    this.pieChartLabels = this.transactions.map(addCategories)
    this.pieChartData[0].data = this.transactions.map(addMoney)

    function addCategories(trans: any) {
      return trans.category;
    }
    function addMoney(trans: any) {

      return Math.abs(trans.money);
    }
    console.log(this.pieChartData)
  }

}
