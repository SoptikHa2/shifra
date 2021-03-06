import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";
import {map, skipWhile} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CanLogInGuard implements CanActivate {
  constructor(
    private authService: AuthService
  ) {}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.user.asObservable()
      .pipe(
        skipWhile(user => user == null),
        map(user => !user!.loggedIn)
      );
  }

}
