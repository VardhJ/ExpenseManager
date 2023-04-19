import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {

  }
  // canActivate() {
  //   if (this.auth.isLoggedIn()) {
  //     return true;
  //   }
  //   this.router.navigate(['login'])
  //   return false;
  // }

  canActivate(): boolean {
    if (this.auth.isLoggedIn) {
      return true;
    } else {
      //UNCOMMENT this when showing presentation:
      this.router.navigate(['login']);
      return false;
    }
  }
}
