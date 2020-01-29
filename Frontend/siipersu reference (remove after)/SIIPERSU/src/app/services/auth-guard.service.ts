import {Injectable} from '@angular/core';
import {Router, CanLoad, UrlSegment, Route} from '@angular/router';
import {AuthServiceService} from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanLoad {

  constructor(private authService: AuthServiceService, private router: Router) {
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
      return false;
    }
  }
}
