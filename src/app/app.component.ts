import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import { NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ExpenseManager';
  login = false;
  menuButtonStatus: boolean = false;
  constructor(private zone: NgZone, private router: Router) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/login' || event.url === '/') {
          this.login = true;
        } else {
          this.login = false;
        }
      }
    });
  }
}
