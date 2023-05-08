import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { MatTabGroup } from '@angular/material/tabs';
import * as Hammer from 'hammerjs';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {
  public curruser: any;
  public totalMoney: any;
  public transactions: any;
  public uniqueTransactions: any;
  public totalIncome: number = 0;
  public totalExpense: number = 0;

  constructor(private elementRef: ElementRef) { }

  selectedIndex: number = 0;
  selectedOption = '';

  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
  selectChange(): void {
    console.log("Selected INDEX: " + this.selectedIndex);
  }



  //labels will be transaction categories
  public pieChartLabels: string[] = [];

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

    let temp = this.transactions;
    // Populate uniqueTransactions array with unique elements from transactions
    this.uniqueTransactions = [...new Set(temp)];
    console.log(this.uniqueTransactions)
    this.transactions.forEach((transaction: any) => {
      if (transaction.money < 0) {
        this.pieChartLabels.push(transaction.category);
        this.pieChartData[0].data.push(Math.abs(transaction.money))
        this.totalExpense += Math.abs(transaction.money);
      } else {
        this.totalIncome += transaction.money;
      }
    });

    //Swipes
    const hammer = new Hammer(this.elementRef.nativeElement);
    hammer.on('swipeleft', (ev) => {
      this.swipe(this.selectedIndex, this.SWIPE_ACTION.LEFT);
    });
    hammer.on('swiperight', (ev) => {
      this.swipe(this.selectedIndex, this.SWIPE_ACTION.RIGHT);
    });

  }



  //Swipable functionality

  swipe(selectedIndex: number, action = this.SWIPE_ACTION.RIGHT) {
    // Out of range
    if (this.selectedIndex < 0 || this.selectedIndex >= 3) return;

    // Swipe left, next tab
    if (action === this.SWIPE_ACTION.LEFT) {
      const isLast = this.selectedIndex === 2.5;
      this.selectedIndex = isLast ? 0 : this.selectedIndex + 0.5;
      console.log("Swipe right - INDEX: " + this.selectedIndex);
    }

    // Swipe right, previous tab
    if (action === this.SWIPE_ACTION.RIGHT) {
      const isFirst = this.selectedIndex === 0;
      this.selectedIndex = isFirst ? 0 : this.selectedIndex - 0.5;
      console.log("Swipe left - INDEX: " + this.selectedIndex);
    }
  }
}
