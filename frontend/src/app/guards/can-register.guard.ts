import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";
import {map, skipWhile, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CanRegisterGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.user.asObservable()
      .pipe(
        skipWhile(user => user == null),
        tap(console.log),
        map(user => !user!.loggedIn || user!.person.mail == undefined)
      );
  }

}
