import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, UrlSegment } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private authService: AuthService, private router: Router) {
  }

  async canLoad(route: Route, segments: UrlSegment[]) {
    try {
      const calLoad = await this.authService.isLoggedIn();
      if (calLoad) {
        return true;
      } else {
        this.router.navigateByUrl('/login');
        return false;
      }
    } catch (err) {
      console.log('error in guard', err);
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
