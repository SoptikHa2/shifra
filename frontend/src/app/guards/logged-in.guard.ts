import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment, UrlSegmentGroup,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";
import {map, skipWhile} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate, CanActivateChild {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.all(route.url);
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.all(childRoute.url);
  }

  all(url: UrlSegment[]) {
    return this.authService.user.asObservable()
      .pipe(
        skipWhile(user => user == null),
        map(user => {
          if (user!.loggedIn) {
            return true;
          } else {
            this.authService.setUrlBeforePrompting(new UrlSegmentGroup(url, {}).toString());
            return this.router.createUrlTree( ['/auth/login']);
          }
        })
      )
  }
}
