import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {
  public userEmail: any;

  constructor(public auth: AuthService) { }
  ngOnInit() {
    this.userEmail = localStorage.getItem('userEmail');;
  }

  logout() {
    this.auth.logout();
  }
}
