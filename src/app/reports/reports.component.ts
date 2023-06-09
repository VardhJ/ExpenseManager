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
  public uniqueCategories: string[] = [];
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
    // Populate uniqueTransactions array with unique elements from transactions
    this.uniqueCategories.push(this.transactions[0].category)
    let c = 0;
    for (let i = 1; i < this.transactions.length; i++) {
      this.uniqueCategories.push(this.transactions[i].category)
      for (let j = 0; j < i - c; j++) {
        if (this.uniqueCategories[i - c] == this.uniqueCategories[j]) {
          this.uniqueCategories.pop();
          c++;
          break;
        }
      }
    }

    const categoryDataMap = new Map();
    this.transactions.forEach((transaction: any) => {
      if (transaction.money < 0) {
        const category = transaction.category;
        const amount = Math.abs(transaction.money);

        if (categoryDataMap.has(category)) {
          // If the category already exists in the map, add the amount to the existing value
          categoryDataMap.set(category, categoryDataMap.get(category) + amount);
        } else {
          // If the category is encountered for the first time, initialize the value in the map
          categoryDataMap.set(category, amount);
          this.pieChartLabels.push(category);
        }

        this.totalExpense += amount;
      } else {
        this.totalIncome += transaction.money;
      }
    });

    // Convert the categoryDataMap to the pieChartData array
    this.pieChartData[0].data = Array.from(categoryDataMap.values());


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
  getTimestamp(transaction: any) {
    const timestamp = new Date(parseInt(transaction._id.toString().substring(0, 8), 16) * 1000);
    return timestamp.toUTCString();
  }
}
